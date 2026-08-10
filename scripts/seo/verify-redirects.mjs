#!/usr/bin/env node
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { absoluteUrl, assert, DEFAULT_BASE_URL, extractLink, extractMeta, loadRoutes, ROOT } from "./lib.mjs";

const config = JSON.parse(await readFile(resolve(ROOT, "vercel.json"), "utf8"));
const routes = await loadRoutes();
const failures = [];
const canonicalHost = new URL(DEFAULT_BASE_URL).hostname;
const apexHost = canonicalHost.replace(/^www\./, "");

if (config.outputDirectory !== "dist") failures.push("Vercel outputDirectory must be dist");
if (config.cleanUrls !== true) failures.push("Vercel cleanUrls must be true");
if (config.trailingSlash !== false) failures.push("Vercel trailingSlash must be false");
if ((config.rewrites ?? []).length) failures.push("Vercel rewrites must not bypass route-specific prerendered HTML");

const redirects = config.redirects ?? [];
const redirect = redirects[0] ?? {};
if (redirects.length !== 1) failures.push(`expected one canonical-host redirect, found ${redirects.length}`);
if (redirect.source !== "/:path*") failures.push("canonical-host redirect must preserve every path");
if (redirect.destination !== `${DEFAULT_BASE_URL}/:path*`) failures.push("redirect destination must use canonical HTTPS www origin");
if (redirect.permanent !== true) failures.push("canonical-host redirect must be permanent");
const hostCondition = (redirect.has ?? []).find((condition) => condition.type === "header" && condition.key?.toLowerCase() === "host");
if (hostCondition?.value !== apexHost) failures.push(`redirect must match apex host ${apexHost}`);

for (const route of routes) {
  const file = route === "/" ? resolve(ROOT, "dist/index.html") : resolve(ROOT, `dist${route}/index.html`);
  const html = await readFile(file, "utf8");
  const expected = absoluteUrl(route);
  const signals = {
    canonical: extractLink(html, "canonical"),
    "og:url": extractMeta(html, "property", "og:url"),
  };
  for (const [label, value] of Object.entries(signals)) {
    let parsed;
    try {
      parsed = new URL(value);
    } catch {
      failures.push(`${route}: ${label} is not an absolute URL`);
      continue;
    }
    if (parsed.protocol !== "https:") failures.push(`${route}: ${label} is not HTTPS`);
    if (parsed.hostname !== canonicalHost) failures.push(`${route}: ${label} uses mixed hostname ${parsed.hostname}`);
    if (value !== expected) failures.push(`${route}: ${label} is not self-referential`);
  }
}

const sitemap = await readFile(resolve(ROOT, "dist/sitemap.xml"), "utf8");
const sitemapUrls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => new URL(match[1]));
if (sitemapUrls.some((url) => url.protocol !== "https:" || url.hostname !== canonicalHost)) failures.push("sitemap contains mixed schemes or hostnames");
const robots = await readFile(resolve(ROOT, "dist/robots.txt"), "utf8");
if (!robots.includes(`Sitemap: ${DEFAULT_BASE_URL}/sitemap.xml`)) failures.push("robots.txt sitemap hostname is not canonical");

assert(failures.length === 0, `Redirect verification failed:\n${failures.join("\n")}`);
console.log("PASS B-09: static Vercel routing preserves prerendered pages with one permanent canonical-host rule and no mixed URL signals");
