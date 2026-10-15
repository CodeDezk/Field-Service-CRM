# Wave A Real Signing Authority and Acquisition Execution Readiness

## Document control

| Field | Value |
| --- | --- |
| Status | Accepted — exact publication authorized |
| Work package | `WP-122 Real Signing Authority and Acquisition Execution Readiness` |
| Owner | Aung Myo Oo |
| Governing decisions | `DEC-243` through `DEC-248` — Accepted |
| Accepted WP-121 revision | `66f0f857b987e49f392919802bc829113a783713` |
| Accepted repository tree | `37353f5a1c4ea59f2309ee1e17aaae3f4be6b309` |
| Accepted proof tree | `0f3e9dc514c0d6456745bb5ab1df003d5d2e0494` |
| Recommendation | `DEC-249` — Accepted |
| Real key/signing/effective authorization | Closed |
| Network/acquisition/dependencies/runtime | Closed |
| Application/architecture/infrastructure/deployment | Closed |
| Provider/cost/customer or live data | Closed |
| Date | 2026-10-14 |

## Objective and boundary

WP-122 evaluates the published WP-121 controls and freezes the proposed authority sequence,
custody separation, run-bound inputs, stop conditions and successor. It creates one ignored,
all-false private draft. It creates no key, trust root, signature, run, validator, effective
authorization, network request, artifact, dependency, runtime or downstream product state.

## Facts and findings

| ID | Fact or finding |
| --- | --- |
| `WP122-FACT-001` | WP-121 is published at the exact revision and trees above; local `HEAD` and live `origin/main` matched. |
| `WP122-FACT-002` | WP-121 passed 42/42 hashes, 59/59 tests and both 30-file verifiers with zero independent findings. |
| `WP122-FACT-003` | The bootstrap can verify a run-bound Ed25519 trust root without embedding a real key. |
| `WP122-FACT-004` | Synthetic key material cannot authorize `EFFECTIVE_NETWORK`. |
| `WP122-FACT-005` | Revision, tree, private-root, key-ID, public-key and descriptor-hash drift fail closed. |
| `WP122-FACT-006` | The launcher deliberately stops at `NETWORK_EXECUTION_NOT_AUTHORIZED_BY_WP121`; publication grants no network authority. |
| `WP122-FACT-007` | No real key ID, public key, trust-root hash, run ID, private root, validity window, request set or effective authorization exists. |
| `WP122-FACT-008` | `/root` is only the proposed signing custodian and later primary operator; neither role is active. |
| `WP122-FACT-009` | Temporal separation requires private-key destruction and residual verification before operator handoff. |
| `WP122-FACT-010` | A later validator must be fresh, zero-authority and instantiated only after sealing. |
| `WP122-FACT-011` | The private draft is mode `0600`, all-false, non-promotable and has SHA-256 `a90104788c9442b442d03cf2f15de7413518d871f1e2af2de5c8070ba13ce6ea`. |
| `WP122-FACT-012` | Existing real-key, execution and production gates remain closed. |
| `WP122-FACT-013` | No key, network, dependency, runtime or other closed action occurred in WP-122. |
| `WP122-FACT-014` | WP-122 readiness documentation is not execution authorization. |

## Proposed separated sequence

| ID | Required stage |
| --- | --- |
| `WP122-STAGE-001` | Accept and publish WP-122 readiness only. |
| `WP122-STAGE-002` | Later bind one run ID, new ignored private root, exact revision/tree/tool hashes and maximum window. |
| `WP122-STAGE-003` | Under separate authority, create one ephemeral Ed25519 private key locally and expose only its public identity. |
| `WP122-STAGE-004` | Materialize and hash-bind one `RUN_BOUND_OWNER_PUBLIC_KEY` descriptor. |
| `WP122-STAGE-005` | Materialize one canonical all-fields authorization and sign it once. |
| `WP122-STAGE-006` | Verify signature and exact bootstrap/launcher/control bindings before effectiveness. |
| `WP122-STAGE-007` | Destroy the private key and verify no residual before operator handoff. |
| `WP122-STAGE-008` | Seal the pre-network packet and consume signing-custodian authority. |
| `WP122-STAGE-009` | Seek a separate owner authorization for controlled acquisition. |
| `WP122-STAGE-010` | Use one fresh zero-authority validator only after final packet sealing. |

## Proposed bindings

