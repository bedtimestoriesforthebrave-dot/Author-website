# ReorderOps: a guide for testers and reviewers

This guide explains the application without assuming a software-development background. It describes what works now, what is planned, and what to look for when testing.

## What is ReorderOps for?

ReorderOps is being built to help an inventory planner answer three questions:

1. Which products might need attention?
2. What evidence supports that conclusion?
3. What action should a person review before an order is prepared?

Imagine a store that sells filters. Having 20 filters on a shelf might be fine if the store sells one per day, but urgent if it sells ten per day. Even then, another order might be unnecessary if a confirmed delivery will arrive tomorrow. ReorderOps is designed to make those differences visible.

This is a portfolio demonstration, using historical retail observations. It is not connected to a real store or supplier.

The public staging profile uses fully generated inventory history instead of the private retail
CSV. Its shared showcase is read-only; no-signup temporary visitor sessions now support isolated
approval/rejection, drafts and audit. Planning-run creation remains blocked publicly. Guarded
paid AI is enabled only inside visitor sessions, with deterministic fallback at quotas/failures.
Hosted checks pass; language reliability and live financial reconciliation remain qualified.
See [public demo controls](public-demo-controls.md).
The working local capabilities
described below remain available. Temporary hosting is verified at
https://reorder-ops.vercel.app; post-wake readiness follows a user-observed Sleeping state.
Cold-start timing, usage and final launch remain qualified. See
[the staging guide](deployment.md).

## What works in this version?

You can view one store's inventory, search and filter its products, sort them by recorded stock or sales coverage, and select a product to inspect its history and calculations. These are read-only actions: they do not change stock or place orders.

The planning date is **30 January 2024**. The source file contains daily observations from January 2022 to January 2024. The application does not pretend these are today's business figures.

| Capability | Current status |
| --- | --- |
| Inventory overview, filters, and sorting | Working |
| Product evidence and historical chart | Working |
| Exact daily values behind the chart | Working |
| Sales coverage calculation | Working |
| Generated supplier policies and daily stock projections | Working, synthetic operational inputs |
| Deterministic recommendations and saved planning runs | Working |
| Approve/reject and purchase-order drafts | Working locally and in isolated anonymous hosted sessions |
| Audit history | Working, successes and blocked attempts |
| Operations Assistant and backend evidence cards | Working with deterministic fallback; baseline and expanded evaluations recorded, semantic/language limitations remain |

Planned features are described below to explain the project's direction. They should not be counted as working when reviewing this release.

## Reading the overview

**Products monitored** is the number of distinct source items at Store S001: 20. The source file includes five stores, but this first version deliberately concentrates on one.

**Below usual cover** counts items whose stock, measured in days of recent sales, is below the 25th percentile of that same product's historical coverage. It is a cue to inspect the product. It is not an instruction to buy.

**Recorded inventory** adds the units recorded for the selected store on the planning date. Products can be different sizes or prices, so this number is a count of units, not a financial valuation.

**Source history** tells you how many daily dates are present in the file. The importer keeps all five stores' observations, even though the screen shows S001.

In the table:

- **SKU** means a product identifier. ReorderOps includes the store in it, such as S001-P0001, because a source ID can describe different categories at different stores.
- **Stock** is the source's recorded quantity on the planning date. For this demonstration we treat it as stock at the beginning of that day. The source does not document the timing, so this is an assumption.
- **Daily sales** is the average number of units sold per calendar day over the previous 28 days, excluding the planning date.
- **Cover** is the number of days that stock would last if sales continued at that average rate, without further deliveries.
- **Review band** compares today's cover with the product's own past year. **Below usual** means below the 25th percentile; **Above usual** means above the 75th percentile; anything between, including the boundaries, is **Usual**. Ties count as half when calculating rank. The small "usual" figure under Cover is the product's median cover over that year. These bands do not account for suppliers or delivery times.

Why compare with the product's own history rather than a fixed number of days? Recorded coverage is usually below one week. Some products normally run at about 1.5 days and others at about 5. A single cut-off would mostly separate lean products from well-stocked ones, rather than pointing out what is unusual today. Recorded coverage alone does not establish how often deliveries occur. Supplier lead times inform the separate procurement planning rules.

If a required input is missing, the result should say it is unavailable. It must not turn missing information into a healthy-looking zero.

## Following the product evidence

Select a SKU to see its stock, average daily sales, and the coverage calculation. As an illustrative example, 100 units of stock divided by 10 units sold per day gives 10 days of coverage. The app uses the selected product's actual source values, not this example.

Below the calculation, **Compared with its past year** states how today's cover ranks against the previous 365 days, for example "at the 8th percentile of historical coverage", and gives the product's usual (median) cover. Extreme ranks are described as below the 1st or above the 99th percentile. If fewer than 180 past days can be compared, the app says so and shows no band.

