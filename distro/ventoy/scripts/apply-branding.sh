#!/usr/bin/env bash
set -euo pipefail

# apply-branding.sh - Applies OBX branding to a Ventoy checkout (scaffold)
# Usage: ./apply-branding.sh /path/to/ventoy/checkout

VENTOY_DIR="${1:-}"
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
BRANDING_DIR="$(cd "${SCRIPT_DIR}/../branding" && pwd)"
CONFIG_FILE="${BRANDING_DIR}/config.obx"

if [[ -z "${VENTOY_DIR}" ]]; then
  echo "Usage: $0 /path/to/ventoy/checkout" >&2
  exit 1
fi

if [[ ! -d "${VENTOY_DIR}" ]]; then
  echo "Ventoy directory not found: ${VENTOY_DIR}" >&2
  exit 1
fi

if [[ ! -f "${CONFIG_FILE}" ]]; then
  echo "Branding config not found: ${CONFIG_FILE}" >&2
  exit 1
fi

echo "Parsing branding config: ${CONFIG_FILE}"

BACKGROUND_REL="$(awk -F': ' '/^background:/ {print $2; exit}' "${CONFIG_FILE}" | tr -d ' \"')"
LOGO_REL="$(awk -F': ' '/^logo:/ {print $2; exit}' "${CONFIG_FILE}" | tr -d ' \"')"

if [[ -z "${BACKGROUND_REL}" || -z "${LOGO_REL}" ]]; then
  echo "Could not parse background/logo paths from OBX frontmatter." >&2
  exit 1
fi

BACKGROUND_SRC="${BRANDING_DIR}/${BACKGROUND_REL#./}"
LOGO_SRC="${BRANDING_DIR}/${LOGO_REL#./}"

THEME_DIR="${VENTOY_DIR}/grub/theme"
mkdir -p "${THEME_DIR}"

cp -f "${BACKGROUND_SRC}" "${THEME_DIR}/background.png"
cp -f "${LOGO_SRC}" "${THEME_DIR}/logo.svg"

echo "Applying string replacements (best-effort; paths may differ by Ventoy version)..."

while IFS= read -r line; do
  if [[ "${line}" =~ from:[[:space:]]*\"(.*)\"[[:space:]]*to:[[:space:]]*\"(.*)\" ]]; then
    FROM="${BASH_REMATCH[1]}"
    TO="${BASH_REMATCH[2]}"
    echo "  Replacing '${FROM}' → '${TO}'"
    if [[ -d "${VENTOY_DIR}/grub" ]]; then
      find "${VENTOY_DIR}/grub" -type f \( -name "*.cfg" -o -name "*.lst" -o -name "*.mod" -o -name "*.efi" \) -print0 2>/dev/null \
        | xargs -0 grep -l "${FROM}" 2>/dev/null | while read -r f; do
          sed -i '' "s/${FROM}/${TO}/g" "${f}"
        done || true
    fi
    if [[ -d "${VENTOY_DIR}/INSTALL" ]]; then
      find "${VENTOY_DIR}/INSTALL" -type f -print0 2>/dev/null \
        | xargs -0 grep -l "${FROM}" 2>/dev/null | while read -r f; do
          sed -i '' "s/${FROM}/${TO}/g" "${f}"
        done || true
    fi
  fi
done < <(awk '/replace_strings:/{flag=1;next} /^##/{if(flag){exit}} flag && /from:/{print}' "${CONFIG_FILE}")

MENU_BG="$(awk -F': ' '/selected_bg:/ {print $2; exit}' "${CONFIG_FILE}" | tr -d ' \"')"
MENU_FG="$(awk -F': ' '/selected_fg:/ {print $2; exit}' "${CONFIG_FILE}" | tr -d ' \"')"

if [[ -n "${MENU_BG}" && -n "${MENU_FG}" ]]; then
  cat >> "${THEME_DIR}/theme.txt" <<EOF

# uDos branding overrides (generated)
selected_item_color = "${MENU_FG}"
selected_item_bg_color = "${MENU_BG}"
EOF
fi

echo "Branding scaffold applied to: ${VENTOY_DIR}"
