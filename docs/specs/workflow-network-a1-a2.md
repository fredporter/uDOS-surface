---
title: "Workflow, server, and network split (A1/A2)"
tags: [--public]
audience: public
slot: 5
---

# Workflow, always-on server, and network split

## Core split

- **A1**: local, offline-first wireframe behavior.
- **A2**: always-on server, distributed/network behavior.
- **Bridge**: A1 stubs call A2 when configured; otherwise they queue locally.

## A1 workflow

- Engine: TypeScript CLI commands.
- Storage: `~/.local/share/udos/workflow.db` (SQLite via Node `node:sqlite`).
- Triggers: manual (`do workflow run`), schedule metadata, file-based/manual actions.
- Logging: `~/.local/share/udos/logs/workflow.log`.

Commands:

- `do workflow list`
- `do workflow create <name> --step 'action'`
- `do workflow run <name>`
- `do workflow schedule <name> --cron '0 2 * * *'`
- `do workflow status <name>`
- `do workflow logs <name>`

## A2 workflow and server stubs

- `do workflow server start|status` (A2-oriented stubs)
- `do workflow webhook add <name> --url <url>`
- `do workflow webhook list`
- `do workflow queue list`
- `do server start|stop|status|logs`
- `do server configure --port 8080`
- `do a2 configure --url <url> [--api-key]`
- `do a2 status`

## A1 → A2 bridge

- Config file: `~/.config/udos/a2.yaml`
- Bridge API helper: `core/src/lib/a2-bridge.ts`
- Sync behavior:
  - `do sync pull/push` calls A2 when configured
  - otherwise queues operations into `workflow_queue`

## Network split

- **A1 local-only**: preview HTTP server, live reload WS, offline queueing.
- **A2 cloud-first**: HTTPS API, webhook receiver, distributed events, OAuth/webhooks integrations.

See local dev-only stub note: `dev/features/network-stubs.md`.
