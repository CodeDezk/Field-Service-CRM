"""WP-121 owner-signed descriptor-safe acquisition launcher primitives.

The executable network path is closed in WP-118. A later effective authorization must invoke
these exact bytes through the accepted owner-key bootstrap. `--self-test` exercises only local,
dependency-free descriptor controls with an OS-sealed shell stub; it never starts curl or performs
network I/O.
"""

import argparse
import fcntl
import hashlib
import json
import os
import stat
import subprocess
import tempfile


PYTHON_BINDING = {
    "path": "/usr/bin/python3",
    "version": "Python 3.9.6",
    "sha256": "b8763cf250e607a778bb4603cecb5b90338814d0a3dfcba0d57b1de242f610e9",
    "uid": 0,
    "gid": 0,
    "mode": 0o755,
    "requiredFlags": 0x80000,
    "readOnlyMount": "/",
}

CURL_BINDING = {
    "path": "/usr/bin/curl",
    "version": "curl 8.7.1",
    "sha256": "b636262803922ee1dd0fbf614818473ffa53c811e44fd3278c2270d3af4759d3",
    "uid": 0,
    "gid": 0,
    "mode": 0o755,
    "requiredFlags": 0x80000,
    "readOnlyMount": "/",
}

SHELL_BINDING = {
    "path": "/bin/sh",
    "sha256": "c0eaf44f9242d5bbc2e14f4e8b7dccc1eff7f2976d64dc18914d5ef9f373e100",
    "uid": 0,
    "gid": 0,
    "mode": 0o755,
    "requiredFlags": 0x80000,
    "readOnlyMount": "/",
}


class ControlStop(RuntimeError):
    pass


def canonical_json(value):
    return json.dumps(value, sort_keys=True, separators=(",", ":"), ensure_ascii=False)


def sha256_bytes(value):
    return hashlib.sha256(value).hexdigest()


def _identity(info):
    return (info.st_dev, info.st_ino, info.st_mode, info.st_nlink, info.st_uid,
            info.st_gid, info.st_size, info.st_mtime_ns, info.st_ctime_ns)


def _read_descriptor(descriptor):
    os.lseek(descriptor, 0, os.SEEK_SET)
    chunks = []
    while True:
        chunk = os.read(descriptor, 1024 * 1024)
        if not chunk:
            break
        chunks.append(chunk)
    return b"".join(chunks)


def capture_file(path, required_mode=None, allow_multiple_links=False):
    flags = os.O_RDONLY | getattr(os, "O_NOFOLLOW", 0)
    descriptor = os.open(path, flags)
    try:
        before = os.fstat(descriptor)
        if not stat.S_ISREG(before.st_mode) or (before.st_nlink != 1 and not allow_multiple_links):
            raise ControlStop("CAPTURE_TYPE")
        if required_mode is not None and stat.S_IMODE(before.st_mode) != required_mode:
            raise ControlStop("CAPTURE_MODE")
        data = _read_descriptor(descriptor)
        after = os.fstat(descriptor)
        if _identity(before) != _identity(after) or len(data) != after.st_size:
            raise ControlStop("CAPTURE_CHANGED")
        return {"bytes": data, "sha256": sha256_bytes(data), "identity": _identity(after)}
    finally:
        os.close(descriptor)


def verify_system_sealed_descriptor(descriptor, binding):
    before = os.fstat(descriptor)
    if not stat.S_ISREG(before.st_mode):
        raise ControlStop("SYSTEM_TOOL_TYPE")
    data = _read_descriptor(descriptor)
    after = os.fstat(descriptor)
    if _identity(before) != _identity(after) or len(data) != after.st_size:
        raise ControlStop("SYSTEM_TOOL_CHANGED")
    if sha256_bytes(data) != binding["sha256"]:
        raise ControlStop("SYSTEM_TOOL_HASH")
    if after.st_uid != binding["uid"] or after.st_gid != binding["gid"]:
        raise ControlStop("SYSTEM_TOOL_OWNER")
    if stat.S_IMODE(after.st_mode) != binding["mode"]:
        raise ControlStop("SYSTEM_TOOL_MODE")
    if getattr(after, "st_flags", 0) & binding["requiredFlags"] != binding["requiredFlags"]:
        raise ControlStop("SYSTEM_TOOL_FLAGS")
    mount = os.statvfs(binding["readOnlyMount"])
    if mount.f_flag & getattr(os, "ST_RDONLY", 1) == 0:
        raise ControlStop("SYSTEM_VOLUME_NOT_READ_ONLY")
    return {"bytes": data, "sha256": sha256_bytes(data), "identity": _identity(after)}


