# Work Experience Section — Best Practices Research

Research into how effective developer/software-engineer portfolios present the "Work
Experience" section, with a focus on the scenario of **one employer, multiple distinct
client engagements** (a consultancy/agency situation). This is general best-practice
research; it does not repeat the site-specific implementation plan in
`portfolio-integration-plan.md` in this same folder.

---

## 1. Content Structure

**Recruiters skim, they don't read.** Roughly 80% of recruiters spend under three minutes
on a portfolio, and many decide within the first 30 seconds whether a candidate is worth
a closer look. This means the experience section has to communicate value at a glance,
with detail available for those who want to dig in.

Key structural patterns that work well:

- **Impact-focused bullets over task lists.** "Built X" is a task; "Reduced page load
  time by 40% by rebuilding the checkout flow in Next.js" is impact. Hiring
  professionals consistently prefer outcome-oriented bullets — one widely cited
  LinkedIn survey found 78% of hiring pros prefer bullets that show outcomes over
  duties.
- **STAR-style framing (Situation/Task/Action/Result), compressed.** You don't need
  the literal four-part structure on a portfolio (that's more for interview answers or
  formal resumes), but the underlying shape — brief context, what you owned, what you
  did, the measurable result — is exactly what makes a bullet point read as
  substantive rather than generic.
- **Quantify wherever honestly possible**: percentage improvements, time saved, users/
  scale handled, error/defect reduction, revenue or cost impact. When exact numbers are
  confidential, relative framing (e.g., "cut deployment time by ~60%" instead of raw
  minutes) still lands the point without disclosing proprietary figures.
- **Tech-stack tagging per role/engagement** (badges/chips) lets a scanning recruiter
  pattern-match your stack against the job req in a second, without reading prose.