The history chart shows recorded inventory and daily sales for the previous 56 completed days. It is a picture of observations, not a forecast. Open **View the exact daily observations** to inspect the numbers behind it. A promotion indicator tells you whether the source marked that day as promotional; it does not prove a promotion caused higher sales.

If stock was zero during the 28-day calculation window, the app displays that fact. A store cannot sell an item it does not have, so recorded sales may understate customer demand. This source does not let us calculate how many sales were lost.

## Why calculations and AI have different jobs

Calculations are performed by ordinary, repeatable software rules. Given the same data and policy, they should give the same answer. A tester can inspect the inputs and follow the arithmetic.

The optional AI assistant retrieves those results through a small set of controlled lookup functions. Its job is to explain evidence and suggest which existing recommendation to review. It does not decide the authoritative order quantity, approve its own proposal, or write directly to the database.

For example, a question such as "What needs attention?" produces an explanation linked to the relevant products and evidence. A proposal card then gives the person a place to review the backend's recommendation. If no AI service is configured or it fails, a deterministic text explanation remains available. The project is usable without a paid AI account.

## Inspecting procurement planning

Open **Procurement planning** and choose either **Imported sales + generated operations** or **Five fixed synthetic scenarios**, then **Calculate and save run**. Imported runs use S001's historical observed sales. All suppliers, policies, opening balances, and POs are generated; fixed scenarios also use synthetic demand. These are not real company purchasing records.

Select a planning SKU to inspect its status, recommended quantity, receipt dates, daily net-stock projection, and saved calculation inputs. The full structured evidence is available in expandable panels. The saved-run selector restores previous evidence. Unchanged inputs and versions within the same workspace reproduce the business result; after simulation edits, the seed alone does not restore fixtures. Explicit reset creates a fresh workspace while preserving prior history. Run IDs and actual save timestamps intentionally differ.

Planning uses a complete 28-day observed-sales average. Missing days block calculation, zero demand never creates an infinite coverage value or MOQ purchase, and demand changes are reviewed using a separate seven-day versus preceding 28-day comparison. Receipt dates are applied before each day's demand. Negative projected net stock represents accumulated unmet demand. The projection excludes the proposed order, so issuing a recommendation does not make a shortage disappear. Full formulas and replay commands are in [the planning rules](planning-rules.md).

## Human-controlled purchasing in V4

A **planning run** checks products against the same historical date and policies, then saves the findings. It is a batch review, not placing orders. **Lead time** is ordering-to-receipt time; **safety stock** is a buffer; **MOQ** is the supplier minimum; **order multiple** is its allowed increment. A minimum of 120 does not mean all quantities must be multiples of 120.

Select an actionable SKU, then **Review approval**. The confirmation shows quantity, supplier, MOQ/multiple, simulated order date, estimated receipt, stockout date and all warnings. Acknowledge every warning and optionally add a reason before **Confirm and create draft**. ETA uses policy lead time, not a supplier commitment. The identity is the server's placeholder **demo-user**, not an authenticated account.

