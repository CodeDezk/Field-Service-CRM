import { createHash } from "node:crypto";
import {
  closeSync, constants, fstatSync, fsyncSync, openSync, readFileSync, statSync, writeSync,
} from "node:fs";
import { isAbsolute, resolve } from "node:path";

export const ACCEPTED_SOURCE_POLICY = Object.freeze({
  schema: "wave-a-network-source-policy-v1",
  classification: "ACCEPTED_POLICY_NOT_EXECUTION_AUTHORITY",
  entries: Object.freeze([
    Object.freeze({ id: "WP112-SOURCE-001", scheme: "https", host: "storage.googleapis.com", port: 443,
      path: "/flutter_infra_release/releases/releases_macos.json", stages: Object.freeze(["METADATA_RETRIEVAL"]), redirectLimit: 0 }),
    Object.freeze({ id: "WP112-SOURCE-002", scheme: "https", host: "storage.googleapis.com", port: 443,
      pathPrefix: "/flutter_infra_release/releases/", stages: Object.freeze(["ARTIFACT_RETRIEVAL"]), redirectLimit: 0 }),
    Object.freeze({ id: "WP112-SOURCE-003", scheme: "https", host: "pub.dev", port: 443,
      pathPrefix: "/api/packages/", stages: Object.freeze(["METADATA_RETRIEVAL"]), redirectLimit: 0 }),
    Object.freeze({ id: "WP112-SOURCE-004", scheme: "https", host: "pub.dev", port: 443,
      pathPrefix: "/api/archives/", stages: Object.freeze(["ARTIFACT_RETRIEVAL"]), redirectLimit: 1,
      redirectDestinationId: "WP112-SOURCE-005" }),
    Object.freeze({ id: "WP112-SOURCE-005", scheme: "https", host: "storage.googleapis.com", port: 443,
      pathPrefix: "/pub.dartlang.org/packages/", stages: Object.freeze(["ARTIFACT_RETRIEVAL_REDIRECT_DESTINATION"]), redirectLimit: 0 }),
  ]),
});

export const WP118_CONTRACT = Object.freeze({
  publishedRevision: "f413055b93667a9ae6faed007dd6c48572a81a7b",
  repositoryTree: "44fe7996998147510d695ab936eb8fc94eae80eb",
  runId: "wp118-2026-10-14-01",
  publicRoot: "proofs/wave-a-offline-artifact-acquisition/",
  privateRoot: "internal-local/work-packages/WP-118/",
  node: Object.freeze({
    sourcePath: "/Users/aungmyooo/.nvm/versions/node/v22.23.1/bin/node",
    sealedRelativePath: "sealed-executables/node",
    version: "v22.23.1",
    sha256: "2e3f1286a7eb3736346ed1803e458a0ff909e2b2d5bc746144dcb76970e9b99d",
  }),
  curl: Object.freeze({
    sourcePath: "/usr/bin/curl",
    sealedRelativePath: "sealed-executables/curl",
    version: "curl 8.7.1",
    sha256: "b636262803922ee1dd0fbf614818473ffa53c811e44fd3278c2270d3af4759d3",
  }),
  limits: Object.freeze({
    maximumDurationMinutes: 45,
    maximumConcurrentRequests: 1,
    maximumAttemptsBeforeAcceptedBytes: 3,
    maximumTotalBytes: 4294967296,
    maximumSingleResponseBytes: 2147483648,
    maximumObjects: 2000,
    maximumRedirects: 3,
    minimumFreeSpaceBytes: 21474836480,
    maximumFlutterMetadataBytes: 8388608,
    maximumPubMetadataBytes: 2097152,
  }),
});

