import { createSign } from "node:crypto";

function base64url(value) {
  return Buffer.from(value).toString("base64url");
}

function dateOffset(days) {
  const date = new Date();
  date.setUTCDate(date.getUTCDate() + days);
  return date.toISOString().slice(0, 10);
}

async function accessToken(credentials) {
  const now = Math.floor(Date.now() / 1000);
  const tokenUri = credentials.token_uri || "https://oauth2.googleapis.com/token";
  const unsigned = `${base64url(JSON.stringify({ alg: "RS256", typ: "JWT" }))}.${base64url(JSON.stringify({
    iss: credentials.client_email,
    scope: "https://www.googleapis.com/auth/webmasters.readonly",
    aud: tokenUri,
    iat: now,
    exp: now + 3600,
  }))}`;
  const signer = createSign("RSA-SHA256");
  signer.update(unsigned);
  const assertion = `${unsigned}.${signer.sign(credentials.private_key, "base64url")}`;
  const response = await fetch(tokenUri, {
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer", assertion }),
  });
  if (!response.ok) throw new Error(`GSC token request failed with HTTP ${response.status}`);
  return (await response.json()).access_token;
}

export async function loadRankSource(baseline) {
  if (!process.env.GSC_CREDENTIALS || !process.env.GSC_SITE_URL) return baseline;
  const raw = process.env.GSC_CREDENTIALS.trim();
  const credentials = JSON.parse(raw.startsWith("{") ? raw : Buffer.from(raw, "base64").toString("utf8"));
  const token = await accessToken(credentials);
  const startDate = dateOffset(-7);
  const endDate = dateOffset(-1);
  const endpoint = `https://searchconsole.googleapis.com/webmasters/v3/sites/${encodeURIComponent(process.env.GSC_SITE_URL)}/searchAnalytics/query`;
  const response = await fetch(endpoint, {
    method: "POST",
    headers: { authorization: `Bearer ${token}`, "content-type": "application/json" },
    body: JSON.stringify({ startDate, endDate, dimensions: ["query"], rowLimit: 25000 }),
  });
  if (!response.ok) throw new Error(`GSC Search Analytics request failed with HTTP ${response.status}`);
  const rows = (await response.json()).rows ?? [];
  const byQuery = new Map(rows.map((row) => [row.keys[0].toLowerCase(), row]));
  return {
    ...baseline,
    observedAt: endDate,
    source: `Google Search Console Search Analytics ${startDate}..${endDate}`,
    queries: baseline.queries.map((entry) => {
      const row = byQuery.get(entry.query.toLowerCase());
      return {
        ...entry,
        results: row ? [{ domain: "clarksfinancials.com", observedOrder: Number(row.position.toFixed(2)), clicks: row.clicks, impressions: row.impressions }] : [],
      };
    }),
  };
}
