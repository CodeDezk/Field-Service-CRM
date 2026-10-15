# Wave A Remediated Real Signing Materialization Reauthorization Readiness

## Document control

| Field | Value |
| --- | --- |
| Status | Proposed — owner review required |
| Work package | `WP-129 Remediated Real Signing Materialization Reauthorization Readiness` |
| Owner | Aung Myo Oo |
| Governing decision | `DEC-255` — Accepted |
| Accepted WP-128 revision | `eef557daebb459ba7eacc9affa93115bfc1e561c` |
| Accepted repository tree | `83c03f6bba8f4cdd926ba2dd5328481aac53108d` |
| Accepted proof tree | `c5737f78ccecf8b667259825308d2c306eaba859` |
| Recommendation | `DEC-256` — Proposed |
| Key/signing/effective authorization/validator | Closed |
| Network/acquisition/dependencies/runtime | Closed |
| Product/architecture/infrastructure/deployment | Closed |
| Date | 2026-10-15 |

## Objective and boundary

WP-129 determines whether the published WP-128 remediation is ready to support one new,
separately authorized real-signing and pre-network materialization attempt. It binds a proposed
fresh run, roles, paths, exact tools, the pre-key helper-resolution gate, diagnostic oracle,
cleanup and stop controls. It creates one ignored all-false, non-promotable private draft.

WP-129 creates no run root, key, trust descriptor, authorization, signature, validator, network
request, artifact, dependency, runtime or downstream product state.

## Facts and readiness findings

| ID | Fact or finding |
| --- | --- |
| `WP129-FACT-001` | WP-128 is published at the exact revision and trees above; live `origin/main` and local `HEAD` matched. |
| `WP129-FACT-002` | WP-128 independently passed 12/12 candidate hashes, 46/46 proof hashes, 67/67 tests and both 34-file verifiers with zero findings. |
| `WP129-FACT-003` | An explicit absolute repository root replaces the failed private relative-depth assumption. |
| `WP129-FACT-004` | Exact helper hash and required exports are checked before any future key operation. |
| `WP129-FACT-005` | Space-containing paths pass; relative roots, wrong depth, escape and hash drift fail closed. |
| `WP129-FACT-006` | Exact diagnostic environment and closed-boundary oracle remain unchanged. |
| `WP129-FACT-007` | WP-127 is closed, non-resumable and prohibited from material reuse. |
| `WP129-FACT-008` | Proposed fresh run ID is `wp130-2026-10-15-01`. |
| `WP129-FACT-009` | Proposed root `internal-local/work-packages/WP-130/wp130-2026-10-15-01/` does not exist. |
| `WP129-FACT-010` | `/root` is proposed as temporally separated signing custodian and later primary operator, without current execution authority. |
| `WP129-FACT-011` | `/root/wp130_signing_packet_validator` is reserved only as a proposed fresh zero-authority validator and is not instantiated. |
| `WP129-FACT-012` | The ineffective private draft is mode `0600`, all-false, non-promotable and SHA-256 `8335439978827f047ca725d2625dfbbe427d37cf8d4c1b61cc27a06011f46a06`. |
| `WP129-FACT-013` | No key, signing, validator, network, dependency or runtime action occurred in WP-129. |
| `WP129-FACT-014` | A new attempt requires separate owner execution authorization and later result acceptance. |

## Proposed reauthorization bindings

