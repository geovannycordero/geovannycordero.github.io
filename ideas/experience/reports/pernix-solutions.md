# Pernix Solutions — Work Experience Research Report

Source: GitHub org `Pernix-Solutions`, PRs and commits authored by `geovannycordero`. Pulled via `gh api search/issues` (81 PRs, single page, `per_page=100`) and `gh search commits` (author/committer date ranges, org-wide and per-repo). All repos in this org are private client/internal repos.

## 1. Project Name

Pernix Solutions

## 2. Start Date

**2022-12-07** (first authored commit, in `elixir-path`, an internal Elixir onboarding exercise — "day 1 complete").

Caveat worth noting: there is a **~19-month gap** between this onboarding activity (Dec 2022) and the next evidenced activity in the org (`caja-ande-seguros`, starting July 2024). GitHub activity in this org cannot confirm continuous employment across that gap — it's possible the person was on client work in other orgs/repos not covered by this search, on a different engagement structure, or the actual tenure start differs from this org's earliest commit. Recommend confirming actual start date from an offer letter/HR record rather than relying solely on this date.

## 3. End Date

**2025-03-20** (last authored commit/merged PR, in `ezbriefs-benchly`). This is roughly 16-17 months before today (2026-08-07), well outside the "recent activity = Present" window, so it is reported as a fixed end date rather than "Present."

## 4. Tasks Completed

### `caja-ande-seguros` — insurance agency website (Ruby on Rails + JS)
Public-facing website for **Caja de Ande de Seguros, Sociedad Agencia de Seguros S.A.** (cajadeandeseguros.cr), a Costa Rican insurance agency. Stack: Ruby 3.3 / Rails 7.1, PostgreSQL, Node/Yarn, RailsAdmin, deployed to Heroku. 58 PRs (57 merged / 1 closed unmerged), largest body of work in the org.

- **Frontend/UX**: navbar and footer builds and iterations, mobile-responsive nav fixes, tab-styled nav items, carousel and main-page layout updates, dark-mode disable, image/icon/copy updates.
- **Insurance product flows**: insurance listing/detail pages, vehicle insurance application flow (personal info step, voluntary auto, civil liability form, coverage selection, "more coverages"), policy lookup/consultation integration ("Consulta de Póliza"), recommendations page, document sections (Condiciones Generales, informational pages).
- **Content/CMS**: RailsAdmin content-management configuration, seed data and factories for insurance products, images.
- **Integrations**: external chatbot integration, Stimulus controller for PDF document queries.
- **Infra/CI/CD**: CI/CD pipeline setup, staging workflow, deploy-from-dev-to-staging and deploy-to-production configuration.
- **Testing & tooling**: test configuration/refactor, integration test additions, JS linter setup, JS code refactors.
- **Bug fixes**: mobile navbar fix, dark-mode display bug, typo fixes.

### `ezbriefs-benchly` — legal citation Word add-in (TypeScript/React)
Microsoft Word add-in for **Benchly** (benchly.com), a legal-tech product ("ezBriefs") for processing legal brief citations. Stack: Office Add-in (Yeoman "yo office" scaffold), React 18, TypeScript, Webpack, TailwindCSS, MUI. 18 PRs (17 merged / 1 closed unmerged).

- **Citation-processing engine** (the core domain logic of the product): Table-of-Authorities (TA) field extraction, Bluebook-format regex, case citation grouping and reporters list/authority methods, TOA processing class, authority-paragraph case processing, wildcard expression handling.
- **UI**: task-pane view listing found authorities, display of found citations.
- **Engineering tooling**: ESLint setup/fixes, TailwindCSS config, environment-variable support, pre-commit/pre-push hooks, GitHub Actions CI, test setup.
- **Code quality**: multiple code refactors (one refactor PR was closed unmerged and immediately redone as a follow-up PR minutes later — likely wrong-branch or approach change, not a stalled effort).

### `elixir-path` — internal onboarding exercise (Elixir)
Not client-billable work — a structured 5-day internal training repo ("Pernix's Elixir Path") where new hires complete daily coding assignments in personal branches and PR them for review. All 5 daily assignments (Day 1–5) were completed and merged within a 10-day window (Dec 6–16, 2022). Useful as evidence of onboarding/ramp-up at the company, not of production work.

## 5. Challenges Faced

*This section is an inference drafted from observable GitHub signals only (PR/commit timing, labels, closed-unmerged PRs) — it is a best-effort starting draft, not a verified fact. Please correct or expand it from your own memory.*

