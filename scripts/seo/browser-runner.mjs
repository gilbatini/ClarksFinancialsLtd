import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { extname, resolve } from "node:path";
import { chromium } from "playwright";
import { assert, ROOT } from "./lib.mjs";

const contentTypes = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
};

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
      response.setHeader("content-type", contentTypes[extname(file)] ?? "application/octet-stream");
      response.end(body);
    } catch {
      response.statusCode = 404;
      response.end("Not found");
    }
  });
  await new Promise((resolveListen) => server.listen(0, "127.0.0.1", resolveListen));
  const address = server.address();
  assert(address && typeof address === "object", "Local dist server did not bind to a port");
  server.unref();
  return { server, baseUrl: `http://127.0.0.1:${address.port}` };
}

export async function withRenderedSite(callback) {
  const externalBaseUrl = process.env.SEO_BASE_URL;
  let localServer;
  let baseUrl = externalBaseUrl;
  if (!baseUrl) {
    ({ server: localServer, baseUrl } = await startDistServer());
  }

  const browser = await chromium.launch({ headless: true, args: ["--no-sandbox"] });
  try {
    return await callback({ browser, baseUrl });
  } finally {
    await browser.close();
    if (localServer) await new Promise((resolveClose) => localServer.close(resolveClose));
  }
}
