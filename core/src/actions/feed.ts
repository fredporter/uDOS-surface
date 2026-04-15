import fs from "fs-extra";
import path from "node:path";
import chalk from "chalk";
import { glob } from "glob";
import { getVaultRoot } from "../paths.js";

function feedsDir(vault: string): string {
  return path.join(vault, "feeds");
}

export async function cmdFeedList(): Promise<void> {
  const vault = getVaultRoot();
  const d = feedsDir(vault);
  if (!(await fs.pathExists(d))) {
    console.log(chalk.dim("No feeds/ — run do init"));
    return;
  }
  const files = await glob("*.jsonl", { cwd: d });
  files.sort().forEach((f) => console.log(f.replace(/\.jsonl$/, "")));
}

export async function cmdFeedView(name: string, limit = 20): Promise<void> {
  const vault = getVaultRoot();
  const file = path.join(feedsDir(vault), `${name}.jsonl`);
  if (!(await fs.pathExists(file))) {
    console.error(chalk.red("Unknown feed:", name));
    process.exitCode = 1;
    return;
  }
  const lines = (await fs.readFile(file, "utf8")).split("\n").filter(Boolean);
  for (let i = 0; i < Math.min(limit, lines.length); i++) {
    console.log(lines[i]);
  }
}

export async function cmdFeedExport(name: string, asJson: boolean): Promise<void> {
  const vault = getVaultRoot();
  const file = path.join(feedsDir(vault), `${name}.jsonl`);
  if (!(await fs.pathExists(file))) {
    console.error(chalk.red("Unknown feed:", name));
    process.exitCode = 1;
    return;
  }
  const lines = (await fs.readFile(file, "utf8")).split("\n").filter(Boolean);
  const items = lines.map((l) => JSON.parse(l));
  if (asJson) console.log(JSON.stringify(items, null, 2));
  else items.forEach((o) => console.log(JSON.stringify(o)));
}
