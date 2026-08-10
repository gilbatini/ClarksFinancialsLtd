#!/usr/bin/env node
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { absoluteUrl, assert, extractLink, loadRoutes, ROOT } from "./lib.mjs";

const routes = await loadRoutes();
const failures = [];

for (const route of routes) {
  const file = route === "/" ? resolve(ROOT, "dist/index.html") : resolve(ROOT, `dist${route}/index.html`);
  const html = await readFile(file, "utf8");
  const tags = html.match(/<link\b[^>]*>/gi) ?? [];
  const canonicals = tags.filter((tag) => /\brel=["'][^"']*\bcanonical\b[^"']*["']/i.test(tag));
  const canonical = extractLink(html, "canonical");
  const expected = absoluteUrl(route);

  if (canonicals.length !== 1) {
    failures.push(`${route}: expected one canonical, found ${canonicals.length}`);
  }
  if (canonical !== expected) {
    failures.push(`${route}: expected ${expected}, found ${canonical || "empty"}`);
  }
}

assert(failures.length === 0, `Canonical verification failed:\n${failures.join("\n")}`);
console.log(`PASS B-03: ${routes.length} routes have one self-referential canonical`);
