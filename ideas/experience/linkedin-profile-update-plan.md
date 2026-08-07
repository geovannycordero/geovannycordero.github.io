# LinkedIn Profile Update Guide

Source: the 5 screenshots of `linkedin.com/in/geovannycordero/` shared in this conversation
(headline, About, Experience, Skills, and the "Add a role" modal), read against everything already
gathered in this folder:

- [`reports/pernix-solutions.md`](./reports/pernix-solutions.md), [`reports/buildinglink.md`](./reports/buildinglink.md),
  [`reports/careseekers.md`](./reports/careseekers.md), [`reports/hubclick.md`](./reports/hubclick.md),
  [`reports/sproxxy.md`](./reports/sproxxy.md) — the GitHub-mined engagement research
- `/Users/gehovah/Projects/personal/geovannycordero.github.io/app/experience/data/experience.json` —
  the sanitized, already-written copy from the implemented Experience section (reuse this, don't
  re-draft from scratch — it already went through the confidentiality pass in
  [`portfolio-integration-plan.md`](./portfolio-integration-plan.md) §2)
- [`work-experience-best-practices.md`](./work-experience-best-practices.md) — the portfolio
  research, most of which applies directly to LinkedIn too (impact-first copy, consulting-tenure
  conventions, NDA handling)
- [`skills-integration-plan.md`](./skills-integration-plan.md) — the technology gap analysis

This is a **document only** — I did not log into or modify your LinkedIn profile. Everything below
is copy and instructions for you to paste in manually.

---

## 1. What's actually missing (the headline finding)

Your LinkedIn Experience section currently shows **only the internal Pernix Solutions role
progression** (Apprentice → Software Engineer → II → III, plus Supervisor of the Apprentice
Program) and a part-time Assistant role at Universidad de Costa Rica. **None of the four client
engagements — BuildingLink, Careseekers, HubClick, Sproxxy — appear anywhere on the profile.**
That's ~750 merged pull requests and 5+ years of documented, varied technical work that a recruiter
looking at your LinkedIn today has no way to see. This is the main gap this guide closes.

Secondary gaps, smaller but worth fixing while you're in there: the role-history dates have an
overlap that looks like a data-entry slip (§3), the headline is generic (§2), and the visible
"Top skills"/Skills ordering leads with things that undersell your actual stack breadth (§5).

---

## 2. Headline

**Current**: `Software Engineer`

This is the single most search-weighted field on LinkedIn (it's what shows in search results and
under your name everywhere) and right now it's the least specific line on the whole profile.

**Recommended** (220 character limit — this is 158):

```
Software Engineer III @ Pernix Solutions | Go · Ruby on Rails · Vue.js · TypeScript | Full-Stack Consultancy Engineering Across Property Management, HealthTech & Legal Tech
```

Or, shorter and title-forward if you'd rather lead with seniority over breadth:

```
Software Engineer III & Apprentice Program Supervisor @ Pernix Solutions | Go, Ruby on Rails, Vue.js, TypeScript
```

Either works — the first optimizes for recruiter keyword search across your actual domain breadth
(evidenced by the 4 engagements), the second optimizes for signaling seniority/leadership scope.
Pick based on whether you're currently prioritizing being found by recruiters vs. making the
leadership scope obvious to a human reader at a glance.

---

## 3. Experience section — fix the dates, then decide how to surface the 4 engagements

### 3a. Date overlap to fix first

Your current role history has an inconsistency worth fixing regardless of anything else in this
guide:

| Role (as shown today) | Dates shown |
|---|---|
| Software Engineer | Feb 2020 – **Jul 2022** |
| Software Engineer II | Oct 2020 – **Jul 2022** |
| Software Engineer III | Oct 2021 – Present |

"Software Engineer" and "Software Engineer II" both end Jul 2022 and overlap each other by ~21
months, and both overlap "Software Engineer III" by 9+ months — reads as three concurrent titles,
which wasn't the case. This is a very common LinkedIn slip: when a promotion is added as a new
position, the previous position's end date doesn't get closed out to match. Suggested corrected
sequence (**verify the exact promotion months against your own records — this is an inferred
best-guess at continuity, not a claim about the real dates**):

