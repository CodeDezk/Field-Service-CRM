import { readdirSync } from "node:fs";
import { relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import {
  captureFile,
  parseCapturedJson,
  validateLimits,
  validateNetworkRequest,
  validateSourcePolicy,
  WP118_CONTRACT,
} from "./network-contract.mjs";

export const EXPECTED_WP115_FILES = [
  ".gitignore",
  "AUTHORITY.md",
  "README.md",
  "fixtures/accepted-source-policy.json",
  "fixtures/synthetic-owner-signing-key.json",
  "fixtures/synthetic-owner-trust-root.json",
  "fixtures/synthetic-metadata-commit.json",
  "fixtures/synthetic-network-request.json",
  "fixtures/synthetic-run-bound-metadata-commit.json",
  "fixtures/synthetic-source-catalog.json",
  "schemas/acquisition-receipt.schema.json",
  "schemas/artifact-inventory.schema.json",
  "schemas/metadata-commit.schema.json",
  "schemas/network-authorization.schema.json",
  "schemas/network-request.schema.json",
  "schemas/owner-trust-root.schema.json",
  "schemas/run-bound-metadata-commit.schema.json",
  "schemas/source-policy.schema.json",
  "schemas/static-authorization.schema.json",
  "test/acquisition-extension-static.test.mjs",
  "test/acquisition-launcher-static.test.mjs",
  "test/pre-key-helper-resolution-static.test.mjs",
  "test/pre-network-bootstrap-invocation-static.test.mjs",
  "test/trusted-network-launcher-static.test.mjs",
  "tool/acquisition-launcher.mjs",
  "tool/contract.mjs",
  "tool/network-contract.mjs",
  "tool/pre-key-helper-resolution.mjs",
  "tool/pre-network-bootstrap-invocation.mjs",
  "tool/static-launcher.mjs",
  "tool/trusted-bootstrap-loader.py",
  "tool/trusted-network-launcher.py",
  "tool/verify-extension.mjs",
  "tool/verify-network-launcher.mjs",
].sort();

function walk(root, directory = root) {
  const found = [];
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const path = resolve(directory, entry.name);
    if (entry.isDirectory()) found.push(...walk(root, path));
    else if (entry.isFile()) found.push(relative(root, path).replaceAll("\\", "/"));
    else throw new Error("NON_REGULAR_ENTRY");
  }
  return found.sort();
}

