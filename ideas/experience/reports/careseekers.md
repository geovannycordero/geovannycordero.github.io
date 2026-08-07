# Careseekers (CareSeekers → BrightSpring "LHC" → Engage)

## 1. Project Name

**Careseekers** — client engagement delivered through Pernix Solutions for `Careseekers-Pty-Ltd`, a home/community care and support-worker scheduling platform. The org's repo history spans **three brand eras of the same underlying product**: the original CareSeekers-branded app (`careseekers-*`), a BrightSpring Health Services rebrand codenamed "LHC" (`lhc-*`), and the current, most actively developed line, Engage (`engage-*`), which includes the mobile apps for support workers.

> **Important data caveat**: GitHub PR-authorship search (`author:geovannycordero type:pr`) only returns results for the **Engage era** — 384 PRs, all in `engage-*` repos and their small shared Go libraries. It returns **zero PRs** in any `careseekers-*` or `lhc-*` repo. Commit search shows this person *did* commit directly to `careseekers-engage-frontend` (345 commits) and `lhc-engage-frontend` (207 commits) in the earlier eras — consistent with a pre-PR-workflow era where changes were pushed straight to branches rather than reviewed through pull requests. Several repos across all three prefixes share **identical earliest-commit timestamps** (e.g. `careseekers-engage-frontend` and `lhc-engage-frontend` both show a first commit at 2020-08-20 09:54:30, referencing an old `familydirected` GitHub org in a merge message) — strong evidence the repos were **renamed/duplicated with full history preserved** across the rebrand, not built from scratch each time. Treat the three "eras" as chapters in one continuous codebase lineage, not fully independent projects.

## 2. Start Date

**2020-08-20** — earliest commit found (`careseekers-engage-frontend` / `lhc-engage-frontend`, shared history, message references old org `familydirected`). This predates the PR-based workflow; it's the earliest verifiable authored activity in the org.

## 3. End Date

**2025-09-17** — most recent authored commit found (`engage-worker-mobile`, an Android 16 KB page-size / Play Store compliance fix). Most recent PR activity: created 2025-10-09, last PR merged 2025-06-24. Since today's date is 2026-08-07, the most recent activity is **~11 months old, so this is reported as an actual end date, not "Present."**

## 4. Tasks Completed

### CareSeekers era (`careseekers-*`)
Direct-commit era, no PRs authored under this account. Real activity is concentrated almost entirely in **`careseekers-engage-frontend`** (345 commits by this author) with a single commit in `careseekers-api-module`; no authored activity found in `careseekers-frontend` or `careseekers-admin-frontend`. Early commit messages (e.g. "Capitalization," "Line Breaks in Care Plan," "No Clients to show," "Wording fixes") point to UI polish and bug-fixing on the client/care-plan-facing frontend, plus one PR-style merge (`#6 geovannycordero/HHE-653/wording-fixes`) showing Jira-ticket-driven work (`HHE-###` ticket prefix, "Home Health Engage" presumably) even before formal PR review was standard practice.

### BrightSpring "lhc-*" era
Also a direct-commit era. Real authored activity: **`lhc-engage-frontend`** (207 commits), plus small touches in `lhc-cron-reminders` (6) and `lhc-cron-notifications` (4); no authored activity found in `lhc-admin-api`, `lhc-admin-mobile`, `lhc-sftp-ingester`, or the other `lhc-cron-*` variants. This era carries forward the same engage-frontend codebase under the BrightSpring rebrand, with early cron/notification work (`lhc-cron-notifications`, e.g. "update go.mod and go.sum") suggesting involvement in the backend scheduled-job side of the product beginning to take shape, foreshadowing the dedicated cron microservices of the Engage era.

### Engage & mobile era (`engage-*`) — primary, PR-reviewed era, 384 PRs
This is where the bulk of verifiable, PR-reviewed work sits (2023-02-01 through 2025-10-09). Two repos dominate:

