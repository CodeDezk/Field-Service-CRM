# Wave A Exact Helper Resolution and Pre-Key Preflight Static Remediation

## Document control

| Field | Value |
| --- | --- |
| Status | Independently validated PASS — owner review required |
| Work package | `WP-128 Exact Helper Resolution and Pre-Key Preflight Static Remediation` |
| Owner | Aung Myo Oo |
| Governing decision | `DEC-254` — Accepted |
| Accepted base revision | `9bd7c36b6862db03f97da297af3cfb44c179d5a5` |
| Result | `STATIC_HELPER_RESOLUTION_REMEDIATED_VALIDATED` |
| Real key/signing/network/acquisition/runtime | Closed |
| Application/architecture/infrastructure/deployment | Closed |
| Date | 2026-10-15 |

## Objective and boundary

WP-128 removes the fragile private-directory-depth assumption that stopped WP-127. It adds a
dependency-free public control that resolves the accepted helper from an explicit absolute
repository root, verifies its exact bytes, and import-checks its required exports before any
future signing-key creation. It creates no real key, signature, authorization, network request,
dependency, runtime or application state.

## Facts and results

| ID | Fact |
| --- | --- |
| `WP128-FACT-001` | WP-127 is accepted, published and closed without retry. |
| `WP128-FACT-002` | WP-127 failed before module evaluation because a private relative import resolved beneath `internal-local/`. |
| `WP128-FACT-003` | The new resolver accepts only an explicit absolute repository root. |
| `WP128-FACT-004` | The helper path is fixed relative to that repository root and real-path containment is enforced. |
| `WP128-FACT-005` | Exact SHA-256 verification occurs before module import. |
| `WP128-FACT-006` | Required runner, oracle and sanitized-environment exports are checked before preflight PASS. |
| `WP128-FACT-007` | Workspace paths containing spaces pass without shell evaluation. |
| `WP128-FACT-008` | Relative roots, wrong-depth roots and hash drift fail before import. |
| `WP128-FACT-009` | The dependency-free suite passes 67/67. |
| `WP128-FACT-010` | Both public verifiers pass 34/34 and report `networkPerformed: false`. |
| `WP128-FACT-011` | No real key, signing, network, acquisition, dependency or runtime action occurred. |
| `WP128-FACT-012` | Exactly one fresh zero-authority validator independently returned PASS with zero findings; its authority is consumed. |

## Remediation dispositions

| ID | Remediation |
| --- | --- |
| `WP128-REM-001` | Add a repository-root-bound helper capture and preflight module. |
| `WP128-REM-002` | Require absolute root, real-path containment, regular-file status and exact hash. |
| `WP128-REM-003` | Import-check the accepted helper and its three required exports before PASS. |
| `WP128-REM-004` | Add dependency-free tests for spaces, wrong depth, relative roots and drift. |
| `WP128-REM-005` | Add both new paths to both exact public verifier inventories. |
| `WP128-REM-006` | Update exact file-count assertions from 32 to 34. |
| `WP128-REM-007` | Record the new authority and operator-facing contract in proof documentation. |
| `WP128-REM-008` | Renew complete hashes and require one fresh zero-authority validator after sealing. |

## Static bindings

