#!/usr/bin/env bash
# Verify TASKS.md exists at repo roots under ~/Code (v4 working set).
set -eu
CODE_ROOT="${UDOS_CODE_ROOT:-$HOME/Code}"
REPOS=(
  Linkdown
  Linkdown-premium
  Syncdown-app
  Chatdown
  UniversalSurfaceXD
  uDosConnect
  SonicScrewdriver
  uDosGo
)
missing=0
for name in "${REPOS[@]}"; do
  f="$CODE_ROOT/$name/TASKS.md"
  if [[ -f "$f" ]]; then
    echo "OK  $name"
  else
    echo "MISSING  $name → $f"
    missing=1
  fi
done
# uDosConnect uses uDosDev/TASKS.md as primary governance surface
if [[ -f "$CODE_ROOT/uDosConnect/uDosDev/TASKS.md" ]]; then
  echo "OK  uDosConnect/uDosDev/TASKS.md"
else
  echo "MISSING  uDosConnect/uDosDev/TASKS.md"
  missing=1
fi
exit "$missing"
