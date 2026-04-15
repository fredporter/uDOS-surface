---
title: "Markdownify MCP integration"
tags: [--public]
audience: public
slot: 5
---

# Markdownify MCP integration

**Status:** A1 spec + config template only — **full MCP wiring is A2** (see `dev/TASKS.md`, **T-A2-MCP**).

## Purpose

Convert heterogeneous documents (PDF, Office, images, audio, web pages) into **Markdown** for ingestion into uDos vaults and publishing pipelines. The reference stack is Microsoft’s **MarkItDown** ecosystem, exposed via an MCP server process that uDos can orchestrate alongside other tools.

## Requirements (operator machine)

- **Python** 3.10+ recommended for MarkItDown.
- **`uv`** (recommended) or `pip` for Python environments.
- **`markitdown[all]`** (or equivalent extras) for broad format support — see upstream MarkItDown install docs.

Example (illustrative):

```bash
uv pip install "markitdown[all]"
```

## Configuration

Copy [`dev/tools/markdownify-config.yaml.example`](../../dev/tools/markdownify-config.yaml.example) to a machine- or vault-scoped path such as **`.local/markdownify-config.yaml`** and adjust:

- **`server_path`** — MCP server entry (JS/TS `dist/index.js` or project-specific).
- **`uv_path`** — optional explicit `uv` binary if not on `PATH`.

## Usage (target)

- MCP clients attach to the configured server; tools expose conversion capabilities listed under `capabilities:` in the YAML template.
- **A2:** integrate with the uDos MCP orchestrator (`core-rs` MCP registry direction) and add **`udo import`**-style commands with progress for long jobs — not part of VA1 wireframe CLI.

## References

- Upstream **MarkItDown**: see current Microsoft documentation and repository.
- Vendor slot: [`vendor/markdownify-mcp/README.md`](../../vendor/markdownify-mcp/README.md).
