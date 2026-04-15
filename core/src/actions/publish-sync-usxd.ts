import fs from "fs-extra";
import path from "node:path";
import chalk from "chalk";
import os from "node:os";
import { spawnSync } from "node:child_process";
import { getVaultRoot } from "../paths.js";
import { buildStaticSite } from "../lib/publish-build.js";
import { previewSite } from "../lib/publish-preview.js";
import { siteOutputDir } from "../lib/site-paths.js";
import { syncPullStub, syncPushStub, syncStatusStub } from "../cloud-stubs/sync.js";
import {
  applyUsxdTheme,
  listUsxdThemeNames,
  readActiveUsxd,
  usxdTemplatesRoot,
} from "../lib/usxd-theme.js";

export async function cmdPublishBuild(): Promise<void> {
  const vault = getVaultRoot();
  const r = await buildStaticSite(vault);
  console.log(chalk.green(`Built ${r.pages} page(s) → ${r.outDir}`));
}

export async function cmdPublishPreview(): Promise<void> {
  const vault = getVaultRoot();
  const port = Number(process.env.DO_PREVIEW_PORT ?? "4173");
  await previewSite(vault, port);
}

export async function cmdPublishStatus(): Promise<void> {
  const vault = getVaultRoot();
  const buildJson = path.join(siteOutputDir(vault), "build.json");
  if (!(await fs.pathExists(buildJson))) {
    console.log({ publish: "not built", hint: "do publish build" });
    return;
  }
  const j = JSON.parse(await fs.readFile(buildJson, "utf8"));
  console.log(j);
}

function run(cmd: string, args: string[], cwd: string): string {
  const r = spawnSync(cmd, args, {
    cwd,
    shell: process.platform === "win32",
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"],
  });
  if (r.status !== 0) throw new Error((r.stderr || r.stdout || `${cmd} failed`).trim());
  return (r.stdout || "").trim();
}

export async function cmdPublishDeploy(): Promise<void> {
  const vault = getVaultRoot();
  const outDir = siteOutputDir(vault);
  if (!(await fs.pathExists(outDir))) {
    console.log(chalk.yellow("Site not built yet; running do publish build first."));
    await cmdPublishBuild();
  }
  if (!(await fs.pathExists(outDir))) {
    console.error(chalk.red("No .site output to deploy."));
    process.exitCode = 1;
    return;
  }
  const tmp = await fs.mkdtemp(path.join(os.tmpdir(), "udos-gh-pages-"));
  try {
    run("git", ["init"], tmp);
    run("git", ["checkout", "-b", "gh-pages"], tmp);
    await fs.copy(outDir, tmp, { overwrite: true });
    run("git", ["add", "."], tmp);
    run("git", ["commit", "-m", "uDos publish deploy"], tmp);
    const repoRoot = process.cwd();
    const remote = run("git", ["remote", "get-url", "origin"], repoRoot);
    run("git", ["remote", "add", "origin", remote], tmp);
    run("git", ["push", "--force", "origin", "gh-pages"], tmp);
    console.log(chalk.green("Deployed to GitHub Pages branch: gh-pages"));
  } catch (e) {
    console.error(chalk.red(e instanceof Error ? e.message : String(e)));
    process.exitCode = 1;
  } finally {
    await fs.remove(tmp);
  }
}

export async function cmdSyncStatus(): Promise<void> {
  console.log(chalk.yellow(await syncStatusStub()));
}

export async function cmdSyncPull(): Promise<void> {
  console.log(chalk.yellow(await syncPullStub()));
}

export async function cmdSyncPush(): Promise<void> {
  console.log(chalk.yellow(await syncPushStub()));
}

export async function cmdUsxdList(): Promise<void> {
  const names = await listUsxdThemeNames();
  const root = usxdTemplatesRoot();
  if (names.length === 0) {
    console.log(chalk.dim(`No themes in ${root}`));
    return;
  }
  names.forEach((n) => console.log(n));
}

export async function cmdUsxdApply(name: string): Promise<void> {
  const vault = getVaultRoot();
  await applyUsxdTheme(vault, name);
  console.log(chalk.green(`Applied USXD theme "${name}" → ${path.join(vault, "system", "usxd", "current")}`));
}

export async function cmdUsxdShow(): Promise<void> {
  const vault = getVaultRoot();
  const active = await readActiveUsxd(vault);
  if (!active) {
    console.log(chalk.dim("No theme applied — run: do usxd apply <name>"));
    return;
  }
  console.log(active);
}
