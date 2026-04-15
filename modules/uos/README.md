# uos (scaffold)

Experimental uDos external-app launcher CLI.

This module is intentionally small: it validates `.obx` manifests and prints the intended container invocation for operator review.

## Run

```bash
cd modules/uos
go run ./cmd/uos apps list
go run ./cmd/uos launch airpaint --dry-run -- /tmp/example.png
```

## Manifests

Example manifests live in `modules/uos/apps/`.
