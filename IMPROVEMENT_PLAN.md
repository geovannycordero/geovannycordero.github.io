# Codebase Improvement Plan

Analysis date: 2026-05-08 | Last updated: 2026-05-08

## Summary

The codebase is well-structured for a portfolio site — Next.js 15 App Router with static export, sensible Tailwind conventions, a working CI pipeline, and Dependabot configured. The main issues were concentrated in dependency management, inconsistent Node version targeting, security hygiene on external links, and dead configuration that created maintenance burden.

**Deployment note:** The repo deploys to **GitHub Pages** via GitHub Actions (`deploy.yml`). Security headers that were in `vercel.json` (`X-Frame-Options`, etc.) were inert on GitHub Pages — GitHub Pages cannot serve custom HTTP headers.

---

## Completed

| Area | What was done |
|------|---------------|
| Dependencies | Removed `"fs": "latest"` and `"path": "latest"` from `package.json` (Node built-ins, not npm packages) |
| Dependencies | Removed duplicate `sonner` entry (`^1.7.1`); kept `^2.0.7`. Removed duplicate `tailwind-merge` entry. |
| Node version | Updated `.node-version` from `v22.17.0` → `24` |
| Node version | Updated CI (`ci.yml`) matrix from `22.x` → `24.x` |
| Node version | Updated deploy workflow (`deploy.yml`) from `'22'` → `'24'` |
| Security | Added `rel='noopener noreferrer'` to all `target='_blank'` links across `hero.tsx`, `footer.tsx`, `rss-link.tsx`, `contact.tsx`, `app/blog/page.tsx`, `app/blog/[slug]/page.tsx` (6 files, 9 links total — 2 of these were in `app/` and not caught in the initial plan) |
| Stale artifacts | Deleted `vercel.json` (project is on GitHub Pages, not Vercel) |
| Stale artifacts | Deleted `Dockerfile` (referenced Node 16 and `.next/standalone`, incompatible with `output: 'export'`) |
| CI efficiency | Removed redundant standalone `build` job from `ci.yml`; artifact upload moved into the `test` job |
| CI correctness | Fixed artifact path from `.next/` → `./docs` (the actual static export output) |

---

## Remaining Next Steps

| Priority | Area | Issue | Suggested Action | Effort |
|----------|------|-------|------------------|--------|
| **Medium** | Maintainability | `lib/seo.ts` exports `seoConfig` and structured data helpers (`generatePersonStructuredData`, `generateArticleStructuredData`, etc.) but none of them are used anywhere. Metadata in `app/layout.tsx` and `app/page.tsx` is copy-pasted and will diverge. | Replace duplicated metadata blocks with references to `seoConfig`. Remove the duplicate `export const metadata` in `app/page.tsx` (layout metadata applies to all child pages by default in Next.js App Router). | Small |
| **Low** | Maintainability | `readTime` is a manually specified front-matter field on every blog post, prone to drift from actual content length. | Auto-compute in `lib/blog.ts` using word count (the `wordCount` calc already exists in `lib/seo.ts`'s `generateArticleStructuredData`). Fall back to front-matter value if present. | Small |
| **Low** | Cleanup | `_site/` directory is present locally — it appears to be the old Jekyll predecessor site. It is already gitignored so it has no repo impact, but it takes up local disk space. | Delete locally: `rm -rf _site/` | Trivial |

---

## GitHub Pages–Specific Notes

- **Security headers are inert**: GitHub Pages cannot serve custom HTTP headers. If `X-Frame-Options`, CSP, or HSTS are needed, route traffic through **Cloudflare Pages** (free) as a CDN layer — it supports custom response headers and HSTS preloading.
- **No server-side logic**: `output: 'export'` is correct. Any future feature needing server logic (contact form submission, API routes) requires an external service (Formspree, a Cloudflare Worker, etc.).
- **`docs/` ownership**: Already gitignored — the deploy pipeline generates it in CI and uploads it as a GitHub Pages artifact. Do not commit it locally.
