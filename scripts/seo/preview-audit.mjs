#!/usr/bin/env node
import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { extname, resolve } from "node:path";
import {
  absoluteUrl,
  assert,
  DEFAULT_BASE_URL,
  extractMeta,
  extractTitle,
  fetchHtml,
  loadRoutes,
  ROOT,
  writeJson,
} from "./lib.mjs";
async function startDistServer() {
  const dist = resolve(ROOT, "dist");
  const server = createServer(async (request, response) => {
    try {
      const pathname = new URL(request.url ?? "/", "http://local").pathname;
      const relative = pathname === "/"
        ? "index.html"
        : extname(pathname) ? pathname.slice(1) : `${pathname.slice(1).replace(/\/$/, "")}/index.html`;
      const file = resolve(dist, relative);
      if (file !== resolve(dist, "index.html") && !file.startsWith(`${dist}/`)) {
        response.statusCode = 400;
        response.end("Bad request");
        return;
      }
      const body = await readFile(file);
      response.statusCode = 200;
      response.setHeader("content-type", extname(file) === ".html" ? "text/html; charset=utf-8" : "application/octet-stream");
      response.end(body);
    } catch {
      response.statusCode = 404;
      response.end("Not found");
    }
  });
  await new Promise((resolveListen) => server.listen(0, "127.0.0.1", resolveListen));
  const address = server.address();
  assert(address && typeof address === "object", "Local preview server did not bind to a port");
  server.unref();
  return { server, baseUrl: `http://127.0.0.1:${address.port}` };
}

const crawlers = {
  whatsapp: "WhatsApp/2.23.20.0 A",
  facebook: "facebookexternalhit/1.1 (+http://www.facebook.com/externalhit_uatext.php)",
  linkedin: "LinkedInBot/1.0 (+http://www.linkedin.com)",
};
const asserting = process.argv.includes("--assert");
const routes = await loadRoutes();
let localServer;
let baseUrl = process.env.SEO_BASE_URL || DEFAULT_BASE_URL;
if (asserting && !process.env.SEO_BASE_URL) {
  ({ server: localServer, baseUrl } = await startDistServer());
}

const records = [];

for (const path of routes) {
  const previews = {};
  for (const [crawler, userAgent] of Object.entries(crawlers)) {
    const response = await fetchHtml(absoluteUrl(path, baseUrl), { userAgent });
    const ogTitle = extractMeta(response.body, "property", "og:title");
    const ogDescription = extractMeta(response.body, "property", "og:description");
    previews[crawler] = {
      status: response.status,
      finalUrl: asserting && localServer ? absoluteUrl(path) : response.finalUrl,
      title: ogTitle || extractTitle(response.body),
      description: ogDescription || extractMeta(response.body, "name", "description"),
      image: extractMeta(response.body, "property", "og:image"),
      ogUrl: extractMeta(response.body, "property", "og:url"),
    };
  }
  records.push({ path, previews });
}

const failures = [];
for (const route of records) {
  for (const [crawler, preview] of Object.entries(route.previews)) {
    if (preview.status !== 200) failures.push(`${route.path} ${crawler} returned ${preview.status}`);
    for (const field of ["title", "description", "image"]) {
      if (!preview[field]) failures.push(`${route.path} ${crawler} missing ${field}`);
    }
    if (preview.image && !preview.image.startsWith("https://")) failures.push(`${route.path} ${crawler} image is not HTTPS`);
    if (preview.ogUrl !== absoluteUrl(route.path)) failures.push(`${route.path} ${crawler} og:url is not canonical`);
  }
}

const file = resolve(ROOT, asserting ? "docs/seo/preview-current.json" : "docs/seo/preview-baseline.json");
await writeJson(file, {
  ...(!asserting && { generatedAt: new Date().toISOString() }),
  source: "UA-spoofed raw HTTP fetch; JavaScript not executed",
  baseUrl: asserting && localServer ? "local-dist" : baseUrl,
  crawlers: Object.keys(crawlers),
  failureCount: failures.length,
  failures,
  routes: records,
});

if (localServer) await new Promise((resolveClose) => localServer.close(resolveClose));
if (asserting) assert(failures.length === 0, `Preview verification failed:\n${failures.join("\n")}`);
const task = asserting ? "B-06" : "A-07";
console.log(`PASS ${task}: recorded ${records.length * Object.keys(crawlers).length} JS-disabled crawler previews; ${failures.length} failures`);
