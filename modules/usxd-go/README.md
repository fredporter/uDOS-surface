# @udos/usxd-go

Alpha baseline scaffold for `v0.1.0-alpha.1`.

Current scope:

- `version.go` semver prerelease constants (`v0.1.0-alpha.1`)
- Minimal USXD state model (`open_box`, `chassis`, `widgets`)
- Four widget serializers in `widgets/`
- HTTP endpoint: `/api/usxd/state`
- WebSocket endpoint: `/ws/usxd`

Run server:

```bash
cd modules/usxd-go
go run ./cmd/usxd-server
```

Demo example:

```bash
cd modules/usxd-go
go run ./examples/four-components
```

References:

- Spec: `docs/specs/usxd-go.md`
- Versioning policy: `docs/specs/version-mapping-a1.md`