def verify_system_sealed_tool(binding):
    descriptor = os.open(binding["path"], os.O_RDONLY | getattr(os, "O_NOFOLLOW", 0))
    try:
        return verify_system_sealed_descriptor(descriptor, binding)
    finally:
        os.close(descriptor)


def compute_ledger_entry_hash(entry):
    payload = dict(entry)
    payload.pop("entryHash", None)
    return sha256_bytes(canonical_json(payload).encode("utf-8"))


def _write_all(descriptor, data):
    offset = 0
    while offset < len(data):
        written = os.write(descriptor, data[offset:])
        if written <= 0:
            raise ControlStop("DESCRIPTOR_SHORT_WRITE")
        offset += written


def verify_ledger_bytes(data, authority_hash, run_id):
    try:
        lines = [line for line in data.decode("utf-8").splitlines() if line]
    except UnicodeDecodeError as error:
        raise ControlStop("LEDGER_ENCODING") from error
    if not lines:
        raise ControlStop("LEDGER_EMPTY")
    previous = authority_hash
    entries = []
    for index, line in enumerate(lines):
        try:
            entry = json.loads(line)
        except json.JSONDecodeError as error:
            raise ControlStop("LEDGER_JSON") from error
        if (entry.get("sequence") != index or entry.get("runId") != run_id or
                entry.get("authorityHash") != authority_hash or entry.get("previousHash") != previous):
            raise ControlStop("LEDGER_CHAIN")
        if entry.get("entryHash") != compute_ledger_entry_hash(entry):
            raise ControlStop("LEDGER_HASH")
        previous = entry["entryHash"]
        entries.append(entry)
    return {"count": len(entries), "lastHash": previous, "entries": entries}