- **Role progression / titles over time** matters when it exists — if a title or scope
  changed within the same employer, surfacing that (e.g., "Software Engineer → Senior
  Software Engineer") signals growth and is worth calling out explicitly rather than
  burying it in a single undifferentiated block.
- **What hiring managers say they scan for first**, based on recurring survey data:
  problem-solving evidence (very commonly cited as the top signal), evidence of range
  across different types of projects, and — especially for teams involving cross-
  functional or client-facing work — communication/collaboration skills. Clean,
  well-organized presentation is itself read as a signal of professionalism and
  attention to detail.

Sources:
[TieTalent — Beyond the ATS](https://tietalent.com/en/blog/220/beyond-the-ats-how-to-build-a-tech-portfolio),
[Scale.jobs — Portfolio Content for Tech Jobs](https://scale.jobs/blog/portfolio-content-for-tech-jobs-what-recruiters-want),
[Hakia — Developer Portfolio Guide 2026](https://hakia.com/skills/building-portfolio/),
[Pesto — What Recruiters Look for in Developer Portfolios](https://pesto.tech/resources/what-recruiters-look-for-in-developer-portfolios),
[ResumeBuilder.com — STAR Resume](https://www.resumebuilder.com/career-center/star-method-resume/),
[TealHQ — STAR Method Resume](https://www.tealhq.com/post/star-method),
[Columbia Career Education — Resumes with Impact](https://careereducation.columbia.edu/resources/resumes-impact-creating-strong-bullet-points)

---

## 2. Information Hierarchy for Multi-Project / Client-Engagement Roles

This is the crux of the redesign: one employer (Pernix Solutions), several named client
engagements, each with its own timeframe, summary, highlights, and stack.

**How consultancies/agencies typically structure this on resumes and portfolios:**

- Group everything under **one employer entry** with the full employment date range
  (e.g., "Pernix Solutions — July 2019–Present"), then list each **client engagement as
  a sub-entry** with its own narrower date range nested inside. This mirrors how career
  coaches recommend handling consulting resumes: keep the parent company name and dates
  as the anchor, and annotate each project underneath with something clarifying its
  duration/nature (e.g., "6-month engagement") so it doesn't read as unexplained job-
  hopping.
- A **project-portfolio mindset** (vs. a rigid chronological resume mindset) is
  explicitly recommended for consultants: it lets you reorder/re-emphasize different
  engagements depending on what a given reader cares about, and it's the natural fit
  for a web portfolio (unlike a PDF resume, a webpage can let the visitor choose what
  to expand).

**Comparing the layout options directly for this scenario:**

| Pattern | Best fit | Tradeoffs |
|---|---|---|
| **Nested/expandable cards** (one parent employer card, each client engagement as a collapsible child) | Exactly this scenario — single employer, several engagements, need to keep the page short by default | Requires accessible accordion/disclosure implementation; must avoid nesting so deep it confuses screen-reader users |
| **Flat vertical timeline** (every engagement as its own timeline node, employer shown as a grouping label/color) | Good when you want to visually communicate continuous tenure and career progression at a glance | Can get visually noisy with 3+ concurrent-looking entries under one employer; harder to show "these are all under one job" without extra labeling |
| **Separate case-study pages** (one URL per engagement) | Best when a given engagement has enough unique visual/technical depth to merit deep treatment (a case study, not a summary) | Adds navigation overhead; for a recruiter who's scanning, this is too much friction as the *default* view — better as an optional "read more" |
| **Filterable project grid** (tag-driven grid of all client work, filterable by stack/domain) | Better suited to the separate `/projects` page (already exists on this site) than to the narrative "Experience" section, which is more about career story than searchable catalog | Grid presentation flattens the "one employer, several engagements" relationship unless explicitly labeled |

**Recommendation embedded in the research**: nested/expandable cards (accordion pattern)
under a single employer header is the pattern most explicitly matched to "one employer,
multiple client engagements," and it's the one most portfolio/UX sources point to for
handling exactly this kind of hierarchical, optional-depth content — collapse to reduce
cognitive load, expand for detail on demand.

Sources:
[JibberJobber — Consulting or Multiple Positions at Same Company on a Resume](https://www.jibberjobber.com/blog/2017/08/04/ask-the-coach-2-consulting-or-multiple-positions-at-same-company-on-a-resume-how-to/),
[ConsultingSuccess — One Project, Many Clients](https://www.consultingsuccess.com/one-project-many-clients-how-to-succeed),
[AccruePartners — Building a Project Portfolio](https://www.accruepartners.com/building-a-project-portfolio-to-unlock-consulting-opportunities),
[Eleken — Accordion UI Examples](https://www.eleken.co/blog-posts/accordion-ui),
[HubSpot — Accordion Design](https://blog.hubspot.com/website/accordion-design)

---

## 3. Visual/UX Patterns

**Timeline vs. accordion vs. card grid vs. simple list — pros and cons:**

- **Vertical timeline**: strong for communicating chronology and career progression at
  a glance (this is the pattern used by well-known dev portfolios like
  [Brittany Chiang's](https://brittanychiang.com/), which pairs a timeline with a
  work-history carousel/tab interaction). Downside: doesn't natively express "these five
  things all happened under one employer" without an explicit grouping/label layer.
- **Accordion / expand-collapse cards**: ideal for content that's logically divided and
  not all needed at once by every visitor — the textbook use case includes exactly this
  kind of "summary visible, detail on demand" content. Keeps the default page short
  (good for the scan-in-30-seconds recruiter) while letting an interested reader open
  each engagement. This is the pattern most directly recommended for hierarchical,
  optional-depth content like nested client engagements.
- **Card grid**: best when items are peers meant to be compared/scanned side by side
  (e.g., the existing `/projects` page). Less natural for expressing a parent/child
  employer→engagement relationship; better suited to flat collections.
- **Simple list**: lowest effort, most scannable, but flattens hierarchy and loses the
  "expand for depth" affordance — best only if there's truly little detail to hide.

**Accessibility considerations for the accordion/expand pattern (the one most relevant
here), based on WCAG guidance:**

- Use real semantic elements: a `<button>` as the trigger (not a clickable `<div>` or a
  bare link), wrapped in an appropriate heading level (`<h3>`/`<h4>`) so screen-reader
  users can navigate by heading.
- `aria-expanded="true|false"` on the trigger button, `aria-controls` pointing to the
  panel `id`, and the panel itself using `aria-labelledby` back to the trigger.
- Every trigger must be reachable via normal Tab order; Enter/Space must toggle it;
  visible focus indicators must never be suppressed (don't override `:focus-visible`).
- The simplest fully-accessible implementation is the native HTML `<details>`/
  `<summary>` pair — it gets focus management, keyboard support, and expanded/collapsed
  state for free, at the cost of less animation control. If custom animation is needed,
  fall back to the manual button + `aria-expanded` + `role="region"` pattern above.
- Test with an actual keyboard (Tab/Shift+Tab/Enter/Space) and at least one screen
  reader (VoiceOver is sufficient for a Mac-based workflow) before considering the
  pattern done.

Sources:
[216digital — Accessible Accordion vs Disclosure](https://216digital.com/accessible-accordion-vs-disclosure-dev-best-practices/),
[Aditus — Accessible Accordion Patterns](https://www.aditus.io/patterns/accordion/),
[A11Y Collective — Accessible Accordion Components](https://www.a11y-collective.com/blog/accessible-accordion/),
[AccessGuard — Accessible Accordions and Tabs](https://getaccessguard.com/posts/accessible-accordions-and-tabs-two-patterns-everyone-confuses),
[Brittany Chiang portfolio](https://brittanychiang.com/)

---

## 4. What to Omit or Generalize (Confidential / NDA'd Client Work)

Consistent guidance across UX/portfolio and freelance-advice sources for handling
client work under confidentiality obligations:

- **Check the actual contract/employer policy first.** Don't assume — some employers
  are fine with general descriptions of work done for a named client; others require
  the client name itself to be withheld. When unsure, ask permission rather than guess.
- **Anonymize deliberately, not superficially.** "Insufficient scrubbing" is called out
  repeatedly as the most common mistake — removing the client's name but leaving enough
  specific detail (exact metrics, distinctive screenshots, unique architecture
  descriptions) that the client is still identifiable defeats the purpose. Generalize
  the industry ("a healthcare scheduling platform" instead of the real product name),
  obscure exact scale, and round numbers.
- **Report relative results instead of absolute figures**: "a 12% increase in monthly
  signups" instead of "12,512 → 14,013 signups" preserves the impact story without
  leaking business-sensitive numbers.
- **Shift emphasis to role, process, and transferable skill** when specifics can't be
  shared: what you owned, what methods/architecture patterns you applied, what
  judgment calls you made — these are usually not confidential even when the underlying
  business context is.
- **Label it.** A short explicit note ("Details generalized due to client
  confidentiality") is considered acceptable and even expected practice — it reads as
  professionalism, not evasiveness, to anyone reviewing the portfolio.

Applied to this site's situation specifically: client names (Careseekers, BuildingLink,
HubClick, Sproxxy, etc., per the existing research notes in this folder) are likely fine
to state plainly since they're the actual named clients of a consultancy relationship —
the sensitivity is much more likely to be around specific business metrics, proprietary
architecture/security details, or unreleased features, which is where the
anonymization/generalization guidance above should be applied.

Sources:
[Ömer Arı — Adding NDA Projects to Your UX Portfolio](https://omerari.medium.com/how-to-add-nda-projects-to-your-ux-portfolio-without-breaking-trust-516730e42695),
[Open Doors Careers — Navigating NDAs in Your Portfolio](https://blog.opendoorscareers.com/p/what-you-can-and-can-t-show-navigating-ndas-in-your-portfolio),
[UX Research Blog — Writing Case Studies Under NDA](https://www.uxresearchblog.com/post/how-to-write-ux-research-case-studies-when-work-is-under-nda),
[freelancermap — Can I Share NDA-Protected Work?](https://www.freelancermap.com/blog/can-i-share-nda-protected-work-on-my-portfolio-tips-and-advice/),
[IxDF — Handling NDAs in a UX Case Study](https://ixdf.org/literature/article/how-to-handle-non-disclosure-agreements-ndas-when-you-write-your-ux-case-study)

---

## 5. Case-Study Depth: Inline vs. Linking Out

For a **single-page scrolling portfolio** (this site's actual shape: Hero → About →
Skills → Experience → Education → Awards → Contact, plus a *separate* `/projects`
route), the guidance converges on a hybrid model rather than an all-or-nothing choice:

- **Single-page/inline works best** when the content per item is genuinely short-form —
  a scannable summary, not a multi-section narrative. Sources are explicit that
  single-page design "only works if the offer is focused" and warn against it for
  "lots of small projects" or long case studies — nobody scrolls through five full case
  studies stacked on one page.
- **Separate pages/case studies work best** when a project has enough unique depth
  (visuals, technical narrative, problem→solution arc) to justify dedicated real
  estate, and are the standard pattern for portfolios built around 4–8 visually
  strong, individually notable projects.
- **The explicitly recommended hybrid**: a clean single-page home for the overview/
  narrative, with optional links out to deeper detail for the subset of items that
  warrant it. This gives the 30-second scanner a complete story without forcing them to
  leave the page, while still giving the interested reader (or a hiring manager doing
  real diligence) a path to more.

**Applied to this site**: the existing `/projects` route is already the natural home
for that "linked-out deeper detail" tier. That suggests the Experience section itself
should stay summary-level (parent employer card + expandable but still-brief client
engagement sub-entries), while any engagement that has a genuinely rich story to tell
can link to a corresponding entry on `/projects` rather than growing the Experience
section itself into a set of mini case studies. This avoids duplicating content between
the two areas and keeps the single-page flow scannable.

Sources:
[Polycount — Single Page vs Multiple Page Portfolio](https://polycount.com/discussion/141694/single-page-portfolio-v-multiple-page-portfolio),
[DEV Community — The Rise of "One-Page Portfolios"](https://dev.to/imtaslim/the-rise-of-one-page-portfolios-do-they-really-work-40b),
[The Crit — Portfolio Layout Examples](https://thecrit.co/resources/portfolio-layout-examples)

---

## 6. Concrete Real-World Examples

- **[Brittany Chiang](https://brittanychiang.com/)** — one of the most widely referenced
  developer portfolios (and widely cloned as a template, e.g. on GitHub). Uses a dark,
  minimalist, single-page layout with a **vertical timeline / tabbed work-history
  interaction** for the experience section: role titles down the side act as tabs, and
  selecting one reveals company, dates, and a short bullet list of impact statements.
  It demonstrates that a small, curated set of high-signal bullets per role — not an
  exhaustive task list — is what makes an experience section read as senior and
  confident.
- **Consultancy/agency-style resumes** (per ConsultingSuccess and JibberJobber
  guidance) — the standard convention of "one employer header with overall dates, each
  client engagement listed as an indented sub-bullet with its own narrower dates and a
  one-line qualifier" is the direct real-world precedent for the nested-card pattern
  recommended above; it is the accepted way recruiters already expect to read
  multi-client consulting tenure, so replicating that mental model in card form (rather
  than inventing a new structure) reduces cognitive load for anyone reviewing it.
  Consultancy portfolios (per AccruePartners) increasingly favor a **living project
  portfolio** over a static resume specifically because it can be reordered/re-emphasized
  per audience — which a webpage naturally supports via expand/collapse or filtering,
  where a PDF cannot.
- **Colorlib's curated list of 21 developer portfolios (2026)** and similar galleries
  consistently point to "minimalist, typography-forward, single accent color, fast
  loading" designs outperforming visually elaborate ones for professional (as opposed
  to purely creative) developer portfolios — reinforcing that the accordion/timeline
  interaction pattern should stay visually restrained rather than becoming a design
  centerpiece.

Sources:
[Brittany Chiang](https://brittanychiang.com/),
[Colorlib — 21 Best Developer Portfolio Websites](https://colorlib.com/wp/developer-portfolios/),
[ConsultingSuccess — One Project, Many Clients](https://www.consultingsuccess.com/one-project-many-clients-how-to-succeed),
[AccruePartners — Building a Project Portfolio](https://www.accruepartners.com/building-a-project-portfolio-to-unlock-consulting-opportunities)

---

## Recommendation for This Site

Synthesizing the above for the specific case of Pernix Solutions (one employer, July
2019–present) with several distinct client engagements underneath it, on a single-page
scrolling portfolio that already has a separate `/projects` page:

1. **Keep the parent employer card as the anchor, nest client engagements as
   expand/collapse sub-entries inside it.** This directly mirrors how consulting tenure
   is already conventionally read (one employer header, sub-listed engagements with
   their own date ranges) and matches the accordion pattern that UX sources recommend
   for optional-depth content — collapsed by default so the section stays scannable in
   the 30-second window, expandable for anyone who wants detail.

2. **Write each engagement's default (collapsed-adjacent) summary as 1–2
   impact-quantified lines, not a task list**, with the tech-stack badges surfaced even
   when collapsed so a recruiter can pattern-match stack relevance without expanding
   anything. Save the fuller STAR-shaped bullet list for the expanded state.

3. **Build the accordion on semantic, accessible primitives**: `<button>` triggers
   inside heading tags, `aria-expanded`/`aria-controls`/`role="region"`, full keyboard
   operability, and visible focus states — or use native `<details>`/`<summary>` if the
   animation requirements are modest. This is a case where the "best practice" and the
   "least code" options mostly coincide.

4. **Generalize, don't fabricate, around anything genuinely confidential** (specific
   metrics, proprietary architecture, unreleased features) rather than omitting client
   names outright — the named clients (Careseekers, BuildingLink, HubClick, Sproxxy) are
   very likely fine to state as-is; the discipline should go into rounding/relativizing
   any sensitive numbers and keeping architectural detail at a level that demonstrates
   judgment without exposing proprietary specifics.

5. **Don't duplicate `/projects` inside the Experience section.** Keep Experience
   summary-level even when expanded; for any client engagement rich enough to deserve a
   full case-study treatment, link out to a corresponding `/projects` entry rather than
   growing the Experience accordion into mini case studies. This preserves the
   single-page scroll's scannability while still giving interested readers a deeper
   path.
