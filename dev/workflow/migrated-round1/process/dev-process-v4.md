# Dev process — family governance (v4)

**Status:** locked (2026-04)  
**Repo:** **uDosConnect** monorepo — governance and workflow belong under **`dev/`** (canonical in-tree). The GitHub [uDosDev](https://github.com/fredporter/uDosDev) repo is an upstream archive for merges; do **not** use a nested **`uDosDev/`** directory in this repo. **Not** canonical product runtime.

**Framework charter (v4 refinement):** [udosdev-v4-framework-brief.md](https://github.com/fredporter/uDosDev/blob/main/docs/process/udosdev-v4-framework-brief.md) — proposals, decisions, promotions; no product code in the governance repos.

## Version

Root **`package.json`** **version** `4.0.0` tracks the **governance / dev-standard** line. It does not replace product or monorepo version labels in other repositories.

### Naming in prose (v4 onwards)

Prefer **uDos** in **new and edited** docs and scripts comments; the capital **D** is intentional. Legacy **uDOS** in older text can stay until touched — **no** mass rename across the family. Do **not** use “UDO” / “UDOs” as a family acronym (reserved by other products).

## Structure (v4 — framework only)

| Zone | Role |
| --- | --- |
| **`docs/proposals/`** | Active proposals (`PROP-XXX.md`) — see [templates](../templates/proposal.md). |
| **`docs/decisions/`** | Locked decisions (`DEC-XXX.md`). |
| **`docs/promotions/`** | Promotion checklists (`PROM-XXX.md`) before product-repo PRs. |
| **`docs/process/`** | This file, checklist, framework brief — locked process. |
| **`docs/templates/`** | Proposal / decision / promotion templates. |
| **`docs/templates/cross-format/`** | Issue, PR, dev-report, status templates (`slot`, `type`) — see [DEV_REPORTS_AND_DOC_TEMPLATES_STRATEGY_LOCKED_v1.md on uDosDev](https://github.com/fredporter/uDosDev/blob/main/docs/dev/DEV_REPORTS_AND_DOC_TEMPLATES_STRATEGY_LOCKED_v1.md). |
| **`docs/dev-reports/`** | Contributor dev reports & audits (`--devonly`, slots **3–4**). |
| **`docs/status/`** | Internal status updates (slots **3–4** or **5** if public). |
| **`docs/meetings/`** | Meeting notes (slots **3–4**). |
| **`.local/`** | Untracked scratch (gitignored). |
| **`.compost/`** | Untracked archive for superseded material (gitignored). |
| **`TASKS.md`** | **`dev/TASKS.md`** in this monorepo (canonical); upstream uDosDev `TASKS.md` only for historic **`[UDEV-*]`** traceability. |
| **`@dev/`** | **Legacy v3** — archive to `.compost/` per [framework brief](udosdev-v4-framework-brief.md) §5; do not add new long-lived intake here. |

**Rule:** If you are writing **product code**, use **uDosGo**, Linkdown, Macdown, SonicScrewdriver, etc. — not uDosDev.

Flow: **proposal → decision → promotion → PR in product repo** (see framework brief §4).

## uDos 4.5+ family line (vault, feeds, lifecycle, language)

Locked **v4.5.1** packs live under **`docs/specs/v4/`** on **[uDosDev](https://github.com/fredporter/uDosDev/tree/main/docs/specs/v4)**. **Default contributor flow** and **resume-after-break** steps: **[v4-5-plus-dev-flow-and-resume.md](v4-5-plus-dev-flow-and-resume.md)**. Quick index of 4.5.x bullets: [`v4-dev-rounds.md` on uDosDev](https://github.com/fredporter/uDosDev/blob/main/docs/v4-dev-rounds.md).

## Companion docs

- **Rolling summary + DEVLOG:** [`dev/workflow/dev-summary-and-devlog.md`](../../dev-summary-and-devlog.md) — new period summary assesses the previous; incomplete/watch items roll forward; link **`dev/devlog/`** entries; **`dev/DOC-TODO.md`** holds public-doc intent for a **later** round (not parallel to implementation).
- **Dev reports & doc templates (locked):** [DEV_REPORTS_AND_DOC_TEMPLATES_STRATEGY_LOCKED_v1.md](https://github.com/fredporter/uDosDev/blob/main/docs/dev/DEV_REPORTS_AND_DOC_TEMPLATES_STRATEGY_LOCKED_v1.md) — slots 0–7, `--devonly` / `--current`, cross-format templates, hook intent.
- **Checklist:** [dev-checklist-v4.md](dev-checklist-v4.md)
- **4.5+ flow + resume:** [v4-5-plus-dev-flow-and-resume.md](v4-5-plus-dev-flow-and-resume.md)
- **Family workflow:** [family-workflow.md on uDosDev](https://github.com/fredporter/uDosDev/blob/main/docs/family-workflow.md)
- **Integration monorepo identity / rename options:** [uDosGo: repo-identity-and-rename-v4.md](https://github.com/fredporter/uDosGo/blob/main/docs/repo-identity-and-rename-v4.md)
- **Local disk spine:** [`docs/family-workspace-layout.md`](../../../../docs/family-workspace-layout.md) (`~/Code/archive/uDosGo-v4-backup` + `~/Code/uDosConnect/…`)

Canonical Task prose may live in operator-local `~/Code/Dev-tasks.md`; this repo encodes **locked behaviour** for the family.
