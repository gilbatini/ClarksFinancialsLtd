#!/usr/bin/env node
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { assert, ROOT, writeJson } from "./lib.mjs";

const snapshotFile = resolve(ROOT, "scripts/seo/serp-snapshot.json");
const snapshot = JSON.parse(await readFile(snapshotFile, "utf8"));
assert(snapshot.queries.length >= 4, "SERP snapshot must cover at least four priority queries");

const domainCounts = new Map();
const mappedQueries = snapshot.queries.map((entry) => {
  assert(entry.results.length >= 5, `${entry.query} has fewer than five observed results`);
  const results = entry.results.map((result, index) => {
    const domain = new URL(result.url).hostname.replace(/^www\./, "");
    domainCounts.set(domain, (domainCounts.get(domain) ?? 0) + 1);
    return { observedOrder: index + 1, domain, ...result };
  });
  return {
    ...entry,
    clarksObserved: results.some((result) => result.domain === "clarksfinancials.com"),
    results,
  };
});

const recurringDomains = [...domainCounts.entries()]
  .map(([domain, queryAppearances]) => ({ domain, queryAppearances }))
  .sort((a, b) => b.queryAppearances - a.queryAppearances || a.domain.localeCompare(b.domain));

const output = {
  generatedAt: new Date().toISOString(),
  observedAt: snapshot.observedAt,
  source: snapshot.source,
  caveat: "This is a reproducible research snapshot, not a measured Google rank or impression report. GSC access is unavailable.",
  priorityQueries: mappedQueries.map((entry) => entry.query),
  clarksObservedInSample: mappedQueries.some((entry) => entry.clarksObserved),
  recurringDomains,
  queries: mappedQueries,
};
await writeJson(resolve(ROOT, "docs/seo/competitors.json"), output);
console.log(`PASS A-09: mapped ${mappedQueries.length} money-term queries and ${domainCounts.size} observed domains; Clarks observed: ${output.clarksObservedInSample}`);
