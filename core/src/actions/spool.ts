import fs from "fs-extra";
import path from "node:path";
import chalk from "chalk";
import { getVaultRoot } from "../paths.js";

function spoolRoot(vault: string): string {
  return path.join(vault, "spool");
}

export async function cmdSpoolList(): Promise<void> {
  const vault = getVaultRoot();
  const d = spoolRoot(vault);
  if (!(await fs.pathExists(d))) {
    console.log(chalk.dim("No spool/"));
    return;
  }
  const entries = await fs.readdir(d, { withFileTypes: true });
  for (const e of entries) {
    console.log(e.isDirectory() ? `${e.name}/` : e.name);
  }
}

export async function cmdSpoolInfo(name: string): Promise<void> {
  const vault = getVaultRoot();
  const p = path.join(spoolRoot(vault), name);
  if (!(await fs.pathExists(p))) {
    console.error(chalk.red("Not found:", name));
    process.exitCode = 1;
    return;
  }
  const st = await fs.stat(p);
  console.log({ path: p, isDirectory: st.isDirectory(), size: st.size, mtime: st.mtime.toISOString() });
}

export async function cmdSpoolExtract(name: string): Promise<void> {
  const vault = getVaultRoot();
  const p = path.join(spoolRoot(vault), name);
  if (!(await fs.pathExists(p))) {
    console.error(chalk.red("Not found:", name));
    process.exitCode = 1;
    return;
  }
  if ((await fs.stat(p)).isDirectory()) {
    const out = path.join(process.cwd(), name);
    await fs.copy(p, out, { overwrite: false });
    console.log(chalk.green(`Copied to ${out}`));
  } else {
    const out = path.join(process.cwd(), path.basename(p));
    await fs.copy(p, out, { overwrite: false });
    console.log(chalk.green(`Copied to ${out}`));
  }
}
