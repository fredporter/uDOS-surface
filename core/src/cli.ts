import { Command } from "commander";
import { VA1_HELP } from "./help-text.js";
import {
  cmdInit,
  cmdVaultInit,
  cmdList,
  cmdOpen,
  cmdEdit,
  cmdDelete,
  cmdRestore,
  cmdSearch,
} from "./actions/vault.js";
import { cmdMdFormat, cmdMdLint, cmdMdToc } from "./actions/markdown.js";
import { cmdFmAdd, cmdFmList, cmdFmEdit } from "./actions/frontmatter.js";
import { cmdTemplateList, cmdTemplateShow, cmdTemplateApply } from "./actions/templates.js";
import {
  cmdFeedList,
  cmdFeedView,
  cmdFeedExport,
  cmdFeedShow,
  cmdFeedEnable,
  cmdFeedDisable,
  cmdFeedTest,
} from "./actions/feed.js";
import {
  cmdSpoolList,
  cmdSpoolInfo,
  cmdSpoolExtract,
  cmdSpoolShow,
  cmdSpoolRun,
  cmdSpoolRunAll,
  cmdSpoolStatus,
} from "./actions/spool.js";
import {
  cmdPublishBuild,
  cmdPublishDeploy,
  cmdPublishPreview,
  cmdPublishStatus,
  cmdSyncStatus,
  cmdSyncPull,
  cmdSyncPush,
  cmdUsxdList,
  cmdUsxdApply,
  cmdUsxdShow,
} from "./actions/publish-sync-usxd.js";
import { cmdGuiDemos, cmdGuiOpen, cmdUsxdEdit, runUsxdExpress } from "./actions/usxd-express-tool.js";
import {
  cmdVersion,
  cmdStatus,
  cmdDoctor,
  cmdCleanup,
  cmdClean,
  cmdTidy,
  cmdPing,
  cmdPong,
  cmdHealth,
  readPackageVersion,
} from "./actions/util.js";
import { getVaultRoot } from "./paths.js";
import { cmdTour } from "./actions/tour.js";
import { cmdUpdate, cmdUninstall } from "./actions/self-manage.js";
import { cmdFontActivate, cmdFontInstall, cmdFontList, cmdFontPreview } from "./actions/font.js";
import {
  cmdServerConfigure,
  cmdServerLogs,
  cmdServerStart,
  cmdServerStatus,
  cmdServerStop,
} from "./actions/server.js";
import { cmdA2Configure, cmdA2Status } from "./actions/a2.js";
import { cmdBeaconScan } from "./actions/beacon.js";
import {
  cmdGitHubClone,
  cmdGitHubConfigure,
  cmdGitHubFork,
  cmdGitHubPull,
  cmdGitHubPush,
  cmdGitHubRelease,
  cmdGitHubStatus,
  cmdGitHubSync,
  cmdIssueCreate,
  cmdIssueList,
  cmdPrApprove,
  cmdPrCheckout,
  cmdPrCreate,
  cmdPrList,
  cmdPrReview,
  cmdPrMerge,
} from "./actions/github.js";
import { cmdWpPublish, cmdWpReview, cmdWpSync } from "./actions/wordpress.js";
import { cmdApprove, cmdReview, cmdSubmit } from "./actions/collab.js";
import {
  cmdGridEdit,
  cmdGridExport,
  cmdGridFlip,
  cmdGridLayerAdd,
  cmdGridLayerList,
  cmdGridLayerMerge,
  cmdGridLayerShow,
  cmdGridRender,
  cmdGridResize,
  cmdGridRotate,
  cmdGridValidate,
} from "./actions/grid.js";
import { cmdObfRender } from "./actions/obf-ui.js";
import type { GridMode } from "@udos/obf-grid";

