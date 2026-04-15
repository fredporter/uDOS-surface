# `tools/` — spawned binaries (VA2+)

| Path | Language | VA |
| --- | --- | --- |
| [`ucode-cli/`](ucode-cli/) | Go | **VA2** — uCode execution / TUI |
| [`sonic-express/`](sonic-express/) | TypeScript | **Installer** — prerequisites, `core` build, global `do` link; used by [`../launcher/`](../launcher/) |
| [`usxd-express/`](usxd-express/) | TypeScript | **USXD-Express** — OBF/USXD markdown → HTML preview + export (`usxd-express` / `do usxd serve`) |
| [`ucoin-ledger/`](ucoin-ledger/) | Go (planned) | **VA2+** |
| [`meshcore-bridge/`](meshcore-bridge/) | Go (planned) | **VA2+** |

**VA1** user CLI is **`do`** in [`../core/`](../core/) — pure TypeScript, no Go.
