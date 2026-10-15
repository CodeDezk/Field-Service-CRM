import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { cpSync, mkdtempSync, mkdirSync, readFileSync, realpathSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, resolve } from "node:path";
import test from "node:test";
import {
  HELPER_REPOSITORY_PATH,
  capturePublishedHelper,
  preflightPublishedHelper,
} from "../tool/pre-key-helper-resolution.mjs";

const repositoryRoot = resolve(process.cwd());
const helper = resolve(repositoryRoot, HELPER_REPOSITORY_PATH);
const helperSha256 = createHash("sha256").update(readFileSync(helper)).digest("hex");

test("repository-root binding imports and hashes the published helper before key creation", async () => {
  const capture = capturePublishedHelper(repositoryRoot, helperSha256);
  assert.equal(capture.helper, helper);
  assert.equal(capture.observedSha256, helperSha256);
  const receipt = await preflightPublishedHelper(repositoryRoot, helperSha256);
  assert.equal(receipt.result, "PASS_PRE_KEY_HELPER_PREFLIGHT");
});

test("repository roots containing spaces are supported", async (context) => {
  const root = mkdtempSync(resolve(tmpdir(), "wp128 repository root with spaces "));
  context.after(() => rmSync(root, { recursive: true, force: true }));
  const destination = resolve(root, HELPER_REPOSITORY_PATH);
  mkdirSync(dirname(destination), { recursive: true });
  cpSync(helper, destination);
  const receipt = await preflightPublishedHelper(root, helperSha256);
  assert.equal(receipt.helper, realpathSync(destination));
});

test("wrong-depth and relative roots fail before module import", () => {
  assert.throws(
    () => capturePublishedHelper(resolve(repositoryRoot, "internal-local"), helperSha256),
    /ENOENT/,
  );
  assert.throws(() => capturePublishedHelper(".", helperSha256), /REPOSITORY_ROOT_NOT_ABSOLUTE/);
});

test("a drifted helper hash fails before module import", () => {
  assert.throws(() => capturePublishedHelper(repositoryRoot, "0".repeat(64)), /HELPER_HASH_MISMATCH/);
});
