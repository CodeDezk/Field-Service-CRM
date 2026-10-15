# Wave A Real Signing and Run-Control Materialization Authorization Readiness

## Document control

| Field | Value |
| --- | --- |
| Status | Accepted — exact publication authorized |
| Work package | `WP-123 Real Signing and Run-Control Materialization Authorization Readiness` |
| Owner | Aung Myo Oo |
| Governing decision | `DEC-249` — Accepted |
| Accepted WP-122 revision | `95626fbec8b4a68629d51acd11e733ffc3ec5d50` |
| Accepted repository tree | `584a46d9c0e2bcbbb73b99383f5f0408b0860c17` |
| Accepted proof tree | `0f3e9dc514c0d6456745bb5ab1df003d5d2e0494` |
| Recommendation | `DEC-250` — Accepted |
| Key/signing/effective authorization/validator | Closed |
| Network/acquisition/dependencies/runtime | Closed |
| Product/architecture/infrastructure/deployment | Closed |
| Provider/cost/customer or live data | Closed |
| Date | 2026-10-15 |

## Objective and boundary

WP-123 freezes the proposed contract for one later controlled materialization of an ephemeral real
Ed25519 signing key, public trust root, canonical signed authorization, destruction receipt and
sealed pre-network packet. It creates only documentation and one private all-false draft.

WP-123 does not create the run root, key, trust descriptor, signature, authorization, validator,
network request, artifact, dependency, runtime or downstream product state. The proposed draft is
non-promotable and cannot become an execution record.

## Facts and readiness findings

| ID | Fact or finding |
| --- | --- |
| `WP123-FACT-001` | WP-122 is published at the exact revision and trees above; live `origin/main` and local `HEAD` matched. |
| `WP123-FACT-002` | The accepted proof tree has the WP-121 independently validated run-bound trust-root interface. |
| `WP123-FACT-003` | The published launcher still stops before network; materialization cannot execute acquisition. |
| `WP123-FACT-004` | Proposed materialization run ID is `wp124-2026-10-15-01`. |
| `WP123-FACT-005` | Proposed private root is `internal-local/work-packages/WP-124/wp124-2026-10-15-01/`; it does not exist. |
| `WP123-FACT-006` | `/root` is proposed as signing custodian and later primary operator with mandatory temporal separation. |
| `WP123-FACT-007` | `/root/wp124_signing_packet_validator` is only a reserved proposed fresh zero-authority validator and is not instantiated. |
| `WP123-FACT-008` | Exact proposed local key tool is Node `/Users/aungmyooo/.nvm/versions/node/v22.23.1/bin/node`, version `22.23.1`, SHA-256 `2e3f1286a7eb3736346ed1803e458a0ff909e2b2d5bc746144dcb76970e9b99d`. |
| `WP123-FACT-009` | The exact Node runtime exposes built-in Ed25519 generation through its bundled OpenSSL `3.5.7`; no dependency installation is required. |
| `WP123-FACT-010` | Only raw public-key identity may survive; private-key bytes must never enter public files, logs, stdout, evidence or validator custody. |
| `WP123-FACT-011` | The private key must be destroyed and absence verified before operator handoff. |
| `WP123-FACT-012` | The later signed authorization remains pre-network and ineffective until another owner gate. |
| `WP123-FACT-013` | The private draft SHA-256 is `4e6b4db7899c021133678f0a531dbcf2d4b48051440e0b3ab799587bc0bf46df`. |
| `WP123-FACT-014` | The private draft is ignored, mode `0600`, all-false and non-promotable. |
| `WP123-FACT-015` | No key, signing, validator, network, dependency or runtime action occurred in WP-123. |
| `WP123-FACT-016` | Separate owner acceptance remains required before materialization and again before network execution. |

## Proposed WP-124 materialization contract

| ID | Exact later control |
| --- | --- |
| `WP123-MAT-001` | Use run ID `wp124-2026-10-15-01` once; no resume or reuse. |
| `WP123-MAT-002` | Start from exact revision/tree/proof-tree in document control and stop on drift. |
| `WP123-MAT-003` | Create only the proposed ignored private root with mode `0700`; files default to `0600`. |
| `WP123-MAT-004` | Bind exact Node path/version/hash before process creation; prohibit package managers and network. |
| `WP123-MAT-005` | Generate one Ed25519 pair using built-in `node:crypto`; never use synthetic or prior keys. |
| `WP123-MAT-006` | Keep private material in one exclusive no-follow mode-`0600` file visible only to the custodian stage. |
| `WP123-MAT-007` | Derive a lowercase raw 32-byte public-key hex and a unique non-synthetic key ID. |
| `WP123-MAT-008` | Materialize one canonical `RUN_BOUND_OWNER_PUBLIC_KEY` descriptor and record its SHA-256. |
| `WP123-MAT-009` | Materialize one canonical authorization bound to accepted revision/tree, run, paths, roles, tools, requests, limits and owner-text hash. |
| `WP123-MAT-010` | Keep the authorization state pre-network and all action flags false during materialization. |
| `WP123-MAT-011` | Sign exactly those canonical authorization bytes once and record detached signature and hashes. |
| `WP123-MAT-012` | Verify the signature through the published trusted bootstrap without reaching launcher network entry. |
| `WP123-MAT-013` | Destroy the private key immediately after sealing; do not back it up or expose it to the validator. |
| `WP123-MAT-014` | Record a destruction receipt containing only public identifiers, hashes, timestamps and residual result. |
| `WP123-MAT-015` | Seal the complete pre-network packet and consume custodian authority before validator handoff. |
| `WP123-MAT-016` | Instantiate exactly one fresh zero-authority validator only after sealing and private-key destruction. |
| `WP123-MAT-017` | Validator may read/hash/verify/report only and must not repair, sign, generate keys or access network. |
| `WP123-MAT-018` | Mandatory cleanup removes key remnants and incomplete material under every outcome while retaining bounded evidence. |

