#!/usr/bin/env node
import { resolve } from "node:path";
import {
  absoluteUrl,
  assert,
  DEFAULT_BASE_URL,
  loadRoutes,
  ROOT,
  writeJson,
} from "./lib.mjs";

const routes = await loadRoutes();
const baseUrl = process.env.SEO_BASE_URL || DEFAULT_BASE_URL;
const origin = new URL(baseUrl).origin;

async function fetchTrace(initialUrl) {
  const redirects = [];
  let current = initialUrl;
  for (let hop = 0; hop < 6; hop += 1) {
    const response = await fetch(current, {
      redirect: "manual",
      signal: AbortSignal.timeout(20_000),
      headers: { accept: "text/html", "user-agent": "ClarksSEOAudit/1.0" },
    });
    if (response.status >= 300 && response.status < 400 && response.headers.get("location")) {
      const next = new URL(response.headers.get("location"), current).href;
      redirects.push({ from: current, status: response.status, to: next });
      current = next;
      continue;
    }
    return { status: response.status, finalUrl: current, redirects, body: await response.text() };
  }
  throw new Error(`Redirect limit exceeded for ${initialUrl}`);
}

function internalLinks(html) {
  const links = [];
  for (const match of html.matchAll(/<a\b[^>]*\bhref=["']([^"'#]+)["'][^>]*>/gi)) {
    try {
      const url = new URL(match[1], baseUrl);
      if (url.origin === origin) links.push(url.pathname.replace(/\/$/, "") || "/");
    } catch {
      // Malformed URLs are surfaced by the broken-link checks in implementation tracks.
    }
  }
  return [...new Set(links)];
}

const pages = [];
for (const path of routes) {
  const trace = await fetchTrace(absoluteUrl(path, baseUrl));
  pages.push({
    path,
    requestedUrl: absoluteUrl(path, baseUrl),
    status: trace.status,
    finalUrl: trace.finalUrl,
    redirectChain: trace.redirects,
    outgoingInternalLinks: internalLinks(trace.body),
    bytes: Buffer.byteLength(trace.body),
  });
}

const routeSet = new Set(routes);
const depth = new Map([["/", 0]]);
const queue = ["/"];
while (queue.length) {
  const path = queue.shift();
  const page = pages.find((candidate) => candidate.path === path);
  for (const link of page?.outgoingInternalLinks ?? []) {
    if (routeSet.has(link) && !depth.has(link)) {
      depth.set(link, depth.get(path) + 1);
      queue.push(link);
    }
  }
}

for (const page of pages) page.depth = depth.get(page.path) ?? null;
const broken = pages.filter((page) => page.status >= 400).map((page) => page.path);
const redirectChains = pages.filter((page) => page.redirectChain.length > 1).map((page) => page.path);
const orphans = routes.filter((path) => path !== "/" && !depth.has(path));

await writeJson(resolve(ROOT, "docs/seo/crawl.json"), {
  generatedAt: new Date().toISOString(),
  source: "raw HTML crawl; JavaScript not executed",
  baseUrl,
  summary: { routes: pages.length, broken: broken.length, redirectChains: redirectChains.length, orphans: orphans.length },
  broken,
  redirectChains,
  orphans,
  pages,
});

if (process.argv.includes("--assert")) {
  assert(broken.length === 0, `Broken routes: ${broken.join(", ")}`);
  assert(redirectChains.length === 0, `Redirect chains: ${redirectChains.join(", ")}`);
  assert(orphans.length === 0, `Orphan routes: ${orphans.join(", ")}`);
}
console.log(`PASS A-03 crawl recorded: ${pages.length} routes, ${broken.length} broken, ${redirectChains.length} redirect chains, ${orphans.length} raw-HTML orphans`);
