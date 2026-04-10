# uDosConnect

Public **uDos** family monorepo: governance, documentation, shared helper scripts, and a read-only **v2 reference** tree.  
**uDos** = **Universal Device Operating Surface** (capital **D** in new prose — see [`uDosDev/docs/dev-process-v4.md`](uDosDev/docs/dev-process-v4.md)).

This repository was previously published under other names (including **`uDOS-surface`**). It is **not** the runnable Host / ThinUI integration — that lives in **[uDos-Go](https://github.com/fredporter/uDos-Go)**, checked out locally as **`~/Code/uDosGo/`**. There are **no** commercial-only product trees here; content is suitable for a **public** remote.

## Planning spine (`~/Code/`)

For local paths and multi-repo planning, use **[`docs/family-workspace-layout.md`](docs/family-workspace-layout.md)**:

- **`~/Code/uDosGo/`** — integration monorepo (always this location in family docs).
- **`~/Code/uDosConnect/…`** — this repo; **`uDosGo`** stays **alongside** here under **`~/Code/`** (not inside this tree). Tracked content here includes governance-related submodules, `v2-reference`, and shared `scripts`.

## Contents

| Path | Role |
| --- | --- |
| [`uDosDev/`](uDosDev/) | **Submodule** → [`uDos-Dev`](https://github.com/fredporter/uDos-Dev). Family workflow, Task Forge (`TASKS.md`), dev process **v4**, governance scripts. |
| [`uDosDocs/`](uDosDocs/) | **Submodule** → [`uDos-Docs`](https://github.com/fredporter/uDos-Docs). Public documentation corpus. |
| [`v2-reference/`](v2-reference/) | Archived conceptual **v2** module snapshots (historical code and notes — **not** a submodule; not the live integration). |
| [`scripts/`](scripts/) | Shared Python bootstrap, family checks, and path helpers (see [`docs/shared-resources-architecture.md`](docs/shared-resources-architecture.md)). |

## Workspace

Open [`uDosConnect.code-workspace`](uDosConnect.code-workspace) in Cursor or VS Code for the recommended multi-root view (`uDosDev`, `uDosDocs`, `v2-reference`, `scripts`, optional **`../uDosGo`**). **v4 dev rounds:** [`uDosDev/docs/v4-dev-rounds.md`](uDosDev/docs/v4-dev-rounds.md).

## Adjacent repositories

- **[uDos-Go](https://github.com/fredporter/uDos-Go)** — runnable integration monorepo; clone at **`~/Code/uDosGo/`**.  
- **[UniversalSurfaceXD](https://github.com/fredporter/UniversalSurfaceXD)** — surface language, interchange JSON, browser lab; usual clone **`~/Code/UniversalSurfaceXD/`** (see layout doc).

In **tracked** prose, avoid machine-specific paths other than the **`~/Code/`** spine above; use `<repo-root>` where a generic placeholder is still needed.

## License

MIT — see [`LICENSE`](LICENSE).
