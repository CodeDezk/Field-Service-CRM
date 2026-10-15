# Wave A Network Execution Identity and Effective Authorization Readiness

## Document control

| Field | Value |
| --- | --- |
| Status | Proposed — owner review required |
| Work package | `WP-135 Wave A Network Execution Identity and Effective Authorization Readiness` |
| Owner | Aung Myo Oo |
| Governing decision | `DEC-261` — Accepted |
| Accepted WP-134 revision | `53d6d812c9b4ba92a95c8bb78543da44b66ccf48` |
| Accepted repository tree | `3cef53e1bad37b87efeb0d4fa572ccfb07110775` |
| Accepted proof tree | `fc7bdf2d7afeeba30463204e26adbce935c09d7d` |
| Recommendation | `DEC-262` — Proposed |
| Classification | `READY_FOR_SEPARATELY_AUTHORIZED_WP136_CONTROLLED_NETWORK_ACQUISITION` |
| Signing/effective authorization/network/acquisition | Closed |
| Date | 2026-10-15 |

## Objective and boundary

WP-135 determines whether the published, independently validated WP-134 control is ready for one
separately authorized real network-acquisition run. It proposes a fresh run, identities, private
root, exact tools, authority lifecycle, source restrictions, limits, evidence and stop controls.
It creates only an ignored, all-false, non-promotable private draft.

WP-135 creates no run root, key, signature, effective authorization, validator, request, ledger,
network connection, download, artifact, dependency, runtime or product state.

## Facts and readiness findings

| ID | Fact or finding |
| --- | --- |
| `WP135-FACT-001` | WP-134 is published at the exact revision and trees above; local `HEAD` and live `origin/main` matched. |
| `WP135-FACT-002` | WP-134 independently passed 9/9 candidate hashes, 46/46 proof hashes, 69/69 tests and both 34-file verifiers with zero findings. |
| `WP135-FACT-003` | Exact run-bound revision, tree, tool, request, policy, ledger, output, limit and action checks precede child creation. |
| `WP135-FACT-004` | The executor seam is internal-only; CLI and environment cannot replace it. |
| `WP135-FACT-005` | Direct, static, synthetic, expired, consumed and drifted authorities fail closed. |
| `WP135-FACT-006` | The published runtime still stops before curl without a separately created effective signed authority. |
| `WP135-FACT-007` | Proposed fresh run ID is `wp136-2026-10-15-01`. |
| `WP135-FACT-008` | Proposed private root `internal-local/work-packages/WP-136/wp136-2026-10-15-01/` does not exist. |
| `WP135-FACT-009` | `/root` is proposed as temporally separated signing custodian and later primary operator, without current authority. |
| `WP135-FACT-010` | `/root/wp136_network_acquisition_validator` is reserved only as a proposed fresh zero-authority validator and is not instantiated. |
| `WP135-FACT-011` | The accepted five-entry source policy permits only exact HTTPS Flutter and pub metadata/artifact endpoints. |
| `WP135-FACT-012` | The accepted limits bound time, concurrency, attempts, bytes, objects, redirects and minimum free space. |
| `WP135-FACT-013` | The private draft is mode `0600`, all-false, ineffective, non-promotable and SHA-256 `81db8694d1e104b336a1eb29bdaa0c55ab54416c8d7bb94b0de88593bf6951ad`. |
| `WP135-FACT-014` | No signing, validator, network, download, acquisition, dependency or runtime action occurred. |
| `WP135-FACT-015` | WP-136 must stop after its bounded packet and cannot install, extract or use acquired artifacts. |
| `WP135-FACT-016` | WP-136 result acceptance, architecture disposition and any later dependency use remain separate gates. |

## Proposed WP-136 bindings

