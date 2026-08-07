# BuildingLink — Work Experience Report

## 1. Project Name

**BuildingLink** (client engagement delivered through Pernix Solutions)

BuildingLink is a property-management SaaS platform for residential buildings. Its GitHub org (400+ repos) is built as a large collection of small Vue 2/3 single-spa micro-frontend modules (`vue-*` prefixed, mounted inside an `orchestrator` shell app) backed by many small .NET event-driven microservices, tied together with a generated TypeScript API client (`ts-api-client`) and Avro-based event messaging.

## 2. Start Date

**June 14, 2025** — earliest authored PR (`vue-manager-dashboard`, PER-150). Confirmed independently via commit search: earliest authored commit June 18, 2025 (`vue-manager-dashboard`, "[PER-150] Fetching Improvements — Manager Dashboard (FE)").

## 3. End Date

**Present** — most recent authored PR and commit are dated August 7, 2026 (today), with continuous activity throughout the prior two months. Engagement is ongoing.

## 4. Tasks Completed

Across ~14 months, 425 PRs were authored across 57 distinct repositories (413 closed, 12 still open; 381 merged, 32 closed without merge). Work spans the full stack of the platform:

**Property/unit/occupant domain (legacy → AWS migration)** — The single largest area of work. Sustained delivery on the legacy `Properties` .NET microservice (occupant CRUD, bulk SysAdmin occupant creation/partitioning, phone-number handling, custom fields on units) in parallel with its in-flight replacement, `PropertiesAwsTransition`, which runs the same domain against a new Postgres database. The matching frontend, `vue-properties`, and the read-heavy staff dashboard `vue-unit-overview` (58 PRs — occupancy creation flows, phone/email validation, notification opt-outs, Weblate translation reconciliation) received comparable volume. `ts-api-client` (23 PRs) was kept in sync as the generated client for all of the above.

**Bulletin Board module** — Full-stack ownership across both the `BulletinBoard` backend microservice (21 PRs — auth for resident superusers, notification subscription bugs, migration repair, moderation/approval flow) and the `vue-bulletin-board` frontend (29 PRs — validation, resident/staff routing, comment formatting, notification opt-in UX).

**Building Directory & messaging** — `vue-building-directory` (14 PRs) plus cross-cutting `BDN-*` and `BM-*` tickets touching message-link dialogs, board-member recipient sync, and S3 pre-signed upload metadata signing that reached across the Properties, Building Directory, and resident-navigation repos simultaneously.

**Content Creator / rich text editing** — `vue-content-creator` (17 PRs) for the staff communications composer (announcements, template emails, printable flyers), paired with shared component work in `vue-ui` (9 PRs) hardening the rich-text editor (image handling, color picker, dialog theming/teleporting).

**Survey module** — `vue-survey2` (12 PRs), largely validation and draft-save bug fixes plus regression-test coverage for a Vue 3 survey builder/response flow.

**Parking & vehicle management** — `vue-parking-permits` (10 PRs), `vue-parking-management` (6 PRs), plus supporting `ParkingPermits` backend and `ts-api-client` regeneration for permit fee-override and license-plate features.

**Platform shell & shared UI** — `vue-application-navigation` (8 PRs, sidebar/nav), `vue-ui-micro` (5 PRs, low-level popover/print components used platform-wide), `vue-resident-dashboard` (6 PRs), `vue-my-profile` (6 PRs), `vue-custom-fields` (5 PRs).

**Infrastructure/ops** — `deployments` (7 PRs — UAT/prod deployment configs, Kafka DLT topic rollout, API gateway routing fixes).

**Long tail** — smaller contributions (1–5 PRs each) across roughly 34 additional micro-frontend and backend repos (~52 PRs total), covering modules such as vehicle management, valet, front-desk instructions, event log, calendar, board members, resident directory, notification dispatch, Keylink, asset manager, and an internal AI-tooling repo — consistent with the breadth expected of a contributor embedded across a 400+ repo micro-frontend platform rather than owning a single module.

