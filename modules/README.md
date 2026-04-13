# uDosConnect — `modules/`

In-tree **product modules** (not the same as Git **submodules** `uDosDev` / `uDosDocs`). Each folder may later be extracted to its own repository and wired via `.gitmodules` when a remote and versioning policy are ready.

| Module | Version | Role |
| --- | --- | --- |
| [`ucoin/`](ucoin/) | **1.0.0.0** (spec) | Community **uCoin** ledger — barter default, optional crypto bridge, optional trading desk |
| [`udos-db-schema/`](udos-db-schema/) | **v1.0** (DDL) | **T1–T5** tree: canonical [`sqlite/schema.sql`](udos-db-schema/sqlite/schema.sql); migrations; postgres/mysql/lmdb/airgap stubs; [`MIGRATION.md`](udos-db-schema/MIGRATION.md); init: [`scripts/init-udos-sqlite.sh`](../scripts/init-udos-sqlite.sh) |
