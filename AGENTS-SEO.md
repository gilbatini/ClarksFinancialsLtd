# AGENTS-SEO.md — CODEX GOAL MODE EXECUTION MANUAL

**Repo:** `clarksfinancials.com` — existing live marketing site
**Stack:** Vite + React SPA · TypeScript · deployed on Vercel · DNS at Namecheap
**Agent role:** SEO remediation. This repo only.
**Reports to:** AlgoriNext dashboard at `algorinext.clarksfinancials.com` (one-way event feed)
**Mode:** GOAL. Autonomous. Non-interactive.
**Version:** v1.0 · 11 August 2026

---

## 0 · AUTONOMY CONTRACT — READ BEFORE ANYTHING ELSE

You are running in **goal mode**. You do not prompt the operator for confirmation, preference, or yes/no approval. You decide, you execute, you log.

**Rules:**

1. **Never ask a clarifying question.** If a decision is ambiguous, consult §1 DECISION DEFAULTS. If §1 doesn't cover it, choose the option with the lowest blast radius, execute it, and log the decision to `docs/seo/DECISIONS.md` with the reasoning and the alternative you rejected.
2. **Never wait for approval.** Do not open a PR and stop. Do not end a turn with "shall I proceed." Proceed.
3. **Verify before you assume.** Every claim in this document about the current state of the site is a hypothesis. Stage A exists to test it. Report what you actually find.
4. **Parallelise.** Tracks marked `[PARALLEL]` in §4 have no interdependencies. Fire concurrent agents against them. Tracks marked `[SEQUENTIAL]` gate on their stated predecessor.
5. **Self-verify.** Every task has a machine-checkable acceptance criterion and an exact verification command. Run it. If it fails, fix and re-run. Do not report done on an unverified task.
6. **Only three things stop you** — see §8 HARD STOPS. Everything else, you handle.
7. **Log continuously.** The client is watching the dashboard in real time. Silent work does not exist.

**Definition of a completed task:** the verification command in its row returns the stated expected result, the change is committed, and a `seo.task.completed` event has been emitted with before/after evidence.

---

## 1 · DECISION DEFAULTS — PRE-RESOLVED

These exist so you never have to ask. They are binding unless a Stage A finding makes one impossible, in which case log the deviation and proceed.

| Question you might have | Binding answer |
|---|---|
| Which prerendering approach? | **Vike** (`vike` + `vike-react`) in prerender/SSG mode. Fallback if incompatible with the existing router: `@prerenderer/rollup-plugin`. Do not use `react-snap` or `prerender-spa-plugin` — both unmaintained. |
| Can I migrate to Next.js / Remix / Astro? | **No.** Framework migration is out of scope and commercially out of bounds. Prerender the existing app. |
| Can I change the visual design? | **No.** The site benchmarked 8.28/10, best in its peer set. Zero layout, brand, colour or component-appearance changes. Copy edits are permitted where §4 Track E authorises them. |
| Which meta/head library? | If React 19: **native Document Metadata**. If React 18: `@dr.pogodin/react-helmet`. Either way the tags must land in the *prerendered* HTML, not just at runtime. |
| Prerender all routes or some? | **All public marketing routes.** Any authenticated, transactional or query-parameterised route is excluded. Build the allowlist from the actual router config in Stage A. |
| SSR instead of prerender? | Not now. Prerender first, measure, and only escalate to SSR if a route demonstrably still fails after Track B ships. Log the escalation; don't ask. |
| What if a page has no content to optimise? | Flag it as a content gap in `docs/seo/CONTENT-GAPS.md`, optimise what exists, move on. Do not invent product claims. |
| Interest rates, fees, eligibility, licence numbers, awards, statistics? | **Never author these.** Use only values already present in the repo or supplied by Clarks in writing. If a value is needed and absent, leave a `TODO(clarks-verify)` marker, log a blocker event, and continue with the rest of the task. |
| Superlatives — "Uganda's leading", "fastest approval", "best rates"? | **Prohibited** in copy, meta descriptions, OG tags and structured data. Strip any you find and log each removal. |
| Google Search Console / Analytics / Business Profile access missing? | Do not stall. Build everything that doesn't need it, emit `seo.blocked` with exactly what's needed and from whom, and continue. |
| Commit style? | Conventional commits. One task per commit. `seo(track-x): description`. Never force-push, never rewrite shared history. |
| Branch? | `agent/seo-foundation`. Sub-agents use `agent/seo-foundation-<track>` and merge back. |
| Deploy to production? | **No.** Vercel preview deployments only. Production promotion is a human action. |
| Node version? | 20.x. |
| Can I add dependencies? | Yes, where §4 requires them. Pin exact versions. No dependency with no release in 18 months. |

---

## 2 · THE GOAL

Make Clarks Financials findable to a person in Uganda who opens a search box because they need money — and make every link to the site render a correct preview when shared.

