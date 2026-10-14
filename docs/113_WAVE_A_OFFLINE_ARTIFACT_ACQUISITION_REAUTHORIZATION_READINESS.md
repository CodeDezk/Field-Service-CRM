# Wave A Offline Artifact Acquisition Reauthorization Readiness

## Document control

| Field | Value |
| --- | --- |
| Status | Accepted — exact publication authorized |
| Work package | `WP-119 Wave A Offline Artifact Acquisition Reauthorization Readiness` |
| Owner | Aung Myo Oo |
| Governing decisions | `DEC-239` through `DEC-245` — Accepted |
| Accepted WP-118 result | `STATIC_CONTROL_REMEDIATED_VALIDATED` |
| Published WP-118 revision | `b438dfc5101f49cd40925241b936539f9cf9a47f` |
| Published repository tree | `9755269bf664526d0f863be6e343ed5692f2a0ce` |
| Published proof subtree | `17a7fd91a1966236d8214f6a1a7f7fd87e1a18ac` |
| Recommendation | `DEC-246` — Accepted |
| Real signing-key creation | Closed |
| Network/download/artifact acquisition | Closed |
| Dependency/build/device/runtime/proof execution | Closed |
| Application/architecture/infrastructure/deployment | Closed |
| Provider account/cost/customer or live data | Closed |
| Date | 2026-10-14 |

## Objective and authority boundary

WP-119 determines whether the owner-accepted and published WP-118 static control is ready to enter
a later run-specific identity, signing-authority and acquisition-authorization planning gate. It
binds the exact published revision, proof tree, static evidence, trust boundary, source policy,
resource ceilings, remaining prerequisites and successor sequence for owner decision.

WP-119 is documentation only. It does not create a signing key, private authorization, run ID,
credential, quarantine, sealed executable, network process or acquisition packet. It does not
contact DNS or a network, retrieve metadata, follow a redirect, download an artifact, mutate an
SDK/cache, restore a dependency, build, use a device, execute a runtime or proof, implement
application code, select architecture, create infrastructure, deploy, incur provider cost or use
customer/live data.

## Accepted facts and evidence disposition

| ID | Fact or disposition |
| --- | --- |
| `WP119-FACT-001` | WP-118 was committed as `b438dfc WP-118: validate owner-signed acquisition controls`; local `HEAD` and cached `origin/main` match the exact published revision above. |
| `WP119-FACT-002` | The WP-118 commit contains exactly the accepted 18-path public/proof inventory and no `internal-local/` content. |
| `WP119-FACT-003` | The complete published offline-acquisition proof subtree contains 28 files and is bound by the proof-subtree object above. |
| `WP119-FACT-004` | WP-118 passed 55/55 dependency-free static tests, the acquisition-extension verifier and the network-control verifier; each verifier reported 28 public files. |
| `WP119-FACT-005` | The accepted 40-entry public-control inventory hash is `e7ead55aaf5eea03a6843622405ffa14fe827cdbda1e057cfdafe6e044be3904`. |
| `WP119-FACT-006` | The accepted nine-entry primary inventory hash is `bd40af46870809412f8a7facdd1859db3fa1562b7b0629b8ba6111c783ecbee0`; the accepted 16-entry final private inventory hash is `58b6be52e20772397e9e2bf9d0406f5924fc02058d0e3b3d2b7dc1c9c32d156e`. |
| `WP119-FACT-007` | The sole zero-authority independent validator re-ran the complete accepted static packet and returned PASS after resolution of `WP117-VAL-001` through `004` and `WP118-VAL-001` through `003`. |
| `WP119-FACT-008` | WP-118 consumed its single-use static authority. Its private authorization and evidence are immutable historical records and cannot be promoted into network authority. |
| `WP119-FACT-009` | The committed Ed25519 key fixture is an RFC 8032 synthetic test vector classified as non-production authority. No real owner signing key exists or is authorized by WP-118 or WP-119. |
| `WP119-FACT-010` | The accepted trust boundary begins with exact inline bootstrap bytes selected by a separately accepted invocation, pins the owner verification key and key ID, and verifies the signed authorization bytes, bootstrap source path/hash and launcher path/hash before accepting any later network stage. |
| `WP119-FACT-011` | The published control rejects forged or noncanonical signatures, bootstrap drift, output replacement/link loss, ledger replacement/reserved-field injection and concurrent accepted sessions within the recorded macOS trust boundary. |
| `WP119-FACT-012` | The control does not protect an environment in which an attacker can replace both the accepted public control tree and the invocation that selects it. Production trust-anchor installation remains a later security and operations decision. |
| `WP119-FACT-013` | The accepted source policy remains the five-entry HTTPS envelope in `WP112-SOURCE-001` through `005`; no endpoint, response, redirect destination, artifact identity or dependency closure has been verified through network evidence. |
| `WP119-FACT-014` | No network, download, acquired artifact, dependency, build, device action, runtime proof, application coding, architecture selection, infrastructure, deployment, provider/cost change or customer/live-data use occurred in WP-118 or WP-119. |
| `WP119-FACT-015` | No execution run ID, effective private authorization, operator assignment, fresh acquisition validator, real signing-key custodian, live request set, private run root or authorization window exists for a later acquisition. |
| `WP119-FACT-016` | Qualified human security review remains mandatory before production deployment or real/customer-data use; WP-118 static validation does not satisfy that production gate. |

