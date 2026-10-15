# Wave A Offline Artifact Acquisition Extension

This disposable proof-control tree is the WP-111 static materialization authorized after published
WP-110 revision `cb8be3d04f31126f80c2dec3ae961a65911033a8`. It models a future two-stage
metadata-then-artifact acquisition without performing network access, metadata retrieval,
downloads, artifact acquisition, dependency restoration, builds, device work or proof execution.

WP-111 materializes only:

- exact schemas for source policy, metadata commitment, artifact inventory and later receipts;
- synthetic fixtures that cannot identify or retrieve a real upstream artifact;
- pure validation functions and a fail-closed static launcher;
- dependency-free static tests and inventory/evidence contracts;
- exact observations of already-present tools, while making only the bound Node executable
  callable for the two accepted static stages.

WP-113 adds statically reviewed source policy, request/authorization schemas and a fail-closed
acquisition launcher. The launcher can execute only when a later fresh effective authorization,
exact request, tool binding, source policy, resource limits, path boundary and append-only ledger
all pass. It disables automatic redirects: a pub archive redirect must first be captured into the
metadata commitment and then requested as an exact `WP112-SOURCE-005` destination. WP-113 itself
binds only static tests and verification; every network flag remains false.

WP-114 remediates the stopped WP-113 independent findings. Before any process creation, the
launcher now recomputes the owner-authorization hash and verifies complete checksum coverage of
both public control roots. The source policy must equal the five accepted entries exactly. Every
future network request must be mode-restricted under the run-owned request directory and its exact
file hash must appear in effective authorization. Artifact requests additionally require an
existing mode-restricted metadata commitment whose file hash, run identity, source-policy hash and
single exact artifact member all match. Network intent records every integrity field, and one
exclusive run-owned lock surrounds ledger, budget, process and result operations.

WP-115 closes the remaining file-use race by deriving hash and parsed meaning from one no-follow
capture of each authorization, request, metadata commitment and inventory file. Public-control
files are captured once for evidence but are never launched as later child-process paths. Any
future external tool execution must use an exact run-owned sealed executable copy beneath a
non-writable private directory; the accepted source executable path is descriptive supply-chain
identity, not the executed path.

WP-116 supersedes the unsafe executable-copy assumption after independent review found that a
writable ancestor still allowed path replacement. The legacy Node launcher now stops every network
entry. A future acquisition must use the exact inline Python bootstrap, execute the same captured
and hash-verified self-contained launcher bytes, rely only on accepted tools on the read-only macOS
system volume, inherit one already-open output descriptor, and hold one locked ledger descriptor
through verification, accounting and append. WP-116 performs only dependency-free local static
self-tests; it does not perform acquisition or make the future network path effective.

WP-117 closes the gaps found by WP-116 independent review. The inline bootstrap now captures the
effective authorization first and obtains the exact launcher path and hash from those captured
bytes. Static tests exercise that exact chain. The trusted launcher includes the actual
`pass_fds` child interface, validates full output identity around digesting, uses a local sealed
shell stub to prove descriptor inheritance without network, enforces aggregate budgets from the
same locked ledger state, rejects partial ledger writes, and requires preservation of effective
authorization evidence before consumption.

WP-118 replaces caller-asserted authorization with a detached Ed25519 signature verified by the
exact accepted inline bootstrap against a pinned synthetic owner public key. The signed bootstrap
source path and hash are enforced, and strict canonical prime-subgroup point decoding rejects
noncanonical signature inputs. It also rebinds the visible output path before and after digesting,
rejects unlinked output inodes, prevents reserved ledger-chain field replacement, and combines
ledger path rebinding with a stable global lock on the verified system Python inode. The included
private seed is an RFC 8032 test vector used only by
dependency-free static tests; it is not a real credential or production authority.

WP-121 replaces the hard-coded synthetic-key execution interface with a hash-bound owner trust-root
descriptor interface. The bootstrap captures that descriptor once, binds its hash and key ID to
the signed authorization, admits a prospective `EFFECTIVE_NETWORK` state only for a non-synthetic
`RUN_BOUND_OWNER_PUBLIC_KEY`, and rejects descriptor hash/key/public-key drift before launcher use.
The network-contract validator can check exact expected run-bound revision, tree, key ID and
trust-root hashes while preserving the accepted source, tool, resource and closed-action controls.

This remains static remediation. The synthetic fixture proves the interface without creating a
real key, and the trusted launcher still stops every network entry before curl or any network child
can start. A later separately authorized package must materialize the real public/private key
pair, renew all bindings, obtain independent validation and receive explicit execution authority.

The public tree contains no acquired artifact, SDK, dependency, lockfile, package manifest,
credential or effective network authorization. Any later network or artifact operation requires
new owner authorization, a fresh run identity, exact sources and resource limits, effective
run-bound controls, evidence sealing and independent review.

WP-111 result meanings:

- `STATIC_EXTENSION_VALIDATED`: primary static checks and the one fresh independent validation
  pass; all execution gates remain closed.
- `STOPPED_STATIC_FINDING`: a public contract, fixture, test, binding or inventory is inconsistent.
- `STOPPED_TOOL_BINDING`: the exact already-present Node binding is absent or drifted.
- `AUTHORITY_VIOLATION`: any attempted action exceeds the static-only boundary.

No WP-111 result authorizes acquisition, accepts a dependency, selects architecture, or permits
reuse in application code.

WP-113 result meanings:

- `STATIC_NETWORK_LAUNCHER_VALIDATED`: the exact static launcher controls and one fresh independent
  validation pass; all network and downstream gates remain closed.
- `STOPPED_STATIC_FINDING`: a source, schema, launcher, test, binding or inventory finding remains.
- `STOPPED_TOOL_BINDING`: an exact local planning/static tool binding is absent or drifted.
- `AUTHORITY_VIOLATION`: any operation exceeds the static-only WP-113 authority.

WP-114 result meanings use the same four classifications with `WP-114` authority and require a
fresh independent PASS. No primary PASS can override an independent finding.

WP-115 uses the same result meanings. A primary static PASS may support owner review, but it does
not authorize network access, executable-copy materialization, acquisition, publication or a later
proof stage.

WP-116 uses the same result meanings. Its successful primary static result means only that the four
WP-115 findings have a statically testable remediation contract; independent validation and every
network, acquisition and publication gate remain separate.

WP-125 adds an exact pre-network bootstrap invocation contract. It supplies a sanitized
`TMPDIR=/tmp`, preventing the macOS `DARWIN_USER_TEMP_DIR` `confstr()` warning. The result oracle
still requires exit `1`, empty stdout and exactly `NETWORK_EXECUTION_NOT_AUTHORIZED_BY_WP121` on
stderr. No warning or other diagnostic is filtered or reinterpreted.

WP-128 adds a pre-key helper-resolution control. The caller supplies an explicit absolute
repository root; the control resolves the published invocation helper from a fixed
repository-relative path, verifies its SHA-256 and required exports, and only then reports a
preflight pass. It does not generate keys or authorize signing, network, acquisition or runtime
work. Paths containing spaces are supported without shell evaluation; relative or wrong-depth
roots and hash drift fail closed.