**Planning results are advisory snapshots. Operational actions always validate current state before execution.** Approval rereads relevant stock, inbound, demand and terms, then reruns the same deterministic calculation. Changed evidence blocks approval with a specific message. Locally, calculate a new run and inspect its evidence; in the public demo, where runs cannot be created, start a new demo session to get current evidence. The app never silently approves a refreshed quantity. The [README stale-state walkthrough](../README.md#review-and-act-in-v4) uses an auditable demo CLI stock edit.

**Reject recommendation** records an optional reason and no draft. The decision is final for that run/SKU; a later run can be reviewed separately. Old V3 runs and retired simulation workspaces are read-only. A review-required demand anomaly cannot be approved: acknowledgement/reason alone does not resolve it. That override is deliberately deferred.

Approval creates an internal **purchase-order draft**, sends nothing to a supplier, and does not add confirmed supply. Repeated requests return the original result. A new run cannot create a second active draft for the same product in the same workspace. The UI shows that existing draft separately from saved calculation evidence.

Open **PO drafts** to follow the source recommendation, validation, actor/time, reason, MOQ/multiple and audit evidence. **Audit trail** shows readable event names and expandable structured metadata for successful decisions and blocked attempts. Actual event timestamps are separate from simulated business dates. Audit rows are append-only in the app and database; someone with direct file/schema access can still tamper with the database.

## The five fixed demonstrations

| Situation | Expected behavior |
| --- | --- |
| FILTER-420: stock runs out before normal delivery | Recommend 210 units and flag expediting review; the normal order cannot prevent the earlier shortage |
| BELT-210: low stock, timely confirmed supply | `COVERED_BY_INBOUND`, zero duplicate purchasing quantity |
| MOTOR-12: supplier deliveries take longer | `SUPPLIER_RISK`, five lines average 21 days vs nominal 14; no automatic policy change or oversized order. With low stock the order is still recommended, with a supplier warning |
| VALVE-88: requirement below supplier minimum | Raw requirement 75 units becomes 120 units because of MOQ |
| BEARING-51: recent sales rise sharply | `REVIEW_REQUIRED`, zero automatic purchasing quantity; no approval-to-draft path; anomaly resolution/override remains deferred |

These use fixed scenario inputs so every tester can reproduce them, independently of the general generator seed or CSV. Their demand and operational data are synthetic and labeled. The downloaded CSV's origin and license still need verification; we do not claim it is real operational history.

## What happens behind the screen?

| Part | What it does | Why it exists |
| --- | --- | --- |
| Web interface | Displays products, charts, and review controls | Lets a person inspect evidence comfortably |
| Backend | Answers inventory requests, calculates/saves runs, and validates human-approved actions | Keeps business rules in one place |
| Database | Stores observations, immutable snapshots, simulation state, decisions, drafts and audit | Makes saved results consistent and traceable |
| Importer | Checks the source and loads it without editing the original | Avoids duplicate records and silent data corrections |
| Calculation functions | Work out historical sales coverage, stock projections, and replenishment | Makes the arithmetic repeatable and testable |
| Optional AI adapter | Converts controlled evidence into an explanation | Adds useful interpretation while preserving the action boundary |
| Automated tests | Check important examples and failure cases | Helps prevent changes from breaking expected behavior |

The original data stays in `Data/Raw/`. A separate local database can be rebuilt from it. Repeating setup should not duplicate the observations.

## A five-minute review of the current version

1. Open the public demo (or start the local app using its README). Confirm the historical date and Store S001 are visible.
2. Confirm the overview shows 20 products. Search for a SKU and filter by a category.
3. Keep the default sort, **Most below usual**, select the top item, and follow its displayed division and past-year comparison. A rounded screen value can differ slightly from a calculation using the full underlying average.
4. Open the exact daily observations. Confirm history stops on 29 January 2024 and that the chart corresponds to those observations.
5. Try a search with no matches. It should show an empty state and let you clear the filters.
6. Use the keyboard to reach filters and SKU buttons. Resize the window and check that the table remains usable.
7. Reload a page after selecting a product. The selected product should be preserved in the page address.
8. Open Procurement planning. In the public demo, start a visitor session and select its saved fixed scenarios; locally, save the five fixed scenarios in an initialized workspace, and inspect VALVE-88’s 75-to-120 MOQ evidence. Confirm BELT-210 has no approval action and BEARING-51 shows its held calculated need. Previously edited scenarios need the README’s explicit reset to restore fixtures.
9. Review FILTER-420, acknowledge expediting, and create one internal draft. Inspect PO drafts and its linked audit history. Reload the planning page: APPROVED persists. Locally, save another run: the existing draft blocks a duplicate purchase. Public run creation is blocked.
10. Reject another recommendation with a reason. Locally, follow the stale-state walkthrough in the README, confirm a stale approval creates no draft, and inspect the blocked audit event.

Report a bug with the selected SKU, filter/sort choices, expected result, actual result, and a screenshot if helpful. Particularly useful feedback includes unclear labels, mismatched evidence, inaccessible controls, and errors presented as valid data.

## Current limitations

This release has persisted synthetic operations, deterministic planning, saved evidence, approval/rejection, internal drafts, audit and an optional read-only AI assistant. It has no live operational integration, anomaly override, draft cancellation/submission, receipt workflow or authentication. Drafts remain active; reset creates a separate simulation while preserving old history. Historical cover excludes incoming supply; planning projections use generated dated receipts and assume a constant observed-sales rate. Source inventory timing and provenance are not verified. Demo risk thresholds and synthetic inputs are not calibrated purchasing policies. It is intended for demonstrating and testing the workflow, not for managing real purchases.

## Reviewing the V5 assistant

Open **Operations Assistant** and select a saved fixed-scenario run. Try the seven
starter questions. FILTER retains the saved 210-unit result and expediting warning;
BEARING retains its purchasing hold and calculated requirement without an approval
path. Supplier and inbound cards preserve their evidence. Draft/history questions
show existing human actions without pretending a draft is incoming supply.

Ask “Approve FILTER-420”: the assistant performs no action and links the human review
screen. Ask about UNKNOWN-9: it must not invent a product. A previously changed SKU
shows stale evidence even if its final MOQ quantity is unchanged. Changing the selected
run clears conversation and pins a different evidence context explicitly.

Without provider configuration, the label says **Deterministic explanation** and
backend cards remain usable. Provider setup and the opt-in live evaluation are in
[the V5 guide](v5-assistant.md). The [first live-model baseline](v5-live-evaluation.md) passed eleven cases on 1 October 2026.
AI prose still requires review, even when its evidence references are valid.
The [expanded evaluation](v5-live-evaluation-expanded.md) records 63 initial and ten corrective
generations, fixes for identifier/absence handling, and remaining semantic/language failures.