const HASH = /^[a-f0-9]{64}$/;
const GIT_OBJECT = /^[a-f0-9]{40}$/;
export const WP118_OWNER_SIGNING_KEY_ID = "wp118-synthetic-rfc8032-test-vector-1";
export const SYNTHETIC_OWNER_SIGNING_KEY_ID = WP118_OWNER_SIGNING_KEY_ID;
const STATIC_STAGES = ["STATIC_TESTS", "STATIC_VERIFY"];
const NETWORK_STAGES = ["METADATA_RETRIEVAL", "ARTIFACT_RETRIEVAL"];
const REQUIRED_STATIC_FLAGS = ["staticMaterialization", "staticTests", "staticVerify", "sealEvidence"];
const CLOSED_STATIC_FLAGS = [
  "freshValidator",
  "network", "dns", "metadataRetrieval", "download", "artifactAcquisition", "archiveInspection", "extraction",
  "sdkOrCacheMutation", "dependencyRestore", "build", "device", "runtime", "proofExecution",
  "applicationCoding", "architectureSelection", "infrastructure", "deployment", "providerOrCost",
  "customerOrLiveData", "commitOrPush",
];

export function canonicalJson(value) {
  if (Array.isArray(value)) return `[${value.map(canonicalJson).join(",")}]`;
  if (value && typeof value === "object") {
    return `{${Object.keys(value).sort().map((key) => `${JSON.stringify(key)}:${canonicalJson(value[key])}`).join(",")}}`;
  }
  return JSON.stringify(value);
}

export function sha256Text(value) {
  return createHash("sha256").update(value).digest("hex");
}

export function sha256Bytes(value) {
  return createHash("sha256").update(value).digest("hex");
}

function sameIdentity(left, right) {
  return left.dev === right.dev && left.ino === right.ino && left.mode === right.mode &&
    left.nlink === right.nlink && left.uid === right.uid && left.gid === right.gid &&
    left.size === right.size && left.mtimeMs === right.mtimeMs && left.ctimeMs === right.ctimeMs;
}

export function captureFile(path, options = {}) {
  const descriptor = openSync(path, constants.O_RDONLY | constants.O_NOFOLLOW);
  try {
    const before = fstatSync(descriptor);
    if (!before.isFile() || before.nlink !== 1) throw new Error(`${options.label ?? "FILE"}_TYPE`);
    if (options.mode !== undefined && (before.mode & 0o777) !== options.mode) {
      throw new Error(`${options.label ?? "FILE"}_MODE`);
    }
    const bytes = readFileSync(descriptor);
    const after = fstatSync(descriptor);
    if (!sameIdentity(before, after) || bytes.length !== after.size) {
      throw new Error(`${options.label ?? "FILE"}_CHANGED_DURING_CAPTURE`);
    }
    return Object.freeze({
      bytes,
      text: bytes.toString("utf8"),
      sha256: sha256Bytes(bytes),
      identity: Object.freeze({
        dev: after.dev,
        ino: after.ino,
        mode: after.mode,
        nlink: after.nlink,
        uid: after.uid,
        gid: after.gid,
        size: after.size,
        mtimeMs: after.mtimeMs,
        ctimeMs: after.ctimeMs,
      }),
    });
  } finally {
    closeSync(descriptor);
  }
}

export function parseCapturedJson(capture, label = "JSON") {
  try {
    return JSON.parse(capture.text);
  } catch {
    throw new Error(`${label}_JSON`);
  }
}

export function sha256File(path) {
  return captureFile(path).sha256;
}

export function safeRelativePath(path) {
  if (!path || isAbsolute(path) || path.includes("\0") || path.includes("\\")) throw new Error("UNSAFE_PATH");
  const parts = path.split("/");
  if (parts.some((part) => part === "" || part === "." || part === "..")) throw new Error("UNSAFE_PATH");
  return path;
}

function same(left, right) {
  return canonicalJson(left) === canonicalJson(right);
}