Two facts from prior research shape everything below:

- **Google is effectively the only search engine here** (~97% share in Uganda). Optimise for Googlebot exclusively.
- **The WhatsApp, Facebook and LinkedIn crawlers execute no JavaScript whatsoever.** They read only the initial HTML `<head>`. On a default Vite SPA build, that means shared links currently render blank or generic previews — in a market where WhatsApp is the primary sharing channel. This is likely the single highest-value fix in this repo.

You are not redesigning the site, writing the campaign, or touching loan products. You are making a well-designed, effectively invisible website legible to machines and useful to the humans they send.

---

## 3 · TELEMETRY CONTRACT — NON-NEGOTIABLE

Emit to the AlgoriNext progress bus on every state change. Config via env: `ALGORINEXT_EVENT_URL`, `ALGORINEXT_TENANT`, `ALGORINEXT_TOKEN`.

```
POST $ALGORINEXT_EVENT_URL
{
  "tenant": "clarks",
  "workstream": "seo",
  "event": "seo.task.completed",
  "task_id": "B-03",
  "track": "B",
  "ts": "<ISO8601>",
  "payload": { ... }
}
```

| Event | Emit when | Required payload |
|---|---|---|
| `seo.audit.finding` | Any Stage A finding | severity(`critical\|high\|medium\|low`), category, url, description, recommended_fix, estimated_effort |
| `seo.task.started` | Task begins | task_id, track, estimated_cost |
| `seo.task.completed` | Verification passes | task_id, what_changed, before, after, verification_output |
| `seo.metric.sampled` | Any metric measured | metric, value, unit, source, url |
| `seo.blocked` | External dependency missing | what_is_blocked, what_is_needed, owner, tasks_affected |
| `seo.decision` | You resolved an ambiguity | decision, reasoning, alternative_rejected |

**If the event endpoint is unreachable:** write the event to `docs/seo/events.ndjson`, continue working, retry the backlog every 10 minutes. Never let telemetry failure halt execution.

**Reporting honesty:** never emit a modelled or estimated figure as measured. Label inferred values `"source": "inferred"`. If a keyword hasn't moved, report that it hasn't moved.

---

## 4 · EXECUTION TRACKS

### STAGE A — AUDIT & BASELINE `[SEQUENTIAL — gates everything]`

Change nothing. Produce the evidence base. **This is the only stage that must complete before others begin.**

| ID | Task | Verification command | Expected |
|---|---|---|---|
| A-01 | Enumerate every route from the router config → `docs/seo/routes.json` | `node scripts/seo/verify-routes.mjs` | Every route in config present; count logged |
| A-02 | Fetch each route's raw HTML with JS disabled; record `<head>` contents | `node scripts/seo/raw-head-audit.mjs` | `docs/seo/baseline-head.json` written for all routes |
| A-03 | Full crawl: status codes, redirect chains, depth, orphans | `npx --yes @lhci/cli@latest healthcheck \|\| true; node scripts/seo/crawl.mjs` | `docs/seo/crawl.json` |
| A-04 | Baseline CWV — 3 mobile + 3 desktop samples per key route, recorded separately | `node scripts/seo/cwv-sample.mjs --runs 3` | LCP/INP/CLS per route per profile |
| A-05 | Metadata inventory: title, description, canonical, OG, per route | `node scripts/seo/meta-inventory.mjs` | `docs/seo/meta-baseline.csv` |
| A-06 | Structured data inventory | `node scripts/seo/schema-audit.mjs` | `docs/seo/schema-baseline.json` (expect empty) |
| A-07 | Link-preview baseline: capture what WhatsApp/FB/LinkedIn crawlers see (UA-spoofed fetch, no JS) | `node scripts/seo/preview-audit.mjs` | Per-route preview payload recorded |
| A-08 | GSC / GA4 / GBP existence + access status | manual check via env credentials | Status recorded; emit `seo.blocked` per missing item |
| A-09 | Competitor SERP map for the money terms | `node scripts/seo/serp-map.mjs` | `docs/seo/competitors.json` |
| A-10 | **Baseline report** → `docs/seo/BASELINE.md` + dashboard | `test -f docs/seo/BASELINE.md` | Exists, every finding severity-tagged |

**Gate:** Stage A complete and `BASELINE.md` emitted. Then fire B, C, D, E, F concurrently.

---

### TRACK B — CRAWLABILITY `[PARALLEL]` ← highest value

