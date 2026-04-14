---
title: "OBF UI blocks"
tags: [--public]
audience: public
slot: 5
---

# OBF UI blocks (` ```obf `)

Open Box Format UI blocks are markdown-first, text-authored components intended for static rendering and terminal-preview workflows.

## Supported block patterns (A1 reference)

- `COLUMNS`
- `CARD`
- `TABS`
- `ACCORDION`

These are authoring conventions in markdown and may be rendered by custom pipelines/plugins in downstream repos.

## A1.2 renderer status

- `do obf render <file>` supports terminal rendering for `CARD` and `COLUMNS`.
- `TABS` and `ACCORDION` remain parser/render targets for follow-up work.
- Publish/build-safe behavior in A1 is currently pass-through: ` ```obf` authoring blocks are source artifacts and are not transformed during `do publish build`.
- Downstream publish transforms can be added later as an optional renderer stage without changing source markdown.

## Example

```obf
CARD title="Getting Started"
  BODY
    This is a card component.
  FOOTER
    Button: [Learn More](#)
```