class LedgerSession:
    """One descriptor covers locking, verification, budgets and path-rebound appends."""

    RESERVED_FIELDS = frozenset({
        "sequence", "runId", "authorityHash", "previousHash", "recordedAt", "stage", "event",
        "entryHash",
    })

    def __init__(self, path, authority_hash, run_id):
        self.closed = False
        self.anchor_descriptor = os.open(
            PYTHON_BINDING["path"], os.O_RDONLY | getattr(os, "O_NOFOLLOW", 0)
        )
        try:
            verify_system_sealed_descriptor(self.anchor_descriptor, PYTHON_BINDING)
            fcntl.flock(self.anchor_descriptor, fcntl.LOCK_EX | fcntl.LOCK_NB)
        except Exception:
            os.close(self.anchor_descriptor)
            raise
        self.path = os.path.abspath(path)
        self.parent_path = os.path.dirname(self.path)
        parent_flags = os.O_RDONLY | getattr(os, "O_DIRECTORY", 0) | getattr(os, "O_NOFOLLOW", 0)
        self.parent_descriptor = os.open(self.parent_path, parent_flags)
        parent = os.fstat(self.parent_descriptor)
        if not stat.S_ISDIR(parent.st_mode) or stat.S_IMODE(parent.st_mode) & 0o222:
            os.close(self.parent_descriptor)
            fcntl.flock(self.anchor_descriptor, fcntl.LOCK_UN)
            os.close(self.anchor_descriptor)
            raise ControlStop("LEDGER_PARENT_WRITABLE")
        self.parent_identity = _identity(parent)
        flags = os.O_RDWR | os.O_APPEND | getattr(os, "O_NOFOLLOW", 0)
        self.descriptor = os.open(self.path, flags)
        self.authority_hash = authority_hash
        self.run_id = run_id
        info = os.fstat(self.descriptor)
        if (not stat.S_ISREG(info.st_mode) or info.st_nlink != 1 or
                stat.S_IMODE(info.st_mode) != 0o600):
            self.close()
            raise ControlStop("LEDGER_TYPE_OR_MODE")
        try:
            fcntl.flock(self.descriptor, fcntl.LOCK_EX | fcntl.LOCK_NB)
        except Exception:
            os.close(self.descriptor)
            os.close(self.parent_descriptor)
            fcntl.flock(self.anchor_descriptor, fcntl.LOCK_UN)
            os.close(self.anchor_descriptor)
            self.closed = True
            raise
        self.identity = _identity(info)
        self.verified = verify_ledger_bytes(_read_descriptor(self.descriptor), authority_hash, run_id)
        self._rebind_path()

    def _rebind_path(self):
        parent = os.fstat(self.parent_descriptor)
        visible_parent = os.stat(self.parent_path, follow_symlinks=False)
        if _identity(parent) != self.parent_identity or _identity(visible_parent) != self.parent_identity:
            raise ControlStop("LEDGER_PARENT_IDENTITY")
        descriptor = os.open(self.path, os.O_RDONLY | getattr(os, "O_NOFOLLOW", 0))
        try:
            visible = os.fstat(descriptor)
            current = os.fstat(self.descriptor)
            if (not stat.S_ISREG(visible.st_mode) or visible.st_nlink != 1 or
                    stat.S_IMODE(visible.st_mode) != 0o600 or
                    visible.st_dev != current.st_dev or visible.st_ino != current.st_ino):
                raise ControlStop("LEDGER_PATH_IDENTITY")
        finally:
            os.close(descriptor)

    def append(self, stage, event, recorded_at, extra=None):
        if self.closed:
            raise ControlStop("LEDGER_CLOSED")
        if extra and self.RESERVED_FIELDS.intersection(extra):
            raise ControlStop("LEDGER_RESERVED_FIELD")
        self._rebind_path()
        before = os.fstat(self.descriptor)
        if _identity(before) != self.identity:
            raise ControlStop("LEDGER_IDENTITY")
        entry = {
            "sequence": self.verified["count"],
            "runId": self.run_id,
            "authorityHash": self.authority_hash,
            "previousHash": self.verified["lastHash"],
            "recordedAt": recorded_at,
            "stage": stage,
            "event": event,
        }
        if extra:
            entry.update(extra)
        entry["entryHash"] = compute_ledger_entry_hash(entry)
        encoded = (canonical_json(entry) + "\n").encode("utf-8")
        _write_all(self.descriptor, encoded)
        os.fsync(self.descriptor)
        after = os.fstat(self.descriptor)
        expected = list(self.identity)
        expected[6] += len(encoded)
        self.identity = _identity(after)
        if self.identity[:6] != tuple(expected[:6]) or self.identity[6] != expected[6]:
            raise ControlStop("LEDGER_APPEND_IDENTITY")
        self._rebind_path()
        self.verified["entries"].append(entry)
        self.verified["count"] += 1
        self.verified["lastHash"] = entry["entryHash"]
        return entry

    def close(self):
        if self.closed:
            return
        self.closed = True
        try:
            fcntl.flock(self.descriptor, fcntl.LOCK_UN)
        finally:
            os.close(self.descriptor)
            os.close(self.parent_descriptor)
            fcntl.flock(self.anchor_descriptor, fcntl.LOCK_UN)
            os.close(self.anchor_descriptor)

    def __enter__(self):
        return self

    def __exit__(self, _type, _value, _traceback):
        self.close()


