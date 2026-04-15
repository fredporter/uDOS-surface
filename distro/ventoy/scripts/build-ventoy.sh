#!/usr/bin/env bash
set -euo pipefail

# build-ventoy.sh - Build branded Ventoy media (scaffold)
#
# This repository does not vendor a full Ventoy checkout by default.
# Place your Ventoy fork under: distro/ventoy/base/
# Then run this script from a developer machine with Ventoy build tooling installed.

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
DISTRO_VENTOY_DIR="$(cd "${SCRIPT_DIR}/.." && pwd)"
VENTOY_FORK="${DISTRO_VENTOY_DIR}/base"
OUTPUT_DIR="${DISTRO_VENTOY_DIR}/../iso/output"

mkdir -p "${OUTPUT_DIR}"

if [[ ! -d "${VENTOY_FORK}" ]]; then
  echo "Missing Ventoy checkout at: ${VENTOY_FORK}" >&2
  exit 1
fi

# Heuristic: treat base/ as populated only if it contains more than placeholders.
if [[ "$(find "${VENTOY_FORK}" -mindepth 1 -maxdepth 1 | wc -l | tr -d ' ')" == "0" ]]; then
  echo "Ventoy checkout directory is empty: ${VENTOY_FORK}" >&2
  echo "Populate it with a Ventoy fork before building." >&2
  exit 1
fi

echo "Applying branding scaffold..."
"${SCRIPT_DIR}/apply-branding.sh" "${VENTOY_FORK}"

echo
echo "NOTE: Ventoy build steps are environment-specific."
echo "Expected next steps (operator):"
echo "  - cd \"${VENTOY_FORK}\""
echo "  - run the Ventoy-supported build script for your platform (example names vary by Ventoy version)"
echo "  - write artifacts into: ${OUTPUT_DIR}"
echo
echo "This scaffold stops before executing vendor-specific build commands."
