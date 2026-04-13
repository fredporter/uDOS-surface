# uCoin vs cryptocurrency — boundary (family note)

**Canonical module:** [`modules/ucoin/`](../modules/ucoin/)

| Term | Meaning in uDos |
| --- | --- |
| **uCoin (default)** | **Barter / contribution tracker** — local ledger, trusted contacts, optional mesh sync. **Not** a blockchain asset in v1. |
| **uCoin (crypto mode)** | **Optional** — user opt-in after intake; **non-custodial**; may interface with **Stellar** per module specs. |
| **Cryptocurrency (general)** | Third-party networks (e.g. Stellar, Bitcoin) — **uDos does not operate** these networks. |

**Family spec:** [SPATIAL_STORAGE_ECOSYSTEM_v1](https://github.com/fredporter/uDosDev/blob/main/docs/specs/v4/SPATIAL_STORAGE_ECOSYSTEM_v1.md) uses **uCoin** as an **economic accounting** term. The **`modules/ucoin`** tree defines **shipping boundaries** for apps (barter first, crypto optional).