Work is a mix of features (new settings/fields, notification workflows, permit fee overrides), a high volume of bug fixes (~242 of 425 PR titles contain "fix"), CI/tooling maintenance (dependency bumps, Node upgrades, SonarCloud hardening), and infrastructure/data-migration work tied to the Properties → PropertiesAwsTransition transition.

## 5. Challenges Faced

*The following is inferred from observable repo signals only (revert commits, recurring ticket IDs spanning many PRs, cross-repo touches, and closed-without-merge rates). It is a best-effort draft — the user should correct, expand, or discard anything that doesn't match their actual experience.*

- **A risky schema migration on `Properties` needed multiple reverts.** Five sequential PRs on the `Properties` repo (`UNIT-562`, `UNIT-617`, `UNIT-555`) show a phone-number-ID column migration (int → UUID) that was pushed and reverted repeatedly before landing, suggesting the migration had downstream breakage that wasn't fully caught pre-merge — a real production-data-safety challenge on a live occupant/phone table.
- **Cross-cutting fixes required touching many interdependent repos at once.** Several tickets (e.g. `BDN-287` — S3 pre-signed URL metadata signing, appearing across 6 repos; `BUL-551` — resident superuser deep-linking, across 7 PRs in both `vue-bulletin-board` and `vue-application-navigation`) show single logical bugs whose fix had to be coordinated across independently-deployed micro-frontends and backend services — a structural cost of the many-small-repos architecture.
- **The rich-text editor feature (`AN-174`) took an unusually long tail to stabilize.** 13 separate PRs reference this one ticket across `vue-content-creator` and `vue-ui`, iterating on dialog theming, image sizing, drag/resize bugs, and layout overlap — consistent with a feature that looked simple but exposed many edge cases in a shared component library used by other modules.
- **Bulk occupant-creation performance (`PRPTS-813`) needed 9 follow-up PRs**, including fixes for intermittent 504 timeouts and flaky parallelism tests — indicative of a hard-to-reproduce concurrency/performance bug in a high-traffic bulk-write path.
- **Running two parallel Properties implementations (legacy + AWS transition) simultaneously** likely required care to keep behavior consistent for callers while the underlying data store changed out from under them — a known-hard pattern for live migrations.
- 32 of 425 PRs (about 7.5%) were closed without merging, which is unremarkable on its own but consistent with iterative/exploratory PRs common in a fast-moving, ticket-driven workflow.

## 6. Outcomes Achieved

- **381 merged PRs** shipped to production across the BuildingLink platform over ~14 months of continuous, still-active engagement.
- Sustained ownership of the platform's core property/unit/occupant domain through a live legacy-to-AWS/Postgres migration, without an apparent service interruption (inferred from absence of rollback/outage-labeled PRs beyond the phone-ID migration reverts).
- Full-stack delivery (backend microservice + Vue frontend + generated API client) on at least two complete feature modules — Bulletin Board and Building Directory — plus significant frontend-only ownership of Content Creator, Survey, and Parking Permits.
- Contributed to 57 distinct repositories, reflecting genuine breadth across a 400+ repo micro-frontend/microservice estate rather than single-module specialization.
- Maintained platform-wide shared UI components (`vue-ui`, `vue-ui-micro`) consumed by many downstream modules, indicating trusted-contributor status on shared infrastructure, not just feature teams.
- Kept deployment and CI tooling current (Node version bumps, SonarCloud/SonarScanner fixes, dependency upgrades) alongside feature work.

## 7. Recommendations for Future Work

*Forward-looking suggestions for portfolio narrative purposes — not derived from the repo data itself.*

- Frame the Properties → PropertiesAwsTransition work as a **live data-migration case study**: legacy system decommissioning while maintaining backward compatibility is a strong, concrete narrative for senior/staff-level portfolio positioning.
- Highlight the **cross-repo coordination work** (BDN-287, BUL-551-style tickets) as evidence of systems-level thinking in a micro-frontend architecture — this is a differentiated skill relative to single-app frontend work.
- Consider quantifying the **shared-component stewardship** angle (`vue-ui`, `vue-ui-micro`) — changes here have platform-wide blast radius, which is a good signal of trust and technical judgment to surface in interviews.
- If available, pull a couple of concrete before/after metrics for the `PRPTS-813` performance fix (504 error rate, bulk-creation latency) — quantified performance wins are high-value portfolio material and the PR history alone doesn't capture the numbers.
- Verify with the user whether the AI-assisted commits visible in recent history (e.g. Claude co-authorship on the `BUL-474` fix) reflect a broader AI-augmented workflow worth mentioning, since that's an increasingly relevant differentiator.

