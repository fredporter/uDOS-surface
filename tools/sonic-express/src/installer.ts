import { spawn } from "node:child_process";
import fs from "fs-extra";
import path from "node:path";
import os from "node:os";
import chalk from "chalk";
import { parseSemver } from "@udos/shared-utils";
import { coreDir, udosConnectRoot } from "./paths.js";

function run(
  cmd: string,
  args: string[],
  cwd: string,
  silent: boolean
): Promise<void> {
  return new Promise((resolve, reject) => {
    const child = spawn(cmd, args, {
      cwd,
      stdio: silent ? ["ignore", "pipe", "pipe"] : "inherit",
      shell: process.platform === "win32",
    });
    let err = "";
    if (silent && child.stderr) {
      child.stderr.on("data", (d: Buffer) => {
        err += d.toString();
      });
    }
    child.on("error", reject);
    child.on("close", (code) => {
      if (code === 0) resolve();
      else reject(new Error(err.trim() || `${cmd} exited ${code}`));
    });
  });
}

async function npm(
  args: string[],
  cwd: string,
  silent: boolean
): Promise<void> {
  const npmCmd = process.platform === "win32" ? "npm.cmd" : "npm";
  await run(npmCmd, args, cwd, silent);
}

export async function checkGitPresent(): Promise<boolean> {
  return new Promise((resolve) => {
    const c = spawn("git", ["--version"], { stdio: "ignore" });
    c.on("error", () => resolve(false));
    c.on("close", (code) => resolve(code === 0));
  });
}

export interface PrereqResult {
  ok: boolean;
  node: string;
  nodeOk: boolean;
  npmOk: boolean;
  npmVersion: string;
  messages: string[];
}

export async function checkPrerequisites(): Promise<PrereqResult> {
  const messages: string[] = [];
  const node = process.version;
  const np = parseSemver(node);
  const nodeOk = np !== null && np.major >= 18;
  if (!nodeOk) {
    messages.push(
      `Node.js 18+ required (found ${node}). Install from https://nodejs.org/ or use your system package manager.`
    );
  } else if (np && np.major < 20) {
    console.log(
      chalk.yellow(
        "Node 20+ recommended for uDos core; you have Node 18. Upgrade when convenient."
      )
    );
  }

  let npmVersion = "";
  let npmOk = false;
  try {
    const { execSync } = await import("node:child_process");
    npmVersion = execSync("npm --version", { encoding: "utf8" }).trim();
    const major = parseInt(npmVersion.split(".")[0]!, 10);
    npmOk = !Number.isNaN(major) && major >= 9;
    if (!npmOk) {
      messages.push(`npm 9+ required (found ${npmVersion || "unknown"}).`);
    }
  } catch {
    messages.push("npm not found — install Node.js (includes npm).");
  }

  const ok = nodeOk && npmOk;
  return { ok, node, nodeOk, npmOk, npmVersion, messages };
}

async function ensureWorkspaceInstall(silent: boolean): Promise<void> {
  const root = udosConnectRoot();
  const lock = path.join(root, "package-lock.json");
  if (await fs.pathExists(lock)) {
    await npm(["ci", "--silent", "--no-audit", "--no-fund"], root, silent);
  } else {
    await npm(["install", "--silent", "--no-audit", "--no-fund"], root, silent);
  }
}

async function buildWorkspace(silent: boolean): Promise<void> {
  const root = udosConnectRoot();
  await npm(["run", "build"], root, silent);
}

export interface InstallOptions {
  /** Non-interactive: no prompts */
  auto: boolean;
  /** Skip copying Mac desktop launcher */
  skipDesktopLauncher?: boolean;
  /** Hide npm output */
  silent?: boolean;
}

export async function runInstall(opts: InstallOptions): Promise<void> {
  const silent = opts.silent !== false;
  const pre = await checkPrerequisites();
  if (!pre.ok) {
    for (const m of pre.messages) console.error(chalk.red(m));
    process.exitCode = 1;
    return;
  }

  console.log(chalk.cyan("uDos — installing workspace (single node_modules)…"));
  await ensureWorkspaceInstall(silent);
  console.log(chalk.cyan("Building packages…"));
  await buildWorkspace(silent);

  console.log(chalk.cyan("Linking global `do` command…"));
  await npm(["link"], coreDir(), silent);

  if (process.platform === "darwin" && !opts.skipDesktopLauncher) {
    const desktop = path.join(os.homedir(), "Desktop");
    const src = path.join(udosConnectRoot(), "launcher", "udos.command");
    if (await fs.pathExists(src)) {
      const dest = path.join(desktop, "udos.command");
      await fs.copy(src, dest, { overwrite: true });
      await fs.chmod(dest, 0o755);
      console.log(chalk.green(`Desktop launcher: ${dest}`));
    }
  }

  console.log(chalk.green("Install complete."));
  console.log(chalk.dim("Try: do version && do doctor && do help"));
}

export interface UpdateOptions {
  auto: boolean;
  silent?: boolean;
}

export async function runUpdate(opts: UpdateOptions): Promise<void> {
  const silent = opts.silent !== false;
  const pre = await checkPrerequisites();
  if (!pre.ok) {
    for (const m of pre.messages) console.error(chalk.red(m));
    process.exitCode = 1;
    return;
  }

  const root = udosConnectRoot();
  const gitDir = path.join(root, ".git");
  if (await fs.pathExists(gitDir)) {
    console.log(chalk.cyan("Pulling latest changes…"));
    try {
      await run("git", ["pull", "--ff-only"], root, false);
    } catch (e) {
      console.log(
        chalk.yellow("git pull skipped or failed — continue with local tree."),
        chalk.dim(String(e))
      );
    }
  }

  console.log(chalk.cyan("Refreshing workspace…"));
  await ensureWorkspaceInstall(silent);
  await buildWorkspace(silent);
  await npm(["link"], coreDir(), silent);
  console.log(chalk.green("Update complete."));
}
