#!/usr/bin/env node
import { readdir, readFile } from "node:fs/promises";
import { extname, resolve } from "node:path";
import { assert, ROOT } from "./lib.mjs";

const patterns = [
  { label: "market-leading claim", expression: /Uganda['’]s\s+leading|industry[- ]leading/gi },
  { label: "competitive claim", expression: /\bcompetitive\b/gi },
  { label: "instant-outcome claim", expression: /\binstant\s+(?:approval|disbursement|processing|funding)\b/gi },
  { label: "fabricated response metric", expression: /\b02:45\b|\btypically replies immediately\b/gi },
  { label: "unsupported security claim", expression: /\bmilitary[- ]grade\b/gi },
  { label: "unsupported zero-fee statistic", expression: /\b0\.0%\b/gi },
  { label: "best claim", expression: /\b(?:the|Uganda['’]s)\s+best\b|\bbest\s+(?:service|rates?|terms?|financial)/gi },
  { label: "fastest claim", expression: /\bfastest\b/gi },
  { label: "lowest claim", expression: /\blowest\b/gi },
  { label: "number-one claim", expression: /\bnumber\s+one\b|#1\b/gi },
  { label: "unverified volume claim", expression: /\b(?:join|trusted by)\s+hundreds\b/gi },
  { label: "unverified comparative testimonial", expression: /\bothers\s+(?:are|aren['’]t|cannot|can['’]t)\b/gi },
  { label: "affordability comparison", expression: /\b(?:most\s+)?affordable\b/gi },
  { label: "guarantee", expression: /\bguarantee(?:d|s)?\b/gi },
];

async function sourceFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const file = resolve(directory, entry.name);
    if (entry.isDirectory()) files.push(...await sourceFiles(file));
    else if ([".ts", ".tsx", ".mjs", ".html", ".json"].includes(extname(entry.name))) files.push(file);
  }
  return files;
}

const files = [...await sourceFiles(resolve(ROOT, "src")), resolve(ROOT, "index.html"), resolve(ROOT, "metadata.json")];
const failures = [];
for (const file of files) {
  const contents = await readFile(file, "utf8");
  for (const pattern of patterns) {
    for (const match of contents.matchAll(pattern.expression)) {
      const line = contents.slice(0, match.index).split("\n").length;
      failures.push(`${file.replace(`${ROOT}/`, "")}:${line} ${pattern.label}: ${match[0]}`);
    }
  }
}
assert(failures.length === 0, `Unverifiable or prohibited claims found:\n${failures.join("\n")}`);
console.log(`PASS claims: zero prohibited superlatives, comparatives, guarantees, or unverified volume claims across ${files.length} public source files`);
