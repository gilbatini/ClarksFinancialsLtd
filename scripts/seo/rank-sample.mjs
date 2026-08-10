#!/usr/bin/env node
import { appendFile, readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { emitEvent, ensureParent, readJson, ROOT } from "./lib.mjs";
import { loadRankSource } from "./gsc-rank-source.mjs";

const competitors = await loadRankSource(await readJson(resolve(ROOT, "docs/seo/competitors.json")));
const sampleFile = resolve(ROOT, "docs/seo/rank-samples.ndjson");
let previous = [];
try {
  previous = (await readFile(sampleFile, "utf8")).trim().split("\n").filter(Boolean).map((line) => JSON.parse(line));
} catch {
  // The first run establishes the baseline.
}

const sampledAt = new Date().toISOString();
const records = competitors.queries.map((entry) => {
  const match = entry.results.find((result) => result.domain === "clarksfinancials.com");
  const prior = [...previous].reverse().find((sample) => sample.query === entry.query && sample.observedAt !== competitors.observedAt);
  return {
    sampledAt,
    observedAt: competitors.observedAt,
    query: entry.query,
    url: "https://www.clarksfinancials.com/",
    position: match?.observedOrder ?? null,
    status: match ? "observed" : "not_observed_within_sample",
    sampleDepth: entry.results.length,
    source: `research_snapshot:${competitors.observedAt}`,
    change: prior?.position != null && match?.observedOrder != null ? prior.position - match.observedOrder : null,
    note: prior ? "Compared with prior independently dated snapshot." : "No independently dated prior sample; movement not available.",
  };
});

const existingKeys = new Set(previous.map((sample) => `${sample.observedAt}|${sample.query}`));
const newRecords = records.filter((record) => !existingKeys.has(`${record.observedAt}|${record.query}`));
if (newRecords.length) {
  await ensureParent(sampleFile);
  await appendFile(sampleFile, `${newRecords.map((record) => JSON.stringify(record)).join("\n")}\n`);
}

for (const record of records) {
  await emitEvent("seo.metric.sampled", "F-04", "F", {
    metric: "organic_observed_position",
    value: record.position,
    unit: "position",
    source: record.source,
    url: record.url,
    keyword: record.query,
    status: record.status,
    sample_depth: record.sampleDepth,
    movement: record.change,
  });
}
console.log(`PASS F-04: sampled ${records.length} priority queries; ${records.filter((record) => record.position != null).length} Clarks positions observed; ${newRecords.length} new baseline records written`);
