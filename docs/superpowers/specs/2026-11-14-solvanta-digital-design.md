# Solvanta Digital — Website Design

**Date:** 2026-11-14
**Status:** Draft for approval
**Source spec:** Solvanta Digital Complete Website Design and Development Specification (supplied by the client)

---

## Intent

Solvanta Digital needs a seven-page static marketing site that reads as an established Philippine business-technology company. The audience is Filipino SME owners and managers — retailers, traders, distributors, manufacturers, service firms, staffing agencies, family businesses, and young startups. They are not evaluating technology for its own sake; they are asking whether someone can make payroll, stock, approvals, and reporting less painful.

The site must do three jobs at once:

1. Say plainly what Solvanta does and who it is for.
2. Show the problems it solves in the reader's own language.
3. Make starting a conversation feel low-risk.

The hard part is tone. The site has to look internationally credible without looking like a Silicon Valley AI startup, and approachable without looking like a freelance portfolio. Photography of real Filipino and Southeast Asian business settings carries most of that, backed by a restrained navy/blue/teal system.

## Why

- The current market position ("Big-business capabilities, practical solutions for growing businesses") only lands if the site demonstrates understanding of local operations.
- Most competing SME-technology sites are either agency-generic or jargon-heavy. Specific, plain-language scenarios are the differentiator.
- Trust is the conversion mechanism: no prices, no guarantees, no fake credentials — evidence of how the company thinks and works.

## Goals

- Seven pages: Home, Services, Solutions, About, Portfolio, Insights, Contact.
- Content fully local (JS data modules); no CMS, backend, database, or API.
- Per-page `<title>`, meta description, canonical, OG/Twitter metadata in static HTML.
- Strong Lighthouse targets: performance ≥ 90, accessibility ≥ 95, SEO ≥ 95 on mobile.
- Works from 320px to large desktop; keyboard and screen-reader usable.
- Production build deployable to Cloudflare Pages with no server and no secrets.
- Visual identity that does not read as AI-generated or template-derived.

## Non-goals

- No Spanish/Japanese-style multi-language support. English only, with at most one or two light Taglish touches where natural.
- No blog engine, comments, search, or pagination beyond a simple client-side category filter.
- No e-commerce, booking, or client portal in this build.
- No analytics, cookie banner, or tracking scripts in this build.
- No admin UI, form backend, or CRM integration.

## Anti-goals

The build fails if any of these are true:

- It looks like a generic AI startup: dark gradient hero, glassmorphism cards, glowing orbs, robots, circuit boards, "unlock the power of AI".
- It looks like a freelancer portfolio: one big photo, three service icons, a skills grid.
- Filipino positioning is decoration (a flag emoji, "Mabuhay!" in the hero) instead of being carried by scenarios, imagery, and copy.
- Demonstration projects or sample articles are implied to be real client work.
- The contact form pretends to submit when nothing is configured.
- Invented company history, team size, awards, certifications, partnerships, or years of experience appear anywhere.

## Constraints

- Static output only; host must serve plain files.
- Photography must be licensed for commercial use and recorded in a credits file.
- Content must be editable by editing source data files and rebuilding.
- Tailwind CSS is required; no heavy component framework.
- Metadata, canonical URLs, sitemap and robots are static HTML, independent of JavaScript. Page content is rendered by Vue; every page ships a `<noscript>` block carrying the page headline, all seven navigation links, and a `mailto:` contact, so a script failure still leaves the site navigable.

---

## Decisions already made

| Decision | Choice | Reason |
|---|---|---|
| Page architecture | Multi-page static: seven real HTML entries, shared Vue components, no Vue Router | Per-page metadata, canonical URLs, and OG tags in static HTML; no SPA fallback rewrite; minimal JS per page |
| Language | JavaScript (ESM), no TypeScript | Content modules are simple; less ceremony, no build-time type friction |
| Imagery | Licensed photography throughout, plus hand-built product mockups | Client choice: photos everywhere |
| Image hosting | Assets downloaded into the repo, converted to WebP at multiple widths | No third-party hotlinking, stable rendering, controlled payload |
| Styling | Tailwind CSS v4 via `@tailwindcss/vite`, design tokens in CSS `@theme` | Matches spec, minimal config surface |
| Icons | `lucide-vue-next`, imported per icon | Matches spec, tree-shaken |
| Fonts | Self-hosted Manrope + Inter variable WOFF2 via `@fontsource-variable/*` | No Google Fonts blocking, no CLS, GDPR-simple |
| Contact submission | `mailto:` handoff, prefilled, with copy-to-clipboard fallback and a visible "not yet connected" note | Honest static behaviour; interface ready for Formspree later |
| Hosting | Cloudflare Pages | Free, HTTPS, custom domain, no rewrite rules needed for MPA |
| URLs | Folder URLs with trailing slash (`/services/`) | Clean, static-host friendly, no extension handling |