class OutputSession:
    """One read/write descriptor is created exclusively and inherited by curl."""

    def __init__(self, path):
        self.path = os.path.abspath(path)
        flags = os.O_RDWR | os.O_CREAT | os.O_EXCL | getattr(os, "O_NOFOLLOW", 0)
        self.descriptor = os.open(self.path, flags, 0o600)
        self.closed = False
        info = os.fstat(self.descriptor)
        if (not stat.S_ISREG(info.st_mode) or info.st_nlink != 1 or
                stat.S_IMODE(info.st_mode) != 0o600):
            self.close()
            raise ControlStop("OUTPUT_TYPE_OR_MODE")
        self.identity = _identity(info)

    def _rebind_path(self):
        descriptor = os.open(self.path, os.O_RDONLY | getattr(os, "O_NOFOLLOW", 0))
        try:
            visible = os.fstat(descriptor)
            current = os.fstat(self.descriptor)
            if (not stat.S_ISREG(visible.st_mode) or visible.st_nlink != 1 or
                    current.st_nlink != 1 or stat.S_IMODE(visible.st_mode) != 0o600 or
                    visible.st_dev != current.st_dev or visible.st_ino != current.st_ino):
                raise ControlStop("OUTPUT_PATH_IDENTITY")
        finally:
            os.close(descriptor)

    @property
    def curl_path(self):
        return "/dev/fd/{}".format(self.descriptor)

    @property
    def pass_fds(self):
        return (self.descriptor,)

    def digest(self):
        if self.closed:
            raise ControlStop("OUTPUT_CLOSED")
        self._rebind_path()
        os.fsync(self.descriptor)
        before = os.fstat(self.descriptor)
        if (before.st_dev != self.identity[0] or before.st_ino != self.identity[1] or
                before.st_nlink != 1):
            raise ControlStop("OUTPUT_IDENTITY")
        data = _read_descriptor(self.descriptor)
        after = os.fstat(self.descriptor)
        if _identity(before) != _identity(after) or len(data) != after.st_size:
            raise ControlStop("OUTPUT_CHANGED")
        self._rebind_path()
        return {"sha256": sha256_bytes(data), "size": len(data)}

    def close(self):
        if not self.closed:
            self.closed = True
            os.close(self.descriptor)

    def __enter__(self):
        return self

    def __exit__(self, _type, _value, _traceback):
        self.close()


def build_curl_arguments(request, output_descriptor):
    return [
        "--disable", "--fail", "--silent", "--show-error", "--proto", "=https",
        "--proto-redir", "=https", "--noproxy", "*", "--connect-timeout", "10",
        "--max-time", "300", "--max-filesize", str(request["maximumBytes"]),
        "--max-redirs", "0", "--output", "/dev/fd/{}".format(output_descriptor),
        "--write-out", "%{json}", request["url"],
    ]


def execute_bound_child(binding, arguments, output_session, timeout=30):
    verify_system_sealed_tool(binding)
    return subprocess.run(
        [binding["path"]] + list(arguments),
        stdin=subprocess.DEVNULL,
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
        close_fds=True,
        pass_fds=output_session.pass_fds,
        timeout=timeout,
        check=False,
        env={"PATH": "/usr/bin:/bin", "LANG": "C", "LC_ALL": "C", "NO_PROXY": "*", "no_proxy": "*"},
    )


def execute_bound_curl(request, output_session):
    return execute_bound_child(CURL_BINDING, build_curl_arguments(request, output_session.descriptor), output_session, 305)


def enforce_budgets(ledger_state, request, limits, now_epoch):
    intents = [entry for entry in ledger_state["entries"] if entry.get("event") == "NETWORK_INTENT"]
    results = [entry for entry in ledger_state["entries"] if entry.get("event") == "NETWORK_RESULT"]
    if len(intents) >= limits["maximumObjects"]:
        raise ControlStop("NETWORK_OBJECT_LIMIT")
    total = sum(entry.get("receivedSize", 0) for entry in results)
    if total + request["maximumBytes"] > limits["maximumTotalBytes"]:
        raise ControlStop("NETWORK_TOTAL_BYTE_LIMIT")
    attempts = [entry for entry in intents if entry.get("requestId") == request["requestId"]]
    if len(attempts) >= limits["maximumAttemptsBeforeAcceptedBytes"]:
        raise ControlStop("NETWORK_ATTEMPT_LIMIT")
    if any(entry.get("requestId") == request["requestId"] and
           (entry.get("exitCode") == 0 or entry.get("receivedSize", 0) > 0) for entry in results):
        raise ControlStop("NETWORK_RETRY_NOT_TRANSPORT_ONLY")
    if intents:
        first_epoch = intents[0].get("recordedAtEpoch")
        if not isinstance(first_epoch, (int, float)) or now_epoch - first_epoch >= limits["maximumDurationSeconds"]:
            raise ControlStop("NETWORK_DURATION_LIMIT")
    return {"intentCount": len(intents), "resultBytes": total, "attemptCount": len(attempts)}


