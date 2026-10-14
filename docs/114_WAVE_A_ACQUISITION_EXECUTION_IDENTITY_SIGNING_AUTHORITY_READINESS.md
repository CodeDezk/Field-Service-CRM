# Wave A Acquisition Execution Identity, Signing Authority and Private Authorization Readiness

## Document control

| Field | Value |
| --- | --- |
| Status | Accepted — exact publication authorized |
| Work package | `WP-120 Wave A Acquisition Execution Identity, Signing Authority and Private Authorization Readiness` |
| Owner | Aung Myo Oo |
| Governing decision | `DEC-246` — Accepted |
| Accepted WP-119 revision | `b7e53835ce32da16d9f2ac6ebe037445690a4cc8` |
| Accepted repository tree | `e2db50e5635c7aa09a64b9ff979e601e6cd03564` |
| Accepted proof subtree | `17a7fd91a1966236d8214f6a1a7f7fd87e1a18ac` |
| Recommendation | `DEC-247` — Accepted |
| Real signing-key creation | Closed |
| Network/download/artifact acquisition | Closed |
| Dependencies/build/device/runtime/proof execution | Closed |
| Application/architecture/infrastructure/deployment | Closed |
| Provider account/cost/customer or live data | Closed |
| Date | 2026-10-14 |

## Objective and authority boundary

WP-120 evaluates the exact published WP-119/WP-118 control for run-specific execution identity,
real Ed25519 signing authority and private authorization readiness. It may propose roles, custody,
paths, state transitions and a successor package. It creates one private all-false authorization
draft solely to make absent fields and closed actions machine-readable.

WP-120 does not generate a key, assign execution authority, instantiate a validator, create a run,
seal an executable, perform preflight, contact a network, retrieve metadata, download an artifact,
restore a dependency, build, use a device, execute a runtime/proof, implement the application,
select architecture, create infrastructure, deploy, incur cost or use customer/live data.

## Accepted facts and static findings

| ID | Fact or finding |
| --- | --- |
| `WP120-FACT-001` | WP-119 is published at the exact accepted revision and trees above; live GitHub `main`, local `HEAD` and cached `origin/main` matched at activation. |
| `WP120-FACT-002` | The published proof subtree remains the 28-file independently validated WP-118 static control; WP-120 changes no proof file. |
| `WP120-FACT-003` | `trusted-bootstrap-loader.py` pins key ID `wp118-synthetic-rfc8032-test-vector-1` and its public RFC 8032 test-vector key. |
| `WP120-FACT-004` | The same bootstrap rejects every authorization state except `EFFECTIVE_STATIC_ONLY`; it cannot admit the schema's prospective `EFFECTIVE_NETWORK` state. |
| `WP120-FACT-005` | `network-contract.mjs` pins WP-118 revision `f413055b93667a9ae6faed007dd6c48572a81a7b`, its repository tree, run ID, private root, synthetic key ID and exact static-era tool bindings. |
| `WP120-FACT-006` | `network-authorization.schema.json` also fixes `ownerSigningKeyId` to the synthetic WP-118 identifier even though it lists `EFFECTIVE_NETWORK` as a possible state. |
| `WP120-FACT-007` | The bootstrap, network contract and schema hashes are respectively `681ed939fed046f09305655248b9703e168945983d884fda048c78c3a19005c2`, `6d3bb40e983d7354057b07a56da57a53ae73d664ab3f10122555715413e3e8f6` and `65d3d9a392bfad101f6fafed1e1515f7bf47d0dd88fc8157addc22756b8fb851`. |
| `WP120-FACT-008` | The published controls therefore fail closed for a real-key network authorization; this is correct current behavior, not authorization to patch at runtime. |
| `WP120-FACT-009` | No real signing key, accepted key ID, public trust root, signing custodian, backup/recovery policy or destruction receipt exists. |
| `WP120-FACT-010` | `/root` is proposed for the later temporally separated signing-custodian and primary-operator stages; `/root/wp121_trust_root_validator` is reserved as the proposed fresh independent static validator. Neither identity receives authority or is instantiated by WP-120. |
| `WP120-FACT-011` | The private WP-120 draft records only proposed role labels; its run/key/window/path/signature fields are null, stage/command/request arrays are empty, all action flags are false and its blocker list is explicit. Its SHA-256 is `d8c54e0353b7173310cda975848a8190c13862cf6a90f40c77bfda7bdd2252a1`. |
| `WP120-FACT-012` | The private draft is ignored, mode `0600`, non-promotable and cannot be edited into an effective authorization; its containing WP-120 directory is mode `0700` and later materials must be created fresh. |
| `WP120-FACT-013` | The existing public synthetic key fixture and all WP-118 private evidence remain prohibited as real signing inputs. |
| `WP120-FACT-014` | No network, key generation, dependency, runtime, application, architecture, infrastructure, deployment, provider/cost or customer/live-data action occurred in WP-120. |

