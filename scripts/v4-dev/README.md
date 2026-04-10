# v4 `~/Code/` dev scripts

Small helpers for the **sibling-repo** layout described in **uDos-Go** `workspaces/README.md` — [github.com/fredporter/uDos-Go/tree/main/workspaces](https://github.com/fredporter/uDos-Go/tree/main/workspaces) (clone as `~/Code/uDosGo`).

| Script | Purpose |
| --- | --- |
| [`update-all-repos.sh`](update-all-repos.sh) | `git pull --ff-only` for each known repo when present |
| [`check-tasks-md.sh`](check-tasks-md.sh) | Fail if `TASKS.md` is missing (plus `uDosConnect/uDosDev/TASKS.md`) |

Override clone root: `UDOS_CODE_ROOT=/path/to/Code`.