## Per-Repo Breakdown (Top 20 by PR Count)

| Repo | Inferred Purpose | PR Count | Date Range |
|---|---|---|---|
| `Properties` | Legacy .NET microservice owning property/unit/occupant/management-company data; marked for replacement by `PropertiesAwsTransition` | 79 | 2025-07-23 → 2026-05-27 |
| `vue-unit-overview` | Vue 2 staff single-unit dashboard (residents, maintenance, parking, custom fields, quick actions) | 58 | 2025-06-26 → 2026-07-28 |
| `vue-bulletin-board` | Vue 3 frontend for the Bulletin Board module (staff + resident) | 29 | 2025-10-24 → 2026-07-20 |
| `vue-properties` | Vue frontend for property/unit/occupant settings and management tools | 26 | 2025-07-30 → 2026-06-25 |
| `ts-api-client` | Generated TypeScript API client (from OpenAPI specs) shared across all frontends | 23 | 2025-09-24 → 2026-08-05 |
| `BulletinBoard` | .NET 6 event-driven backend microservice for Bulletin Board | 21 | 2025-09-09 → 2026-07-21 |
| `vue-content-creator` | Staff tool for composing/distributing resident communications (announcements, emails, flyers) | 17 | 2026-05-18 → 2026-07-07 |
| `vue-building-directory` | Vue 3 micro-frontend for building contacts/message links/directory | 14 | 2025-11-18 → 2026-07-21 |
| `vue-survey2` | Vue 3 micro-frontend for the Survey feature (staff builder + resident responses) | 12 | 2026-07-03 → 2026-08-04 |
| `PropertiesAwsTransition` | New AWS/Postgres-backed Properties microservice, in-progress replacement for `Properties` | 12 | 2026-06-01 → 2026-07-22 |
| `vue-parking-permits` | Vue 3 micro-frontend for Parking Permits (issue/approve/terminate permits) | 10 | 2026-07-27 → 2026-08-06 |
| `vue-ui` | Shared Vue component library (rich text editor, dialogs, etc.) used across modules | 9 | 2026-05-19 → 2026-07-01 |
| `vue-application-navigation` | Shell/navigation micro-frontend (sidebar, resident deep-linking) | 8 | 2026-01-05 → 2026-08-04 |
| `deployments` | Vetted UAT/production deployment scripts and configuration | 7 | 2025-09-09 → 2026-05-04 |
| `vue-resident-dashboard` | Resident-facing dashboard micro-frontend | 6 | 2025-12-08 → 2026-05-12 |
| `vue-parking-management` | Vehicle/parking-space management micro-frontend | 6 | 2026-01-08 → 2026-08-04 |
| `vue-my-profile` | Resident "My Profile" micro-frontend | 6 | 2025-09-18 → 2026-04-23 |
| `vue-ui-micro` | Low-level shared UI primitives (datepicker, select, print) used platform-wide | 5 | 2026-07-17 → 2026-08-05 |
| `vue-custom-fields` | Custom Fields micro-frontend | 5 | 2025-10-10 → 2026-01-28 |
| `CustomFields` / `Email` / `ParkingPermits` / `Users` (combined) | Supporting backend microservices, 5 PRs each | 20 | 2026-01-15 → 2026-08-06 (combined range) |
| **Other repos (rollup)** | ~34 additional micro-frontend/backend repos (vehicle management, valet, front-desk instructions, event log, calendar, board members, resident directory, notification dispatch, Keylink, asset manager, AI tooling, etc.) — mostly small bug fixes and minor features | ~52 | 2025-06-14 → 2026-08-07 |

**Totals:** 425 PRs (381 merged, 32 closed unmerged, 12 open) across 57 repositories.