| Role | Suggested dates |
|---|---|
| Apprentice | Jul 2019 – Feb 2020 *(unchanged, already correct)* |
| Software Engineer | Feb 2020 – Oct 2020 |
| Software Engineer II | Oct 2020 – Oct 2021 |
| Software Engineer III | Oct 2021 – Present *(unchanged)* |
| Supervisor of the Apprentice Program | Jun 2022 – Present *(unchanged — correctly concurrent with SE III, that one's fine as-is)* |

To fix: open each position via the pencil icon, adjust the end month/year so each IC role ends the
month the next one starts, save.

### 3b. How to surface the 4 client engagements — recommended: LinkedIn's Projects section, not more positions

You could add BuildingLink/Careseekers/HubClick/Sproxxy as four more "positions" nested under
Pernix Solutions (LinkedIn does support multiple positions per company, which is how your current
role progression is already structured). **Don't do this for the client engagements** — it would
read as four more job changes stacked on top of an already-5-deep role history, and would visually
compete with the actual promotion timeline that's the real career-progression story. This is the
same "don't let optional depth overwhelm the primary narrative" finding
[`work-experience-best-practices.md`](./work-experience-best-practices.md) reached for the
portfolio site (§2/§5 there) — it applies to LinkedIn's structure just as much.

**Instead, use LinkedIn's separate "Projects" section** (Add profile section → Recommended → Add
project). This is a purpose-built LinkedIn feature — title, description, associated skills, date
range, optional URL — that maps almost exactly onto the `clientProjects` entries already written
for the site. Add all four as Projects:

---

**Project 1**

- **Name**: `BuildingLink`
- **Dates**: Jun 2025 – Present (check "This is an ongoing project")
- **Skills**: Vue 3, .NET, TypeScript, PostgreSQL, Kafka, AWS, Docker
- **Description** (from `experience.json`, already sanitized — 2000 char limit, this is ~750):

```
Embedded across a 400+ repository micro-frontend and microservice property-management platform — 380+ merged pull requests spanning 57 repositories in 14 months, and still shipping.

• Own the property/unit/occupant domain end to end while its legacy .NET service is being replaced by a new cloud, Postgres-backed implementation, keeping behavior consistent for callers throughout the live migration.
• Delivered two complete modules — bulletin board and building directory — across backend microservice, Vue front end, and the shared generated API client, including authorization, moderation, and notification workflows.
• Maintain the platform-wide shared UI libraries consumed by dozens of downstream micro-frontends, where every change carries platform-wide blast radius.
• Diagnosed a recurring timeout in a high-traffic bulk-write path, and coordinated cross-cutting fixes that had to land simultaneously across six or more independently deployed repositories.
```

---

**Project 2**

- **Name**: `Careseekers`
- **Dates**: Aug 2020 – Sep 2025
- **Skills**: Go, Vue.js, React Native, GraphQL, PostgreSQL, RabbitMQ, AWS, Twilio
- **Description**:

```
Sustained ownership of a home-care and support-worker scheduling platform for five years and through two full rebrands — 369 merged pull requests across its core Go API and Vue admin dashboard.

• Built and maintained the referral-to-shift-to-reminder workflow care coordinators run the business on: referral creation and attachments, multi-caregiver assignment, branch-scoped access control, and an OAuth login migration.
• Decomposed scheduled-job logic out of the monolithic API into dedicated Go microservices for webhook delivery, shift timing, and appointment reminders.
• Carried the codebase through two rebrands with commit history intact, updating CI, environment configuration, and organization references across a dozen-plus repositories each time.
• Kept the React Native support-worker app store-compliant: a Go runtime upgrade, a React Native version upgrade, and an Android 15+ memory page-size compliance fix.
```

---

**Project 3**

- **Name**: `Sproxxy`
- **Dates**: Dec 2022 – May 2023
- **Skills**: Ruby on Rails, Vue 3, TypeScript, PostgreSQL, Cypress, CircleCI
- **Description**:

```
Primary engineer on both sides of a sprint-driven B2B PR and speaker-engagement platform — 149 of 150 pull requests merged in five months, including a from-scratch API rewrite after an early stack pivot.

• Rebuilt the backend on Ruby on Rails after the initial Node/TypeScript prototype was abandoned in the first two weeks, delivering domain models, CRUD, authorization policies, and transactional email on the replacement service.
• Delivered the bulk of the Vue 3 and TypeScript front end: engagement, strategy-plan and task workflows, keyword management, and the product's pitch process.
• Built and maintained a third-party import for company and event data, reconciling an external feed that mapped cleanly onto neither side of the stack.
• Set up CI on both repositories plus backend linting and Cypress end-to-end coverage of authenticated flows, giving the team automated build and lint gates early in the engagement.
```

