# Wave A Authenticated Real Runtime Dispatch Static Remediation

## Document control

| Field | Value |
| --- | --- |
| Status | Stopped — independent High finding; owner result review required |
| Work package | `WP-137 Authenticated Real Runtime Dispatch Static Remediation` |
| Owner | Aung Myo Oo |
| Governing decision | `DEC-263` — Accepted |
| Published WP-136 revision | `5dbd14ca5f00080b9bdecaae158d82c166e13611` |
| Published repository tree | `f5c5ea687bf4d593d7d913dee7a23521080f5b10` |
| Published proof tree | `fc7bdf2d7afeeba30463204e26adbce935c09d7d` |
| Result | `STOPPED_STATIC_FINDING` |
| Recommendation | `DEC-264` — Proposed |
| Network/signing/effective authorization | Closed; none performed |
| Date | 2026-10-15 |

## Objective and result

WP-137 connects the authenticated real launcher entry to the WP-134 run-bound validator. Trusted
bootstrap is required before any runtime file is read. The launcher captures exact enablement,
request, source-policy and expected-binding files, revalidates every accepted authority binding,
and injects only its internal authenticated child adapter. No caller-selectable executor exists.

The internal adapter validates accepted HTTPS source/path/stage constraints, applies ledger and
budget controls, and calls only the exact bound curl function. Static tests substitute a local
executor before this adapter and never contact a network. Independent validation found that the
output confinement is only lexical and therefore insufficient against a symlinked output root or
intermediate directory. WP-137 stops without publication or execution.

## Facts

| ID | Fact |
| --- | --- |
| `WP137-FACT-001` | WP-136 was published at the exact revision and trees above. |
| `WP137-FACT-002` | The old unconditional terminal stop is removed from the real dispatch. |
| `WP137-FACT-003` | Every real path first calls `require_trusted_bootstrap()`. |
| `WP137-FACT-004` | Six exact runtime inputs are required after bootstrap. |
| `WP137-FACT-005` | Enablement, request and expected bindings require mode `0600`; captures prohibit symlink following. |
| `WP137-FACT-006` | Revision, tree, Python, curl, bootstrap, launcher and source-policy hashes must equal signed authority. |
| `WP137-FACT-007` | Request bytes, policy bytes, ledger path, output root, limits and action flags bind before dispatch. |
| `WP137-FACT-008` | HTTPS host, port, path, stage, output path and metadata/artifact fields are validated, but output-root confinement is lexical rather than descriptor anchored. |
| `WP137-FACT-009` | Only `execute_authenticated_network_child` may reach `execute_bound_curl`. |
| `WP137-FACT-010` | CLI and environment cannot select or replace the executor. |
| `WP137-FACT-011` | The suite passes 70/70 and both 34-file verifiers pass without network, but the independent validator reports one High finding. |
| `WP137-FACT-012` | No key, signature, effective authorization, curl, network, download or acquisition occurred; validator authority is consumed. |

## Remediation

| ID | Remediation |
| --- | --- |
| `WP137-REM-001` | Replaced the unreachable terminal branch with authenticated dispatch. |
| `WP137-REM-002` | Added exact post-bootstrap runtime argument requirements. |
| `WP137-REM-003` | Added no-follow file capture and exact JSON binding checks. |
| `WP137-REM-004` | Added strict run-bound request and accepted-source validation. |
| `WP137-REM-005` | Added output-root confinement before file creation. |
| `WP137-REM-006` | Added ledger, budget, intent and minimized result evidence handling. |
| `WP137-REM-007` | Injected only the internal authenticated curl adapter. |
| `WP137-REM-008` | Preserved direct-entry, bootstrap, lifecycle, drift, limit and closed-flag stops. |
| `WP137-REM-009` | Added a dependency-free real-dispatch shape test without network. |
| `WP137-REM-010` | Renewed verifier expectations and proof hashes. |
| `WP137-REM-011` | Required follow-up: anchor the exact output root and directory chain with trusted directory descriptors and no-follow semantics. |
| `WP137-REM-012` | Required follow-up: verify directory identity, mode and replacement resistance before child creation. |
| `WP137-REM-013` | Required follow-up: create and open output files relative to trusted directory descriptors rather than resolving a lexical path. |
| `WP137-REM-014` | Required follow-up: add dependency-free negative tests for symlinked roots, symlinked intermediate directories and path replacement. |

