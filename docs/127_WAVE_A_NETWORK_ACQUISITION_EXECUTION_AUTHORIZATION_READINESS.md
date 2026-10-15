# Wave A Network Acquisition Execution Authorization Readiness

## Document control

| Field | Value |
| --- | --- |
| Status | Proposed — owner review required |
| Work package | `WP-133 Wave A Network Acquisition Execution Authorization Readiness` |
| Owner | Aung Myo Oo |
| Governing decision | `DEC-259` — Accepted |
| Published WP-132 revision | `7e4a1f47b526786c233b72eff0f151366055d6c3` |
| Published repository tree | `47d541b02fa72d37572220696d1fc5cd618f5222` |
| Published proof tree | `1c20b3932884e0e2f9a9d96f42e40eaf202fc33e` |
| Recommendation | `DEC-260` — Proposed |
| Readiness | `NOT_READY_RUNTIME_ENTRY_AND_RUN_BINDINGS` |
| Network/download/acquisition | Closed |
| Date | 2026-10-15 |

## Objective and conclusion

WP-133 determines whether the published WP-132 gate is sufficient to authorize a real network
acquisition run. It is not. WP-132 proves signed transition semantics only through a substituted
executor; the runtime entry still stops before curl. The network contract also retains consumed
WP-118 revision/run/key bindings, and the published request fixture is synthetic rather than a
fresh run-bound request.

WP-133 creates only an ignored, all-false, non-promotable private draft. It creates no run, key,
signature, effective authorization, identity, network request, ledger, output or acquisition state.

## Facts and blockers

| ID | Fact or blocker |
| --- | --- |
| `WP133-FACT-001` | WP-132 is independently validated and published at the exact revision and trees above. |
| `WP133-FACT-002` | The signed transition gate binds state, lifecycle, enablement, request, paths, limits and flags. |
| `WP133-FACT-003` | The public runtime entry still stops with `NETWORK_RUNTIME_NOT_AUTHORIZED_BY_WP132`. |
| `WP133-FACT-004` | The static executor seam does not invoke curl and cannot be promoted through caller input. |
| `WP133-FACT-005` | `network-contract.mjs` retains consumed WP-118 revision, tree, run and synthetic owner-key baselines. |
| `WP133-FACT-006` | The published request is classified `SYNTHETIC_STATIC_NO_EXECUTION`. |
| `WP133-FACT-007` | No fresh run ID, root, operator, signing custodian or validator is assigned. |
| `WP133-FACT-008` | No signed enablement token, request set, ledger path, output root or effective time window exists. |
| `WP133-FACT-009` | Accepted sources remain HTTPS-only official Flutter and pub endpoints with bounded redirects. |
| `WP133-FACT-010` | Exact curl and Python hashes remain observed bindings, not execution authority. |
| `WP133-FACT-011` | The ineffective private draft is all-false, non-promotable and mode `0600`. |
| `WP133-FACT-012` | Draft SHA-256 is `8d3d71856a7543f6aea4773175047a09713a7cb54c2cba94346164335d2ddbb3`. |
| `WP133-FACT-013` | No real signing, network, download, acquisition, dependency or runtime action occurred. |
| `WP133-FACT-014` | A later execution gate requires successful static runtime-entry remediation and another readiness decision. |

## Required next static package

| ID | Requirement |
| --- | --- |
| `WP133-REM-001` | Replace consumed WP-118 constants with explicit expected run-bound inputs while preserving static-fixture validation separately. |
| `WP133-REM-002` | Add a network-runtime entry that consumes only the already validated signed-transition receipt. |
| `WP133-REM-003` | Bind one exact request capture, source policy, ledger descriptor, output descriptor and limits before curl creation. |
| `WP133-REM-004` | Make the real child-execution function injectable only from the internal validated path, never CLI/environment input. |
| `WP133-REM-005` | Preserve direct-entry, static, synthetic, consumed, expired, request/path/limit/tool drift stops. |
| `WP133-REM-006` | Add dependency-free surrogate tests proving exact argument and descriptor handoff without network. |
| `WP133-REM-007` | Preserve proxy denial, TLS verification, redirect policy, concurrency lock and byte/time/object budgets. |
| `WP133-REM-008` | Define typed pre-child and post-child evidence without recording secrets or unbounded response bodies. |
| `WP133-REM-009` | Renew all hashes and obtain exactly one fresh zero-authority independent static validator. |
| `WP133-REM-010` | Keep real identities, signing, effective authorization and network closed until a later package. |