| ID | Required later binding |
| --- | --- |
| `WP135-BIND-001` | Published revision `53d6d812c9b4ba92a95c8bb78543da44b66ccf48`. |
| `WP135-BIND-002` | Repository tree `3cef53e1bad37b87efeb0d4fa572ccfb07110775`. |
| `WP135-BIND-003` | Proof tree `fc7bdf2d7afeeba30463204e26adbce935c09d7d`. |
| `WP135-BIND-004` | Accepted renewed 46-file proof inventory. |
| `WP135-BIND-005` | Fresh run ID `wp136-2026-10-15-01` and exact new ignored private root. |
| `WP135-BIND-006` | `/root` is signing custodian first and primary operator only after custodian authority consumption. |
| `WP135-BIND-007` | One fresh zero-authority validator is instantiated only after sealed execution evidence. |
| `WP135-BIND-008` | Node v22.23.1 SHA-256 `2e3f1286a7eb3736346ed1803e458a0ff909e2b2d5bc746144dcb76970e9b99d`. |
| `WP135-BIND-009` | Python SHA-256 `b8763cf250e607a778bb4603cecb5b90338814d0a3dfcba0d57b1de242f610e9`. |
| `WP135-BIND-010` | Curl SHA-256 `b636262803922ee1dd0fbf614818473ffa53c811e44fd3278c2270d3af4759d3`. |
| `WP135-BIND-011` | Trusted bootstrap SHA-256 `053f7618fd706406d8c48613f591196c71e790d5ea3606f36286418513ffa893`. |
| `WP135-BIND-012` | Trusted launcher SHA-256 `8dc9cee8dafc47895f7db9baceff3503660943dde630439843d13ab06f3f2d12`. |
| `WP135-BIND-013` | Pre-network invocation SHA-256 `070f3cc0b889c22bf25a9d6f9ff5a1f7c97a413b34c034b7588e1d7de8d073c3`. |
| `WP135-BIND-014` | Network contract SHA-256 `4551c24d6cf693fcfb04e3c9b64ad999f8a23f3cd3785c3196bce81868cf8bc4`. |
| `WP135-BIND-015` | Source-policy SHA-256 `b2171aaf0a10ecbab9cde35d6eb59dafab629c9fea25bbcbeff1b5c33dc3052e`. |
| `WP135-BIND-016` | One fresh ephemeral Ed25519 key; synthetic and previous-run keys are prohibited. |
| `WP135-BIND-017` | Canonical signed `EFFECTIVE_NETWORK` authority binds the exact revision, tree, run, roots, roles, tools, requests, policy, descriptors and limits. |
| `WP135-BIND-018` | Effective authorization validity is at most 45 minutes, single-use and consumed before sealing. |
| `WP135-BIND-019` | Exact request files and hashes are frozen before signing; no ad hoc URL or request input is allowed. |
| `WP135-BIND-020` | HTTPS port 443 only; proxy use disabled; TLS verification enabled; redirects limited by the accepted source policy. |
| `WP135-BIND-021` | Maximum concurrency 1, accepted-byte attempts 3, total bytes 4 GiB, single response 2 GiB and objects 2,000. |
| `WP135-BIND-022` | Flutter metadata maximum 8 MiB, pub metadata maximum 2 MiB, aggregate redirects maximum 3 and minimum free space 20 GiB. |
| `WP135-BIND-023` | One exclusive run lock, append-only ledger and no-follow output descriptors are required. |
| `WP135-BIND-024` | Downloaded bytes remain quarantined evidence; no archive extraction, SDK/cache mutation, dependency restoration, build, device or runtime use. |
| `WP135-BIND-025` | Private-key destruction and residual verification occur before validator handoff. |
| `WP135-BIND-026` | Mandatory cleanup and residual verification occur under every outcome. |
| `WP135-BIND-027` | Result is sealed, independently validated and stopped for later owner acceptance. |
| `WP135-BIND-028` | Application, architecture, infrastructure, deployment, provider/cost and customer/live-data gates remain closed. |

## Mandatory stops

| ID | Stop condition |
| --- | --- |
| `WP135-STOP-001` | Revision, tree, proof inventory, executable, control or source-policy drift. |
| `WP135-STOP-002` | Existing run root, unsafe ownership/mode/link, insufficient free space or active lock. |
| `WP135-STOP-003` | Key reuse, private-key exposure, signature failure or incomplete authority binding. |
| `WP135-STOP-004` | Missing, expired, consumed, synthetic, mismatched or non-single-use authority. |
| `WP135-STOP-005` | Request, source, URL, redirect, descriptor, limit, hash or size drift. |
| `WP135-STOP-006` | Proxy use, disabled TLS verification, unaccepted host/path/port or unexpected network behavior. |
| `WP135-STOP-007` | Budget, object, attempt, duration, concurrency or free-space threshold reached. |
| `WP135-STOP-008` | Artifact extraction, dependency restoration, SDK/cache mutation, build, device or runtime attempt. |
| `WP135-STOP-009` | Validator mutation, repair, key/signing authority or network access. |
| `WP135-STOP-010` | Cleanup, residual verification, sealing or evidence completeness failure. |

## Options and recommendation

| ID | Option | Disposition |
| --- | --- | --- |
| `WP135-OPT-001` | Authorize one bounded WP-136 controlled network-acquisition run using the exact bindings and stop after sealed validation. | Advance |
| `WP135-OPT-002` | Contact the network from WP-135 or the ineffective draft. | Reject |
| `WP135-OPT-003` | Reuse a prior key, signature, request, authorization or run root. | Reject |
| `WP135-OPT-004` | Install, extract or use acquired artifacts in the same package. | Reject |
| `WP135-OPT-005` | Retain an evidence-equivalent owner-supplied offline artifact bundle. | Retain fallback |

### Proposed decision `DEC-262`

Classify WP-135 as `READY_FOR_SEPARATELY_AUTHORIZED_WP136_CONTROLLED_NETWORK_ACQUISITION`;
advance option 001, retain option 005 only as an evidence-equivalent fallback and reject options
002 through 004. This decision creates no execution authority.

## Proposed owner decisions

| ID | Recommendation | State |
| --- | --- | --- |
| `WP135-DEC-001` | Accept `DEC-262` and the readiness classification. | Proposed |
| `WP135-DEC-002` | Accept `WP135-FACT-001` through `016`. | Proposed |
| `WP135-DEC-003` | Accept `WP135-BIND-001` through `028`. | Proposed |
| `WP135-DEC-004` | Accept `WP135-STOP-001` through `010`. | Proposed |
| `WP135-DEC-005` | Accept the proposed run, root and roles without activating them. | Proposed |
| `WP135-DEC-006` | Advance option 001, retain option 005 and reject options 002 through 004. | Proposed |
| `WP135-DEC-007` | Accept the private draft as ineffective and non-promotable. | Proposed |
| `WP135-DEC-008` | Keep every current execution and downstream gate closed. | Proposed |
| `WP135-DEC-009` | Require separate WP-136 execution authorization and later result acceptance. | Proposed |
| `WP135-DEC-010` | Freeze the exact four-path WP-135 public candidate inventory. | Proposed |

## Candidate inventory and next gate

The exact public candidate inventory is documents 00, 02, 128 and 129. WP-135 stops for owner
review. No network action, commit or push is authorized.
