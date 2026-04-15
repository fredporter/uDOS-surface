---
title: "Vector database research (Cloud WordPress)"
tags: [--public]
audience: public
slot: 5
status: "draft"
last_reviewed: "2026-04-15"
applies_to: "A3 planning — informed by Foam experiment"
---

# Vector database research for Cloud WordPress

**Status:** A3 planning — **findings to be filled** from the Foam experiment under vault **`@toybox/experiments/foam/`** (or repo mirror [`dev/toybox-experiments`](../../dev/toybox-experiments/README.md)).

## Research questions

1. How does **Foam** represent backlinks and graph edges?
2. Can **vector embeddings** approximate or augment those relationships for search and “related content”?
3. Which **AWS**-compatible options fit WordPress + uDos cloud lane: managed vector DB, **pgvector** on RDS, OpenSearch k-NN, Aurora ML-linked stores, third-party (e.g. Pinecone) — tradeoffs for cost, latency, and data residency.

## Foam findings (to document)

_Link to or paste from `@toybox/experiments/foam/findings.md` after the experiment week._

Expected topics:

- **Wikilinks:** `[[note]]` syntax and resolution rules.
- **Backlinks panel:** inbound vs outbound references.
- **Graph:** force-directed or similar layout; data source for nodes/edges.

## WordPress integration hypothesis (draft)

- Posts / CPTs → chunked text → **embeddings** stored with post IDs.
- Comments / reactions → optional edge features or separate embedding index.
- Query pattern: “posts related to X” → similarity search + permission filter at read time.

## Next steps

1. Run Foam locally (clone per toybox README).
2. Capture **`findings.md`** in the vault experiment folder.
3. Narrow AWS option shortlist with cost + ops constraints.
4. Cross-link any locked cloud boundary docs when A3 specs firm up.

## Related

- [feeds-and-spool.md](feeds-and-spool.md) — local text pipelines (complementary, not vector).
- [a1-a2-boundary.md](a1-a2-boundary.md) — WordPress cloud = A2/A3 side.
