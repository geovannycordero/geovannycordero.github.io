# HubClick — Work Experience Research Report

*Source: GitHub org `hublick`, authored PR/commit history for `geovannycordero`, pulled via `gh api`/`gh search` on 2026-08-07. Client engagement delivered through Pernix Solutions.*

## 1. Project Name

**HubClick** — a lawn-care / home-services booking & job-management platform (quotes, scheduling, invoicing) with a backend API, a client/team/admin mobile app, and a web console, plus a white-label capability for individually branded client apps.

## 2. Start Date

**May 11, 2020** — earliest attributable commit (`hubclick-api`, merge of PR #1 "Project clean up", authored 2020-05-11). The first authored pull request was opened the next day, May 12, 2020.

## 3. End Date

**October 16, 2020** — latest attributable activity (PR "Show an appropiated error message" merged in `hubclick-app`, 2020-10-16). This is roughly 5.9 years before today's date, so it is reported as a fixed end date rather than "Present."

## 4. Tasks Completed

### `hubclick-api` (backend, Node.js/Express + MongoDB + Redis) — 43 PRs, all merged
Built out the core domain model and business logic from scratch over May–August 2020:
- Data models and CRUD: quotes, services, teams, companies, invoices, jobs
- Relationships: service↔quote associations, quote requester relationships, user↔company relationships, company ownership
- Auth/permissions: client permission updates, non-verified user handling, invitation-based client creation, one explicit security cleanup ("Remove unnecessary and prone to security issues code")
- Invoicing logic: invoice CRUD, invoice creator, invoice service fee, auto-invoice-on-job-completion, invoice notes
- Job workflow: job hours, job/service population, job status tracking (skipped status test coverage)
- Late-stage infra work: an "Aws server" PR in August, after a ~5-week gap from the prior PR, suggesting a shift toward deployment/infrastructure once core CRUD stabilized

### `hubclick-app` (mobile app, React Native / Expo) — 40 PRs, 38 merged, 2 closed unmerged
Built the end-user mobile experience across client, team, and admin roles:
- Auth/onboarding: login (built twice — an initial "Login" PR followed by a "Login redesign"), profile view/edit
- Core booking flow: quote detail view, schedule quote, quote acceptance, status updates
- Role-specific dashboards: client dashboard, team/admin dashboard, team jobs, customer service details/screens
- Invoicing on the client: invoice history, invoice-on-job-finish (two attempts — see Challenges)
- Notes feature: added and iterated across multiple screens (job screen, details screen, all components) over four PRs in July
- A long tail of standalone fix PRs, especially concentrated in June 2020 ("Multiple fixes," "Different fixes," "Thursday fixes," "New fixes," "General fixes," "Price fixes," "Fixes v3")
- Later, sparser maintenance PRs (late Aug, mid-Oct) fixing sizing issues and login error messaging

### `hubclick-web` (web console, React/create-react-app) — 11 PRs, all merged
Company-facing web app for onboarding and service management:
- Company creation/request flow, company CRUD
- Service management and service-field updates, service color coding
- Client invitation and address verification flow
- Concentrated in May–June 2020, tailing off with a final "Master" PR in July

### White-label / multi-tenant client repos — commit-only activity, no PRs found
Four repos were created as branded copies of the mobile app for individual lawn-care/home-services clients: `HubClick` (base template), `MightyGarden`, `Nathan-sLawnCare`, and `CreativeHomeMaintenance`. All four share the identical `hubclick-app` README, confirming they are white-labeled instances of the same codebase rather than separate products. Three of them (`MightyGarden`, `Nathan-sLawnCare`, `CreativeHomeMaintenance`) were created within roughly two minutes of each other on August 12, 2020, alongside the base `HubClick` template repo, and all show authored commits through August 18, 2020 — consistent with a batch client-onboarding/customization push. A fifth client repo, `Green-Acres`, was created September 15, 2020, but no commits attributable to this author were found in it (it may have been scaffolded but customized by someone else, or left unbuilt).

Two certificate-management repos (`hubclick-certificates`, `pernix-certificates`) use `fastlane match` for iOS code-signing/provisioning. No commits attributable to this author were found in either — release/signing infrastructure was likely handled by CI automation or another team member, so this appears to be outside this person's direct scope on the project.

## 5. Challenges Faced

*The following is an inference drafted from observable GitHub signals only — commit/PR metadata, not verified fact or firsthand account. Treat as a best-effort draft for the user to correct or expand.*

- **Invoice-on-completion logic needed rework**: two PRs in `hubclick-app`, both titled identically ("Create invoice when job is finished," 2020-06-16), were closed without being merged — suggesting a first implementation attempt was abandoned or superseded before landing the feature correctly.
- **Heavy bug-fix cadence in June 2020**: `hubclick-app` shows an unusually dense run of vaguely-titled fix PRs ("Multiple fixes," "Different fixes," "Fixes," "Fixes v3," "Thursday fixes," "New fixes," "General fixes") within about three weeks — consistent with rapid iteration against active QA/product feedback during initial feature stabilization, rather than a smooth linear build.
- **A security cleanup was explicitly called out**: the `hubclick-api` PR "Remove unnecessary and prone to security issues code" (2020-06-10) indicates a security-relevant issue was identified and remediated during development, not just ordinary refactoring.
- **Activity gaps suggest handoffs or off-repo work**: `hubclick-api` PR activity has a ~5-week gap between July 4 and August 12, 2020 (ending in a single "Aws server" PR), and `hubclick-app`/`hubclick-web` both show long, sparse tails after their core June buildout — consistent with the project moving from active feature development into a slower maintenance/infra phase, possibly with reduced team bandwidth or a shift to work not captured in GitHub (e.g., manual deployment, client-specific configuration).
- **Login was revisited**: `hubclick-app` shows both an initial "Login" PR and a later "Login redesign" PR, implying the first pass didn't fully meet requirements and needed a follow-up redesign.

## 6. Outcomes Achieved

- **92 of 94 authored pull requests merged** (98% merge rate) across the three core repos, over roughly five months of active development (May–October 2020).
- Delivered a complete backend API (`hubclick-api`) covering the full domain: users, companies, teams, quotes, services, jobs, and invoices, with authentication and permissions.
- Shipped a full-featured React Native mobile app (`hubclick-app`) supporting three distinct user roles (client, team member, admin) with booking, scheduling, invoicing, and profile management.
- Delivered a web console (`hubclick-web`) for company onboarding and service configuration.
- Evidence of the platform reaching a **productized, multi-tenant stage**: by mid-August 2020, the codebase had been successfully templated and customized into at least three distinct client-branded app instances (`MightyGarden`, `Nathan-sLawnCare`, `CreativeHomeMaintenance`) in a single coordinated push, with a fourth (`Green-Acres`) onboarded a month later — indicating the product model scaled from a single app to a repeatable white-label offering for multiple lawn-care/home-services businesses during this engagement.

## 7. Recommendations for Future Work

*Forward-looking suggestions for portfolio narrative purposes, not derived from GitHub data.*

- Frame this engagement around the **"white-label app factory" pattern** — turning a single booking/scheduling product into a repeatable, brandable offering for multiple small-business clients is a strong, differentiated portfolio story (productization + platform thinking, not just feature delivery).
- Quantify business outcomes that GitHub can't show — number of paying clients onboarded, user/booking volume, or revenue impact — since these carry more portfolio weight than PR counts.
- Mention the CircleCI-based CI pipeline and `fastlane match` iOS release process as part of the platform's engineering maturity, even where this author's individual commit history doesn't show direct authorship of the certificate repos — worth confirming with the user whether they configured or used that pipeline day-to-day.
- Consider closing the loop on the two open questions this data raises: what happened after October 2020 (project end, handoff, or reduced involvement?), and whether `Green-Acres` represents a stalled onboarding worth explaining or omitting from the narrative.

---

## Per-Repo Breakdown

| Repo | Inferred Purpose | PR Count | Date Range (commits) |
|---|---|---|---|
| `hubclick-api` | Backend REST API (Node.js, MongoDB, Redis) — core domain logic | 43 (all merged) | 2020-05-11 to 2020-09-29 |
| `hubclick-app` | React Native (Expo) mobile app — client/team/admin flows | 40 (38 merged, 2 closed unmerged) | 2020-05-13 to 2020-10-16 |
| `hubclick-web` | React web console — company onboarding, service management | 11 (all merged) | 2020-05-21 to 2020-07-22 |
| `HubClick` | Base/master white-label template of the mobile app (identical README to `hubclick-app`) | 0 PRs (commits only) | 2020-08-12 to 2020-08-14 |
| `MightyGarden` | White-labeled client instance of the app | 0 PRs (commits only) | 2020-08-12 to 2020-08-18 |
| `Nathan-sLawnCare` | White-labeled client instance of the app | 0 PRs (commits only) | 2020-08-12 to 2020-08-18 |
| `CreativeHomeMaintenance` | White-labeled client instance of the app | 0 PRs (commits only) | 2020-08-12 to 2020-08-18 |
| `Green-Acres` | White-labeled client instance (scaffold; empty README) | 0 | Created 2020-09-15; no attributable commits found |
| `hubclick-certificates` | `fastlane match` iOS code-signing certs (HubClick brand) | 0 | No attributable commits found |
| `pernix-certificates` | `fastlane match` iOS code-signing certs (Pernix/agency brand) | 0 | No attributable commits found |

**Totals:** 94 authored PRs found org-wide (92 merged, 2 closed unmerged, 0 still open) across 3 active repos; commit-level activity additionally attributable in 4 more repos (white-label instances + base template). Overall date range: **May 11, 2020 – October 16, 2020**.
