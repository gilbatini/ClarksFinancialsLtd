#!/usr/bin/env node
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { assert, ROOT } from "./lib.mjs";

const file = resolve(ROOT, ".github/workflows/seo-rank-sampling.yml");
const workflow = await readFile(file, "utf8");
assert(/schedule:\s*\n\s*- cron: ["']\d+\s+\d+\s+\*\s+\*\s+\d["']/m.test(workflow), "Weekly cron schedule missing");
assert(workflow.includes("npm run seo:rank-sample"), "Rank sampler command missing");
assert(workflow.includes("node-version: 20"), "Node 20 setup missing");
for (const secret of ["GSC_CREDENTIALS", "GSC_SITE_URL", "ALGORINEXT_EVENT_URL", "ALGORINEXT_TOKEN"]) {
  assert(workflow.includes(`secrets.${secret}`), `${secret} wiring missing`);
}
assert(workflow.includes("actions/upload-artifact@v4"), "Fallback telemetry artifact missing");
console.log("PASS F-05: weekly rank-sampling job registered with GSC and telemetry secret wiring");