## Readiness blocker

WP-120 is classified `NOT_READY_REAL_TRUST_ROOT_AND_NETWORK_BINDINGS_STATIC_ONLY`. Four independent
fail-closed conditions prevent controlled acquisition:

1. the trusted bootstrap pins the synthetic public key and key ID;
2. the trusted bootstrap admits only `EFFECTIVE_STATIC_ONLY`;
3. the network contract pins the consumed WP-118 revision, tree, run and private root; and
4. the authorization schema fixes the synthetic key identifier.

A private authorization cannot override these published controls. Changing only the draft, key or
invocation would either fail closed or bypass the accepted trust boundary. The next gate must be
proof-only static remediation and independent validation before any network authorization.

## Proposed role and custody model

| ID | Proposed control |
| --- | --- |
| `WP120-ROLE-001` | Aung Myo Oo remains the owner and sole authority to accept the exact remediation, later key-materialization scope and later network execution statement. |
| `WP120-ROLE-002` | `/root` is proposed as the later primary operator, but has zero current acquisition, key-generation or signing authority. |
| `WP120-ROLE-003` | `/root` is also proposed as the proof-only signing custodian in a strictly earlier, separately evidenced stage; the private key must be destroyed before `/root` can begin the network-operator stage. |
| `WP120-ROLE-004` | `/root/wp121_trust_root_validator` is reserved as the one fresh zero-authority independent static validator and may be instantiated only after later owner authorization. |
| `WP120-ROLE-005` | The validator may read, hash and report sealed evidence but may not generate/sign with a key, retrieve or repair artifacts, operate the run, accept dependencies or authorize a successor. |
| `WP120-ROLE-006` | Qualified human security review remains required before production or real/customer-data use and is not replaced by proof validators. |

| ID | Proposed key-custody control |
| --- | --- |
| `WP120-KEY-001` | Use a newly generated Ed25519 key unique to the later single acquisition run; never reuse the public synthetic test key. |
| `WP120-KEY-002` | Generate the private key only after explicit owner authorization, inside a new ignored mode-restricted private root, without network or a third-party key service. |
| `WP120-KEY-003` | Publish or hash-bind only the public key and key ID; never commit, log, print or place the private key in evidence or application paths. |
| `WP120-KEY-004` | Bind the real public key and key ID into an exact reviewed bootstrap/schema/contract revision before any effective authorization can exist. |
| `WP120-KEY-005` | Use the private key only to sign one exact canonical authorization whose hash is separately recorded and owner-text-bound. |
| `WP120-KEY-006` | Destroy the private key after the authorization and detached signature are durably sealed and before the primary network operator begins. |
| `WP120-KEY-007` | Do not back up or recover the ephemeral proof key; a failed/lost key consumes the attempt and requires a fresh later authorization. |
| `WP120-KEY-008` | Preserve a destruction receipt containing only key ID, public-key hash, signed-authorization hash, signature-record hash, timestamps and residual result. |
| `WP120-KEY-009` | Treat any key exposure, unexpected link, wrong mode/owner, path replacement, missing destruction receipt or signature mismatch as a typed stop with no retry. |
| `WP120-KEY-010` | Production signing, HSM/keychain custody, rotation, recovery and privileged trust-anchor installation remain out of scope. |

