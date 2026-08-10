#!/usr/bin/env node
import { assert, loadRoutes } from "./lib.mjs";
import { withRenderedSite } from "./browser-runner.mjs";

const routes = await loadRoutes();
const results = await withRenderedSite(async ({ browser, baseUrl }) => {
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  const records = [];
  for (const path of routes) {
    await page.goto(new URL(path, baseUrl).href, { waitUntil: "domcontentloaded" });
    records.push(await page.locator("[data-seo-cta]").evaluateAll((elements, route) => {
      const bodyHeight = document.body.scrollHeight;
      return {
        path: route,
        bodyHeight,
        actions: elements.map((element) => ({
          label: element.getAttribute("aria-label") || element.textContent.trim(),
          href: element.getAttribute("href"),
          y: element.getBoundingClientRect().top + window.scrollY,
        })),
      };
    }, path));
  }
  return records;
});

for (const result of results) {
  assert(result.actions.length > 0, `${result.path} has no explicit next action`);
  assert(result.actions.some((action) => action.label && action.href && action.y >= result.bodyHeight * 0.55), `${result.path} has no labelled CTA near the end of the page`);
}
console.log(`PASS E-05: labelled end-of-page CTA present on all ${results.length} routes`);
