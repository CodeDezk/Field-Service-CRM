# Wave A Effective Network Transition Static Remediation Readiness

## Document control

| Field | Value |
| --- | --- |
| Status | Accepted under standing owner authorization |
| Work package | `WP-131 Effective Network Transition Static Remediation Readiness` |
| Owner | Aung Myo Oo |
| Governing decision | `DEC-257` — Accepted |
| Published WP-130 revision | `28f5d71190857dc59eed9edbcd924dd64190055c` |
| Recommendation | `DEC-258` — Accepted under standing owner authorization |
| Network/download/acquisition | Closed |
| Key/signing/runtime/dependencies | Closed |
| Application/architecture/infrastructure/deployment | Closed |
| Date | 2026-10-15 |

## Objective and conclusion

WP-131 determines the next permitted step after WP-130 proved real owner signing and exact
pre-network verification. The current trusted launcher deliberately terminates with
`NETWORK_EXECUTION_NOT_AUTHORIZED_BY_WP121`; the WP-130 authorization is static-only, consumed and
non-promotable. Therefore no effective acquisition authorization can be issued from the current
published tree.

The next permissible step is proof-only static remediation of the transition from verified signed
authority to a still-fail-closed, exact-request network gate. Static remediation must not perform
network access, create a real signing key, acquire artifacts or restore dependencies.

## Facts

| ID | Fact |
| --- | --- |
| `WP131-FACT-001` | WP-130 passed pre-key resolution, signing, exact closed-boundary verification, cleanup and independent review. |
| `WP131-FACT-002` | WP-130 is published at the exact revision above and is closed, consumed and non-resumable. |
| `WP131-FACT-003` | The retained WP-130 authorization has all 13 action flags false and state `EFFECTIVE_STATIC_ONLY`. |
| `WP131-FACT-004` | The trusted launcher contains an unconditional pre-network terminal stop. |
| `WP131-FACT-005` | Promoting or editing WP-130 private material would violate its accepted single-use contract. |
| `WP131-FACT-006` | The public network contract already models exact sources, request hashes, committed metadata, limits and ledger controls statically. |
| `WP131-FACT-007` | Actual network execution still requires a reviewed transition that cannot be enabled by caller-supplied flags alone. |
| `WP131-FACT-008` | No network, signing, key, dependency, runtime or external-system action occurs in WP-131. |
| `WP131-FACT-009` | A future effective authorization requires a fresh run, key, owner signature, identities, time window and exact published hashes. |
| `WP131-FACT-010` | Network execution remains a separate hard boundary after static remediation and independent validation. |

## Required static remediation

| ID | Requirement |
| --- | --- |
| `WP131-REM-001` | Preserve the unconditional stop for every static-only, synthetic, missing, expired, consumed or mismatched authority. |
| `WP131-REM-002` | Permit transition only for an exact signed `EFFECTIVE_NETWORK` state with `network:true` and every unrelated action false. |
| `WP131-REM-003` | Bind accepted revision/tree, trust root, authorization, launcher, source policy, request set, ledger, output root and limits before process creation. |
| `WP131-REM-004` | Require a run-bound enablement value inside the signed authorization; environment or CLI flags cannot grant authority. |
| `WP131-REM-005` | Keep the exact source allowlist, redirect denial, proxy denial, TLS verification and one-request concurrency controls. |
| `WP131-REM-006` | Preserve pre-intent ledger writes, exact output descriptors, byte/time budgets and complete request receipts. |
| `WP131-REM-007` | Add dependency-free positive static surrogate tests and negative authority/state/drift tests without contacting a network. |
| `WP131-REM-008` | Add an execution seam that static tests can substitute without invoking `/usr/bin/curl`. |
| `WP131-REM-009` | Renew all public inventories and require exactly one fresh zero-authority independent static validator. |
| `WP131-REM-010` | Keep real keys, network and acquisition closed until a later exact execution-readiness package. |

## Options and disposition

| ID | Option | Disposition |
| --- | --- | --- |
| `WP131-OPT-001` | Advance one proof-only static network-transition remediation package. | Advance |
| `WP131-OPT-002` | Reuse or promote WP-130 authorization and signature. | Reject |
| `WP131-OPT-003` | Remove or bypass the terminal stop directly. | Reject |
| `WP131-OPT-004` | Perform network acquisition now. | Reject |
| `WP131-OPT-005` | Stop the Wave A proof sequence permanently. | Defer |

## Accepted decision `DEC-258`

Advance one bounded proof-only static remediation package for the signed-authority-to-network gate.
It may change only disposable Wave A proof controls, governing documentation and private static
evidence; add dependency-free tests; renew hashes; and use exactly one fresh zero-authority static
validator after sealing. It may not create a real key, sign, access network, download, acquire,
restore dependencies, run application code, select architecture, create infrastructure, deploy,
incur cost or use customer/live data.

## Decision record

| ID | Decision | State |
| --- | --- | --- |
| `WP131-DEC-001` | Accept `WP131-FACT-001` through `010`. | Accepted under standing owner authorization |
| `WP131-DEC-002` | Accept `WP131-REM-001` through `010`. | Accepted under standing owner authorization |
| `WP131-DEC-003` | Advance option 001, reject options 002 through 004 and defer option 005. | Accepted under standing owner authorization |
| `WP131-DEC-004` | Keep the WP-130 packet immutable and non-reusable. | Accepted under standing owner authorization |
| `WP131-DEC-005` | Keep network and every downstream execution gate closed. | Accepted under standing owner authorization |
| `WP131-DEC-006` | Authorize WP-132 proof-only static remediation within the boundary above. | Accepted under standing owner authorization |
| `WP131-DEC-007` | Freeze the exact four-path WP-131 public inventory. | Accepted under standing owner authorization |

## Next package

`WP-132 Signed Authority to Exact Network Gate Static Remediation` is authorized for proof-only
static work. Network and all downstream execution remain closed.

## Verified publication and WP-132 activation

The frozen four-path WP-131 inventory was committed as
`779df25 WP-131: accept network transition readiness` and published at
`779df25866b9cbc38d16669e0f034e4b068c98bf`. Live `origin/main` and local `HEAD` matched.
WP-132 then began within the accepted static-only boundary.