| ID | Task | Verification | Expected |
|---|---|---|---|
| B-01 | Install and configure Vike prerendering against the A-01 allowlist | `npm run build` | Build succeeds; one HTML file per public route in `dist/` |
| B-02 | Per-route `<title>` + meta description, unique, written for click-through | `node scripts/seo/verify-meta.mjs` | Zero duplicates, zero empties, all within length budgets |
| B-03 | Per-route canonical tags | `node scripts/seo/verify-canonical.mjs` | One self-referential canonical per route |
| B-04 | **Open Graph + Twitter Card tags in prerendered HTML** | `node scripts/seo/verify-og.mjs` | `og:title`, `og:description`, `og:image`, `og:url`, `og:type`, `twitter:card` present on every route |
| B-05 | OG images: 1200×630, <300KB, absolute HTTPS URLs | `node scripts/seo/verify-og-images.mjs` | All conform |
| B-06 | **WhatsApp preview test** — UA-spoofed fetch, JS disabled | `node scripts/seo/preview-audit.mjs --assert` | Every route returns populated title + description + image |
| B-07 | XML sitemap generated at build from the same route list | `test -f dist/sitemap.xml && node scripts/seo/verify-sitemap.mjs` | Valid XML, matches allowlist exactly |
| B-08 | `robots.txt` reviewed, sitemap referenced, no accidental disallows | `node scripts/seo/verify-robots.mjs` | Passes |
| B-09 | Single canonical hostname; HTTPS and redirect consistency | `node scripts/seo/verify-redirects.mjs` | One hop max, no chains, no mixed hostnames |

**Track B definition of done:** `curl -s <route> | grep -c '<title>'` returns ≥1 with a *populated, route-specific* title for every route in the allowlist, with JavaScript never executed.

---

### TRACK C — CORE WEB VITALS `[PARALLEL]`

Budgets: **LCP ≤ 2.5s · INP ≤ 200ms · CLS ≤ 0.1**, at p75, mobile-first, throttled mid-range Android profile. INP is the hardest — prioritise it.

| ID | Task | Verification | Expected |
|---|---|---|---|
| C-01 | Route-level code splitting | `npm run build && node scripts/seo/bundle-report.mjs` | Initial JS per route below budget |
| C-02 | Image optimisation: modern formats, correct sizing, explicit dimensions | `node scripts/seo/verify-images.mjs` | All images sized, dimensioned, compressed |
| C-03 | Descriptive alt text on every content image | `node scripts/seo/verify-alt.mjs` | Zero missing on non-decorative images |
| C-04 | Reserve layout space for dynamic content | `node scripts/seo/cwv-sample.mjs --metric CLS` | CLS ≤ 0.1 |
| C-05 | Defer/async non-critical scripts; audit third-party tags | `node scripts/seo/cwv-sample.mjs --metric INP` | INP ≤ 200ms |
| C-06 | Font loading strategy — no invisible-text flash, no shift | `node scripts/seo/cwv-sample.mjs` | No font-driven CLS |
| C-07 | Lazy-load below-fold content | `npm run build && node scripts/seo/cwv-sample.mjs` | LCP ≤ 2.5s |
| C-08 | Add CI gate enforcing all three budgets | `npm run seo:cwv-gate` | Exit 0 |

---

### TRACK D — STRUCTURED DATA `[PARALLEL]`

| ID | Task | Verification | Expected |
|---|---|---|---|
| D-01 | `Organization` schema — legal name, logo, contact, social profiles | `node scripts/seo/verify-schema.mjs --type Organization` | Valid, zero errors |
| D-02 | `LocalBusiness` / `FinancialService` — address, hours, service area | `node scripts/seo/verify-schema.mjs --type FinancialService` | Valid |
| D-03 | `FAQPage` on borrowing questions | `node scripts/seo/verify-schema.mjs --type FAQPage` | Valid |
| D-04 | `BreadcrumbList` | `node scripts/seo/verify-schema.mjs --type BreadcrumbList` | Valid |
| D-05 | `Service` schema per loan product | `node scripts/seo/verify-schema.mjs --type Service` | Valid |
| D-06 | Full validation sweep | `npm run seo:schema-validate` | Zero errors across all types |

**Compliance gate on this track:** any schema field asserting licensing, regulatory status, rating, award or interest rate must trace to a value already in the repo or supplied in writing by Clarks. Absent that, emit the field as `TODO(clarks-verify)`, log a blocker, ship the rest. **Do not publish an unverifiable claim in structured data.**

---

### TRACK E — ON-PAGE & CONTENT `[PARALLEL]`

| ID | Task | Verification | Expected |
|---|---|---|---|
| E-01 | Heading hierarchy — one H1 per page, logical descent | `node scripts/seo/verify-headings.mjs` | Passes on every route |
| E-02 | Rewrite page copy against mapped intent, brand voice preserved | `npm run seo:claims-check` | Zero flagged claims |
| E-03 | Internal linking toward money pages | `node scripts/seo/verify-internal-links.mjs` | Every money page reachable ≤2 clicks from home |
| E-04 | Fix broken links, redirect chains, orphan pages | `node scripts/seo/crawl.mjs --assert` | Zero broken, zero orphans |
| E-05 | Every page ends in a clear next action | `node scripts/seo/verify-cta.mjs` | CTA present per route |
| E-06 | Content gaps → `docs/seo/CONTENT-GAPS.md` | `test -f docs/seo/CONTENT-GAPS.md` | Exists, prioritised |
| E-07 | Educational content architecture (structure only, not volume) | `test -f docs/seo/CONTENT-ARCHITECTURE.md` | Exists |

