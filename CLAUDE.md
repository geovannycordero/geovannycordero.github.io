# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Node Version

Use Node 24 via nvm:

```bash
nvm use 24
```

## Commands

```bash
yarn build             # Generate the static site → docs/
yarn preview            # Serve docs/ locally at http://localhost:3000
yarn lint               # Run ESLint
yarn lint:fix           # Auto-fix ESLint errors
yarn format              # Format all files with Prettier
yarn format:check       # Check formatting without writing
yarn test               # Run Jest
yarn test:watch         # Jest in watch mode
yarn test:coverage      # Jest with coverage report (70% threshold enforced)
yarn test:ci             # Non-interactive Jest for CI
```

Run a single test file:

```bash
yarn jest __tests__/build/partials/nav.test.js
```

## Architecture

This is a **plain HTML/CSS/JS static site** — no framework, no bundler, no client-side hydration. A Node build script reads content and data, renders HTML strings, and writes files to `docs/`, which GitHub Pages serves from the `main` branch.

There is no framework here by design, not by omission. The site is five route shapes with five small client-side behaviors (theme toggle, mobile nav, scroll-triggered nav backdrop, smooth-scroll-to-hash, back-to-top) — a build-vs-buy audit found React/Next added ~190KB of shipped JS and a client router for that surface, with none of Next's server features usable on a static host. See `ideas/` for the audit and the TDD migration plan that carried it out.

### The build pipeline (`build/`)

`build/index.js` is the orchestrator: it clears `docs/` (so a renamed/deleted slug can't leave a stale page behind), renders every page (including a static `404.html`), writes RSS/sitemap/robots/health files, generates OG images, and copies `public/` + `assets/js/main.js` into `docs/`. Run it via `yarn build` (which also compiles Tailwind separately, see below).

- `build/render.js` — `html` tagged template + `escapeHtml`, the templating primitives every render function uses.
- `build/write.js` — `writePage`/`writeFile`, write to `docs/` (or `$BUILD_OUT_DIR` for a scratch build).
- `build/layout.js` — the shared document shell: `<head>` metadata, site-wide `Person` JSON-LD, the pre-paint theme script, skip link + nav chrome. Every page calls `renderPage({...})`.
- `build/partials/*.js` — one render function per UI fragment (nav, footer, hero, about, skills, experience, credentials, contact, project-card, blog-post-card, ...), each mirroring what used to be a React component.
- `build/pages/*.js` — one render function per route (`home`, `blog-index`, `blog-post`, `projects`), assembling partials + page-specific metadata/JSON-LD into a full HTML document via `renderPage()`.
- `build/content/*.js` — data/content loaders: `blog.js` (Markdown via gray-matter + remark), `projects.js`/`experience.js`/`skills.js` (JSON in `build/data/`), `rss.js`/`sitemap.js`/`robots.js`/`health.js` (generated file bodies).
- `build/icons.js` — the site's full icon set (lucide-derived + two hand-authored brand marks), inlined as SVG strings — no icon library ships to the browser.
- `build/og-image.js` — OG image generation via `satori` + `@resvg/resvg-js`, using a hand-rolled `h()` pragma (satori's input is a plain `{type, props}` tree, not React-specific).

**ESM-only build dependencies** (`remark`/`remark-gfm`/`remark-html`, `satori`) are loaded via dynamic `import()` inside otherwise-CommonJS modules — Jest can't execute those code paths (its module loader doesn't handle ESM here), so `build/content/blog.js` and `build/og-image.js` each carry a runnable self-check at the bottom (`node build/content/blog.js`, `node build/og-image.js`) instead of a Jest test for that one function. `yarn build` exercises both for real on every run.

### Client JS (`assets/js/main.js`)

One hand-written vanilla file, no bundler, loaded via `<script defer>`. Covers the entire interactive surface: theme toggle, mobile nav (open/close, body-scroll lock, scroll-triggered backdrop), smooth-scroll-to-hash on load, back-to-top. Exports `{ init, applyTheme, resolvedTheme, applyNavState }` under CommonJS (for Jest) and self-invokes `init()` in the browser (no `module` global there) — see the guard at the bottom of the file.

Icon and theme-state swaps (sun/moon, menu/X, nav open/scrolled classes) are done via CSS selectors keyed off a `data-*` attribute or the `.dark` class wherever possible, rather than JS manipulating markup — see `assets/css/globals.css`'s `[data-theme-icon]`/`[data-nav-icon]` rules.

### Content

**Blog posts** live in `content/blog/` as Markdown files with gray-matter front matter:

```markdown
---
title: 'Post Title'
date: '2024-04-01'
excerpt: 'Short description'
readTime: '5 min read'
tags: ['Tag1', 'Tag2']
author: 'Geovanny Cordero Valverde'
---
```

`build/content/blog.js` handles all blog reading/rendering. Projects/experience/skills data lives in `build/data/*.json`, read by `build/content/projects.js`/`experience.js`/`skills.js`.

### Styling

Tailwind CSS, unchanged palette/tokens (`tailwind.config.js`, `assets/css/globals.css`). `content` globs point at `build/**/*.js` and `assets/js/**/*.js`. The CSS itself is compiled via `postcss-cli` (`@tailwindcss/postcss`, same `postcss.config.mjs` Next used to drive internally) as a separate step inside `yarn build`, not bundled into the Node script.

### Path convention

No `@/` alias — everything is plain relative `require()`, matching a small Node script rather than a bundler-resolved app.

## Testing

Tests live under `__tests__/`, mirroring `build/`'s structure. Since there's no React tree to render, tests mount HTML strings into jsdom (`document.body.innerHTML = renderX()`) and query with `@testing-library/dom`, or parse a full document with `new DOMParser()` for page-level tests. `__tests__/a11y/*.test.js` run `jest-axe` against real rendered pages (not just a static shell — there's no async/Suspense boundary blocking it here, unlike the old React version). Coverage is collected from `build/` and `assets/js/`, excluding the two CLI entry points (`build/index.js`, `build/serve.js`) and the ESM-blocked async functions noted above; 70% threshold on branches/functions/lines/statements.

## Linting Notes

- `no-console` is a **warning** — `console.warn` and `console.error` are allowed; `build/`'s own CLI output (`console.log`) triggers harmless warnings, not errors.
- Prettier is enforced via ESLint (`prettier/prettier: 'error'`), so `yarn lint` and `yarn format:check` can both catch formatting issues.

## Deployment

Pushing to `main` triggers GitHub Actions CI (`.github/workflows/ci.yml`), which lints, tests, builds, and runs Lighthouse CI against `docs/`. `.github/workflows/deploy.yml` runs `yarn build` and deploys `docs/` via GitHub's Pages deployment action — `docs/` is gitignored, never committed; it only exists as a local/CI build artifact.
