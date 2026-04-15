import { spawn } from "node:child_process";
import fs from "fs-extra";
import path from "node:path";
import { getVaultRoot, udosConnectRoot } from "../paths.js";

export function usxdExpressCliJs(): string {
  return path.join(udosConnectRoot(), "tools", "usxd-express", "dist", "cli.js");
}

export async function runUsxdExpress(args: string[]): Promise<void> {
  const cli = usxdExpressCliJs();
  if (!(await fs.pathExists(cli))) {
    console.error('USXD-Express is not built — run: npm run build -w @udos/usxd-express');
    process.exit(1);
  }
  await new Promise<void>((resolve, reject) => {
    const child = spawn(process.execPath, [cli, ...args], {
      stdio: "inherit",
      cwd: process.cwd(),
    });
    child.on("error", reject);
    child.on("exit", (code) => {
      if (code === 0) resolve();
      else reject(new Error(`usxd-express exited with code ${code}`));
    });
  });
}

/** Preview: prefer vault surfaces when the folder exists. */
export async function cmdUsxdEdit(file?: string): Promise<void> {
  if (file) {
    await runUsxdExpress(["serve", "--file", path.resolve(file)]);
    return;
  }
  const vault = getVaultRoot();
  const vaultSurfaces = path.join(vault, "surfaces");
  if (await fs.pathExists(vaultSurfaces)) {
    await runUsxdExpress(["serve", "--dir", vaultSurfaces]);
    return;
  }
  await runUsxdExpress(["serve"]);
}
