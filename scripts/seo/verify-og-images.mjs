#!/usr/bin/env node
import { readFile, stat } from "node:fs/promises";
import { resolve } from "node:path";
import { assert, extractMeta, loadRoutes, ROOT } from "./lib.mjs";

const routes = await loadRoutes();
const failures = [];
const checked = new Set();

for (const route of routes) {
  const htmlFile = route === "/" ? resolve(ROOT, "dist/index.html") : resolve(ROOT, `dist${route}/index.html`);
  const html = await readFile(htmlFile, "utf8");
  const imageUrl = extractMeta(html, "property", "og:image");

  if (!imageUrl.startsWith("https://")) {
    failures.push(`${route}: OG image URL is not absolute HTTPS`);
    continue;
  }
  if (checked.has(imageUrl)) continue;
  checked.add(imageUrl);

  const url = new URL(imageUrl);
  const imageFile = resolve(ROOT, `dist${url.pathname}`);
  try {
    const bytes = await readFile(imageFile);
    const details = await stat(imageFile);
    const isPng = bytes.subarray(1, 4).toString("ascii") === "PNG";
    const width = isPng ? bytes.readUInt32BE(16) : 0;
    const height = isPng ? bytes.readUInt32BE(20) : 0;
    if (width !== 1200 || height !== 630) failures.push(`${url.pathname}: expected 1200x630, found ${width}x${height}`);
    if (details.size >= 300_000) failures.push(`${url.pathname}: ${details.size} bytes exceeds the <300KB budget`);
  } catch {
    failures.push(`${url.pathname}: image file is missing from dist`);
  }
}

assert(failures.length === 0, `OG image verification failed:\n${failures.join("\n")}`);
console.log(`PASS B-05: ${checked.size} OG image asset is 1200x630, under 300KB, and served by absolute HTTPS URL`);
