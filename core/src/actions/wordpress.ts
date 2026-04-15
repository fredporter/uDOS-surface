import chalk from "chalk";
import { upgradeMessage } from "../cloud-stubs/upgrade.js";

export async function cmdWpSync(): Promise<void> {
  console.log(chalk.yellow(upgradeMessage("WordPress sync")));
}

export async function cmdWpPublish(): Promise<void> {
  console.log(chalk.yellow(upgradeMessage("WordPress publish")));
}

export async function cmdWpReview(): Promise<void> {
  console.log(chalk.yellow(upgradeMessage("WordPress editorial review")));
}

export async function cmdWpSubmit(): Promise<void> {
  console.log(chalk.yellow(upgradeMessage("WordPress draft submission")));
}

export async function cmdWpApprove(): Promise<void> {
  console.log(chalk.yellow(upgradeMessage("WordPress draft approval")));
}
