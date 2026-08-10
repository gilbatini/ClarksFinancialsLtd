#!/usr/bin/env node
import { writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import {
  absoluteUrl,
  DEFAULT_BASE_URL,
  ensureParent,
  extractLink,
  extractMeta,
  extractTitle,
  fetchHtml,
  loadRoutes,
  ROOT,
} from "./lib.mjs";

const routes = await loadRoutes();
const baseUrl = process.env.SEO_BASE_URL || DEFAULT_BASE_URL;
const rows = [];
for (const path of routes) {
  const response = await fetchHtml(absoluteUrl(path, baseUrl));
  const title = extractTitle(response.body);
  const description = extractMeta(response.body, "name", "description");
  rows.push({
    path,
    status: response.status,
    title,
    titleLength: [...title].length,
    description,
    descriptionLength: [...description].length,
    canonical: extractLink(response.body, "canonical"),
    ogTitle: extractMeta(response.body, "property", "og:title"),
    ogDescription: extractMeta(response.body, "property", "og:description"),
    ogImage: extractMeta(response.body, "property", "og:image"),
    ogUrl: extractMeta(response.body, "property", "og:url"),
    twitterCard: extractMeta(response.body, "name", "twitter:card"),
  });
}

function csv(value) {
  const string = String(value ?? "");
  return /[",\n]/.test(string) ? `"${string.replace(/"/g, '""')}"` : string;
}

const columns = Object.keys(rows[0]);
const output = [columns.join(","), ...rows.map((row) => columns.map((column) => csv(row[column])).join(","))].join("\n");
const file = resolve(ROOT, "docs/seo/meta-baseline.csv");
await ensureParent(file);
await writeFile(file, `${output}\n`);

if (rows.length !== routes.length) throw new Error("Metadata inventory is incomplete");
console.log(`PASS A-05: inventoried metadata for ${rows.length} routes (${new Set(rows.map((row) => row.title)).size} unique title, ${rows.filter((row) => row.description).length} descriptions)`);
