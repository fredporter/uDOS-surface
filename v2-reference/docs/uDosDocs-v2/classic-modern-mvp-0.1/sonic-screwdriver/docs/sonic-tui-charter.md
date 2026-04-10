# Sonic Screwdriver — TUI Charter

## One-line charter

`sonic-screwdriver` is a terminal-only fixer/installer/setup tool; it must never require or open a browser for its core job.

## Scope

### In scope

- first-run setup
- repair
- health checks
- doctor/preflight
- guided fixes
- wrapping env sanity checks and dependency verification
- clear logs and explicit next steps

### Out of scope

- browser GUI for install/setup
- rich day-to-day product GUI
- sonic-db browsing GUI as a first-class surface here

That UI belongs in ThinUI/uDOS or a sibling product surface.

## Target stack

Preferred direction:

- Go + Bubble Tea + Lip Gloss

Rationale:

- single-binary friendly
- interactive terminal UX
- good fit for guided flows
- SSH-safe
- suitable as a pattern source for future uDOS TUI utility work

## User flows

### 1. Fresh clone / first run

- user runs a single entry command
- Sonic checks environment and dependencies
- Sonic performs or guides setup
- success output is concise and explicit

### 2. Repair

- user runs repair flow on broken or incomplete environment
- Sonic identifies issue classes
- Sonic either fixes directly or gives exact next actions

### 3. Doctor / preflight

- user runs doctor flow
- Sonic prints system summary, detected issues, and readiness state

### 4. Optional plan/init lane

Only include if it remains clearly utility-scoped.

## Failure handling

- no raw stack traces by default
- human-readable errors
- always print next recommended action
- preserve log paths when deeper debugging is needed

## Deprecation / migration

Default brief direction:

- deprecate browser-launch path for core install/setup
- stub or remove `sonic-open` style behavior
- move any richer GUI needs to ThinUI/uDOS

## Acceptance criteria

- no subprocess opens a browser for core install/setup/doctor flows
- all critical flows run over SSH without `$DISPLAY`
- one documented entry command
- clear exit codes and human-readable summary
- no GUI dependency for core job completion

## Scope reminder

Sonic is a tool, not a product surface.
