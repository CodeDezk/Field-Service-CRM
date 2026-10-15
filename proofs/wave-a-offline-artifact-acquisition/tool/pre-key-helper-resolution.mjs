import { createHash } from "node:crypto";
import { readFileSync, realpathSync, statSync } from "node:fs";
import { isAbsolute, relative, resolve, sep } from "node:path";
import { pathToFileURL } from "node:url";

export const HELPER_REPOSITORY_PATH =
  "proofs/wave-a-offline-artifact-acquisition/tool/pre-network-bootstrap-invocation.mjs";

function sha256(bytes) {
  return createHash("sha256").update(bytes).digest("hex");
}

export function capturePublishedHelper(repositoryRoot, expectedSha256) {
  if (!isAbsolute(repositoryRoot)) throw new Error("REPOSITORY_ROOT_NOT_ABSOLUTE");
  if (!/^[a-f0-9]{64}$/.test(expectedSha256)) throw new Error("HELPER_HASH_FORMAT");

  const root = realpathSync(repositoryRoot);
  const helper = realpathSync(resolve(root, HELPER_REPOSITORY_PATH));
  const withinRoot = relative(root, helper);
  if (withinRoot === "" || withinRoot === ".." || withinRoot.startsWith(`..${sep}`) || isAbsolute(withinRoot)) {
    throw new Error("HELPER_OUTSIDE_REPOSITORY_ROOT");
  }
  if (!statSync(helper).isFile()) throw new Error("HELPER_NOT_REGULAR_FILE");

  const bytes = readFileSync(helper);
  const observedSha256 = sha256(bytes);
  if (observedSha256 !== expectedSha256) throw new Error("HELPER_HASH_MISMATCH");
  return Object.freeze({ repositoryRoot: root, helper, observedSha256 });
}

export async function preflightPublishedHelper(repositoryRoot, expectedSha256) {
  const capture = capturePublishedHelper(repositoryRoot, expectedSha256);
  const module = await import(`${pathToFileURL(capture.helper).href}?sha256=${capture.observedSha256}`);
  if (typeof module.runBoundPython !== "function") throw new Error("HELPER_EXPORT_RUNNER");
  if (typeof module.validateClosedBoundaryResult !== "function") throw new Error("HELPER_EXPORT_ORACLE");
  if (typeof module.sanitizedBootstrapEnvironment !== "function") throw new Error("HELPER_EXPORT_ENVIRONMENT");
  return Object.freeze({ ...capture, result: "PASS_PRE_KEY_HELPER_PREFLIGHT" });
}