## Proposed evidence and stop controls

| ID | Required evidence |
| --- | --- |
| `WP123-EVID-001` | Exact revision/tree/proof inventory and tool-binding receipt. |
| `WP123-EVID-002` | Private-root path, ownership, mode, ACL and no-link receipt before and after materialization. |
| `WP123-EVID-003` | Public key ID, public-key SHA-256 and trust-root descriptor SHA-256 only. |
| `WP123-EVID-004` | Canonical authorization SHA-256, signature SHA-256 and bootstrap verification result. |
| `WP123-EVID-005` | Key creation, signing, destruction and residual-verification timestamps. |
| `WP123-EVID-006` | Proof that private bytes were never printed, logged, copied, committed or passed to the validator. |
| `WP123-EVID-007` | Sealed packet inventory, aggregate hash and consumed-authority record. |
| `WP123-EVID-008` | Independent validator attestation and exact reproduced results. |
| `WP123-EVID-009` | Cleanup and final residual inventory under every outcome. |
| `WP123-EVID-010` | Explicit record that network and every downstream action remained false. |

| ID | Mandatory stop |
| --- | --- |
| `WP123-STOP-001` | Revision, tree, proof inventory, Node or path drift. |
| `WP123-STOP-002` | Existing run root, key collision, unsafe mode/owner/ACL/link or residual key material. |
| `WP123-STOP-003` | Synthetic/reused key, malformed public key, nonunique key ID or descriptor mismatch. |
| `WP123-STOP-004` | Noncanonical authorization, signature failure or incomplete binding. |
| `WP123-STOP-005` | Any private-key output, evidence inclusion, backup, validator access or failed destruction. |
| `WP123-STOP-006` | Any network-capable child, network attempt, download, dependency or runtime action. |
| `WP123-STOP-007` | Validator mutation, repair, signing authority or lack of independence. |
| `WP123-STOP-008` | Any attempt to treat the sealed packet as effective network authority. |

## Options and recommendation

| ID | Option | Disposition |
| --- | --- | --- |
| `WP123-OPT-001` | Authorize one controlled WP-124 materialization using the exact contract, then stop for result acceptance. | Advance |
| `WP123-OPT-002` | Materialize an effective network authorization in the same package. | Reject |
| `WP123-OPT-003` | Reuse synthetic or previous key/authorization material. | Reject |
| `WP123-OPT-004` | Generate/store a long-lived or backed-up proof key. | Reject |
| `WP123-OPT-005` | Retain an evidence-equivalent owner-supplied sealed bundle. | Retain fallback |

### Accepted decision `DEC-250`

Classify WP-123 as `READY_FOR_SEPARATELY_AUTHORIZED_WP124_MATERIALIZATION`; accept the proposed run,
roles, exact Node binding, eighteen materialization controls, ten evidence controls and eight stop
conditions; advance option 001, retain option 005 only as an evidence-equivalent fallback, and
reject options 002 through 004. No materialization or execution authority follows from DEC-250.

## Proposed owner decisions

| ID | Recommendation | State |
| --- | --- | --- |
| `WP123-DEC-001` | Accept `DEC-250` and its readiness classification. | Accepted |
| `WP123-DEC-002` | Accept `WP123-FACT-001` through `016`. | Accepted |
| `WP123-DEC-003` | Accept proposed run ID, root and exact Node binding. | Accepted |
| `WP123-DEC-004` | Accept `WP123-MAT-001` through `018`. | Accepted |
| `WP123-DEC-005` | Accept `WP123-EVID-001` through `010` and `WP123-STOP-001` through `008`. | Accepted |
| `WP123-DEC-006` | Accept proposed roles without instantiating or authorizing them. | Accepted |
| `WP123-DEC-007` | Advance option 001, retain option 005 and reject options 002 through 004. | Accepted |
| `WP123-DEC-008` | Accept the private draft as ineffective and non-promotable. | Accepted |
| `WP123-DEC-009` | Keep every materialization, execution, product and publication gate closed. | Accepted |
| `WP123-DEC-010` | Freeze the exact four-path WP-123 public candidate inventory. | Accepted |

## Candidate inventory and next gate

The exact WP-123 public candidate inventory is documents 00, 02, 116 and 117. WP-123 stops for
owner review. No commit or push is authorized. A later owner statement must separately accept and
publish WP-123 before it may authorize WP-124 materialization.

## Owner acceptance

The owner accepted `DEC-250`, every WP-123 fact, materialization, evidence, stop and decision;
accepted the exact run, root, Node and proposed role bindings; advanced option 001; retained option
005 only as an evidence-equivalent fallback; rejected options 002 through 004; and authorized
publication of only the exact four-path public inventory. After verified publication, WP-124 may
perform only the separately bounded pre-network materialization. Network and all downstream gates
remain closed.