---

## Approaches considered

**1. Multi-page static (chosen).** Seven HTML entry points share components and data modules through Vite's multi-entry build. Each page owns its `<head>`. Costs: seven small entry files and duplicated nav markup generated at build time. Buys: real per-page SEO, near-zero JS, no host rewrite rules, resilient on any static host.

**2. SPA with Vue Router and build-time prerender.** One shell plus prerendered routes. Clean URLs and per-route meta through `@unhead/vue`. Costs: extra prerender tooling, hydration edge cases, fallback rules on hosts, more ways to silently break SEO. Rejected: complexity buys nothing this site needs.

**3. SPA with Vue Router only.** Simplest to write, but metadata and OG tags depend on JS execution, and crawlers/social scrapers see the shell. Rejected outright given the SEO requirements.

**4. Photo-free custom visuals.** Fastest and most cohesive, but loses the human relatability the brief repeatedly asks for. Rejected by client choice.

---

## Information architecture

```
/                     Home
/services/            Services
/solutions/           Solutions
/about/               About
/portfolio/           Portfolio
/insights/            Insights
/contact/             Contact
```

Footer carries: brand line, tagline, navigation, service links, contact placeholders, and the "demonstration content" note for portfolio/insights. Header carries: wordmark, primary nav with `aria-current`, and one CTA ("Let's talk") that is visually distinct from nav links.

Mobile navigation is a full-height panel with focus trap, Escape to close, and body scroll lock; it works without Vue's help for the anchor links themselves.

---

## Page intent and section plan

