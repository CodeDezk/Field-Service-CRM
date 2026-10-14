import { spawnSync } from "node:child_process";
import {
  closeSync, existsSync, fsyncSync, lstatSync, mkdirSync, openSync, readFileSync, readdirSync,
  statfsSync, statSync, unlinkSync, writeSync,
} from "node:fs";
import { dirname, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import {
  appendLedgerEntry,
  buildCurlArguments,
  captureFile,
  commandAllowed,
  parseCapturedJson,
  resolveRunOwnedPath,
  sha256Text,
  validateAuthorization,
  validateMetadataCommitForRequest,
  validateNetworkRequest,
  verifyLedger,
  WP118_CONTRACT,
} from "./network-contract.mjs";

const STATIC_STAGES = new Set(["STATIC_TESTS", "STATIC_VERIFY"]);
const NETWORK_STAGES = new Set(["METADATA_RETRIEVAL", "ARTIFACT_RETRIEVAL"]);

function values(options, name) {
  const positions = options.flatMap((item, index) => item === name ? [index] : []);
  if (positions.length !== 1 || !options[positions[0] + 1]) throw new Error(`ARG:${name}`);
  return options[positions[0] + 1];
}

export function parseArguments(argv) {
  const separator = argv.indexOf("--");
  const options = separator < 0 ? argv : argv.slice(0, separator);
  const command = separator < 0 ? [] : argv.slice(separator + 1);
  const parsed = {
    authorizationPath: resolve(values(options, "--authorization")),
    ledgerPath: resolve(values(options, "--ledger")),
    stage: values(options, "--stage"),
    requestPath: null,
    command,
  };
  const requestIndex = options.indexOf("--request");
  if (requestIndex >= 0) parsed.requestPath = resolve(values(options, "--request"));
  if (STATIC_STAGES.has(parsed.stage) && command.length < 1) throw new Error("ARG_COMMAND");
  if (NETWORK_STAGES.has(parsed.stage) && (!parsed.requestPath || command.length)) throw new Error("ARG_NETWORK_SHAPE");
  if (!STATIC_STAGES.has(parsed.stage) && !NETWORK_STAGES.has(parsed.stage)) throw new Error("ARG_STAGE");
  return parsed;
}

function exactPrivatePath(auth, candidate, name) {
  const expected = resolve(process.cwd(), auth.privateRoot, name);
  if (resolve(candidate) !== expected) throw new Error(`PRIVATE_PATH:${name}`);
}

function exactPrivateFile(auth, name) {
  const path = resolve(process.cwd(), auth.privateRoot, name);
  return { path, capture: captureFile(path, { mode: 0o600, label: `PRIVATE_FILE:${name}` }) };
}

function walkFiles(root, directory = root) {
  const found = [];
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const path = resolve(directory, entry.name);
    if (entry.isDirectory()) found.push(...walkFiles(root, path));
    else if (entry.isFile()) found.push(relative(process.cwd(), path).replaceAll("\\", "/"));
    else throw new Error("CONTROL_NON_REGULAR");
  }
  return found.sort();
}

export function verifyControlBindings(auth) {
  const owner = exactPrivateFile(auth, "owner-authorization.txt");
  const inventory = exactPrivateFile(auth, "public-control-inventory.sha256");
  if (owner.capture.sha256 !== auth.ownerAuthorizationSha256) throw new Error("OWNER_AUTHORIZATION_HASH");
  if (inventory.capture.sha256 !== auth.publicControlInventorySha256) throw new Error("PUBLIC_INVENTORY_HASH");
  const entries = inventory.capture.text.split("\n").filter(Boolean).map((line) => {
    const match = /^([a-f0-9]{64})  (proofs\/(?:wave-a-artifact-acquisition-control|wave-a-offline-artifact-acquisition)\/[^\0]+)$/.exec(line);
    if (!match) throw new Error("PUBLIC_INVENTORY_FORMAT");
    return { sha256: match[1], path: match[2] };
  });
  if (new Set(entries.map((entry) => entry.path)).size !== entries.length) throw new Error("PUBLIC_INVENTORY_DUPLICATE");
  const found = [
    ...walkFiles(resolve(process.cwd(), "proofs/wave-a-artifact-acquisition-control")),
    ...walkFiles(resolve(process.cwd(), "proofs/wave-a-offline-artifact-acquisition")),
  ].sort();
  if (JSON.stringify(entries.map((entry) => entry.path).sort()) !== JSON.stringify(found)) {
    throw new Error("PUBLIC_INVENTORY_COVERAGE");
  }
  const captures = new Map();
  for (const entry of entries) {
    const path = resolve(process.cwd(), entry.path);
    const capture = captureFile(path, { label: `PUBLIC_INVENTORY_ENTRY:${entry.path}` });
    if (capture.sha256 !== entry.sha256) {
      throw new Error(`PUBLIC_INVENTORY_ENTRY:${entry.path}`);
    }
    captures.set(entry.path, capture);
  }
  return { entries: entries.length, ownerAuthorizationSha256: auth.ownerAuthorizationSha256,
    publicControlInventorySha256: auth.publicControlInventorySha256, captures };
}

