---
title: "A1 version mapping"
tags: [--public]
audience: public
slot: 5
---

# A1 version mapping (release alignment)

This file maps practical release numbers to the locked ladder in `version-ladder-a1-a2.md`.

## Mapping table

| Ladder stage | Scope signal | Suggested semver window |
| --- | --- | --- |
| A1.0.x | Wireframe core baseline (`vault`, markdown, grid/usxd local tooling, local publish) | `1.0.x` |
| A1.1.x | GitHub-native collaboration (`udo github`, `udo issue`, `udo pr`) | `1.1.x` |
| A1.2.x | OBF/UI renderer expansion (`udo usxd render/export parity`, `udo obf render`) | `1.2.x` |
| A1.3.x | Orchestration contracts + strict A2 stubs/boundary checks | `1.3.x` |

## Current package alignment

- `@udos/core` is currently tagged `1.0.0-va1`.
- Recommended realignment path:
  - Next publish-able baseline: `1.0.1` (stability/docs fixes only)
  - When GitHub-native flow is considered complete end-to-end: bump to `1.1.0`
  - When OBF UI renderer scope is accepted: bump to `1.2.0`
  - When orchestration contracts + boundary enforcement are complete: bump to `1.3.0`

## Bump rules (A1)

- Patch (`x.y.Z`): bugfixes/docs/tests/internal refactors with no command-surface expansion.
- Minor (`x.Y.z`): new user-facing command capability in A1 scope.
- Major (`X.y.z`): reserved for boundary model changes or A2 transition.

## Notes

- This mapping is release-policy guidance and does not override locked A1/A2 boundaries.
- A2 versions remain governed by `version-ladder-a1-a2.md`.
