import { spawnSync } from "node:child_process";

export const CLOSED_BOUNDARY_STOP = "NETWORK_EXECUTION_NOT_AUTHORIZED_BY_WP121";

export function sanitizedBootstrapEnvironment() {
  return Object.freeze({ PATH: "/usr/bin:/bin", LANG: "C", LC_ALL: "C", TMPDIR: "/tmp" });
}

export function validateClosedBoundaryResult(result) {
  if (result?.status !== 1) throw new Error("BOOTSTRAP_EXIT");
  if (result.stdout !== "") throw new Error("BOOTSTRAP_STDOUT");
  if (result.stderr !== `${CLOSED_BOUNDARY_STOP}\n`) throw new Error("BOOTSTRAP_STDERR");
  return Object.freeze({
    result: "PASS_SIGNATURE_VERIFIED_STOPPED_BEFORE_NETWORK",
    stop: CLOSED_BOUNDARY_STOP,
    networkPerformed: false,
    networkChildCreated: false,
  });
}

export function runBoundPython(args, options = {}) {
  return spawnSync("/usr/bin/python3", args, {
    encoding: "utf8",
    env: sanitizedBootstrapEnvironment(),
    timeout: options.timeout ?? 10000,
    stdin: "ignore",
  });
}
