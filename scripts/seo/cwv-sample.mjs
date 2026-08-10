#!/usr/bin/env node
import { chromium } from "playwright";
import { resolve } from "node:path";
import { absoluteUrl, DEFAULT_BASE_URL, readJson, ROOT, ROUTES_FILE, writeJson } from "./lib.mjs";

const runArgIndex = process.argv.indexOf("--runs");
const runs = runArgIndex >= 0 ? Number(process.argv[runArgIndex + 1]) : 3;
const metricArgIndex = process.argv.indexOf("--metric");
const requestedMetric = metricArgIndex >= 0 ? process.argv[metricArgIndex + 1]?.toUpperCase() : null;
const baseUrl = process.env.SEO_BASE_URL || DEFAULT_BASE_URL;
const manifest = await readJson(ROUTES_FILE);
const keyRoutes = manifest.routes.filter((route) => route.keyRoute).map((route) => route.path);

const profiles = {
  mobile: {
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 2.75,
    isMobile: true,
    hasTouch: true,
    userAgent: "Mozilla/5.0 (Linux; Android 12; Moto G Power) AppleWebKit/537.36 Chrome/126 Mobile Safari/537.36",
    network: { offline: false, latency: 150, downloadThroughput: 1_600_000 / 8, uploadThroughput: 750_000 / 8 },
    cpuRate: 4,
  },
  desktop: {
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 1,
    isMobile: false,
    hasTouch: false,
    userAgent: "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 Chrome/126 Safari/537.36",
    network: { offline: false, latency: 40, downloadThroughput: 10_000_000 / 8, uploadThroughput: 5_000_000 / 8 },
    cpuRate: 1,
  },
};

function percentile75(values) {
  const sorted = [...values].sort((a, b) => a - b);
  return sorted[Math.max(0, Math.ceil(sorted.length * 0.75) - 1)];
}

const browser = await chromium.launch({ headless: true, args: ["--no-sandbox"] });
const samples = [];
try {
  for (const [profileName, profile] of Object.entries(profiles)) {
    for (const path of keyRoutes) {
      for (let run = 1; run <= runs; run += 1) {
        const context = await browser.newContext({
          viewport: profile.viewport,
          deviceScaleFactor: profile.deviceScaleFactor,
          isMobile: profile.isMobile,
          hasTouch: profile.hasTouch,
          userAgent: profile.userAgent,
          serviceWorkers: "block",
        });
        const page = await context.newPage();
        const cdp = await context.newCDPSession(page);
        await cdp.send("Network.enable");
        await cdp.send("Network.emulateNetworkConditions", profile.network);
        await cdp.send("Emulation.setCPUThrottlingRate", { rate: profile.cpuRate });
        await page.addInitScript(() => {
          window.__seoVitals = { lcp: 0, cls: 0, inp: 0, interactionObserved: false };
          new PerformanceObserver((list) => {
            const entries = list.getEntries();
            window.__seoVitals.lcp = entries.at(-1)?.startTime ?? window.__seoVitals.lcp;
          }).observe({ type: "largest-contentful-paint", buffered: true });
          new PerformanceObserver((list) => {
            for (const entry of list.getEntries()) {
              if (!entry.hadRecentInput) window.__seoVitals.cls += entry.value;
            }
          }).observe({ type: "layout-shift", buffered: true });
          try {
            new PerformanceObserver((list) => {
              for (const entry of list.getEntries()) {
                if (entry.interactionId) {
                  window.__seoVitals.interactionObserved = true;
                  window.__seoVitals.inp = Math.max(window.__seoVitals.inp, entry.duration);
                }
              }
            }).observe({ type: "event", buffered: true, durationThreshold: 0 });
          } catch {
            // The output explicitly records whether an interaction timing was observed.
          }
        });
        const startedAt = Date.now();
        const response = await page.goto(absoluteUrl(path, baseUrl), { waitUntil: "load", timeout: 60_000 });
        await page.waitForTimeout(2_000);
        const button = page.locator("button:visible").first();
        if (await button.count()) {
          await button.click({ timeout: 5_000 }).catch(() => {});
          await page.waitForTimeout(300);
        }
        const vitals = await page.evaluate(() => window.__seoVitals);
        samples.push({
          path,
          profile: profileName,
          run,
          status: response?.status() ?? null,
          lcpMs: Math.round(vitals.lcp),
          inpMs: Math.round(vitals.inp),
          cls: Number(vitals.cls.toFixed(4)),
          interactionObserved: vitals.interactionObserved,
          wallTimeMs: Date.now() - startedAt,
        });
        await context.close();
      }
    }
  }
} finally {
  await browser.close();
}

const summaries = [];
for (const profile of Object.keys(profiles)) {
  for (const path of keyRoutes) {
    const group = samples.filter((sample) => sample.profile === profile && sample.path === path);
    summaries.push({
      path,
      profile,
      sampleCount: group.length,
      p75: {
        lcpMs: percentile75(group.map((sample) => sample.lcpMs)),
        inpMs: percentile75(group.map((sample) => sample.inpMs)),
        cls: percentile75(group.map((sample) => sample.cls)),
      },
      interactionTimingCoverage: `${group.filter((sample) => sample.interactionObserved).length}/${group.length}`,
    });
  }
}

if (samples.length !== keyRoutes.length * Object.keys(profiles).length * runs) {
  throw new Error(`Expected ${keyRoutes.length * 2 * runs} samples, received ${samples.length}`);
}

const output = {
  generatedAt: new Date().toISOString(),
  source: "measured lab data: Playwright Chromium PerformanceObserver with network and CPU emulation",
  caveat: "INP is a synthetic interaction sample, not CrUX field p75. Zero is only valid when interactionObserved is true.",
  baseUrl,
  runsPerRouteProfile: runs,
  requestedMetric,
  profiles,
  summaries,
  samples,
};
await writeJson(resolve(ROOT, "docs/seo/cwv-baseline.json"), output);
console.log(`PASS A-04: wrote ${samples.length} measured CWV samples (${runs} runs × ${keyRoutes.length} routes × 2 profiles)`);
for (const summary of summaries) {
  console.log(`${summary.profile} ${summary.path}: LCP ${summary.p75.lcpMs}ms, INP ${summary.p75.inpMs}ms, CLS ${summary.p75.cls}`);
}
