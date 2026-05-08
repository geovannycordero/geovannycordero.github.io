# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Node Version

Use Node 24 via nvm:
```bash
nvm use 24
```

## Commands

```bash
yarn dev              # Start development server (localhost:3000)
yarn build            # Production build → outputs to docs/ directory
yarn lint             # Run ESLint
yarn lint:fix         # Auto-fix ESLint errors
yarn format           # Format all files with Prettier
yarn format:check     # Check formatting without writing
yarn type-check       # TypeScript check without emitting
yarn test             # Run Jest
yarn test:watch       # Jest in watch mode
yarn test:coverage    # Jest with coverage report (70% threshold enforced)
yarn test:ci          # Non-interactive Jest for CI
```

Run a single test file:
```bash
yarn test __tests__/components/Hero.test.tsx
```

## Architecture

This is a **Next.js 15 App Router** portfolio site with **static export** (`output: 'export'`). The build writes to `docs/` (not `out/`), which GitHub Pages serves from the `main` branch.

### Routes

- `/` — Single-page portfolio (Hero → About → Skills → Experience → Education → Awards → Contact → Footer)
- `/blog` — Blog listing, reads from `content/blog/*.md`
- `/blog/[slug]` — Individual blog post
- `/projects` — Projects page, reads from `app/projects/data/projects.json`
- `/rss.xml`, `/sitemap`, `/robots.ts` — Generated SEO files

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

All blog reading logic is in `lib/blog.ts`. Projects are typed in `lib/projects.ts` and sourced from `app/projects/data/projects.json`.

### Components

- `components/ui/` — Radix UI + shadcn/ui primitives (accordion, dialog, dropdown, etc.)
- `components/*.tsx` — Page section components (hero, about, skills, experience, etc.)
- `components/theme-provider.tsx` + `components/theme-toggle.tsx` — next-themes dark/light mode

### Styling

Tailwind CSS with a custom **emerald/sage color palette** defined in `tailwind.config.js`. Use `cn()` from `lib/utils.ts` (wraps `clsx` + `tailwind-merge`) for conditional class merging.

### Path Alias

`@/` resolves to the project root. Use it for all internal imports.

## Static Export Constraints

- Dynamic routes require `export const dynamic = 'force-static'`
- Do not use `next/image` optimization features — `unoptimized: true` is set; use `<Image>` component anyway to satisfy the `@next/next/no-img-element` ESLint rule
- `searchParams` cannot be used in page components without making the route dynamic

## Testing

Tests mirror source structure under `__tests__/`. Coverage is collected from `components/`, `lib/`, and `app/` with a 70% threshold on branches, functions, lines, and statements.

## Linting Notes

- `@typescript-eslint/no-explicit-any` is a **warning** — avoid it but it won't block builds
- `no-console` is a **warning** — `console.warn` and `console.error` are allowed
- Prettier is enforced via ESLint (`prettier/prettier: 'error'`), so `yarn lint` and `yarn format:check` can both catch formatting issues

## Deployment

Pushing to `main` triggers GitHub Actions CI which runs tests and deploys the static build to GitHub Pages. The `docs/` directory is the published artifact — do not manually edit it.
