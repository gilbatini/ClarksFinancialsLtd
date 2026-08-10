#!/usr/bin/env node
import { readdir, readFile } from "node:fs/promises";
import { extname, join, relative, resolve } from "node:path";
import { ROOT } from "./lib.mjs";

async function sourceFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const nested = await Promise.all(
    entries.map((entry) => {
      const path = join(directory, entry.name);
      return entry.isDirectory() ? sourceFiles(path) : [path];
    }),
  );
  return nested.flat().filter((path) => extname(path) === ".tsx");
}

const genericAlt = /^(?:image|photo|picture|graphic|finance texture|hq office|professional financial focus)$/i;
const failures = [];
let contentImages = 0;
let decorativeImages = 0;

for (const file of await sourceFiles(resolve(ROOT, "src"))) {
  const source = await readFile(file, "utf8");
  const elements = source.match(/<img\b[\s\S]*?\/>/g) || [];
  for (const element of elements) {
    const location = relative(ROOT, file);
    const alt = element.match(/\balt=["']([^"']*)["']/);
    if (!alt) {
      failures.push(`${location}: image is missing alt text`);
      continue;
    }

    const value = alt[1].trim();
    if (!value) {
      decorativeImages += 1;
      if (!/\baria-hidden=["']true["']/.test(element)) {
        failures.push(`${location}: empty alt requires aria-hidden="true"`);
      }
      continue;
    }

    contentImages += 1;
    if (value.length < 10) failures.push(`${location}: alt text is too short: "${value}"`);
    if (genericAlt.test(value)) failures.push(`${location}: alt text is generic: "${value}"`);
  }
}

if (!contentImages) failures.push("No content images were verified");
if (failures.length) {
  for (const failure of failures) console.error(`FAIL ${failure}`);
  process.exitCode = 1;
} else {
  console.log(
    `PASS C-03: ${contentImages} content image templates have descriptive alt text; ${decorativeImages} decorative template is correctly hidden`,
  );
}
