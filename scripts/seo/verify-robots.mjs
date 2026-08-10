#!/usr/bin/env node
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { assert, DEFAULT_BASE_URL, ROOT } from "./lib.mjs";

const file = await readFile(resolve(ROOT, "dist/robots.txt"), "utf8");
const lines = file.split(/\r?\n/).map((line) => line.trim()).filter((line) => line && !line.startsWith("#"));
const failures = [];

const userAgents = lines.filter((line) => /^user-agent:/i.test(line));
if (userAgents.length !== 1 || userAgents[0].toLowerCase() !== "user-agent: *") failures.push("robots.txt must contain one wildcard User-agent");
const allow = lines.filter((line) => /^allow:/i.test(line));
if (!allow.some((line) => line.replace(/\s/g, "").toLowerCase() === "allow:/")) failures.push("robots.txt must explicitly allow the site root");
const disallows = lines.filter((line) => /^disallow:/i.test(line) && line.replace(/\s/g, "").toLowerCase() !== "disallow:");
if (disallows.length) failures.push(`unexpected disallow rules: ${disallows.join(", ")}`);
const expectedSitemap = `Sitemap: ${DEFAULT_BASE_URL}/sitemap.xml`;
const sitemaps = lines.filter((line) => /^sitemap:/i.test(line));
if (sitemaps.length !== 1) failures.push(`expected one Sitemap directive, found ${sitemaps.length}`);
if (sitemaps[0] !== expectedSitemap) failures.push(`expected ${expectedSitemap}`);

assert(failures.length === 0, `Robots verification failed:\n${failures.join("\n")}`);
console.log("PASS B-08: robots.txt allows crawling and references the canonical sitemap");
