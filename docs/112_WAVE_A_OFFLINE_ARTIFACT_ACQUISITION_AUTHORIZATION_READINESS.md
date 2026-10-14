# Wave A Offline Artifact Acquisition Authorization Readiness

## Document control

| Field | Value |
| --- | --- |
| Status | Accepted — exact publication authorized |
| Work package | `WP-112 Wave A Offline Artifact Acquisition Authorization Readiness` |
| Owner | Aung Myo Oo |
| Governing decisions | `DEC-239` through `DEC-244` — Accepted |
| Accepted WP-111 revision | `42a8657a56e2d9b674e2d030fd940ab5177bae8d` |
| Accepted WP-111 repository tree | `4b1cb22e366dd602f14842018f20ce4fed6a7378` |
| Recommendation | `DEC-245` — Accepted |
| Network/download/artifact acquisition | Closed |
| SDK/cache mutation and dependency restoration | Closed |
| Build/device/runtime/proof execution | Closed |
| Application/architecture/infrastructure/deployment | Closed |
| Provider account/cost/customer or live data | Closed |
| Date | 2026-10-14 |

## Objective and authority boundary

WP-112 determines whether the accepted WP-109 control and WP-111 acquisition extension are ready
to support a later exact-source acquisition. It freezes the proposed source classes, stages,
resource ceilings, roles, paths, evidence, stop conditions and successor sequence for owner
decision. It also prepares one private, all-false, ineffective authorization draft.

WP-112 is documentation and private planning only. It does not create or modify an executable
launcher, instantiate a run or validator, contact DNS or a network, retrieve metadata, download an
artifact, create quarantine or bundle bytes, mutate an SDK/cache, restore a dependency, build,
access a device, start a runtime/service/database, execute a proof, implement application code,
select architecture, create infrastructure, deploy, incur cost, or use customer/live data.

## Accepted facts and current findings

| ID | Fact or finding |
| --- | --- |
| `WP112-FACT-001` | WP-111 is published at the exact revision/tree above and its 14-file public acquisition-extension inventory remains unchanged. |
| `WP112-FACT-002` | WP-111 passed 15/15 dependency-free static tests and independent validation, but intentionally contains no real endpoint, downloaded artifact, dependency closure or effective network authority. |
| `WP112-FACT-003` | The WP-109 launcher is bound to revision `f17ba0474d3a40f7f46aab05226b67f720f0d574`, private root `internal-local/work-packages/WP-109/`, and static stages only. |
| `WP112-FACT-004` | The WP-111 launcher is bound to run `wp111-2026-10-10-01`, private root `internal-local/work-packages/WP-111/`, exact static stages only, and consumed authority. |
| `WP112-FACT-005` | Neither published launcher can authorize or invoke `/usr/bin/curl`; direct curl use would violate `WP107-CTRL-008` and the accepted command-binding contract. |
| `WP112-FACT-006` | `/usr/bin/curl` remains locally observed as `8.7.1` with SHA-256 `b636262803922ee1dd0fbf614818473ffa53c811e44fd3278c2270d3af4759d3`; this is planning evidence, not a later run-bound binding. |
| `WP112-FACT-007` | The exact accepted direct candidates remain Flutter `3.47.0`, Drift `2.35.2`, drift_dev `2.35.0`, sqlite3 `3.7.0`, flutter_secure_storage `11.2.0`, sqflite `2.4.4+1`, and source-review-only sqflite_sqlcipher `3.4.1`. |
| `WP112-FACT-008` | Flutter archive identity and the complete pub transitive/native closure must be derived from captured authoritative metadata before artifact commands can be frozen. |
| `WP112-FACT-009` | Existing global Flutter/Dart/Android/Java SDKs and package caches remain read-only baseline state and are not acquisition targets. |
| `WP112-FACT-010` | The current private WP-112 draft has no run ID, roles, time window, executable authority or enabled action flag and cannot be promoted or executed. |
| `WP112-FACT-011` | Current host free space is an operational precondition, not proof evidence; artifact acquisition must not begin unless a later fresh receipt demonstrates at least 20 GiB available after reserving unrelated host needs. |
| `WP112-FACT-012` | No network, metadata, download, acquisition, dependency, build, device, runtime, proof, application, architecture, infrastructure, deployment, provider/cost or customer/live-data action occurred in WP-112. |

