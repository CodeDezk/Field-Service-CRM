# Wave A Real Trust Root and Network Binding Static Remediation

## Document control

| Field | Value |
| --- | --- |
| Status | Independently validated PASS — owner result acceptance required |
| Work package | `WP-121 Real Trust Root and Network Binding Static Remediation` |
| Owner | Aung Myo Oo |
| Governing decision | `DEC-247` — Accepted |
| Accepted WP-120 revision | `1f4c6f0dbdf5141493a4086887518aca2ab47621` |
| Result | `STATIC_CONTROL_REMEDIATED_VALIDATED` |
| Real signing-key creation / validator instantiation | Closed |
| Network/download/artifact acquisition | Closed |
| Dependencies/build/device/runtime/proof execution | Closed |
| Application/architecture/infrastructure/deployment | Closed |
| Provider account/cost/customer or live data | Closed |
| Date | 2026-10-14 |

## Objective and authority boundary

WP-121 remediates only the published proof-control interfaces identified by WP-120. It adds a
run-bound owner trust-root descriptor, binds its hash and key identity through the trusted
bootstrap and authorization verification paths, removes consumed WP-118 revision/run/root
assumptions from the prospective network-state validator, and adds dependency-free static tests.

WP-121 creates no real signing key or validator, makes no authorization effective, contacts no
network, and performs no acquisition, dependency, runtime, product, architecture, infrastructure,
deployment, cost, or customer/live-data action. The network launcher remains unconditionally
fail-closed before process creation.

## Primary findings

| ID | Finding |
| --- | --- |
| `WP121-FACT-001` | WP-120 was published and verified at revision `1f4c6f0dbdf5141493a4086887518aca2ab47621`. |
| `WP121-FACT-002` | The proof control accepts an owner trust-root descriptor only through an exact path and SHA-256 supplied to the trusted bootstrap. |
| `WP121-FACT-003` | The descriptor schema fixes Ed25519 and distinguishes `SYNTHETIC_STATIC_TEST_ONLY` from prospective `RUN_BOUND_OWNER_PUBLIC_KEY`. |
| `WP121-FACT-004` | Synthetic descriptors remain static-test-only and cannot authorize network state. |
| `WP121-FACT-005` | A prospective real descriptor must be mode `0600`, non-synthetic, and bind its exact key ID, public key and descriptor hash. |
| `WP121-FACT-006` | Network authorization validation can bind expected revision, tree, owner key ID and trust-root hash without consumed WP-118 run material. |
| `WP121-FACT-007` | Revision, tree, private-root, descriptor-hash, key-ID and public-key drift fail closed. |
| `WP121-FACT-008` | Every trusted network entry stops with `NETWORK_EXECUTION_NOT_AUTHORIZED_BY_WP121` before process creation. |
| `WP121-FACT-009` | The consumed WP-118 inventory correctly fails after remediation and cannot be reused as current authority. |
| `WP121-FACT-010` | Exact Node v22.23.1 tests passed 59/59 with zero failures. |
| `WP121-FACT-011` | Both public verifiers passed a 30-file extension inventory and reported `networkPerformed: false`. |
| `WP121-FACT-012` | The complete two-root proof inventory contains 42 files with renewed SHA-256 bindings. |
| `WP121-FACT-013` | No real key, effective authorization, validator, network operation or downloaded byte was created. |
| `WP121-FACT-014` | Exactly one fresh zero-authority validator independently reproduced the sealed packet with PASS and no findings. |

## Remediation disposition

| ID | Remediation |
| --- | --- |
| `WP121-REM-001` | Add a schema-governed owner trust-root descriptor. |
| `WP121-REM-002` | Require its exact path and SHA-256 at the trusted bootstrap boundary. |
| `WP121-REM-003` | Capture it once with no-follow and validate canonical content before use. |
| `WP121-REM-004` | Bind signature verification to its Ed25519 public key and key ID. |
| `WP121-REM-005` | Preserve synthetic-key support only for static fixtures. |
| `WP121-REM-006` | Require mode `0600` for a prospective real run-bound trust root. |
| `WP121-REM-007` | Replace consumed WP-118 network-state constants with explicit expected run bindings. |
| `WP121-REM-008` | Reject revision, tree, private-root, trust-root and owner-key drift. |
| `WP121-REM-009` | Keep the trusted network launcher closed before process creation. |
| `WP121-REM-010` | Extend dependency-free tests across bootstrap, launcher, descriptor, authorization and verifier paths. |
| `WP121-REM-011` | Renew the complete proof inventory and preserve ignored private evidence. |
| `WP121-REM-012` | Reserve independent validation as a separately authorized read/hash/report-only action. |

## Static bindings

