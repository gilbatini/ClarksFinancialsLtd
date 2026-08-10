#!/usr/bin/env node
import { readdir } from "node:fs/promises";
import { spawnSync } from "node:child_process";
import { resolve } from "node:path";
import { ROOT } from "./lib.mjs";

const scriptsDir = resolve(ROOT, "scripts/seo");
const files = await readdir(scriptsDir);
const verifiers = files
  .filter((file) => file.startsWith("verify-") && file.endsWith(".mjs") && file !== "verify-all.mjs")
  .sort();

const commands = verifiers.map((file) => ["node", [resolve(scriptsDir, file)]]);
if (files.includes("preview-audit.mjs")) {
  commands.push(["node", [resolve(scriptsDir, "preview-audit.mjs"), "--assert"]]);
}

for (const [command, args] of commands) {
  const result = spawnSync(command, args, { cwd: ROOT, encoding: "utf8", stdio: "inherit" });
  if (result.status !== 0) process.exit(result.status ?? 1);
}
console.log(`PASS seo:verify-all: ${commands.length} SEO verification commands passed`);
