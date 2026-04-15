---
title: "USXD-GO technical specification"
tags: [--public]
audience: public
slot: 5
status: "draft"
last_reviewed: "2026-04-15"
applies_to: "A2/A3 planning; recorded in A1 as spec"
---

# USXD-GO technical specification

Version: `1.0.0-draft`  
Status: Draft for implementation planning

## 1) Four-layer IO model

USXD-GO aligns to:

- **CHASIS**: core layout/runtime and serialization
- **WIDGET**: reusable UI components
- **SKIN**: visual styling and tokens
- **LENS**: future gameplay/filter overlays

This model is architectural planning for A2/A3 and beyond.

## 2) Open Box compatible USXD JSON

USXD blocks should be self-describing, portable, and schema-addressable:

- `open_box` metadata
- explicit `version`
- structured `chassis`, `widgets`, `skin`, `lens`, `state`

The draft contract supplied in operator notes is the canonical working proposal for this phase.

## 3) Initial component targets

- Login form
- Data table
- Tabbed interface
- Async loader

Each component should serialize to an Open Box-compatible USXD block.

## 4) Tailwind / skin bridge

For browser rendering:

- tokenized uDos colors/typography/spacing
- component classes matching USXD primitives
- dark-first defaults with accessibility guardrails

## 5) React renderer bridge

A renderer can consume USXD JSON snapshots (poll or WebSocket stream) and map to UI components while keeping terminal/browser semantics aligned.

## 6) Cursor implementation checklist

Implementation checklist (Go module, components, server bridge, skin config, renderer, tests) is accepted as planning scope and intentionally deferred to explicit A2 authorization.

## 7) A1 boundary

In A1 this is a **spec-only artifact**:

- no mandatory `usxd-go` runtime shipping requirement
- no A2 feature execution until explicit operator permission