## Readiness bindings

| ID | Binding |
| --- | --- |
| `WP133-BIND-001` | Published WP-132 revision `7e4a1f47b526786c233b72eff0f151366055d6c3`. |
| `WP133-BIND-002` | Repository tree `47d541b02fa72d37572220696d1fc5cd618f5222`. |
| `WP133-BIND-003` | Proof tree `1c20b3932884e0e2f9a9d96f42e40eaf202fc33e`. |
| `WP133-BIND-004` | Accepted 46-file proof inventory. |
| `WP133-BIND-005` | Exact curl path `/usr/bin/curl` and SHA-256 `b636262803922ee1dd0fbf614818473ffa53c811e44fd3278c2270d3af4759d3`. |
| `WP133-BIND-006` | Exact Python path `/usr/bin/python3` and SHA-256 `b8763cf250e607a778bb4603cecb5b90338814d0a3dfcba0d57b1de242f610e9`. |
| `WP133-BIND-007` | Exact Node v22.23.1 SHA-256 `2e3f1286a7eb3736346ed1803e458a0ff909e2b2d5bc746144dcb76970e9b99d`. |
| `WP133-BIND-008` | Bootstrap SHA-256 `053f7618fd706406d8c48613f591196c71e790d5ea3606f36286418513ffa893`. |
| `WP133-BIND-009` | Launcher SHA-256 `afae3c900de317a14b8ddfbda670ff902f34c0327fa0547c3a6eef0f0026f4c3`. |
| `WP133-BIND-010` | Network-contract SHA-256 `4551c24d6cf693fcfb04e3c9b64ad999f8a23f3cd3785c3196bce81868cf8bc4`. |
| `WP133-BIND-011` | Source-policy SHA-256 `b2171aaf0a10ecbab9cde35d6eb59dafab629c9fea25bbcbeff1b5c33dc3052e`. |
| `WP133-BIND-012` | Runtime entry and every network flag remain closed. |
| `WP133-BIND-013` | Private draft remains ineffective and non-promotable. |
| `WP133-BIND-014` | No execution identity or run material exists. |
| `WP133-BIND-015` | WP-134 may change only disposable proof controls, governing docs and private static evidence. |
| `WP133-BIND-016` | WP-134 may use dependency-free local static tests only. |
| `WP133-BIND-017` | WP-134 requires exactly one fresh zero-authority validator after sealing. |
| `WP133-BIND-018` | WP-133 commit/push and WP-134 execution remain separate gates. |

## Options and recommendation

| ID | Option | Disposition |
| --- | --- | --- |
| `WP133-OPT-001` | Advance proof-only static runtime-entry remediation as WP-134. | Advance |
| `WP133-OPT-002` | Authorize network execution from the current tree. | Reject |
| `WP133-OPT-003` | Reuse WP-130 signing material or WP-118 authority. | Reject |
| `WP133-OPT-004` | Convert the synthetic request fixture into live authority. | Reject |
| `WP133-OPT-005` | Stop Wave A before network work. | Retain fallback |

### Proposed decision `DEC-260`

Classify WP-133 as `NOT_READY_RUNTIME_ENTRY_AND_RUN_BINDINGS`; advance WP-134 proof-only static
runtime-entry remediation, retain option 005 as fallback and reject options 002 through 004.

## Proposed owner decisions

| ID | Recommendation | State |
| --- | --- | --- |
| `WP133-DEC-001` | Accept `DEC-260` and the not-ready classification. | Proposed |
| `WP133-DEC-002` | Accept `WP133-FACT-001` through `014`. | Proposed |
| `WP133-DEC-003` | Accept `WP133-REM-001` through `010`. | Proposed |
| `WP133-DEC-004` | Accept `WP133-BIND-001` through `018`. | Proposed |
| `WP133-DEC-005` | Advance option 001, retain option 005 and reject options 002 through 004. | Proposed |
| `WP133-DEC-006` | Accept the private draft as ineffective and non-promotable. | Proposed |
| `WP133-DEC-007` | Keep network, signing and all execution gates closed. | Proposed |
| `WP133-DEC-008` | Authorize no identities, run root, credentials or source contact. | Proposed |
| `WP133-DEC-009` | Require later independent static validation before another readiness decision. | Proposed |
| `WP133-DEC-010` | Freeze the exact four-path WP-133 public candidate inventory. | Proposed |

## Candidate inventory and next gate

The exact public candidate inventory is documents 00, 02, 126 and 127. WP-133 stops for owner
review. No commit or push is authorized.
