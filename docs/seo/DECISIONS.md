# SEO decisions

## 2026-08-10 — Canonical hostname

- Decision: use `https://www.clarksfinancials.com` as the canonical origin.
- Reasoning: the production apex hostname redirects in one hop to `www`, and all successful live fetches resolve there.
- Alternative rejected: canonicalising to the apex would oppose the current production redirect and create mixed hostname signals.

## 2026-08-10 — Audit credential handling

- Decision: record missing GSC, GA4, GBP, and AlgoriNext credentials as external blockers and continue with locally reproducible work.
- Reasoning: none of the corresponding environment variables is present; the autonomy contract expressly says these gaps must not stall implementation.
- Alternative rejected: pausing for access would violate the execution manual.