## Bindings

| ID | Binding |
| --- | --- |
| `WP137-BIND-001` | Published revision `5dbd14ca5f00080b9bdecaae158d82c166e13611`. |
| `WP137-BIND-002` | Repository tree `f5c5ea687bf4d593d7d913dee7a23521080f5b10`. |
| `WP137-BIND-003` | Prior proof tree `fc7bdf2d7afeeba30463204e26adbce935c09d7d`. |
| `WP137-BIND-004` | Renewed proof inventory contains 46 files. |
| `WP137-BIND-005` | Exact trusted bootstrap remains required. |
| `WP137-BIND-006` | Exact internal executor is `execute_authenticated_network_child`. |
| `WP137-BIND-007` | Exact child process function remains `execute_bound_curl`. |
| `WP137-BIND-008` | Runtime inputs are `--enablement`, `--request`, `--source-policy`, `--ledger`, `--output-root` and `--expected-bindings`. |
| `WP137-BIND-009` | Network flags and limits remain signed-authority values, not CLI overrides. |
| `WP137-BIND-010` | Direct unauthenticated `--network` fails before operation. |
| `WP137-BIND-011` | Static runtime self-test uses `example.invalid` and a substituted child only. |
| `WP137-BIND-012` | Static suite expectation is 70 passing tests. |
| `WP137-BIND-013` | Both public verifiers pass 34 files with `networkPerformed=false`. |
| `WP137-BIND-014` | The one authorized fresh zero-authority validator returned FAIL with `WP137-VAL-001`; its authority is consumed. |
| `WP137-BIND-015` | Real signing, authorization and network remain closed. |
| `WP137-BIND-016` | WP-137 commit and push require later owner acceptance. |

## Proposed decisions

| ID | Recommendation | State |
| --- | --- | --- |
| `WP137-DEC-001` | Accept `DEC-264` and result `STOPPED_STATIC_FINDING`. | Proposed |
| `WP137-DEC-002` | Accept `WP137-FACT-001` through `012`. | Proposed |
| `WP137-DEC-003` | Accept `WP137-REM-001` through `014`. | Proposed |
| `WP137-DEC-004` | Accept `WP137-BIND-001` through `016`. | Proposed |
| `WP137-DEC-005` | Accept `WP137-VAL-001` as one High finding and require descriptor-anchored remediation. | Proposed |
| `WP137-DEC-006` | Keep every real execution and downstream gate closed. | Proposed |
| `WP137-DEC-007` | Freeze the exact nine-path WP-137 public/proof result inventory for later owner-authorized publication. | Proposed |

## Independent finding

| ID | Severity | Finding | Required disposition |
| --- | --- | --- | --- |
| `WP137-VAL-001` | High | `abspath` plus prefix comparison and final-component `O_NOFOLLOW` do not stop a pre-existing symlink in the accepted output root or an intermediate directory from redirecting output outside the signed root. | Stop WP-137. A later static package must descriptor-anchor and verify the directory chain, perform relative no-follow creation, and cover symlink-parent drift with negative tests. |

## Validation and next gate

Primary validation passed 70/70 dependency-free tests and both 34-file public verifiers. The fresh
zero-authority validator reproduced the 4/4 seal, 9/9 candidate hashes, 46/46 proof hashes, all
tests and both verifiers without network, but returned FAIL on `WP137-VAL-001`. Its authority is
consumed. No network-capable path was executed. WP-137 is stopped, cannot retry, and requires owner
acceptance before its exact nine-path result inventory may be committed or pushed. The next
eligible package is proof-only static remediation of output-root descriptor anchoring.
