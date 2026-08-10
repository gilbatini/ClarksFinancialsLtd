import { spawn } from "node:child_process";
import { createServer } from "node:net";
import { resolve } from "node:path";
import { chromium } from "playwright";
import { ROOT } from "./lib.mjs";

async function freePort() {
  return new Promise((resolvePort, reject) => {
    const server = createServer();
    server.unref();
    server.on("error", reject);
    server.listen(0, "127.0.0.1", () => {
      const address = server.address();
      server.close(() => resolvePort(address.port));
    });
  });
}

async function waitForServer(url, timeoutMs = 30_000) {
  const startedAt = Date.now();
  while (Date.now() - startedAt < timeoutMs) {
    try {
      const response = await fetch(url);
      if (response.ok) return;
    } catch {
      // Vite is still starting.
    }
    await new Promise((resolveWait) => setTimeout(resolveWait, 150));
  }
  throw new Error(`Timed out waiting for ${url}`);
}

export async function withRenderedSite(callback) {
  const externalBaseUrl = process.env.SEO_BASE_URL;
  let child;
  let baseUrl = externalBaseUrl;
  if (!baseUrl) {
    const port = await freePort();
    baseUrl = `http://127.0.0.1:${port}`;
    child = spawn(resolve(ROOT, "node_modules/.bin/vite"), ["--host", "127.0.0.1", "--port", String(port), "--strictPort"], {
      cwd: ROOT,
      stdio: "ignore",
      env: { ...process.env, DISABLE_HMR: "true" },
    });
    await waitForServer(baseUrl);
  }

  const browser = await chromium.launch({ headless: true, args: ["--no-sandbox"] });
  try {
    return await callback({ browser, baseUrl });
  } finally {
    await browser.close();
    if (child) {
      child.kill("SIGTERM");
      await new Promise((resolveExit) => {
        child.once("exit", resolveExit);
        setTimeout(resolveExit, 2_000);
      });
    }
  }
}