| ID | Binding |
| --- | --- |
| `WP128-BIND-001` | Accepted base revision is `9bd7c36b6862db03f97da297af3cfb44c179d5a5`. |
| `WP128-BIND-002` | Exact Node remains `/Users/aungmyooo/.nvm/versions/node/v22.23.1/bin/node`. |
| `WP128-BIND-003` | Published helper path is `proofs/wave-a-offline-artifact-acquisition/tool/pre-network-bootstrap-invocation.mjs`. |
| `WP128-BIND-004` | Published helper SHA-256 remains `a18dc5cfa99add382b2f2ac69dfdddaec4ea1a5f4391aef9a008811c5dbb10e8`. |
| `WP128-BIND-005` | Resolver SHA-256 is `d20367d553f13a2e7af75c858f735322c793719a3f805123b8e7cb49d7846210`. |
| `WP128-BIND-006` | Preflight PASS requires verified bytes and required exports. |
| `WP128-BIND-007` | Test result is 67/67 PASS. |
| `WP128-BIND-008` | Both verifiers report 34 public files and no network. |
| `WP128-BIND-009` | Complete 46-file proof-inventory index SHA-256 is `6040f9fb29da23cbb76e679b3e3071e23134eb809729ee45eb3b10732aea3ee0`. |
| `WP128-BIND-010` | Test-source SHA-256 is `8fc75363bf1678acc7b04731463660f9d3b79250f113888f145645a0cc39e9b8`; validator authority is consumed. |
| `WP128-BIND-011` | Real signing and every downstream gate remain closed. |
| `WP128-BIND-012` | WP-128 commit and push remain closed pending owner acceptance. |

## Proposed decision `DEC-255`

Accept the absolute repository-root-bound, hash-verified and import-checked pre-key helper preflight
as the remediation for WP127-DEV-001, subject to one fresh independent static validation of the
sealed packet. This does not authorize signing or any downstream operation.

## Proposed owner decisions

| ID | Recommendation | State |
| --- | --- | --- |
| `WP128-DEC-001` | Accept `WP128-FACT-001` through `012`. | Proposed |
| `WP128-DEC-002` | Accept `WP128-REM-001` through `008`. | Proposed |
| `WP128-DEC-003` | Accept `WP128-BIND-001` through `012`. | Proposed |
| `WP128-DEC-004` | Accept 67/67 tests and both 34-file verifier passes as primary evidence. | Proposed |
| `WP128-DEC-005` | Require exactly one fresh zero-authority independent validator. | Proposed — satisfied and consumed |
| `WP128-DEC-006` | Keep every execution and downstream gate closed. | Proposed |
| `WP128-DEC-007` | Keep WP-128 commit and push closed pending later owner acceptance. | Proposed |

## Current gate

## Independent validation

`/root/wp128_helper_resolution_validator` independently reproduced 12/12 candidate hashes, 46/46
proof hashes, all four seal entries, 67/67 specified tests and both 34-file public verifiers. It
confirmed absolute-root binding, real-path containment, exact hash-before-import, required exports,
space-containing paths and fail-closed relative-root, wrong-depth and drift cases. Result: PASS,
with zero Critical, High, Medium or Low findings. It made no edits or prohibited actions; its
single-use authority is consumed.

An optional broader two-root test run reported two `AUTH_TIME` failures in an unchanged historical
artifact-acquisition-control fixture whose static authorization window is expired. That root is
outside the changed candidate paths and the specified 67-test WP-128 suite; its 12/12 hashes still
verified. This is recorded as an unverified legacy-fixture limitation, not a WP-128 finding.

## Current gate

WP-128 is `STATIC_HELPER_RESOLUTION_REMEDIATED_VALIDATED` and stops for owner acceptance. Neither
the primary PASS nor validator PASS authorizes publication, signing or execution.

## Owner acceptance and verified publication

The owner accepted `DEC-255`, all WP-128 facts, remediations, bindings and decisions, 67/67 tests,
both 34-file verifiers, the 46-file proof inventory, exact 12-path candidate inventory, independent
PASS with zero findings, consumed validator authority and the legacy-fixture limitation.

The frozen 12-path public/proof inventory was committed as
`eef557d WP-128: validate pre-key helper resolution` and published at
`eef557daebb459ba7eacc9affa93115bfc1e561c`, repository tree
`83c03f6bba8f4cdd926ba2dd5328481aac53108d`, proof tree
`c5737f78ccecf8b667259825308d2c306eaba859`. Live `origin/main` and local `HEAD` matched.
WP-129 is active for owner-decision documentation and one ineffective private draft only.
