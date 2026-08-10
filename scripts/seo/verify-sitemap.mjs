#!/usr/bin/env node
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { absoluteUrl, assert, htmlEntityDecode, loadRoutes, ROOT } from "./lib.mjs";

const routes = await loadRoutes();
const expected = routes.map((route) => absoluteUrl(route)).sort();
const xml = await readFile(resolve(ROOT, "dist/sitemap.xml"), "utf8");
const failures = [];

if (!xml.startsWith('<?xml version="1.0" encoding="UTF-8"?>')) failures.push("missing UTF-8 XML declaration");
if (!xml.includes('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">')) failures.push("missing sitemap namespace");
if (!xml.trimEnd().endsWith("</urlset>")) failures.push("missing closing urlset element");

const actual = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)]
  .map((match) => htmlEntityDecode(match[1]))
  .sort();
if (new Set(actual).size !== actual.length) failures.push("duplicate sitemap URLs found");
if (JSON.stringify(actual) !== JSON.stringify(expected)) {
  const missing = expected.filter((url) => !actual.includes(url));
  const extra = actual.filter((url) => !expected.includes(url));
  if (missing.length) failures.push(`missing URLs: ${missing.join(", ")}`);
  if (extra.length) failures.push(`extra URLs: ${extra.join(", ")}`);
}

assert(failures.length === 0, `Sitemap verification failed:\n${failures.join("\n")}`);
console.log(`PASS B-07: sitemap is valid and exactly matches all ${routes.length} allowlisted routes`);
