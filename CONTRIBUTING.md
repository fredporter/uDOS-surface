# Contributing

If this tree is not yet a Git repository locally, run `git init` at the repo root, then `git remote add origin https://github.com/fredporter/uDosConnect.git` (or your fork). If **`origin`** still points at the old **`uDosExtension`** URL, run:

`git remote set-url origin https://github.com/fredporter/uDosConnect.git`

**Submodules:** `uDosDev` and `uDosDocs` are Git submodules ([`uDos-Dev`](https://github.com/fredporter/uDos-Dev), [`uDos-Docs`](https://github.com/fredporter/uDos-Docs)). Clone with submodules in one step:

`git clone --recurse-submodules https://github.com/fredporter/uDosConnect.git`

If you already cloned without them: `git submodule update --init --recursive`.

1. **Governance and process** — read [`uDosDev/docs/dev-process-v4.md`](uDosDev/docs/dev-process-v4.md) and [`uDosDev/TASKS.md`](uDosDev/TASKS.md).  
2. **Planning spine** — read [`docs/family-workspace-layout.md`](docs/family-workspace-layout.md): **`~/Code/uDosGo/`** for the integration monorepo; **`~/Code/uDosConnect/…`** for everything in this repo and optional nested family clones.  
3. **Scratch** — use repo-local **`.local/`** or **`uDosDev/@dev/inbox/`** (gitignored) per dev standard; do not commit inbox dumps.  
4. **Paths in docs** — prefer the **`~/Code/`** conventions above; avoid other machine-specific absolute paths. Checks in `uDosDev/scripts/` may reject patterns like `/Users/.../Code/`.  
5. **Local Python pointer** — after `scripts/bootstrap-family-python.sh`, the file **`.udos-family-python`** is created at the repo root and is **gitignored** (see `.udos-family-python.example`).  
6. **PRs** — prefer **`main`**; keep changes scoped and described in complete sentences.

7. **`uDosDev/scripts/run-dev-checks.sh`** — full pass may expect optional repos (for example **`uDOS-wizard`**) under **`~/Code/uDosConnect/`** per the layout doc; if those folders are absent, the script may stop early. That is normal on a partial clone.

For deeper family context, start with [`uDosDev/README.md`](uDosDev/README.md) and [`uDosDev/docs/getting-started.md`](uDosDev/docs/getting-started.md).
