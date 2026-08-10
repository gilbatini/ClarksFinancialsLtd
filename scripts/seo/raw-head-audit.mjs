#!/usr/bin/env node
import {
  absoluteUrl,
  DEFAULT_BASE_URL,
  extractHead,
  fetchHtml,
  loadRoutes,
  ROOT,
  writeJson,
} from "./lib.mjs";
import { resolve } from "node:path";

const routes = await loadRoutes();
const baseUrl = process.env.SEO_BASE_URL || DEFAULT_BASE_URL;
const records = [];

for (const path of routes) {
  const requestedUrl = absoluteUrl(path, baseUrl);
  const response = await fetchHtml(requestedUrl);
  records.push({
    path,
    requestedUrl,
    finalUrl: response.finalUrl,
    status: response.status,
    bytes: Buffer.byteLength(response.body),
    head: extractHead(response.body),
    rootHasContent: /<div\s+id=["']root["']\s*>\s*[^<\s]/i.test(response.body),
  });
}

if (records.length !== routes.length || records.some((record) => !record.head)) {
  throw new Error("Raw head audit did not capture every configured route");
}

const output = resolve(ROOT, "docs/seo/baseline-head.json");
await writeJson(output, {
  generatedAt: new Date().toISOString(),
  source: "raw HTTP fetch; JavaScript not executed",
  baseUrl,
  routes: records,
});
console.log(`PASS A-02: wrote raw <head> evidence for ${records.length} routes to docs/seo/baseline-head.json`);
