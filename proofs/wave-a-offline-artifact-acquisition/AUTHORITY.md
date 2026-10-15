# WP-111 authority boundary

Authority derives from the owner's acceptance and verified publication of WP-110 at revision
`cb8be3d04f31126f80c2dec3ae961a65911033a8`, tree
`b223a909b96d1c55d7fbe8783be535983d874f97`, including `DEC-243` and the exact WP-110
contract.

Allowed:

- create files only under `proofs/wave-a-offline-artifact-acquisition/` and ignored private
  evidence under `internal-local/work-packages/WP-111/`;
- bind an already-present Node executable by exact path, version and SHA-256;
- record other already-present tool observations as non-executable planning evidence;
- run dependency-free synthetic static tests and the public verifier through the exact launcher;
- inventory, seal and obtain exactly one fresh zero-authority independent static validation.

Closed:

- network, DNS, redirects, metadata retrieval, downloads and artifact acquisition;
- SDK/cache mutation, dependencies, lockfiles, package-manager or resolver use;
- builds, devices/emulators, runtime, services, databases and proof execution/reproduction;
- application coding, architecture selection, infrastructure, deployment, provider accounts/cost,
  and customer/live data;
- commit or push before later owner acceptance.

Only the exact Node binding may execute, and only the `STATIC_TESTS` and `STATIC_VERIFY` command
tuples may run. The source policy, command policy and future-tool records are inert data. A static
PASS does not convert them into effective network authority.

## WP-113 static launcher boundary

WP-113 may add or remediate only dependency-free acquisition-control source under this public root
and mode-restricted private evidence under `internal-local/work-packages/WP-113/`. It may execute
the already-present Node binding for static identity checks and hash-bind curl without executing
it; only Node may execute and
only for `STATIC_TESTS` and `STATIC_VERIFY`.

The launcher must reject network stages while any network flag is false, reject consumed or
expired authority, reject URL credentials/query/fragment, require HTTPS 443 and an accepted
source/stage/path match, prohibit automatic redirects, require a redirect destination to be
metadata-committed as the exact source-005 request, construct curl arguments internally, disable curl configuration and
proxies, constrain output to the run-owned quarantine root, and append ledger intent before any
future process creation. Static tests may exercise pure argument construction and rejection paths;
they must not call DNS, curl, a network module or a real endpoint.

WP-113 authorizes no network, metadata, redirect, download, artifact, archive, SDK/cache,
dependency, build, device, runtime, proof, product, architecture, infrastructure, deployment,
provider/cost or customer/live-data action. A static PASS only makes a later owner-decision package
possible.

## WP-114 enforcement-remediation boundary

WP-114 is authorized only to remediate `WP113-VAL-005` through `WP113-VAL-009` under the two
disposable Wave A acquisition-control roots and ignored private evidence under
`internal-local/work-packages/WP-114/`. It may execute the exact Node binding for dependency-free
static tests and verification. Curl is hash-bound but must not execute.

The remediated launcher must verify exact owner text and complete public-control inventory hashes
before process creation; compare the source policy to the five accepted entries; require an
authorization-listed request-file hash; prove every artifact request is an exact member of the
existing sealed metadata commitment; record request, integrity and commitment fields in network
intent; and hold one exclusive run-owned lock across ledger, aggregate-budget, network-process and
result operations. Stale locks stop fail closed and are not removed by launcher startup.

Network, metadata retrieval, downloads, artifact acquisition, SDK/cache mutation, dependencies,
builds, devices, runtime, proof execution, product code, architecture selection, infrastructure,
deployment, provider/cost and customer/live data remain closed. WP-114 publication remains closed
until later owner acceptance.

## WP-115 single-capture and sealed-execution remediation boundary

WP-115 follows the accepted `STOPPED_STATIC_FINDING` result of WP-114 and is limited to the
remaining authorization, request, metadata-commit and executable-control TOCTOU findings. Every
authority-bearing file must be opened with no-follow semantics and captured exactly once; mode,
identity, bytes, hash and parsed meaning must derive from that same capture.

