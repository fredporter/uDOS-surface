# uDos Connect UI — unified views (`@udos/views`)

Single-source Vue 3 views for vault, tasks, contacts, workflows, dashboard, chat, and settings. Inkdown and the web shell import these components; **do not fork** duplicate implementations elsewhere.

- **Package:** `ui/` → npm name `@udos/views`
- **Entry:** `src/views/index.ts` (types + component re-exports)
- **Tokens:** `src/views/styles/view-tokens.css` (imported per view)
- **Mock data:** `src/views/data/defaults.ts` (override via props when wiring the vault)

**Host bundler alias:** map `@udos/views` → `…/uDosConnect/ui/src/views` (or to this package name once published).

```bash
cd ui && npm run typecheck
```

NextChat embed (`ChatView.vue`) expects `/vendor/nextchat` to be served like the existing widget test bed.