## Accepted immutable publication bindings

| ID | Binding |
| --- | --- |
| `WP119-BIND-001` | Accepted revision: `b438dfc5101f49cd40925241b936539f9cf9a47f`. |
| `WP119-BIND-002` | Accepted repository tree: `9755269bf664526d0f863be6e343ed5692f2a0ce`. |
| `WP119-BIND-003` | Accepted proof subtree: `17a7fd91a1966236d8214f6a1a7f7fd87e1a18ac`. |
| `WP119-BIND-004` | `AUTHORITY.md` SHA-256: `26b5d774f8d1761c17b5d096b87748900b8b2103f0e6da1e12bdadf7d75eef76`. |
| `WP119-BIND-005` | Trusted inline-bootstrap source SHA-256: `681ed939fed046f09305655248b9703e168945983d884fda048c78c3a19005c2`. |
| `WP119-BIND-006` | Trusted launcher SHA-256: `249409cf78e94ee03ffa0300af0e41435f3051475fefef605ec053c4bedc9ae7`. |
| `WP119-BIND-007` | Acquisition launcher SHA-256: `fe622968c6542e368cfe9a2a59faeb010b1a1d28dd982b4ac6a933f1fa7ee3b0`. |
| `WP119-BIND-008` | Network contract SHA-256: `6d3bb40e983d7354057b07a56da57a53ae73d664ab3f10122555715413e3e8f6`. |
| `WP119-BIND-009` | Accepted source-policy fixture SHA-256: `b2171aaf0a10ecbab9cde35d6eb59dafab629c9fea25bbcbeff1b5c33dc3052e`. |
| `WP119-BIND-010` | The exact 40-entry public-control inventory must be renewed against the later dedicated checkout before any authorization becomes effective. |
| `WP119-BIND-011` | The WP-118 synthetic private key and all WP-118 private records are prohibited as later signing authority or execution inputs. |
| `WP119-BIND-012` | Any later real owner signing key must be newly generated under separate authority, private, non-exported to Git, mode-restricted and assigned an explicit custodian, backup/recovery and destruction disposition. |
| `WP119-BIND-013` | The public verification key, key ID and exact signed-authorization schema must be accepted and hash-bound before a later effective authorization is signed. |
| `WP119-BIND-014` | A later package must assign a fresh run ID, primary operator, independent zero-authority acquisition validator and their separation-of-authority attestations. |
| `WP119-BIND-015` | A later package must create a new ignored private root; earlier WP-109 through WP-118 private roots remain immutable and non-resumable. |
| `WP119-BIND-016` | The exact inline bootstrap invocation, `/usr/bin/python3` identity, Node and curl executable identities, sealed executable paths, source policy and request schemas must be rebound on the execution host. |
| `WP119-BIND-017` | Every owner authorization must name the exact run, revision, tree, proof hash inventory, roles, key ID, valid-from/expiry window, stages, commands, paths, sources, ceilings, cleanup and stop conditions. |
| `WP119-BIND-018` | Metadata and artifact authority must remain separate stages; artifact requests may exist only as exact members of an independently verifiable sealed metadata commitment. |
| `WP119-BIND-019` | Network remains public unauthenticated HTTPS only, without account, cookie, credential, proxy, custom CA, insecure TLS or automatic redirect. |
| `WP119-BIND-020` | The later maximum run duration remains 45 minutes, with one request at a time, three pre-byte transport attempts, 4 GiB aggregate bytes, 2 GiB per response, 2,000 objects and three redirects unless the owner accepts stricter run-specific limits. |
| `WP119-BIND-021` | At least 20 GiB free space must be freshly proven before network and before artifact retrieval; the run stops if the floor is crossed. |
| `WP119-BIND-022` | The exact accepted five-entry source policy must be enforced; dynamically derived URLs require a recorded dependency or metadata origin and cannot broaden host, scheme, port or prefix. |
| `WP119-BIND-023` | The append-only hash-chained ledger, stable global acquisition lock, output-descriptor continuity and aggregate-budget accounting must cover every later network process from intent through result and fsync. |
| `WP119-BIND-024` | Effective authority must be single-use, expire fail closed, be consumed before validator handoff and never be repaired or resumed after a stop. |
| `WP119-BIND-025` | Cleanup must be callable without network or valid signing authority, target only run-owned paths, remove partial/unsealed bytes on a stop and finish with residual verification. |
| `WP119-BIND-026` | A successful sealed bundle remains proof-only quarantine evidence pending owner acceptance; it is not an accepted dependency and cannot enter a global SDK/cache, application or architecture by implication. |
| `WP119-BIND-027` | Exactly one fresh zero-authority validator must independently verify the final acquisition packet after authority consumption; the validator may not retrieve, repair, authorize or select. |
| `WP119-BIND-028` | Network, real-key creation, private authorization preparation and execution remain closed until separately and explicitly opened by a later owner statement. |