export async function main(argv: string[]): Promise<void> {
  const args = argv.slice(2);
  if (args.length === 0 || args[0] === "help") {
    console.log(VA1_HELP);
    return;
  }

  const program = new Command();
  program.name("udo").description("uDos VA1 — pure TypeScript CLI");
  program.version(await readPackageVersion(), "-V, --version");

  program.command("init").description("Initialize vault (full scaffold)").action(async () => cmdInit());
  const vaultCmd = program.command("vault").description("Vault layout and workspace scaffold");
  vaultCmd
    .command("init")
    .argument("[path]", "Vault root (default: UDOS_VAULT or ~/vault)")
    .description("Initialize vault — same layout as udo init, optional explicit path")
    .action(async (p: string | undefined) => cmdVaultInit(p));
  program.command("list").description("List vault contents").action(async () => cmdList());
  program.command("open").argument("<file>").description("Open in $EDITOR").action(async (f) => cmdOpen(f));
  program.command("edit").argument("<file>").description("Edit via editor").action(async (f) => cmdEdit(f));
  program.command("delete").argument("<file>").description("Move to .compost/").action(async (f) => cmdDelete(f));
  program.command("restore").argument("<id>").description("Restore from compost").action(async (id) => cmdRestore(id));
  program.command("search").argument("<query>").description("Search vault").action(async (q) => cmdSearch(q));

  const md = program.command("md").description("Markdown utilities");
  md.command("format").argument("<file>").action(async (f) => cmdMdFormat(f));
  md.command("lint").argument("<file>").action(async (f) => cmdMdLint(f));
  md.command("toc").argument("<file>").action(async (f) => cmdMdToc(f));

  const fm = program.command("fm").description("Frontmatter");
  fm.command("add")
    .argument("<file>")
    .requiredOption("--tag <tag>", "Tag to add")
    .action(async (f, o) => cmdFmAdd(f, o.tag));
  fm.command("list").argument("<file>").action(async (f) => cmdFmList(f));
  fm.command("edit").argument("<file>").action(async (f) => cmdFmEdit(f));

  const tpl = program.command("template").description("Templates");
  tpl.command("list").action(async () => cmdTemplateList());
  tpl.command("apply").argument("<name>").action(async (n) => cmdTemplateApply(n));
  tpl.command("show").argument("<name>").action(async (n) => cmdTemplateShow(n));

  const feed = program.command("feed").description("Feeds (read-only)");
  feed.command("list").action(async () => cmdFeedList());
  feed.command("view").argument("<name>").action(async (n) => cmdFeedView(n));
  feed.command("show").argument("<name>").action(async (n) => cmdFeedShow(n));
  feed.command("enable").argument("<name>").action(async (n) => cmdFeedEnable(n));
  feed.command("disable").argument("<name>").action(async (n) => cmdFeedDisable(n));
  feed
    .command("test")
    .argument("<name>")
    .option("--dry-run", "Inspect action only")
    .action(async (n, o: { dryRun?: boolean }) => cmdFeedTest(n, Boolean(o.dryRun)));
  feed
    .command("export")
    .argument("<name>")
    .option("--json", "Pretty JSON array")
    .action(async (n, o) => cmdFeedExport(n, Boolean(o.json)));

  const spool = program.command("spool").description("Spools");
  spool.command("list").action(async () => cmdSpoolList());
  spool.command("info").argument("<name>").action(async (n) => cmdSpoolInfo(n));
  spool.command("show").argument("<name>").action(async (n) => cmdSpoolShow(n));
  spool.command("extract").argument("<name>").action(async (n) => cmdSpoolExtract(n));
  spool
    .command("run")
    .argument("[name]")
    .option("--all", "Run all enabled spools")
    .option("--dry-run", "Show impact only")
    .action(async (name: string | undefined, o: { all?: boolean; dryRun?: boolean }) => {
      if (o.all) return cmdSpoolRunAll(Boolean(o.dryRun));
      if (!name) throw new Error("spool run requires <name> unless --all is used");
      return cmdSpoolRun(name, Boolean(o.dryRun));
    });
  spool.command("status").action(async () => cmdSpoolStatus());

  const trash = program.command("trash").description("Trash/composer operations");
  trash.command("move").argument("<file>").action(async (f) => {
    const t = await import("./actions/trash.js");
    return t.cmdTrashMove(getVaultRoot(), f);
  });
  trash
    .command("restore")
    .argument("<idOrPath>")
    .option("--to <path>", "Restore destination")
    .action(async (id: string, o: { to?: string }) => {
      const t = await import("./actions/trash.js");
      return t.cmdTrashRestore(getVaultRoot(), id, o.to);
    });
  trash.command("list").action(async () => {
    const t = await import("./actions/trash.js");
    return t.cmdTrashList(getVaultRoot());
  });
  trash.command("search").argument("<query>").action(async (q) => {
    const t = await import("./actions/trash.js");
    return t.cmdTrashSearch(getVaultRoot(), q);
  });
  trash
    .command("clean")
    .option("--older-than <d>", "Age cutoff, e.g. 30d")
    .option("--priority-binary", "Delete binary entries first")
    .option("--dry-run", "Show candidates only")
    .action(async (o: { olderThan?: string; priorityBinary?: boolean; dryRun?: boolean }) => {
      const t = await import("./actions/trash.js");
      return t.cmdTrashClean(getVaultRoot(), {
        olderThan: o.olderThan,
        priorityBinary: Boolean(o.priorityBinary),
        dryRun: Boolean(o.dryRun),
      });
    });

  const compost = program.command("compost").description("Compost index operations");
  const compostIndex = compost.command("index").description("Compost index");
  compostIndex.command("rebuild").action(async () => {
    const t = await import("./actions/trash.js");
    return t.cmdCompostIndexRebuild(getVaultRoot());
  });
  compostIndex.command("verify").action(async () => {
    const t = await import("./actions/trash.js");
    return t.cmdCompostIndexVerify(getVaultRoot());
  });
  compostIndex.command("stats").action(async () => {
    const t = await import("./actions/trash.js");
    return t.cmdCompostIndexStats(getVaultRoot());
  });

  const pub = program.command("publish").description("Publishing");
  pub.command("build").action(async () => cmdPublishBuild());
  pub.command("preview").action(async () => cmdPublishPreview());
  pub.command("status").action(async () => cmdPublishStatus());
  pub.command("deploy").description("Deploy built site to GitHub Pages (gh-pages)").action(async () => cmdPublishDeploy());

  const sync = program.command("sync").description("Cloud sync (stub)");
  sync.command("status").action(async () => cmdSyncStatus());
  sync.command("pull").action(async () => cmdSyncPull());
  sync.command("push").action(async () => cmdSyncPush());

  const github = program.command("github").description("GitHub-native vault + repo workflow");
  github.command("status").action(async () => cmdGitHubStatus());
  github.command("pull").action(async () => cmdGitHubPull());
  github
    .command("push")
    .option("-m, --message <msg>", "Commit message")
    .action(async (o: { message?: string }) => cmdGitHubPush(o.message));
  github
    .command("sync")
    .option("-m, --message <msg>", "Commit message")
    .action(async (o: { message?: string }) => cmdGitHubSync(o.message));
  github
    .command("clone")
    .argument("<repo>", "owner/repo or clone URL")
    .option("-d, --dir <path>", "Target directory (default: vault path)")
    .action(async (repo: string, o: { dir?: string }) => cmdGitHubClone(repo, o.dir));
  github
    .command("fork")
    .argument("[repo]", "owner/repo (default from github config)")
    .action(async (repo?: string) => cmdGitHubFork(repo));
  github
    .command("configure")
    .option("--username <u>", "GitHub username")
    .option("--repo <owner/repo>", "Default repo")
    .action(async (o: { username?: string; repo?: string }) => cmdGitHubConfigure(o.username, o.repo));
  github
    .command("release")
    .argument("<tag>", "Tag name")
    .option("--notes <notes>", "Release notes")
    .action(async (tag: string, o: { notes?: string }) => cmdGitHubRelease(tag, o.notes));

  const issue = program.command("issue").description("GitHub issues");
  issue
    .command("create")
    .requiredOption("--title <title>", "Issue title")
    .option("--body <body>", "Issue body")
    .action(async (o: { title: string; body?: string }) => cmdIssueCreate(o.title, o.body));
  issue.command("list").option("--limit <n>", "Limit", "20").action(async (o: { limit: string }) => cmdIssueList(parseInt(o.limit, 10) || 20));

  const pr = program.command("pr").description("GitHub pull requests");
  pr
    .command("create")
    .option("--title <title>")
    .option("--body <body>")
    .option("--base <branch>", "Base branch")
    .action(async (o: { title?: string; body?: string; base?: string }) => cmdPrCreate(o.title, o.body, o.base));
  pr.command("list").option("--limit <n>", "Limit", "20").action(async (o: { limit: string }) => cmdPrList(parseInt(o.limit, 10) || 20));
  pr.command("checkout").argument("<id>").action(async (id: string) => cmdPrCheckout(id));
  pr
    .command("review")
    .argument("<id>")
    .option("--body <text>", "Review comment body")
    .action(async (id: string, o: { body?: string }) => cmdPrReview(id, o.body));
  pr.command("approve").argument("<id>").action(async (id: string) => cmdPrApprove(id));
  pr.command("merge").argument("<id>").action(async (id: string) => cmdPrMerge(id));

  const wp = program.command("wp").description("WordPress docs/content workflow (A1 stubs)");
  wp.command("sync").action(async () => cmdWpSync());
  wp.command("publish").action(async () => cmdWpPublish());
  wp.command("review").action(async () => cmdWpReview());

  program
    .command("submit")
    .argument("[pathOrArea]", "Path used for auto-detection (code/docs)")
    .option("--target <t>", "code | docs")
    .action(async (p?: string, o?: { target?: string }) => cmdSubmit(p, o?.target));
  program
    .command("review")
    .argument("[pathOrArea]", "Path used for auto-detection (code/docs)")
    .option("--target <t>", "code | docs")
    .option("--pr <id>", "PR id for code reviews")
    .action(async (p?: string, o?: { target?: string; pr?: string }) => cmdReview(p, o?.target, o?.pr));
  program
    .command("approve")
    .argument("[pathOrArea]", "Path used for auto-detection (code/docs)")
    .option("--target <t>", "code | docs")
    .option("--pr <id>", "PR id for code approvals")
    .action(async (p?: string, o?: { target?: string; pr?: string }) => cmdApprove(p, o?.target, o?.pr));

  const workflow = program.command("workflow").description("A1 local workflow engine (SQLite) + A2 bridge stubs");
  workflow.command("list").action(async () => {
    const w = await import("./actions/workflow.js");
    return w.cmdWorkflowList();
  });
  workflow
    .command("create")
    .argument("<name>")
    .requiredOption("--step <action...>", "Step action(s), e.g. --step 'shell:echo hi' --step 'spool:create'")
    .action(async (name: string, o: { step: string[] }) => {
      const w = await import("./actions/workflow.js");
      return w.cmdWorkflowCreate(name, o.step);
    });
  workflow.command("run").argument("<name>").action(async (name: string) => {
    const w = await import("./actions/workflow.js");
    return w.cmdWorkflowRun(name);
  });
  workflow
    .command("schedule")
    .argument("<name>")
    .requiredOption("--cron <expr>", "Cron expression, e.g. '0 2 * * *'")
    .action(async (name: string, o: { cron: string }) => {
      const w = await import("./actions/workflow.js");
      return w.cmdWorkflowSchedule(name, o.cron);
    });
  workflow.command("status").argument("<name>").action(async (name: string) => {
    const w = await import("./actions/workflow.js");
    return w.cmdWorkflowStatus(name);
  });
  workflow.command("logs").argument("<name>").action(async (name: string) => {
    const w = await import("./actions/workflow.js");
    return w.cmdWorkflowLogs(name);
  });
  const workflowServer = workflow.command("server").description("A2 workflow server stubs");
  workflowServer.command("start").action(async () => {
    const w = await import("./actions/workflow.js");
    return w.cmdWorkflowServerStart();
  });
  workflowServer.command("status").action(async () => {
    const w = await import("./actions/workflow.js");
    return w.cmdWorkflowServerStatus();
  });
  const workflowWebhook = workflow.command("webhook").description("A2 webhook stubs");
  workflowWebhook
    .command("add")
    .argument("<name>")
    .requiredOption("--url <url>", "Webhook URL")
    .action(async (name: string, o: { url: string }) => {
      const w = await import("./actions/workflow.js");
      return w.cmdWorkflowWebhookAdd(name, o.url);
    });
  workflowWebhook.command("list").action(async () => {
    const w = await import("./actions/workflow.js");
    return w.cmdWorkflowWebhookList();
  });
  const workflowQueue = workflow.command("queue").description("A2 bridge queue");
  workflowQueue.command("list").action(async () => {
    const w = await import("./actions/workflow.js");
    return w.cmdWorkflowQueueList();
  });

  const a2 = program.command("a2").description("A2 bridge config");
  a2.command("status").action(async () => cmdA2Status());
  a2
    .command("configure")
    .requiredOption("--url <url>", "A2 base URL, e.g. https://api.example.com")
    .option("--api-key <key>", "Bearer API key")
    .action(async (o: { url: string; apiKey?: string }) => cmdA2Configure(o.url, o.apiKey));
  const a2Server = a2.command("server").description("A2 always-on server controls (A1 stubs)");
  a2Server.command("start").action(async () => cmdServerStart());
  a2Server.command("stop").action(async () => cmdServerStop());
  a2Server.command("status").action(async () => cmdServerStatus());
  a2Server.command("logs").action(async () => cmdServerLogs());
  a2Server
    .command("configure")
    .requiredOption("--port <port>", "Port number, e.g. 8080")
    .action(async (o: { port: string }) => cmdServerConfigure(parseInt(o.port, 10) || 8080));

  const beacon = program.command("beacon").description("Local network discovery stubs");
  beacon.command("scan").action(async () => cmdBeaconScan());

  const usxd = program.command("usxd").description("USXD surfaces (themes + USXD-Express preview)");
  usxd.command("list").description("List theme packs in templates/usxd/").action(async () => cmdUsxdList());
  usxd.command("apply").argument("<name>").action(async (n) => cmdUsxdApply(n));
  usxd.command("show").action(async () => cmdUsxdShow());
  usxd
    .command("serve")
    .description("USXD-Express — preview markdown surfaces (live reload)")
    .option("-f, --file <file>", "Watch a single .md file")
    .option("-d, --dir <dir>", "Watch **/*.md under this directory")
    .option("-p, --port <port>", "HTTP port (or USXD_PORT)")
    .action(async (o: { file?: string; dir?: string; port?: string }) => {
      const args = ["serve"];
      if (o.file) args.push("--file", o.file);
      if (o.dir) args.push("--dir", o.dir);
      if (o.port) args.push("--port", o.port);
      await runUsxdExpress(args);
    });
  usxd
    .command("export")
    .description("USXD-Express — export surfaces to static HTML")
    .argument("[file]", "Markdown file (optional; same as --file)")
    .option("-f, --file <file>", "Single markdown file")
    .option("-d, --dir <dir>", "Directory of .md files", "./surfaces")
    .option("-o, --output <dir>", "Output directory", "./dist")
    .option("--format <format>", "Export format: html | svg", "html")
    .action(
      async (positional: string | undefined, o: { file?: string; dir?: string; output?: string; format?: string }) => {
      const file = positional ?? o.file;
      const args = ["export", "--output", o.output ?? "./dist"];
      if (o.format) args.push("--format", o.format);
      if (file) args.push("--file", file);
      else args.push("--dir", o.dir ?? "./surfaces");
      await runUsxdExpress(args);
      }
    );
  usxd
    .command("edit")
    .description("USXD-Express — open preview (prefers ~/vault/surfaces when present)")
    .argument("[file]", "Markdown file to watch")
    .action(async (f?: string) => cmdUsxdEdit(f));
  usxd
    .command("render")
    .description("USXD-Express — render markdown surface to terminal")
    .argument("<file>", "Path to .md")
    .option("--mode <m>", "teletext | mono | wireframe")
    .action(async (file: string, o: { mode?: string }) => {
      const args = ["render", file];
      if (o.mode) args.push("--mode", o.mode);
      await runUsxdExpress(args);
    });
  usxd
    .command("validate")
    .description("USXD-Express — validate ```usxd``` + optional ```grid``` in a markdown file")
    .argument("<file>", "Path to .md")
    .action(async (f: string) => {
      await runUsxdExpress(["validate", f]);
    });

  const gui = program.command("gui").description("Open browser GUI index (USXD-Express)");
  gui
    .option("-p, --port <port>", "HTTP port")
    .option("--no-open", "Disable startup browser-open prompt")
    .action(async (o: { port?: string; open?: boolean }) =>
      cmdGuiOpen({ port: o.port, noOpen: o.open === false })
    );
  gui
    .command("demos")
    .description("Open bundled demo surfaces in browser GUI")
    .option("-p, --port <port>", "HTTP port")
    .option("--no-open", "Disable startup browser-open prompt")
    .action(async (o: { port?: string; open?: boolean }) =>
      cmdGuiDemos({ port: o.port, noOpen: o.open === false })
    );
  gui
    .command("index")
    .description("Alias: open browser GUI index")
    .option("-p, --port <port>", "HTTP port")
    .option("--no-open", "Disable startup browser-open prompt")
    .action(async (o: { port?: string; open?: boolean }) =>
      cmdGuiOpen({ port: o.port, noOpen: o.open === false })
    );

  const grid = program.command("grid").description("OBF grid — text surfaces (see docs/specs/obf-grid-spec.md)");
  grid
    .command("render")
    .argument("<file>", ".md / .grid with ```grid block")
    .option("--mode <m>", "teletext | mono | wireframe")
    .action(async (file: string, o: { mode?: string }) =>
      cmdGridRender(file, o.mode as GridMode | undefined)
    );
  grid
    .command("export")
    .argument("<file>")
    .requiredOption("--format <f>", "ascii | obf | svg | png")
    .option("-o, --output <path>")
    .action(async (file: string, o: { format: string; output?: string }) =>
      cmdGridExport(file, o.format, o.output)
    );
  grid.command("validate").argument("<file>").action(async (f) => cmdGridValidate(f));
  grid.command("edit").argument("<file>").action(async (f) => cmdGridEdit(f));
  grid
    .command("resize")
    .argument("<file>")
    .requiredOption("--size <size>", "New dimensions, e.g. 24x24")
    .action(async (file: string, o: { size: string }) => cmdGridResize(file, o.size));
  grid
    .command("rotate")
    .argument("<file>")
    .requiredOption("--degrees <deg>", "90 | 180 | 270")
    .action(async (file: string, o: { degrees: string }) => cmdGridRotate(file, o.degrees));
  grid
    .command("flip")
    .argument("<file>")
    .option("--horizontal", "Flip left/right")
    .option("--vertical", "Flip up/down (default)")
    .action(async (file: string, o: { horizontal?: boolean; vertical?: boolean }) =>
      cmdGridFlip(file, Boolean(o.horizontal) && !Boolean(o.vertical))
    );

  const layer = grid.command("layer").description("Layer operations (multiple ```grid blocks per file)");
  layer
    .command("add")
    .argument("<file>")
    .requiredOption("--name <name>", "Layer name")
    .action(async (file: string, o: { name: string }) => cmdGridLayerAdd(file, o.name));
  layer.command("list").argument("<file>").action(async (file: string) => cmdGridLayerList(file));
  layer
    .command("show")
    .argument("<file>")
    .requiredOption("--layer <index>", "Layer index (0-based)")
    .option("--mode <m>", "teletext | mono | wireframe")
    .action(async (file: string, o: { layer: string; mode?: string }) =>
      cmdGridLayerShow(file, parseInt(o.layer, 10), o.mode as GridMode | undefined)
    );
  layer
    .command("merge")
    .argument("<file>")
    .requiredOption("--layers <csv>", "Comma list, e.g. 0,1,2")
    .action(async (file: string, o: { layers: string }) => cmdGridLayerMerge(file, o.layers));

  const obf = program.command("obf").description("OBF UI blocks — markdown-first text components");
  obf
    .command("render")
    .argument("<file>", ".md / .obf containing ```obf blocks")
    .option("--format <format>", "terminal | html", "terminal")
    .action(async (file: string, o: { format?: string }) =>
      cmdObfRender(file, (o.format === "html" ? "html" : "terminal") as "terminal" | "html")
    );

  const font = program.command("font").description("Font bundles (stub — see docs/specs/font-system-obf.md)");
  font.command("install").argument("[bundle]", "e.g. retro").action(async (b) => cmdFontInstall(b ?? "retro"));
  font.command("list").action(async () => cmdFontList());
  font.command("activate").argument("<name>").action(async (n) => cmdFontActivate(n));
  font
    .command("preview")
    .argument("<name>")
    .description("Show cache path + sample strip (terminal)")
    .action(async (n) => cmdFontPreview(n));

  program.command("status").description("System status").action(async () => cmdStatus());
  program.command("doctor").description("Health checks").action(async () => cmdDoctor());
  program.command("cleanup").description("Remove cache").action(async () => cmdCleanup());
  program
    .command("clean")
    .description("Clean vault-local .local cache/tmp/logs")
    .option("--logs", "Also clean .local/logs")
    .option("--dry-run", "Show targets only")
    .action(async (o: { logs?: boolean; dryRun?: boolean }) => cmdClean({ logs: Boolean(o.logs), dryRun: Boolean(o.dryRun) }));
  program.command("tidy").description("List cwd entries sorted").action(async () => cmdTidy());
  program.command("ping").description("Respond with ping").action(async () => cmdPing());
  program.command("pong").description("Respond with pong").action(async () => cmdPong());
  program
    .command("health")
    .description("Health report (doctor alias)")
    .option("--quick", "Quick pass/fail")
    .action(async (o: { quick?: boolean }) => cmdHealth(Boolean(o.quick)));
  program.command("version").description("Show version").action(async () => cmdVersion());
  program
    .command("tour")
    .description("Interactive quickstart walkthrough")
    .action(async () => cmdTour());
  program.command("update").description("Rebuild core via sonic-express").action(async () => cmdUpdate());
  program
    .command("uninstall")
    .description("Remove global udo and optionally delete vault")
    .option("--yes", "Skip confirmation prompts")
    .option("--delete-vault", "Also delete the vault directory (destructive)")
    .action(async (o: { yes?: boolean; deleteVault?: boolean }) =>
      cmdUninstall({ yes: Boolean(o.yes), deleteVault: Boolean(o.deleteVault) })
    );
  program.command("help").description("Show help").action(() => console.log(VA1_HELP));

  await program.parseAsync(argv);
}