export function validateSourcePolicy(policy) {
  if (policy?.schema !== "wave-a-network-source-policy-v1" || policy.classification !== "ACCEPTED_POLICY_NOT_EXECUTION_AUTHORITY") {
    throw new Error("SOURCE_POLICY_CLASS");
  }
  if (!Array.isArray(policy.entries) || policy.entries.length !== 5) throw new Error("SOURCE_POLICY_COUNT");
  const ids = new Set();
  for (const entry of policy.entries) {
    if (!/^WP112-SOURCE-00[1-5]$/.test(entry.id ?? "") || ids.has(entry.id)) throw new Error("SOURCE_ID");
    ids.add(entry.id);
    if (entry.scheme !== "https" || entry.port !== 443) throw new Error("SOURCE_TRANSPORT");
    if (!new Set(["pub.dev", "storage.googleapis.com"]).has(entry.host)) throw new Error("SOURCE_HOST");
    if (!Array.isArray(entry.stages) || entry.stages.length !== 1) throw new Error("SOURCE_STAGE");
    if (!Number.isInteger(entry.redirectLimit) || entry.redirectLimit < 0 || entry.redirectLimit > 1) {
      throw new Error("SOURCE_REDIRECT");
    }
    const boundary = entry.path ?? entry.pathPrefix;
    if (!boundary?.startsWith("/") || boundary.includes("..") || boundary.includes("?") || boundary.includes("#")) {
      throw new Error("SOURCE_PATH");
    }
  }
  const redirect = policy.entries.find((entry) => entry.id === "WP112-SOURCE-004");
  if (redirect?.redirectDestinationId !== "WP112-SOURCE-005") throw new Error("SOURCE_REDIRECT_DESTINATION");
  if (!same(policy, ACCEPTED_SOURCE_POLICY)) throw new Error("SOURCE_POLICY_EXACT");
  return true;
}

export function validateLimits(limits) {
  if (!same(limits, WP118_CONTRACT.limits)) throw new Error("LIMITS");
  return true;
}

function validateTool(binding, expected, label) {
  if (!same(binding, expected)) throw new Error(`${label}_BINDING`);
}

