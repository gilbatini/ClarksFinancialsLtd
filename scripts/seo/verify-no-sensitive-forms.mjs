#!/usr/bin/env node
import { assert, loadRoutes } from "./lib.mjs";
import { withRenderedSite } from "./browser-runner.mjs";

const sensitivePattern = /national id|\bnin\b|net salary|employer name|loan amount/i;
const fakeSuccessPattern = /protocol initialized successfully|application submitted successfully/i;
const routes = await loadRoutes();

const records = await withRenderedSite(async ({ browser, baseUrl }) => {
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  const output = [];
  for (const path of routes) {
    await page.goto(new URL(path, baseUrl).href, { waitUntil: "domcontentloaded" });
    output.push({
      path,
      forms: await page.locator("form").count(),
      sensitiveControls: await page.locator("form input, form select, form textarea").evaluateAll(
        (controls) => controls
          .map((control) => [
            control.getAttribute("name"),
            control.getAttribute("placeholder"),
            control.getAttribute("aria-label"),
            control.closest("div")?.querySelector("label")?.textContent,
          ].filter(Boolean).join(" "))
          .filter((value) => /national id|\bnin\b|net salary|employer name|loan amount/i.test(value)),
      ),
      bodyText: await page.locator("body").innerText(),
    });
  }
  return output;
});

for (const record of records) {
  assert(record.sensitiveControls.length === 0, record.path + " renders sensitive financial or identity form controls");
  assert(!fakeSuccessPattern.test(record.bodyText), record.path + " renders a fake application-success message");
  assert(!sensitivePattern.test(record.bodyText) || record.forms === 0, record.path + " pairs sensitive application language with a web form");
}
console.log(`PASS privacy: no sensitive application forms or fake submission-success UI on ${records.length} routes`);
