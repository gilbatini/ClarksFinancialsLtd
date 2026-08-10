# SEO baseline

Generated from the unmodified production site and baseline build on 10 August 2026. Measurements and research snapshots are labelled by source; no estimated figure is presented as measured.

## Executive finding register

| Severity | Category | Evidence | Required response |
|---|---|---|---|
| **CRITICAL** | Crawlability | All public URLs return an empty SPA root in raw HTML; meaningful content requires JavaScript. | Prerender every public route. |
| **CRITICAL** | Metadata | Seven routes share one generic title; descriptions, canonicals, Open Graph, and Twitter tags are absent. | Emit unique route metadata in prerendered HTML. |
| **CRITICAL** | Social previews | 42 required title/description/image fields are missing across the WhatsApp, Facebook, and LinkedIn samples. | Add complete route-specific OG data and compliant images. |
| **HIGH** | Internal discovery | 6 non-home routes are orphaned in the raw-HTML crawl because the SPA shell exposes no anchors. | Prerender global navigation and internal links. |
| **HIGH** | Structured data | 0 JSON-LD blocks exist across 7 routes. | Add fact-traceable Organization, FinancialService, FAQPage, BreadcrumbList, and Service data. |
| **HIGH** | Search visibility | Clarks was not observed in the 4-query competitor sample. | Target salary-loan and Kampala borrowing intent, then measure in GSC when access exists. |
| **MEDIUM** | JavaScript payload | The baseline build emits a single 462.26 kB JavaScript bundle (141.52 kB gzip). | Split page routes and defer non-critical interaction code. |
| **MEDIUM** | Image delivery | Content imagery is hosted on third-party Google URLs and several images lack explicit intrinsic dimensions. | Self-host, resize, convert, dimension, and lazy-load non-LCP imagery. |
| **MEDIUM** | Claims compliance | Existing copy includes prohibited superlatives/comparatives such as “leading” and “best”. | Remove prohibited language without inventing replacement claims. |
| **LOW** | Lab CWV | All key-route p75 lab samples currently fall inside the stated budgets; field data remains unavailable. | Preserve budgets through implementation and add a repeatable gate. |

## Public-route allowlist

Router source: `src/App.tsx`. Canonical origin: https://www.clarksfinancials.com.

| Route | Key route |
|---|---|
| `/` | yes |
| `/about` | no |
| `/loans` | yes |
| `/apply` | yes |
| `/regulatory` | no |
| `/faqs` | no |
| `/contact` | no |

## Raw HTML and crawl baseline

- Raw head captures: 7/7 routes.
- Rendered root content in raw HTML: 0/7 routes.
- HTTP failures: 0.
- Multi-hop redirect chains on canonical route URLs: 0.
- Raw-HTML orphan routes: 6 (`/about`, `/loans`, `/apply`, `/regulatory`, `/faqs`, `/contact`).

## Metadata and structured-data baseline

- Unique titles: 1 across 7 routes.
- Meta descriptions: 0.
- Canonical links: 0.
- Complete Open Graph/Twitter sets: 0.
- JSON-LD blocks: 0.

## Link-preview baseline

Three no-JavaScript crawler identities were sampled on every route: WhatsApp, Facebook, and LinkedIn. The 21 payloads have 42 missing required fields. Each crawler sees the generic document title, but no preview description or image.

## Core Web Vitals baseline

Source: measured lab data: Playwright Chromium PerformanceObserver with network and CPU emulation. Three samples were captured per key route per profile. INP is a synthetic lab interaction measurement, not CrUX field p75.

| Profile | Route | p75 LCP | p75 synthetic INP | p75 CLS | Interaction samples |
|---|---|---:|---:|---:|---:|
| mobile | `/` | 2040 ms | 80 ms | 0 | 3/3 |
| mobile | `/loans` | 1712 ms | 112 ms | 0.0046 | 3/3 |
| mobile | `/apply` | 2292 ms | 104 ms | 0 | 3/3 |
| desktop | `/` | 700 ms | 80 ms | 0.0276 | 3/3 |
| desktop | `/loans` | 504 ms | 64 ms | 0.011 | 3/3 |
| desktop | `/apply` | 520 ms | 80 ms | 0.0074 | 3/3 |

## External access status

| System | Status | Evidence / requirement |
|---|---|---|
| googleSearchConsole | blocked | Property existence cannot be confirmed without owner-granted access. No google-site-verification tag is present in raw production HTML. |
| googleAnalytics4 | blocked | No GA4 measurement ID or Google tag is present in repository source or raw production HTML. |
| googleBusinessProfile | blocked | Claim and verification status requires access from the Clarks profile owner. |
| algoriNext | blocked | docs/seo/events.ndjson |

Work requiring these accounts is blocked; implementation that does not require them continues. AlgoriNext events are queued in `docs/seo/events.ndjson`.

## Competitor search snapshot

Four money-term queries yielded 17 observed domains. Clarks was not present in the returned sample. This is a current research snapshot, not a Google rank or impression measurement; Search Console access is required for the latter.

Priority intent:

- salary loans Uganda
- quick loans Kampala Uganda
- personal loans Uganda
- money lenders Kampala Uganda

## Stage A gate

Tasks A-01 through A-10 have machine-readable evidence in `docs/seo/`. The implementation tracks may begin. The highest-value work is route prerendering plus route-specific social metadata, followed by structured data, internal discovery, image delivery, claims hygiene, and measurement automation.