export function validateAuthorization(auth, now = new Date(), options = {}) {
  if (auth?.schema !== "wave-a-acquisition-launcher-authorization-v1" || auth.singleUse !== true) {
    throw new Error("AUTH_SCHEMA");
  }
  if (!HASH.test(auth.ownerAuthorizationSha256 ?? "") || !HASH.test(auth.publicControlInventorySha256 ?? "")) {
    throw new Error("AUTH_HASH_BINDING");
  }
  if (auth.signatureAlgorithm !== "Ed25519" ||
    !/^[a-z0-9][a-z0-9._-]{7,127}$/.test(auth.ownerSigningKeyId ?? "") ||
    !HASH.test(auth.ownerTrustRootSha256 ?? "") ||
    !HASH.test(auth.trustedBootstrapSha256 ?? "") || !HASH.test(auth.trustedLauncherSha256 ?? "") ||
    !auth.trustedBootstrapPath?.startsWith("/") ||
    !auth.trustedLauncherPath?.startsWith("/")) throw new Error("AUTH_OWNER_SIGNATURE_BINDING");
  if (auth.operator !== "/root" || auth.publicRoot !== WP118_CONTRACT.publicRoot) throw new Error("AUTH_BOUNDARY");
  validateTool(auth.nodeBinding, WP118_CONTRACT.node, "NODE");
  validateTool(auth.curlBinding, WP118_CONTRACT.curl, "CURL");
  validateSourcePolicy(auth.sourcePolicy);
  validateLimits(auth.limits);
  if (auth.state === "EFFECTIVE_STATIC_ONLY") {
    if (auth.publishedRevision !== WP118_CONTRACT.publishedRevision ||
      auth.repositoryTree !== WP118_CONTRACT.repositoryTree ||
      auth.ownerSigningKeyId !== WP118_OWNER_SIGNING_KEY_ID) throw new Error("AUTH_STATIC_REVISION_KEY");
    if (!(new Date(auth.validFrom) <= now && now < new Date(auth.expiresAt))) throw new Error("AUTH_TIME");
    if (auth.runId !== WP118_CONTRACT.runId || auth.privateRoot !== WP118_CONTRACT.privateRoot || auth.consumed !== false) {
      throw new Error("AUTH_STATIC_BOUNDARY");
    }
    if (!same(auth.allowedStages, STATIC_STAGES)) throw new Error("AUTH_STATIC_STAGES");
    if (!same(auth.allowedRequestSha256s, [])) throw new Error("AUTH_STATIC_REQUESTS");
    for (const flag of REQUIRED_STATIC_FLAGS) if (auth.actionFlags?.[flag] !== true) throw new Error(`AUTH_REQUIRED:${flag}`);
    for (const flag of CLOSED_STATIC_FLAGS) if (auth.actionFlags?.[flag] !== false) throw new Error(`AUTH_CLOSED:${flag}`);
  } else if (auth.state === "EFFECTIVE_NETWORK") {
    if (!(new Date(auth.validFrom) <= now && now < new Date(auth.expiresAt))) throw new Error("AUTH_TIME");
    if (options.allowNetwork !== true) throw new Error("AUTH_NETWORK_NOT_PERMITTED");
    if (!GIT_OBJECT.test(auth.publishedRevision ?? "") || !GIT_OBJECT.test(auth.repositoryTree ?? "") ||
      auth.ownerSigningKeyId === SYNTHETIC_OWNER_SIGNING_KEY_ID) throw new Error("AUTH_NETWORK_TRUST_ROOT");
    if (options.expectedRevision && auth.publishedRevision !== options.expectedRevision) throw new Error("AUTH_REVISION");
    if (options.expectedTree && auth.repositoryTree !== options.expectedTree) throw new Error("AUTH_TREE");
    if (options.expectedOwnerSigningKeyId &&
      auth.ownerSigningKeyId !== options.expectedOwnerSigningKeyId) throw new Error("AUTH_OWNER_KEY");
    if (options.expectedTrustRootSha256 &&
      auth.ownerTrustRootSha256 !== options.expectedTrustRootSha256) throw new Error("AUTH_TRUST_ROOT");
    if (auth.consumed !== false || auth.privateRoot === WP118_CONTRACT.privateRoot) throw new Error("AUTH_NETWORK_BOUNDARY");
    if (!NETWORK_STAGES.every((stage) => auth.allowedStages.includes(stage))) throw new Error("AUTH_NETWORK_STAGES");
    if (!Array.isArray(auth.allowedRequestSha256s) || auth.allowedRequestSha256s.length < 1 ||
      new Set(auth.allowedRequestSha256s).size !== auth.allowedRequestSha256s.length ||
      !auth.allowedRequestSha256s.every((hash) => HASH.test(hash))) throw new Error("AUTH_NETWORK_REQUESTS");
    for (const flag of ["network", "dns", "metadataRetrieval", "download", "artifactAcquisition"]) {
      if (auth.actionFlags?.[flag] !== true) throw new Error(`AUTH_NETWORK_FLAG:${flag}`);
    }
    for (const flag of ["sdkOrCacheMutation", "dependencyRestore", "build", "device", "runtime", "proofExecution",
      "applicationCoding", "architectureSelection", "infrastructure", "deployment", "providerOrCost",
      "customerOrLiveData", "commitOrPush"]) {
      if (auth.actionFlags?.[flag] !== false) throw new Error(`AUTH_CLOSED:${flag}`);
    }
  } else if (auth.state === "CONSUMED") {
    if (options.allowConsumed !== true || auth.consumed !== true ||
      !HASH.test(auth.effectiveAuthorizationSha256 ?? "") || !HASH.test(auth.primaryInventorySha256 ?? "") ||
      Number.isNaN(new Date(auth.consumedAt).getTime())) {
      throw new Error("AUTH_CONSUMED");
    }
  } else throw new Error("AUTH_STATE");

  if (!Array.isArray(auth.allowedCommands) || auth.allowedCommands.length < 1) throw new Error("AUTH_COMMANDS");
  return true;
}

