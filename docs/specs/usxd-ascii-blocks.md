---
title: "USXD ASCII blocks"
tags: [--public]
audience: public
slot: 5
---

# USXD ASCII blocks

USXD surfaces can be authored as text/ASCII blocks and rendered in terminal or exported through tooling (`usxd-express`, `do usxd ...` integrations).

## Example

```usxd
SURFACE name="dashboard" version="A1.0.0"

STYLE
  background: #000000
  ink: #00FF00
  typography: "ui-monospace, monospace"

REGIONS
  header: "uDos Dashboard"
  status: "Ready"
```

## Commands

- `do usxd serve`
- `do usxd export`
- `do usxd validate <file>`
