# `cdn/` — local mirror / wireframe (uDosConnect)

This directory is a **development seed** that mirrors the public CDN layout for **`cdn.udo.space`**.

- **`fonts/`** — `manifest.json` lists bundles (e.g. `retro`) and paths served at `https://cdn.udo.space/fonts/...`.
- **`fonts/seed/`** — optional offline copies of `.woff2` / `.ttf` (not committed; drop files here for `do font install` without network).

Production traffic should hit **`https://cdn.udo.space`** (or your Cloudflare / bucket). Configure deployment using **`dev/cdn-cloud-setup.md`** (`--devonly`).
