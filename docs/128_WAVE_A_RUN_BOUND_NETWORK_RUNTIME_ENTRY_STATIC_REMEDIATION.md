# Wave A Run-Bound Network Runtime Entry Static Remediation

## Document control

| Field | Value |
| --- | --- |
| Status | Accepted and published |
| Work package | `WP-134 Run-Bound Network Runtime Entry Static Remediation` |
| Owner | Aung Myo Oo |
| Governing decision | `DEC-260` — Accepted |
| Proposed decision | `DEC-261` |
| Published WP-133 revision | `fcc791f59b3cbd9a9074d4ced08fa7ae9bed545a` |
| Result | `STATIC_RUN_BOUND_RUNTIME_ENTRY_REMEDIATED_VALIDATED` |
| Network/download/acquisition | Closed; none performed |
| Date | 2026-10-15 |

## Objective and result

WP-134 replaces consumed runtime constants with explicit expected run-bound inputs and connects the
validated signed-transition receipt to an internally injected child-execution seam. Every request,
source-policy, ledger, output, limit and tool binding is checked before that seam is called. The
production runtime path still stops before curl; only dependency-free synthetic surrogate execution
is permitted by this package.

## Facts

| ID | Fact |
| --- | --- |
| `WP134-FACT-001` | WP-133 was published at revision `fcc791f59b3cbd9a9074d4ced08fa7ae9bed545a`. |
| `WP134-FACT-002` | The accepted repository tree is `bfc93ff84795e6a6a509973d4ee5181daaa8c45f`. |
| `WP134-FACT-003` | The prior accepted proof tree is `1c20b3932884e0e2f9a9d96f42e40eaf202fc33e`. |
| `WP134-FACT-004` | Runtime expectations are explicit inputs, not reusable WP-118 constants. |
| `WP134-FACT-005` | Revision, repository tree and exact Python, curl, bootstrap, launcher and source-policy hashes are checked. |
| `WP134-FACT-006` | Exact request and source-policy bytes are hash-bound before child creation. |
| `WP134-FACT-007` | Ledger and output bindings must be absolute and match the signed receipt. |
| `WP134-FACT-008` | Exact limits and action flags must match the signed transition. |
| `WP134-FACT-009` | The child executor is supplied internally and is not selectable by CLI or environment. |
| `WP134-FACT-010` | The surrogate proves exact handoff without curl, DNS, sockets, downloads or acquisition. |
| `WP134-FACT-011` | The real runtime path remains terminally closed before network execution. |
| `WP134-FACT-012` | No key, signature, effective authorization, identity or real runtime material was created. |

## Remediation

| ID | Remediation |
| --- | --- |
| `WP134-REM-001` | Added explicit run-bound expected revision and tree inputs. |
| `WP134-REM-002` | Added explicit exact tool and control hashes. |
| `WP134-REM-003` | Added exact request-byte and request-hash verification. |
| `WP134-REM-004` | Added exact source-policy byte and hash verification. |
| `WP134-REM-005` | Added exact signed-transition receipt verification. |
| `WP134-REM-006` | Added absolute ledger and output descriptor matching. |
| `WP134-REM-007` | Added exact limit and action-flag matching. |
| `WP134-REM-008` | Added an internal-only injected child-execution seam. |
| `WP134-REM-009` | Added positive surrogate and revision, tool, policy and request drift tests. |
| `WP134-REM-010` | Preserved terminal real-runtime and direct-entry stops. |

## Bindings

| ID | Binding |
| --- | --- |
| `WP134-BIND-001` | Published revision `fcc791f59b3cbd9a9074d4ced08fa7ae9bed545a`. |
| `WP134-BIND-002` | Repository tree `bfc93ff84795e6a6a509973d4ee5181daaa8c45f`. |
| `WP134-BIND-003` | Python SHA-256 `b8763cf250e607a778bb4603cecb5b90338814d0a3dfcba0d57b1de242f610e9`. |
| `WP134-BIND-004` | Curl SHA-256 `b636262803922ee1dd0fbf614818473ffa53c811e44fd3278c2270d3af4759d3`. |
| `WP134-BIND-005` | Bootstrap SHA-256 `053f7618fd706406d8c48613f591196c71e790d5ea3606f36286418513ffa893`. |
| `WP134-BIND-006` | Remediated launcher SHA-256 `8dc9cee8dafc47895f7db9baceff3503660943dde630439843d13ab06f3f2d12`. |
| `WP134-BIND-007` | Source-policy SHA-256 `b2171aaf0a10ecbab9cde35d6eb59dafab629c9fea25bbcbeff1b5c33dc3052e`. |
| `WP134-BIND-008` | Request, policy, ledger, output and limits are exact pre-child bindings. |
| `WP134-BIND-009` | Executor injection is internal-only. |
| `WP134-BIND-010` | Static suite expectation is 69 passing tests. |
| `WP134-BIND-011` | Both public verifiers must pass the same 34-file public inventory. |
| `WP134-BIND-012` | Complete proof inventory must be renewed and sealed. |
| `WP134-BIND-013` | Exactly one fresh zero-authority validator is required after sealing. |
| `WP134-BIND-014` | Real signing, effective authorization, identity, network and acquisition remain closed. |

## Proposed decisions

| ID | Recommendation | State |
| --- | --- | --- |
| `WP134-DEC-001` | Accept `DEC-261` after independent validation. | Proposed |
| `WP134-DEC-002` | Accept `WP134-FACT-001` through `012`. | Proposed |
| `WP134-DEC-003` | Accept `WP134-REM-001` through `010`. | Proposed |
| `WP134-DEC-004` | Accept `WP134-BIND-001` through `014`. | Proposed |
| `WP134-DEC-005` | Accept local surrogate evidence only; do not infer network readiness. | Proposed |
| `WP134-DEC-006` | Keep every real execution and product gate closed. | Proposed |
| `WP134-DEC-007` | Freeze the exact nine-path candidate inventory after validation. | Proposed |

## Validation and limitations

Primary validation passed 69/69 dependency-free tests and both 34-file public verifiers. The sole
fresh zero-authority validator independently reproduced the 4/4 seal, 9/9 candidate hashes, 46/46
proof hashes, 69/69 tests and both verifier results; source review and `git diff --check` passed with
zero Critical, High, Medium or Low findings. The validator made no edits and consumed its authority.

The result is limited to synthetic signed receipts and a local surrogate subprocess seam. It does
not validate a real signing key, effective authorization, source contact, download, artifact,
network behavior or acquisition result.

## Candidate inventory and next gate

The candidate inventory is documents 00, 02, 127 and 128 plus the five changed acquisition proof
files. The accepted inventory was committed and published at
`53d6d812c9b4ba92a95c8bb78543da44b66ccf48`, repository tree
`3cef53e1bad37b87efeb0d4fa572ccfb07110775`; live `origin/main` matched. Publication activated
WP-135 documentation only and did not authorize signing, effective authorization or network.
