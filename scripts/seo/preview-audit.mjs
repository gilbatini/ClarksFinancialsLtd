#!/usr/bin/env node
import { resolve } from "node:path";
import {
  absoluteUrl,
  assert,
  DEFAULT_BASE_URL,
  extractMeta,
  extractTitle,
  fetchHtml,
  loadRoutes,
  ROOT,
  writeJson,
} from "./lib.mjs";

const crawlers = {
  whatsapp: "WhatsApp/2.23.20.0 A",
  facebook: "facebookexternalhit/1.1 (+http://www.facebook.com/externalhit_uatext.php)",
  linkedin: "LinkedInBot/1.0 (+http://www.linkedin.com)",
};
const asserting = process.argv.includes("--assert");
const routes = await loadRoutes();
const baseUrl = process.env.SEO_BASE_URL || DEFAULT_BASE_URL;
const records = [];

for (const path of routes) {
  const previews = {};
  for (const [crawler, userAgent] of Object.entries(crawlers)) {
    const response = await fetchHtml(absoluteUrl(path, baseUrl), { userAgent });
    const ogTitle = extractMeta(response.body, "property", "og:title");
    const ogDescription = extractMeta(response.body, "property", "og:description");
    previews[crawler] = {
      status: response.status,
      finalUrl: response.finalUrl,
      title: ogTitle || extractTitle(response.body),
      description: ogDescription || extractMeta(response.body, "name", "description"),
      image: extractMeta(response.body, "property", "og:image"),
      ogUrl: extractMeta(response.body, "property", "og:url"),
    };
  }
  records.push({ path, previews });
}

const failures = [];
for (const route of records) {
  for (const [crawler, preview] of Object.entries(route.previews)) {
    for (const field of ["title", "description", "image"]) {
      if (!preview[field]) failures.push(`${route.path} ${crawler} missing ${field}`);
    }
  }
}

const file = resolve(ROOT, asserting ? "docs/seo/preview-current.json" : "docs/seo/preview-baseline.json");
await writeJson(file, {
  generatedAt: new Date().toISOString(),
  source: "UA-spoofed raw HTTP fetch; JavaScript not executed",
  baseUrl,
  crawlers: Object.keys(crawlers),
  failureCount: failures.length,
  failures,
  routes: records,
});

if (asserting) assert(failures.length === 0, `Preview verification failed:\n${failures.join("\n")}`);
console.log(`PASS A-07: recorded ${records.length * Object.keys(crawlers).length} crawler previews; ${failures.length} missing required fields`);
