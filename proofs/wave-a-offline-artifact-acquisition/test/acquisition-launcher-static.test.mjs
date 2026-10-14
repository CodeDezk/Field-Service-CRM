import assert from "node:assert/strict";
import test from "node:test";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import {
  buildCurlArguments,
  captureFile,
  canonicalJson,
  commandAllowed,
  computeLedgerEntryHash,
  safeRelativePath,
  sha256File,
  sha256Text,
  validateAuthorization,
  validateMetadataCommitForRequest,
  validateNetworkRequest,
  validateSourcePolicy,
  verifyLedger,
  WP118_CONTRACT,
} from "../tool/network-contract.mjs";
import {
  acquireNetworkLock, parseArguments, validateToolBinding, verifyAuthorizedRequestFile,
  verifyControlBindings, verifyMetadataCommitBinding,
} from "../tool/acquisition-launcher.mjs";
import { verifyNetworkLauncher } from "../tool/verify-network-launcher.mjs";

const root = resolve("proofs/wave-a-offline-artifact-acquisition");
const recordedAuth = JSON.parse(readFileSync("internal-local/work-packages/WP-118/effective-authorization.json", "utf8"));
const auth = structuredClone(recordedAuth);
if (auth.state === "CONSUMED") {
  auth.state = "EFFECTIVE_STATIC_ONLY";
  auth.consumed = false;
  delete auth.consumedAt;
  delete auth.effectiveAuthorizationSha256;
  delete auth.primaryInventorySha256;
}
const policy = JSON.parse(readFileSync(resolve(root, "fixtures/accepted-source-policy.json"), "utf8"));
const request = JSON.parse(readFileSync(resolve(root, "fixtures/synthetic-network-request.json"), "utf8"));
const commitFixture = JSON.parse(readFileSync(resolve(root, "fixtures/synthetic-run-bound-metadata-commit.json"), "utf8"));
const privateRoot = resolve("internal-local/work-packages/WP-118");
const artifactRequestPath = resolve(privateRoot, "evidence/requests/drift-2.35.2.json");