def require_trusted_bootstrap():
    captured = globals().get("__wp121_bootstrap_capture_sha256__")
    bootstrap_source_hash = globals().get("__wp121_bootstrap_source_sha256__")
    signature_verified = globals().get("__wp121_owner_signature_verified__")
    signing_key_id = globals().get("__wp121_owner_signing_key_id__")
    trust_root_hash = globals().get("__wp121_owner_trust_root_sha256__")
    authorization = globals().get("__wp121_authorization__")
    authorization_hash = globals().get("__wp121_authorization_capture_sha256__")
    if (not isinstance(captured, str) or len(captured) != 64 or
            signature_verified is not True or
            not isinstance(signing_key_id, str) or not 8 <= len(signing_key_id) <= 128 or
            not isinstance(trust_root_hash, str) or len(trust_root_hash) != 64 or
            not isinstance(authorization, dict)):
        raise ControlStop("TRUSTED_BOOTSTRAP_REQUIRED")
    if authorization.get("ownerSigningKeyId") != signing_key_id:
        raise ControlStop("TRUSTED_BOOTSTRAP_KEY_BINDING")
    if authorization.get("ownerTrustRootSha256") != trust_root_hash:
        raise ControlStop("TRUSTED_BOOTSTRAP_TRUST_ROOT_BINDING")
    if authorization.get("trustedBootstrapSha256") != bootstrap_source_hash:
        raise ControlStop("TRUSTED_BOOTSTRAP_SOURCE_BINDING")
    if authorization.get("trustedLauncherSha256") != captured:
        raise ControlStop("TRUSTED_BOOTSTRAP_LAUNCHER_BINDING")
    if not isinstance(authorization_hash, str) or len(authorization_hash) != 64:
        raise ControlStop("TRUSTED_BOOTSTRAP_AUTHORIZATION_BINDING")
    return {"launcherSha256": captured, "authorizationSha256": authorization_hash,
            "ownerSigningKeyId": signing_key_id, "ownerTrustRootSha256": trust_root_hash}


def _seed_entry(authority_hash, run_id):
    entry = {
        "sequence": 0,
        "runId": run_id,
        "authorityHash": authority_hash,
        "previousHash": authority_hash,
        "recordedAt": "2026-10-14T00:00:00.000Z",
        "stage": "BOOTSTRAP",
        "event": "AUTHORIZATION_BOUND",
    }
    entry["entryHash"] = compute_ledger_entry_hash(entry)
    return entry