export function validateToolBinding(binding, expected, privateRoot, args, prefix, executeVersionCheck = true) {
  if (binding.sourcePath !== expected.sourcePath || binding.sealedRelativePath !== expected.sealedRelativePath ||
    binding.version !== expected.version || binding.sha256 !== expected.sha256) {
    throw new Error(`${prefix}_CONTRACT`);
  }
  const privateRootInfo = lstatSync(resolve(privateRoot));
  if (!privateRootInfo.isDirectory() || privateRootInfo.isSymbolicLink() ||
    (privateRootInfo.mode & 0o777) !== 0o500) throw new Error(`${prefix}_SEALED_ROOT`);
  const executable = resolveRunOwnedPath(privateRoot, binding.sealedRelativePath);
  const parent = lstatSync(dirname(executable));
  if (!parent.isDirectory() || parent.isSymbolicLink() || (parent.mode & 0o777) !== 0o500) {
    throw new Error(`${prefix}_SEALED_PARENT`);
  }
  const capture = captureFile(executable, { mode: 0o500, label: `${prefix}_SEALED_EXECUTABLE` });
  if (capture.sha256 !== binding.sha256) throw new Error(`${prefix}_HASH`);
  if (!executeVersionCheck) return true;
  const result = spawnSync(executable, args, {
    encoding: "utf8",
    shell: false,
    env: { PATH: "/usr/bin:/bin", LANG: "C", LC_ALL: "C" },
  });
  if (result.status !== 0 || !result.stdout.trim().startsWith(binding.version)) throw new Error(`${prefix}_VERSION`);
  return true;
}

function nextLedgerBase(ledgerPath, authorityHash, runId, stage, event, extra = {}) {
  const text = readFileSync(ledgerPath, "utf8");
  const verified = verifyLedger(text, authorityHash, runId);
  return {
    sequence: verified.count,
    runId,
    authorityHash,
    previousHash: verified.lastHash,
    recordedAt: new Date().toISOString(),
    stage,
    event,
    ...extra,
  };
}

function append(ledgerPath, authorityHash, runId, stage, event, extra = {}) {
  appendLedgerEntry(ledgerPath, nextLedgerBase(ledgerPath, authorityHash, runId, stage, event, extra));
}

function safeEnvironment() {
  return {
    PATH: "/usr/bin:/bin",
    LANG: "C",
    LC_ALL: "C",
    NO_PROXY: "*",
    no_proxy: "*",
  };
}

function runStatic(parsed, auth, authorityHash) {
  void parsed;
  void auth;
  void authorityHash;
  throw new Error("STATIC_CHILD_EXECUTION_PROHIBITED");
}

function createExclusiveOutput(path, privateRoot) {
  const root = resolve(privateRoot);
  const rootInfo = lstatSync(root);
  if (!rootInfo.isDirectory() || rootInfo.isSymbolicLink()) throw new Error("PRIVATE_ROOT_TYPE");
  let cursor = root;
  for (const component of relative(root, dirname(path)).split("/").filter(Boolean)) {
    cursor = resolve(cursor, component);
    if (!existsSync(cursor)) mkdirSync(cursor, { mode: 0o700 });
    const info = lstatSync(cursor);
    if (!info.isDirectory() || info.isSymbolicLink()) throw new Error("OUTPUT_PARENT_TYPE");
  }
  const descriptor = openSync(path, "wx", 0o600);
  closeSync(descriptor);
  if ((statSync(path).mode & 0o777) !== 0o600) throw new Error("OUTPUT_MODE");
}

export function acquireNetworkLock(auth) {
  if (auth.limits.maximumConcurrentRequests !== 1) throw new Error("NETWORK_CONCURRENCY_CONTRACT");
  const runtimeRoot = resolve(process.cwd(), auth.privateRoot, "runtime");
  const runtimeInfo = lstatSync(runtimeRoot);
  if (!runtimeInfo.isDirectory() || runtimeInfo.isSymbolicLink() ||
    (runtimeInfo.mode & 0o777) !== 0o700) throw new Error("NETWORK_RUNTIME_ROOT");
  const lockPath = resolve(runtimeRoot, "network-operation.lock");
  let descriptor;
  try {
    descriptor = openSync(lockPath, "wx", 0o600);
    writeSync(descriptor, `${auth.runId}\n`);
    fsyncSync(descriptor);
  } catch (error) {
    if (descriptor !== undefined) closeSync(descriptor);
    throw new Error(`NETWORK_LOCK:${error instanceof Error ? error.message : String(error)}`);
  }
  let released = false;
  return () => {
    if (released) return;
    released = true;
    closeSync(descriptor);
    unlinkSync(lockPath);
  };
}