The launcher must not create a child process for static public controls. A later network authority
must bind private sealed executable copies by source identity, run-owned relative path, version and
hash. The private root and sealed-executable directory must be non-writable, while writable
runtime, evidence and quarantine directories are pre-created beneath them. The executable copy
must be a non-symlink, single-link, non-writable regular file. Public inventory validation remains
evidence validation only and may not become path-based execution authority.

Network, downloads, artifact acquisition, dependencies, builds, devices, runtime, proof execution,
application coding, architecture selection, infrastructure, deployment, provider/cost and
customer/live data remain closed. WP-115 commit and push remain closed until later owner acceptance.

## WP-116 trusted bootstrap and descriptor-continuity remediation boundary

WP-116 follows the accepted `STOPPED_STATIC_FINDING` result of WP-115 and is limited to static
remediation of `WP115-VAL-001` through `WP115-VAL-004`. The legacy Node launcher is prohibited from
entering any network stage. A later network package must start with the exact inline bootstrap
bytes through `/usr/bin/python3 -I -S -c`; it may not load the bootstrap by pathname. The bootstrap
must capture the self-contained launcher once with no-follow semantics, verify its accepted hash,
and compile and execute those same captured bytes.

The later launcher must use only accepted tools on the macOS read-only sealed system volume. The
output file must remain open from exclusive creation through child inheritance and final digest.
The ledger must remain open and exclusively locked on one descriptor across verification, budget
accounting, intent append, result append and fsync. The recorded Python self-test may exercise
these descriptor controls locally, but WP-116 authorizes no network child process.

Network, downloads, artifact acquisition, dependencies, builds, devices, runtime proof,
application coding, architecture selection, infrastructure, deployment, provider/cost and
customer/live data remain closed. Commit and push remain closed.

## WP-117 authority-binding and integrated descriptor remediation boundary

WP-117 follows the independent `STOPPED_STATIC_FINDING` result of WP-116. The exact inline
bootstrap must capture and hash a mode-`0600` effective authorization before it captures the
launcher, and the authorization must bind the exact launcher path and hash. The launcher may trust
only the authorization and launcher hashes supplied by that capture chain. Static validation must
exercise the exact inline bootstrap, not merely invoke the launcher pathname.

The self-test may start one OS-sealed local shell stub solely to prove descriptor inheritance; curl
and network remain prohibited. Output digesting must verify the full file identity before and after
reading. Ledger appends must handle partial writes, and aggregate duration, object, attempt and byte
budgets must derive from the already-locked same-descriptor ledger state. Effective authorization
bytes must be retained separately before the public static authority is consumed.

No network, curl, download, artifact acquisition, dependency, build, device, runtime proof,
application code, architecture selection, infrastructure, deployment, provider/cost,
customer/live data, commit or push is authorized.

## WP-118 owner-signed trust-root and descriptor-safety remediation boundary

WP-118 follows the independent `STOPPED_STATIC_FINDING` result of WP-117 and is limited to static
remediation of `WP117-VAL-001` through `WP117-VAL-004`. The accepted authorization design uses a
detached Ed25519 signature over the exact captured authorization bytes. The exact inline bootstrap
pins the accepted public verification key and key identifier, captures the accepted bootstrap
source path, and enforces its signed SHA-256 before accepting the launcher binding. The committed
key fixture is an RFC 8032 synthetic test vector, visibly
classified as non-production authority; no real signing key is created or stored.

The output descriptor must reject link loss and rebind the visible no-follow pathname to the same
device and inode before and after digesting. The ledger must reject overrides of protected chain
fields, keep its parent non-writable throughout the session, and rebind both parent and visible
ledger path to the locked descriptor around every append. A process-wide acquisition lock is held
on the verified `/usr/bin/python3` inode on the sealed read-only system volume so renaming the
run-owned parent through a writable ancestor cannot create a second accepted accounting lock.
Dependency-free negative tests must
prove forged authorization, bootstrap-hash drift, noncanonical signature input, output replacement,
ledger replacement, global-lock contention and reserved-field injection stop fail closed.

The accepted public proof revision and exact inline-bootstrap bytes remain part of the invocation
contract. This package does not install a privileged trust anchor or protect against an actor who
can replace both the accepted public control tree and the command that selects it. Production key
generation, custody, rotation and privileged installation require later, separate authority.

