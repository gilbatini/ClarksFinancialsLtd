#!/usr/bin/env node
import { readFile, stat } from "node:fs/promises";
import { resolve } from "node:path";
import { ROOT } from "./lib.mjs";

const css = await readFile(resolve(ROOT, "src/index.css"), "utf8");
const html = await readFile(resolve(ROOT, "index.html"), "utf8");
const fonts = [
  {
    family: "Manrope",
    path: "public/fonts/manrope-latin-variable.woff2",
    href: "/fonts/manrope-latin-variable.woff2",
  },
  {
    family: "Space Grotesk",
    path: "public/fonts/space-grotesk-latin-variable.woff2",
    href: "/fonts/space-grotesk-latin-variable.woff2",
  },
];
const failures = [];

if (/fonts\.(?:googleapis|gstatic)\.com/.test(css + html)) {
  failures.push("Remote Google font dependency remains");
}
if (/font-display:\s*(?:block|auto)/.test(css)) {
  failures.push("A font can hide text during loading");
}
if ((css.match(/font-display:\s*swap/g) || []).length !== fonts.length) {
  failures.push("Every local font face must use font-display: swap");
}

for (const font of fonts) {
  if (!css.includes(`font-family: "${font.family}"`) || !css.includes(`url("${font.href}")`)) {
    failures.push(`${font.family}: local @font-face is missing`);
  }
  const preload = `href="${font.href}" as="font" type="font/woff2" crossorigin`;
  if (!html.includes(preload)) failures.push(`${font.family}: font preload is missing`);

  const bytes = await readFile(resolve(ROOT, font.path));
  const details = await stat(resolve(ROOT, font.path));
  if (bytes.subarray(0, 4).toString("ascii") !== "wOF2") failures.push(`${font.family}: asset is not WOFF2`);
  if (details.size > 50 * 1024) failures.push(`${font.family}: asset exceeds 50 KiB`);
  console.log(`PASS ${font.family}: local WOFF2, ${details.size} bytes, preloaded with swap`);
}

if (failures.length) {
  for (const failure of failures) console.error(`FAIL ${failure}`);
  process.exitCode = 1;
} else {
  console.log("PASS C-06 font audit: local preloads, visible fallback text, and no remote font stylesheet");
}
