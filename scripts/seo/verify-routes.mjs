#!/usr/bin/env node
import { extractRouterPaths, readJson, ROUTES_FILE, writeJson } from "./lib.mjs";

const configured = await extractRouterPaths();
const unique = [...new Set(configured)];
if (unique.length !== configured.length) throw new Error("Duplicate route paths found in pages/");

if (process.argv.includes("--write")) {
  await writeJson(ROUTES_FILE, {
    generatedAt: new Date().toISOString(),
    source: "pages/*/+Page.tsx",
    canonicalBaseUrl: "https://www.clarksfinancials.com",
    routes: unique.map((path) => ({
      path,
      public: true,
      keyRoute: ["/", "/loans", "/apply"].includes(path),
    })),
  });
}

const manifest = await readJson(ROUTES_FILE);
const recorded = manifest.routes.map((route) => route.path);
const missing = unique.filter((path) => !recorded.includes(path));
const extra = recorded.filter((path) => !unique.includes(path));
if (missing.length || extra.length) {
  throw new Error(`Route manifest mismatch. Missing: ${missing.join(", ") || "none"}; extra: ${extra.join(", ") || "none"}`);
}
console.log(`PASS A-01: ${recorded.length} public routes match pages/*/+Page.tsx (${recorded.join(", ")})`);