No network, download, artifact acquisition, dependency, build, device, runtime proof, application
code, architecture selection, infrastructure, deployment, provider/cost, customer/live data,
commit or push is authorized.

## WP-121 run-bound trust-root interface remediation boundary

WP-121 follows accepted `DEC-247` and is limited to proof-only static remediation of the public-key,
network-state, revision/tree, schema and run-binding interfaces. It may use only synthetic key
fixtures, dependency-free local static tests and ignored private static evidence. Real signing-key
creation, validator instantiation, preflight and every network or acquisition action remain closed.

The exact inline bootstrap must capture a mode-restricted owner trust-root descriptor once with
no-follow semantics and verify its owner-accepted SHA-256 before signature verification. The
authorization must bind the same descriptor hash and key ID. A descriptor classified
`SYNTHETIC_STATIC_TEST_ONLY` may support static tests only and must stop an `EFFECTIVE_NETWORK`
authorization. A prospective network descriptor must be classified `RUN_BOUND_OWNER_PUBLIC_KEY`,
use a non-synthetic key ID and be mode `0600`.

The network contract may validate a prospective non-synthetic revision, tree, key ID and trust-root
hash only when the caller supplies matching expected bindings and explicitly enables validation of
the network state. This is a static interface, not execution authority: the trusted launcher still
terminates every network entry at the published closed boundary and no curl child
may start. The consumed WP-118 inventory must fail closed after the public tree changes.

WP-121 authorizes no real key, network, metadata, download, acquired artifact, dependency, build,
device, runtime proof, application code, architecture selection, infrastructure, deployment,
provider/cost, customer/live data, commit or push.

## WP-125 pre-network diagnostic normalization boundary

WP-125 permits only proof-static prevention of the exact macOS Python startup warning observed by
WP-124. Future pre-network bootstrap verification must use the exact sanitized environment,
including `TMPDIR=/tmp`, and retain the exact terminal-stop oracle. Prevention is permitted;
pattern filtering, diagnostic suppression, or reinterpretation of unexpected stderr remains
prohibited. WP-125 grants no real-key, network, acquisition, dependency or runtime authority.

## WP-128 exact helper resolution boundary

WP-128 permits only proof-static remediation of the pre-key helper resolution failure recorded by
WP-127. A future private materializer must receive an explicit absolute repository root, resolve
the published helper from its repository-relative path, capture and verify its accepted SHA-256,
and import-check its required exports before any key-generation operation. Workspace paths
containing spaces must remain literal. Relative roots, wrong-depth roots, escaped paths and hash
drift fail closed. WP-128 grants no real-key, signing, network, acquisition, dependency or runtime
authority.

## WP-132 signed network-transition static boundary

WP-132 permits only dependency-free static proof of the transition from a signed
`EFFECTIVE_NETWORK` authority to a substituted execution seam. The signed authority must bind a
run-specific enablement hash, exact request hash, absolute ledger and output paths, exact limits,
and the complete action-flag set. Static-only, synthetic, missing, consumed or drifted authority
fails closed. The public runtime entry remains terminated by
`NETWORK_RUNTIME_NOT_AUTHORIZED_BY_WP132`; `/usr/bin/curl` is never invoked by WP-132.

## WP-134 run-bound runtime-entry static boundary

WP-134 permits only static proof that fresh revision, tree, Python, curl, bootstrap, launcher,
source-policy and request hashes are bound before an internally supplied surrogate child seam.
The request must name an exact source-policy member and the signed transition gate must already
pass. Drift fails before the seam. The real runtime entry remains closed; WP-134 creates no
identity, key, signature, effective authority, curl child, network request or acquired byte.

## WP-137 authenticated real-runtime dispatch boundary

WP-137 statically connects the trusted real entry to the run-bound validator. Trusted bootstrap
must succeed before exact enablement, request, source-policy and expected-binding files are read.
The only real executor injected is the internal `execute_authenticated_network_child` adapter.
WP-137 performs no signing or network execution and grants no authority by itself.

