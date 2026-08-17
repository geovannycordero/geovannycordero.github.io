# Geovanny Cordero Portfolio Website

[![CI](https://github.com/geovannycordero/geovannycordero.github.io/actions/workflows/ci.yml/badge.svg)](https://github.com/geovannycordero/geovannycordero.github.io/actions/workflows/ci.yml)
[![Deploy to GitHub Pages](https://github.com/geovannycordero/geovannycordero.github.io/actions/workflows/deploy.yml/badge.svg)](https://github.com/geovannycordero/geovannycordero.github.io/actions/workflows/deploy.yml)

A portfolio and blog for Geovanny Cordero Valverde, built as a plain HTML/CSS/JS static site — no framework, no bundler, no client-side hydration — and deployed to GitHub Pages.

## Why no framework

A build-vs-buy audit found the previous Next.js/React version shipped ~190KB of JS and a client router to power five small interactive behaviors (theme toggle, mobile nav, scroll-triggered nav backdrop, smooth-scroll-to-hash, back-to-top) on a site with zero `fetch()` calls — everything is knowable at build time from Markdown or JSON. See `ideas/redesign-tdd-plan.md` for the audit and migration plan.

## Tech stack

- **Build**: a small Node script (`build/`) that renders HTML strings and writes static files to `docs/` — no templating engine, no bundler
- **Styling**: Tailwind CSS, compiled via `postcss-cli`
- **Client JS**: one hand-written vanilla file (`assets/js/main.js`), loaded via `<script defer>`
- **Content**: Markdown blog posts (gray-matter + remark), JSON data for projects/experience/skills
- **OG images**: `satori` + `@resvg/resvg-js`
- **Testing**: Jest + `@testing-library/dom` (HTML strings mounted into jsdom) + `jest-axe` for accessibility

## Project structure

```
├── build/                 # The static-site generator
│   ├── index.js          # Orchestrator — run via `yarn build`
│   ├── layout.js          # Shared document shell (<head>, nav/footer chrome)
│   ├── partials/          # One render function per UI fragment
│   ├── pages/              # One render function per route
│   ├── content/            # Blog/projects/experience/skills/RSS/sitemap loaders
│   ├── data/                # JSON data (nav items, etc.)
│   └── og-image.js        # Open Graph image generation
├── assets/
│   ├── js/main.js         # All client-side interactivity
│   └── css/globals.css    # Tailwind + design tokens
├── content/blog/           # Blog posts (Markdown + front matter)
├── public/                 # Static assets copied as-is (favicons, resume, images)
├── __tests__/               # Jest tests, mirroring build/'s structure
└── docs/                    # Build output (gitignored, never committed)
```

## Getting started

### Prerequisites

- Node 24 (via nvm: `nvm use 24`)
- Yarn

### Installation

```bash
git clone https://github.com/geovannycordero/geovannycordero.github.io.git
cd geovannycordero.github.io
yarn install
```

### Build and preview

```bash
yarn build      # Generate the static site → docs/
yarn preview    # Serve docs/ locally at http://localhost:3000
```

## Available scripts

- `yarn build` — Generate the static site into `docs/`
- `yarn preview` — Serve `docs/` locally
- `yarn lint` / `yarn lint:fix` — ESLint
- `yarn format` / `yarn format:check` — Prettier
- `yarn test` / `yarn test:watch` / `yarn test:coverage` / `yarn test:ci` — Jest

## Testing

- **Jest** as the test runner, tests mounted into jsdom via `document.body.innerHTML = renderX()` and queried with `@testing-library/dom`
- **jest-axe** runs accessibility checks against real rendered pages (`__tests__/a11y/`)
- **Coverage thresholds**: 70% on branches/functions/lines/statements (collected from `build/` and `assets/js/`)

```bash
yarn test
yarn test:watch
yarn test:coverage
```

## Accessibility

- WCAG 2.1 AA target, verified with `jest-axe` in CI
- Semantic HTML, ARIA labels/roles, keyboard navigation, visible focus states
- Design-token contrast ratios checked in `__tests__/build/design-tokens.test.js`

## Deployment

Pushing to `main` triggers `.github/workflows/ci.yml` (lint, test, build, Lighthouse CI). `.github/workflows/deploy.yml` runs `yarn build` and deploys `docs/` via GitHub's native Pages deployment action. `docs/` is gitignored — it only ever exists as a local or CI build artifact, never committed.

## Blog system

- Markdown posts with gray-matter front matter, in `content/blog/`
- Markdown → HTML via remark + remark-gfm
- RSS feed (`/rss.xml`), sitemap (`/sitemap.xml`), and a generated Open Graph image per post

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch and open a Pull Request

Licensed under the [MIT License](LICENSE).

## Author

**Geovanny Cordero Valverde**

- Full-Stack Software Engineer, based in San José, Costa Rica
- 5+ years of experience — Golang, Ruby on Rails, JavaScript

## Links

- **Portfolio**: [geovannycordero.com](https://geovannycordero.com)
- **GitHub**: [@geovannycordero](https://github.com/geovannycordero)
