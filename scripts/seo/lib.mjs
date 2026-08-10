import { appendFile, mkdir, readFile, readdir, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";

export const ROOT = resolve(import.meta.dirname, "../..");
export const DOCS_DIR = resolve(ROOT, "docs/seo");
export const PAGES_DIR = resolve(ROOT, "pages");
export const ROUTES_FILE = resolve(DOCS_DIR, "routes.json");
export const DEFAULT_BASE_URL = "https://www.clarksfinancials.com";

export async function ensureParent(file) {
  await mkdir(dirname(file), { recursive: true });
}

export async function readJson(file) {
  return JSON.parse(await readFile(file, "utf8"));
}

export async function writeJson(file, value) {
  await ensureParent(file);
  await writeFile(file, `${JSON.stringify(value, null, 2)}\n`);
}

export async function extractRouterPaths() {
  const entries = await readdir(PAGES_DIR, { withFileTypes: true });
  const routes = [];
  for (const entry of entries) {
    if (!entry.isDirectory()) continue;
    try {
      await readFile(resolve(PAGES_DIR, entry.name, "+Page.tsx"));
      routes.push(entry.name === "index" ? "/" : `/${entry.name}`);
    } catch {
      // A directory without a +Page module is not a public route.
    }
  }
  return routes.sort((a, b) => (a === "/" ? -1 : b === "/" ? 1 : a.localeCompare(b)));
}

export async function loadRoutes() {
  const manifest = await readJson(ROUTES_FILE);
  return manifest.routes.map((route) => route.path);
}

export function absoluteUrl(pathname, baseUrl = DEFAULT_BASE_URL) {
  return new URL(pathname, `${baseUrl.replace(/\/$/, "")}/`).href;
}

export function htmlEntityDecode(value = "") {
  return value
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
}

export function extractHead(html) {
  return html.match(/<head\b[^>]*>([\s\S]*?)<\/head>/i)?.[1]?.trim() ?? "";
}

export function extractTitle(html) {
  return htmlEntityDecode(html.match(/<title\b[^>]*>([\s\S]*?)<\/title>/i)?.[1]?.trim() ?? "");
}

export function extractMeta(html, attribute, value) {
  const tags = html.match(/<meta\b[^>]*>/gi) ?? [];
  for (const tag of tags) {
    const attrs = Object.fromEntries(
      [...tag.matchAll(/([\w:-]+)=["']([^"']*)["']/g)].map((match) => [match[1].toLowerCase(), htmlEntityDecode(match[2])]),
    );
    if (attrs[attribute.toLowerCase()]?.toLowerCase() === value.toLowerCase()) {
      return attrs.content ?? "";
    }
  }
  return "";
}

export function extractLink(html, rel) {
  const tags = html.match(/<link\b[^>]*>/gi) ?? [];
  for (const tag of tags) {
    const attrs = Object.fromEntries(
      [...tag.matchAll(/([\w:-]+)=["']([^"']*)["']/g)].map((match) => [match[1].toLowerCase(), htmlEntityDecode(match[2])]),
    );
    if ((attrs.rel ?? "").toLowerCase().split(/\s+/).includes(rel.toLowerCase())) {
      return attrs.href ?? "";
    }
  }
  return "";
}

export async function fetchHtml(url, options = {}) {
  const response = await fetch(url, {
    redirect: "follow",
    signal: AbortSignal.timeout(options.timeout ?? 20_000),
    headers: {
      accept: "text/html,application/xhtml+xml",
      "user-agent": options.userAgent ?? "ClarksSEOAudit/1.0 (+https://www.clarksfinancials.com)",
    },
  });
  return {
    body: await response.text(),
    status: response.status,
    finalUrl: response.url,
    headers: Object.fromEntries(response.headers.entries()),
  };
}

export async function emitEvent(event, taskId, track, payload) {
  const record = {
    tenant: process.env.ALGORINEXT_TENANT || "clarks",
    workstream: "seo",
    event,
    task_id: taskId,
    track,
    ts: new Date().toISOString(),
    payload,
  };
  const endpoint = process.env.ALGORINEXT_EVENT_URL;
  const token = process.env.ALGORINEXT_TOKEN;

  if (endpoint && token) {
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        signal: AbortSignal.timeout(10_000),
        headers: { authorization: `Bearer ${token}`, "content-type": "application/json" },
        body: JSON.stringify(record),
      });
      if (response.ok) return { destination: "remote", record };
    } catch {
      // The telemetry contract requires a local backlog when the endpoint is unavailable.
    }
  }

  const backlog = resolve(DOCS_DIR, "events.ndjson");
  await ensureParent(backlog);
  await appendFile(backlog, `${JSON.stringify(record)}\n`);
  return { destination: "backlog", record };
}

export function assert(condition, message) {
  if (!condition) throw new Error(message);
}
