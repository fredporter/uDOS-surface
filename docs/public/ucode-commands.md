---
title: "uDos A1 uCode Command Reference"
version: "1.0.0"
audience: "--public"
tags:
  - "--public"
  - "--reference"
slot: 5
apple_color: Blue
---

# uDos A1 `do` command reference (VA1)

**Scope:** commands implemented by **`@udos/core`** (TypeScript). This file is the **public** source of truth for behaviour summaries; run **`do <command> --help`** (Commander) for flags.

**Style / tokens:** [../specs/va1-style-guide.md](../specs/va1-style-guide.md)

## Vault

| Command | Description | Example |
| --- | --- | --- |
| `do init` | Create vault (default `~/vault` or `UDOS_VAULT`) | `do init` |
| `do list` | List vault file paths | `do list` |
| `do open <file>` | Open in `$EDITOR` (default `nano`) | `do open content/note.md` |
| `do edit <file>` | Same as open (VA1) | `do edit content/note.md` |
| `do delete <file>` | Move to `.compost/` | `do delete draft.md` |
| `do restore <id>` | Restore from compost | `do restore abc123` |
| `do search <query>` | Search `.md` / `.txt` in vault | `do search hello` |

## Markdown

| Command | Description | Example |
| --- | --- | --- |
| `do md format <file>` | Format markdown | `do md format note.md` |
| `do md lint <file>` | Lint | `do md lint note.md` |
| `do md toc <file>` | Insert / refresh TOC | `do md toc note.md` |

## Frontmatter

| Command | Description | Example |
| --- | --- | --- |
| `do fm add <file> --tag <tag>` | Add tag in frontmatter | `do fm add post.md --tag published` |
| `do fm list <file>` | List fields | `do fm list post.md` |
| `do fm edit <file>` | Edit frontmatter | `do fm edit post.md` |

## Templates

| Command | Description | Example |
| --- | --- | --- |
| `do template list` | List templates | `do template list` |
| `do template show <name>` | Show template | `do template show blog` |
| `do template apply <name>` | Apply into vault | `do template apply blog` |

## Feeds (read-only)

| Command | Description | Example |
| --- | --- | --- |
| `do feed list` | List feeds | `do feed list` |
| `do feed view <name>` | View items | `do feed view news` |
| `do feed export <name>` | Export JSON lines | `do feed export news --json` |

## Spools

| Command | Description | Example |
| --- | --- | --- |
| `do spool list` | List spools | `do spool list` |
| `do spool info <name>` | Metadata | `do spool info weekly` |
| `do spool extract <name>` | Extract | `do spool extract weekly` |

## Publishing

| Command | Description | Example |
| --- | --- | --- |
| `do publish build` | Build static site under vault `.site/` | `do publish build` |
| `do publish preview` | Local preview (port `DO_PREVIEW_PORT`, default 4173) | `do publish preview` |
| `do publish status` | Last build info | `do publish status` |
| `do publish deploy` | Deploy built output to GitHub Pages (`gh-pages`) | `do publish deploy` |

## GitHub (native workflow)

| Command | Description | Example |
| --- | --- | --- |
| `do github clone <repo>` | Clone GitHub repo into vault/default target | `do github clone bro/udos-vault` |
| `do github pull` | Pull latest changes | `do github pull` |
| `do github push` | Commit and push local changes | `do github push -m "update vault"` |
| `do github status` | Show repo sync/status summary | `do github status` |
| `do github sync` | Pull then push | `do github sync` |
| `do github fork [repo]` | Fork upstream repo via `gh` | `do github fork udos/uDosConnect` |
| `do github release <tag>` | Create GitHub release | `do github release v1.2.0` |
| `do github configure --username --repo` | Save defaults in `~/.config/udos/github.yaml` | `do github configure --username bro --repo bro/udos-vault` |

Config file:

- `~/.config/udos/github.yaml`
- keys: `token`, `username`, `default_repo` (supports `${GITHUB_TOKEN}` expansion)

## Issues and PRs (GitHub)

| Command | Description | Example |
| --- | --- | --- |
| `do issue create --title <t> [--body]` | Create issue in current/default repo | `do issue create --title "Fix docs"` |
| `do issue list [--limit]` | List open issues | `do issue list --limit 50` |
| `do pr create [--title --body --base]` | Create pull request | `do pr create --title "Update docs"` |
| `do pr list [--limit]` | List open PRs | `do pr list` |
| `do pr checkout <id>` | Checkout PR branch | `do pr checkout 42` |
| `do pr review <id> [--body]` | Add PR review/comment | `do pr review 42 --body "Looks good"` |
| `do pr approve <id>` | Approve PR | `do pr approve 42` |
| `do pr merge <id>` | Merge PR (auto/squash) | `do pr merge 42` |