---

**Project 4**

- **Name**: `HubClick`
- **Dates**: May 2020 – Oct 2020
- **Skills**: Node.js, Express, MongoDB, Redis, React Native, React
- **Description**:

```
Took a home-services booking and job-management product from empty repositories to a repeatable white-label offering in five months — 92 of 94 pull requests merged across backend, mobile app, and web console.

• Built the backend API covering the full domain — users, companies, teams, quotes, services, jobs, and invoices — with authentication, permissions, and automatic invoicing on job completion.
• Shipped a React Native app serving three distinct roles (client, crew, admin) with booking, scheduling, invoice history, and profile management.
• Delivered a React web console for company onboarding, service configuration, and client invitations.
• Templated the app into branded per-client instances, turning a single product into a repeatable white-label offering for multiple home-services businesses.
```

---

**Optional 5th entry**: `Pernix Direct Clients — Insurance & Legal Tech` (Jul 2024 – Mar 2025),
covering `caja-ande-seguros` and the Benchly Word add-in — copy is in `experience.json` under
`pernix-direct-clients` if you want to add it too. Lower priority than the 4 above since it's two
smaller/shorter engagements rather than one named platform.

### 3c. One-line cross-reference from Experience → Projects

Once the 4 Projects entries exist, add one short line to the **Software Engineer III** position's
description (the "Highlights" box — same field shown in your "Add a role" screenshot) pointing a
reader from Experience to Projects, since LinkedIn doesn't otherwise link the two sections:

```
Delivered as the engineer of record on major client engagements including BuildingLink, Careseekers, Sproxxy, and HubClick — see the Projects section below for engagement-specific detail.
```

---

## 4. About section

**Current** (562 characters, well under the 2,600 limit — there's room to say more):

> Results-driven Full-Stack Software Engineer with 5+ years of experience specializing in Node.js,
> Golang, and Vue.js. Proven leadership in team management, project lifecycle oversight, and Agile
> methodologies. Passionate about mentoring developers, optimizing workflows, and delivering
> scalable solutions. Currently pursuing an MBA in Project Management to further enhance strategic
> decision-making and technical leadership.

This is solid and can stay largely as-is — it already leads with years of experience and named
technologies, which matches the "quantify, tech-stack-tag" guidance from
[`work-experience-best-practices.md`](./work-experience-best-practices.md) §1. Two gaps: it
doesn't mention Ruby on Rails or Go by name despite both being "Top skills" per your own profile,
and it says nothing about the multi-client consultancy breadth that's the actual differentiator
found across the 5 engagement reports.

**Suggested revision** (2,340 characters):

```
Results-driven Full-Stack Software Engineer with 5+ years of experience across Go, Ruby on Rails, Vue.js, TypeScript, and Node.js. At Pernix Solutions, I've delivered production work across five distinct client engagements spanning property management, home-care coordination, PR/media, legal tech, and insurance — 1,100+ merged pull requests, several full-stack platforms owned end to end, and one live legacy-to-cloud migration carried out without service interruption.

Proven leadership in team management, project lifecycle oversight, and Agile methodologies as Supervisor of the Apprentice Program, mentoring new engineers through their first production work. Comfortable moving across backend, frontend, and mobile in the same engagement when the work calls for it — from Go microservices and Kafka-backed event pipelines to Vue 3 admin dashboards and React Native mobile apps.

Currently pursuing an MBA in Project Management to further enhance strategic decision-making and technical leadership.
```

Adjust the "1,100+ merged pull requests" figure if you'd rather not lead with a raw number — it's
accurate (sum of merged PRs across the 4 client engagements plus internal Pernix work per the 5
reports) but best-practices §4 supports relativizing instead if you'd prefer: "hundreds of merged
pull requests" reads nearly as strong without the exact figure.

---

## 5. Skills section — reorder, don't just add

**Current state**: "Skills (44)" total, but the two skill *groups* visible in the screenshot are
`Claude Code` (2 skills, backed by "Claude Code 101" and "Claude Code in Action" certificates) and
`Anthropic Claude` (1 skill, backed by "Claude 101"). LinkedIn appears to be surfacing these first
— likely because they're the most recently added/endorsed, not because they're your most relevant
skills for a Software Engineer search.

**Keep the Claude Code / Anthropic certifications** — AI-tooling fluency is a real, current
differentiator worth having on the profile. But **don't let it be first**. Two concrete actions:

1. **Re-pin "Top skills"** (the 3-skill row shown right under About — currently `TypeScript, Ruby
   on Rails, Vue.js, Go (Programming Language)`, 4 shown though the label says "Top skills," so
   LinkedIn may be treating this as top-3-plus-overflow). This widget pulls from your endorsed/
   pinned skills — go to the Skills section, use the "Reorder" option, and move your strongest
   evidenced technologies to the top: `Go, Ruby on Rails, Vue.js, TypeScript, PostgreSQL, AWS,
   GraphQL` are all directly evidenced across the 5 engagement reports and should rank above
   single-course-completion skills.
2. **Cross-check the full 44 against the master list being built in
   [`skills-integration-plan.md`](./skills-integration-plan.md) §3.** That plan's technology gap
   analysis found real, evidenced-but-currently-missing-from-the-portfolio-site skills like
   `.NET`, `Kafka`, `RabbitMQ`, `Twilio`, `Redis`, `Cypress`, `Expo` — worth checking whether
   they're among your 44 LinkedIn skills already, and adding them via "Add skill" (visible in your
   "Add a role" modal screenshot) if not. Since LinkedIn allows tagging skills per-position and
   per-project, tag each new Project entry from §3b with its matching `Skills` list (already
   specified per project above) so the skill shows up both standalone and attributed to the work
   that demonstrates it.

