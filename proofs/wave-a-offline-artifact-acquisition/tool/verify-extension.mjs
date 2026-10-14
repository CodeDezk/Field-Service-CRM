import { readdirSync, readFileSync } from "node:fs";
import { relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { sha256File, sourceTextIsStaticOnly, validateMetadataCommit, validateSourcePolicy } from "./contract.mjs";

export const EXPECTED_FILES = [
  ".gitignore", "AUTHORITY.md", "README.md",
  "fixtures/accepted-source-policy.json", "fixtures/synthetic-metadata-commit.json",
  "fixtures/synthetic-network-request.json", "fixtures/synthetic-run-bound-metadata-commit.json",
  "fixtures/synthetic-owner-signing-key.json", "fixtures/synthetic-owner-trust-root.json",
  "fixtures/synthetic-source-catalog.json",
  "schemas/acquisition-receipt.schema.json", "schemas/artifact-inventory.schema.json",
  "schemas/metadata-commit.schema.json", "schemas/network-authorization.schema.json",
  "schemas/network-request.schema.json", "schemas/source-policy.schema.json", "schemas/static-authorization.schema.json",
  "schemas/owner-trust-root.schema.json",
  "schemas/run-bound-metadata-commit.schema.json",
  "test/acquisition-extension-static.test.mjs", "test/acquisition-launcher-static.test.mjs",
  "test/trusted-network-launcher-static.test.mjs",
  "tool/acquisition-launcher.mjs", "tool/contract.mjs", "tool/network-contract.mjs",
  "tool/static-launcher.mjs", "tool/trusted-bootstrap-loader.py", "tool/trusted-network-launcher.py",
  "tool/verify-extension.mjs", "tool/verify-network-launcher.mjs",
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

export function verifyExtension(root) {
  const expectedRoot = resolve(process.cwd(), "proofs/wave-a-offline-artifact-acquisition");
  if (resolve(root) !== expectedRoot) throw new Error("ROOT_BOUNDARY");
  const found = walk(expectedRoot);
  if (JSON.stringify(found) !== JSON.stringify(EXPECTED_FILES)) throw new Error("PUBLIC_INVENTORY");
  for (const path of found.filter((path) => !path.startsWith("fixtures/accepted-source-policy") &&
    !path.startsWith("fixtures/synthetic-network-request") && !path.startsWith("schemas/network-") &&
    !path.startsWith("fixtures/synthetic-run-bound-metadata-commit") &&
    !path.startsWith("schemas/run-bound-metadata-commit") &&
    !path.startsWith("test/acquisition-launcher-") && !path.startsWith("tool/acquisition-launcher") &&
    !path.startsWith("test/trusted-network-launcher-") && !path.startsWith("tool/trusted-") &&
    !path.startsWith("tool/network-contract") && !path.startsWith("tool/verify-network-launcher"))) {
    const text = readFileSync(resolve(expectedRoot, path), "utf8");
    if (!sourceTextIsStaticOnly(text)) throw new Error(`NETWORK_CAPABILITY:${path}`);
    if (path.endsWith(".json")) JSON.parse(text);
    if (/package(-lock)?\.json$|pnpm-lock|yarn\.lock|pubspec/.test(path)) throw new Error("DEPENDENCY_MANIFEST");
  }
  const source = JSON.parse(readFileSync(resolve(expectedRoot, "fixtures/synthetic-source-catalog.json"), "utf8"));
  const metadata = JSON.parse(readFileSync(resolve(expectedRoot, "fixtures/synthetic-metadata-commit.json"), "utf8"));
  validateSourcePolicy(source);
  validateMetadataCommit(metadata);
  if (!source.entries.every((entry) => entry.host.endsWith(".invalid"))) throw new Error("NON_SYNTHETIC_HOST");
  if (!metadata.entries.every((entry) => entry.purpose === "SOURCE_REVIEW_ONLY")) throw new Error("NON_SYNTHETIC_PURPOSE");
  return {
    result: "PASS",
    classification: "STATIC_EXTENSION_WITH_NETWORK_LAUNCHER_SOURCE",
    publicFiles: found.length,
    networkPerformed: false,
    files: found.map((path) => ({ path, sha256: sha256File(resolve(expectedRoot, path)) })),
  };
}

function main() {
  const rootIndex = process.argv.indexOf("--root");
  if (rootIndex < 0 || !process.argv[rootIndex + 1]) throw new Error("ARG_ROOT");
  process.stdout.write(`${JSON.stringify(verifyExtension(process.argv[rootIndex + 1]))}\n`);
}

if (process.argv[1] && resolve(process.argv[1]) === resolve(fileURLToPath(import.meta.url))) {
  try { main(); } catch (error) {
    process.stderr.write(`${error instanceof Error ? error.message : String(error)}\n`);
    process.exitCode = 1;
  }
}