## Readiness classification

The exact published WP-118 control is classified
`READY_FOR_RUN_SPECIFIC_AUTHORIZATION_PLANNING_ONLY`. This means the static control design and
published implementation may be used as immutable input to a later owner-decision package. It
does not mean the host, invocation, real signing authority, roles, request set, metadata closure,
private paths or network operation are ready or authorized.

The next package should be `WP-120 Wave A Acquisition Execution Identity, Signing Authority and
Private Authorization Readiness`. It may propose exact identities, real-key custody, run ID,
private paths and a deliberately ineffective authorization draft. It must keep key generation,
network and acquisition closed unless the owner separately opens those actions.

## Options and recommendation

| ID | Option | Recommendation | Reason |
| --- | --- | --- | --- |
| `WP119-OPT-001` | Advance one owner-decision package for exact execution identities, real-signing-key custody design and private ineffective authorization preparation. | Advance | Preserves the verified trust boundary and separates planning from key creation and execution. |
| `WP119-OPT-002` | Authorize acquisition directly from the published WP-118 static result. | Reject | No real signing authority, run identity, roles, effective authorization, live requests or private run root exists. |
| `WP119-OPT-003` | Reuse the committed synthetic Ed25519 private key as owner authority. | Reject | The fixture is public, synthetic and explicitly non-authoritative. |
| `WP119-OPT-004` | Reopen static remediation without a new evidence-backed finding. | Reject | WP-118 is independently validated; speculative churn increases supply-chain and review risk. |
| `WP119-OPT-005` | Retain an owner-supplied evidence-equivalent sealed bundle as fallback. | Retain fallback | It may avoid agent network use but cannot bypass source, integrity, closure, custody or validation controls. |

