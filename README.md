# uDosConnect

Public **uDos** family monorepo: governance, documentation, shared helper scripts, and a read-only **v2 reference** tree.  
**uDos** = **Universal Device Operating Surface** (capital **D** in new prose — see [`uDosDev/docs/process/dev-process-v4.md`](uDosDev/docs/process/dev-process-v4.md)).

This repository was previously published under other names (including **`uDOS-surface`**). It is **not** the runnable Host / ThinUI integration — that lives in **[uDosGo](https://github.com/fredporter/uDosGo)**, checked out locally as **`~/Code/uDosGo/`**. There are **no** commercial-only product trees here; content is suitable for a **public** remote.

## Planning spine (`~/Code/`)

For local paths and multi-repo planning, use **[`docs/family-workspace-layout.md`](docs/family-workspace-layout.md)**:

- **`~/Code/uDosGo/`** — integration monorepo (always this location in family docs).
- **`~/Code/uDosConnect/…`** — this repo; **`uDosGo`** stays **alongside** here under **`~/Code/`** (not inside this tree). Tracked content here includes governance-related submodules, `v2-reference`, and shared `scripts`.

## Contents

| Path | Role |
| --- | --- |
| [`TASKS.md`](TASKS.md) | Monorepo Task pointer — canonical backlog in **`uDosDev/TASKS.md`**; public docs in **`uDosDocs/TASKS.md`**. |
| [`uDosDev/`](uDosDev/) | **Submodule** → [`uDosDev`](https://github.com/fredporter/uDosDev). Family workflow, Task (`TASKS.md`), dev process **v4**, governance scripts. **v4 doc inventory:** [`uDosDev/docs/DOC-REGISTRY-uDosv4.md`](uDosDev/docs/DOC-REGISTRY-uDosv4.md). **Ecosystem map (v4.5+):** [`uDosDev/docs/family-product-map-v4.5.md`](uDosDev/docs/family-product-map-v4.5.md) · [`uDosDev/docs/future/V451_CONSUMER_SPEC_ROADMAP_v4.5.1.md`](uDosDev/docs/future/V451_CONSUMER_SPEC_ROADMAP_v4.5.1.md). |
| [`uDosDocs/`](uDosDocs/) | **Submodule** → [`uDosDocs`](https://github.com/fredporter/uDosDocs). Public documentation corpus. |
| [`courses/`](courses/) | **v4 learning pathway** — numbered shells (00–05) + **`06-ucode-runtime`**; locked narrative in **`uDosDocs/docs/educational-content/`**. Validate: `bash scripts/validate-courses.sh`. |
| [`v2-reference/`](v2-reference/) | Archived conceptual **v2** module snapshots (historical code and notes — **not** a submodule; not the live integration). **Groovebox** is no longer mirrored here — use **[GrooveBox888](https://github.com/fredporter/GrooveBox888)**. |
| [`scripts/`](scripts/) | Shared Python bootstrap, family checks, course validation, and path helpers (see [`docs/shared-resources-architecture.md`](docs/shared-resources-architecture.md)). |
| [`.compost/README.md`](.compost/README.md) | **TIDY/CLEAN** recovery pile (gitignored content; policy file tracked) — not for submodule trees. |

## Workspace

Open [`uDosConnect.code-workspace`](uDosConnect.code-workspace) in Cursor or VS Code for the recommended multi-root view (`uDosDev`, `uDosDocs`, `v2-reference`, `scripts`, optional **`../uDosGo`**). **v4 dev rounds:** [`uDosDev/docs/v4-dev-rounds.md`](uDosDev/docs/v4-dev-rounds.md). **4.5+ contributor flow + resume:** [`uDosDev/docs/process/v4-5-plus-dev-flow-and-resume.md`](uDosDev/docs/process/v4-5-plus-dev-flow-and-resume.md).

## Adjacent repositories

- **[uDosGo](https://github.com/fredporter/uDosGo)** — runnable integration monorepo; clone at **`~/Code/uDosGo/`**.  
- **[UniversalSurfaceXD](https://github.com/fredporter/UniversalSurfaceXD)** — surface language, interchange JSON, browser lab; usual clone **`~/Code/UniversalSurfaceXD/`** (see layout doc).  
- **[GrooveBox888](https://github.com/fredporter/GrooveBox888)** — standalone groovebox lane; clone at **`~/Code/GrooveBox888/`** (replaces the removed `v2-reference/uDOS-groovebox` snapshot).

In **tracked** prose, avoid machine-specific paths other than the **`~/Code/`** spine above; use `<repo-root>` where a generic placeholder is still needed.

## License

MIT — see [`LICENSE`](LICENSE).