- **`engage-api`** (176 PRs, 166 merged, Feb 2023 – Oct 2025) — Go backend for the platform. Recurring themes from PR titles: **referral management** (creation, attachments, file uploads, status updates, email notifications, admin exclusions), **shift scheduling** (start-time validation, reminders on assignment/creation, filtering, "no external ID" backfill queries, timing/timezone fixes), **worker/admin/user management** (role support, delete-admin endpoints, self-role-modification checks, message filtering by sender), **email/notification integration** (referral emails, 2FA email toggling, reminder scheduling), and a **Go version upgrade** (1.14 → 1.19). A large share of PRs are routine `Update QA` / `Update prod` / `Update prod from QA` branch-promotion merges reflecting a QA→prod release cadence rather than individual features.
- **`engage-frontend`** (130 PRs, all merged, Nov 2023 – Apr 2025) — Vue.js admin/dashboard frontend. Feature work: referral attachments and printing, multi-caregiver assignment to referrals, branch-based access control (support admins scoped to their branches), OAuth login migration ("remove login fields, redirect directly to Careseekers OAuth"), dashboard/table UX improvements, mobile responsiveness fixes, message-reminder UI, conversation/notifications, and a shift-creation-modal refactor.
- **`cron-webhooks`** (26 PRs) and **`cron-shifts`** (17 PRs) — dedicated Go microservices for webhook delivery and shift-related scheduled jobs (RabbitMQ-backed requeue logic, ECS/security-group/CI deployment config, shift-timing interval changes).
- **`engage-worker-mobile`** (5 PRs) — the support-worker-facing mobile app: login-redirect fix, UTC date-format fix, and a **React Native version upgrade**, plus (via commit search, outside PR data) an **Android 15+ / 16 KB memory page size compliance fix** for Play Store requirements — the most recent authored work found in the org.
- **`engage-tasks`** (4 PRs) — appointment reminder scheduling setup/config.
- Shared Go libraries (`gqlgen`, `debugservice`, `awsutils`, `twilio`, `fcm`, `logger`, `goevents`, `gomq`, `gomicrofw`, `golog`, `gocron`, `ctxutils`, `envutils`, `testutils`, `file-service`) — mostly 1-6 PRs each, largely CI/org-rename housekeeping ("Change organization name," "update master," "Update CI") plus initial scaffolding; **`twilio`** and **`fcm`** integration libs confirm SMS and push-notification channels were part of the stack. Minor authored commits (1 each, no PRs) also found in `engage-client-mobile`, `engage-secure-sms`, `engage-testing`, and `engage-frontend-lib`, suggesting light/scaffolding involvement rather than sustained ownership.

## 5. Challenges Faced

*Labeled explicitly as inference drafted from observable signals only (revert commits, hotfix-style titles, back-and-forth PR titles) — this is a best-effort draft for the user to correct or expand, not verified fact.*

- **Shift-timing/date-handling bugs recurred**: `cron-shifts` history includes "Comment HandleRepeatingShifts while we fix the issue with dates," "Dates check," "Check the start time is in the future, if not skip," and a bare "Revert changes" — together suggesting a period of unstable date/timezone logic in the shift-scheduling job that needed active firefighting.
- **Queue retry logic went back and forth**: `cron-webhooks` shows both "Requeue jobs after fail" and later "Don't requeue jobs after fail," plus "Set requeue to true as it was originally" — indicative of tuning/reverting retry behavior under real-world failure conditions rather than getting it right the first time.
- **Infrastructure/config churn**: repeated "Update security groups," "Update RMQ_CONN_STR var," "Enable assign public IP," and multiple ECS-deployment-value updates across `cron-webhooks`/`cron-shifts`/`engage-tasks` point to iterative infra debugging around AWS networking and RabbitMQ connectivity for the cron microservices.
- **Org/branding migration overhead**: a wave of "Change organization name" and "update org"/"Update GitHub organization and env vars" PRs across nearly every shared library and cron service reflects real engineering cost from the BrightSpring/Engage rebrand — every repo's CI, env vars, and org references needed updating, not just a cosmetic rename.
- **QA→prod promotion was a manual, PR-driven ritual**: a very large fraction (well over half) of PRs in `engage-api`, `engage-frontend`, and the cron services are literally titled "Update QA," "Update prod," "Update prod from QA" — this is a lightweight signal of a manual (rather than automated) release-promotion process, which is more a process observation than a "challenge," but worth noting for portfolio framing around release engineering.
- **No hotfix-labeled commits and only 3 reverts found** across 384 PRs — a mild positive signal that, whatever the friction above, catastrophic breakage was rare relative to volume.

## 6. Outcomes Achieved

- **369 of 384 authored PRs merged** (96% merge rate) in the Engage era alone, spanning Feb 2023 – Oct 2025.
- Sustained ownership of the platform's two largest live services — `engage-api` (166 merged PRs) and `engage-frontend` (130 merged PRs) — across roughly 2.5 years, covering the full referral-to-shift-to-reminder workflow used by care coordinators and support workers.
- Stood up/maintained dedicated scheduled-job microservices (`cron-webhooks`, `cron-shifts`, `engage-tasks`) handling webhook delivery, shift-reminder timing, and appointment reminders — decomposing cron logic out of the monolithic API over time.
- Delivered a full **Go version upgrade (1.14 → 1.19)** on `engage-api` and a **React Native version upgrade** on `engage-worker-mobile`, plus the most recent commit found in the org: an **Android 16 KB page-size compliance fix** to keep the worker mobile app compatible with Android 15+ and current Play Store requirements — evidence of continued app maintenance well after most feature PRs tapered off.
- Carried the codebase through **two full rebrands** (CareSeekers → BrightSpring/"LHC" → Engage) with continuous commit history preserved, including updating CI, environment variables, and org references across a dozen-plus repos each time.
- Contributed to the platform's integration surface: Twilio (SMS), FCM (push notifications), and a custom GraphQL codegen setup (`gqlgen`), indicating involvement beyond pure CRUD feature work into cross-cutting infrastructure.

## 7. Recommendations for Future Work

