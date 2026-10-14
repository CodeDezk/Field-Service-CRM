import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { createHash, createPrivateKey, sign } from "node:crypto";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import test from "node:test";

const root = resolve("proofs/wave-a-offline-artifact-acquisition");
const bootstrapPath = resolve(root, "tool/trusted-bootstrap-loader.py");
const launcherPath = resolve(root, "tool/trusted-network-launcher.py");
const trustRootPath = resolve(root, "fixtures/synthetic-owner-trust-root.json");
const bootstrap = readFileSync(bootstrapPath, "utf8");
const launcher = readFileSync(launcherPath, "utf8");
const trustRootHash = createHash("sha256").update(readFileSync(trustRootPath)).digest("hex");
const syntheticPrivateSeed = Buffer.from(
  "9d61b19deffd5a60ba844af492ec2cc44449c5697b326919703bac031cae7f60", "hex",
);
const syntheticPrivateKey = createPrivateKey({
  key: Buffer.concat([Buffer.from("302e020100300506032b657004220420", "hex"), syntheticPrivateSeed]),
  format: "der",
  type: "pkcs8",
});

test("bootstrap records exact inline-only execution contract", () => {
  assert.match(bootstrap, /\/usr\/bin\/python3 -I -S -c/);
  assert.match(bootstrap, /read_once_no_follow/);
  assert.match(bootstrap, /hashlib\.sha256\(source\)/);
  assert.match(bootstrap, /BOOTSTRAP_AUTHORIZATION_HASH/);
  assert.match(bootstrap, /owner-trust-root/);
  assert.match(bootstrap, /RUN_BOUND_OWNER_PUBLIC_KEY/);
  assert.match(bootstrap, /BOOTSTRAP_SYNTHETIC_NETWORK_KEY/);
  assert.match(bootstrap, /verify_ed25519/);
  assert.match(bootstrap, /BOOTSTRAP_SIGNATURE_INVALID/);
  assert.match(bootstrap, /BOOTSTRAP_SIGNATURE_NONCANONICAL/);
  assert.match(bootstrap, /BOOTSTRAP_SOURCE_HASH/);
  assert.match(bootstrap, /authorization\.get\("trustedLauncherSha256"/);
  assert.match(bootstrap, /exec\(compile\(source/);
  assert.doesNotMatch(bootstrap, /subprocess|urllib|socket|requests/);
});

test("launcher binds system Python and curl on the read-only system volume", () => {
  assert.match(launcher, /"path": "\/usr\/bin\/python3"/);
  assert.match(launcher, /"path": "\/usr\/bin\/curl"/);
  assert.match(launcher, /requiredFlags.*0x80000/);
  assert.match(launcher, /SYSTEM_VOLUME_NOT_READ_ONLY/);
});

test("launcher requires bootstrap capture for every non-self-test path", () => {
  assert.match(launcher, /def require_trusted_bootstrap/);
  assert.match(launcher, /TRUSTED_BOOTSTRAP_REQUIRED/);
  assert.match(launcher, /NETWORK_EXECUTION_NOT_AUTHORIZED_BY_WP121/);
});

test("ledger holds one no-follow descriptor for lock verify budget and append", () => {
  assert.match(launcher, /os\.O_RDWR \| os\.O_APPEND/);
  assert.match(launcher, /fcntl\.flock\(self\.descriptor/);
  assert.match(launcher, /verify_ledger_bytes\(_read_descriptor\(self\.descriptor\)/);
  assert.match(launcher, /_write_all\(self\.descriptor, encoded\)/);
  assert.match(launcher, /os\.fsync\(self\.descriptor\)/);
  assert.match(launcher, /def enforce_budgets/);
  assert.match(launcher, /NETWORK_TOTAL_BYTE_LIMIT/);
  assert.match(launcher, /DESCRIPTOR_SHORT_WRITE/);
  assert.match(launcher, /LEDGER_RESERVED_FIELD/);
  assert.match(launcher, /LEDGER_PARENT_WRITABLE/);
  assert.match(launcher, /LEDGER_PATH_IDENTITY/);
  assert.match(launcher, /verify_system_sealed_descriptor/);
  assert.match(launcher, /flock\(self\.anchor_descriptor/);
});

test("output descriptor remains open and is inherited by curl", () => {
  assert.match(launcher, /os\.O_RDWR \| os\.O_CREAT \| os\.O_EXCL/);
  assert.match(launcher, /return "\/dev\/fd\/\{\}"\.format\(self\.descriptor\)/);
  assert.match(launcher, /return \(self\.descriptor,\)/);
  assert.match(launcher, /_read_descriptor\(self\.descriptor\)/);
  assert.match(launcher, /pass_fds=output_session\.pass_fds/);
  assert.match(launcher, /def execute_bound_curl/);
  assert.match(launcher, /OUTPUT_PATH_IDENTITY/);
});

test("curl arguments use the inherited descriptor and retain the accepted restrictions", () => {
  assert.match(launcher, /"--output", "\/dev\/fd\/\{\}"\.format\(output_descriptor\)/);
  assert.match(launcher, /"--disable"/);
  assert.match(launcher, /"--noproxy", "\*"/);
  assert.match(launcher, /"--max-redirs", "0"/);
});

test("dependency-free Python self-test passes without a child or network", () => {
  const result = spawnSync("/usr/bin/python3", ["-I", "-S", launcherPath, "--self-test"], {
    encoding: "utf8",
    env: { PATH: "/usr/bin:/bin", LANG: "C", LC_ALL: "C" },
  });
  assert.equal(result.status, 0, result.stderr);
  const receipt = JSON.parse(result.stdout);
  assert.equal(receipt.result, "PASS");
  assert.equal(receipt.networkPerformed, false);
  assert.equal(receipt.networkChildProcessCreated, false);
  assert.equal(receipt.localDescriptorChildCreated, true);
  assert.equal(receipt.reservedLedgerFieldRejected, true);
  assert.equal(receipt.ledgerPathReplacementRejected, true);
  assert.equal(receipt.outputPathReplacementRejected, true);
  assert.equal(receipt.globalAnchorContentionRejected, true);
  assert.equal(receipt.pythonSha256, "b8763cf250e607a778bb4603cecb5b90338814d0a3dfcba0d57b1de242f610e9");
  assert.equal(receipt.curlSha256, "b636262803922ee1dd0fbf614818473ffa53c811e44fd3278c2270d3af4759d3");
});

test("exact inline bootstrap binds effective authorization and launcher before self-test", async () => {
  const { chmodSync, mkdtempSync, rmSync, writeFileSync } = await import("node:fs");
  const { tmpdir } = await import("node:os");
  const { join } = await import("node:path");
  const directory = mkdtempSync(join(tmpdir(), "wp118-bootstrap-"));
  try {
    const launcherHash = createHash("sha256").update(readFileSync(launcherPath)).digest("hex");
    const bootstrapHash = createHash("sha256").update(readFileSync(bootstrapPath)).digest("hex");
    const authorizationPath = join(directory, "authorization.json");
    const authorization = { state: "EFFECTIVE_STATIC_ONLY", consumed: false,
      signatureAlgorithm: "Ed25519", ownerSigningKeyId: "wp118-synthetic-rfc8032-test-vector-1",
      ownerTrustRootSha256: trustRootHash,
      trustedBootstrapPath: bootstrapPath, trustedBootstrapSha256: bootstrapHash,
      trustedLauncherPath: launcherPath, trustedLauncherSha256: launcherHash };
    writeFileSync(authorizationPath, `${JSON.stringify(authorization)}\n`, { mode: 0o600 });
    chmodSync(authorizationPath, 0o600);
    const authorizationHash = createHash("sha256").update(readFileSync(authorizationPath)).digest("hex");
    const authorizationSignature = sign(null, readFileSync(authorizationPath), syntheticPrivateKey).toString("hex");
    const result = spawnSync("/usr/bin/python3", ["-I", "-S", "-c", bootstrap,
      "--authorization", authorizationPath, "--authorization-sha256", authorizationHash,
      "--authorization-signature", authorizationSignature,
      "--owner-trust-root", trustRootPath, "--owner-trust-root-sha256", trustRootHash,
      "--bootstrap-source", bootstrapPath,
      "--launcher-source", launcherPath, "--", "--self-test"], {
      encoding: "utf8", env: { PATH: "/usr/bin:/bin", LANG: "C", LC_ALL: "C" },
    });
    assert.equal(result.status, 0, result.stderr);
    assert.equal(JSON.parse(result.stdout).result, "PASS");
  } finally {
    rmSync(directory, { recursive: true, force: true });
  }
});

test("owner signature rejects a caller-forged authorization before launcher execution", async () => {
  const { chmodSync, mkdtempSync, rmSync, writeFileSync } = await import("node:fs");
  const { tmpdir } = await import("node:os");
  const { join } = await import("node:path");
  const directory = mkdtempSync(join(tmpdir(), "wp118-forgery-"));
  try {
    const launcherHash = createHash("sha256").update(readFileSync(launcherPath)).digest("hex");
    const bootstrapHash = createHash("sha256").update(readFileSync(bootstrapPath)).digest("hex");
    const authorizationPath = join(directory, "authorization.json");
    const accepted = { state: "EFFECTIVE_STATIC_ONLY", consumed: false,
      signatureAlgorithm: "Ed25519", ownerSigningKeyId: "wp118-synthetic-rfc8032-test-vector-1",
      ownerTrustRootSha256: trustRootHash,
      trustedBootstrapPath: bootstrapPath, trustedBootstrapSha256: bootstrapHash,
      trustedLauncherPath: launcherPath, trustedLauncherSha256: launcherHash };
    const acceptedBytes = Buffer.from(`${JSON.stringify(accepted)}\n`);
    const acceptedSignature = sign(null, acceptedBytes, syntheticPrivateKey).toString("hex");
    const forged = { ...accepted, trustedLauncherSha256: "0".repeat(64) };
    writeFileSync(authorizationPath, `${JSON.stringify(forged)}\n`, { mode: 0o600 });
    chmodSync(authorizationPath, 0o600);
    const forgedHash = createHash("sha256").update(readFileSync(authorizationPath)).digest("hex");
    const result = spawnSync("/usr/bin/python3", ["-I", "-S", "-c", bootstrap,
      "--authorization", authorizationPath, "--authorization-sha256", forgedHash,
      "--authorization-signature", acceptedSignature,
      "--owner-trust-root", trustRootPath, "--owner-trust-root-sha256", trustRootHash,
      "--bootstrap-source", bootstrapPath,
      "--launcher-source", launcherPath, "--", "--self-test"], {
      encoding: "utf8", env: { PATH: "/usr/bin:/bin", LANG: "C", LC_ALL: "C" },
    });
    assert.notEqual(result.status, 0);
    assert.match(result.stderr, /BOOTSTRAP_SIGNATURE_INVALID/);
  } finally {
    rmSync(directory, { recursive: true, force: true });
  }
});

test("bootstrap rejects a signed authorization whose bootstrap hash does not match accepted bytes", async () => {
  const { chmodSync, mkdtempSync, rmSync, writeFileSync } = await import("node:fs");
  const { tmpdir } = await import("node:os");
  const { join } = await import("node:path");
  const directory = mkdtempSync(join(tmpdir(), "wp118-bootstrap-binding-"));
  try {
    const launcherHash = createHash("sha256").update(readFileSync(launcherPath)).digest("hex");
    const authorizationPath = join(directory, "authorization.json");
    const authorization = { state: "EFFECTIVE_STATIC_ONLY", consumed: false,
      signatureAlgorithm: "Ed25519", ownerSigningKeyId: "wp118-synthetic-rfc8032-test-vector-1",
      ownerTrustRootSha256: trustRootHash,
      trustedBootstrapPath: bootstrapPath, trustedBootstrapSha256: "0".repeat(64),
      trustedLauncherPath: launcherPath, trustedLauncherSha256: launcherHash };
    writeFileSync(authorizationPath, `${JSON.stringify(authorization)}\n`, { mode: 0o600 });
    chmodSync(authorizationPath, 0o600);
    const bytes = readFileSync(authorizationPath);
    const result = spawnSync("/usr/bin/python3", ["-I", "-S", "-c", bootstrap,
      "--authorization", authorizationPath,
      "--authorization-sha256", createHash("sha256").update(bytes).digest("hex"),
      "--authorization-signature", sign(null, bytes, syntheticPrivateKey).toString("hex"),
      "--owner-trust-root", trustRootPath, "--owner-trust-root-sha256", trustRootHash,
      "--bootstrap-source", bootstrapPath,
      "--launcher-source", launcherPath, "--", "--self-test"], {
      encoding: "utf8", env: { PATH: "/usr/bin:/bin", LANG: "C", LC_ALL: "C" },
    });
    assert.notEqual(result.status, 0);
    assert.match(result.stderr, /BOOTSTRAP_SOURCE_HASH/);
  } finally {
    rmSync(directory, { recursive: true, force: true });
  }
});

test("bootstrap rejects a noncanonical Ed25519 point encoding", async () => {
  const { chmodSync, mkdtempSync, rmSync, writeFileSync } = await import("node:fs");
  const { tmpdir } = await import("node:os");
  const { join } = await import("node:path");
  const directory = mkdtempSync(join(tmpdir(), "wp118-noncanonical-"));
  try {
    const authorizationPath = join(directory, "authorization.json");
    const authorization = { state: "EFFECTIVE_STATIC_ONLY", consumed: false,
      signatureAlgorithm: "Ed25519", ownerSigningKeyId: "wp118-synthetic-rfc8032-test-vector-1",
      ownerTrustRootSha256: trustRootHash,
      trustedBootstrapPath: bootstrapPath,
      trustedBootstrapSha256: createHash("sha256").update(readFileSync(bootstrapPath)).digest("hex"),
      trustedLauncherPath: launcherPath,
      trustedLauncherSha256: createHash("sha256").update(readFileSync(launcherPath)).digest("hex") };
    writeFileSync(authorizationPath, `${JSON.stringify(authorization)}\n`, { mode: 0o600 });
    chmodSync(authorizationPath, 0o600);
    const bytes = readFileSync(authorizationPath);
    const noncanonical = Buffer.alloc(64);
    noncanonical[0] = 1;
    noncanonical[31] = 0x80;
    const result = spawnSync("/usr/bin/python3", ["-I", "-S", "-c", bootstrap,
      "--authorization", authorizationPath,
      "--authorization-sha256", createHash("sha256").update(bytes).digest("hex"),
      "--authorization-signature", noncanonical.toString("hex"),
      "--owner-trust-root", trustRootPath, "--owner-trust-root-sha256", trustRootHash,
      "--bootstrap-source", bootstrapPath,
      "--launcher-source", launcherPath, "--", "--self-test"], {
      encoding: "utf8", env: { PATH: "/usr/bin:/bin", LANG: "C", LC_ALL: "C" },
    });
    assert.notEqual(result.status, 0);
    assert.match(result.stderr, /BOOTSTRAP_SIGNATURE_NONCANONICAL/);
  } finally {
    rmSync(directory, { recursive: true, force: true });
  }
});

test("synthetic trust root cannot authorize the network state", async () => {
  const { chmodSync, mkdtempSync, rmSync, writeFileSync } = await import("node:fs");
  const { tmpdir } = await import("node:os");
  const { join } = await import("node:path");
  const directory = mkdtempSync(join(tmpdir(), "wp121-synthetic-network-"));
  try {
    const authorizationPath = join(directory, "authorization.json");
    const authorization = { state: "EFFECTIVE_NETWORK", consumed: false,
      signatureAlgorithm: "Ed25519", ownerSigningKeyId: "wp118-synthetic-rfc8032-test-vector-1",
      ownerTrustRootSha256: trustRootHash,
      trustedBootstrapPath: bootstrapPath,
      trustedBootstrapSha256: createHash("sha256").update(readFileSync(bootstrapPath)).digest("hex"),
      trustedLauncherPath: launcherPath,
      trustedLauncherSha256: createHash("sha256").update(readFileSync(launcherPath)).digest("hex") };
    writeFileSync(authorizationPath, `${JSON.stringify(authorization)}\n`, { mode: 0o600 });
    chmodSync(authorizationPath, 0o600);
    const bytes = readFileSync(authorizationPath);
    const result = spawnSync("/usr/bin/python3", ["-I", "-S", "-c", bootstrap,
      "--authorization", authorizationPath,
      "--authorization-sha256", createHash("sha256").update(bytes).digest("hex"),
      "--authorization-signature", sign(null, bytes, syntheticPrivateKey).toString("hex"),
      "--owner-trust-root", trustRootPath, "--owner-trust-root-sha256", trustRootHash,
      "--bootstrap-source", bootstrapPath,
      "--launcher-source", launcherPath, "--", "--network"], {
      encoding: "utf8", env: { PATH: "/usr/bin:/bin", LANG: "C", LC_ALL: "C" },
    });
    assert.notEqual(result.status, 0);
    assert.match(result.stderr, /BOOTSTRAP_SYNTHETIC_NETWORK_KEY/);
  } finally {
    rmSync(directory, { recursive: true, force: true });
  }
});

test("run-bound surrogate trust root reaches only the closed network boundary", async () => {
  const { chmodSync, mkdtempSync, rmSync, writeFileSync } = await import("node:fs");
  const { tmpdir } = await import("node:os");
  const { join } = await import("node:path");
  const directory = mkdtempSync(join(tmpdir(), "wp121-run-bound-interface-"));
  try {
    const descriptorPath = join(directory, "owner-trust-root.json");
    const descriptor = { schema: "wave-a-owner-trust-root-v1",
      classification: "RUN_BOUND_OWNER_PUBLIC_KEY", algorithm: "Ed25519",
      keyId: "wp121-synthetic-surrogate-key-01",
      publicKeyHex: "d75a980182b10ab7d54bfed3c964073a0ee172f3daa62325af021a68f707511a" };
    writeFileSync(descriptorPath, `${JSON.stringify(descriptor)}\n`, { mode: 0o600 });
    chmodSync(descriptorPath, 0o600);
    const descriptorHash = createHash("sha256").update(readFileSync(descriptorPath)).digest("hex");
    const authorizationPath = join(directory, "authorization.json");
    const authorization = { state: "EFFECTIVE_NETWORK", consumed: false,
      signatureAlgorithm: "Ed25519", ownerSigningKeyId: descriptor.keyId,
      ownerTrustRootSha256: descriptorHash,
      trustedBootstrapPath: bootstrapPath,
      trustedBootstrapSha256: createHash("sha256").update(readFileSync(bootstrapPath)).digest("hex"),
      trustedLauncherPath: launcherPath,
      trustedLauncherSha256: createHash("sha256").update(readFileSync(launcherPath)).digest("hex") };
    writeFileSync(authorizationPath, `${JSON.stringify(authorization)}\n`, { mode: 0o600 });
    chmodSync(authorizationPath, 0o600);
    const bytes = readFileSync(authorizationPath);
    const result = spawnSync("/usr/bin/python3", ["-I", "-S", "-c", bootstrap,
      "--authorization", authorizationPath,
      "--authorization-sha256", createHash("sha256").update(bytes).digest("hex"),
      "--authorization-signature", sign(null, bytes, syntheticPrivateKey).toString("hex"),
      "--owner-trust-root", descriptorPath, "--owner-trust-root-sha256", descriptorHash,
      "--bootstrap-source", bootstrapPath,
      "--launcher-source", launcherPath, "--", "--network"], {
      encoding: "utf8", env: { PATH: "/usr/bin:/bin", LANG: "C", LC_ALL: "C" },
    });
    assert.notEqual(result.status, 0);
    assert.match(result.stderr, /NETWORK_EXECUTION_NOT_AUTHORIZED_BY_WP121/);
  } finally {
    rmSync(directory, { recursive: true, force: true });
  }
});

test("run-bound trust-root hash, key ID and public key drift stop before launcher use", async () => {
  const { chmodSync, mkdtempSync, rmSync, writeFileSync } = await import("node:fs");
  const { tmpdir } = await import("node:os");
  const { join } = await import("node:path");
  const directory = mkdtempSync(join(tmpdir(), "wp121-trust-root-drift-"));
  try {
    const descriptorPath = join(directory, "owner-trust-root.json");
    const descriptor = { schema: "wave-a-owner-trust-root-v1",
      classification: "RUN_BOUND_OWNER_PUBLIC_KEY", algorithm: "Ed25519",
      keyId: "wp121-synthetic-surrogate-key-02",
      publicKeyHex: "d75a980182b10ab7d54bfed3c964073a0ee172f3daa62325af021a68f707511a" };
    writeFileSync(descriptorPath, `${JSON.stringify(descriptor)}\n`, { mode: 0o600 });
    chmodSync(descriptorPath, 0o600);
    const descriptorHash = createHash("sha256").update(readFileSync(descriptorPath)).digest("hex");
    const authorizationPath = join(directory, "authorization.json");
    const base = { state: "EFFECTIVE_STATIC_ONLY", consumed: false,
      signatureAlgorithm: "Ed25519", ownerSigningKeyId: descriptor.keyId,
      ownerTrustRootSha256: descriptorHash,
      trustedBootstrapPath: bootstrapPath,
      trustedBootstrapSha256: createHash("sha256").update(readFileSync(bootstrapPath)).digest("hex"),
      trustedLauncherPath: launcherPath,
      trustedLauncherSha256: createHash("sha256").update(readFileSync(launcherPath)).digest("hex") };
    const invoke = (authorization, expectedDescriptorHash = descriptorHash) => {
      writeFileSync(authorizationPath, `${JSON.stringify(authorization)}\n`, { mode: 0o600 });
      chmodSync(authorizationPath, 0o600);
      const bytes = readFileSync(authorizationPath);
      return spawnSync("/usr/bin/python3", ["-I", "-S", "-c", bootstrap,
        "--authorization", authorizationPath,
        "--authorization-sha256", createHash("sha256").update(bytes).digest("hex"),
        "--authorization-signature", sign(null, bytes, syntheticPrivateKey).toString("hex"),
        "--owner-trust-root", descriptorPath, "--owner-trust-root-sha256", expectedDescriptorHash,
        "--bootstrap-source", bootstrapPath,
        "--launcher-source", launcherPath, "--", "--self-test"], {
        encoding: "utf8", env: { PATH: "/usr/bin:/bin", LANG: "C", LC_ALL: "C" },
      });
    };
    assert.match(invoke(base, "0".repeat(64)).stderr, /BOOTSTRAP_TRUST_ROOT_HASH/);
    assert.match(invoke({ ...base, ownerSigningKeyId: "wp121-wrong-owner-key-id" }).stderr,
      /BOOTSTRAP_OWNER_KEY_ID/);
    writeFileSync(descriptorPath, `${JSON.stringify({ ...descriptor, publicKeyHex: "0".repeat(64) })}\n`,
      { mode: 0o600 });
    chmodSync(descriptorPath, 0o600);
    const wrongPublicHash = createHash("sha256").update(readFileSync(descriptorPath)).digest("hex");
    assert.match(invoke({ ...base, ownerTrustRootSha256: wrongPublicHash }, wrongPublicHash).stderr,
      /BOOTSTRAP_SIGNATURE_/);
  } finally {
    rmSync(directory, { recursive: true, force: true });
  }
});

test("direct network entry fails before any operation", () => {
  const result = spawnSync("/usr/bin/python3", ["-I", "-S", launcherPath, "--network"], {
    encoding: "utf8",
    env: { PATH: "/usr/bin:/bin", LANG: "C", LC_ALL: "C" },
  });
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /TRUSTED_BOOTSTRAP_REQUIRED/);
});
