#!/usr/bin/env node
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { absoluteUrl, assert, extractMeta, loadRoutes, ROOT } from "./lib.mjs";

const OG_FIELDS = ["og:title", "og:description", "og:image", "og:url", "og:type"];
const TWITTER_FIELDS = ["twitter:card", "twitter:title", "twitter:description", "twitter:image"];
const routes = await loadRoutes();
const failures = [];

function countMeta(html, attribute, value) {
  return (html.match(/<meta\b[^>]*>/gi) ?? []).filter((tag) => {
    const match = tag.match(new RegExp(`\\b${attribute}=["']([^"']*)["']`, "i"));
    return match?.[1]?.toLowerCase() === value.toLowerCase();
  }).length;
}

for (const route of routes) {
  const file = route === "/" ? resolve(ROOT, "dist/index.html") : resolve(ROOT, `dist${route}/index.html`);
  const html = await readFile(file, "utf8");

  for (const field of [...OG_FIELDS, ...TWITTER_FIELDS]) {
    const attribute = field.startsWith("og:") ? "property" : "name";
    const value = extractMeta(html, attribute, field);
    if (!value) failures.push(`${route}: missing ${field}`);
    if (countMeta(html, attribute, field) !== 1) failures.push(`${route}: ${field} must occur exactly once`);
  }

  const expectedUrl = absoluteUrl(route);
  const ogUrl = extractMeta(html, "property", "og:url");
  if (ogUrl !== expectedUrl) failures.push(`${route}: og:url must be ${expectedUrl}`);
  const ogType = extractMeta(html, "property", "og:type");
  if (ogType !== "website") failures.push(`${route}: og:type must be website`);
  const card = extractMeta(html, "name", "twitter:card");
  if (card !== "summary_large_image") failures.push(`${route}: twitter:card must be summary_large_image`);
  const image = extractMeta(html, "property", "og:image");
  if (!image.startsWith("https://")) failures.push(`${route}: og:image must be an absolute HTTPS URL`);
}

assert(failures.length === 0, `Open Graph verification failed:\n${failures.join("\n")}`);
console.log(`PASS B-04: ${routes.length} routes have complete, unique Open Graph and Twitter tags`);
