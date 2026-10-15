# Wave A Remediated Real Signing Materialization Reauthorization Readiness

## Document control

| Field | Value |
| --- | --- |
| Status | Accepted — exact publication authorized |
| Work package | `WP-126 Remediated Real Signing Materialization Reauthorization Readiness` |
| Owner | Aung Myo Oo |
| Governing decision | `DEC-252` — Accepted |
| Accepted WP-125 revision | `5c26e4fe71923a2b5bd13a27faa28e7f550d1347` |
| Accepted repository tree | `fbe7fbcf78dbfdb38dd8b2467fdf2b74075f8650` |
| Accepted proof tree | `0a697f4cecbb4044c9ec34f1cce58b6e7a344f74` |
| Recommendation | `DEC-253` — Accepted |
| Key/signing/effective authorization/validator | Closed |
| Network/acquisition/dependencies/runtime | Closed |
| Product/architecture/infrastructure/deployment | Closed |
| Date | 2026-10-15 |

## Objective and boundary

WP-126 determines whether the published WP-125 remediation is ready to support a new, separately
authorized real signing and pre-network materialization attempt. It binds a proposed fresh run,
roles, paths, tool hashes, diagnostic helper and stop/cleanup contract. It creates one ignored,
all-false, non-promotable private draft.

WP-126 creates no run root, key, trust descriptor, authorization, signature, validator, network
request, artifact, dependency, runtime or downstream product state.

## Facts and readiness findings

| ID | Fact or finding |
| --- | --- |
| `WP126-FACT-001` | WP-125 is published at the exact revision and trees above; live `origin/main` and local `HEAD` matched. |
| `WP126-FACT-002` | WP-125 independently passed 12/12 candidate hashes, 44/44 proof hashes, 63/63 tests and both 32-file verifiers with zero findings. |
| `WP126-FACT-003` | Exact `TMPDIR=/tmp` prevents the macOS Python startup warning without stderr filtering. |
| `WP126-FACT-004` | The oracle still requires exit `1`, empty stdout and exactly the closed-boundary stop. |
| `WP126-FACT-005` | Warning-prefixed, unexpected, forged, stdout-bearing and wrong-exit results fail closed. |
| `WP126-FACT-006` | WP-124 run and all its key/signature material are closed, non-resumable and prohibited from reuse. |
| `WP126-FACT-007` | Proposed fresh run ID is `wp127-2026-10-15-01`. |
| `WP126-FACT-008` | Proposed root `internal-local/work-packages/WP-127/wp127-2026-10-15-01/` does not exist. |
| `WP126-FACT-009` | `/root` is proposed as temporally separated signing custodian and later primary operator, without current authority. |
| `WP126-FACT-010` | `/root/wp127_signing_packet_validator` is reserved only as a proposed fresh zero-authority validator and is not instantiated. |
| `WP126-FACT-011` | Exact Node v22.23.1 and published diagnostic helper require no dependency installation. |
| `WP126-FACT-012` | The ineffective private draft is mode `0600`, all-false, non-promotable and SHA-256 `6fdb8748f5474f371842a5badb975b582c4a2d1adac1843c8ba3a5186b489e07`. |
| `WP126-FACT-013` | No key, signing, validator, network, dependency or runtime action occurred in WP-126. |
| `WP126-FACT-014` | A new attempt still requires separate owner execution authorization and later result acceptance. |

## Proposed reauthorization bindings