### Home
1. **Hero** — headline "Better business starts with better systems." Supporting copy in plain English. Two CTAs (primary: Let's Talk About Your Business → `/contact/`; secondary: Explore Our Services → `/services/`). Photo-led, with the headline as dominant element; a small trust row of audience types ("Retail · Trading · Manufacturing · Services") instead of fake client logos.
2. **Business challenges** — "Still managing your business manually?" Six concrete pain cards (manual data entry, scattered employee records, spreadsheet inventory, disconnected apps, chat-based approvals, month-end reports). Each card pairs a short scenario with "what it costs you".
3. **Services overview** — six cards, icon + title + one-sentence outcome + link. No images inside cards; the section gets one wide supporting image.
4. **Why Solvanta** — five differentiators laid out as an asymmetric editorial block: statement column plus supporting photo, not a five-column icon grid.
5. **Solutions overview** — six business-outcome tiles (HR, inventory, customers, workflows, reporting, connected systems), each phrased as a problem → outcome.
6. **Process** — Understand / Plan / Build / Support as a numbered horizontal timeline on desktop, vertical on mobile, with real deliverable descriptions.
7. **Final CTA** — "Let's make running your business easier." Single primary action plus the no-jargon reassurance line.

### Services
Page header, then six full sections in the spec's order. Each uses a consistent but not identical two-column rhythm (image side alternates), and contains: description, problems addressed, key benefits, two practical examples, and a contextual CTA. A sticky in-page section nav on desktop aids scanning.

### Solutions
Organised by business need, not technology. Six solution blocks, each with the five-part structure the spec requires: problem, approach, how it works, benefits, visual, CTA. Visuals are mockup panels (attendance table, stock levels, approval chain, dashboard) rather than stock photos, so the reader sees the actual artefact being described.

### About
Headline "Technology that works for your business.", positioning paragraphs from the spec, five values presented as a numbered list with one-line explanations, and one collaboration photo. No history, team size, awards, or credentials.

### Portfolio
Five demonstration projects in static data. Each card: name, category tag, one-line problem, solution summary, technology list, mockup image, and a persistent "Demonstration project" label. Detail is inline (expandable card or dedicated anchored section per project) — no separate routes, to keep the page count at seven. A banner states these are sample concepts, not client engagements.

### Insights
Six sample articles in static data, with category chips and a client-side category filter (works without JS: all articles visible by default). Each card: thumbnail, category, title, excerpt, reading time. Article bodies live in the data module and expand in a dialog/section; a banner states the articles are sample content for demonstration.

### Contact
Headline "Let's talk about your business.", supporting copy, contact details (clearly marked placeholders), social links, and the form. Form fields per spec: full name, business email, company (optional), contact number (optional), service of interest, estimated budget (optional), project description, privacy consent checkbox. Client-side validation only. Submission composes a `mailto:` with subject and body, then offers a copy button; a note explains that no message is stored or sent automatically until a form service is connected.

---

## Visual system

**Palette.** Navy `#101D35` for headings and dark sections, blue `#2563EB` for primary actions and links, teal `#14B8A6` as a secondary accent used sparingly (rules, small marks, active states), white surfaces, `#F8FAFC` section bands, slate `#475569` body text. Dark navy sections used at most twice per page to avoid the "AI dark-mode" look.

**Type.** Manrope for headings and numerals, Inter for body and UI. Fluid scale from a 16px base; headings tightened (`letter-spacing: -0.02em`) at display sizes. Body measure capped near 68ch.

**Layout.** 12-column grid with a 1200px max content width and generous vertical rhythm. Alternating section treatments (white, `#F8FAFC`, full-bleed photo, navy) create separation without decorative dividers. Deliberate asymmetry on the Why/Process/Portfolio sections so pages do not share one repeated card grid.

**Imagery treatment.** One consistent treatment family: 12px radius on inset photos, full-bleed edge-to-edge for section backdrops, 4:3 and 3:2 aspect ratios, no duotone filters, no heavy overlays except a navy scrim needed for text contrast. Mockups are built as real DOM/SVG panels with navy chrome, not screenshots of fake apps.

**Motion.** Small and purposeful only: 150–250ms ease-out fades/translations on scroll-reveal (IntersectionObserver, disabled under `prefers-reduced-motion`), hover elevation on cards and buttons, underline transitions on links. No parallax, no marquees, no glow.

**Components.** `SiteHeader`, `SiteFooter`, `MobileNav`, `PageHeader`, `SectionHeading`, `BaseButton`, `ServiceCard`, `ChallengeCard`, `SolutionCard`, `ProjectCard`, `ArticleCard`, `ProcessTimeline`, `CtaSection`, `PhotoFigure`, `MockDashboard` (variants: HR, inventory, analytics, approvals, CRM), `ContactForm`, `Banner`.

---

## Content model

```
src/data/
  site.js        brand, nav, contact placeholders, socials, legal/notes
  services.js    six services: slug, icon, title, summary, problems[], benefits[], examples[], image
  solutions.js   six solutions: slug, icon, title, problem, approach, howItWorks[], benefits[], mockup, cta
  projects.js    five demos: slug, name, category, problem, solution, stack[], mockup, disclaimer
  articles.js    six articles: slug, title, category, excerpt, readTime, body[], image
```

Copy rules encoded in the data modules: outcome language over technology language; second person; no superlatives ("best", "cheapest"); no guaranteed results; every service example names a concrete artefact (an approval, a report, a synced record). Filipino context appears as scenarios (sari-sari-to-SME growth, provincial branches, payroll cutoffs, BIR-adjacent reporting needs described in plain terms) — never as slogans.

---

## Image plan

- 14–18 licensed photographs, sourced from Unsplash/Pexels, prioritising Filipino and Southeast Asian business scenes: retail counters, warehouses, office teams, meetings, laptops and dashboards, consultations.
- Download once into `src/assets/images/`, export WebP at 640/1024/1600 widths, keep originals out of the repo.
- Every `<img>` uses `srcset`/`sizes`, explicit `width`/`height`, `loading="lazy"` below the fold, `decoding="async"`, and descriptive alt text written for the section's message.
- Hero image is preloaded and served at 1600 + 1024.
- One brand OG image (1200×630) generated from the wordmark and tagline; page-specific OG images only where a photo genuinely represents the page.
- `docs/image-credits.md` records photographer, source URL, license, and the section where each image is used.

---

## SEO

- Static `<head>` per page: unique title (≤ 60 chars where possible), meta description (≤ 155), canonical, OG (`title`, `description`, `type`, `url`, `image`), Twitter card.
- `Organization` JSON-LD on Home only, using only verifiable facts (name, url, description, logo, sameAs placeholders omitted until real).
- `sitemap.xml` and `robots.txt` as static files, with sitemap listing all seven URLs.
- Semantic landmarks (`header`, `nav`, `main`, `section` with labelled headings, `footer`), one `h1` per page, no skipped heading levels.
- Keyword themes woven into copy naturally: business automation Philippines, custom software development Philippines, software for SMEs, API integration services, workflow automation, SME digital transformation.

## Accessibility

- Skip link, visible focus rings, `aria-current="page"` on nav, labelled form controls with inline error text tied via `aria-describedby`, `role="alert"` summary on failed submit.
- Contrast ≥ 4.5:1 for body text and ≥ 3:1 for large text/UI borders; teal never used for body text on white without darkening.
- `prefers-reduced-motion` disables reveal animations and smooth scrolling.
- Mobile nav traps focus and restores it on close.
- All decorative images `alt=""`; all meaningful images described.

## Performance

- Per-page JS limited to the page's own components plus shared header/footer.
- Fonts: two variable families, `font-display: swap`, preloaded WOFF2, subset via Fontsource.
- No layout shift: fixed media aspect ratios, reserved space for the mobile nav, no late-loading banners.
- Target bundle: ≤ 60KB gzipped JS per page, ≤ 250KB images on first view.

## Deployment

- `npm run build` → `dist/` with seven HTML files and hashed assets.
- Cloudflare Pages: build command `npm run build`, output `dist`, Node 22+.
- No redirects file required (MPA). Custom domain + HTTPS via Cloudflare.
- `README.md` documents local dev, build, deploy, how to edit content, how to add images, and how to connect Formspree later.

---

## Risks and how they are handled

| Risk | Handling |
|---|---|
| Free stock lacks authentic Filipino SME scenes | Search by city/scene terms, prefer Southeast Asian offices and real small-business contexts; never caption a photo as something it is not; fill genuine gaps with mockups rather than misrepresenting a stock scene |
| Photography licensing | Only Unsplash/Pexels-licensed assets, credits file, no scraped images, no AI-generated people presented as real staff |
| Demo content mistaken for real work | Persistent "Demonstration project" / "Sample article" labels plus a page-level note |
| Multi-page duplication of layout code | Shared components + a single `mountPage` helper per entry; nav and footer defined once as components |
| Placeholder contact details look real | Rendered with a visible "placeholder — to be replaced before launch" treatment, and listed in the README |
| Spec's SEO asks vs static hosting | Static head per page removes the JS dependency entirely |

---

## Resolved open questions

A builder review flagged gaps; these are the answers, so no one has to guess during the build.

1. **Copy source and fixed taxonomy.** The client's full written specification exists and is the source of truth; it is reproduced in `docs/content-brief.md` alongside the build plan. Fixed and not to be renamed: the six services (Custom Software Development; Business Process Automation; API & System Integrations; Business Intelligence & Analytics; Cloud Solutions & Technical Support; Technology Consulting), the six solutions (HR & Employee Management; Inventory & Operations Management; Customer & Client Management; Workflow & Approval Automation; Reporting & Business Intelligence; Connected Business Systems), the four process steps (Understand, Plan, Build, Support), the five values (Practical Innovation, Simplicity, Reliability, Collaboration, Continuous Improvement), and the contact form fields. All other prose is written fresh for this build, following the voice rules above — the spec's example sentences are directional, not final copy.
2. **What may be asserted.** Nothing beyond the supplied positioning. No company registration, location beyond "Philippines", team size, tenure, clients, awards, certifications, or partnerships. No real client engagements exist for this build, so Portfolio is entirely demonstration work and is labelled as such throughout.
3. **Domain and deployment.** One constant `SITE_URL` in `src/data/site.js` (default `https://solvantadigital.com`) feeds canonical, OG `url`, sitemap, robots, and JSON-LD. Deliverable is a verified production build plus deployment documentation for Cloudflare Pages; connecting the real domain, DNS, and hosting account is a client step, not part of this build.
4. **Logo.** No existing mark. This build creates an original SVG wordmark plus a geometric symbol (an interlocking "S"/link form built from two nested paths — connection and progress without circuits or robots), used in the header, favicon, and OG image. It is simple geometry, monochrome-capable, and readable at 16px.
5. **Contact details.** Ship with clearly marked placeholders stored in `site.js`, with a launch checklist in the README. The `mailto:` handoff is implemented and tested against a placeholder address; it becomes deliverable the moment a real address is set in one file.
6. **Demo content depth.** Projects: 150–250 words each (problem, solution, stack, what it demonstrates). Articles: 300–400 words each, rendered inline in an expandable article panel — no long-form article routes, no eighth page. Total added copy stays within the page-weight and time budget.
7. **Privacy consent.** No eighth page. Because the form stores nothing and sends nothing by itself, the consent control sits next to an accurate statement: details are used only to reply to the enquiry, and nothing is saved on the website. This is true by construction and needs no separate policy page.

## Acceptance criteria

Mapped from the client spec: seven pages built; consistent Solvanta branding; copy addressed to Filipino SME owners; relevant licensed photography throughout; optimised responsive images; mockups used for services/solutions/portfolio; verified at 320/768/1024/1440; working nav, CTAs, mailto, mobile menu; portfolio and insights load from data modules; contact clearly marked as not yet connected to a service; per-page SEO metadata, sitemap, robots; no backend dependencies; `npm run build` succeeds; deployable to Cloudflare Pages.
