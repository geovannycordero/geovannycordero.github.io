# Portfolio Integration Plan — Work Experience Section

This plan describes how to fold the research in [`reports/`](./reports/) into the live site at
`/Users/gehovah/Projects/personal/geovannycordero.github.io`. It is a **document only** — no
site code has been changed. Treat it as a proposal to review before any implementation PR.

The UI/UX and content decisions below (nested expandable cards, impact-first copy,
confidentiality handling, inline-vs-link-out depth) are grounded in
[`work-experience-best-practices.md`](./work-experience-best-practices.md) in this same folder —
general research into how effective developer/consultancy portfolios structure a
one-employer/multiple-client-engagement history. Where a decision below traces directly to that
research, it's cited by section number (e.g. "per best-practices §2").

## 1. What the research actually found (consolidated timeline)

| Engagement | Org | Evidenced dates (GitHub) | PRs (merged) | Repos touched |
|---|---|---|---|---|
| HubClick | `hublick` | May 2020 – Oct 2020 | 94 (92) | 3 core + 4 white-label |
| Careseekers | `Careseekers-Pty-Ltd` | Aug 2020 – Sep 2025 | 384 (369) | ~22 with real activity |
| Sproxxy | `sproxxy-dev-stack` | Dec 2022 – May 2023 | 150 (149) | 2 active |
| Pernix internal client work | `Pernix-Solutions` | Jul 2024 – Mar 2025 | 81 (79) | 2 client + 1 training |
| BuildingLink | `BuildingLink` | Jun 2025 – **Present** | 425 (381) | 57 |

**Important discrepancy to resolve before publishing anything:** the site's current
`components/experience.tsx` states the Pernix Solutions employment as **"July 2019 - Present."**
The earliest activity any of the 5 research agents could find under the `geovannycordero`
GitHub identity is **December 2022** (an internal onboarding repo). That's a ~3.5 year gap. This
almost certainly means real work from 2019–2022 exists under a different GitHub account/email,
on repos this token can't see, or wasn't tracked in git at all — it does **not** mean the current
site's start date is wrong. **Do not let the GitHub-derived dates overwrite the existing "July
2019" employment start date** — keep that as the authoritative top-level date, and use the
per-engagement GitHub dates only for the nested client-project entries. Flag this gap to the user
directly rather than silently reconciling it.

## 2. Confidentiality check — do before writing any public copy

These are all **private employer/client repos** accessed with the user's own legitimate
credentials for internal research purposes. Whether it's OK to **publicly name** BuildingLink,
Careseekers, HubClick, and Sproxxy, and describe their internal architecture (proprietary
migration strategy, module names, ticket prefixes) on a public portfolio site is a separate
question the reports can't answer — it depends on the actual consulting/employment agreement and
any client NDAs. **Recommend confirming with the user before drafting public copy.**

Best-practices §4 gives concrete handling guidance once that's confirmed, rather than a blanket
"omit everything" default:

- **Client names are very likely fine to state as-is** — these are the actual named clients of a
  consultancy relationship, not leaked confidential parties. The sensitivity is much more likely
  to sit in specific business metrics, proprietary architecture/security detail, or unreleased
  features — that's where to apply judgment, not on the company name itself.
- **Generalize deliberately, don't just delete the name.** "Insufficient scrubbing" — removing the
  client name but leaving exact PR counts, internal ticket prefixes (`UNIT-`, `BDN-`,
  `SPROXXY-`), or distinctive architecture descriptions in place — defeats the purpose if the
  client would otherwise want anonymity. Round or relativize instead of stripping entirely: "cut
  bulk-occupant-creation timeouts substantially" rather than "fixed `PRPTS-813`, 9 follow-up PRs."
- **Prefer relative results over absolute figures** where numbers matter for impact: "reduced
  release friction by moving X to automated CI" reads just as strong as an exact percentage and
  doesn't leak business-sensitive data.
