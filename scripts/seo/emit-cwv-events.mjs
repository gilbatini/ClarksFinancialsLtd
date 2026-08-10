#!/usr/bin/env node
import { resolve } from "node:path";
import { emitEvent, readJson, ROOT } from "./lib.mjs";

const report = await readJson(resolve(ROOT, "docs/seo/cwv-baseline.json"));
for (const summary of report.summaries) {
  for (const [metric, value] of Object.entries(summary.p75)) {
    await emitEvent("seo.metric.sampled", "A-04", "A", {
      metric: `p75_${metric}`,
      value,
      unit: metric === "cls" ? "score" : "ms",
      source: "measured lab: Playwright Chromium PerformanceObserver",
      url: new URL(summary.path, report.baseUrl).href,
      profile: summary.profile,
      sample_count: summary.sampleCount,
    });
  }
}
console.log(`Emitted ${report.summaries.length * 3} measured CWV metric events`);
