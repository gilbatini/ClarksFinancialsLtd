#!/usr/bin/env node
import { assert, loadRoutes } from "./lib.mjs";
import { withRenderedSite } from "./browser-runner.mjs";

const routes = await loadRoutes();
const records = await withRenderedSite(async ({ browser, baseUrl }) => {
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  const output = [];
  for (const path of routes) {
    await page.goto(new URL(path, baseUrl).href, { waitUntil: "domcontentloaded" });
    output.push({
      path,
      values: await page.locator("[data-seo-nap]").evaluate((nap) => ({
        name: nap.querySelector("[data-nap-name]")?.textContent.trim(),
        phones: nap.querySelector("[data-nap-phone]")?.textContent.replace(/\s+/g, " ").trim(),
        email: nap.querySelector("[data-nap-email]")?.textContent.trim(),
        address: nap.querySelector("[data-nap-address]")?.textContent.replace(/\s+/g, " ").trim(),
      })),
    });
  }
  return output;
});

const canonical = JSON.stringify(records[0].values);
for (const record of records) {
  assert(Object.values(record.values).every(Boolean), `${record.path} has incomplete NAP data`);
  assert(JSON.stringify(record.values) === canonical, `${record.path} has inconsistent NAP data`);
}
console.log(`PASS F-01: identical name, phones, email, and address rendered on all ${records.length} routes`);
