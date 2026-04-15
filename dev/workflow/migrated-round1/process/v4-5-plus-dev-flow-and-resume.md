# uDos 4.5+ — dev flow and resume (family)

**Status:** Active companion to [`dev-process-v4.md`](dev-process-v4.md) (2026-04-12).  
**Audience:** Contributors working the **v4.5.1** spec line (vault-native, feeds/spools, language strategy, open-box security, destroy/rebirth intent, cloud/AWS addenda where relevant). **Governance docs** (dev reports, status, meetings, cross-format templates) follow **[`DEV_REPORTS_AND_DOC_TEMPLATES_STRATEGY_LOCKED_v1.md` on uDosDev](https://github.com/fredporter/uDosDev/blob/main/docs/dev/DEV_REPORTS_AND_DOC_TEMPLATES_STRATEGY_LOCKED_v1.md)** — slots **0–7**, `--devonly` / `--current**.

---

## 1. Three places on disk

| Location | Role |
| --- | --- |
| **`~/Code/uDosConnect/dev/`** | Governance in the **monorepo** — process, roadmaps, migrated specs (see also **[`TASKS.md`](../../../TASKS.md)** in this repo). Canonical history for **`[UDEV-*]`** items may still be tracked in **[uDosDev `TASKS.md`](https://github.com/fredporter/uDosDev/blob/main/TASKS.md)** until migration is complete. |
| **`~/Code/archive/uDosGo-v4-backup/`** (archived v4 tree) or **fresh clone** at **`~/Code/uDosGo`** — [uDosGo](https://github.com/fredporter/uDosGo) | Runnable integration — Host, ThinUI, packages; **[`TASKS.md`](https://github.com/fredporter/uDosGo/blob/main/TASKS.md)** (`[UDGO-*]`) |
| **`~/Code/uDosConnect/`** (this repo) | **uDosConnect** monorepo — `core/`, `tools/`, `modules/`, `dev/`, `docs/`, `courses/`, `scripts/`; **no Git submodules**. Optional scripts such as **`scripts/shakedown.sh`** run only when present. |

**Rule:** Locked specs are **authored into `dev/`** (and linked from **`docs/`** where public) as they are promoted from upstream; **[uDosDev on GitHub](https://github.com/fredporter/uDosDev)** (`docs/specs/v4/`) is the historical archive until each file is mirrored. Implementation lands in **uDosGo** (or other product repos). No silent forks of spec content.

---

## 2. Default flow (happy path)

1. **Intent** — New work is traceable in **[`dev/TASKS.md`](../../../TASKS.md)** (and/or **[uDosDev `TASKS.md`](https://github.com/fredporter/uDosDev/blob/main/TASKS.md)** for **`[UDEV-*]`**), or a formal proposal per [udosdev-v4-framework-brief.md](https://github.com/fredporter/uDosDev/blob/main/docs/process/udosdev-v4-framework-brief.md).
2. **Implement** — Code and tests in **uDosGo**; PR description cites the governing spec path(s).
3. **Hygiene** — Before merge: **`npm run doc:drift`** and **`npm run test:integration`** from **uDosGo** root when docs or integration paths changed.
4. **Governance markdown** — When adding or editing slotted docs under **`dev/docs/`** (mirrored tree) or **`docs/`**, run **`./scripts/validate-doc-frontmatter.sh`** from the **uDosConnect** repo root when that script exists (else run it from a **uDosDev** clone — see [DEV_REPORTS strategy](https://github.com/fredporter/uDosDev/blob/main/docs/dev/DEV_REPORTS_AND_DOC_TEMPLATES_STRATEGY_LOCKED_v1.md)).
5. **Umbrella** — When changing courses or cross-repo layout: run **`./scripts/shakedown.sh`** from **`uDosConnect/`** when the script exists (see [ROUND_E_DEVELOPMENT_PROCESS_v4.md](https://github.com/fredporter/uDosDev/blob/main/docs/specs/v4/ROUND_E_DEVELOPMENT_PROCESS_v4.md)).
6. **Surface language** — Student-facing teaching stays **uCode-first**; TypeScript / Go / Python are Contributor/Core surfaces — [UDOS_V451_LANGUAGE_STRATEGY_LOCKED_v4.5.1.md](https://github.com/fredporter/uDosDev/blob/main/docs/specs/v4/UDOS_V451_LANGUAGE_STRATEGY_LOCKED_v4.5.1.md).

---

## 3. Integration monorepo cues (uDosGo)

| Topic | Where |
| --- | --- |
| **Repo layout + PING/PONG/TIDY/CLEAN** | [FILE-TREE.md](https://github.com/fredporter/uDosGo/blob/main/docs/FILE-TREE.md) |
| **Doc consolidation (complete)** | [docs-v4-consolidation-plan.md](https://github.com/fredporter/uDosGo/blob/main/docs/dev/docs-v4-consolidation-plan.md) |
| **Compose split** | Root **`docker/`** (Host + UVIL + uChatDown) vs **`infra/docker/`** (WordPress local stack) — see FILE-TREE |

---

## 4. Resume after a break

1. **`git pull`** on **uDosGo** (if you use it) and **`git pull`** on **uDosConnect**. There are **no submodules** — do **not** run `git submodule update`.
2. **Backlog** — Read open items in **[`dev/TASKS.md`](../../../TASKS.md)** (A1 / migration work in this repo) and **[uDosDev `TASKS.md` — Backlog](https://github.com/fredporter/uDosDev/blob/main/TASKS.md)** (e.g. **`[UDEV-R39]`**, **`[UDEV-R40]`**), plus matching **[uDosGo `TASKS.md`](https://github.com/fredporter/uDosGo/blob/main/TASKS.md)** pairs when doing integration work.
3. **uDosGo** — `npm install`; `npm run doc:drift`; optional `npm run test:integration`.
4. **uDosConnect** — From repo root: `npm ci` (or `npm install`); `npm run build` when you touch workspaces; **`./scripts/shakedown.sh`** only if the script exists.
5. **Governance docs** — If you edit slotted markdown under **`dev/docs/`** or **`docs/`**, run **`./scripts/validate-doc-frontmatter.sh`** from repo root when present.
6. **Spec index** — Skim the **v4.5.1** bullets at the top of **[`v4-dev-rounds.md` on uDosDev](https://github.com/fredporter/uDosDev/blob/main/docs/v4-dev-rounds.md)**.

**Submodule migration (in progress):** re-entry steps for **`dev/`** / **`docs/`** copy batches are in [`2026-04-15-docs-migration-restart.md`](../../2026-04-15-docs-migration-restart.md) and [`2026-04-14-submodule-migration-round-plan.md`](../../../roadmaps/2026-04-14-submodule-migration-round-plan.md).

---

## 5. Pre-v5 completeness and live testing rounds

Use this loop before promoting work as **pre-v5 complete** or scheduling **live testing rounds** (operator / integration / portal).

1. **Cursor-shaped backlog (Sections A–F)** — Walk **[`UDOS_V46_CURSOR_IMPLEMENTATION_CHECKLIST_v1.md`](../../imported/2026-04-15-uDosDev-snapshot/future/UDOS_V46_CURSOR_IMPLEMENTATION_CHECKLIST_v1.md)** (imported snapshot; [GitHub original](https://github.com/fredporter/uDosDev/blob/main/docs/future/UDOS_V46_CURSOR_IMPLEMENTATION_CHECKLIST_v1.md)). New requests may start from the template **[`cursor-v46-implementation-checklist.request.template.md`](https://github.com/fredporter/uDosDev/blob/main/docs/templates/cross-format/cursor-v46-implementation-checklist.request.template.md)**; reconcile edits into the canonical checklist.
2. **Phased verification (operator)** — Check boxes in **[`future/V451_TO_V46_CURSOR_ACTIVE_CHECKLIST_v1.md`](https://github.com/fredporter/uDosDev/blob/main/docs/future/V451_TO_V46_CURSOR_ACTIVE_CHECKLIST_v1.md)** (phases 1–10) against **repos and environments**; note repo in **`TASKS.md`** or a dev report.
3. **Execution rounds** — Align scope with **[`PRE_V5_ROADMAP_AND_EXECUTION_ROUNDS_v1.md`](../../imported/2026-04-15-uDosDev-snapshot/future/PRE_V5_ROADMAP_AND_EXECUTION_ROUNDS_v1.md)** (**PRE5-R01–R07**; [GitHub original](https://github.com/fredporter/uDosDev/blob/main/docs/future/PRE_V5_ROADMAP_AND_EXECUTION_ROUNDS_v1.md)); **round order (one table):** **[`PRE_V5_ROADMAP_SINGLE_LANE_v1.md`](../../imported/2026-04-15-uDosDev-snapshot/future/PRE_V5_ROADMAP_SINGLE_LANE_v1.md)**. WordPress / portal lane may use **wpmudev-agent** [`PRE_V5_COMPLETION_CHECKLIST`](https://github.com/fredporter/wpmudev-agent/blob/main/docs/PRE_V5_COMPLETION_CHECKLIST.md) when applicable.
4. **Integration monorepo gate** — From **uDosGo:** `npm run operator:pre-v5` (full: `npm run operator:pre-v5:full` per **[`QUICKSTART.md`](https://github.com/fredporter/uDosGo/blob/main/docs/QUICKSTART.md)** *Operator test run*) when assessing **uDosGo** readiness for a round.
5. **Live testing round log** — Capture **what was exercised**, **commit or image**, and **pass/fail** against Section **B/C acceptance** YAML in the v4.6 checklist (or phase items in the active checklist) in **`docs/dev-reports/`** or **`docs/status/`** using the usual templates and **`./scripts/validate-doc-frontmatter.sh`** when available.

**Summary:** The v4.6 checklist = **what to build** (tasks + cell/cube); the active checklist + operator scripts = **how to verify**; **PRE_V5_ROADMAP** section 4 + **PRE_V5_ROADMAP_SINGLE_LANE** = **program order**; dev reports = **evidence** for live rounds.

---

## 6. Related

- **[Rolling summary + DEVLOG](../../dev-summary-and-devlog.md)** — period handover, `dev/summary/` + `dev/devlog/`, deferred public docs in [`dev/DOC-TODO.md`](../../../DOC-TODO.md) (not in parallel with implementation).
- **[Imported uDosDev snapshot (2026-04-15)](../../imported/2026-04-15-uDosDev-snapshot/README.md)** — roadmap bundle in this repo  
- [`dev-process-v4.md`](dev-process-v4.md) — `.local/` / `.compost/`, framework zones  
- [DEV_REPORTS_AND_DOC_TEMPLATES_STRATEGY_LOCKED_v1.md](https://github.com/fredporter/uDosDev/blob/main/docs/dev/DEV_REPORTS_AND_DOC_TEMPLATES_STRATEGY_LOCKED_v1.md) — dev reports, PR/issue templates, slots **0–7**, hook intent  
- [`v4-dev-rounds.md` on uDosDev](https://github.com/fredporter/uDosDev/blob/main/docs/v4-dev-rounds.md) — five areas, round naming  
- [`family-product-map-v4.5.md` on uDosDev](https://github.com/fredporter/uDosDev/blob/main/docs/family-product-map-v4.5.md) — sibling apps, tools, **USXD** pathway; wireframe **uDosGo** vs full-UX products  
- [`future/V451_CONSUMER_SPEC_ROADMAP_v4.5.1.md` on uDosDev](https://github.com/fredporter/uDosDev/blob/main/docs/future/V451_CONSUMER_SPEC_ROADMAP_v4.5.1.md) — **`UDOS_V451_*`** × consumer matrix + mission bands  
- [`family-workflow.md` on uDosDev](https://github.com/fredporter/uDosDev/blob/main/docs/family-workflow.md) — lifecycle wording  
- [ROUND_E_DEVELOPMENT_PROCESS_v4.md](https://github.com/fredporter/uDosDev/blob/main/docs/specs/v4/ROUND_E_DEVELOPMENT_PROCESS_v4.md) — shakedown, Round E locks
