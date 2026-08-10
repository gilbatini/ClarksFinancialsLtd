#!/usr/bin/env node
import { writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { ensureParent, readJson, ROOT } from "./lib.mjs";

const [routes, heads, crawl, cwv, schema, previews, access, competitors] = await Promise.all([
  readJson(resolve(ROOT, "docs/seo/routes.json")),
  readJson(resolve(ROOT, "docs/seo/baseline-head.json")),
  readJson(resolve(ROOT, "docs/seo/crawl.json")),
  readJson(resolve(ROOT, "docs/seo/cwv-baseline.json")),
  readJson(resolve(ROOT, "docs/seo/schema-baseline.json")),
  readJson(resolve(ROOT, "docs/seo/preview-baseline.json")),
  readJson(resolve(ROOT, "docs/seo/access-status.json")),
  readJson(resolve(ROOT, "docs/seo/competitors.json")),
]);

const findings = [
  ["CRITICAL", "Crawlability", "All public URLs return an empty SPA root in raw HTML; meaningful content requires JavaScript.", "Prerender every public route."],
  ["CRITICAL", "Metadata", "Seven routes share one generic title; descriptions, canonicals, Open Graph, and Twitter tags are absent.", "Emit unique route metadata in prerendered HTML."],
  ["CRITICAL", "Social previews", `${previews.failureCount} required title/description/image fields are missing across the WhatsApp, Facebook, and LinkedIn samples.`, "Add complete route-specific OG data and compliant images."],
  ["HIGH", "Internal discovery", `${crawl.orphans.length} non-home routes are orphaned in the raw-HTML crawl because the SPA shell exposes no anchors.`, "Prerender global navigation and internal links."],
  ["HIGH", "Structured data", `${schema.totalBlocks} JSON-LD blocks exist across ${schema.routes.length} routes.`, "Add fact-traceable Organization, FinancialService, FAQPage, BreadcrumbList, and Service data."],
  ["HIGH", "Search visibility", `Clarks was not observed in the ${competitors.queries.length}-query competitor sample.`, "Target salary-loan and Kampala borrowing intent, then measure in GSC when access exists."],
  ["MEDIUM", "JavaScript payload", "The baseline build emits a single 462.26 kB JavaScript bundle (141.52 kB gzip).", "Split page routes and defer non-critical interaction code."],
  ["MEDIUM", "Image delivery", "Content imagery is hosted on third-party Google URLs and several images lack explicit intrinsic dimensions.", "Self-host, resize, convert, dimension, and lazy-load non-LCP imagery."],
  ["MEDIUM", "Claims compliance", "Existing copy includes prohibited superlatives/comparatives such as “leading” and “best”.", "Remove prohibited language without inventing replacement claims."],
  ["LOW", "Lab CWV", "All key-route p75 lab samples currently fall inside the stated budgets; field data remains unavailable.", "Preserve budgets through implementation and add a repeatable gate."],
];

const cwvRows = cwv.summaries
  .map((entry) => `| ${entry.profile} | \`${entry.path}\` | ${entry.p75.lcpMs} ms | ${entry.p75.inpMs} ms | ${entry.p75.cls} | ${entry.interactionTimingCoverage} |`)
  .join("\n");
const routeRows = routes.routes.map((route) => `| \`${route.path}\` | ${route.keyRoute ? "yes" : "no"} |`).join("\n");
const accessRows = Object.entries(access.systems)
  .map(([system, status]) => `| ${system} | ${status.access} | ${status.note ?? status.fallback ?? "See access-status.json"} |`)
  .join("\n");
const findingRows = findings
  .map(([severity, category, evidence, response]) => `| **${severity}** | ${category} | ${evidence} | ${response} |`)
  .join("\n");

const report = `# SEO baseline

Generated from the unmodified production site and baseline build on 10 August 2026. Measurements and research snapshots are labelled by source; no estimated figure is presented as measured.

## Executive finding register

| Severity | Category | Evidence | Required response |
|---|---|---|---|
${findingRows}

## Public-route allowlist

Router source: \`${routes.source}\`. Canonical origin: ${routes.canonicalBaseUrl}.

| Route | Key route |
|---|---|
${routeRows}

## Raw HTML and crawl baseline

- Raw head captures: ${heads.routes.length}/${routes.routes.length} routes.
- Rendered root content in raw HTML: ${heads.routes.filter((route) => route.rootHasContent).length}/${heads.routes.length} routes.
- HTTP failures: ${crawl.summary.broken}.
- Multi-hop redirect chains on canonical route URLs: ${crawl.summary.redirectChains}.
- Raw-HTML orphan routes: ${crawl.summary.orphans} (${crawl.orphans.map((path) => `\`${path}\``).join(", ")}).

## Metadata and structured-data baseline

- Unique titles: 1 across ${routes.routes.length} routes.
- Meta descriptions: 0.
- Canonical links: 0.
- Complete Open Graph/Twitter sets: 0.
- JSON-LD blocks: ${schema.totalBlocks}.

## Link-preview baseline

Three no-JavaScript crawler identities were sampled on every route: WhatsApp, Facebook, and LinkedIn. The ${routes.routes.length * 3} payloads have ${previews.failureCount} missing required fields. Each crawler sees the generic document title, but no preview description or image.

## Core Web Vitals baseline

Source: ${cwv.source}. Three samples were captured per key route per profile. INP is a synthetic lab interaction measurement, not CrUX field p75.

| Profile | Route | p75 LCP | p75 synthetic INP | p75 CLS | Interaction samples |
|---|---|---:|---:|---:|---:|
${cwvRows}

## External access status

| System | Status | Evidence / requirement |
|---|---|---|
${accessRows}

Work requiring these accounts is blocked; implementation that does not require them continues. AlgoriNext events are queued in \`docs/seo/events.ndjson\`.

## Competitor search snapshot

Four money-term queries yielded ${competitors.recurringDomains.length} observed domains. Clarks was not present in the returned sample. This is a current research snapshot, not a Google rank or impression measurement; Search Console access is required for the latter.

Priority intent:

- salary loans Uganda
- quick loans Kampala Uganda
- personal loans Uganda
- money lenders Kampala Uganda

## Stage A gate

Tasks A-01 through A-10 have machine-readable evidence in \`docs/seo/\`. The implementation tracks may begin. The highest-value work is route prerendering plus route-specific social metadata, followed by structured data, internal discovery, image delivery, claims hygiene, and measurement automation.
`;

const output = resolve(ROOT, "docs/seo/BASELINE.md");
await ensureParent(output);
await writeFile(output, report);
console.log(`PASS A-10: docs/seo/BASELINE.md written with ${findings.length} severity-tagged findings`);
