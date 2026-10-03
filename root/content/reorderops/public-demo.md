# Isolated public actions and guarded AI

Implemented and verified locally on 2 October 2026, then pushed with user approval as `afa5ea8`.
Both public hosts expose the new code; **visitor sessions/actions are enabled and verified;
guarded paid AI is enabled in visitor sessions**. Hosted quota/isolation and browser checks
pass; manual review found a Finnish language failure and live financial reconciliation remains
pending. See [hosted AI findings](v6-hosted-ai-evaluation.md).
The hosting dashboard's deployed commit was not independently read. Staging defaults remain
read-only with paid AI disabled. These
controls extend V4/V5 without changing planning-v1.3, synthetic-operations-v2 or migration 0004.

## Visitor experience and storage

Visitors choose **Start my demo session**, without signup. The backend takes a consistent SQLite
backup of the synthetic showcase into a separate visitor database. Inventory, saved scenarios,
decisions, drafts, audit and assistant evidence all use that visitor's database. V4 current-state
validation, warning acknowledgement, duplicate prevention, idempotency and append-only audit
triggers remain in force. Drafts send nothing to suppliers and never count as confirmed supply.
Public planning-run creation, operational edits and resets remain blocked.

The token is a random 256-bit bearer capability; only its SHA-256 hash is stored server-side.
The frontend keeps the token in tab-scoped `sessionStorage` and sends it in `Authorization`,
never in URLs or cookies. Starting/ending a session clears cached page context by reloading;
ending or expiry returns to the read-only showcase. This is anonymous access to disposable
synthetic data, not real-account authentication. Anyone holding a token can use that session.
The server requires an exact configured Origin for session creation and token-bearing POSTs;
CORS/Origin checks constrain browsers, but direct callers can supply an Origin themselves.

| Bound | Policy |
| --- | --- |
| Lifetime | 24 hours, fixed rather than sliding |
| Stored visitor copies | At most 24; crash-orphan copies count until cleanup removes them |
| New sessions | 50 per UTC day across all visitors |
| Action attempts | 30 per session, including failed attempts and retries |
| Database size | 4 MiB guard before copying or admitting an action |
| Global HTTP traffic | 120 requests/minute in the one process; excess gets 429 |
| Request body | Existing 64 KiB pre-parse limit |

Storage lives beside the showcase: a separate control database plus generated visitor databases. The control database owns schema version 1; it is separate from the application
Alembic history. No new service, volume, worker, background timer or keep-alive is required.
Visitor engines use `NullPool` and dispose connections after requests. Cleanup runs on the next
session creation, skips databases with in-flight requests, and removes only exact expired visitor
files and their SQLite sidecars. Ending a session expires it immediately; removal can wait until
that next creation. The showcase and local V4 history are preserved. Cleanup discards whole
disposable databases instead of weakening their audit triggers. Control/AI records older than
45 days are pruned during cleanup; current-month spending and unexpired leases remain intact.

Capacity exhaustion leaves the showcase available and refuses new sessions. A crash between
copying and registering a session can leave an unregistered copy. The same cleanup removes it only
when its name is an exact generated identifier (32 lowercase hex characters plus `.sqlite3`), it
has no control-database row, it has no in-flight request, and neither it nor any SQLite sidecar
was modified in the last hour (`ORPHAN_GRACE_SECONDS`). Other names, symlinks, recent or
in-use files are left for operator review. Until removed, orphans consume capacity. The HTTP limiter resets on process restart; durable
session/action/AI quotas do not. Creating another session evades a per-visitor quota, but not
global session, traffic, concurrency or spend bounds. This deliberately small anonymous demo
does not provide user identity, a WAF or protection against sustained distributed denial of service.

## Public AI admission and accounting

Public AI requires a valid visitor session and all explicit enable flags. Shared-showcase
questions still return deterministic evidence. The assistant remains read-only even in a visitor
session; purchase decisions still require the human confirmation screen.

| Bound | Policy |
| --- | --- |
| Daily allowance | $0.50 per UTC day |
| Monthly allowance | $4.00 per UTC calendar month; adjustable backend variable |
| Questions | 100 admitted globally/day, 10 per visitor/day |
| Concurrent question | One, admitted atomically across threads/restarts |
| Model and tier | Exact `gpt-6-luna`, OpenAI API endpoint, Standard/default tier |
| Input | At most 20,000 counted tokens per generation |
| Output | At most 1,200 tokens per generation, including reasoning/formatting |
| Orchestration | Existing four rounds/eight tools, 30-second question timeout, no SDK retries |

Before provider work, a short SQLite `BEGIN IMMEDIATE` transaction checks all quotas and charges
the full worst-case four-round reservation: **$0.0155**. It also records a concurrency lease.
There is no database transaction held during a model await. Before each generation, the
[Responses input-token endpoint](https://developers.openai.com/api/docs/guides/token-counting)
counts the same input, instructions, tools and output schema. An over-limit input or UTC-day
change prevents generation.

Settlement sums returned usage across all rounds, refunds unused reservation only when usage
is known, and retains the full reservation for timeout, cancellation, missing usage or process
crash. An expired crash lease releases concurrency, not reserved spending. Unexpected model,
tier or token bounds persist an accounting block across restart and require operator review;
there is no browser/admin reset endpoint. SQLite admission failure falls back to deterministic
evidence without calling the provider. Failed settlement leaves the original reservation charged.

Accounting uses integer micro-USD and conservatively estimates Standard text/function usage
at $0.125/M input (cache-write upper rate), $0.50/M output, plus 25% headroom, with no cache
discount. Rates were checked against the [model page](https://developers.openai.com/api/docs/models/gpt-6-luna).
This is an application estimate under those reviewed rates, not a guarantee about the provider's
invoice, taxes, future tariff changes or usage by other applications on the same account.
The prepaid balance is a separate safeguard, not the admission mechanism. A model/tariff change
requires review of the allowlist, reservation and tests before public use.

The ledger stores identifiers, UTC periods, state and token/cost metadata, not prompts, response
prose, tool output, credentials or IP addresses. Existing browser conversation history stays in
memory. Provider usage observations are allowlisted metadata; staging access logs stay disabled.


## Verification scope and limitations

Offline tests use disposable synthetic databases and mocked SDK HTTP; no real credentials or
billable model calls are used. They cover two visitors plus unchanged showcase fingerprints,
draft/audit/assistant isolation, replay/hold rules, expiry, in-flight cleanup, storage/action limits,
independent daily spend/personal/global quotas, monthly rollover, concurrent admission, retained
crash/timeout reservations, accounting anomalies, exact token preflight, and fallback.

The local browser exercised session creation, FILTER-420 warning acknowledgement, a 210-unit
internal draft with visitor actor and linked audit, then session end and an empty shared draft
list. This is local proof only; the hosted checkpoint and live-provider accounting are still pending.
