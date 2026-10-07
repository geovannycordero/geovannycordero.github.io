# Security Policy

## Supported Versions

This repository is the source for the static site at
[geovannycordero.com](https://geovannycordero.com). There are no versioned
releases: the live site is always built and deployed from the latest commit on
`main`, so that is the only supported version. Fixes ship by merging to `main`.

## Reporting a Vulnerability

**Please do not open a public issue, discussion, or pull request for a security
problem.**

Report it privately through one of these channels:

1. **Preferred:** GitHub private vulnerability reporting —
   [open a private report](https://github.com/geovannycordero/geovannycordero.github.io/security/advisories/new).
2. **Fallback:** email [geovanny@pm.me](mailto:geovanny@pm.me) with a subject
   starting with `[SECURITY]`.

Please include as much of the following as you can:

- The affected URL, file, or workflow
- Steps to reproduce, or a proof of concept
- The impact you believe it has
- Your own disclosure timeline, if you have one

Reports in English or Spanish are welcome.

## What to Expect

This is a personal project maintained by one person, so the timelines below are
best-effort targets, not guarantees:

- **Acknowledgment** within 7 days.
- **Triage update** within 14 days, telling you whether the report was accepted
  or declined, and why.
- **Fix** for accepted issues targeted within 90 days, usually much sooner.

Accepted issues are fixed and disclosed through a GitHub Security Advisory.
With your permission, you will be credited in it. There is no bug bounty.

## Scope

**In scope:**

- Content served from `geovannycordero.com` (for example, XSS introduced by the
  build-time HTML or Markdown rendering)
- The build pipeline in `build/` and the client script in `assets/js/main.js`
- GitHub Actions workflows in `.github/workflows/` (secret or token exposure,
  script injection, unsafe triggers)
- Secrets or credentials committed to the repository

**Out of scope:**

- The GitHub Pages platform itself — report those to
  [GitHub](https://bounty.github.com/)
- Missing HTTP response headers that GitHub Pages does not allow a site to set
  (for example header-based CSP, `X-Frame-Options`, HSTS tuning)
- Clickjacking on pages with no sensitive actions
- Denial of service or volumetric testing
- Social engineering or phishing
- Unverified output from automated scanners
- Known CVEs in development-only dependencies that never ship to the browser
  (Dependabot already tracks these)
- Vulnerabilities in third-party projects — please report those upstream

## Safe Harbor

Good-faith security research that follows this policy is welcome. If you avoid
privacy violations, data destruction, and service degradation, and give a
reasonable amount of time to fix an issue before disclosing it, no legal action
will be pursued against you.

## Existing Protections

The repository already runs Dependabot security and version updates, GitHub
secret scanning, and a [gitleaks](https://github.com/gitleaks/gitleaks) scan in
CI.
