#!/usr/bin/env node
import { chromium } from "@playwright/test";
import { mkdir, readFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { ROOT } from "./lib.mjs";

const output = resolve(ROOT, "public/og/clarks-financials-og.png");
const logoFile = resolve(ROOT, "public/fav.png");
const logoData = await readFile(logoFile);
const logoUrl = `data:image/png;base64,${logoData.toString("base64")}`;

await mkdir(dirname(output), { recursive: true });
const browser = await chromium.launch({ headless: true, args: ["--no-sandbox"] });
try {
  const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
  await page.setContent(`
    <!doctype html>
    <html lang="en">
      <head>
        <style>
          * { box-sizing: border-box; }
          html, body { width: 1200px; height: 630px; margin: 0; overflow: hidden; }
          body { background: #07172d; color: #ffffff; font-family: Arial, Helvetica, sans-serif; position: relative; }
          .accent { position: absolute; inset: 0 0 auto; height: 14px; background: #2db457; }
          .content { height: 100%; padding: 76px 88px; display: flex; flex-direction: column; justify-content: center; }
          img { width: 120px; height: 120px; object-fit: contain; margin-bottom: 34px; }
          .eyebrow { color: #78d596; font-size: 25px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; }
          h1 { max-width: 940px; margin: 14px 0 20px; font-size: 72px; line-height: 1.04; letter-spacing: -0.035em; }
          p { margin: 0; color: #d8e4f2; font-size: 34px; line-height: 1.25; }
          .url { position: absolute; right: 88px; bottom: 60px; color: #a7bad0; font-size: 22px; }
        </style>
      </head>
      <body>
        <div class="accent"></div>
        <main class="content">
          <img src="${logoUrl}" alt="" />
          <div class="eyebrow">Clarks Financials</div>
          <h1>Loan information and support in Uganda</h1>
          <p>Explore options, application guidance and ways to contact the team.</p>
          <div class="url">clarksfinancials.com</div>
        </main>
      </body>
    </html>
  `);
  await page.screenshot({ path: output, type: "png" });
} finally {
  await browser.close();
}
console.log(`Generated ${output}`);
