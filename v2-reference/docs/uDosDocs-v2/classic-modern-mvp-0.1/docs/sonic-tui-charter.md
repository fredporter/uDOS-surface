# Sonic Screwdriver — TUI Charter

**Canonical location:** this file under `uDOS-docs/docs/v2/classic-modern-mvp-0.1/docs/`. **In-repo copy** for implementation (must stay aligned): `sonic-screwdriver/docs/sonic-tui-charter.md`.

---

## One-line charter

sonic-screwdriver is a terminal-only fixer/installer/setup tool; it must never require or open a browser for its core job.

---

## Scope

### In

- install — including applying the **Classic Modern uDOS-host profile** (see `docs/classic-modern-host-profile.md` in this pack) as the **default** outcome when Sonic is used to install the family **Ubuntu baseline** host, unless the operator explicitly selects a different profile. This is intentionally **not** “whatever stock GNOME looks like”; it is the de-modernised host posture the family ships for uDOS-host.
- repair
- environment setup
- health checks
- guided fixes
- clear logs + next steps

### Out

- browser GUI
- visual dashboards
- sonic-db GUI

These belong in uDOS (ThinUI or other surfaces)

---

## Stack

Preferred (longer term):

- Go + Bubble Tea + Lip Gloss

Reason:

- single binary
- fast
- interactive
- SSH-safe

**Track A implementation (sonic-screwdriver today):** `sonic tui` ships as **Python + Textual** (`udos-sonic[tui]` extra), sharing doctor and dry-run plan logic with the existing CLI. Matches charter behaviours (no browser on that path; SSH-safe) until a Go binary is prioritized. In-repo mirror: `sonic-screwdriver/docs/sonic-tui-charter.md`.

---

## User flows

### 1. First run

Input:

- `sonic`

Output:

- setup complete
- clear summary
- exit success

### 2. Repair

Input:

- broken env

Output:

- detected issue
- fixed or instructions

### 3. Doctor

Input:

- `sonic doctor`

Output:

- system health summary

---

## Failure handling

- human-readable messages
- no stack traces by default
- always provide next action

---

## Deprecation

- remove browser-based UI from this repo
- move UI to uDOS layer if needed

---

## Acceptance criteria

- no browser launched
- works over SSH
- no GUI dependency
- single command entry
- deterministic output

---

## Principle

Sonic is a tool, not a product surface.
