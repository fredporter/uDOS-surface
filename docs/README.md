# uDosConnect — top-level docs

## Policy (locked)

**Tagging, Open Box Format, grid, and style:** [documentation-policy.md](documentation-policy.md) — audience tags (`--public`, `--student`, `--contributor`, `--devonly`, `--draft`), publishing slots **0–7**, OBF fences (`obf`, `obf-style`, `grid`, `usxd`, `template`), Teletext grid, display sizes.

**Spec index:** [specs/README.md](specs/README.md)

## Index

| Doc | Purpose |
| --- | --- |
| [documentation-policy.md](documentation-policy.md) | **Master policy** + links to all specs |
| [DOCUMENTATION-MAINTENANCE.md](DOCUMENTATION-MAINTENANCE.md) | PR workflow, when to update style + commands |
| [specs/va1-style-guide.md](specs/va1-style-guide.md) | **VA1** consolidated style (OBF, colours, layout blocks) |
| [specs/obf-grid-spec.md](specs/obf-grid-spec.md) | **OBF Grid** / `udo grid` / `@udos/obf-grid` |
| [public/ucode-commands.md](public/ucode-commands.md) | **`udo` CLI** reference + **`--public`** command table (source of truth) |
| [specs/grid-cell-cube-maths.md](specs/grid-cell-cube-maths.md) | **Locked** 24×24 px cell, QR 8×8, cube, bricks |
| [specs/font-system-obf.md](specs/font-system-obf.md) | **Locked** Monaspace, OBF fonts, CDN, `udo font` |
| [specs/workflow-network-a1-a2.md](specs/workflow-network-a1-a2.md) | **A1/A2 split:** local workflow + A2 bridge/server/network stubs |
| [specs/vault-workspaces.md](specs/vault-workspaces.md) | **Vault workspaces** (`@toybox`, `@sandbox`, `.local/`, compost) |
| [specs/markdownify-integration.md](specs/markdownify-integration.md) | **Markdownify / MarkItDown** MCP — A1 spec, A2 wiring |
| [specs/feeds-and-spool.md](specs/feeds-and-spool.md) | **Feeds + spool** — text processors, `.local` config, A2 watchers |
| [specs/commonmark-reference.md](specs/commonmark-reference.md) | **CommonMark** — canonical spec links, `udo run` context |
| [specs/docker-integration.md](specs/docker-integration.md) | **Docker** — CLI / compose / SDK patterns (no GUI scope) |
| [specs/vector-db-research.md](specs/vector-db-research.md) | **Vector DB + WordPress** — Foam-informed A3 notes |
| [specs/usxd-go.md](specs/usxd-go.md) | **USXD-GO** — CHASIS/WIDGET/SKIN/LENS draft architecture + implementation checklist |
| [themes/nord.md](themes/nord.md) | **Nord** optional theme reference |
| [design/material-design-notes.md](design/material-design-notes.md) | **Material Design 3** principles notes (reference only) |
| [A1-structure-locked.md](A1-structure-locked.md) | **Locked A1 layout:** `core/`, `tools/`, `modules/`, `dev/`, `templates/`, `seed/` |
| [A1-CLEANUP-CHECKLIST.md](A1-CLEANUP-CHECKLIST.md) | **Status:** cleanup + path pass + VA1 deliverables |
| [public/README.md](public/README.md) | **`--public`** user-facing landing |
| [public/getting-started.md](public/getting-started.md) | **`--public`** Quickstart pointer |
| [public/vault-guide.md](public/vault-guide.md) | **`--public`** Vault overview |
| [public/feeds-guide.md](public/feeds-guide.md) | **`--public`** Feeds overview |
| [public/publishing-guide.md](public/publishing-guide.md) | **`--public`** Publish / preview |
| [public/faq.md](public/faq.md) | **`--public`** FAQ (tags, OBF, folders) |
| [student/README.md](student/README.md) | **`--student`** course-facing landing |
| [contributor/README.md](contributor/README.md) | **`--contributor`** invite / dev portal stubs |
| [contributor/cursor-mcp-setup.md](contributor/cursor-mcp-setup.md) | Cursor MCP setup for local `udo` stdio server + smoke test |
| [contributor/migrated-round2/README.md](contributor/migrated-round2/README.md) | **Round 2** migrated documentation batch (examples, wizard, knowledge subset, **`site/`**) |
| [templates/README.md](templates/README.md) | Tagged markdown templates |
| [family-workspace-layout.md](family-workspace-layout.md) | **Disk layout:** optional coding root, OS examples, monorepo + archive (link here; don’t repeat) |
| [shared-resources-architecture.md](shared-resources-architecture.md) | Shared Python / `~/.udos` layout and root `scripts/` helpers |
| [roadmap/README.md](roadmap/README.md) | Public roadmap pointers (`--published`, slot **5**) |
| [roadmap/pre-v5-family-notes.md](roadmap/pre-v5-family-notes.md) | **Beta** roadmap notes: **PRE5-R01–R07** + links to snapshots under **`dev/workflow/imported/`** *(historical “pre-v5” filename)* |
| [../dev/workflow/imported/2026-04-15-uDosDev-snapshot/README.md](../dev/workflow/imported/2026-04-15-uDosDev-snapshot/README.md) | Roadmap snapshot under **`dev/workflow/imported/`** *(historical folder name; **beta** program)* |
| [../scripts/imported/2026-04-15-uDosDocs/README.md](../scripts/imported/2026-04-15-uDosDocs/README.md) | Imported doc-maintenance scripts (review before CI wiring) |
| [ucoin-boundary.md](ucoin-boundary.md) | uCoin (barter) vs optional crypto |

**Contributor baseline:** canonical **`dev/`** + **`docs/`** trees match [CONTRIBUTING.md](../CONTRIBUTING.md). **Docs corpus–specific:** roadmap snapshot under **`dev/workflow/imported/2026-04-15-uDosDev-snapshot/`** *(historical directory name)*; **dev-only** reports (`--devonly`) follow the slotted template policy mirrored under **`dev/workflow/`**; **`--draft`** in **`dev/local/`** (gitignored); imported doc-script helpers **`scripts/imported/2026-04-15-uDosDocs/`** (review before use).