## Readiness gap

The static schemas and validators are sufficient inputs for a later run-specific control, but the
exact fail-closed network launcher does not yet exist. The accepted controls require every command
to pass through one launcher that verifies effective authority, stage, executable hash, exact
arguments, destination policy, expiry, evidence availability and ledger intent before process
creation. Running curl directly, changing the consumed WP-109/WP-111 launchers, or treating a
static PASS as executable authority is prohibited.

This gap is classified `NETWORK_LAUNCHER_NOT_MATERIALIZED`. WP-112 is therefore not ready to
authorize metadata retrieval or artifact acquisition. The next gate must be static remediation,
not a network run.

## Proposed source-policy envelope

The following entries are proposed planning inputs for a later statically materialized launcher.
They have not been contacted or verified by WP-112.

| ID | Scheme/host/port | Exact initial path or bounded prefix | Stage | Redirect policy |
| --- | --- | --- | --- | --- |
| `WP112-SOURCE-001` | `https://storage.googleapis.com:443` | `/flutter_infra_release/releases/releases_macos.json` | Flutter metadata | Deny |
| `WP112-SOURCE-002` | `https://storage.googleapis.com:443` | `/flutter_infra_release/releases/` | Metadata-derived Flutter macOS ARM64 archive only | Deny unless a later exact destination is frozen |
| `WP112-SOURCE-003` | `https://pub.dev:443` | `/api/packages/` | Exact version metadata and metadata-derived transitive package metadata | Deny |
| `WP112-SOURCE-004` | `https://pub.dev:443` | `/api/archives/` | Metadata-committed pub archives only | At most one redirect to an exact committed destination |
| `WP112-SOURCE-005` | `https://storage.googleapis.com:443` | `/pub.dartlang.org/packages/` | Only an exact redirect destination committed from accepted pub metadata | No further redirect |

The initial direct pub metadata URLs must use the exact version form
`/api/packages/{package}/versions/{version}` for the five accepted executable/direct candidates and
the one source-review-only candidate. A later control may derive additional metadata requests only
from already captured dependency declarations, normalize package names, enforce the same host and
prefix, record each request before execution, and stop if a mutable alias, unapproved host, URL
query, fragment, credential, proxy or ambiguous version is required.

The later metadata commit must freeze every artifact URL, final redirect destination, expected
SHA-256 when authoritatively supplied, expected size when supplied, version, package class and
dependency reason before `ARTIFACT_RETRIEVAL` can begin. No artifact command may be generated from
unsealed or partially parsed metadata.

## Proposed stage sequence

| ID | Stage | Permitted later effect | Mandatory boundary |
| --- | --- | --- | --- |
| `WP112-STAGE-001` | `STATIC_BIND` | Bind published controls, exact run-specific launcher source, executables, paths and all-false defaults | No network; fresh independent static validation required |
| `WP112-STAGE-002` | `PREFLIGHT` | Verify revision/tree, modes, ownership, ACLs, environment, proxies, free space, process/runtime residuals and immutable global SDK/cache hashes | Stop before authority becomes effective on any drift |
| `WP112-STAGE-003` | `METADATA_RETRIEVAL` | Sequential GET of allowlisted metadata only into private quarantine | No archive or artifact body; one request at a time |
| `WP112-STAGE-004` | `METADATA_COMMIT` | Parse, normalize and seal Flutter identity plus complete direct/transitive/native candidate graph and exact artifact requests | Commit must be flushed, hashed and independently machine-verifiable before retrieval |
| `WP112-STAGE-005` | `ARTIFACT_RETRIEVAL` | Sequential GET of only metadata-committed artifact URLs into private quarantine | Exact expected identity/hash/size/class; no execution or global cache write |
| `WP112-STAGE-006` | `STATIC_INSPECTION` | Hash, type, archive-listing, traversal/link/mode/license/provenance/advisory inspection | No imported, linked, loaded, generated, installed or executed downloaded code |
| `WP112-STAGE-007` | `SEAL` | Create canonical proof-only offline-bundle manifest, aggregate hash and complete private packet | Authority consumed before validator handoff |
| `WP112-STAGE-008` | `INDEPENDENT_VALIDATE` | Fresh zero-authority validator re-hashes and checks the sealed packet | Read/hash/report only; no repair, retrieval or mutation |
| `WP112-STAGE-009` | `CLEANUP_RESIDUAL` | Remove partial/unsealed run-owned state and verify no authority, process, network or global mutation remains | Mandatory under every outcome |