---

## 6. Smaller items worth a pass

- **"Open to Work" banner** currently reads `Software Engineer, Software Engineer, Softwar...` —
  looks like the same or near-duplicate title was entered multiple times in the "job titles"
  field. Edit it to 3 distinct, real target titles (e.g. `Software Engineer`, `Senior Software
  Engineer`, `Full-Stack Engineer`) so the field is doing useful work for LinkedIn's job-matching
  rather than repeating itself.
- **Education**: only "Universidad de Costa Rica" appears in the profile header company/school
  row in the screenshots — the About section mentions an MBA in Project Management currently in
  progress. Confirm the Education section itself has a complete, separate entry for that MBA
  program (school name, degree, field of study, expected graduation date) — it's referenced in
  prose in About but its presence as a structured Education entry isn't visible in what was
  shared, worth double-checking it's actually there and not just mentioned in text.
- **Featured section**: not visible in the screenshots shared — if you don't already have one,
  add it and pin `geovannycordero.com` (already in Contact info) plus, once the site's Projects
  page next.js build is live with the new `caja-ande-seguros` entry from
  [`portfolio-integration-plan.md`](./portfolio-integration-plan.md) §6b, that specific project
  page too — Featured content shows as visual cards above Experience and gets disproportionate
  attention from anyone scanning the profile.
- **Recommendations**: not visible in the shared screenshots. Worth requesting 2-3 from people who
  can speak to different facets found in the research — e.g. someone from the Careseekers/
  BuildingLink engagements who can speak to sustained platform ownership, and someone who can
  speak to the Apprentice Program Supervisor mentoring role, since those are two different
  credibility signals (execution vs. leadership) that a wall of self-written bullets can't fully
  substitute for.

---

## 7. Confidentiality note (same as the portfolio site)

Everything drafted above reuses copy from `experience.json`, which already went through the
sanitization pass described in [`portfolio-integration-plan.md`](./portfolio-integration-plan.md)
§2 — client names stated plainly, specific metrics relativized or kept only where they're not
business-sensitive (PR counts, repo counts), no internal ticket IDs or proprietary architecture
detail beyond what's needed to read as credible. If anything changed about what's OK to name
publicly since that pass, revisit this file's Project descriptions in step with the site's.

---

## 8. Suggested order of operations

1. Fix the Software Engineer / Software Engineer II date overlap (§3a) — quick, mechanical, no
   copywriting judgment needed.
2. Update the headline (§2) — one field, immediate.
3. Add the 4 (or 5) Projects entries (§3b) — the highest-leverage change here, and the copy is
   already written above.
4. Add the one-line cross-reference to the Software Engineer III position (§3c).
5. Swap in the revised About section (§4), or leave as-is if you'd rather keep it shorter — it
   was already solid before this pass.
6. Reorder Top Skills and audit the full 44 against the gap list (§5) — lowest urgency, do this
   once [`skills-integration-plan.md`](./skills-integration-plan.md) has an approved master list
   so you're cross-checking against something final rather than doing it twice.
7. Pass through §6's smaller items (Open to Work titles, Education, Featured, Recommendations) as
   time allows — none of these block the higher-impact items above.
