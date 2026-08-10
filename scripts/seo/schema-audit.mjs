#!/usr/bin/env node
import { resolve } from "node:path";
import { absoluteUrl, DEFAULT_BASE_URL, fetchHtml, loadRoutes, ROOT, writeJson } from "./lib.mjs";

const routes = await loadRoutes();
const baseUrl = process.env.SEO_BASE_URL || DEFAULT_BASE_URL;
const records = [];
for (const path of routes) {
  const response = await fetchHtml(absoluteUrl(path, baseUrl));
  const blocks = [];
  for (const match of response.body.matchAll(/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)) {
    try {
      const value = JSON.parse(match[1]);
      const values = Array.isArray(value) ? value : value["@graph"] ?? [value];
      blocks.push(...values.map((item) => ({ validJson: true, type: item?.["@type"] ?? null, value: item })));
    } catch (error) {
      blocks.push({ validJson: false, error: error.message, raw: match[1].trim() });
    }
  }
  records.push({ path, status: response.status, blockCount: blocks.length, blocks });
}

await writeJson(resolve(ROOT, "docs/seo/schema-baseline.json"), {
  generatedAt: new Date().toISOString(),
  source: "raw HTTP fetch; JavaScript not executed",
  baseUrl,
  totalBlocks: records.reduce((sum, record) => sum + record.blockCount, 0),
  routes: records,
});
console.log(`PASS A-06: audited ${records.length} routes; ${records.reduce((sum, record) => sum + record.blockCount, 0)} structured-data blocks found`);