The sequence above is the target contract. Because the run-specific launcher is absent, WP-112
recommends that `WP112-STAGE-001` be separately materialized and validated before any package may
authorize stages 002 through 009.

## Proposed resource and network ceilings

| ID | Proposed later ceiling |
| --- | --- |
| `WP112-LIMIT-001` | Public unauthenticated HTTPS only; no provider account, credential, cookie, netrc, authorization header, custom CA, insecure TLS, proxy or paid service. |
| `WP112-LIMIT-002` | One run, single use, no resume, maximum 45 minutes from first network request to mandatory cleanup. |
| `WP112-LIMIT-003` | One active request, no parallelism, maximum three attempts only for a transport failure before accepted bytes; no retry for HTTP, content or integrity failure. |
| `WP112-LIMIT-004` | Maximum 4 GiB total received bytes, 2 GiB per response, 2,000 metadata/package objects and three redirects total; source-specific lower bounds override these ceilings. |
| `WP112-LIMIT-005` | Maximum 8 MiB for Flutter release metadata and 2 MiB for each pub metadata response unless a later owner-accepted contract records a smaller authoritative bound. |
| `WP112-LIMIT-006` | At least 20 GiB host free space at preflight and before artifact retrieval; stop if the floor is crossed. |
| `WP112-LIMIT-007` | No background process, daemon, listener, mount, scheduled continuation, package manager, resolver, shell evaluation or downloaded executable. |
| `WP112-LIMIT-008` | No write outside the exact private acquisition root except append-only evidence inside that root; published proof controls and global SDKs/caches are read-only. |

## Proposed paths and custody

| ID | Proposed later path | Purpose |
| --- | --- | --- |
| `WP112-PATH-001` | `proofs/wave-a-artifact-acquisition-control/` | Published immutable control baseline |
| `WP112-PATH-002` | `proofs/wave-a-offline-artifact-acquisition/` | Published immutable acquisition-extension baseline |
| `WP112-PATH-003` | A new ignored run-specific private root accepted by the later execution package | Authorization, launcher binding, ledger, receipts, quarantine, seal and cleanup evidence |
| `WP112-PATH-004` | `<private-root>/quarantine/metadata/` | Raw metadata responses before normalized commitment |
| `WP112-PATH-005` | `<private-root>/quarantine/artifacts/` | Untrusted downloaded bytes before static acceptance |
| `WP112-PATH-006` | `<private-root>/quarantine/source-review-only/` | Non-executable conditional or rejected source material |
| `WP112-PATH-007` | `<private-root>/sealed-bundle/` | Canonical proof-only offline bundle candidate after complete seal |
| `WP112-PATH-008` | `<private-root>/evidence/` | Mode `0600` authorization, ledger, receipts, inventories, reports and hashes |

The current WP-110/WP-111 private roots and all earlier evidence are immutable. A later package must
name a new root and run ID; it must not reuse the prospective `WP-112` path merely because WP-110
used that name for planning.

## Proposed roles and independence

| Role | WP-112 disposition |
| --- | --- |
| Owner | Aung Myo Oo decides this readiness recommendation and later execution authority |
| Primary operator | `/root` may be proposed later; not assigned execution authority by WP-112 |
| Static control validator | Exactly one fresh zero-authority validator after a later launcher seal; identity not instantiated by WP-112 |
| Acquisition packet validator | Exactly one fresh zero-authority validator after a later acquisition seal; identity not instantiated by WP-112 |
| Security/qualified production reviewer | Not required to inspect public unauthenticated artifact bytes, but remains mandatory before production or real/customer data use |

A validator may read, hash, reproduce static checks and report. It may not write controls, retrieve
metadata/artifacts, repair evidence, execute downloaded code, accept dependencies, select
architecture or authorize a successor.

## Authorization prerequisites