| ID | Binding |
| --- | --- |
| `WP121-BIND-001` | Accepted base revision is `1f4c6f0dbdf5141493a4086887518aca2ab47621`. |
| `WP121-BIND-002` | Exact Node executable is `/Users/aungmyooo/.nvm/versions/node/v22.23.1/bin/node`, semantic version `22.23.1`. |
| `WP121-BIND-003` | The complete proof inventory is 42 files across the two accepted proof roots. |
| `WP121-BIND-004` | The acquisition-extension verifier binds 30 files and reports PASS. |
| `WP121-BIND-005` | Trust-root schema SHA-256: `50516b0859a2414889ad27b6352dd74716d2f2bb15b5b0e1e6511a6dce0915d9`. |
| `WP121-BIND-006` | Synthetic trust-root fixture SHA-256: `9ee2bf7cab1a3e5e9241712fe4747e2a16d08f2960c2c276d02f62b7f399a9e7`. |
| `WP121-BIND-007` | Trusted bootstrap SHA-256: `053f7618fd706406d8c48613f591196c71e790d5ea3606f36286418513ffa893`. |
| `WP121-BIND-008` | Trusted network launcher SHA-256: `7fb956e4a3ea6c777e6d2ac28703457c3742a76142929b905ee5bf2f85085ce0`. |
| `WP121-BIND-009` | Network contract SHA-256: `4551c24d6cf693fcfb04e3c9b64ad999f8a23f3cd3785c3196bce81868cf8bc4`. |
| `WP121-BIND-010` | Network-authorization schema SHA-256: `c2e7b2f46d862f96f9d55de6a750da53f9096b20a0e3f471105ce479bbed2f4e`. |
| `WP121-BIND-011` | Extension verifier SHA-256: `8eac5c3762cc1b34ab1b0a05ce06df1579e44928bda05946ba57aedd0661661e`. |
| `WP121-BIND-012` | Network verifier SHA-256: `e8453dea85c354106794c953cb79c947634a22c8d3c0a76afe1301421787d5a6`. |
| `WP121-BIND-013` | Tests passed 59/59 without dependency installation or network. |
| `WP121-BIND-014` | Verifier classifications are `STATIC_EXTENSION_WITH_NETWORK_LAUNCHER_SOURCE` and `STATIC_RUN_BOUND_TRUST_ROOT_INTERFACE_REMEDIATED`. |
| `WP121-BIND-015` | `/root/wp121_trust_root_validator` remains only a reserved proposed identity. |
| `WP121-BIND-016` | Current private evidence is ignored and non-authorizing. |

## Accepted decision `DEC-248`

Accept the primary result as `PRIMARY_STATIC_REMEDIATION_PASS_PENDING_INDEPENDENT_VALIDATION`, its
facts, remediations and bindings, and authorize exactly one fresh zero-authority independent static
validator only through a separate owner statement. Keep publication and every real-key, network,
dependency, runtime, product and architecture gate closed until that result is reviewed.

## Proposed owner decisions

| ID | Recommendation | State |
| --- | --- | --- |
| `WP121-DEC-001` | Accept the primary result classification and facts. | Accepted |
| `WP121-DEC-002` | Accept `WP121-REM-001` through `012`. | Accepted |
| `WP121-DEC-003` | Accept `WP121-BIND-001` through `016` and the renewed 42-file inventory. | Accepted |
| `WP121-DEC-004` | Accept 59/59 tests and both verifier passes as primary evidence only. | Accepted |
| `WP121-DEC-005` | Require exactly one fresh zero-authority independent validator before validated status. | Accepted — satisfied |
| `WP121-DEC-006` | Keep the reserved validator uninstantiated until separately authorized. | Accepted — authority consumed after validation |
| `WP121-DEC-007` | Keep real key creation and effective authorization closed. | Accepted |
| `WP121-DEC-008` | Keep network, acquisition, dependencies, runtime and downstream gates closed. | Accepted |
| `WP121-DEC-009` | Keep WP-121 commit and push closed pending later validated-result acceptance. | Accepted |
| `WP121-DEC-010` | Treat private evidence as ignored, static and non-authorizing. | Accepted |

## Candidate inventory and next gate

The candidate public inventory contains documents 00, 02, 114 and 115 plus the exact 13 changed
proof paths reported by Git. It is not frozen for publication. The next gate is owner acceptance
of the primary result and explicit authorization of exactly one fresh zero-authority validator.
The validator may read, hash, reproduce dependency-free tests and report; it may not repair files,
create keys, authorize or execute network activity, or publish anything.

## Owner acceptance and independent validation

The owner accepted the primary result, `DEC-248`, all fourteen facts, all twelve remediation
dispositions, all sixteen bindings, 59/59 tests, both verifier passes and the renewed 42-file
inventory. The owner then separately authorized exactly one fresh zero-authority validator,
`/root/wp121_trust_root_validator`, while keeping every execution and publication gate closed.

The validator attested to zero authority and made no edits. Independent validation returned PASS
with zero High, Medium or Low findings. It reproduced 42/42 checksum validations, 59/59 tests,
both 30-file public verifiers, `git diff --check`, the exact 17-path candidate scope, synthetic-key
network rejection, run-bound drift rejection and the unconditional pre-process network stop. No
real key, network, artifact, dependency, runtime, commit or push occurred. Validation authority is
consumed. WP-121 is `STATIC_CONTROL_REMEDIATED_VALIDATED` and now stops for owner result acceptance
and separate publication authorization.
