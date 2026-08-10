#!/usr/bin/env node
import { gzipSync } from "node:zlib";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { readJson, ROOT, ROUTES_FILE, writeJson } from "./lib.mjs";

const manifestPath = resolve(ROOT, "dist/.vite/manifest.json");
const budgetKiB = Number(process.env.SEO_ROUTE_JS_BUDGET_KIB || 145);
const budgetBytes = budgetKiB * 1024;
const manifest = JSON.parse(await readFile(manifestPath, "utf8"));
const routes = (await readJson(ROUTES_FILE)).routes.filter((route) => route.public);
const entryKey = Object.keys(manifest).find((key) => manifest[key].isEntry);

if (!entryKey) {
  throw new Error("No JavaScript entry found in dist/.vite/manifest.json");
}

const routeEntries = new Map([
  ["/", "src/pages/Home.tsx"],
  ["/about", "src/pages/About.tsx"],
  ["/loans", "src/pages/Loans.tsx"],
  ["/apply", "src/pages/Apply.tsx"],
  ["/regulatory", "src/pages/Regulatory.tsx"],
  ["/faqs", "src/pages/FAQs.tsx"],
  ["/contact", "src/pages/Contact.tsx"],
]);

const compressedSizeCache = new Map();
async function compressedSize(file) {
  if (!compressedSizeCache.has(file)) {
    const contents = await readFile(resolve(ROOT, "dist", file));
    compressedSizeCache.set(file, gzipSync(contents).byteLength);
  }
  return compressedSizeCache.get(file);
}

function collectStaticImports(key, collected = new Set()) {
  if (collected.has(key)) return collected;
  const chunk = manifest[key];
  if (!chunk) throw new Error(`Manifest entry missing: ${key}`);
  collected.add(key);
  for (const dependency of chunk.imports || []) {
    collectStaticImports(dependency, collected);
  }
  return collected;
}

const dynamicEntries = Object.entries(manifest).filter(
  ([key, chunk]) => key.startsWith("src/pages/") && chunk.isDynamicEntry,
);
if (dynamicEntries.length !== routes.length) {
  throw new Error(
    `Expected one dynamic page entry per public route (${routes.length}), found ${dynamicEntries.length}`,
  );
}

const results = [];
for (const route of routes) {
  const routeEntry = routeEntries.get(route.path);
  if (!routeEntry || !manifest[routeEntry]?.isDynamicEntry) {
    throw new Error(`Route ${route.path} has no route-level dynamic entry`);
  }

  const keys = collectStaticImports(routeEntry, collectStaticImports(entryKey));
  const files = [...keys].map((key) => manifest[key].file).filter((file) => file.endsWith(".js"));
  const gzipBytes = (await Promise.all(files.map(compressedSize))).reduce((sum, size) => sum + size, 0);
  results.push({
    path: route.path,
    entry: routeEntry,
    chunks: files,
    gzipBytes,
    gzipKiB: Number((gzipBytes / 1024).toFixed(2)),
    budgetKiB,
    passed: gzipBytes <= budgetBytes,
  });
}

const failures = results.filter((result) => !result.passed);
const report = {
  generatedAt: new Date().toISOString(),
  source: "Vite manifest and gzip-compressed production assets",
  budget: {
    metric: "initial route JavaScript transfer size",
    maxGzipKiB: budgetKiB,
  },
  routeLevelCodeSplitting: true,
  dynamicPageEntries: dynamicEntries.length,
  routes: results,
};

await writeJson(resolve(ROOT, "docs/seo/bundle-report.json"), report);

for (const result of results) {
  console.log(
    `${result.passed ? "PASS" : "FAIL"} ${result.path}: ${result.gzipKiB} KiB gzip / ${budgetKiB} KiB`,
  );
}
if (failures.length) {
  throw new Error(`${failures.length} route(s) exceed the initial JavaScript budget`);
}
console.log(`PASS C-01: ${results.length} routes are code-split and within the ${budgetKiB} KiB gzip budget`);