| ID | Requirement before any later metadata or artifact network operation |
| --- | --- |
| `WP112-AUTH-001` | Owner acceptance and verified publication of WP-112. |
| `WP112-AUTH-002` | Separate materialization and independent static validation of an exact run-specific network launcher that enforces this contract. |
| `WP112-AUTH-003` | Exact published revision/tree plus complete hashes of both public proof-control trees and the run-specific launcher. |
| `WP112-AUTH-004` | Fresh run ID, accepted operator, fresh zero-authority validator identity/attestation and explicit separation of authority. |
| `WP112-AUTH-005` | Fresh executable path/version/hash bindings and exact stage/argument templates; planning observations are insufficient. |
| `WP112-AUTH-006` | Exact source-policy object, metadata seeds, redirect destinations/policy, TLS, byte/time/retry/object limits and free-space floor. |
| `WP112-AUTH-007` | New private root, quarantine, sealed-bundle and evidence paths plus explicit forbidden global SDK/cache/proof/application paths. |
| `WP112-AUTH-008` | New effective machine-readable authorization with owner-text hash, start/expiry, single-use state, exact enabled stages and every unrelated flag false. |
| `WP112-AUTH-009` | Pre-action clean/revision/path/mode/ownership/ACL/environment/proxy/process/runtime/free-space/cache/SDK receipt. |
| `WP112-AUTH-010` | Append-only hash-chained ledger initialized and bound to the effective authorization before the first network request. |
| `WP112-AUTH-011` | Mandatory authority consumption, cleanup, residual verification, sealed inventory and independent validation under every outcome. |
| `WP112-AUTH-012` | Separate explicit owner execution authorization; documentation publication, static validation or an ineffective draft grants no network authority. |

## Evidence, stop and cleanup additions

All accepted `WP110-EVID-001` through `012`, `WP110-STOP-001` through `010`, and
`WP110-CLEAN-001` through `006` remain mandatory. The following clarifications apply:

| ID | Clarification |
| --- | --- |
| `WP112-EVID-001` | Preserve the exact response body and hash for every metadata request before parsing; record normalized facts separately. |
| `WP112-EVID-002` | Record every dynamically derived metadata URL and the dependency declaration that authorized deriving it. |
| `WP112-EVID-003` | The metadata-commit seal must contain the complete graph, artifact request set, classifications and unresolved findings; partial closure is a stop. |
| `WP112-EVID-004` | Record current and final free space, received bytes, quarantine bytes and sealed-bundle bytes without scanning unrelated user content. |
| `WP112-EVID-005` | Preserve exact proof that downloaded bytes were never executed, installed, imported, linked, loaded or copied into a global cache/SDK. |
| `WP112-STOP-001` | Stop before network if the exact launcher is absent, static validation is not independently PASS, or any accepted public control hash drifts. |
| `WP112-STOP-002` | Stop if metadata requires an unapproved host/prefix, mutable alias, credential, proxy, weakened TLS or unbounded dynamic request. |
| `WP112-STOP-003` | Stop if available space is below the floor, an expected hash/size is absent where required, or complete closure cannot be committed. |
| `WP112-STOP-004` | Stop and consume authority on any attempt to execute downloaded content, invoke a package manager/resolver, mutate global state or continue after a finding. |
| `WP112-CLEAN-001` | Cleanup must be callable without network, metadata, credentials or a successful seal and may target only later run-owned paths. |
| `WP112-CLEAN-002` | A successful sealed bundle is retained only for owner review; a stopped run retains only bounded evidence and removes partial/unsealed bytes. |

## Options and recommendation

| ID | Option | Recommendation | Reason |
| --- | --- | --- | --- |
| `WP112-OPT-001` | Statically materialize and independently validate one exact run-specific acquisition launcher, then seek separate owner authority for the controlled metadata/artifact sequence. | Advance | Closes the executable-control gap without contacting a network or weakening the accepted two-stage contract. |
| `WP112-OPT-002` | Execute curl directly using the accepted documentation and static schemas. | Reject | Violates the launcher, ledger-intent, authority, path and evidence controls. |
| `WP112-OPT-003` | Patch or reuse the consumed WP-109/WP-111 launchers. | Reject | Their revisions, paths, stages and authorities are immutable and static-only. |
| `WP112-OPT-004` | Accept an owner-supplied sealed bundle with evidence equivalent to every source, integrity, closure, license, custody and independent-validation control. | Retain fallback | Can avoid agent network use but cannot bypass exact evidence or become an accepted dependency automatically. |

### Proposed decision `DEC-245`