| ID | Required later binding |
| --- | --- |
| `WP126-BIND-001` | Published revision `5c26e4fe71923a2b5bd13a27faa28e7f550d1347`. |
| `WP126-BIND-002` | Repository tree `fbe7fbcf78dbfdb38dd8b2467fdf2b74075f8650`. |
| `WP126-BIND-003` | Proof tree `0a697f4cecbb4044c9ec34f1cce58b6e7a344f74`. |
| `WP126-BIND-004` | Accepted 44-file proof inventory and hashes. |
| `WP126-BIND-005` | Fresh run ID `wp127-2026-10-15-01` and exact new ignored root. |
| `WP126-BIND-006` | Exact Node path, version and SHA-256 `2e3f1286a7eb3736346ed1803e458a0ff909e2b2d5bc746144dcb76970e9b99d`. |
| `WP126-BIND-007` | Diagnostic-helper SHA-256 `a18dc5cfa99add382b2f2ac69dfdddaec4ea1a5f4391aef9a008811c5dbb10e8`. |
| `WP126-BIND-008` | Bootstrap SHA-256 `053f7618fd706406d8c48613f591196c71e790d5ea3606f36286418513ffa893`. |
| `WP126-BIND-009` | Launcher SHA-256 `7fb956e4a3ea6c777e6d2ac28703457c3742a76142929b905ee5bf2f85085ce0`. |
| `WP126-BIND-010` | `/root` stages remain temporally separated; custodian authority is consumed before operator handoff. |
| `WP126-BIND-011` | One new ephemeral Ed25519 key; no WP-124 or synthetic material reuse. |
| `WP126-BIND-012` | One new public trust root, canonical static-only authorization and detached signature. |
| `WP126-BIND-013` | Bootstrap invocation only through the published sanitized helper contract. |
| `WP126-BIND-014` | Exact closed-boundary oracle; no filtering, trimming or diagnostic substitution. |
| `WP126-BIND-015` | Private-key destruction and residual verification before sealing. |
| `WP126-BIND-016` | Exactly one fresh zero-authority validator only after sealed handoff. |
| `WP126-BIND-017` | Mandatory cleanup and bounded stop evidence under every outcome. |
| `WP126-BIND-018` | No effective network state, requests or network-capable child. |
| `WP126-BIND-019` | No dependency, build, device, runtime proof or global cache/SDK mutation. |
| `WP126-BIND-020` | No application, architecture, infrastructure, deployment, provider/cost or customer/live-data action. |

## Options and recommendation

| ID | Option | Disposition |
| --- | --- | --- |
| `WP126-OPT-001` | Authorize one fresh WP-127 controlled materialization using the published diagnostic helper, then stop for result acceptance. | Advance |
| `WP126-OPT-002` | Resume or reuse WP-124 materials. | Reject |
| `WP126-OPT-003` | Filter the warning or weaken the terminal-stop oracle. | Reject |
| `WP126-OPT-004` | Combine materialization with network execution. | Reject |
| `WP126-OPT-005` | Retain an evidence-equivalent owner-supplied sealed bundle. | Retain fallback |

### Accepted decision `DEC-253`

Classify WP-126 as `READY_FOR_SEPARATELY_AUTHORIZED_WP127_REMATERIALIZATION`; accept the facts and
twenty bindings; advance option 001, retain option 005 only as an evidence-equivalent fallback and
reject options 002 through 004. This decision authorizes no run, key, signature, validator,
effective authorization, network or downstream action.

## Proposed owner decisions

| ID | Recommendation | State |
| --- | --- | --- |
| `WP126-DEC-001` | Accept `DEC-253` and the readiness classification. | Accepted |
| `WP126-DEC-002` | Accept `WP126-FACT-001` through `014`. | Accepted |
| `WP126-DEC-003` | Accept `WP126-BIND-001` through `020`. | Accepted |
| `WP126-DEC-004` | Accept the proposed run, root, roles and exact tool bindings without activating them. | Accepted |
| `WP126-DEC-005` | Advance option 001, retain option 005 and reject options 002 through 004. | Accepted |
| `WP126-DEC-006` | Prohibit reuse of WP-124 materials and any oracle weakening. | Accepted |
| `WP126-DEC-007` | Accept the private draft as ineffective and non-promotable. | Accepted |
| `WP126-DEC-008` | Keep every execution and downstream gate closed. | Accepted |
| `WP126-DEC-009` | Require separate owner authority for WP-127 and later result acceptance. | Accepted |
| `WP126-DEC-010` | Freeze the exact four-path WP-126 public candidate inventory. | Accepted |

## Candidate inventory and next gate

The exact public candidate inventory is documents 00, 02, 119 and 120. WP-126 stops for owner
review. No commit or push is authorized.

## Owner acceptance

The owner accepted `DEC-253`, every WP-126 fact, binding and decision; accepted the exact proposed
run, root, roles and tool bindings; advanced option 001; retained option 005 only as an
evidence-equivalent fallback; rejected options 002 through 004; accepted the ineffective draft and
root validation PASS; and authorized publication of only the exact four-path public inventory.

## Verified publication and WP-127 result

The accepted four-path WP-126 inventory was committed as
`1da6899 WP-126: accept rematerialization readiness` and published at
`1da689912c2bca356bc365a4a8ad1ccb644f6ce7`. Live `origin/main` and local `HEAD` matched.

WP-127 stopped before key generation under `WP127-DEV-001` because the private materializer's
relative helper import resolved beneath `internal-local/`. Cleanup passed, no key or network state
existed, the validator gate did not open, and no retry is authorized.
