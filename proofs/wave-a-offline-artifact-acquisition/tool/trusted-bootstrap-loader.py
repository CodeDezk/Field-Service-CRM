"""WP-121 run-bound owner-trust-root exact inline bootstrap.

These exact public-control bytes are passed to `/usr/bin/python3 -I -S -c`. The pinned public key
is supplied through an exact owner-accepted descriptor path and SHA-256 in the invocation. Static
tests use the published RFC 8032 fixture; an effective network authorization must use a separately
materialized `RUN_BOUND_OWNER_PUBLIC_KEY` descriptor and may never use the synthetic fixture.
"""

import hashlib
import json
import os
import stat
import sys


SYNTHETIC_SIGNING_KEY_ID = "wp118-synthetic-rfc8032-test-vector-1"
_Q = 2 ** 255 - 19
_L = 2 ** 252 + 27742317777372353535851937790883648493
_D = (-121665 * pow(121666, _Q - 2, _Q)) % _Q
_I = pow(2, (_Q - 1) // 4, _Q)


def stop(code):
    raise SystemExit(code)


def read_once_no_follow(path, required_mode=None, with_info=False):
    flags = os.O_RDONLY | getattr(os, "O_NOFOLLOW", 0)
    descriptor = os.open(path, flags)
    try:
        before = os.fstat(descriptor)
        if not stat.S_ISREG(before.st_mode) or before.st_nlink != 1:
            stop("BOOTSTRAP_FILE_TYPE")
        if required_mode is not None and stat.S_IMODE(before.st_mode) != required_mode:
            stop("BOOTSTRAP_FILE_MODE")
        chunks = []
        while True:
            chunk = os.read(descriptor, 1024 * 1024)
            if not chunk:
                break
            chunks.append(chunk)
        data = b"".join(chunks)
        after = os.fstat(descriptor)
        identity_before = (before.st_dev, before.st_ino, before.st_mode, before.st_nlink,
                           before.st_uid, before.st_gid, before.st_size,
                           before.st_mtime_ns, before.st_ctime_ns)
        identity_after = (after.st_dev, after.st_ino, after.st_mode, after.st_nlink,
                          after.st_uid, after.st_gid, after.st_size,
                          after.st_mtime_ns, after.st_ctime_ns)
        if identity_before != identity_after or len(data) != after.st_size:
            stop("BOOTSTRAP_FILE_CHANGED")
        if with_info:
            return {"bytes": data, "mode": stat.S_IMODE(after.st_mode), "identity": identity_after}
        return data
    finally:
        os.close(descriptor)


def _recover_x(y, sign):
    value = ((y * y - 1) * pow((_D * y * y + 1) % _Q, _Q - 2, _Q)) % _Q
    x = pow(value, (_Q + 3) // 8, _Q)
    if (x * x - value) % _Q != 0:
        x = (x * _I) % _Q
    if (x * x - value) % _Q != 0:
        stop("BOOTSTRAP_SIGNATURE_POINT")
    if x == 0 and sign == 1:
        stop("BOOTSTRAP_SIGNATURE_NONCANONICAL")
    if (x & 1) != sign:
        x = _Q - x
    return x


def _decode_point(encoded):
    if len(encoded) != 32:
        stop("BOOTSTRAP_SIGNATURE_POINT")
    integer = int.from_bytes(encoded, "little")
    y = integer & ((1 << 255) - 1)
    if y >= _Q:
        stop("BOOTSTRAP_SIGNATURE_POINT")
    point = (_recover_x(y, integer >> 255), y)
    x, y_value = point
    if (y_value * y_value - x * x - 1 - _D * x * x * y_value * y_value) % _Q != 0:
        stop("BOOTSTRAP_SIGNATURE_POINT")
    if _encode_point(point) != encoded:
        stop("BOOTSTRAP_SIGNATURE_NONCANONICAL")
    if point == (0, 1) or _multiply(point, _L) != (0, 1):
        stop("BOOTSTRAP_SIGNATURE_SUBGROUP")
    return point


def _add(left, right):
    x1, y1 = left
    x2, y2 = right
    product = (_D * x1 * x2 * y1 * y2) % _Q
    return (((x1 * y2 + x2 * y1) * pow((1 + product) % _Q, _Q - 2, _Q)) % _Q,
            ((y1 * y2 + x1 * x2) * pow((1 - product) % _Q, _Q - 2, _Q)) % _Q)


def _multiply(point, scalar):
    result = (0, 1)
    addend = point
    while scalar:
        if scalar & 1:
            result = _add(result, addend)
        addend = _add(addend, addend)
        scalar >>= 1
    return result


def _encode_point(point):
    x, y = point
    return (y | ((x & 1) << 255)).to_bytes(32, "little")


def verify_ed25519(public_key, message, signature):
    if len(public_key) != 32 or len(signature) != 64:
        stop("BOOTSTRAP_SIGNATURE_FORMAT")
    encoded_r = signature[:32]
    scalar = int.from_bytes(signature[32:], "little")
    if scalar >= _L:
        stop("BOOTSTRAP_SIGNATURE_SCALAR")
    public_point = _decode_point(public_key)
    r_point = _decode_point(encoded_r)
    base_y = (4 * pow(5, _Q - 2, _Q)) % _Q
    base_point = (_recover_x(base_y, 0), base_y)
    challenge = int.from_bytes(hashlib.sha512(encoded_r + public_key + message).digest(), "little") % _L
    if _encode_point(_multiply(base_point, scalar)) != _encode_point(_add(r_point, _multiply(public_point, challenge))):
        stop("BOOTSTRAP_SIGNATURE_INVALID")


def main():
    expected = ["--authorization", "--authorization-sha256", "--authorization-signature",
                "--owner-trust-root", "--owner-trust-root-sha256", "--bootstrap-source",
                "--launcher-source"]
    if (len(sys.argv) < 15 or
            [sys.argv[1], sys.argv[3], sys.argv[5], sys.argv[7], sys.argv[9], sys.argv[11],
             sys.argv[13]] != expected):
        stop("BOOTSTRAP_ARGUMENTS")
    authorization_path = os.path.realpath(sys.argv[2])
    expected_authorization_hash = sys.argv[4]
    signature_hex = sys.argv[6]
    trust_root_path = os.path.realpath(sys.argv[8])
    expected_trust_root_hash = sys.argv[10]
    bootstrap_path = os.path.realpath(sys.argv[12])
    launcher_path = os.path.realpath(sys.argv[14])
    if any(len(value) != 64 or any(character not in "0123456789abcdef" for character in value)
           for value in (expected_authorization_hash, expected_trust_root_hash)):
        stop("BOOTSTRAP_HASH_FORMAT")
    if len(signature_hex) != 128 or any(character not in "0123456789abcdef" for character in signature_hex):
        stop("BOOTSTRAP_SIGNATURE_FORMAT")
    authorization_source = read_once_no_follow(authorization_path, 0o600)
    authorization_hash = hashlib.sha256(authorization_source).hexdigest()
    if authorization_hash != expected_authorization_hash:
        stop("BOOTSTRAP_AUTHORIZATION_HASH")
    trust_root_capture = read_once_no_follow(trust_root_path, with_info=True)
    trust_root_source = trust_root_capture["bytes"]
    trust_root_hash = hashlib.sha256(trust_root_source).hexdigest()
    if trust_root_hash != expected_trust_root_hash:
        stop("BOOTSTRAP_TRUST_ROOT_HASH")
    try:
        trust_root = json.loads(trust_root_source.decode("utf-8"))
    except (UnicodeDecodeError, json.JSONDecodeError):
        stop("BOOTSTRAP_TRUST_ROOT_JSON")
    if (set(trust_root) != {"schema", "classification", "algorithm", "keyId", "publicKeyHex"} or
            trust_root.get("schema") != "wave-a-owner-trust-root-v1" or
            trust_root.get("classification") not in {
                "SYNTHETIC_STATIC_TEST_ONLY", "RUN_BOUND_OWNER_PUBLIC_KEY"} or
            trust_root.get("algorithm") != "Ed25519" or
            not isinstance(trust_root.get("keyId"), str) or
            not 8 <= len(trust_root["keyId"]) <= 128 or
            any(character not in "abcdefghijklmnopqrstuvwxyz0123456789._-"
                for character in trust_root["keyId"]) or
            not isinstance(trust_root.get("publicKeyHex"), str) or
            len(trust_root["publicKeyHex"]) != 64 or
            any(character not in "0123456789abcdef" for character in trust_root["publicKeyHex"])):
        stop("BOOTSTRAP_TRUST_ROOT_CONTRACT")
    required_trust_root_mode = 0o644 if trust_root["classification"] == "SYNTHETIC_STATIC_TEST_ONLY" else 0o600
    if trust_root_capture["mode"] != required_trust_root_mode:
        stop("BOOTSTRAP_TRUST_ROOT_MODE")
    verify_ed25519(bytes.fromhex(trust_root["publicKeyHex"]), authorization_source,
                   bytes.fromhex(signature_hex))
    try:
        authorization = json.loads(authorization_source.decode("utf-8"))
    except (UnicodeDecodeError, json.JSONDecodeError):
        stop("BOOTSTRAP_AUTHORIZATION_JSON")
    if (authorization.get("state") not in {"EFFECTIVE_STATIC_ONLY", "EFFECTIVE_NETWORK"} or
            authorization.get("consumed") is not False):
        stop("BOOTSTRAP_AUTHORIZATION_STATE")
    if authorization.get("ownerSigningKeyId") != trust_root["keyId"]:
        stop("BOOTSTRAP_OWNER_KEY_ID")
    if authorization.get("ownerTrustRootSha256") != trust_root_hash:
        stop("BOOTSTRAP_TRUST_ROOT_BINDING")
    if (authorization.get("state") == "EFFECTIVE_NETWORK" and
            (trust_root["classification"] != "RUN_BOUND_OWNER_PUBLIC_KEY" or
             trust_root["keyId"] == SYNTHETIC_SIGNING_KEY_ID)):
        stop("BOOTSTRAP_SYNTHETIC_NETWORK_KEY")
    if authorization.get("signatureAlgorithm") != "Ed25519":
        stop("BOOTSTRAP_SIGNATURE_ALGORITHM")
    if authorization.get("trustedBootstrapPath") != bootstrap_path:
        stop("BOOTSTRAP_SOURCE_PATH")
    bootstrap_source = read_once_no_follow(bootstrap_path)
    bootstrap_hash = hashlib.sha256(bootstrap_source).hexdigest()
    if authorization.get("trustedBootstrapSha256") != bootstrap_hash:
        stop("BOOTSTRAP_SOURCE_HASH")
    expected_hash = authorization.get("trustedLauncherSha256", "")
    if authorization.get("trustedLauncherPath") != launcher_path:
        stop("BOOTSTRAP_LAUNCHER_PATH")
    if len(expected_hash) != 64 or any(character not in "0123456789abcdef" for character in expected_hash):
        stop("BOOTSTRAP_LAUNCHER_HASH_FORMAT")
    source = read_once_no_follow(launcher_path)
    actual_hash = hashlib.sha256(source).hexdigest()
    if actual_hash != expected_hash:
        stop("BOOTSTRAP_LAUNCHER_HASH")
    separator = sys.argv.index("--", 15) if "--" in sys.argv[15:] else len(sys.argv)
    launcher_arguments = sys.argv[separator + 1:] if separator < len(sys.argv) else []
    sys.argv = [launcher_path] + launcher_arguments
    namespace = {
        "__name__": "__main__",
        "__file__": launcher_path,
        "__package__": None,
        "__wp121_bootstrap_capture_sha256__": actual_hash,
        "__wp121_bootstrap_source_sha256__": bootstrap_hash,
        "__wp121_owner_signature_verified__": True,
        "__wp121_owner_signing_key_id__": trust_root["keyId"],
        "__wp121_owner_trust_root_sha256__": trust_root_hash,
        "__wp121_authorization__": authorization,
        "__wp121_authorization_capture_sha256__": authorization_hash,
    }
    exec(compile(source, launcher_path, "exec", dont_inherit=True, optimize=2), namespace, namespace)


main()