export function verifyNetworkLauncher(root) {
  const expectedRoot = resolve(process.cwd(), "proofs/wave-a-offline-artifact-acquisition");
  if (resolve(root) !== expectedRoot) throw new Error("ROOT_BOUNDARY");
  const found = walk(expectedRoot);
  if (JSON.stringify(found) !== JSON.stringify(EXPECTED_WP115_FILES)) throw new Error("PUBLIC_INVENTORY");
  const captures = new Map();
  for (const path of found) {
    const capture = captureFile(resolve(expectedRoot, path), { label: `PUBLIC:${path}` });
    captures.set(path, capture);
    if (path.endsWith(".json")) parseCapturedJson(capture, `PUBLIC:${path}`);
    if (/package(-lock)?\.json$|pnpm-lock|yarn\.lock|pubspec/.test(path)) throw new Error("DEPENDENCY_MANIFEST");
  }
  for (const path of ["tool/acquisition-launcher.mjs", "tool/network-contract.mjs"]) {
    const text = captures.get(path).text;
    if (/node:(http|https|http2|net|tls|dns|dgram)|\bfetch\s*\(|\bWebSocket\b/.test(text)) {
      throw new Error(`UNCONTROLLED_NETWORK_API:${path}`);
    }
  }

  const policy = parseCapturedJson(captures.get("fixtures/accepted-source-policy.json"), "SOURCE_POLICY");
  const request = parseCapturedJson(captures.get("fixtures/synthetic-network-request.json"), "NETWORK_REQUEST");
  validateSourcePolicy(policy);
  validateLimits(WP118_CONTRACT.limits);
  validateNetworkRequest(request, policy);

  const launcher = captures.get("tool/acquisition-launcher.mjs").text;
  const contract = captures.get("tool/network-contract.mjs").text;
  const bootstrap = captures.get("tool/trusted-bootstrap-loader.py").text;
  const trustedLauncher = captures.get("tool/trusted-network-launcher.py").text;
  const invocation = captures.get("tool/pre-network-bootstrap-invocation.mjs").text;
  const helperResolution = captures.get("tool/pre-key-helper-resolution.mjs").text;
  for (const required of ["NETWORK_INTENT", "NETWORK_RESULT",
    "verifyControlBindings", "allowedRequestSha256s", "validateMetadataCommitForRequest", "acquireNetworkLock",
    "authorizationCapture", "STATIC_CHILD_EXECUTION_PROHIBITED", "sealedRelativePath",
    "LEGACY_NETWORK_LAUNCHER_PROHIBITED_USE_WP116_TRUSTED_BOOTSTRAP"]) {
    if (!launcher.includes(required)) throw new Error(`LAUNCHER_CONTROL:${required}`);
  }
  for (const required of ["--disable", "--noproxy", '"--max-redirs", "0"']) {
    if (!contract.includes(required)) throw new Error(`CONTRACT_CONTROL:${required}`);
  }
  for (const required of ["read_once_no_follow", "verify_ed25519", "owner-trust-root",
    "RUN_BOUND_OWNER_PUBLIC_KEY", "BOOTSTRAP_SYNTHETIC_NETWORK_KEY",
    "BOOTSTRAP_SIGNATURE_INVALID", "BOOTSTRAP_SIGNATURE_NONCANONICAL", "BOOTSTRAP_SOURCE_HASH",
    "hashlib.sha256(source)", "exec(compile(source,"]) {
    if (!bootstrap.includes(required)) throw new Error(`TRUSTED_BOOTSTRAP_CONTROL:${required}`);
  }
  for (const required of ["LedgerSession", "OutputSession", "fcntl.flock(self.descriptor",
    "LEDGER_RESERVED_FIELD", "LEDGER_PATH_IDENTITY", "OUTPUT_PATH_IDENTITY",
    "verify_system_sealed_descriptor", "flock(self.anchor_descriptor",
    '"/usr/bin/python3"', '"/usr/bin/curl"', "NETWORK_RUNTIME_NOT_AUTHORIZED_BY_WP132",
    "validate_signed_network_transition", "networkEnablementSha256",
    "PASS_SIGNED_NETWORK_TRANSITION_STATIC_SURROGATE"]) {
    if (!trustedLauncher.includes(required)) throw new Error(`TRUSTED_LAUNCHER_CONTROL:${required}`);
  }
  for (const required of ["TMPDIR: \"/tmp\"", "BOOTSTRAP_STDERR",
    "NETWORK_RUNTIME_NOT_AUTHORIZED_BY_WP132", "spawnSync(\"/usr/bin/python3\""]) {
    if (!invocation.includes(required)) throw new Error(`PRE_NETWORK_INVOCATION_CONTROL:${required}`);
  }
  for (const required of ["HELPER_REPOSITORY_PATH", "REPOSITORY_ROOT_NOT_ABSOLUTE",
    "HELPER_HASH_MISMATCH", "PASS_PRE_KEY_HELPER_PREFLIGHT", "pathToFileURL"]) {
    if (!helperResolution.includes(required)) throw new Error(`PRE_KEY_HELPER_CONTROL:${required}`);
  }
  if (contract.includes('args.push("--location")') || !contract.includes('"--max-redirs", "0"')) {
    throw new Error("LAUNCHER_REDIRECT_POLICY");
  }

  return {
    result: "PASS",
    classification: "STATIC_PRE_NETWORK_DIAGNOSTIC_NORMALIZATION_REMEDIATED",
    publicFiles: found.length,
    runId: WP118_CONTRACT.runId,
    networkPerformed: false,
    files: found.map((path) => ({ path, sha256: captures.get(path).sha256 })),
  };
}

function main() {
  const rootIndex = process.argv.indexOf("--root");
  if (rootIndex < 0 || !process.argv[rootIndex + 1]) throw new Error("ARG_ROOT");
  process.stdout.write(`${JSON.stringify(verifyNetworkLauncher(process.argv[rootIndex + 1]))}\n`);
}

if (process.argv[1] && resolve(process.argv[1]) === resolve(fileURLToPath(import.meta.url))) {
  try {
    main();
  } catch (error) {
    process.stderr.write(`${error instanceof Error ? error.message : String(error)}\n`);
    process.exitCode = 1;
  }
}
