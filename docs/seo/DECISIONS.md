# SEO decisions

## 2026-08-10 — Canonical hostname

- Decision: use `https://www.clarksfinancials.com` as the canonical origin.
- Reasoning: the production apex hostname redirects in one hop to `www`, and all successful live fetches resolve there.
- Alternative rejected: canonicalising to the apex would oppose the current production redirect and create mixed hostname signals.

## 2026-08-10 — Audit credential handling

- Decision: record missing GSC, GA4, GBP, and AlgoriNext credentials as external blockers and continue with locally reproducible work.
- Reasoning: none of the corresponding environment variables is present; the autonomy contract expressly says these gaps must not stall implementation.
- Alternative rejected: pausing for access would violate the execution manual.

## 2026-08-10 — Parallel worktree location

- Decision: isolate Track B, C, and D branches under `/tmp/clarks-seo-worktrees`.
- Reasoning: the repository has no existing worktree directory or documented preference; an external temporary directory cannot pollute repository status and satisfies the repository manual's parallel-branch requirement.
- Alternative rejected: creating an unignored project-local worktree directory or pausing for a location preference.

## 2026-08-10 — Static deployment routing

- Decision: serve the generated `dist` directory directly, remove the catch-all SPA rewrite, normalise trailing slashes, and redirect the apex host permanently to the canonical `www` HTTPS origin.
- Reasoning: the old rewrite returned the same shell for every path and would bypass route-specific prerendered HTML. Host-header matching preserves the requested path while consolidating canonical signals.
- Alternative rejected: retaining the catch-all rewrite or relying exclusively on mutable Vercel dashboard state.