*Forward-looking suggestions for portfolio narrative purposes, not a client deliverable.*

- Frame this engagement around **longevity and platform continuity** — few contributors carry a single product through two rebrands and 5+ years of commit history; that's a stronger narrative than raw PR count.
- Highlight the **mobile app compliance work** (Android 16 KB page size, React Native upgrades) as a concrete, dateable, verifiable "kept the app store-compliant" story — it's the most recent and most portfolio-friendly single data point.
- Consider a short case-study angle on the **QA→prod promotion workflow** and **cron-service decomposition** (webhooks/shifts/tasks split out from the monolith) as a lightweight "release engineering / service decomposition" story, since it's well evidenced in the PR titles.
- If pursuing more detail than this org-wide roll-up, a next research pass could pull actual PR *bodies* (not just titles) for `engage-api` and `engage-frontend` to recover ticket numbers (`HHE-###`, numeric ticket prefixes like `132`, `135`, `109`) and cross-reference against any surviving Jira/ticket exports the user may still have access to, to add named-feature detail.
- Verify with the user directly on the shift-timing and queue-retry churn called out in Section 5 — it's inferred from PR titles alone and could just as easily reflect normal iterative hardening rather than a real "challenge," so it should be confirmed or reworded before going into a portfolio piece.

## Per-Repo Breakdown

| Repo | Era | Inferred Purpose | PR Count | Date Range (PR created_at) |
|---|---|---|---|---|
| `careseekers-engage-frontend` | CareSeekers | Client/care-plan-facing frontend (predecessor of engage-frontend) | 0 PRs / 345 commits | 2020-08-20 → ~2023 (direct-commit era, no PR data) |
| `careseekers-api-module` | CareSeekers | Backend API module | 0 PRs / 1 commit | single commit, 2023-01-18 |
| `careseekers-frontend` | CareSeekers | Public-facing frontend | 0 (no authored activity found) | — |
| `careseekers-admin-frontend` | CareSeekers | Admin frontend | 0 (no authored activity found) | — |
| `lhc-engage-frontend` | BrightSpring/LHC | Same engage-frontend lineage, rebrand | 0 PRs / 207 commits | 2020-08-20 → 2022-08 (shared/inherited history) |
| `lhc-cron-reminders` | BrightSpring/LHC | Reminder scheduled jobs (predecessor of engage-tasks) | 0 PRs / 6 commits | early LHC era |
| `lhc-cron-notifications` | BrightSpring/LHC | Notification scheduled jobs | 0 PRs / 4 commits | early LHC era, last seen 2022-08-10 |
| `lhc-admin-api`, `lhc-admin-mobile`, `lhc-admin-mobile-certs`, `lhc-cron`, `lhc-cron-autoqueue`, `lhc-cron-matching`, `lhc-sftp-ingester` | BrightSpring/LHC | Admin API/mobile, autoqueue/matching cron, SFTP ingestion | 0 authored activity found | — |
| `engage-api` | Engage | Core backend API (referrals, shifts, users, notifications) | 176 (166 merged) | 2023-02-01 → 2025-10-09 |
| `engage-frontend` | Engage | Admin/coordinator dashboard (Vue) | 130 (130 merged) | 2023-11-06 → 2025-04-30 |
| `cron-webhooks` | Engage | Webhook delivery scheduled service | 26 (26 merged) | 2024-02-23 → 2024-06-06 |
| `cron-shifts` | Engage | Shift-timing scheduled service | 17 (16 merged) | 2024-02-23 → 2025-06-24 |
| `debugservice` | Engage | Internal debugging/support tool | 6 (6 merged) | 2024-04-19 → 2024-04-26 |
| `gqlgen` | Engage (shared lib) | GraphQL code generation | 6 (4 merged) | 2023-01-24 → 2023-12-19 |
| `engage-worker-mobile` | Engage | Support-worker mobile app (React Native) | 5 (3 merged) | 2023-12-05 → 2025-06-03 (commits to 2025-09-17) |
| `engage-tasks` | Engage | Appointment reminder task scheduling | 4 (4 merged) | 2024-03-11 → 2024-10-15 |
| `awsutils` | Engage (shared lib) | AWS helper library | 2 (2 merged) | 2023-01-24 → 2024-01-03 |
| `twilio`, `fcm`, `logger`, `goevents`, `gomq`, `gomicrofw`, `golog`, `gocron`, `ctxutils`, `envutils`, `testutils`, `file-service` | Engage (shared libs) | SMS/push integration, logging, events, cron, misc shared utilities | 1 each (11 total, all merged) | 2023-01-24 (mostly single scaffolding/rename PR) |
| `engage-client-mobile`, `engage-secure-sms`, `engage-testing`, `engage-frontend-lib` | Engage | Client mobile app, secure SMS, test tooling, shared FE lib | 0 PRs / 1 commit each | scaffolding-level activity only |
| `engage-worker-core-mobile`, `engage-worker-demo-mobile`, `engage-worker-mobile-certs` | Engage | Mobile app variants/certs | 0 authored activity found | — |
