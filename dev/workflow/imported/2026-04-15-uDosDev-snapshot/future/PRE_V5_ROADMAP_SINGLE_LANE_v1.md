---
title: "Pre-v5 single-lane round order (v1)"
tags: [--devonly]
audience: contributor
slot: 5
---

# Pre-v5 single-lane round order (v1)

**Canonical detail:** [`PRE_V5_ROADMAP_AND_EXECUTION_ROUNDS_v1.md`](./PRE_V5_ROADMAP_AND_EXECUTION_ROUNDS_v1.md) (version **1.7.3** as imported), especially **section 4** (exit criteria per round).

This file records the **one-lane execution order** **PRE5-R01 → PRE5-R07** so operators do not depend on a separate upstream-only filename. If **uDosDev** publishes a file with the same name, it must stay aligned with section 4 of the execution-rounds doc.

**Rule:** Rounds are **batches**, not strict releases; close a round when **exit criteria** in the execution-rounds doc pass.

| Order | Round | Goal (short) | Primary repos (typical) |
| --- | --- | --- | --- |
| 1 | **PRE5-R01** | Spec spine and roadmap parity — consumer repos point at locked specs | uDosDev → uDosGo |
| 2 | **PRE5-R02** | WordPress portal and two gates (universe + local) | wpmudev-agent |
| 3 | **PRE5-R03** | Spatial registry (voxel / cell / depth) | wpmudev-agent, optional Lambda |
| 4 | **PRE5-R04** | Tower of Knowledge (slots 0–7) | uDosGo, uMacDown |
| 5 | **PRE5-R05** | Cloud lane and Global Knowledge Bank | wpmudev-agent, static deploy |
| 6 | **PRE5-R06** | User lane and sync | uDosGo |
| 7 | **PRE5-R07** | Sibling integrations and verification | uFeedThru, uMacDown, uChatDown |

**Relationship to v5:** Pre-v5 rounds must **not** depend on v5 preview themes; see section 5 of the execution-rounds doc.
