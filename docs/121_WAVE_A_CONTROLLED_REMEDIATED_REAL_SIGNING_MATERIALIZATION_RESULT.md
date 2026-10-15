# Wave A Controlled Remediated Real Signing Materialization Result

## Document control

| Field | Value |
| --- | --- |
| Status | Inconclusive — owner review required |
| Work package | `WP-127 Controlled Remediated Real Signing and Pre-Network Materialization` |
| Run ID | `wp127-2026-10-15-01` |
| Governing decision | `DEC-253` — Accepted |
| Published revision | `1da689912c2bca356bc365a4a8ad1ccb644f6ce7` |
| Result | `INCONCLUSIVE` |
| Deviation | `WP127-DEV-001` |
| Key/signature/authorization | Not created |
| Network | Not performed |
| Validator | Not instantiated; sealing was not reached |
| Commit/push | Not authorized and not performed |
| Date | 2026-10-15 |

## Outcome

WP-127 stopped before key generation. The private materializer used an incorrect relative import
depth for the published diagnostic helper and resolved the path beneath `internal-local/` rather
than the repository proof tree. Node returned `ERR_MODULE_NOT_FOUND` before evaluating the
materializer body. The run was not retried.

## Evidence

| ID | Fact |
| --- | --- |
| `WP127-FACT-001` | WP-126 was published and verified at the exact revision above. |
| `WP127-FACT-002` | The fresh run root was created with mode `0700`; retained files are mode `0600`. |
| `WP127-FACT-003` | `WP127-DEV-001` is `MATERIALIZER_HELPER_IMPORT_PATH_NOT_FOUND`. |
| `WP127-FACT-004` | Module resolution failed before key-generation code executed. |
| `WP127-FACT-005` | No key, trust root, authorization or signature was created. |
| `WP127-FACT-006` | No validator was instantiated because no sealed handoff existed. |
| `WP127-FACT-007` | No network, dependency, runtime proof or downstream action occurred. |
| `WP127-FACT-008` | Mandatory cleanup and empty-materials residual verification passed. |
| `WP127-FACT-009` | The private stop inventory contains six entries plus its index. |
| `WP127-FACT-010` | Inventory-index SHA-256 is `39eface4ff45199d53b97a573d4a1d50b120f21ae4084b5a9bade8c1e7692ba1`. |

## Remediation recommendation

| ID | Remediation |
| --- | --- |
| `WP127-REM-001` | Preserve WP-127 as immutable stopped evidence; do not retry. |
| `WP127-REM-002` | Replace relative helper import with an exact repository-root-bound helper path or hash-verified copied source. |
| `WP127-REM-003` | Add a pre-key module-resolution preflight that imports the helper and verifies its accepted hash. |
| `WP127-REM-004` | Add dependency-free tests for workspace paths containing spaces and wrong import depth. |
| `WP127-REM-005` | Require fresh static validation and a new run before key materialization. |

### Proposed decision `DEC-254`

Accept WP-127 as `INCONCLUSIVE`, close without retry, accept cleanup and no-validator disposition,
and advance proof-only static helper-resolution remediation before another materialization attempt.

## Proposed owner decisions

| ID | Recommendation | State |
| --- | --- | --- |
| `WP127-DEC-001` | Accept the result and `WP127-DEV-001`. | Proposed |
| `WP127-DEC-002` | Accept `WP127-FACT-001` through `010`. | Proposed |
| `WP127-DEC-003` | Accept cleanup and residual PASS. | Proposed |
| `WP127-DEC-004` | Accept the no-validator disposition. | Proposed |
| `WP127-DEC-005` | Close the run without retry. | Proposed |
| `WP127-DEC-006` | Accept `WP127-REM-001` through `005`. | Proposed |
| `WP127-DEC-007` | Keep every execution and downstream gate closed. | Proposed |

The exact public candidate inventory is documents 00, 02, 120 and 121. WP-127 stops for owner
review; no commit or push is authorized.

## Owner acceptance and verified publication

The owner accepted `DEC-254`, `WP127-DEV-001`, all WP-127 facts, remediations and decisions, the
cleanup and residual PASS, six-entry private stop inventory, inventory-index hash and no-validator
disposition. Run `wp127-2026-10-15-01` is closed without retry or material reuse.

The frozen four-path public inventory was committed as
`9bd7c36 WP-127: record controlled materialization result` and published at
`9bd7c36b6862db03f97da297af3cfb44c179d5a5`. Live `origin/main` and local `HEAD` matched.
WP-128 is active only for proof-static helper resolution and pre-key preflight remediation.

