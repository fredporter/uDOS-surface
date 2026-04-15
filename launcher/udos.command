#!/bin/bash
# uDos — one-click launcher (macOS). Double-click in Finder to open Terminal.
set -euo pipefail

echo "Starting uDos…"

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
UDOS_ROOT="$(dirname "$SCRIPT_DIR")"

SONIC="$UDOS_ROOT/tools/sonic-express/bin/sonic-express.mjs"
if [[ ! -f "$SONIC" ]]; then
  echo "Missing $SONIC — open uDosConnect repo at $UDOS_ROOT"
  read -r -n 1 -s
  exit 1
fi

node "$SONIC" install

UDO_BIN="$UDOS_ROOT/core/bin/udo.mjs"
if [[ ! -f "$UDO_BIN" ]]; then
  echo "Core not built — sonic-express should have installed it."
  read -r -n 1 -s
  exit 1
fi

node "$UDO_BIN" "$@"
exit_code=$?

if [[ $exit_code -ne 0 ]]; then
  echo ""
  echo "Press any key to close…"
  read -r -n 1 -s
fi
exit "$exit_code"