function enforceNetworkBudgets(auth, ledger, request, now) {
  const intents = ledger.entries.filter((entry) => entry.event === "NETWORK_INTENT");
  const results = ledger.entries.filter((entry) => entry.event === "NETWORK_RESULT");
  const first = intents[0];
  if (first && now.getTime() - new Date(first.recordedAt).getTime() >= auth.limits.maximumDurationMinutes * 60_000) {
    throw new Error("NETWORK_DURATION_LIMIT");
  }
  if (intents.length >= auth.limits.maximumObjects) throw new Error("NETWORK_OBJECT_LIMIT");
  const totalBytes = results.reduce((sum, entry) => sum + (Number.isInteger(entry.receivedSize) ? entry.receivedSize : 0), 0);
  if (totalBytes + request.maximumBytes > auth.limits.maximumTotalBytes) throw new Error("NETWORK_TOTAL_BYTE_LIMIT");
  const attempts = intents.filter((entry) => entry.requestId === request.requestId).length;
  if (attempts >= auth.limits.maximumAttemptsBeforeAcceptedBytes) throw new Error("NETWORK_ATTEMPT_LIMIT");
  const priorResults = results.filter((entry) => entry.requestId === request.requestId);
  if (priorResults.some((entry) => entry.exitCode === 0 || (entry.receivedSize ?? 0) > 0)) throw new Error("NETWORK_RETRY_NOT_TRANSPORT_ONLY");
  const redirects = intents.filter((entry) => entry.redirectedFromSourceId != null).length;
  if (request.redirectedFromSourceId != null && redirects >= auth.limits.maximumRedirects) {
    throw new Error("NETWORK_REDIRECT_LIMIT");
  }
  const space = statfsSync(resolve(auth.privateRoot));
  if (Number(space.bavail) * Number(space.bsize) < auth.limits.minimumFreeSpaceBytes) throw new Error("NETWORK_FREE_SPACE");
}

export function verifyAuthorizedRequestFile(auth, requestPath) {
  const requestsRoot = resolve(process.cwd(), auth.privateRoot, "evidence", "requests");
  if (!resolve(requestPath).startsWith(`${requestsRoot}/`)) throw new Error("REQUEST_PATH_BOUNDARY");
  const requestCapture = captureFile(requestPath, { mode: 0o600, label: "REQUEST_FILE" });
  const requestHash = requestCapture.sha256;
  if (!auth.allowedRequestSha256s.includes(requestHash)) throw new Error("REQUEST_NOT_AUTHORIZED");
  const request = parseCapturedJson(requestCapture, "REQUEST");
  if (resolve(requestPath) !== resolve(requestsRoot, `${request.requestId}.json`)) throw new Error("REQUEST_PATH_BINDING");
  return { request, requestHash };
}

export function verifyMetadataCommitBinding(auth, request) {
  const metadataCommitPath = resolveRunOwnedPath(auth.privateRoot, request.metadataCommitRelativePath);
  const commitCapture = captureFile(metadataCommitPath, { mode: 0o600, label: "METADATA_COMMIT_FILE" });
  if (commitCapture.sha256 !== request.metadataCommitSha256) throw new Error("METADATA_COMMIT_HASH");
  const member = validateMetadataCommitForRequest(
    parseCapturedJson(commitCapture, "METADATA_COMMIT"), request, auth.runId, auth.sourcePolicy,
  );
  return { metadataCommitPath, member };
}

