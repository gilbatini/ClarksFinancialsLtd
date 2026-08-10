#!/usr/bin/env node
import { assert, loadRoutes } from "./lib.mjs";
import { withRenderedSite } from "./browser-runner.mjs";
import { financialServiceSchema, organizationSchema } from "../../src/seo/schema-data.mjs";

const routes = await loadRoutes();
const records = await withRenderedSite(async ({ browser, baseUrl }) => {
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  const output = [];
  for (const path of routes) {
    await page.goto(new URL(path, baseUrl).href, { waitUntil: "domcontentloaded" });
    output.push({
      path,
      bodyText: await page.locator("body").innerText(),
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
  assert(!/\b(?:Nairobi|Johannesburg)\b/i.test(record.bodyText), record.path + " advertises an unverified office location");
}
const values = records[0].values;
const normalize = (value) => value.toLowerCase().replace(/[^a-z0-9]+/g, "");
const renderedPhones = values.phones.match(/\+\d[\d ]+/g)?.map(normalize) ?? [];
const schemaPhones = organizationSchema.contactPoint.map((contact) => normalize(contact.telephone));
const schemaAddress = organizationSchema.address.streetAddress + ", " + organizationSchema.address.addressLocality + ", Uganda";
assert(organizationSchema.name === values.name, "Organization schema name differs from rendered NAP");
assert(financialServiceSchema.name === values.name, "FinancialService schema name differs from rendered NAP");
assert(organizationSchema.email === values.email && financialServiceSchema.email === values.email, "Schema email differs from rendered NAP");
assert(schemaPhones.every((phone) => renderedPhones.includes(phone)), "Schema phone list differs from rendered NAP");
assert(normalize(schemaAddress) === normalize(values.address), "Schema address differs from rendered NAP");

console.log(`PASS F-01: identical name, phones, email, and address rendered on all ${records.length} routes`);
