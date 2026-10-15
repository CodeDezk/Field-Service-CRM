# Wave A Controlled Real Signing and Pre-Network Materialization Result

## Document control

| Field | Value |
| --- | --- |
| Status | Inconclusive — accepted; exact publication authorized |
| Work package | `WP-124 Controlled Real Signing and Pre-Network Run-Control Materialization` |
| Owner | Aung Myo Oo |
| Governing decision | `DEC-250` — Accepted |
| Run ID | `wp124-2026-10-15-01` |
| Published governing revision | `6c0d184b182e95d7dc778ad1db1094a189824db8` |
| Repository tree | `f38d4378db0ceb12bc3b7165f4d6b0dbf4cfbb0e` |
| Proof tree | `0f3e9dc514c0d6456745bb5ab1df003d5d2e0494` |
| Result | `INCONCLUSIVE` |
| Deviation | `WP124-DEV-001` |
| Network/download/acquisition | None |
| Private key | Destroyed; residual check PASS |
| Validator | Not instantiated; sealed handoff was not reached |
| Commit/push | Not authorized and not performed |
| Date | 2026-10-15 |

## Outcome

WP-124 created the authorized isolated run root, one real ephemeral Ed25519 key, its public
trust-root descriptor, one canonical pre-network `EFFECTIVE_STATIC_ONLY` authorization and one
detached signature. The trusted bootstrap cryptographically accepted the signature and bindings
and reached the published terminal stop `NETWORK_EXECUTION_NOT_AUTHORIZED_BY_WP121` without a
network child.

The strict verification oracle expected that terminal stop as the only stderr line. macOS emitted
an additional Python startup warning because `confstr()` could not obtain
`DARWIN_USER_TEMP_DIR` and fell back to `/tmp`. The materializer therefore stopped fail-closed as
`WP124-DEV-001` before creating the success receipts or sealed handoff. The run was not retried.

## Evidence and disposition

| ID | Recorded result |
| --- | --- |
| `WP124-FACT-001` | Exact published WP-123 revision, repository tree and unchanged proof tree were used. |
| `WP124-FACT-002` | The accepted 42-file public-control inventory reverified 42/42. |
| `WP124-FACT-003` | Exact Node v22.23.1 at the accepted SHA-256 generated one Ed25519 pair without dependencies or network. |
| `WP124-FACT-004` | Public key ID is `wp124-ed25519-16b5c06a913c0d0ea568f8bd`. |
| `WP124-FACT-005` | Trust-root descriptor SHA-256 is `1233f112e61a6f7cb789b173103cc5fba3083d5348073fe89bfff52e7ab6f291`. |
| `WP124-FACT-006` | Pre-network authorization file SHA-256 is `198e2d8711c8acd573ec4b238cdd3f69a493cd729c7b0f628f7b368f184cc5f5`. |
| `WP124-FACT-007` | Detached-signature file SHA-256 is `1180ff32a9ee0d167ad4069541d19af422e8911a34bacb0f72b980a8ec3563fe`. |
| `WP124-FACT-008` | Authorization state was `EFFECTIVE_STATIC_ONLY`; all network and downstream action flags were false. |
| `WP124-FACT-009` | Bootstrap reached the expected closed boundary, but stderr also contained the macOS `confstr()` warning. |
| `WP124-FACT-010` | No DNS, network child, download, acquisition, dependency, proof runtime or downstream action occurred. |
| `WP124-FACT-011` | The private key was removed immediately after the stop; exact-path and named-residual checks passed. |
| `WP124-FACT-012` | The run root and every retained file are mode-restricted; the private evidence inventory has nine entries plus its index. |
| `WP124-FACT-013` | Final inventory-index SHA-256 is `eb8243cc6a51415587a2f57984663dc7b308ba27c31d0bcf273f3c43eb6dd785`. |
| `WP124-FACT-014` | Signing-custodian authority is consumed; retry is not authorized. |
| `WP124-FACT-015` | The packet was not sealed, so the conditional validator gate did not open and no validator was instantiated. |
| `WP124-FACT-016` | No public repository file was changed by WP-124 before this result document. |

## Deviation `WP124-DEV-001`

`STOPPED_VERIFICATION_DIAGNOSTIC_MISMATCH`: the bootstrap subprocess exited `1`, reached the exact
expected terminal network stop and performed no network, but stderr contained a deterministic
platform startup warning in addition to the accepted stop token. The warning is not evidence of a
signature failure or network attempt; however, the exact oracle correctly refused to reinterpret
unmodeled diagnostics during the controlled run.

## Cleanup and residual result

- The ephemeral private-key file was deleted and the materials directory was synchronized.
- Exact private-key path absence and bounded filename residual scans passed.
- No network process, downloaded byte, dependency, global cache/SDK mutation or runtime service
  was created.
- Public key, signed pre-network authorization and signature remain only as bounded private stop
  evidence; they grant no network authority and must not be reused.
- The run is closed and non-resumable. A successor must use a new run and new key.

## Remediation recommendation

| ID | Proposed remediation |
| --- | --- |
| `WP124-REM-001` | Preserve WP-124 as immutable stopped evidence; do not retry or reuse its key material. |
| `WP124-REM-002` | Add a proof-only static normalization contract for the exact macOS Python `confstr()` startup warning. |
| `WP124-REM-003` | Continue requiring the exact terminal stop and reject every other diagnostic, exit code or stdout byte. |
| `WP124-REM-004` | Prefer an explicit sanitized environment that prevents the warning; permit bounded filtering only if prevention is not portable. |
| `WP124-REM-005` | Add dependency-free tests for warning-present, warning-absent, unexpected-warning and forged-stop cases. |
| `WP124-REM-006` | Renew affected hashes and require one fresh independent static validator before another materialization authorization. |

### Accepted decision `DEC-251`

Accept WP-124 as `INCONCLUSIVE`, accept `WP124-DEV-001`, cleanup and residual PASS, close the run
without retry, and authorize no reuse of its signed material. Advance one proof-only static
diagnostic-normalization remediation before any new materialization attempt. Keep all network and
downstream gates closed.

## Proposed owner decisions

| ID | Recommendation | State |
| --- | --- | --- |
| `WP124-DEC-001` | Accept the `INCONCLUSIVE` result and `WP124-DEV-001`. | Accepted |
| `WP124-DEC-002` | Accept `WP124-FACT-001` through `016`. | Accepted |
| `WP124-DEC-003` | Accept mandatory cleanup and private-key residual PASS. | Accepted |
| `WP124-DEC-004` | Accept that the validator gate did not open and no validator was instantiated. | Accepted |
| `WP124-DEC-005` | Close run `wp124-2026-10-15-01` without retry or material reuse. | Accepted |
| `WP124-DEC-006` | Accept `WP124-REM-001` through `006`. | Accepted |
| `WP124-DEC-007` | Keep effective network authority and every downstream gate closed. | Accepted |
| `WP124-DEC-008` | Freeze the exact four-path WP-124 public candidate inventory. | Accepted |

## Candidate inventory and next gate

The exact public candidate inventory is documents 00, 02, 117 and 118. Private evidence remains
ignored under the WP-124 run root. WP-124 stops for owner review; no commit or push is authorized.

## Owner acceptance

The owner accepted the `INCONCLUSIVE` result, `DEC-251`, deviation, facts, remediations and
decisions; accepted the expected closed-boundary result, cleanup, private-key residual and retained
signature verification passes; accepted the nine-entry private inventory and index hash; consumed
signing-custodian authority; accepted the no-validator disposition; and closed the run without
retry or material reuse. Publication is authorized only for the exact four-path public inventory.
