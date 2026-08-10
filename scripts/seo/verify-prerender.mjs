#!/usr/bin/env node
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { assert, loadRoutes, ROOT } from "./lib.mjs";

const routes = await loadRoutes();
const failures = [];

for (const route of routes) {
  const file = route === "/"
    ? resolve(ROOT, "dist/index.html")
    : resolve(ROOT, `dist${route}/index.html`);
  try {
    const html = await readFile(file, "utf8");
    const main = html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/i)?.[1];
    if (!main) {
      failures.push(`${route}: prerendered body is missing <main>`);
    } else if (!/<h1\b/i.test(main)) {
      failures.push(`${route}: prerendered <main> is missing route-specific <h1> content`);
    }
  } catch {
    failures.push(`${route}: missing ${file}`);
  }
}

assert(failures.length === 0, `Prerender verification failed:\n${failures.join("\n")}`);
console.log(`PASS B-01: ${routes.length} public routes have prerendered HTML in dist/`);
