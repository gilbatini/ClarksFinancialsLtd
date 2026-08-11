#!/usr/bin/env node
import { resolve } from "node:path";
import { assert, readJson, ROOT } from "./lib.mjs";

const report = await readJson(resolve(ROOT, "docs/seo/cwv-current.json"));
const mobile = report.summaries?.filter((summary) => summary.profile === "mobile") ?? [];
const budgets = {
  lcpMs: { maximum: 2500, label: "LCP", unit: "ms" },
  inpMs: { maximum: 200, label: "INP", unit: "ms" },
  cls: { maximum: 0.1, label: "CLS", unit: "" },
};

assert(
  report.source?.startsWith("measured lab data:"),
  "CWV report must identify measured lab data",
);
assert(report.baseUrl === "local-dist" || /^https:\/\//.test(report.baseUrl), "CWV source must be local dist or HTTPS");
assert(mobile.length === 3, `Expected 3 key mobile route summaries, found ${mobile.length}`);

const failures = [];
for (const summary of mobile) {
  assert(summary.sampleCount >= 3, `${summary.path} has fewer than 3 samples`);
  assert(
    summary.interactionTimingCoverage === `${summary.sampleCount}/${summary.sampleCount}`,
    `${summary.path} has incomplete INP interaction timing coverage`,
  );
  for (const [field, budget] of Object.entries(budgets)) {
    const value = summary.p75?.[field];
    if (!Number.isFinite(value) || value > budget.maximum) {
      failures.push(`${summary.path} ${budget.label} ${value}${budget.unit} > ${budget.maximum}${budget.unit}`);
    }
  }
}

assert(failures.length === 0, `CWV budget failures:\n${failures.join("\n")}`);
for (const summary of mobile) {
  console.log(`PASS ${summary.path}: LCP ${summary.p75.lcpMs}ms, INP ${summary.p75.inpMs}ms, CLS ${summary.p75.cls}`);
}
console.log("PASS C-08: all key mobile routes meet LCP, INP, and CLS budgets with measured interactions");