def self_test():
    python_capture = verify_system_sealed_tool(PYTHON_BINDING)
    curl_capture = verify_system_sealed_tool(CURL_BINDING)
    authority_hash = "a" * 64
    run_id = "wp118-self-test"
    reserved_field_rejected = False
    ledger_replacement_rejected = False
    output_replacement_rejected = False
    global_anchor_contention_rejected = False
    with tempfile.TemporaryDirectory(prefix="wp118-static-") as directory:
        ledger_path = os.path.join(directory, "ledger.ndjson")
        output_path = os.path.join(directory, "output.bin")
        with open(ledger_path, "wb") as stream:
            stream.write((canonical_json(_seed_entry(authority_hash, run_id)) + "\n").encode("utf-8"))
        os.chmod(ledger_path, 0o600)
        os.chmod(directory, 0o500)
        with LedgerSession(ledger_path, authority_hash, run_id) as ledger:
            anchor_probe = subprocess.run(
                [PYTHON_BINDING["path"], "-I", "-S", "-c",
                 "import fcntl,os;d=os.open('/usr/bin/python3',os.O_RDONLY);"
                 "fcntl.flock(d,fcntl.LOCK_EX|fcntl.LOCK_NB)"],
                stdin=subprocess.DEVNULL, stdout=subprocess.PIPE, stderr=subprocess.PIPE,
                close_fds=True, timeout=10, check=False,
                env={"PATH": "/usr/bin:/bin", "LANG": "C", "LC_ALL": "C"},
            )
            global_anchor_contention_rejected = anchor_probe.returncode != 0
            ledger.append("STATIC_SELF_TEST", "DESCRIPTOR_CONTINUITY", "2026-10-14T00:00:01.000Z")
            if ledger.verified["count"] != 2:
                raise ControlStop("SELF_TEST_LEDGER")
            budget = enforce_budgets(
                ledger.verified,
                {"requestId": "synthetic", "maximumBytes": 10},
                {"maximumObjects": 2, "maximumTotalBytes": 20,
                 "maximumAttemptsBeforeAcceptedBytes": 2, "maximumDurationSeconds": 60},
                1,
            )
            if budget["intentCount"] != 0 or budget["resultBytes"] != 0:
                raise ControlStop("SELF_TEST_BUDGET")
            try:
                ledger.append("STATIC_SELF_TEST", "RESERVED_REJECTION", "2026-10-14T00:00:02.000Z",
                              {"sequence": 999})
            except ControlStop as error:
                reserved_field_rejected = str(error) == "LEDGER_RESERVED_FIELD"
            os.chmod(directory, 0o700)
            os.unlink(ledger_path)
            with open(ledger_path, "wb") as stream:
                stream.write(b"replacement\n")
            os.chmod(ledger_path, 0o600)
            os.chmod(directory, 0o500)
            try:
                ledger.append("STATIC_SELF_TEST", "PATH_REBIND", "2026-10-14T00:00:03.000Z")
            except ControlStop as error:
                ledger_replacement_rejected = str(error) in {
                    "LEDGER_PARENT_IDENTITY", "LEDGER_PATH_IDENTITY"
                }
        os.chmod(directory, 0o700)
        os.unlink(ledger_path)
        with OutputSession(output_path) as output:
            child = execute_bound_child(
                SHELL_BINDING,
                ["-c", "printf synthetic-static-bytes >&{}".format(output.descriptor)],
                output,
            )
            if child.returncode != 0:
                raise ControlStop("SELF_TEST_CHILD")
            result = output.digest()
            if result["size"] != 22 or output.curl_path != "/dev/fd/{}".format(output.descriptor):
                raise ControlStop("SELF_TEST_OUTPUT")
            os.unlink(output_path)
            with open(output_path, "wb") as stream:
                stream.write(b"replacement")
            os.chmod(output_path, 0o600)
            try:
                output.digest()
            except ControlStop as error:
                output_replacement_rejected = str(error) == "OUTPUT_PATH_IDENTITY"
        os.unlink(output_path)
    if (not reserved_field_rejected or not ledger_replacement_rejected or
            not output_replacement_rejected or not global_anchor_contention_rejected):
        raise ControlStop("SELF_TEST_NEGATIVE_CONTROL")
    return {
        "result": "PASS",
        "classification": "WP118_OWNER_SIGNATURE_DESCRIPTOR_SAFETY_STATIC_SELF_TEST",
        "networkPerformed": False,
        "networkChildProcessCreated": False,
        "pythonSha256": python_capture["sha256"],
        "curlSha256": curl_capture["sha256"],
        "localDescriptorChildCreated": True,
        "reservedLedgerFieldRejected": reserved_field_rejected,
        "ledgerPathReplacementRejected": ledger_replacement_rejected,
        "outputPathReplacementRejected": output_replacement_rejected,
        "globalAnchorContentionRejected": global_anchor_contention_rejected,
    }


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--self-test", action="store_true")
    parser.add_argument("--network", action="store_true")
    arguments = parser.parse_args()
    if arguments.self_test and not arguments.network:
        print(canonical_json(self_test()))
        return
    require_trusted_bootstrap()
    raise ControlStop("NETWORK_EXECUTION_NOT_AUTHORIZED_BY_WP121")


if __name__ == "__main__":
    try:
        main()
    except ControlStop as error:
        raise SystemExit(str(error))