function sourceForRequest(request, policy) {
  const source = policy.entries.find((entry) => entry.id === request.sourceId);
  const isCommittedRedirectDestination = request.stage === "ARTIFACT_RETRIEVAL" &&
    request.sourceId === "WP112-SOURCE-005" && request.redirectedFromSourceId === "WP112-SOURCE-004" &&
    source?.stages.includes("ARTIFACT_RETRIEVAL_REDIRECT_DESTINATION");
  if (!source || (!source.stages.includes(request.stage) && !isCommittedRedirectDestination)) {
    throw new Error("REQUEST_SOURCE_STAGE");
  }
  if (request.sourceId === "WP112-SOURCE-004") throw new Error("REQUEST_REDIRECT_NOT_RESOLVED");
  const url = new URL(request.url);
  if (url.protocol !== "https:" || url.port || url.username || url.password || url.search || url.hash) {
    throw new Error("REQUEST_URL");
  }
  if (url.hostname !== source.host) throw new Error("REQUEST_HOST");
  if (source.path && url.pathname !== source.path) throw new Error("REQUEST_PATH");
  if (source.pathPrefix && !url.pathname.startsWith(source.pathPrefix)) throw new Error("REQUEST_PATH");
  if (url.pathname.includes("..") || url.pathname.includes("//") || url.pathname.includes("%")) throw new Error("REQUEST_PATH");
  if (request.sourceId === "WP112-SOURCE-003" &&
    !/^\/api\/packages\/[a-z0-9_]+\/versions\/[A-Za-z0-9.+-]+$/.test(url.pathname)) {
    throw new Error("REQUEST_PUB_METADATA_PATH");
  }
  return source;
}

export function validateNetworkRequest(request, policy, limits = WP118_CONTRACT.limits) {
  if (request?.schema !== "wave-a-network-request-v1") throw new Error("REQUEST_SCHEMA");
  if (!new Set(["SYNTHETIC_STATIC_NO_EXECUTION", "RUN_BOUND_NETWORK_REQUEST"]).has(request.classification)) {
    throw new Error("REQUEST_CLASS");
  }
  if (!/^[a-z0-9][a-z0-9._-]{0,127}$/.test(request.requestId ?? "")) throw new Error("REQUEST_ID");
  if (!NETWORK_STAGES.includes(request.stage)) throw new Error("REQUEST_STAGE");
  const source = sourceForRequest(request, policy);
  const output = safeRelativePath(request.outputRelativePath);
  const expectedPrefix = request.stage === "METADATA_RETRIEVAL" ? "quarantine/metadata/" : "quarantine/artifacts/";
  if (!output.startsWith(expectedPrefix)) throw new Error("REQUEST_OUTPUT");
  if (!Number.isInteger(request.maximumBytes) || request.maximumBytes < 1 || request.maximumBytes > limits.maximumSingleResponseBytes) {
    throw new Error("REQUEST_BYTES");
  }
  if (request.stage === "METADATA_RETRIEVAL") {
    if (request.redirectedFromSourceId != null) throw new Error("REQUEST_REDIRECT_FIELDS");
    if (request.metadataCommitRelativePath !== null) throw new Error("REQUEST_METADATA_FIELDS");
    const ceiling = request.sourceId === "WP112-SOURCE-001" ? limits.maximumFlutterMetadataBytes : limits.maximumPubMetadataBytes;
    if (request.maximumBytes > ceiling || request.expectedSha256 !== null || request.expectedSize !== null || request.metadataCommitSha256 !== null) {
      throw new Error("REQUEST_METADATA_FIELDS");
    }
  } else if (!HASH.test(request.expectedSha256 ?? "") || !Number.isInteger(request.expectedSize) || request.expectedSize < 1 ||
    !HASH.test(request.metadataCommitSha256 ?? "") ||
    safeRelativePath(request.metadataCommitRelativePath) !== "evidence/metadata-commit.json") {
    throw new Error("REQUEST_ARTIFACT_FIELDS");
  }
  if (request.sourceId === "WP112-SOURCE-005" && request.redirectedFromSourceId !== "WP112-SOURCE-004") {
    throw new Error("REQUEST_REDIRECT_COMMIT");
  }
  return source;
}