## Unified collaboration terms

| Command | Code track (GitHub) | Docs/content track (WordPress terms) |
| --- | --- | --- |
| `do submit [path] [--target]` | Create PR draft (`do pr create`) | Submit draft (A1 stub) |
| `do review [path] [--target] [--pr]` | Review PR (`do pr review`) | Editorial review (A1 stub) |
| `do approve [path] [--target] [--pr]` | Approve PR (`do pr approve`) | Approve draft (A1 stub) |

Auto-detection defaults:

- `docs/`, `courses/`, `templates/`, `content/` => docs/content track
- everything else => code track

## WordPress terminology commands (A1 stubs)

| Command | Description |
| --- | --- |
| `do wp sync` | WordPress sync stub (upgrade message) |
| `do wp publish` | WordPress publish stub (upgrade message) |
| `do wp review` | WordPress editorial review stub (upgrade message) |

## Sync (A1 stubs for WP cloud actions)

| Command | Description |
| --- | --- |
| `do sync status` | Stub — WP cloud status is handled by uDos Universe / uDos.space |
| `do sync pull` | Stub — WP cloud pull requires Universe / uDos.space |
| `do sync push` | Stub — WP cloud push requires Universe / uDos.space |

> A1 still supports local publishing and normal GitHub workflows (`git push`) for open content/code.

## Workflow (A1 local, SQLite-backed)

| Command | Description | Example |
| --- | --- | --- |
| `do workflow list` | List workflows from local SQLite | `do workflow list` |
| `do workflow create <name> --step 'action'` | Create workflow with one or more steps | `do workflow create nightly --step 'shell:echo hi' --step 'spool:create'` |
| `do workflow run <name>` | Run workflow now | `do workflow run nightly` |
| `do workflow schedule <name> --cron '<expr>'` | Save cron metadata | `do workflow schedule nightly --cron '0 2 * * *'` |
| `do workflow status <name>` | Show latest run state | `do workflow status nightly` |
| `do workflow logs <name>` | Show local workflow log lines | `do workflow logs nightly` |
| `do workflow webhook add <name> --url <url>` | Queue webhook registration for A2 | `do workflow webhook add ingest --url https://example.com/hook` |
| `do workflow webhook list` | A2 webhook list stub | `do workflow webhook list` |
| `do workflow queue list` | Queue visibility stub | `do workflow queue list` |

## A2 bridge and server stubs

| Command | Description | Example |
| --- | --- | --- |
| `do a2 server start` | A2 server start stub | `do a2 server start` |
| `do a2 server stop` | A2 server stop stub | `do a2 server stop` |
| `do a2 server status` | A2 server status stub | `do a2 server status` |
| `do a2 server logs` | A2 server logs stub | `do a2 server logs` |
| `do a2 server configure --port 8080` | A2 server config stub | `do a2 server configure --port 8080` |
| `do a2 configure --url <url> [--api-key <key>]` | Configure A2 bridge endpoint | `do a2 configure --url https://api.example.com --api-key abc` |
| `do a2 status` | Show A2 stub inventory and upgrade guidance | `do a2 status` |
| `do workflow server start` | A2-oriented workflow server start stub | `do workflow server start` |
| `do workflow server status` | A2-oriented workflow server status stub | `do workflow server status` |
| `do beacon scan` | Local discovery stub (A2/LAN future) | `do beacon scan` |

## USXD

| Command | Description | Example |
| --- | --- | --- |
| `do usxd list` | List **theme** packs under `templates/usxd/` | `do usxd list` |
| `do usxd apply <name>` | Copy theme into vault | `do usxd apply default` |
| `do usxd show` | Active theme metadata | `do usxd show` |
| `do usxd serve` | **USXD-Express** — preview ` ```usxd``` ` surfaces (live reload) | `do usxd serve --dir ./surfaces` |
| `do usxd export` | Export markdown surfaces (`--format html`; `png` is `[A2 stub]`) | `do usxd export -d ./surfaces -o ./dist --format html` |
| `do usxd render <file>` | Render markdown USXD surface to terminal | `do usxd render docs/surface.md --mode teletext` |
| `do usxd edit [file]` | Preview (uses `~/vault/surfaces` when present) | `do usxd edit` |
| `do usxd validate <file>` | Check ` ```usxd``` ` + optional ` ```grid``` ` | `do usxd validate ui.md` |

