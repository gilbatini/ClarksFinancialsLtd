#!/usr/bin/env node
import { assert, loadRoutes } from "./lib.mjs";
import { withRenderedSite } from "./browser-runner.mjs";

const routes = await loadRoutes();
const results = await withRenderedSite(async ({ browser, baseUrl }) => {
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  const records = [];
  for (const path of routes) {
    await page.goto(new URL(path, baseUrl).href, { waitUntil: "networkidle" });
    const headings = await page.locator("main h1, main h2, main h3, main h4, main h5, main h6").evaluateAll((nodes) =>
      nodes.map((node) => ({ level: Number(node.tagName.slice(1)), text: node.textContent.trim().replace(/\s+/g, " ") })),
    );
    const h1Count = headings.filter((heading) => heading.level === 1).length;
    const skips = headings.slice(1).filter((heading, index) => heading.level > headings[index].level + 1);
    records.push({ path, headings, h1Count, skips });
  }
  return records;
});

for (const result of results) {
  assert(result.h1Count === 1, `${result.path} has ${result.h1Count} H1 elements`);
  assert(result.skips.length === 0, `${result.path} skips heading levels: ${result.skips.map((heading) => heading.text).join(", ")}`);
}
console.log(`PASS E-01: one H1 and logical heading descent on all ${results.length} routes`);
