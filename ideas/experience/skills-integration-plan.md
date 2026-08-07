# Skills Section Update Plan

This plan describes how to update `components/skills.tsx` using the technology evidence now sitting
in `app/experience/data/experience.json` and `app/projects/data/projects.json` (both implemented
per [`portfolio-integration-plan.md`](./portfolio-integration-plan.md)). Document only — no site
code has been changed yet.

## 1. Gap analysis — what the implemented data actually shows

Computed the full technology union from `experience.json` (Pernix + 4 client engagements) and
`projects.json` (6 project entries, now including `caja-ande-seguros`) and diffed it against the
hardcoded list in `components/skills.tsx`.

**Evidenced technologies missing from the current Skills section:**

| Technology | Where it's evidenced |
|---|---|
| `.NET` | BuildingLink — legacy `Properties` microservice ownership |
| `Kafka` | BuildingLink — event-driven backend |
| `RabbitMQ` | Careseekers — cron/webhook microservices |
| `Twilio` | Careseekers — SMS integration |
| `React` | HubClick (web console), Pernix direct clients (Benchly add-in) — distinct from React Native, which was already listed |
| `Redis` | HubClick — backend cache/queue |
| `Express` | HubClick — Node.js backend framework |
| `Expo` | HubClick — React Native tooling |
| `Heroku` | Pernix direct clients — `caja-ande-seguros` deployment |
| `Pinia` | Sproxxy — Vue state management |
| `Cypress` | Sproxxy — E2E test coverage |
| `Next.js` | This site itself, plus `projects.json` (Barbershop, DC Drip, LG Landscaping) |
| `Prisma` | `projects.json` (Barbershop, DC Drip) |
| `Jest`, `ESLint`, `Prettier` | This site itself and every `projects.json` entry — currently absent from Skills entirely, despite being used on every listed project |
| `RailsAdmin`, `Stimulus` | `caja-ande-seguros` — Rails ecosystem detail, minor |

**Entries currently in `skills.tsx` with no supporting evidence in either data file:**

`Vuetify`, `MySQL`, `CouchDB`, `GitLab`. This doesn't mean they're wrong — the same caveat from
`portfolio-integration-plan.md` §1 applies (GitHub search only covers what's in these 5 orgs plus
this repo; real skills from before Dec 2022 or from work outside tracked repos won't show up).
**Flag these for the user to confirm** rather than silently removing them — same "don't let
absence-of-evidence silently overwrite a real fact" rule used for the July 2019 start date.

**Structural issue independent of content**: `Ruby on Rails` and `Golang` are listed under both
"Programming Languages" and "Backend Technologies" today (the existing Skills test even asserts
`getAllByText(...)).toHaveLength(2)` for this). That's a framework miscategorized as a language —
worth fixing while touching this section anyway, not just adding new badges on top of it.

## 2. Reuse the same data-driven pattern (again)

Same rationale as the Experience refactor: `skills.tsx` is currently hardcoded inline, while
`/projects` and (now) `/experience` both read from a JSON file via a typed `lib/*.ts` accessor.
Bring Skills in line rather than leaving it the odd one out:

- **`app/skills/data/skills.json`** — array of `{ title: string; skills: string[] }` categories,
  matching the existing shape almost exactly (it's already close to data-shaped — this mostly
  moves the literal array out of the component).
- **`lib/skills.ts`** — mirrors `lib/projects.ts`/`lib/experience.ts`: import the JSON, type it,
  export `getSkillCategories()`.
- **`components/skills.tsx`** — same render logic as today, sourced from `getSkillCategories()`
  instead of the inline array. This is a smaller change than the Experience refactor was — no new
  interactive UI, no accordion, just swapping the data source.

## 3. Revised category structure

Keep the existing card-grid layout (it works, and best-practices research from the Experience plan
never flagged tag/badge grids as a problem — the "scannable in 30 seconds" concern was specific to
narrative/impact content, not a flat skills list). Revise the categories themselves based on the
gap analysis:

| Category | Contents |
|---|---|
| Programming Languages | Go/Golang, Ruby, JavaScript, TypeScript |
| Frontend Frameworks & Libraries | Next.js, Vue.js (2 & 3), React, React Native, Expo, Pinia, TailwindCSS |
| Backend Frameworks & APIs | Ruby on Rails, Express, .NET, GraphQL |
| Databases & Caching | PostgreSQL, MongoDB, Redis, MySQL*, CouchDB* |
| Messaging & Integrations | Kafka, RabbitMQ, Twilio |
| Cloud & DevOps | AWS (EC2, ECS, ECR, RDS, Lambda), Docker, Heroku, CI/CD, GitHub Actions, CircleCI |
| Testing & Code Quality | Jest, Cypress, ESLint, Prettier |
| Version Control | Git, GitHub, GitLab* |
| Soft Skills | unchanged |
| Languages (spoken) | unchanged |

\* = flagged in §1 as unevidenced by the gathered data; confirm with the user before finalizing
rather than dropping automatically.

This adds two new categories (Messaging & Integrations, Testing & Code Quality) rather than
overloading the existing "Backend Technologies" and "Databases" buckets with unrelated tech —
Kafka/RabbitMQ/Twilio are integration/messaging concerns, not databases, and testing tools didn't
have a home at all before despite being used on every single project in `projects.json`.

## 4. Confidentiality — much lower stakes here than the Experience section

`portfolio-integration-plan.md` §2 spent real effort on what's safe to name because that plan
surfaced business logic, PR counts, and architecture narratives from specific private clients.
Skills is just a list of technology names with no client attribution attached — "used Kafka" and
"used .NET" don't reveal anything proprietary about BuildingLink. **No confidentiality review
needed for this plan** — the only open question is the evidence-gap flag in §1, which is an
accuracy question, not a confidentiality one.

## 5. Regression check — keep the list from silently going stale

Rather than one-time-syncing the list and letting it drift again, add a small Jest test that
enforces the two data files and `skills.json` stay in sync going forward:

- New test (e.g. `__tests__/lib/skills-sync.test.ts`): compute the technology union from
  `projects.json` + `experience.json` (same logic used for the gap analysis in §1), and assert
  every technology is present *somewhere* in `skills.json`'s flattened skill list.
- Needs a small alias/normalization map for cosmetic mismatches that aren't real gaps (`"Golang"`
  vs `"Go"`, `"Vue.js"` vs `"Vue 3"`, `"Tailwind CSS"` vs `"TailwindCSS"`) — a plain object literal,
  not a fuzzy-matching library; this is exactly the kind of "one line before fifty" case.
