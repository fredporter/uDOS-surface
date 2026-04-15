# Family workspace layout (planning spine)

**Canonical “where on disk” doc:** other pages should **link here** instead of repeating path prose — better for published guides and library layouts.

---

## Optional coding root (recommended)

**uDosConnect does not require a specific folder.** Clone anywhere; tools use paths **inside** the repo.

For **multiple repos** on one machine, a **single parent folder** for all local clones and editor workspaces is **best practice**: predictable scripts, multi-root workspaces, and documentation. The folder name is **your choice** at first setup.

- **Common choice:** **`~/Code/`** — short, memorable; used as **shorthand** in family docs.
- **Alternatives:** `~/Developer/`, `~/src/`, `~/projects/`, or repos directly under **`~/`** if you prefer.

### Examples (same layout, different systems)

| Idea | macOS | Linux | Windows (typical) |
| --- | --- | --- | --- |
| Coding root (examples) | `/Users/you/Code/` | `/home/you/Code/` | `C:\Users\you\Code\` |
| This monorepo | `…/Code/uDosConnect/` | `…/Code/uDosConnect/` | `…\Code\uDosConnect\` |
| Optional archive / retired trees | `…/Code/archive/` | `…/Code/archive/` | `…\Code\archive\` |

On **Windows**, not every shell expands `~/`; **Git Bash** and many dev tools do. Use the same **logical** tree (one root → `uDosConnect`, optional `archive`, sibling repos) even if the drive or profile path differs.

**In the sections below,** `~/Code/` means *your* coding root unless you pick another name — substitute accordingly.

---

## Single active uDos repo (A1 locked)

**Primary checkout (illustrated):** **`~/Code/uDosConnect/`** — VA1 **`do`** CLI in **`core/`**, **`tools/`**, **`modules/`**, **`dev/`**, **`templates/`**, **`seed/`**, **`docs/`**, **`courses/`**, **`scripts/`** — **monorepo** (no Git submodules).

- **`…/uDosConnect/dev/`** — contributor workflow, roadmaps, imported governance snapshots  
- **`…/uDosConnect/docs/`** — tagged documentation corpus (public / student / contributor)  
- **Historical v2 snapshots** — optional read-only tree under **`~/Code/archive/v2-reference/`** (or your policy); groovebox → **[GrooveBox888](https://github.com/fredporter/GrooveBox888)** (e.g. **`~/Code/GrooveBox888/`**)  
- **`…/uDosConnect/scripts/`** — shared family scripts  

**Do not** recreate old submodule folder names **`uDosDev/`** or **`uDosDocs/`** at the root of this repo. Governance and docs live only in **`dev/`** and **`docs/`** here. The GitHub repos **uDosDev** / **uDosDocs** are upstream archives for merges, not parallel mandatory checkouts beside **`uDosConnect/`**.

**Retired / duplicate trees** (moved, not deleted) often live under **`~/Code/archive/`** — see **[`../../archive/README.md`](../../archive/README.md)**. That can include a **v4 [uDosGo](https://github.com/fredporter/uDosGo)** backup; for new integration work, clone the repo beside your coding root or port into **`uDosConnect/core/`**.

Optional extra clones that participate in checks (for example **`uDOS-wizard`**) can live **inside** **`uDosConnect/`** when paths must resolve predictably from the repo root.

---

## Typical sibling (not inside uDosConnect)

**[UniversalSurfaceXD](https://github.com/fredporter/UniversalSurfaceXD)** — surface language, interchange JSON, browser lab — often beside the monorepo (e.g. **`~/Code/UniversalSurfaceXD/`**). Multi-root workspaces often open **uDosConnect** and **UniversalSurfaceXD** together; nesting under `uDosConnect/` is optional.

---

## Diagram

```text
~/Code/                    ← your coding root (optional name; examples above)
  uDosConnect/             ← canonical active uDos monorepo
    core/
    dev/                   ← governance, workflow, dev-only (canonical in-repo)
    docs/                  ← public / student / contributor docs (canonical in-repo)
    scripts/
  archive/                 ← retired duplicates (optional)
  GrooveBox888/            ← optional; standalone groovebox repo
  UniversalSurfaceXD/     ← optional; usual layout for the lab repo
```

---

## Related

- [`shared-resources-architecture.md`](shared-resources-architecture.md) — `~/.udos` runtime layout (separate from Git checkouts).  
- **Pre-v5 program order (PRE5-R01–R07):** Full text + exit criteria (section 4): [`dev/workflow/imported/2026-04-15-uDosDev-snapshot/future/PRE_V5_ROADMAP_AND_EXECUTION_ROUNDS_v1.md`](../dev/workflow/imported/2026-04-15-uDosDev-snapshot/future/PRE_V5_ROADMAP_AND_EXECUTION_ROUNDS_v1.md). Single-lane table: [`dev/workflow/imported/2026-04-15-uDosDev-snapshot/future/PRE_V5_ROADMAP_SINGLE_LANE_v1.md`](../dev/workflow/imported/2026-04-15-uDosDev-snapshot/future/PRE_V5_ROADMAP_SINGLE_LANE_v1.md). Public summary: [`docs/roadmap/pre-v5-family-notes.md`](roadmap/pre-v5-family-notes.md).  
- Root [`README.md`](../README.md) — what this repository contains.
