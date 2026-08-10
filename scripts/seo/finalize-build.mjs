#!/usr/bin/env node
import { cp, mkdir, readdir } from "node:fs/promises";
import { resolve } from "node:path";
import { ROOT } from "./lib.mjs";

const dist = resolve(ROOT, "dist");
const client = resolve(dist, "client");

await mkdir(dist, { recursive: true });
for (const entry of await readdir(client)) {
  await cp(resolve(client, entry), resolve(dist, entry), {
    recursive: true,
    force: true,
  });
}

console.log("Copied prerendered client output to dist/ for static hosting");