test("canonical JSON is deterministic", () => assert.equal(canonicalJson({ z: 1, a: 2 }), '{"a":2,"z":1}'));
test("single capture binds bytes, text, hash and identity", () => {
  const capture = captureFile(resolve(root, "fixtures/accepted-source-policy.json"));
  assert.equal(capture.sha256, sha256File(resolve(root, "fixtures/accepted-source-policy.json")));
  assert.equal(JSON.parse(capture.text).schema, "wave-a-network-source-policy-v1");
  assert.equal(capture.bytes.length, capture.identity.size);
  assert.equal(capture.identity.nlink, 1);
});
test("accepted five-entry source policy validates", () => assert.equal(validateSourcePolicy(policy), true));
test("source policy rejects an unapproved host", () => {
  const changed = structuredClone(policy);
  changed.entries[0].host = "example.com";
  assert.throws(() => validateSourcePolicy(changed), /SOURCE_HOST/);
});
test("source policy rejects drift from any exact accepted path", () => {
  const changed = structuredClone(policy);
  changed.entries[0].path = "/unaccepted/object.json";
  assert.throws(() => validateSourcePolicy(changed), /SOURCE_POLICY_EXACT/);
});
test("safe relative paths reject traversal and absolute paths", () => {
  assert.equal(safeRelativePath("quarantine/metadata/example.json"), "quarantine/metadata/example.json");
  assert.throws(() => safeRelativePath("../outside"), /UNSAFE_PATH/);
  assert.throws(() => safeRelativePath("/absolute"), /UNSAFE_PATH/);
});
test("synthetic metadata request validates without execution", () => {
  assert.equal(validateNetworkRequest(request, policy).id, "WP112-SOURCE-001");
});
test("request rejects credentials, queries and fragments", () => {
  for (const url of [
    "https://user:pass@storage.googleapis.com/flutter_infra_release/releases/releases_macos.json",
    "https://storage.googleapis.com/flutter_infra_release/releases/releases_macos.json?x=1",
    "https://storage.googleapis.com/flutter_infra_release/releases/releases_macos.json#x",
  ]) {
    const changed = { ...request, url };
    assert.throws(() => validateNetworkRequest(changed, policy), /REQUEST_URL/);
  }
});
test("request rejects wrong host, path and output class", () => {
  assert.throws(() => validateNetworkRequest({ ...request, url: "https://pub.dev/flutter_infra_release/releases/releases_macos.json" }, policy), /REQUEST_HOST/);
  assert.throws(() => validateNetworkRequest({ ...request, url: "https://storage.googleapis.com/other" }, policy), /REQUEST_PATH/);
  assert.throws(() => validateNetworkRequest({ ...request, outputRelativePath: "quarantine/artifacts/x" }, policy), /REQUEST_OUTPUT/);
});
test("metadata request rejects artifact integrity fields", () => {
  assert.throws(() => validateNetworkRequest({ ...request, expectedSha256: "a".repeat(64) }, policy), /REQUEST_METADATA_FIELDS/);
});
test("artifact request requires metadata commitment, hash and size", () => {
  const artifact = {
    ...request,
    classification: "RUN_BOUND_NETWORK_REQUEST",
    requestId: "drift-2.35.2",
    stage: "ARTIFACT_RETRIEVAL",
    sourceId: "WP112-SOURCE-005",
    redirectedFromSourceId: "WP112-SOURCE-004",
    url: "https://storage.googleapis.com/pub.dartlang.org/packages/drift-2.35.2.tar.gz",
    outputRelativePath: "quarantine/artifacts/drift-2.35.2.tar.gz",
    metadataCommitRelativePath: "evidence/metadata-commit.json",
  };
  assert.throws(() => validateNetworkRequest(artifact, policy), /REQUEST_ARTIFACT_FIELDS/);
  assert.equal(validateNetworkRequest({ ...artifact, expectedSha256: "a".repeat(64), expectedSize: 100,
    metadataCommitSha256: "b".repeat(64) }, policy).id, "WP112-SOURCE-005");
});
test("artifact request must be an exact member of its run-bound metadata commitment", () => {
  const artifact = {
    ...request,
    classification: "RUN_BOUND_NETWORK_REQUEST",
    requestId: "drift-2.35.2",
    stage: "ARTIFACT_RETRIEVAL",
    sourceId: "WP112-SOURCE-005",
    redirectedFromSourceId: "WP112-SOURCE-004",
    url: "https://storage.googleapis.com/pub.dartlang.org/packages/drift-2.35.2.tar.gz",
    outputRelativePath: "quarantine/artifacts/drift-2.35.2.tar.gz",
    expectedSha256: "a".repeat(64),
    expectedSize: 100,
    metadataCommitSha256: "b".repeat(64),
    metadataCommitRelativePath: "evidence/metadata-commit.json",
  };
  const commit = { ...structuredClone(commitFixture), runId: auth.runId,
    sourcePolicySha256: sha256Text(canonicalJson(policy)) };
  assert.equal(validateMetadataCommitForRequest(commit, artifact, auth.runId, policy).artifactId, "drift-2.35.2");
  assert.throws(() => validateMetadataCommitForRequest(commit, { ...artifact, expectedSize: 101 }, auth.runId, policy),
    /METADATA_COMMIT_MEMBERSHIP/);
});
test("pub metadata requires an exact version path", () => {
  const metadata = {
    ...request,
    requestId: "drift-metadata",
    sourceId: "WP112-SOURCE-003",
    url: "https://pub.dev/api/packages/drift/versions/2.35.2",
    outputRelativePath: "quarantine/metadata/drift-2.35.2.json",
    maximumBytes: 2097152,
  };
  assert.equal(validateNetworkRequest(metadata, policy).id, "WP112-SOURCE-003");
  assert.throws(() => validateNetworkRequest({ ...metadata, url: "https://pub.dev/api/packages/drift" }, policy), /REQUEST_PUB_METADATA_PATH/);
});
test("artifact redirects must be resolved to the exact committed destination", () => {
  const direct = {
    ...request,
    classification: "RUN_BOUND_NETWORK_REQUEST",
    requestId: "drift-direct",
    stage: "ARTIFACT_RETRIEVAL",
    sourceId: "WP112-SOURCE-004",
    url: "https://pub.dev/api/archives/drift-2.35.2.tar.gz",
    outputRelativePath: "quarantine/artifacts/drift-2.35.2.tar.gz",
    expectedSha256: "a".repeat(64),
    expectedSize: 100,
    metadataCommitSha256: "b".repeat(64),
    metadataCommitRelativePath: "evidence/metadata-commit.json",
  };
  assert.throws(() => validateNetworkRequest(direct, policy), /REQUEST_REDIRECT_NOT_RESOLVED/);
});
test("curl arguments disable config and proxy and bind output", () => {
  const source = validateNetworkRequest(request, policy);
  const args = buildCurlArguments(request, source, "/private/tmp/wp113-metadata.json");
  assert.equal(args[0], "--disable");
  assert.ok(args.includes("--noproxy"));
  assert.ok(args.includes("/private/tmp/wp113-metadata.json"));
  assert.equal(args.at(-1), request.url);
  assert.equal(args.includes("--location"), false);
  assert.equal(args[args.indexOf("--max-redirs") + 1], "0");
});
test("static authorization binds revision, paths, tools, policy and limits", () => {
  assert.equal(validateAuthorization(auth, new Date("2026-10-14T09:00:00.000Z")), true);
  assert.deepEqual(auth.allowedRequestSha256s, []);
});
test("static authorization rejects every network flag", () => {
  const changed = structuredClone(auth);
  changed.actionFlags.network = true;
  assert.throws(() => validateAuthorization(changed, new Date("2026-10-14T09:00:00.000Z")), /AUTH_CLOSED:network/);
});
test("consumed authorization remains verifiable after expiry", () => {
  const consumed = {
    ...structuredClone(auth),
    state: "CONSUMED",
    consumed: true,
    consumedAt: "2026-10-14T08:00:00.000Z",
    effectiveAuthorizationSha256: "a".repeat(64),
    primaryInventorySha256: "b".repeat(64),
  };
  assert.equal(validateAuthorization(consumed, new Date("2026-10-15T08:00:00.000Z"), { allowConsumed: true }), true);
});
test("network state is rejected without explicit validator option", () => {
  const changed = structuredClone(auth);
  changed.state = "EFFECTIVE_NETWORK";
  changed.privateRoot = "internal-local/work-packages/WP-999/";
  changed.allowedStages = ["METADATA_RETRIEVAL", "ARTIFACT_RETRIEVAL"];
  changed.allowedRequestSha256s = ["c".repeat(64)];
  for (const flag of ["network", "dns", "metadataRetrieval", "download", "artifactAcquisition"]) changed.actionFlags[flag] = true;
  assert.throws(() => validateAuthorization(changed, new Date("2026-10-14T09:00:00.000Z")), /AUTH_NETWORK_NOT_PERMITTED/);
});
test("only exact static commands are allowed", () => {
  const entry = auth.allowedCommands[0];
  assert.equal(commandAllowed(auth, entry.stage, entry.executable, entry.arguments), true);
  assert.equal(commandAllowed(auth, "METADATA_RETRIEVAL", WP118_CONTRACT.curl.sourcePath, []), false);
});
test("request integrity fields change the authorization hash", () => {
  const artifact = { ...request, expectedSha256: "a".repeat(64), expectedSize: 100,
    metadataCommitSha256: "b".repeat(64), metadataCommitRelativePath: "evidence/metadata-commit.json" };
  assert.notEqual(sha256Text(canonicalJson(artifact)), sha256Text(canonicalJson({ ...artifact, expectedSize: 101 })));
});
test("request file hash and metadata commitment are enforced from private evidence", () => {
  const bound = { ...structuredClone(auth), allowedRequestSha256s: [sha256File(artifactRequestPath)] };
  const { request: artifact, requestHash } = verifyAuthorizedRequestFile(bound, artifactRequestPath);
  assert.equal(requestHash, bound.allowedRequestSha256s[0]);
  assert.equal(verifyMetadataCommitBinding(bound, artifact).member.artifactId, "drift-2.35.2");
  assert.throws(() => verifyAuthorizedRequestFile({ ...bound, allowedRequestSha256s: ["f".repeat(64)] }, artifactRequestPath),
    /REQUEST_NOT_AUTHORIZED/);
  assert.throws(() => verifyMetadataCommitBinding(bound, { ...artifact, metadataCommitSha256: "f".repeat(64) }),
    /METADATA_COMMIT_HASH/);
});
test("argument parser separates static command and rejects malformed network shape", () => {
  const parsed = parseArguments(["--authorization", "a", "--ledger", "b", "--stage", "STATIC_TESTS", "--", "node", "--test"]);
  assert.deepEqual(parsed.command, ["node", "--test"]);
  assert.throws(() => parseArguments(["--authorization", "a", "--ledger", "b", "--stage", "METADATA_RETRIEVAL", "--", "curl"]), /ARG_NETWORK_SHAPE/);
});
test("ledger chain binds authority and ordering", () => {
  const authorityHash = "a".repeat(64);
  const base = { sequence: 0, runId: "test", authorityHash, previousHash: authorityHash,
    recordedAt: "2026-10-14T00:00:00.000Z", stage: "BOOTSTRAP", event: "AUTHORIZATION_BOUND" };
  const entry = { ...base, entryHash: computeLedgerEntryHash(base) };
  assert.equal(verifyLedger(`${canonicalJson(entry)}\n`, authorityHash, "test").count, 1);
  assert.throws(() => verifyLedger(`${canonicalJson({ ...entry, sequence: 1 })}\n`, authorityHash, "test"), /LEDGER_CHAIN/);
});
test("exact Node and curl bindings require sealed executable locations", () => {
  assert.deepEqual(auth.nodeBinding, WP118_CONTRACT.node);
  assert.deepEqual(auth.curlBinding, WP118_CONTRACT.curl);
  assert.throws(() => validateToolBinding(auth.nodeBinding, WP118_CONTRACT.node, auth.privateRoot,
    ["--version"], "NODE", false), /ENOENT|SEALED/);
  assert.throws(() => validateToolBinding(auth.curlBinding, WP118_CONTRACT.curl, auth.privateRoot,
    [], "CURL", false), /ENOENT|SEALED/);
});
test("owner authorization and complete public inventory are enforced", () => {
  assert.equal(verifyControlBindings(auth).entries, 40);
  assert.throws(() => verifyControlBindings({ ...auth, ownerAuthorizationSha256: "f".repeat(64) }), /OWNER_AUTHORIZATION_HASH/);
});
test("exclusive network lock denies a concurrent holder and releases cleanly", () => {
  const release = acquireNetworkLock(auth);
  try {
    assert.throws(() => acquireNetworkLock(auth), /NETWORK_LOCK/);
  } finally {
    release();
  }
  const releaseAgain = acquireNetworkLock(auth);
  releaseAgain();
});
test("combined public inventory verifies without network", () => {
  const result = verifyNetworkLauncher(root);
  assert.equal(result.result, "PASS");
  assert.equal(result.classification, "STATIC_OWNER_SIGNED_DESCRIPTOR_REMEDIATION_READY");
  assert.equal(result.publicFiles, 28);
  assert.equal(result.networkPerformed, false);
});
