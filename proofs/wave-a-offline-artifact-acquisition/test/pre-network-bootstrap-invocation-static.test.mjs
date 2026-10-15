import assert from "node:assert/strict";
import test from "node:test";
import {
  CLOSED_BOUNDARY_STOP, runBoundPython, sanitizedBootstrapEnvironment,
  validateClosedBoundaryResult,
} from "../tool/pre-network-bootstrap-invocation.mjs";

test("sanitized environment prevents the macOS temp-directory warning", () => {
  assert.deepEqual(sanitizedBootstrapEnvironment(), {
    PATH: "/usr/bin:/bin", LANG: "C", LC_ALL: "C", TMPDIR: "/tmp",
  });
  const result = runBoundPython(["-I", "-S", "-c", "print('STATIC_OK')"]);
  assert.equal(result.status, 0);
  assert.equal(result.stdout, "STATIC_OK\n");
  assert.equal(result.stderr, "");
});

test("exact closed-boundary result passes", () => {
  const receipt = validateClosedBoundaryResult({ status: 1, stdout: "", stderr: `${CLOSED_BOUNDARY_STOP}\n` });
  assert.equal(receipt.result, "PASS_SIGNATURE_VERIFIED_STOPPED_BEFORE_NETWORK");
  assert.equal(receipt.networkPerformed, false);
  assert.equal(receipt.networkChildCreated, false);
});

test("warning-prefixed terminal stop fails closed", () => {
  assert.throws(() => validateClosedBoundaryResult({
    status: 1, stdout: "",
    stderr: `python3: warning: confstr() failed with code 5: couldn't get path of DARWIN_USER_TEMP_DIR; using /tmp instead\n${CLOSED_BOUNDARY_STOP}\n`,
  }), /BOOTSTRAP_STDERR/);
});

test("unexpected stderr, stdout, exit and forged stop fail closed", () => {
  assert.throws(() => validateClosedBoundaryResult({ status: 1, stdout: "", stderr: "OTHER\n" }), /BOOTSTRAP_STDERR/);
  assert.throws(() => validateClosedBoundaryResult({ status: 1, stdout: "byte", stderr: `${CLOSED_BOUNDARY_STOP}\n` }), /BOOTSTRAP_STDOUT/);
  assert.throws(() => validateClosedBoundaryResult({ status: 0, stdout: "", stderr: `${CLOSED_BOUNDARY_STOP}\n` }), /BOOTSTRAP_EXIT/);
  assert.throws(() => validateClosedBoundaryResult({ status: 1, stdout: "", stderr: `${CLOSED_BOUNDARY_STOP}X\n` }), /BOOTSTRAP_STDERR/);
});
