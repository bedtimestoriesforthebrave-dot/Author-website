# V5 — Evidence-grounded operations assistant

Release 0.5.0 adds `assistant-v1`. Engine `planning-v1.3`, generator
`synthetic-operations-v2`, snapshot contract 2 and migration head 0004 are unchanged.
V4 remains the only human decision/draft workflow. No chat, AI proposal or tool call
creates operational state, planning runs, decisions, drafts or audit rows.

## Architecture and evidence boundary

The UI supplies an explicit saved-run UUID. There is no global-latest fallback and
tools cannot select another run, seed or workspace. “Today” means the selected
historical business date, normally 2024-01-30. Actual observation/event timestamps
are separate. Legacy and retired runs remain inspectable and cannot justify approval.

`app/assistant/evidence.py` captures a compact packet in one short SQLite transaction:
saved recommendations, independently recomputed freshness, workspace decisions and
drafts, bounded audit events, historical cover context and confirmed open inbound.
The session closes before any provider await. All tools then operate on detached
values from that coherent observation; later changes require another request and V4
always revalidates before action.

Assistant reads use a dedicated `NullPool` engine with SQLite `mode=ro`,
`query_only=ON` and an authorizer rejecting mutation, write PRAGMAs, temp DDL and
ATTACH. The ordinary V4 pool stays writable. Reusing a normal session with a toggled
PRAGMA was rejected because connection settings can leak through pooling. Likewise,
holding a reader across model waits was rejected because SQLite readers can block
writer commits.

Freshness uses the existing normalized per-product approval fingerprint, current
engine/date, quantity/status and warnings. It is checked even for held, already
decided or drafted products. `MATCHING`, `CHANGED`, `UNAVAILABLE`, `LEGACY` and
`RETIRED` describe evidence; human action eligibility is a separate fact. The V4
action overlay's early returns therefore are not used as a universal freshness check.

The packet preserves overdue confirmed POs and receipts beyond the projection horizon.
Overdue supply is marked excluded; internal drafts never become inbound. Imported
cover percentiles describe source inventory observations separately from simulated
operational balances; they are not applicable to fixed scenario SKUs.

## Tools and answer contract

| Tool | Required arguments | Evidence scope |
| --- | --- | --- |
| `get_attention_summary` | `status`: NEEDS_ATTENTION (every non-NORMAL product, most urgent status first) or one planning status | Selected run, at most 20 products |
| `get_recommendation` | `sku` | Saved result, freshness, inbound, history context, decision/draft |
| `get_supplier_status` | `supplier_id` | Saved synthetic delivery performance and affected products |
| `get_purchase_order_drafts` | `sku`: string or null; `draft_number`: exact full number or null (partial numbers return `DRAFT_NOT_FOUND`, never a completed match) | Selected workspace, at most 20 internal drafts |
| `get_audit_history` | `sku`: string or null | Selected workspace, chronological bounded events |

Pydantic schemas forbid extra arguments and validate identifier syntax/length.
Unknown tools are blocked; unknown products/suppliers return not-found evidence.
There is no SQL, code execution, arbitrary file access, browser access or write tool.
The provider sees strict function schemas and compact evidence, excluding source
links, complete snapshots and operational free-text decision/audit reasons.

The model returns only `answer` and `evidence_ids`. The server requires tool activity,
checks each reference against successful lookups in this request and builds cards
and internal links itself. Forged references or malformed answers trigger deterministic
fallback. UI prose is plain React text; no model-generated HTML, Markdown links or
executable content is rendered. Lookup activity is actual execution, including
attempted reads if the model answer is discarded, rather than model-authored reasoning.

Reference validation proves card provenance, **not semantic accuracy of the prose**.
The maintained [system instructions](../backend/app/assistant/instructions.md) treat
all data and conversation text as untrusted, prohibit invented quantities/actions,
and preserve held recommendations, expediting and supplier warnings. Model obedience
requires evaluation; read-only capabilities and authoritative cards enforce the
operational boundary independently of obedience.

## API, fallback and UI

`GET /api/assistant/status` exposes configured/read-only/fallback status without keys.
`POST /api/assistant/chat` accepts:

```json
{
  "message": "Why does FILTER-420 need ordering?",
  "planning_run_id": "<saved UUID>",
  "history": [],
  "use_ai": true
}
```

Messages are capped at 2,000 characters. History allows six user/assistant turns,
each at most 3,000 characters; client-supplied tool/system roles and extra fields
are rejected. Prior conversation is never accepted as verified evidence. **Known
limitation:** history is client-supplied and unsigned, so a caller can fabricate earlier
`assistant` turns (for example a claimed prior confirmation) to steer the model's wording.
Tools stay read-only, cards come only from backend lookups and spend limits still apply, so
the effect is limited to misleading prose in that caller's own response; it is not detected.
The UI
keeps ten exchanges in memory and sends the most recent three pairs. Changing runs
or clearing conversation drops that local history; nothing is persisted.