Classify WP-112 as `NOT_READY_NETWORK_LAUNCHER_ABSENT`; accept the proposed exact source-policy,
stage, resource, path, role, authorization, evidence, stop and cleanup envelope; advance one bounded
static launcher-materialization package before any network authority; retain only the evidence-
equivalent owner-supplied bundle as fallback; and reject direct curl or mutation/reuse of consumed
controls. No network, acquisition, dependency, proof, architecture or implementation authority
follows from this decision.

## Proposed owner decisions

| ID | Recommendation | State |
| --- | --- | --- |
| `WP112-DEC-001` | Accept `WP112-FACT-001` through `012` as the truthful starting state. | Accepted |
| `WP112-DEC-002` | Accept `DEC-245` and the `NETWORK_LAUNCHER_NOT_MATERIALIZED` blocker. | Accepted |
| `WP112-DEC-003` | Accept `WP112-SOURCE-001` through `005` as the proposed later source-policy envelope, not verified endpoint evidence or network authority. | Accepted |
| `WP112-DEC-004` | Accept `WP112-STAGE-001` through `009` and `WP112-LIMIT-001` through `008`. | Accepted |
| `WP112-DEC-005` | Accept `WP112-PATH-001` through `008` and the prohibition on reusing earlier private roots. | Accepted |
| `WP112-DEC-006` | Accept the proposed role matrix and `WP112-AUTH-001` through `012`. | Accepted |
| `WP112-DEC-007` | Accept `WP112-EVID-001` through `005`, `WP112-STOP-001` through `004`, and `WP112-CLEAN-001` through `002` in addition to all accepted WP-110 controls. | Accepted |
| `WP112-DEC-008` | Advance `WP112-OPT-001`, retain option 004 only as evidence-equivalent fallback, and reject options 002 and 003. | Accepted |
| `WP112-DEC-009` | Accept the private ineffective draft and keep every network, mutation, dependency, runtime, proof, product, architecture and publication action false. | Accepted |
| `WP112-DEC-010` | Freeze the exact four-path WP-112 public candidate inventory and require later owner acceptance before commit, push or successor activation. | Accepted |

## Private ineffective authorization draft

`internal-local/work-packages/WP-112/ineffective-authorization.json` is ignored and mode-
restricted. It binds the accepted WP-111 publication, proposed source envelope and closed actions,
but deliberately has no run ID, assigned execution role, validator, time window, effective hash,
executable authority, command allowlist, private execution root or enabled action flag.

It is non-promotable and cannot be patched into an effective authorization. Every later static or
network package must create fresh control material after separate owner authorization.

## Frozen candidate inventory and next gate

The WP-112 public candidate inventory is exactly:

1. `docs/00_PROJECT_START_HERE.md`
2. `docs/02_ASSUMPTIONS_AND_DECISIONS.md`
3. `docs/111_WAVE_A_ACQUISITION_EXTENSION_STATIC_MATERIALIZATION_RESULT.md`
4. `docs/112_WAVE_A_OFFLINE_ARTIFACT_ACQUISITION_AUTHORIZATION_READINESS.md`

WP-112 stops at owner review. If accepted and published, the next package may perform only bounded
proof-control static remediation/materialization needed to create and independently validate the
exact acquisition launcher. Network, metadata retrieval, downloads, artifact acquisition,
SDK/cache mutation, dependencies, builds, devices, runtime, proof execution, application coding,
architecture selection, infrastructure, deployment, provider accounts/cost and customer/live data
remain closed until separately authorized.

## Owner acceptance

The owner accepted `DEC-245`, `WP112-FACT-001` through `012`, `WP112-SOURCE-001` through `005`,
`WP112-STAGE-001` through `009`, `WP112-LIMIT-001` through `008`, `WP112-PATH-001` through `008`,
the role matrix, `WP112-AUTH-001` through `012`, `WP112-EVID-001` through `005`,
`WP112-STOP-001` through `004`, `WP112-CLEAN-001` through `002`, and `WP112-DEC-001` through
`010` exactly as recorded. The owner advanced option 001, retained option 004 only as an
evidence-equivalent fallback, rejected options 002 and 003, accepted the ineffective private draft
and root static-validation PASS, and authorized publication of only the exact four-path public
inventory. After verified publication, WP-113 may perform only the separately bounded static
launcher materialization and exactly one fresh zero-authority independent validation after
sealing. Network and every downstream action remain closed.