| ID | Required later binding |
| --- | --- |
| `WP129-BIND-001` | Published revision `eef557daebb459ba7eacc9affa93115bfc1e561c`. |
| `WP129-BIND-002` | Repository tree `83c03f6bba8f4cdd926ba2dd5328481aac53108d`. |
| `WP129-BIND-003` | Proof tree `c5737f78ccecf8b667259825308d2c306eaba859`. |
| `WP129-BIND-004` | Accepted 46-file proof inventory and hashes. |
| `WP129-BIND-005` | Fresh run ID `wp130-2026-10-15-01` and exact new ignored root. |
| `WP129-BIND-006` | Exact Node v22.23.1 path and SHA-256 `2e3f1286a7eb3736346ed1803e458a0ff909e2b2d5bc746144dcb76970e9b99d`. |
| `WP129-BIND-007` | Pre-key resolver SHA-256 `d20367d553f13a2e7af75c858f735322c793719a3f805123b8e7cb49d7846210`. |
| `WP129-BIND-008` | Diagnostic-helper SHA-256 `a18dc5cfa99add382b2f2ac69dfdddaec4ea1a5f4391aef9a008811c5dbb10e8`. |
| `WP129-BIND-009` | Bootstrap SHA-256 `053f7618fd706406d8c48613f591196c71e790d5ea3606f36286418513ffa893`. |
| `WP129-BIND-010` | Launcher SHA-256 `7fb956e4a3ea6c777e6d2ac28703457c3742a76142929b905ee5bf2f85085ce0`. |
| `WP129-BIND-011` | Pre-key helper capture and import-check must PASS before key generation. |
| `WP129-BIND-012` | `/root` custodian authority is temporally separated and consumed before operator handoff. |
| `WP129-BIND-013` | One new ephemeral Ed25519 key; no prior-run or synthetic material reuse. |
| `WP129-BIND-014` | One new public trust root, canonical static-only authorization and detached signature. |
| `WP129-BIND-015` | Bootstrap invocation only through the published sanitized helper contract. |
| `WP129-BIND-016` | Exact closed-boundary oracle; no filtering, trimming or diagnostic substitution. |
| `WP129-BIND-017` | Private-key destruction and residual verification before sealing. |
| `WP129-BIND-018` | Exactly one fresh zero-authority validator only after sealed handoff. |
| `WP129-BIND-019` | Mandatory cleanup and bounded stop evidence under every outcome. |
| `WP129-BIND-020` | No effective network state, requests or network-capable child. |
| `WP129-BIND-021` | No dependency, build, device, runtime proof or global cache/SDK mutation. |
| `WP129-BIND-022` | No application, architecture, infrastructure, deployment, provider/cost or customer/live-data action. |

## Options and recommendation

| ID | Option | Disposition |
| --- | --- | --- |
| `WP129-OPT-001` | Authorize one fresh WP-130 materialization using the exact published pre-key and diagnostic controls, then stop for result acceptance. | Advance |
| `WP129-OPT-002` | Resume WP-127 or reuse any previous key/signature material. | Reject |
| `WP129-OPT-003` | Reintroduce private relative-depth helper resolution. | Reject |
| `WP129-OPT-004` | Combine materialization with network execution. | Reject |
| `WP129-OPT-005` | Retain an evidence-equivalent owner-supplied sealed bundle. | Retain fallback |

### Proposed decision `DEC-256`

Classify WP-129 as `READY_FOR_SEPARATELY_AUTHORIZED_WP130_REMATERIALIZATION`; accept the facts and
22 bindings; advance option 001, retain option 005 only as an evidence-equivalent fallback and
reject options 002 through 004. This authorizes no run, key, signature, validator, effective
authorization, network or downstream action.

## Proposed owner decisions

| ID | Recommendation | State |
| --- | --- | --- |
| `WP129-DEC-001` | Accept `DEC-256` and the readiness classification. | Proposed |
| `WP129-DEC-002` | Accept `WP129-FACT-001` through `014`. | Proposed |
| `WP129-DEC-003` | Accept `WP129-BIND-001` through `022`. | Proposed |
| `WP129-DEC-004` | Accept the proposed run, root, roles and exact tool bindings without activating them. | Proposed |
| `WP129-DEC-005` | Advance option 001, retain option 005 and reject options 002 through 004. | Proposed |
| `WP129-DEC-006` | Prohibit previous-run material reuse and any oracle weakening. | Proposed |
| `WP129-DEC-007` | Accept the private draft as ineffective and non-promotable. | Proposed |
| `WP129-DEC-008` | Keep every execution and downstream gate closed. | Proposed |
| `WP129-DEC-009` | Require separate owner authority for WP-130 and later result acceptance. | Proposed |
| `WP129-DEC-010` | Freeze the exact four-path WP-129 public candidate inventory. | Proposed |

## Candidate inventory and next gate

The exact public candidate inventory is documents 00, 02, 122 and 123. WP-129 stops for owner
review. No commit or push is authorized.
