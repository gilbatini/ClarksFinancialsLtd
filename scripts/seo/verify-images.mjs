#!/usr/bin/env node
import { readdir, readFile, stat } from "node:fs/promises";
import { extname, join, relative, resolve } from "node:path";
import sharp from "sharp";
import { ROOT } from "./lib.mjs";

const sourceRoot = resolve(ROOT, "src");
const imageRoot = resolve(ROOT, "public/images");
const maxBytes = 200 * 1024;
const expectedAssets = new Map([
  ["clarks-financials-logo.webp", { width: 512, height: 130 }],
  ["hero-team.webp", { width: 512, height: 512 }],
  ["kampala-office.webp", { width: 512, height: 512 }],
  ["salary-loan-texture.webp", { width: 512, height: 512 }],
  ["unsecured-loan-texture.webp", { width: 512, height: 512 }],
]);

async function sourceFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const nested = await Promise.all(
    entries.map((entry) => {
      const path = join(directory, entry.name);
      if (entry.isDirectory()) return sourceFiles(path);
      return [path];
    }),
  );
  return nested.flat().filter((path) => [".tsx", ".ts"].includes(extname(path)));
}

const files = await sourceFiles(sourceRoot);
const failures = [];
let imageElementCount = 0;
let combinedSource = "";

for (const file of files) {
  const source = await readFile(file, "utf8");
  combinedSource += `\n${source}`;
  const elements = source.match(/<img\b[\s\S]*?\/>/g) || [];
  imageElementCount += elements.length;
  for (const element of elements) {
    const location = relative(ROOT, file);
    if (!/\bwidth=\{?["']?\d+/.test(element)) failures.push(`${location}: image lacks numeric width`);
    if (!/\bheight=\{?["']?\d+/.test(element)) failures.push(`${location}: image lacks numeric height`);
    if (!/\bloading=["'](?:eager|lazy)["']/.test(element)) failures.push(`${location}: image lacks loading priority`);
    if (!/\bdecoding=["']async["']/.test(element)) failures.push(`${location}: image lacks async decoding`);
    if (!/\balt=/.test(element)) failures.push(`${location}: image lacks an alt attribute`);
    if (/\bsrc=["']https?:/.test(element)) failures.push(`${location}: image uses a remote source`);
  }
}

if (imageElementCount !== 4) {
  failures.push(`Expected 4 image templates, found ${imageElementCount}`);
}
if (/logo-2-orgnal\.jpg|lh3\.googleusercontent\.com/.test(combinedSource)) {
  failures.push("Source still references a legacy or third-party image");
}

for (const [name, expected] of expectedAssets) {
  const path = resolve(imageRoot, name);
  try {
    const details = await stat(path);
    const metadata = await sharp(path).metadata();
    if (details.size > maxBytes) failures.push(`${name}: ${details.size} bytes exceeds ${maxBytes}`);
    if (metadata.format !== "webp") failures.push(`${name}: expected WebP, got ${metadata.format}`);
    if (metadata.width !== expected.width || metadata.height !== expected.height) {
      failures.push(
        `${name}: expected ${expected.width}x${expected.height}, got ${metadata.width}x${metadata.height}`,
      );
    }
    console.log(`PASS ${name}: ${metadata.width}x${metadata.height}, ${details.size} bytes`);
  } catch (error) {
    failures.push(`${name}: ${error.message}`);
  }
}

if (failures.length) {
  for (const failure of failures) console.error(`FAIL ${failure}`);
  process.exitCode = 1;
} else {
  console.log(
    `PASS C-02: ${expectedAssets.size} local WebP assets are sized, dimensioned, compressed, and loading-prioritized`,
  );
}
