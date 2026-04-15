# uDosConnect

Public **uDos** family monorepo: **A1 runtime scaffold**, governance, documentation, shared helper scripts, and a read-only **v2 reference** tree.  
**uDos** = **Universal Device Operating Surface** (capital **D** in new prose — see [`dev/workflow/migrated-round1/process/dev-process-beta.md`](dev/workflow/migrated-round1/process/dev-process-beta.md)).

This repository was previously published under other names (including **`uDOS-surface`**). **A1 (locked):** **`uDosConnect` is the only uDos project tree** for implementation — see **[`docs/A1-structure-locked.md`](docs/A1-structure-locked.md)**. VA1 work lives in **`core/`** (`do` CLI) and related packages under this monorepo.

## Quickstart (students — one entry point)

You need **Node.js 18+** and **npm 9+** on your PATH (install from [nodejs.org](https://nodejs.org/) if needed). You do **not** need to run `npm install` in `core/` by hand — **[sonic-express](tools/sonic-express/)** runs **`npm ci` / `npm install` at the repo root** so the whole **[npm workspace](https://docs.npmjs.com/cli/using-npm/workspaces)** shares one **`node_modules/`** (hoisted dependencies).

### macOS — double-click

1. Clone or download this repo.
2. In Finder, open **`launcher/`** and double-click **`udos.command`** (first run may ask to allow Terminal). If macOS blocks execution: `chmod +x launcher/udos.command` once in Terminal.
3. After setup, use **`do help`**, **`do doctor`**, and **`do tour`** in Terminal.

The installer also copies **`udos.command`** to your **Desktop** so you can reopen uDos from there later.

### Linux — one command (after clone)

```bash
chmod +x launcher/install.sh   # once
./launcher/install.sh
do help
```

### Windows (PowerShell, after clone)

```powershell
Set-ExecutionPolicy -Scope CurrentUser RemoteSigned   # if scripts are blocked
.\launcher\install.ps1
do help
```

### What happens

[`tools/sonic-express/bin/sonic-express.mjs`](tools/sonic-express/bin/sonic-express.mjs) checks Node/npm, installs dependencies at the **repository root** (all workspace packages: **`core/`**, **`tools/sonic-express/`**, **`tools/usxd-express/`**, **`modules/*`**), runs **`npm run build`**, then **`npm link`** in **`core/`** for the global **`do`** command. **`do doctor`** can verify the install.

**Long-term:** ship a **single bundled binary** (e.g. `pkg` / `esbuild`) so end users need not install Node — tracked as a follow-on; workspace layout keeps one build graph until then.

### First vault

After install: **`do init`** (creates `~/vault` by default), then **`do tour`** for a short walkthrough.

### Remote install URL (placeholder)

When **`https://udos.sh/install`** is published, it can point at this repo’s `launcher/install.sh` or a small wrapper; until then, clone the repo and use the launchers above.

## A1 layout (one repo, clear folders)

| Path | Role |
| --- | --- |
| [`core/`](core/) | **VA1 `do` CLI** — pure TypeScript (`npm run build` → `do`). No Go / TUI; see [`core/VA2.md`](core/VA2.md). |
| [`tools/`](tools/) | **Spawned tools** — **sonic-express** (install), **usxd-express** (USXD preview); VA2+ Go stubs (`ucode-cli`, …). See [`tools/README.md`](tools/README.md). |
| [`modules/`](modules/) | **TS libraries** — shared **`@udos/shared-types`**, **`@udos/shared-utils`**, plus `vault-manager`, `feed-engine`, `spool-archiver`, `publish-gateway`, `usxd-renderer` (+ ucoin, udos-db-schema, … outside npm workspaces). |
| [`launcher/`](launcher/) | **Student entry** — `udos.command` (macOS), `install.sh` / `install.ps1` — call **sonic-express**; no manual `npm install` in `core/`. |
| [`dev/`](dev/) | **Contributor-only** — `vibe/` (VibeCLI rules + config); `local/` gitignored scratch — see [`dev/README.md`](dev/README.md). |
| [`docs/public/`](docs/public/) / [`docs/student/`](docs/student/) | **--public** vs **--student** doc landing zones. |
| [`templates/`](templates/) | Open-box templates for `do init` / `do template`. |
| [`seed/`](seed/) | Default vault content for first run. |

## Planning spine (optional coding root)

**Where to put clones on disk** — one recommended parent folder for all repos (often named **`Code`** under your home directory; **optional**). Mac / Linux / Windows examples and the usual **`uDosConnect`** + **`archive`** layout: **[`docs/family-workspace-layout.md`](docs/family-workspace-layout.md)**.

## Contents

| Path | Role |
| --- | --- |
| [`TASKS.md`](TASKS.md) | Monorepo task pointer — canonical backlog in **[`dev/TASKS.md`](dev/TASKS.md)** and **[`dev/BACKLOG-A1-branch.md`](dev/BACKLOG-A1-branch.md)** (A1 branch; merge before A1 closes). |
| [`dev/`](dev/) | **Governance + contributor workflow** — [`dev/TASKS.md`](dev/TASKS.md), [`dev/AGENTS.md`](dev/AGENTS.md), roadmaps, `dev/workflow/`. |
| [`docs/`](docs/) | **Documentation corpus** — public / student / contributor zones. |
| [`courses/`](courses/) | **Learning pathway (beta numbering in folder names)** — shells **00–06**; validate: `bash scripts/validate-courses.sh`. |
| [`scripts/`](scripts/) | Shared Python bootstrap, family checks, course validation, and path helpers (see [`docs/shared-resources-architecture.md`](docs/shared-resources-architecture.md)). |
| [`modules/`](modules/) | **A1:** TS packages + uCoin, DB schema, LLM bridge — see [`modules/README.md`](modules/README.md). |
| [`docs/ucoin-boundary.md`](docs/ucoin-boundary.md) | Short family note: **uCoin (barter)** vs **optional crypto** — points at `modules/ucoin/`. |
| [`.compost/README.md`](.compost/README.md) | **TIDY/CLEAN** recovery pile (gitignored content; policy file tracked). |

## Workspace

Open [`uDosConnect.code-workspace`](uDosConnect.code-workspace) in Cursor or VS Code — roots for **`core/`**, **`modules/`**, **`dev/`**, **`templates/`**, **`seed/`**, **`docs/`**, **`courses/`**, **`scripts/`**, and (when present) local **archive** trees per [`docs/family-workspace-layout.md`](docs/family-workspace-layout.md). **Dev flow (beta-era filenames in `dev/workflow/`):** [`dev/workflow/migrated-round1/process/dev-beta-flow-and-resume.md`](dev/workflow/migrated-round1/process/dev-beta-flow-and-resume.md). **A1 branch backlog:** [`dev/BACKLOG-A1-branch.md`](dev/BACKLOG-A1-branch.md).

In **tracked** prose, avoid machine-specific paths except the **optional** coding-root examples in [`docs/family-workspace-layout.md`](docs/family-workspace-layout.md); use `<repo-root>` where a neutral placeholder is better.

## Contributors (manual workspace build)

From the **repo root** (single lockfile, hoisted deps):

```bash
npm ci          # or: npm install
npm run build   # all workspace packages
cd core && npm link
do doctor
```

Run tests from root: **`npm test`**. Per-package: **`npm run build -w @udos/core`**.

## License

MIT — see [`LICENSE`](LICENSE).