## Proposed static-remediation contract

| ID | Required later remediation |
| --- | --- |
| `WP120-BIND-001` | Start from published revision `b7e53835ce32da16d9f2ac6ebe037445690a4cc8`; create no network or runtime state. |
| `WP120-BIND-002` | Restrict changes to the disposable acquisition-control proof, governing documentation and ignored private static evidence. |
| `WP120-BIND-003` | Replace the synthetic key constants with an exact later-generated public key/key ID through a reviewable run-bound trust-root materialization interface. |
| `WP120-BIND-004` | Preserve the synthetic key only in clearly isolated negative/static fixtures; it must never satisfy the real-key execution path. |
| `WP120-BIND-005` | Make the trusted bootstrap accept `EFFECTIVE_NETWORK` only under the exact real-key, revision, tree, role, path, expiry and single-use bindings. |
| `WP120-BIND-006` | Rebind the network contract to the exact successor revision/tree and remove consumed WP-118 run/private-root constants from the later network path. |
| `WP120-BIND-007` | Update the authorization schema so a run-bound accepted real key ID is required without permitting arbitrary caller-selected keys. |
| `WP120-BIND-008` | Keep every network action false in the remediation authorization and in all static fixtures used by the remediation package. |
| `WP120-BIND-009` | Add dependency-free positive tests for the exact future real-public-key binding using synthetic surrogate fixtures only. |
| `WP120-BIND-010` | Add negative tests for synthetic-key reuse, wrong key ID/public key, static/network state confusion, revision/tree drift and private-root reuse. |
| `WP120-BIND-011` | Preserve all WP-118 canonical-signature, descriptor, ledger, output, global-lock, budget and path-safety tests. |
| `WP120-BIND-012` | Renew the complete public-control inventory, every affected file hash and the exact bootstrap invocation contract. |
| `WP120-BIND-013` | Consume the remediation authority before exactly one fresh zero-authority independent static validator receives the sealed packet. |
| `WP120-BIND-014` | Stop on any primary or independent finding; do not create a real key, draft an effective authorization or proceed to network. |
| `WP120-BIND-015` | Require later owner acceptance and verified publication of the remediation before execution-identity or acquisition authority can advance. |

## Ineffective private draft

`internal-local/work-packages/WP-120/ineffective-authorization.json` records the proposed operator,
accepted publication, missing roles/key/window/path, exact blockers, empty allowlists and all-false
actions. It contains no secret and grants no authority. It is intentionally incompatible with an
effective acquisition and must never be promoted, signed or reused.

## Options and recommendation

| ID | Option | Recommendation | Reason |
| --- | --- | --- | --- |
| `WP120-OPT-001` | Perform one separately authorized proof-only static remediation of the real trust-root and network bindings, followed by one fresh independent static validation. | Advance | It closes the exact fail-closed blockers without creating a real key or contacting a network. |
| `WP120-OPT-002` | Generate a real key and attempt to use the current published bootstrap. | Reject | The current bootstrap and schema intentionally reject that key and network state. |
| `WP120-OPT-003` | Reuse the public synthetic key/seed or change only the private authorization. | Reject | This would destroy the trust claim or bypass the published control boundary. |
| `WP120-OPT-004` | Patch the proof controls and perform acquisition in one package. | Reject | Static remediation, independent validation, publication, run authorization and network execution remain separate gates. |
| `WP120-OPT-005` | Retain an evidence-equivalent owner-supplied sealed bundle. | Retain fallback | It avoids this network path only if it satisfies every accepted provenance, integrity, closure, custody and validation control. |

