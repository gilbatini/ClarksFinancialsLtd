#!/usr/bin/env node
import { assert, loadRoutes } from "./lib.mjs";
import { withRenderedSite } from "./browser-runner.mjs";

const routes = await loadRoutes();
const routeSet = new Set(routes);
const graph = await withRenderedSite(async ({ browser, baseUrl }) => {
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  const result = {};
  for (const path of routes) {
    await page.goto(new URL(path, baseUrl).href, { waitUntil: "domcontentloaded" });
    const links = await page.locator("a[href]").evaluateAll((anchors) => anchors.map((anchor) => anchor.href));
    result[path] = [...new Set(links
      .map((href) => new URL(href))
      .filter((url) => url.origin === new URL(baseUrl).origin)
      .map((url) => url.pathname.replace(/\/$/, "") || "/"))];
  }
  return result;
});

const depth = new Map([["/", 0]]);
const queue = ["/"];
while (queue.length) {
  const path = queue.shift();
  for (const linked of graph[path] ?? []) {
    if (routeSet.has(linked) && !depth.has(linked)) {
      depth.set(linked, depth.get(path) + 1);
      queue.push(linked);
    }
  }
}

for (const moneyPage of ["/loans", "/apply"]) {
  assert(depth.has(moneyPage), `${moneyPage} is orphaned`);
  assert(depth.get(moneyPage) <= 2, `${moneyPage} is ${depth.get(moneyPage)} clicks from home`);
}
for (const route of routes) assert(depth.has(route), `${route} is orphaned from rendered navigation`);
console.log(`PASS E-03: all ${routes.length} routes discoverable; /loans and /apply are ${depth.get("/loans")} click from home`);
