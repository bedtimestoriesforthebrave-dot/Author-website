# Deterministic procurement planning (engine planning-v1.4, V4 state)

## Data boundary and architecture

Imported runs use S001's historical `Units Sold` observations. The source CSV's origin and license remain unverified; it is not claimed to be real company data. The undocumented `Demand` column is not forecast ground truth. `Units Ordered` is not a confirmed PO.

Suppliers, policies, opening balances, reservations (zero), and dated POs are **synthetic**. The generator uses seed 420 by default and version `synthetic-operations-v2`. Each product draws from its own random stream seeded by the run seed and SKU, so one product's history never changes another's generated operations. Equal source inputs, versions, date, and seed reproduce equal business results. The five named fixtures are independent of the seed and imported data, and their demand history is also **synthetic**.

Historical inventory snapshots do not form a reliable stock ledger. Simulation starts from a generated opening balance, with only generated receipts and estimated sales changing it. Historical zero-stock dates provide a warning about potentially censored sales; they never set simulation balances. Completed synthetic POs are delivery-performance examples, already reflected in the opening balance and never added a second time.

`app/planning.py` contains pure business functions. `app/operational_data.py` generates initial fixtures. `app/operational_state.py` initializes and reads persisted workspaces; `app/planning_service.py` saves calculations. FastAPI and React expose the evidence. Each `planning_runs` row retains a complete JSON snapshot plus indexed identity metadata. V4 introduces workspace-scoped mutable suppliers, policies, balances and POs for approval-time validation; action decisions, drafts and audit remain separate from calculation snapshots.

## Demand and policy

- Planning date is fixed at **2024-01-30**, independently of the actual UTC save timestamp.
- Baseline is the arithmetic mean of the preceding 28 calendar days of observed sales, excluding planning-date and future observations. All 28 days are required. Genuine zero-sales days count; missing days do not become zero. Negative, non-finite, or duplicate daily inputs block calculation.
- Zero baseline has no infinite coverage, no stockout under the baseline, and no automatic minimum order. It is reported with `NO_RECENT_SALES`.
- Demand anomaly compares the last seven completed days against the **preceding, non-overlapping 28 days**. A flag requires both at least a 1.5× ratio and at least five additional units/day. A zero comparison baseline uses the absolute increase requirement. Both thresholds are compared exactly using the integer sales totals (engine `planning-v1.4`); earlier `planning-v1.3` compared floating-point averages and could miss an increase of exactly 5.0 units/day (e.g. 61 vs 104 units) or a ratio of exactly 1.5 (e.g. 150 vs 400 units). Reported averages are unchanged. Fewer than 35 complete days yields `REVIEW_REQUIRED` even if the 28-day purchasing baseline is usable.
- Supplier deterioration uses the five latest fully received synthetic lines, completed strictly before the planning date. Mean actual lead time must increase by both at least three days and at least 25% over nominal. Fewer than five lines produces an insufficient-evidence warning. A flag does not change the lead-time or safety-stock policy.