export function validateMetadataCommitForRequest(commit, request, runId, sourcePolicy) {
  if (commit?.schema !== "wave-a-run-bound-metadata-commit-v1" || commit.stage !== "METADATA_COMMITTED" ||
    commit.runId !== runId || commit.sourcePolicySha256 !== sha256Text(canonicalJson(sourcePolicy)) ||
    !Array.isArray(commit.entries) || commit.entries.length < 1 || Number.isNaN(new Date(commit.committedAt).getTime())) {
    throw new Error("METADATA_COMMIT_SHAPE");
  }
  const ids = new Set();
  for (const entry of commit.entries) {
    if (!entry.artifactId || ids.has(entry.artifactId) || !HASH.test(entry.sha256 ?? "") ||
      !Number.isInteger(entry.size) || entry.size < 1 ||
      !["EXECUTABLE_PROOF_ARTIFACT", "TRANSITIVE_PROOF_ARTIFACT", "SOURCE_REVIEW_ONLY"].includes(entry.purpose)) {
      throw new Error("METADATA_COMMIT_ENTRY");
    }
    ids.add(entry.artifactId);
  }
  const matches = commit.entries.filter((entry) => entry.requestId === request.requestId &&
    entry.sourceId === request.sourceId && entry.url === request.url &&
    entry.outputRelativePath === request.outputRelativePath && entry.sha256 === request.expectedSha256 &&
    entry.size === request.expectedSize && (entry.redirectedFromSourceId ?? null) === (request.redirectedFromSourceId ?? null));
  if (matches.length !== 1) throw new Error("METADATA_COMMIT_MEMBERSHIP");
  return matches[0];
}

export function buildCurlArguments(request, source, absoluteOutput) {
  if (!isAbsolute(absoluteOutput)) throw new Error("OUTPUT_ABSOLUTE");
  const args = [
    "--disable", "--fail", "--silent", "--show-error", "--proto", "=https", "--proto-redir", "=https",
    "--noproxy", "*", "--connect-timeout", "10", "--max-time", "300", "--max-filesize", String(request.maximumBytes),
    "--max-redirs", "0",
  ];
  args.push("--output", absoluteOutput, "--write-out", "%{json}", request.url);
  return args;
}

export function commandAllowed(auth, stage, executable, args) {
  return auth.allowedStages.includes(stage) && auth.allowedCommands.some((entry) =>
    entry.stage === stage && entry.executable === executable && same(entry.arguments, args));
}

export function computeLedgerEntryHash(entry) {
  const payload = { ...entry };
  delete payload.entryHash;
  return sha256Text(canonicalJson(payload));
}

export function verifyLedger(text, authorityHash, runId) {
  if (!HASH.test(authorityHash ?? "")) throw new Error("LEDGER_AUTHORITY");
  const lines = text.split("\n").filter(Boolean);
  if (!lines.length) throw new Error("LEDGER_EMPTY");
  let previous = authorityHash;
  for (let index = 0; index < lines.length; index += 1) {
    const entry = JSON.parse(lines[index]);
    if (entry.sequence !== index || entry.runId !== runId || entry.authorityHash !== authorityHash || entry.previousHash !== previous) {
      throw new Error("LEDGER_CHAIN");
    }
    if (computeLedgerEntryHash(entry) !== entry.entryHash) throw new Error("LEDGER_HASH");
    previous = entry.entryHash;
  }
  return { count: lines.length, lastHash: previous, entries: lines.map((line) => JSON.parse(line)) };
}

export function appendLedgerEntry(path, entry) {
  if ((statSync(path).mode & 0o777) !== 0o600) throw new Error("LEDGER_MODE");
  const descriptor = openSync(path, "a");
  try {
    writeSync(descriptor, `${canonicalJson({ ...entry, entryHash: computeLedgerEntryHash(entry) })}\n`);
    fsyncSync(descriptor);
  } finally {
    closeSync(descriptor);
  }
}

export function resolveRunOwnedPath(privateRoot, relativePath) {
  const root = resolve(privateRoot);
  const candidate = resolve(root, safeRelativePath(relativePath));
  if (!candidate.startsWith(`${root}/`)) throw new Error("RUN_PATH");
  return candidate;
}
