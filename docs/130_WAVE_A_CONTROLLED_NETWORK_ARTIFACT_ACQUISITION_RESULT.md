# Controlled Wave A Network Artifact Acquisition Result

## Document control

| Field | Value |
| --- | --- |
| Status | Accepted and published |
| Work package | `WP-136 Controlled Wave A Network Artifact Acquisition` |
| Run ID | `wp136-2026-10-15-01` |
| Owner | Aung Myo Oo |
| Governing decision | `DEC-262` — Accepted |
| Accepted revision | `5f306f65991c63a54d4ff58adad9c7d506aba5a3` |
| Accepted repository tree | `a0454d2371ff44eb8bb549095fd58bb2abf50a46` |
| Accepted proof tree | `fc7bdf2d7afeeba30463204e26adbce935c09d7d` |
| Result | `INCONCLUSIVE` |
| Typed stop | `STOPPED_PREFLIGHT_RUNTIME_ENTRY_UNREACHABLE` |
| Recommendation | `DEC-263` — Proposed |
| Network/download/acquisition | None performed |
| Date | 2026-10-15 |

## Outcome

WP-136 stopped during mandatory pre-key preflight. The published launcher contains the WP-134
run-bound validation function and a bound curl executor, but its real network `main()` path never
connects them. After trusted-bootstrap validation it unconditionally raises
`NETWORK_RUNTIME_NOT_AUTHORIZED_BY_WP132`. The only calls to the new runtime-entry function are
static self-tests using surrogate executors.

Creating a real key or effective authorization could not make the accepted child path reachable.
The run therefore stopped before key creation, signing, validator instantiation, network, curl,
download or acquisition. Mandatory cleanup and residual verification passed.

The sole fresh zero-authority validator independently reproduced the 5/5 seal, 4/4 public hashes,
exact revision and trees, 46-file proof state, 69/69 tests and both 34-file verifiers. Source review
confirmed the unreachable real dispatch and residual review confirmed that the run root contained
only six bounded evidence files before the validation record. Findings were Critical 0, High 0,
Medium 0 and Low 0; validator authority is consumed.

## Facts

| ID | Fact |
| --- | --- |
| `WP136-FACT-001` | WP-135 was published and verified at the exact accepted revision and trees. |
| `WP136-FACT-002` | The clean worktree had no pending public changes before WP-136 preflight. |
| `WP136-FACT-003` | All 69 dependency-free tests passed. |
| `WP136-FACT-004` | Both public verifiers passed 34 files with `networkPerformed=false`. |
| `WP136-FACT-005` | `validate_run_bound_runtime_entry` validates fresh exact inputs before an injected executor. |
| `WP136-FACT-006` | `execute_bound_curl` exists but is never injected by the real launcher path. |
| `WP136-FACT-007` | The real path calls `require_trusted_bootstrap()` and then unconditionally stops. |
| `WP136-FACT-008` | Calls to the runtime-entry validator occur only in static self-test code. |
| `WP136-FACT-009` | No key, public trust root, signature or effective authorization was created. |
| `WP136-FACT-010` | No DNS, network child, curl, response bytes, download or artifact exists. |
| `WP136-FACT-011` | Cleanup left no key, authorization, signature, lock, quarantine object or downloaded byte. |
| `WP136-FACT-012` | Only bounded private stop evidence remains for independent validation. |

## Deviation and remediation

| ID | Deviation |
| --- | --- |
| `WP136-DEV-001` | WP-135 treated the static internal seam as sufficient execution readiness, but the published real CLI dispatch remains terminally closed and cannot inject `execute_bound_curl`. |

| ID | Required remediation |
| --- | --- |
| `WP136-REM-001` | Add one exact authenticated real-runtime dispatch from `main()` to the run-bound validator. |
| `WP136-REM-002` | Keep the executor internal and inject only `execute_bound_curl`; never accept an executor from CLI, environment or authorization data. |
| `WP136-REM-003` | Bind exact enablement, request and policy files, ledger path, output root and current revision/tree/tool hashes before dispatch. |
| `WP136-REM-004` | Preserve every existing static, synthetic, missing, expired, consumed and drift stop. |
| `WP136-REM-005` | Add dependency-free positive substituted-executor and negative real-dispatch shape tests without network. |
| `WP136-REM-006` | Renew hashes and obtain exactly one fresh zero-authority independent static validator before another readiness decision. |

## Proposed decisions

| ID | Recommendation | State |
| --- | --- | --- |
| `WP136-DEC-001` | Accept `DEC-263` and the `INCONCLUSIVE` disposition. | Proposed |
| `WP136-DEC-002` | Accept `WP136-FACT-001` through `012`. | Proposed |
| `WP136-DEC-003` | Accept `WP136-DEV-001`. | Proposed |
| `WP136-DEC-004` | Accept `WP136-REM-001` through `006`. | Proposed |
| `WP136-DEC-005` | Accept cleanup and residual verification as PASS. | Proposed |
| `WP136-DEC-006` | Close this run without retry or material reuse. | Proposed |
| `WP136-DEC-007` | Freeze the exact four-path WP-136 public result inventory. | Proposed |

## Limitations and next gate

No real authority or network behavior was measured. The result proves only that the currently
published execution route is unreachable and fails closed before sensitive action. After
independent stop-packet validation, which passed with zero findings. WP-136 stops for owner result
acceptance. The accepted four-path result was published at
`5dbd14ca5f00080b9bdecaae158d82c166e13611`, repository tree
`f5c5ea687bf4d593d7d913dee7a23521080f5b10`; live `origin/main` matched. Publication activated
WP-137 static remediation only.
