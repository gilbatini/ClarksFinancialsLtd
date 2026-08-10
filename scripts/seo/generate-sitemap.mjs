#!/usr/bin/env node
import { writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { absoluteUrl, loadRoutes, ROOT } from "./lib.mjs";

const routes = await loadRoutes();
const sitemap = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...routes.map((route) => [
    "  <url>",
    `    <loc>${absoluteUrl(route)}</loc>`,
    "  </url>",
  ].join("\n")),
  "</urlset>",
  "",
].join("\n");
await writeFile(resolve(ROOT, "dist/sitemap.xml"), sitemap);
console.log(`Generated sitemap.xml with ${routes.length} URLs`);