### Accepted decision `DEC-246`

Accept the published WP-118 owner-signed acquisition control as independently validated static
evidence and classify it `READY_FOR_RUN_SPECIFIC_AUTHORIZATION_PLANNING_ONLY`; bind the exact
revision, trees, hashes, trust boundary, source envelope, resource ceilings and cleanup/validation
controls in WP-119; prohibit reuse of synthetic keys or consumed private authorities; advance one
separate identity, real-key-custody and ineffective-authorization readiness package; and keep real
key creation, network, artifact acquisition, dependencies, runtime proof, architecture selection
and application implementation separately gated.

## Owner decisions

| ID | Recommendation | State |
| --- | --- | --- |
| `WP119-DEC-001` | Accept `WP119-FACT-001` through `016` as the truthful post-publication state. | Accepted |
| `WP119-DEC-002` | Accept `DEC-246` and `READY_FOR_RUN_SPECIFIC_AUTHORIZATION_PLANNING_ONLY`. | Accepted |
| `WP119-DEC-003` | Accept `WP119-BIND-001` through `010` as the immutable publication and public-control bindings. | Accepted |
| `WP119-DEC-004` | Accept `WP119-BIND-011` through `017` as the signing-authority, role, path and authorization prerequisites. | Accepted |
| `WP119-DEC-005` | Accept `WP119-BIND-018` through `027` as the later network, evidence, lifecycle, cleanup and independent-validation boundaries. | Accepted |
| `WP119-DEC-006` | Accept `WP119-BIND-028` and keep all currently closed gates closed. | Accepted |
| `WP119-DEC-007` | Advance `WP119-OPT-001`, retain option 005 only as evidence-equivalent fallback, and reject options 002 through 004. | Accepted |
| `WP119-DEC-008` | Reserve WP-120 for owner-decision documentation and private ineffective authorization preparation only; do not instantiate identities, generate keys or execute acquisition merely by accepting WP-119. | Accepted |
| `WP119-DEC-009` | Accept that WP-119 creates no private authorization draft and no execution identity; those are later-gate materials. | Accepted |
| `WP119-DEC-010` | Freeze the exact four-path WP-119 public candidate inventory and require later owner acceptance before commit, push or successor activation. | Accepted |

## Frozen candidate inventory and next gate

The WP-119 public candidate inventory is exactly:

1. `docs/00_PROJECT_START_HERE.md`
2. `docs/02_ASSUMPTIONS_AND_DECISIONS.md`
3. `docs/112_WAVE_A_OFFLINE_ARTIFACT_ACQUISITION_AUTHORIZATION_READINESS.md`
4. `docs/113_WAVE_A_OFFLINE_ARTIFACT_ACQUISITION_REAUTHORIZATION_READINESS.md`

The owner accepted `DEC-246`, `WP119-FACT-001` through `016`, `WP119-BIND-001` through `028`,
and `WP119-DEC-001` through `010` exactly as recorded; advanced option 001; retained option 005
only as an evidence-equivalent fallback; rejected options 002 through 004; and authorized commit
and push of only the exact four-path public inventory. After verified publication, WP-120 may
prepare owner-decision documentation and one private ineffective authorization draft only.

No real signing key, network operation, download, artifact, dependency, build, device action,
runtime proof, application implementation, architecture selection, infrastructure, deployment,
provider/cost change or customer/live-data use is authorized.

## Verified publication and WP-120 activation

The exact accepted four-path WP-119 inventory was published at revision
`b7e53835ce32da16d9f2ac6ebe037445690a4cc8`, repository tree
`e2db50e5635c7aa09a64b9ff979e601e6cd03564`. Live GitHub `main`, local `HEAD` and cached
`origin/main` matched. WP-119 is closed and its publication authority is consumed.

WP-120 is active for owner-decision documentation and one private ineffective authorization draft
only. Real signing-key creation, identity instantiation, network and all downstream actions remain
closed.