- **Label deliberate generalization.** A short, explicit note ("details generalized for client
  confidentiality") reads as professionalism, not evasiveness — use it rather than silently
  vague-ing a bullet and hoping no one notices.
- The 5 reports in `reports/` are written for the user's own reference and contain internal-only
  detail (ticket IDs, PR counts, full architecture names) on purpose — the portfolio copy should
  be a **separate, much shorter, sanitized rewrite** per the copywriting guidance in §3a below,
  not a paste of the report content.

## 3. Reuse the existing data-driven pattern (no new architecture)

The `/projects` page is already data-driven: `app/projects/data/projects.json` (typed via
`Project` interface) + `lib/projects.ts` (`getAllProjects()`). `components/experience.tsx`, by
contrast, is currently one hardcoded `Card` with no backing data file. Bring it in line with the
same pattern instead of inventing something new:

- **`app/experience/data/experience.json`** — one entry (Pernix Solutions), matching today's
  copy/dates/tech list exactly, plus a new `clientProjects` array with one sanitized entry per
  engagement (HubClick, Careseekers, Sproxxy, BuildingLink — Pernix-internal client work like
  `caja-ande-seguros`/`ezbriefs-benchly` can be folded in too, but note in copy that these are
  Pernix's own clients, not the same tier as the 4 named engagements).

  ```ts
  export interface ClientProject {
    id: string;
    name: string;
    period: string; // e.g. "Jun 2025 - Present"
    impactSummary: string; // 1-2 impact-quantified lines, ALWAYS visible (collapsed or not) — best-practices §1/§Recommendation-2
    highlights: string[]; // 2-4 fuller STAR-shaped bullets, shown only when expanded — best-practices §1
    technologies: string[]; // rendered even when collapsed, so stack is scannable without expanding — best-practices §Recommendation-2
  }

  export interface Experience {
    id: string;
    company: string;
    role: string[];
    period: string;
    location: string;
    summary: string;
    achievements: string[];
    technologies: string[];
    clientProjects: ClientProject[];
  }
  ```

  The split between `impactSummary` (always visible) and `highlights` (expand-only) isn't
  cosmetic — it's the specific mechanism best-practices §1/§3/Recommendation-2 point to for
  hitting the "recruiter decides in ~30 seconds" constraint: the collapsed row has to carry a real
  impact statement and the tech stack on its own, not just a name and a date, or collapsing loses
  its point.

- **`lib/experience.ts`** — mirrors `lib/projects.ts`: import the JSON, type it as `Experience[]`,
  export a `getExperience()` accessor. No sorting logic needed for a single entry today, but
  keeping the array shape means a second employer can be added later without a rewrite.

- **`components/experience.tsx`** — replace the hardcoded `Card` contents with a render from
  `getExperience()`. Keep the existing header/achievements/technologies markup as-is (it already
  matches the design system and passes its tests) and add a new **"Client Engagements"**
  subsection below "Technologies Used" that maps over `clientProjects`.

### 3a. Copywriting guidance for `impactSummary` / `highlights` (best-practices §1)

This is the actual bottleneck step (see §6) — apply it when drafting the sanitized copy, not just
when writing code:

- **Outcome over task.** "Built the referral-management API" is a task; "Rebuilt referral
  management to cut manual coordinator follow-ups, sustained across 2.5 years of the platform's
  core workflow" is impact. Every `impactSummary` line should name a result or a scale, not just
  an activity.
- **Compressed STAR shape for `highlights`**: brief context → what was owned → what was done →
  the measurable/observable result. Doesn't need the literal four labels, just that underlying
  shape, so each bullet reads as substantive rather than generic.
- **Quantify honestly, relativize when exact numbers are sensitive** — e.g. "425 PRs shipped
  across 57 repos over 14 months, still active" (from the BuildingLink report) is already a real,
  usable number; something like an internal performance-fix ticket is better stated as "resolved
  a recurring timeout under bulk load" than by citing the exact internal ticket ID.
- **Surface role/scope progression if evidenced.** The existing Pernix card already does this well
  (two badges: "Software Engineer III" and "Apprentice Program Supervisor") — carry that pattern
  into the client engagements too where the reports show it, e.g. BuildingLink's sustained
  ownership of shared platform-wide UI components is a trust/scope signal worth a dedicated line,
  not folded into a generic bullet.

## 4. Client-engagement UI — native `<details>`, no new dependency

`components/ui/` currently only has `badge.tsx`, `button.tsx`, `card.tsx`, and
`dropdown-menu.tsx` — **there is no accordion component installed**, and `package.json` has no
`@radix-ui/react-accordion`. Best-practices §3 independently converges on the same answer here:
native `<details>`/`<summary>` gets keyboard support, focus management, and expand/collapse state
for free, and is called out explicitly as the case where "best practice" and "least code" happen
to coincide — no custom `aria-expanded`/`role="region"` wiring needed unless custom open/close
animation is required later (it isn't, today).

The one structural change from a naive accordion: `impactSummary` and the tech `Badge`s must
render **inside `<summary>`, not inside the collapsible body** — best-practices §1/§3 are explicit
that a collapsed accordion row has to carry its own impact statement and stack tags, or the
"scannable in 30 seconds without opening anything" property is lost. Only the fuller
`highlights` list is gated behind expansion:

```tsx
<details className="group rounded-lg border border-emerald-200 dark:border-emerald-800 p-4">
  <summary className="cursor-pointer list-none">
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
      <span className="font-medium text-emerald-800 dark:text-emerald-400">{project.name}</span>
      <span className="text-sm text-sage-500">{project.period}</span>
    </div>
    <p className="mt-1 text-sage-700 dark:text-slate-300">{project.impactSummary}</p>
    <div className="flex flex-wrap gap-2 mt-2">
      {project.technologies.map(t => <Badge key={t} variant="secondary">{t}</Badge>)}
    </div>
  </summary>
  <ul className="mt-3 space-y-1 pl-1">
    {project.highlights.map(h => <li key={h}>{h}</li>)}
  </ul>
</details>
```

This reuses the existing `Badge` component and Tailwind tokens already in `experience.tsx` —
no new dependency, no new design language.

**Accessibility notes carried over from best-practices §3** (mostly already satisfied by using
native `<details>`, worth checking explicitly rather than assuming):
- `<summary>` is natively focusable and Tab/Enter/Space-operable — don't wrap it in an extra
  clickable element or intercept its click handler.
- Don't suppress `:focus-visible` on the `<summary>` in the Tailwind classes above.
- Each client-engagement `name` should read sensibly to a screen reader landing on the
  `<summary>` alone (it's the accessible name) — front-load the client/project name, not the
  period, in the DOM order (the JSX above already does this).
- Manually test with Tab/Shift+Tab/Enter/Space and one screen reader (VoiceOver is enough on
  macOS) before merging, per best-practices §3 — this is cheap to skip and easy to regress
  silently since `<details>` mostly "just works" until it doesn't.

## 5. Tests

`__tests__/components/Experience.test.tsx` currently asserts hardcoded strings ("pernix
solutions", achievement counts). After the refactor:
- Update assertions to read from the same `experience.json` fixture (import it in the test, or
  keep a small inline fixture) rather than hardcoded literals, so the test doesn't silently drift
  from the data file.
- Add one assertion that each client engagement's `name` and `impactSummary` render in the
  `<summary>` (visible without interaction), and that expanding one (`userEvent.click` on the
  `<summary>`) reveals its `highlights` — this is the one piece of new non-trivial behavior (the
  expand/collapse, plus the collapsed-vs-expanded content split from §3a) that needs a check, per
  this project's own testing-coverage bar.

## 6. Merging with `/projects` — what actually overlaps and how to cross-reference it

### 6a. Checked for real overlap — here's what's actually the same vs. actually different

Traced each current `/projects` "Outsourcing"/"Work" entry back to its GitHub source to check
whether it's the *same underlying engagement* as anything in `reports/`, rather than assuming from
titles alone:

| `/projects` entry | Actual source | Same as a researched engagement? |
|---|---|---|
| DC Drip Website | `geovannycordero/dc-drip-v0` (personal account) | **No** — personal freelance, unrelated org |
| LG Landscaping Services | `geovannycordero/lg-services-v0` (personal account) | **No** — personal freelance, unrelated org |
| Barbershop Studio | `geovannycordero/barbershop-app-v0` (personal account) | **No** — personal freelance, unrelated org |
| 4MK Firearms LLC Website | dedicated org `4MKFirearmsLLC` (member org, separate from Pernix) | **No** — own client org, unrelated to Pernix |
| Charts Example | `geovannycordero/vue-project-nist-charts-example` (personal account) | **No** — personal/demo repo |

**Conclusion: none of today's 6 `/projects` entries are duplicates of the 5 researched
engagements.** They're a genuinely separate stream — direct personal freelance work (own GitHub
account or a dedicated client org) that has nothing to do with the Pernix Solutions employment
being documented in `reports/`. There's no row to merge or dedupe here. What *is* true, and is
presumably what prompted this check, is that both streams share the same **`category:
'Outsourcing'`** concept — client website/product work outside pure personal projects — just
arrived at via two different paths (direct freelance vs. employer-staffed engagement). That's a
taxonomy overlap, not a data overlap, and it's what §6b below addresses.

### 6b. One real candidate to add to `/projects`: `caja-ande-seguros`

Of everything in the 5 reports, exactly one item is shaped like an existing `/projects` entry:
**`caja-ande-seguros`** (from `reports/pernix-solutions.md`) — a live public production website
(cajadeandeseguros.cr, Ruby on Rails + JS, 58 PRs) built end-to-end for a named insurance-agency
client. That's structurally identical to DC Drip / LG Landscaping / Barbershop Studio: a real
public URL, a small/mid-business marketing site, full build ownership — it just happened to be
delivered *through* Pernix Solutions instead of as direct personal freelance. Recommend adding it
to `projects.json` as a new `category: 'Outsourcing'` entry using the same shape as the existing
ones.

`ezbriefs-benchly` (also from the same report) is a closer call — no public marketing URL (it's a
Word add-in, not a website), similar in that sense to the existing `Charts Example` entry which
also has an empty `projectUrl`. Optional to add; lower priority than `caja-ande-seguros`.

The other 4 named engagements (BuildingLink, Careseekers, HubClick, Sproxxy) are **not** good
`/projects` candidates: they're internal B2B/enterprise platforms (property management, care
coordination, PR workflow, booking/invoicing back office) with no public marketing URL to link to,
and publicly screenshotting a client's internal admin tooling is exactly the kind of thing §2's
confidentiality guidance says to be careful about. Keep these Experience-only.

### 6c. Cross-reference mechanism (small, additive, no rewrite of either data file)

Rather than duplicating description/tech-list text between `experience.json` and `projects.json`
for the one case where both exist, add two **optional** fields — additive to both existing
interfaces, nothing existing has to change:

```ts
// lib/projects.ts — Project interface
export interface Project {
  // ...existing fields unchanged...
  employer?: string; // e.g. "Pernix Solutions" — omitted for direct/personal freelance entries
  experienceEntryId?: string; // e.g. "pernix-solutions" — links back to an Experience.id
}

// lib/experience.ts — ClientProject interface (from §3)
export interface ClientProject {
  // ...existing fields unchanged...
  relatedProjectId?: string; // e.g. "caja-ande-seguros-website" — links to a Project.id when a public /projects entry exists for this engagement
}
```

Concrete application: give the new `caja-ande-seguros` entry in `projects.json` `employer:
"Pernix Solutions"` and `experienceEntryId: "pernix-solutions"`; give its corresponding
`ClientProject` entry in `experience.json` `relatedProjectId: "caja-ande-seguros-website"` (or
whatever `id` is chosen). Then:
- `/projects` can optionally render a small "Delivered while at Pernix Solutions" attribution when
  `employer` is set (skip it entirely for DC Drip/LG Services/Barbershop/4MK — they stay exactly
  as they are, no field needed).
- The Experience accordion's expanded view can render a "View full project →" link to the matching
  `/projects` entry instead of re-describing it — this is the concrete mechanism for the
  link-out-instead-of-duplicate principle from best-practices §5.

This is intentionally the smallest change that closes the loop: two optional fields, one new
`/projects` entry, one link. It does not merge the two data files into one schema or restructure
either page — `/projects` and `Experience` remain separate sections serving different purposes
(career narrative vs. showcase catalog), per §6a/§6b's finding that they're mostly non-overlapping
content, with a link where they genuinely do overlap.

The principle from best-practices §5 still holds for everything else: keep each `clientProjects`
entry **summary-level even when expanded**. If a specific engagement later gets rich enough to
deserve a full case-study writeup (screenshots, a problem→solution narrative), that content
belongs as its own `/projects` entry linked via `relatedProjectId` — not grown inline into a mini
case study inside the Experience accordion. This keeps the single-page scroll scannable per
best-practices §5's core finding: single-page/inline only works while the content per item stays
genuinely short-form.

## 7. Suggested rollout order

1. User reviews the 5 reports and the confidentiality questions in Section 2, decides what's
   public-safe to name and how much detail to include.
2. Draft the sanitized `clientProjects` copy using the §3a guidance (impact-first `impactSummary`,
   STAR-shaped `highlights`, relativized numbers where needed) — this is a writing task, not a
   coding task, and is the actual bottleneck here.
3. Implement `experience.json` / `lib/experience.ts` / the `experience.tsx` refactor / test
   updates as one PR, using the copy from step 2 and the collapsed/expanded split from §4.
4. Run `yarn test`, `yarn lint`, `yarn type-check`, then start `yarn dev` and verify in-browser
   with the **Playwright MCP tools** before merging — this is the actual end-to-end check, not a
   substitute for step 4a/4b below:
   - Load the page and confirm each client engagement's `name`, `period`, `impactSummary`, and
     tech `Badge`s render **collapsed by default** (`browser_snapshot`/`browser_take_screenshot`).
   - Click each `<summary>` (`browser_click`) and confirm `highlights` appear on expand and
     disappear on re-collapse.
   - Do the keyboard pass from §4's accessibility notes through Playwright itself
     (`browser_press_key` with Tab/Shift+Tab/Enter/Space) — confirm each `<summary>` is reachable
     in order and toggles via Enter/Space, and that focus is visibly indicated
     (`browser_snapshot` to inspect the a11y tree, `browser_take_screenshot` to visually confirm
     the focus ring isn't suppressed).
   - Resize the viewport (`browser_resize`) to check both light and dark theme, and both mobile
     and desktop widths, since `experience.tsx` uses responsive `sm:` breakpoints throughout.
   - Check the browser console (`browser_console_messages`) for hydration or runtime errors after
     the data-driven refactor, since this is a static-export site (`output: 'export'`) where
     hydration mismatches are a real risk when switching a component from hardcoded JSX to
     JSON-driven rendering.
   This Playwright pass is required for this change specifically, on top of (not instead of) the
   existing Jest suite in §5 — Jest verifies the component logic in isolation, Playwright verifies
   it actually works in a real rendered page per this repo's own guidance to test UI changes in a
   browser before calling them done.

## 8. What this plan deliberately does not do

- Does not add a new UI dependency (accordion) when the native `<details>` element covers the
  need and is independently the best-practices-recommended choice here — YAGNI.
- Does not turn the Experience section into a set of mini case studies — deeper content belongs on
  `/projects` per §6, not inline.
- Does not merge `experience.json` and `projects.json` into one unified schema — §6a found the two
  data sets are mostly non-overlapping (different freelance streams), so §6c only adds optional
  cross-reference fields for the one case (`caja-ande-seguros`) where a real link is warranted.
- Does not draft the final public-facing copy itself — that requires the user's confidentiality
  decision from Section 2 first, and is a content/writing step, not something to pre-empt with
  code changes.