**Note on E-07:** every lender in Kampala advertises loans; almost none teaches borrowing. That's the uncontested position. Build the architecture here; volume gets produced downstream.

---

### TRACK F — LOCAL & MEASUREMENT `[PARALLEL, partially blocked]`

| ID | Task | Verification | Expected |
|---|---|---|---|
| F-01 | NAP consistency across every page | `node scripts/seo/verify-nap.mjs` | Identical everywhere |
| F-02 | GBP audit + completion plan → `docs/seo/GBP-PLAN.md` | `test -f docs/seo/GBP-PLAN.md` | Exists |
| F-03 | Ugandan directory listing target list | `test -f docs/seo/DIRECTORIES.md` | Exists |
| F-04 | Rank tracking harness on the priority keyword set | `npm run seo:rank-sample` | Writes `seo.metric.sampled` events |
| F-05 | Weekly automated sampling job | `npm run seo:schedule-check` | Job registered |
| F-06 | Review generation process doc for Clarks staff | `test -f docs/seo/REVIEWS.md` | Exists |

**Blocked sub-items:** GBP claim/verify needs client credentials (emit `seo.blocked`, build the plan anyway). Authentic premises/team photography for GBP depends on the L3 Presence workstream — note the dependency, don't wait on it.

---

## 5 · GLOBAL VERIFICATION

Every one of these must pass before the workstream reports complete.

```bash
npm ci
npm run typecheck          # zero errors
npm run lint               # zero errors
npm run build              # succeeds; prerendered HTML per public route
npm run seo:verify-all     # aggregate gate — must exit 0
npm run seo:claims-check   # zero unverifiable claims
npm run seo:cwv-gate       # LCP/INP/CLS budgets pass
```

If `seo:verify-all` does not exist, **build it** as the first Track B task. It aggregates every per-task verifier and exits non-zero on any failure. That script is the definition of done for this repo.

---

## 6 · DEFINITION OF DONE — L2 SEO FOUNDATION

- [ ] Every public route serves crawlable HTML, verified with JS disabled
- [ ] Unique title, description, canonical on every route
- [ ] OG/Twitter tags present in prerendered HTML on every route
- [ ] WhatsApp, Facebook and LinkedIn previews render correctly — UA-spoofed fetch proves it
- [ ] Sitemap generated, valid, matching the allowlist; robots.txt correct
- [ ] Structured data live, validating, zero errors, zero unverifiable claims
- [ ] LCP ≤2.5s, INP ≤200ms, CLS ≤0.1 on mobile profile
- [ ] Zero broken links, redirect chains, orphan pages
- [ ] Priority keyword set tracked and reporting to the dashboard
- [ ] `BASELINE.md`, `CONTENT-GAPS.md`, `CONTENT-ARCHITECTURE.md`, `GBP-PLAN.md`, `DECISIONS.md` all written
- [ ] `npm run seo:verify-all` exits 0
- [ ] All work on `agent/seo-foundation`, preview-deployed, never promoted to production by an agent

---

## 7 · HARD CONSTRAINTS

- No framework migration.
- No visual design, layout, brand or component-appearance changes.
- No authored financial claims — rates, fees, eligibility, licence status, awards, statistics.
- No superlatives or unsourced comparatives anywhere, including meta and schema.
- No production deploys. Preview only.
- No force-push, no history rewriting, no deleting others' branches.
- No secrets in the repo. Read from env. Never log token values.
- No dependency unmaintained for 18+ months.
- Mobile-first budgets — mid-range Android on a congested network, not a laptop on fibre.
- Every change reversible, with before/after evidence recorded.

---

## 8 · HARD STOPS — THE ONLY THREE

Stop and emit `seo.blocked`, then **continue with everything else in parallel**. Do not idle.

1. **Repo access fails or the build cannot be made to pass** after three distinct remediation attempts.
2. **A required change would alter a financial claim, licensing statement or regulatory assertion** and no verified source exists. Mark `TODO(clarks-verify)`, skip that field, proceed.
3. **A change would require production deployment** to verify. Preview-deploy instead and record the limitation.

Everything else — missing credentials, absent content, library incompatibility, ambiguous requirements — you resolve yourself under §1 and log under `seo.decision`.

---

*Echo Algori Data · AlgoriNext L2 · Goal-mode manual for `clarksfinancials.com` · Companion: ALGORINEXT-PLAN.md v0.2*