### Accepted decision `DEC-247`

Classify WP-120 as `NOT_READY_REAL_TRUST_ROOT_AND_NETWORK_BINDINGS_STATIC_ONLY`; accept the
proposed identity and ephemeral proof-key custody model; accept the private draft as permanently
ineffective; advance one bounded proof-only static remediation to replace synthetic/static-only
execution bindings with a reviewable run-bound real-public-key interface; require renewed hashes
and exactly one fresh independent static validation; and keep real key creation, network,
acquisition and every downstream gate closed.

## Owner decisions

| ID | Recommendation | State |
| --- | --- | --- |
| `WP120-DEC-001` | Accept `WP120-FACT-001` through `014` as the truthful readiness state. | Accepted |
| `WP120-DEC-002` | Accept `DEC-247` and `NOT_READY_REAL_TRUST_ROOT_AND_NETWORK_BINDINGS_STATIC_ONLY`. | Accepted |
| `WP120-DEC-003` | Accept `WP120-ROLE-001` through `006` as the proposed separation-of-authority model without assigning execution authority. | Accepted |
| `WP120-DEC-004` | Accept `WP120-KEY-001` through `010` as the later ephemeral proof-key custody contract. | Accepted |
| `WP120-DEC-005` | Accept `WP120-BIND-001` through `015` as the exact successor static-remediation boundary. | Accepted |
| `WP120-DEC-006` | Accept the private ineffective draft and prohibit its promotion, signing or reuse. | Accepted |
| `WP120-DEC-007` | Advance `WP120-OPT-001`, retain option 005 only as evidence-equivalent fallback, and reject options 002 through 004. | Accepted |
| `WP120-DEC-008` | Keep real key creation, validator instantiation, preflight, network and acquisition closed during WP-120. | Accepted |
| `WP120-DEC-009` | Require separate owner acceptance before commit/push and before activating the successor remediation. | Accepted |
| `WP120-DEC-010` | Freeze the exact four-path WP-120 public candidate inventory. | Accepted |

## Frozen candidate inventory and next gate

The WP-120 public candidate inventory is exactly:

1. `docs/00_PROJECT_START_HERE.md`
2. `docs/02_ASSUMPTIONS_AND_DECISIONS.md`
3. `docs/113_WAVE_A_OFFLINE_ARTIFACT_ACQUISITION_REAUTHORIZATION_READINESS.md`
4. `docs/114_WAVE_A_ACQUISITION_EXECUTION_IDENTITY_SIGNING_AUTHORITY_READINESS.md`

The owner accepted `DEC-247`, every WP-120 fact, role, key-custody and remediation binding, all ten
WP-120 decisions, the recorded option dispositions, `/root` only as proposed signing custodian and
primary operator, `/root/wp121_trust_root_validator` only as the reserved proposed validator, the
exact ineffective-draft hash and root validation PASS. The owner authorized commit and push of
only the exact four-path public inventory and activation of WP-121 after verified publication.

WP-121 remains proof-only static remediation. Real signing-key creation, validator instantiation,
network, acquisition and every downstream gate remain closed.

## Verified publication and WP-121 activation

The accepted four-path WP-120 inventory was committed as
`1f4c6f0 WP-120: accept signing authority readiness` and published at exact revision
`1f4c6f0dbdf5141493a4086887518aca2ab47621`. WP-120 is closed and its publication authority is
consumed.

WP-121 is active only for accepted proof-control static remediation. Its primary result is
`PRIMARY_STATIC_REMEDIATION_PASS_PENDING_INDEPENDENT_VALIDATION`: 59/59 dependency-free tests and
both public verifiers pass, while every network entry remains closed before process creation. No
real key or validator was created. Owner review and separate validator authorization are required;
WP-121 commit and push remain closed.