- No revert commits authored by this user were found in either client repo's history, and the merge rate is high (79/81, ~97.5%), suggesting most work landed cleanly without major rollback events.
- Two PRs were closed without merging, in each case within roughly 15 minutes of opening and with no description (`ezbriefs-benchly` #6 "Some code refactor," `caja-ande-seguros` #34 "Remove categories before create new ones"). The `ezbriefs-benchly` case was immediately followed by an equivalent PR (#7, same title) that did merge — reads as a quick abandon-and-redo (wrong branch, or approach reconsidered) rather than a real struggle.
- A handful of PRs took noticeably longer to merge than the typical same-day/next-day turnaround: `ezbriefs-benchly` #52 "Add ta fields" (9 days, spanning the Dec 31–Jan 9 holiday period) and #50 "Add env variables support..." (7 days, also over the holidays); `caja-ande-seguros` #136 "133 setup linter js code" (7 days). These may simply reflect holiday scheduling rather than technical difficulty.
- Two PRs are explicitly labeled `bug` in `caja-ande-seguros` (mobile navbar rendering, unwanted dark-mode default) — normal post-release polish, not evidence of a deeper problem.
- Activity on `caja-ande-seguros` has a quiet stretch between late September 2024 and late October 2024, and again a ~3-week gap between early and late February 2025 — coinciding with a burst of concentrated activity on `ezbriefs-benchly` in Nov 2024–Jan 2025. Reads as the person being shifted between the two client engagements rather than a blocked/stalled period, but worth confirming.
- The ~19-month gap between the `elixir-path` onboarding work (Dec 2022) and the first client-project commit (Jul 2024) is the biggest open question this data can't resolve — worth filling in from memory (bench time, other client, other org, etc.).

## 6. Outcomes Achieved

- **81 PRs authored, 79 merged (97.5% merge rate)** across two active client engagements plus one internal training repo.
- **Shipped and iterated a live production website** for Caja de Ande de Seguros (cajadeandeseguros.cr) — navigation, full insurance-product catalog and application flows (auto, civil liability, personal info), policy lookup integration, chatbot, CMS-backed content, and a working staging→production CI/CD pipeline, across ~8 months of concentrated feature work.
- **Built core citation-processing features** for Benchly's Word add-in — Bluebook-format regex matching, table-of-authorities extraction, and case-citation grouping — the domain-specific engine underpinning the product's legal-review functionality, along with the add-in's task-pane UI and its test/CI scaffolding.
- **Completed technical onboarding** (5-day Elixir training path) as part of ramp-up at the company.
- Contributed to two materially different tech stacks in the same period (Ruby on Rails/PostgreSQL for an insurance site; TypeScript/React/Office Add-ins for a legal-tech product) — evidence of range across a consultancy's client portfolio.

## 7. Recommendations for Future Work

*(Forward-looking suggestions for portfolio narrative purposes, not derived from the data itself.)*

- Frame this role as **multi-client consultancy engineering** — the two-stack, two-domain split (insurance marketing/CRM site vs. legal-tech citation engine) is a stronger portfolio story than either project alone; lead with "shipped production features across concurrent client engagements in distinct domains and stacks."
- The Bluebook/TOA citation-processing work on `ezbriefs-benchly` is a distinctive, hard-to-fake technical detail (regex-heavy domain logic, not boilerplate CRUD) — worth a dedicated portfolio bullet or case-study callout rather than folding it into a generic "worked on a Word add-in" line.
- Add concrete outcome metrics if available from memory or client records: page/feature count shipped on the insurance site, whether the citation engine handled a specific citation format standard, team size, or any user-facing metrics (traffic, uptime) — GitHub data alone can't supply these.
- Resolve and briefly explain the Dec 2022–Jul 2024 gap in the narrative (bench time, other engagement, prior contract) so the timeline reads as intentional rather than an unexplained hole.
- If other Pernix Solutions client repos exist under different GitHub orgs or with a different author identity (e.g., a work email account instead of `geovannycordero`), consider re-running this same PR/commit search against those to check for additional undiscovered work before finalizing the portfolio entry.

## Per-Repo Breakdown

| Repo | Inferred Purpose | PR Count (merged/total) | Date Range (first→last authored commit) |
|---|---|---|---|
| `caja-ande-seguros` | Production marketing/insurance website for Caja de Ande de Seguros (Rails + JS, cajadeandeseguros.cr) | 57/58 | 2024-07-23 → 2025-03-14 |
| `ezbriefs-benchly` | Word add-in for Benchly legal-tech product — Bluebook/citation processing engine (React/TypeScript) | 17/18 | 2024-11-04 → 2025-03-20 |
| `elixir-path` | Internal Elixir onboarding/training exercise (not client-billable) | 5/5 | 2022-12-07 → 2022-12-16 |
| **Total** | | **79/81** | **2022-12-07 → 2025-03-20** |
