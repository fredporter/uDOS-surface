# Contributing

If this tree is not yet a Git repository locally, run `git init` at the repo root, then `git remote add origin https://github.com/fredporter/uDosConnect.git` (or your fork). If **`origin`** still points at the old **`uDosExtension`** URL, run:

`git remote set-url origin https://github.com/fredporter/uDosConnect.git`

**Monorepo:** there are **no Git submodules**. Clone normally:

`git clone https://github.com/fredporter/uDosConnect.git`

**Canonical trees in this repo:** **`dev/`** (governance / workflow), **`docs/`** (documentation). Do **not** recreate old **`uDosDev/`** or **`uDosDocs/`** directory names at the root — that material is **absorbed** into **`dev/`** and **`docs/`**.

1. **Governance and process** — read [`dev/workflow/migrated-round1/process/dev-process-beta.md`](dev/workflow/migrated-round1/process/dev-process-beta.md) and [`dev/TASKS.md`](dev/TASKS.md).
2. **Planning spine** — read [`docs/family-workspace-layout.md`](docs/family-workspace-layout.md): optional coding root (e.g. **`~/Code/`**), Mac/Linux/Windows examples, **`uDosConnect`** as active monorepo, optional **`archive/`** for retired trees.
3. **Scratch** — use repo-local **`.local/`** or **`dev/local/`** (gitignored) per dev standard; do not commit inbox dumps.
4. **Paths in docs** — follow the **optional** coding-root pattern in [`docs/family-workspace-layout.md`](docs/family-workspace-layout.md); avoid other machine-specific absolute paths. Checks under **`scripts/`** or **`dev/`** may reject patterns like `/Users/.../Code/`.
5. **Local Python pointer** — after `scripts/bootstrap-family-python.sh`, the file **`.udos-family-python`** is created at the repo root and is **gitignored** (see `.udos-family-python.example`).
6. **PRs** — prefer **`main`**; keep changes scoped and described in complete sentences.

7. **Family checks** — scripts under **`scripts/`** may assume paths described in [`docs/family-workspace-layout.md`](docs/family-workspace-layout.md); if optional paths are absent, a script may stop early — that is normal on a partial environment.

8. **Node / npm** — this repo uses **npm workspaces** at the root (`package.json` + `package-lock.json`). Install with **`npm ci`** (or **`npm install`**) at the repo root, then **`npm run build`** or **`npm test`**. Do not rely on per-package lockfiles under `core/` or `tools/sonic-express/`. The VA1 CLI is **`udo`** (from workspace `@udos/core` after `npm link` in `core/`); see [docs/public/ucode-commands.md](docs/public/ucode-commands.md).

9. **Dev scaffold (`--devonly` templates)** — contributor tiers, VibeCLI ↔ Cursor handover, and ignored scratch: [`dev/README.md`](dev/README.md). Do not commit personal notes under **`dev/local/`**; roadmaps/features in-repo are **template-only** (see `dev/.gitignore`).

For deeper context, use **`docs/`** and **`dev/workflow/`** in this repo (including imported snapshots under `dev/workflow/imported/` where present).
