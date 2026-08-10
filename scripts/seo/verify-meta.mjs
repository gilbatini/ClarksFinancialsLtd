#!/usr/bin/env node
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { assert, extractMeta, extractTitle, loadRoutes, ROOT } from "./lib.mjs";

const TITLE_MIN = 30;
const TITLE_MAX = 60;
const DESCRIPTION_MIN = 120;
const DESCRIPTION_MAX = 160;
const routes = await loadRoutes();
const records = [];
const failures = [];

for (const route of routes) {
  const file = route === "/" ? resolve(ROOT, "dist/index.html") : resolve(ROOT, `dist${route}/index.html`);
  const html = await readFile(file, "utf8");
  const title = extractTitle(html);
  const description = extractMeta(html, "name", "description");
  records.push({ route, title, description });

  if (!title) failures.push(`${route}: empty title`);
  if (title.length < TITLE_MIN || title.length > TITLE_MAX) {
    failures.push(`${route}: title length ${title.length} outside ${TITLE_MIN}-${TITLE_MAX}`);
  }
  if (!description) failures.push(`${route}: empty description`);
  if (description.length < DESCRIPTION_MIN || description.length > DESCRIPTION_MAX) {
    failures.push(`${route}: description length ${description.length} outside ${DESCRIPTION_MIN}-${DESCRIPTION_MAX}`);
  }
}

for (const field of ["title", "description"]) {
  const groups = new Map();
  for (const record of records) {
    const value = record[field];
    groups.set(value, [...(groups.get(value) ?? []), record]);
  }
  for (const [value, duplicates] of groups) {
    if (value && duplicates.length > 1) {
      failures.push(`duplicate ${field}: ${duplicates.map(({ route }) => route).join(", ")}`);
    }
  }
}

assert(failures.length === 0, `Metadata verification failed:\n${failures.join("\n")}`);
console.log(`PASS B-02: ${routes.length} routes have unique titles and descriptions within length budgets`);
