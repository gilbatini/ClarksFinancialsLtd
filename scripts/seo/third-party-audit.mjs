#!/usr/bin/env node
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { ROOT, writeJson } from "./lib.mjs";

const indexHtml = await readFile(resolve(ROOT, "index.html"), "utf8");
const appSource = await readFile(resolve(ROOT, "src/App.tsx"), "utf8");
const navbarSource = await readFile(resolve(ROOT, "src/components/Navbar.tsx"), "utf8");
const scriptTags = indexHtml.match(/<script\b[\s\S]*?<\/script>/gi) || [];
const externalScripts = scriptTags.filter((tag) => /\bsrc=["'](?:https?:)?\/\//i.test(tag));
const moduleScripts = scriptTags.filter((tag) => /\btype=["']module["']/i.test(tag));
const failures = [];

if (externalScripts.length) failures.push(`${externalScripts.length} render-blocking external script(s) found`);
if (scriptTags.length !== 1 || moduleScripts.length !== 1) {
  failures.push(`Expected one deferred first-party module, found ${scriptTags.length} scripts and ${moduleScripts.length} modules`);
}
if (!/lazy\(\(\) => import\("\.\/components\/Chatbot"\)\)/.test(appSource)) {
  failures.push("WhatsApp module is not dynamically imported");
}
if (!/requestIdleCallback/.test(appSource)) failures.push("WhatsApp module is not scheduled during idle time");
if (/from ["']motion\/react["']/.test(navbarSource)) {
  failures.push("Navigation interaction still depends on the animation runtime");
}

const report = {
  generatedAt: new Date().toISOString(),
  source: "index.html plus static source inspection",
  firstPartyScripts: scriptTags.map((tag) => ({
    src: tag.match(/\bsrc=["']([^"']+)["']/i)?.[1] || null,
    type: "module",
    loading: "deferred by HTML module-script semantics",
  })),
  thirdPartyScripts: [],
  deferredFeatures: [
    {
      feature: "WhatsApp assistant",
      strategy: "dynamic import scheduled with requestIdleCallback and timeout fallback",
    },
  ],
  navigationAnimation: "CSS grid/opacity transition; no JavaScript animation runtime",
  passed: failures.length === 0,
};

await writeJson(resolve(ROOT, "docs/seo/third-party-scripts.json"), report);
if (failures.length) {
  for (const failure of failures) console.error(`FAIL ${failure}`);
  process.exitCode = 1;
} else {
  console.log("PASS C-05 script audit: 0 third-party tags; first-party modules deferred; WhatsApp loaded on idle");
}