Tool: [`tools/usxd-express/README.md`](../../tools/usxd-express/README.md).

## OBF Grid (surface design)

| Command | Description | Example |
| --- | --- | --- |
| `do grid render <file>` | Render ` ```grid` block to terminal (ANSI) | `do grid render map.grid.md --mode mono` |
| `do grid export <file> --format <f>` | `ascii`, `obf`, `svg`, `png` | `do grid export x.md --format png -o out.png` |
| `do grid validate <file>` | Check row/column dimensions | `do grid validate map.grid.md` |
| `do grid edit <file>` | Open in `$EDITOR`; creates minimal grid if new | `do grid edit dungeon.grid.md` |
| `do grid resize <file> --size WxH` | Resize all layers to dimensions | `do grid resize map.grid --size 24x24` |
| `do grid rotate <file> --degrees 90` | Rotate all layers | `do grid rotate map.grid --degrees 90` |
| `do grid flip <file> --horizontal` | Flip all layers horizontally (`--vertical` default) | `do grid flip map.grid --horizontal` |
| `do grid layer add <file> --name <name>` | Append empty layer | `do grid layer add map.grid --name overlay` |
| `do grid layer list <file>` | List layer indices/names | `do grid layer list map.grid` |
| `do grid layer show <file> --layer <n>` | Render one layer to terminal | `do grid layer show map.grid --layer 2` |
| `do grid layer merge <file> --layers a,b,c` | Merge selected layers (non-space overlays) | `do grid layer merge map.grid --layers 0,1,2` |

Spec: [../specs/obf-grid-spec.md](../specs/obf-grid-spec.md) · package: `@udos/obf-grid`.

## OBF UI Blocks

| Command | Description | Example |
| --- | --- | --- |
| `do obf render <file>` | Render ` ```obf` ` `CARD`/`COLUMNS` blocks to terminal | `do obf render docs/specs/obf-ui-blocks.md` |

Spec: [../specs/obf-ui-blocks.md](../specs/obf-ui-blocks.md).

## Font (CDN + cache)

| Command | Description |
| --- | --- |
| `do font install [bundle]` | Fetch bundle from **`UDOS_CDN_BASE`** (default `https://cdn.udo.space`) or copy from **`cdn/fonts/seed/`** → `~/.cache/udos/fonts/` |
| `do font list` | List cached files + active font |
| `do font activate <id>` | Set active font for **`do publish build`** / **`do publish preview`** (injects `@font-face` into site CSS) |
| `do font preview <id>` | Show resolved path + terminal sample strip |

See [../specs/font-system-obf.md](../specs/font-system-obf.md), repo [`cdn/README.md`](../../cdn/README.md), dev [`../../dev/cdn-cloud-setup.md`](../../dev/cdn-cloud-setup.md).

## Utility

| Command | Description |
| --- | --- |
| `do status` | Vault path, cwd, Node version |
| `do doctor` | Health checks |
| `do cleanup` | Remove `~/.cache/udos` |
| `do version` / `do -V` | Package version |
| `do tour` | Quickstart walkthrough |
| `do update` | Rebuild workspace via sonic-express |
| `do uninstall` | Remove global `do`; optional `--delete-vault` |
| `do help` | Full help text |

Use **`do <command> --help`** for subcommands (e.g. `do feed export --help`).

## Output format (VA1)

Most commands print **plain text** to stdout. **`do feed export … --json`** emits JSON lines where implemented. A single JSON envelope for every command is **not** guaranteed in VA1; treat scripting as best-effort until documented per command.

## Exit codes (VA1)

| Code | Typical meaning |
| --- | --- |
| `0` | Success |
| `1` | Error / failed check (e.g. `do doctor`, missing vault) |

Finer codes (2–5) are **not** consistently assigned in VA1.

## Environment variables

| Variable | Role |
| --- | --- |
| `UDOS_VAULT` | Override vault root (default `~/vault`) |
| `UDOS_TEMPLATES_ROOT` | Override templates directory |
| `UDOS_CDN_BASE` | Font CDN origin (default `https://cdn.udo.space`) |
| `EDITOR` | Editor for `do open` / `do edit` |
| `DO_PREVIEW_PORT` | Port for `do publish preview` (default `4173`) |

## Version history

| Version | Date | Changes |
| --- | --- | --- |
| 1.0.0 | 2026-04-14 | Initial VA1 command reference |