Policy terms must be ones the supplier accepts: a policy MOQ below the supplier's MOQ (`POLICY_MOQ_BELOW_SUPPLIER`) or an order multiple that is not a multiple of the supplier's (`POLICY_MULTIPLE_INCOMPATIBLE`) blocks the calculation as a data-quality issue rather than being silently corrected. Stricter terms (a larger MOQ, or 10 against a supplier's 5) are allowed. A policy lead time shorter than the supplier's nominal lead time adds `POLICY_LEAD_TIME_BELOW_SUPPLIER` without blocking, since it may be deliberate; a longer one is a buffer and is allowed.

The fixed parameters are saved with every run. These are transparent demo policies, not calibrated service guarantees or ML forecasting.

```text
available_stock = on_hand - reserved
lead_time_demand = average_daily_demand * policy_lead_days
safety_stock = ceil(average_daily_demand * safety_days)
reorder_point = ceil(lead_time_demand + safety_stock)
target_days = policy_lead_days + review_days
target_stock = ceil(average_daily_demand * target_days + safety_stock)
inventory_position = available_stock + qualifying_inbound_quantity
requirement = max(0, target_stock - inventory_position)
final_quantity = multiple * ceil(max(requirement, MOQ) / multiple)
```

The last formula applies only when an order is eligible and requirement is positive; otherwise final quantity is zero. MOQ and order multiple are separate constraints. Evidence retains the raw requirement, MOQ adjustment, final quantity, and which constraints changed it. Orders use whole units; sizing uses exact fractions of the integer sales totals so floating-point rounding cannot add a spurious unit at a ceiling boundary. Displayed averages and the daily net projection retain fractional units.

## Receipt timing and projection

The cutoff is the start of the planning date. Receipts completed strictly before it reduce outstanding quantity; future actual receipts do not leak into replay. Confirmed supply for the same product counts regardless of which supplier ships it. Orders placed after the cutoff, drafts, cancelled orders, and other products' orders do not contribute supply. A future completed receipt is treated as still outstanding at the cutoff, using its expected date rather than knowledge of its future actual arrival.

Confirmed outstanding supply due from the planning date through `planning_date + target_days - 1` qualifies for order sizing. A wider projection horizon includes dated receipts through at least 60 days (or the target period if longer). Evidence distinguishes horizon-wide inbound from sizing-eligible inbound. An overdue PO without a revised ETA is excluded and requires review; it is not treated as available today.

Each projected day starts by adding receipts due that day, then subtracts the constant demand baseline. Exact zero at day end is not unmet demand. The first negative closing balance (below a 1e-9 floating-point tolerance) is the projected stockout date. Negative net stock accumulates unmet demand; it is not physical negative inventory or a calibrated lost-sales forecast. The proposed new order is excluded from the authoritative projection, so a recommendation never makes an existing shortage disappear.

## Status precedence

1. Missing/invalid demand, balances, policies (including terms the supplier would reject), or POs: `DATA_QUALITY_ISSUE`, no order.
2. Demand anomaly, overdue PO, or insufficient anomaly history: `REVIEW_REQUIRED`, no order.
3. A shortage inside the target period despite sufficient aggregate inbound: `REVIEW_REQUIRED`, review existing PO timing rather than duplicate purchasing.
4. Positive requirement with inventory position at/below the reorder point **or** a shortage within the target period: `REORDER_REQUIRED`; size to target, then apply MOQ and multiple. Supplier deterioration does not suppress a required order; it remains a warning, and the policy lead time is not inflated.
5. Sufficient supplier deterioration evidence when no reorder is triggered: `SUPPLIER_RISK`, zero order and no policy change.
6. Timely inbound covers the target period while opening stock is at/below the reorder point: `COVERED_BY_INBOUND`, no duplicate order.
7. Inventory position below target without a trigger: `WATCH`; otherwise `NORMAL`.

A stockout before a new order's nominal arrival date adds `REVIEW_EXPEDITING` independently of the main status. `NORMAL` and `COVERED_BY_INBOUND` describe the current target period, not unlimited coverage over the entire 60-day display. Risk warnings are preserved even when another status takes precedence. When `REVIEW_REQUIRED` holds back an order, the UI still shows the calculated requirement so the reviewer sees the size of the decision. Historical cover percentile is a separate descriptive metric and is never a purchasing status.

## Fixed demonstrations

| SKU | Fixed input / important evidence | Expected result |
| --- | --- | --- |
| FILTER-420 | 30 units, 10/day, 14-day lead time, no inbound | `REORDER_REQUIRED`, 210 units; stockout 2024-02-02, review expediting |
| BELT-210 | 20 units, 10/day, 250 inbound on 2024-01-31 | `COVERED_BY_INBOUND`, zero order; no unmet demand within the 21-day target period |
| MOTOR-12 | Five completed lines at 20–22 days vs nominal 14 | `SUPPLIER_RISK`, mean 21 days; unchanged policy and zero order (stock is above the reorder point; with low stock the same supplier yields `REORDER_REQUIRED` plus the deterioration warning) |
| VALVE-88 | 65 units, 5/day, target 140, MOQ 120, multiple 1 | `REORDER_REQUIRED`, raw 75 → final 120, explicit MOQ evidence |
| BEARING-51 | Last 7 days 40/day vs preceding 28 days 10/day | `REVIEW_REQUIRED`, zero automatic purchase |

## Saved evidence and reproduction

`POST /api/planning-runs` accepts `mode` (`imported` or `scenarios`) and an integer `seed` (0–4294967295). It computes and commits one complete run synchronously. `GET /api/planning-runs` lists the latest 20 by default (bounded limit 1–100); `GET /api/planning-runs/{id}` returns its original snapshot. GETs do not create runs. Human-action endpoints are described in [the V4 contract](v4-actions.md). Supplier submission is not implemented.

Each run includes UUID, actual UTC timestamp, historical planning date, mode, source hash/version, generator version/seed, engine version, baseline/risk parameters, every input history sample, policies, starting balances, POs, status counts, and complete recommendation evidence and daily projections. SHA-256 fingerprints canonical business inputs, workspace identity and versions, excluding the run UUID and actual timestamp. V4 snapshots use contract version 2 and include a separate normalized approval fingerprint per SKU; pre-V4 snapshots remain inspectable and read-only. Equal fingerprints and versions reproduce equal calculations; replay uses the captured inputs, not mutable source rows. Schema or calculation changes require version changes; backward-compatible replay across future engine versions is deferred. Runs saved by an older engine remain inspectable, but approval reports `RECOMMENDATION_STALE` and assistant freshness is `CHANGED`; the public bootstrap appends one current run per mode on its next start and keeps the older runs.

From `backend`, after dependencies are installed:

```powershell
uv run python -m app.migrate
uv run python -m app.planning_service --mode scenarios
uv run python -m app.planning_service --mode imported --seed 420
```

The first two commands need no raw CSV. Imported mode requires the historical import prepared by setup. CLI output is the saved run's full JSON; new executions deliberately receive new IDs/timestamps. The UI's **Procurement planning** view offers both modes, seed selection, saved-run inspection, projections, and full structured evidence.

## Decisions to review before AI

Review safety/review periods, anomaly thresholds, supplier sample/threshold choices, status precedence (especially demand anomalies holding back an otherwise required purchase), the receipts-before-demand convention, and the treatment of shortages and late supply. V4 introduces persisted simulation balances/POs, stale-input validation, idempotent approval, and an audit trail without changing engine `planning-v1.3` (since replaced by `planning-v1.4` for exact anomaly thresholds). Draft lifecycle transitions and anomaly override remain deferred. Draft awareness is an action-context overlay; it does not alter the saved calculation or become inbound supply. V5 retrieves deterministic evidence through [controlled read-only assistant tools](v5-assistant.md); it does not determine authoritative quantities or mutate the database.

Operational fixtures are generated on workspace initialization only. Later runs read persisted state, so the seed alone no longer promises the initial result after edits. Reset retires the old workspace; it never overwrites saved evidence. Calculation replay still uses the complete captured inputs.