- This is the one piece of non-trivial logic this change introduces (a set-diff with an alias
  table), so per this project's own testing bar it's the one thing that needs a dedicated check —
  everything else in this plan is either markup or a straight data move.

## 6. Existing test updates

`__tests__/components/Skills.test.tsx` currently asserts the miscategorized duplicates directly
(`getAllByText('Golang')).toHaveLength(2)`, same for `'Ruby on Rails'`) — once §1's structural fix
lands (each tech in exactly one category), update those two assertions to `toHaveLength(1)` and
add coverage for at least one newly-added category (e.g. assert `'Testing & Code Quality'` and
`'Jest'` render), so the test suite reflects the corrected structure rather than encoding the bug
as expected behavior.

## 7. Verification — Playwright MCP pass required, same as the Experience rollout

Per the same requirement applied to the Experience change: run `yarn test`, `yarn lint`,
`yarn type-check`, then verify in-browser with the Playwright MCP tools before merging:

- Load the page, scroll to `#skills`, and confirm all categories render with `browser_snapshot`.
- Confirm no category ends up empty and no badge duplicates within a single category
  (`browser_snapshot`/`browser_take_screenshot`).
- Check light and dark theme via `browser_resize`/theme toggle, since the badge styling here is
  the same emerald token set used elsewhere and hasn't changed, but the data source has.
- Check `browser_console_messages` for hydration/runtime errors after switching from a hardcoded
  array to a JSON import, same hydration-risk reasoning as the Experience refactor (static export,
  `output: 'export'`).

## 8. Suggested rollout order

1. Confirm with the user on the four unevidenced entries in §1 (`Vuetify`, `MySQL`, `CouchDB`,
   `GitLab`) — keep, drop, or replace each based on their own knowledge, not GitHub absence alone.
2. Finalize the category table in §3 with that input.
3. Implement `skills.json` / `lib/skills.ts` / `skills.tsx` swap, the §5 sync test, and the §6 test
   updates as one PR.
4. Run the full check from §7 before merging.

## 9. What this plan deliberately does not do

- Does not auto-generate `skills.json` at build time from `projects.json`/`experience.json` —
  categorization (which bucket a technology belongs in, plus soft skills and spoken languages that
  have no source-repo equivalent) needs human curation; the §5 test keeps it honest without making
  it fully derived, which would be over-engineering a flat list of badges.
- Does not change the visual design of the Skills section — the existing card-grid layout has no
  documented problem, only the data source and categorization did.
- Does not remove the four unevidenced entries unilaterally — §8 step 1 defers that to the user.