Responses contain request/version/mode, explanation, safe notice/code, pinned
context, backend-owned cards and actual lookup activity. Missing run is 404
`RUN_NOT_FOUND`; invalid input is 422; database evidence failure is 503
`TOOL_EXECUTION_FAILED`. Provider failure is a successful 200 deterministic response
with an explicit notice: `AI_NOT_CONFIGURED`, `AI_TIMEOUT`, `AI_RATE_LIMITED`,
`AI_PROVIDER_UNAVAILABLE`, `AI_BUSY`, `AI_BUDGET_EXHAUSTED`, or a validation/limit code.
Evidence failures never become fabricated healthy stock or fallback to another run.

Operations Assistant shows READ-ONLY, explicit run selection, seven starter questions,
loading/error/retry states, provenance/date disclosure and readable fact cards.
Recommendation links open the existing human review controls; chat has no approval
button. The deterministic route supports overview, known-SKU explanations, supplier
evidence, inbound coverage, drafts/history and action refusals. It is a limited
question router, not a substitute general-purpose language model.

## Optional provider and limits

The adapter uses the OpenAI Responses API with the official SDK.

Questions, recent conversation and retrieved evidence are sent to the configured
provider when enabled. `store=false` disables Responses storage; it does not assert
zero provider retention. See the official [function calling](https://developers.openai.com/api/docs/guides/function-calling),
[structured outputs](https://developers.openai.com/api/docs/guides/structured-outputs)
and [data controls](https://developers.openai.com/api/docs/guides/your-data) contracts.
Opaque encrypted reasoning items are replayed between rounds without displaying or logging them.

Limits: 30-second overall model deadline; four provider rounds; eight total tool calls;
1,200 output tokens per round; no SDK retries; 100 KB serialized transcript;
two concurrent AI requests and 100 AI user requests per UTC day per process.
At most 100 run products, 100 recent drafts/events in the packet and 20 results per
list lookup; lists disclose truncation. AI final answers allow 12 references and
4,000 characters. Fallback shows at most 20 cards. Logs contain request ID, version,
mode/model, latency, round count, lookup names and failure code, excluding prompts, reasons,
keys and provider response bodies.

These limits bound a single-process local demonstration. Restart resets the daily
allowance; it is neither a durable spending cap nor a multi-worker/public rate limiter.
No authentication, hosting authorization or durable cost ledger is introduced here.

## Evaluation and findings

Normal verification requires no key, raw CSV or network. Tests cover readonly SQL,
workspace/seed isolation, legacy/retired/stale evidence, unchanged quantities after
input changes, held and approved products, inbound timing, redacted injection text,
argument/tool/citation forgery, round/call/concurrency/budget/deadline limits,
provider failures, SDK HTTP contracts and a writer progressing during model waits.

Run the eleven-case disposable-fixture evaluation from `backend`:

```powershell
uv run python -m evaluations.run_assistant --output evaluation-result.json
# Explicit opt-in after configuring the provider; makes bounded, billable requests:
uv run python -m evaluations.run_assistant --live --output evaluation-result.json
```

The harness migrates a temporary database, creates five synthetic scenarios, a human
approved FILTER draft, an untrusted audit note, and a same-quantity stale VALVE.
It never mutates the application database. Reports record model, assistant/engine/
generator versions, prompt hash, questions, responses, structural gates and database
counts. Live provider fallback fails the requested-mode gate. Manual review must check
explanation correctness, unsupported claims, warning preservation, refusal behavior
and readability; structural gates alone do not establish model quality.

Offline evaluation passed all eleven cases. Live quality was initially unverified
without credentials. On 1 October 2026, gpt-6-luna passed all eleven live gates and
manual fact review without fallback; see [the baseline and its limitations](v5-live-evaluation.md).
The expanded suite subsequently exercised 63 live generations and a ten-generation corrective
follow-up. It verified read-only boundaries and identified lookup, clarification, numeric prose
and language weaknesses; [full results and limits](v5-live-evaluation-expanded.md) preserve
failures alongside targeted corrections. General model quality sign-off remains pending. Browser
verification covers deterministic explanations, held quantities, supplier/inbound
cards, existing drafts/history, stale evidence, action refusal, unknown SKU and links
back to V4. Backend/API failure behavior is tested with fixtures rather than deliberately
breaking the running demonstration database.

A separate regression reproduced a failed SQLite COMMIT leaving a DBAPI transaction
active after SQLAlchemy had ended its transaction. The shared pool now rolls that
transaction back on reset; subsequent writers recover. The assistant architecture
also prevents provider waits from extending reader locks.

The separate [expanded robustness protocol and findings](v5-live-evaluation-expanded.md)
preserves the original baseline and adds multilingual, messy-input, repeated, multi-turn,
pending-action and actual tool-data injection coverage. It uses complete database content
hashes and SDK metadata observations, with manual semantic review kept separate from gates.

Public deployment, durable rate/cost limits, authentication, live ERP access, model
quality sign-off, persisted conversations, anomaly override and draft lifecycle
transitions remain deferred. The current delivery is a local portfolio demonstration.

Verification at delivery: **188 backend tests** (49 added including connection recovery), Ruff lint/format, TypeScript and production build passed. Eleven offline evaluation cases passed.