function runNetworkLocked(parsed, auth, authorityHash, now) {
  validateAuthorization(auth, now, { allowNetwork: true });
  if (!auth.actionFlags.network || !auth.actionFlags.download) throw new Error("NETWORK_CLOSED");
  const { request, requestHash } = verifyAuthorizedRequestFile(auth, parsed.requestPath);
  if (request.classification !== "RUN_BOUND_NETWORK_REQUEST") throw new Error("REQUEST_NOT_RUN_BOUND");
  if (request.stage !== parsed.stage) throw new Error("REQUEST_STAGE_BINDING");
  const source = validateNetworkRequest(request, auth.sourcePolicy, auth.limits);
  if (request.stage === "ARTIFACT_RETRIEVAL") {
    verifyMetadataCommitBinding(auth, request);
  }
  const ledger = verifyLedger(readFileSync(parsed.ledgerPath, "utf8"), authorityHash, auth.runId);
  enforceNetworkBudgets(auth, ledger, request, now);
  const output = resolveRunOwnedPath(auth.privateRoot, request.outputRelativePath);
  const args = buildCurlArguments(request, source, output);
  const curlExecutable = resolveRunOwnedPath(auth.privateRoot, auth.curlBinding.sealedRelativePath);
  if (!commandAllowed(auth, parsed.stage, curlExecutable, args)) throw new Error("COMMAND_NOT_ALLOWED");

  append(parsed.ledgerPath, authorityHash, auth.runId, parsed.stage, "NETWORK_INTENT", {
    executable: curlExecutable,
    arguments: args,
    requestId: request.requestId,
    requestSha256: requestHash,
    sourceId: request.sourceId,
    redirectedFromSourceId: request.redirectedFromSourceId ?? null,
    outputRelativePath: request.outputRelativePath,
    maximumBytes: request.maximumBytes,
    expectedSha256: request.expectedSha256,
    expectedSize: request.expectedSize,
    metadataCommitRelativePath: request.metadataCommitRelativePath,
    metadataCommitSha256: request.metadataCommitSha256,
  });
  createExclusiveOutput(output, auth.privateRoot);
  const result = spawnSync(curlExecutable, args, {
    cwd: process.cwd(), encoding: "utf8", shell: false, env: safeEnvironment(), timeout: 305000,
  });
  const receivedSize = statSync(output).size;
  const receivedSha256 = captureFile(output, { label: "NETWORK_OUTPUT" }).sha256;
  append(parsed.ledgerPath, authorityHash, auth.runId, parsed.stage, "NETWORK_RESULT", {
    executable: curlExecutable,
    arguments: args,
    requestId: request.requestId,
    requestSha256: requestHash,
    outputRelativePath: request.outputRelativePath,
    metadataCommitSha256: request.metadataCommitSha256,
    exitCode: result.status ?? 255,
    stdoutSha256: sha256Text(result.stdout ?? ""),
    stderrSha256: sha256Text(result.stderr ?? ""),
    receivedSize,
    receivedSha256,
  });
  process.stdout.write(result.stdout ?? "");
  process.stderr.write(result.stderr ?? "");
  if (result.status !== 0) throw new Error(`NETWORK_EXIT:${result.status}`);
  if (receivedSize > request.maximumBytes) throw new Error("NETWORK_SIZE");
  if (request.expectedSize !== null && receivedSize !== request.expectedSize) throw new Error("NETWORK_EXPECTED_SIZE");
  if (request.expectedSha256 !== null && receivedSha256 !== request.expectedSha256) throw new Error("NETWORK_EXPECTED_HASH");
  return true;
}

function runNetwork(parsed, auth, authorityHash, now) {
  void parsed;
  void auth;
  void authorityHash;
  void now;
  throw new Error("LEGACY_NETWORK_LAUNCHER_PROHIBITED_USE_WP116_TRUSTED_BOOTSTRAP");
}

export function runAuthorized(parsed, now = new Date()) {
  const authorizationCapture = captureFile(parsed.authorizationPath, { mode: 0o600, label: "AUTHORIZATION" });
  const auth = parseCapturedJson(authorizationCapture, "AUTHORIZATION");
  validateAuthorization(auth, now, { allowNetwork: NETWORK_STAGES.has(parsed.stage) });
  exactPrivatePath(auth, parsed.authorizationPath, "authorization.json");
  exactPrivatePath(auth, parsed.ledgerPath, "operation-ledger.ndjson");
  verifyControlBindings(auth);
  validateToolBinding(auth.nodeBinding, WP118_CONTRACT.node, auth.privateRoot, ["--version"], "NODE", false);
  validateToolBinding(auth.curlBinding, WP118_CONTRACT.curl, auth.privateRoot, [], "CURL", false);
  const authorityHash = authorizationCapture.sha256;
  verifyLedger(readFileSync(parsed.ledgerPath, "utf8"), authorityHash, auth.runId);
  return STATIC_STAGES.has(parsed.stage) ? runStatic(parsed, auth, authorityHash) : runNetwork(parsed, auth, authorityHash, now);
}

function main() {
  runAuthorized(parseArguments(process.argv.slice(2)));
}

if (process.argv[1] && resolve(process.argv[1]) === resolve(fileURLToPath(import.meta.url))) {
  try {
    main();
  } catch (error) {
    process.stderr.write(`${error instanceof Error ? error.message : String(error)}\n`);
    process.exitCode = 1;
  }
}