| ID | Required later binding |
| --- | --- |
| `WP122-BIND-001` | Exact published revision `66f0f857b987e49f392919802bc829113a783713`. |
| `WP122-BIND-002` | Exact repository tree `37353f5a1c4ea59f2309ee1e17aaae3f4be6b309`. |
| `WP122-BIND-003` | Exact proof tree `0f3e9dc514c0d6456745bb5ab1df003d5d2e0494`. |
| `WP122-BIND-004` | Accepted 42-file proof inventory and hashes. |
| `WP122-BIND-005` | Fresh run ID and new ignored private root; no earlier private root reuse. |
| `WP122-BIND-006` | `/root` as custodian only during the key stage and operator only after signed handoff. |
| `WP122-BIND-007` | One fresh zero-authority final validator created only after sealing. |
| `WP122-BIND-008` | Exact Python, curl and Node paths, versions and hashes at later preflight. |
| `WP122-BIND-009` | Exact bootstrap, launcher, contract and schema hashes. |
| `WP122-BIND-010` | Fresh non-synthetic key ID, public key and trust-root hash. |
| `WP122-BIND-011` | Fresh canonical authorization hash and detached-signature hash. |
| `WP122-BIND-012` | Owner-text hash, creation/start/expiry and maximum duration. |
| `WP122-BIND-013` | Exact source policy, request hashes, limits and destinations. |
| `WP122-BIND-014` | Exclusive lock, append-only ledger, output descriptors and budgets. |
| `WP122-BIND-015` | No proxy, credential, mutable alias or destination outside policy. |
| `WP122-BIND-016` | Key path/mode/owner/link checks and destruction receipt. |
| `WP122-BIND-017` | Mandatory cleanup and residual verification under every outcome. |
| `WP122-BIND-018` | Separate owner authorization for materialization and later network execution. |
| `WP122-BIND-019` | No dependency, build, device, downloaded-code execution or global cache/SDK mutation. |
| `WP122-BIND-020` | No application, architecture, infrastructure, deployment, provider/cost or customer/live-data action. |

## Stop conditions

| ID | Mandatory stop |
| --- | --- |
| `WP122-STOP-001` | Any revision, tree, inventory, tool, path, ownership, mode or ACL drift. |
| `WP122-STOP-002` | Key generation before explicit authority or any synthetic, reused or exposed private key. |
| `WP122-STOP-003` | Missing signature, noncanonical authorization, trust-root mismatch or expired window. |
| `WP122-STOP-004` | Failure to destroy the private key or verify residual absence before handoff. |
| `WP122-STOP-005` | Network attempt before separate execution authority or outside the exact launcher. |
| `WP122-STOP-006` | Validator repair, authority, key access, network access or non-independence. |

## Options and recommendation

| ID | Option | Disposition |
| --- | --- | --- |
| `WP122-OPT-001` | Separately authorize real-key and run-control materialization, then stop before network. | Advance |
| `WP122-OPT-002` | Generate the key and perform acquisition in one package. | Reject |
| `WP122-OPT-003` | Reuse synthetic or earlier key/authorization material. | Reject |
| `WP122-OPT-004` | Use owner prose and published controls as network authority. | Reject |
| `WP122-OPT-005` | Accept an owner-supplied bundle only with evidence-equivalent controls. | Retain fallback |

### Accepted decision `DEC-249`

Classify WP-122 as `READY_FOR_SEPARATELY_AUTHORIZED_REAL_KEY_AND_RUN_CONTROL_MATERIALIZATION_ONLY`;
accept the facts, sequence, bindings and stops; advance option 001, retain option 005 only as an
evidence-equivalent fallback, and reject options 002 through 004. This grants no key, signing,
effective authorization, validator, network, acquisition or downstream authority.

## Proposed owner decisions

| ID | Recommendation | State |
| --- | --- | --- |
| `WP122-DEC-001` | Accept `DEC-249` and its readiness classification. | Accepted |
| `WP122-DEC-002` | Accept `WP122-FACT-001` through `014`. | Accepted |
| `WP122-DEC-003` | Accept `WP122-STAGE-001` through `010`. | Accepted |
| `WP122-DEC-004` | Accept `WP122-BIND-001` through `020`. | Accepted |
| `WP122-DEC-005` | Accept `WP122-STOP-001` through `006`. | Accepted |
| `WP122-DEC-006` | Advance option 001, retain option 005 and reject options 002 through 004. | Accepted |
| `WP122-DEC-007` | Accept `/root` only as proposed temporally separated custodian/operator. | Accepted |
| `WP122-DEC-008` | Accept the private draft as permanently ineffective and non-promotable. | Accepted |
| `WP122-DEC-009` | Keep every execution, product and publication gate closed. | Accepted |
| `WP122-DEC-010` | Freeze the exact four-path WP-122 public candidate inventory. | Accepted |

## Private draft and next gate

`internal-local/work-packages/WP-122/ineffective-authorization.json` is ignored, mode `0600`,
all-false and non-promotable. It has no run, key, validator, window, stages, requests or signature.

The exact public candidate inventory is documents 00, 02, 115 and 116. WP-122 stops for owner
review. No commit or push is authorized.

## Owner acceptance

The owner accepted `DEC-249`, every WP-122 fact, stage, binding, stop and decision exactly as
recorded; advanced option 001; retained option 005 only as an evidence-equivalent fallback;
rejected options 002 through 004; accepted `/root` only as the proposed temporally separated
custodian/operator; and accepted the ineffective private draft and root validation PASS. The owner
authorized publication of only the exact four-path public inventory. All execution gates remain
closed.

## Verified publication and WP-123 activation

The exact accepted four-path WP-122 public inventory was committed as
`95626fb WP-122: accept signing execution readiness` and published at
`95626fbec8b4a68629d51acd11e733ffc3ec5d50`, repository tree
`584a46d9c0e2bcbbb73b99383f5f0408b0860c17`, with unchanged proof tree
`0f3e9dc514c0d6456745bb5ab1df003d5d2e0494`. Live `origin/main` and local `HEAD` matched. WP-122
is closed and its publication authority is consumed.

WP-123 is active for owner-decision documentation and one private ineffective materialization
draft only. Real key creation, signing, effective authorization, validator instantiation, network
and every downstream gate remain closed.
