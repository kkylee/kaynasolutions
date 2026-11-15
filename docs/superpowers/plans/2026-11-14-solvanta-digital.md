# Sol Digital Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build and verify a seven-page static corporate website for Sol Digital using Vue 3, Vite and Tailwind CSS, deployable to Cloudflare Pages.

**Architecture:** Multi-page Vite build — seven real HTML entries, no Vue Router. A build plugin injects per-page `<head>` metadata and generates `sitemap.xml` from one `src/data/pages.js` module. Content lives in `src/data/*.js`; presentation in shared components; each page is a Vue page component mounted by its own entry script.

**Tech Stack:** Vue 3, Vite 7, Tailwind CSS 4 (`@tailwindcss/vite`), lucide-vue-next, self-hosted Manrope/Inter via Fontsource, Vitest + @vue/test-utils (jsdom), `sharp` for image conversion, `node-html-parser` for build-output assertions.

**Spec:** `docs/superpowers/specs/2026-11-14-sol-digital-design.md` (design) and `docs/content-brief.md` (fixed names, voice rules).

## Global Constraints

- Headline brand facts, copied verbatim: **Sol Digital**; tagline **"Better business starts with better systems."**; positioning **"Big-business capabilities, practical solutions for growing businesses."**
- Colours: navy `#101D35`, blue `#2563EB`, teal `#14B8A6`, white `#FFFFFF`, light gray `#F8FAFC`, slate `#475569`.
- Fonts: Manrope headings, Inter body. No Google Fonts CDN.
- URLs: trailing slash, seven total — `/`, `/services/`, `/solutions/`, `/about/`, `/portfolio/`, `/insights/`, `/contact/`.
- `SITE_URL = 'https://soldigital.com'` is defined once in `src/data/site.js`; nothing else hardcodes the domain.
- No backend, CMS, database, API, analytics, or cookie banner. No router.
- Forbidden copy: superlatives ("best", "cheapest", "world-class"), guaranteed results, invented history/team size/awards/certifications/clients/partnerships/years of experience, exclamation marks, emoji.
- Portfolio items carry a visible "Demonstration project" label; Insights carries a "sample content" note.
- Contact details are placeholders, visibly marked, stored only in `src/data/site.js`.
- Every `<img>` has `alt`, explicit `width`/`height`, and `loading="lazy"` unless it is the hero (eager + `fetchpriority="high"`).
- Accessibility floor: skip link, visible focus, `aria-current="page"`, labelled form controls with inline errors, `prefers-reduced-motion` respected, contrast ≥ 4.5:1 body text.
- Node ≥ 20. Commands run from the project root.

## Review Focus

Failure modes the spec implies but no acceptance criterion names. Each has a test in the task that owns the code.

1. **320px width** — six-item nav, long service titles, and mockup tables must wrap or scroll inside their own panel without widening the page. Pinned in Task 5 (nav overflow) and Task 6 (mockup table container is `overflow-x-auto`).
2. **Keyboard-only use** — skip link focus, mobile panel trap, Escape closes and restores focus to the trigger. Pinned in Task 5.
3. **JavaScript disabled** — every page ships a `<noscript>` block with the page headline, all seven nav links, and a `mailto:` link. Pinned in Task 1 (`check-dist`).
4. **Reveal animation failure** — content must be visible by default; animation may only add motion, never gate visibility. Pinned in Task 5 (`useReveal` test: reduced-motion and missing-observer cases leave content visible).
5. **Form input edges** — non-ASCII names, 2,000-character descriptions, invalid email, missing consent, no service selected must all produce a valid encoded `mailto:` or a specific inline error. Pinned in Task 13.

---

## File Structure

```
index.html  services/  solutions/  about/  portfolio/  insights/  contact/   # 7 entries, each index.html
build/seo-plugin.js                 # head injection + sitemap generation
public/robots.txt  public/favicon.svg  public/og/og-default.png
scripts/check-dist.mjs              # built-output gate (SEO, links, noscript, alts)
scripts/fetch-images.mjs            # download + convert manifest to WebP
scripts/images.manifest.json        # source URL, alt, credit, aspect per image
scripts/make-og.mjs                 # 1200x630 OG image from SVG
src/styles/main.css                 # @theme tokens + base layer
src/lib/{mountPage,images,icons,path,mailto}.js
src/data/{pages,site,services,solutions,projects,articles}.js
src/layouts/MainLayout.vue
src/components/layout/{SiteHeader,MobileNav,SiteFooter}.vue
src/components/common/{BaseButton,Tag,SectionHeading,PageHeader,Banner,PhotoFigure,CtaSection,ProcessTimeline}.vue
src/components/cards/{ServiceCard,ChallengeCard,SolutionCard,ProjectCard,ArticleCard}.vue
src/components/mockups/{MockFrame,MockHr,MockInventory,MockAnalytics,MockApprovals,MockCrm}.vue
src/components/sections/{HeroSection,ChallengesSection,ServicesOverview,WhySection,SolutionsOverview,ProcessSection,FinalCta}.vue
src/components/contact/ContactForm.vue
src/pages/{Home,Services,Solutions,About,Portfolio,Insights,Contact}.vue
src/entries/{home,services,solutions,about,portfolio,insights,contact}.js
tests/*.test.js
docs/{content-brief.md,image-credits.md,sol-digital-source-spec.md}
```

---

### Task 1: Scaffold, per-page head injection, seven page shells

**Files:**
- Create: `package.json`, `vite.config.js`, `.gitignore`, `src/styles/main.css`, `src/lib/mountPage.js`, `src/layouts/MainLayout.vue`, `src/data/pages.js`, `src/data/site.js` (minimal: `SITE_URL`, `site` name/tagline/email/location, `nav`), `src/pages/*.vue` (7 stubs), `src/entries/*.js` (7), `build/seo-plugin.js`, `scripts/check-dist.mjs`, `public/robots.txt`, `public/favicon.svg`, 7 × `index.html`

**Interfaces:**
- Produces: `pages` array — `{ id, html, path, title, description, ogImage }`; `pageFor(htmlPath)`; `mountPage(Page)`; `SITE_URL`, `site`, `nav`; CSS tokens `--color-navy`, `--color-blue`, `--color-teal`, `--color-paper`, `--color-slate-ink`, `--font-display`, `--font-body`; npm scripts listed below.

- [ ] **Step 1: Write the built-output gate**

`scripts/check-dist.mjs` imports `pages` from `../src/data/pages.js` and `SITE_URL` from `../src/data/site.js`, parses every `dist/**/index.html` with `node-html-parser`, and fails with a listed reason when any is true:

- a page from `pages` is missing from `dist`
- `<title>` length is not 15–65 chars, or `<h1>` count ≠ 1
- `meta[name=description]` missing or not 50–160 chars
- `link[rel=canonical]` href ≠ `SITE_URL + page.path`
- any of `og:title`, `og:description`, `og:url`, `og:image`, `twitter:card` missing; `og:url` ≠ canonical; `og:image` not absolute
- `<noscript>` missing, or does not contain 7 `<a href>` nav links and `mailto:`
- any `<img>` without non-empty `alt`, `width`, `height`
- any internal `href` (starting `/`) that does not resolve to a file in `dist`
- `dist/sitemap.xml` missing a `<loc>` for any page, or `dist/robots.txt` lacking `Sitemap:`
- duplicate `id` attributes within a page

- [ ] **Step 2: Run it, confirm it fails**

Run: `node scripts/check-dist.mjs`
Expected: FAIL — `dist` not found.

- [ ] **Step 3: Scaffold the project**

```bash
git init
npm init -y
npm i vue lucide-vue-next @fontsource-variable/manrope @fontsource-variable/inter
npm i -D vite @vitejs/plugin-vue tailwindcss @tailwindcss/vite vitest @vue/test-utils jsdom node-html-parser sharp
```

`package.json` scripts: `dev`, `build`, `preview`, `test` (`vitest run`), `check:dist` (`node scripts/check-dist.mjs`), `check` (`npm run build && npm test && npm run check:dist`), `images`, `og`. Set `"type": "module"`.

- [ ] **Step 4: Configure the multi-page build and SEO plugin**

`vite.config.js`: seven inputs (`home: 'index.html'`, `services: 'services/index.html'`, …), plugins `[vue(), tailwindcss(), seo()]`.

`build/seo-plugin.js` exports `seo()` with:
- `transformIndexHtml(html, ctx)` — resolve `pageFor(ctx.filename)`; if found, replace `<!--seo-->` with `<title>`, description, canonical, five OG tags, `twitter:card`, and the shared `<noscript>` block (headline from `page.title`, seven nav links, `mailto:{site.email}`).
- `closeBundle()` — write `dist/sitemap.xml` from `pages` (`<lastmod>` = build date, `changefreq=monthly`, `priority` 1.0 home / 0.8 top-level / 0.6 others).

- [ ] **Step 5: Tokens and base layer**

`src/styles/main.css`: `@import "tailwindcss";` then `@theme` with the six brand colours mapped to `--color-*`, `--font-display: "Manrope Variable", sans-serif`, `--font-body: "Inter Variable", sans-serif`, radius scale (`--radius-card: 0.75rem`), and `--shadow-lift`. Base layer: `html { scroll-behavior: smooth }` under `@media (prefers-reduced-motion: no-preference)`; `body` uses Inter, `text-slate-ink`, `bg-white`, `antialiased`; `h1..h3` use Manrope with `-0.02em` tracking and `text-wrap: balance`; `:focus-visible` gets a 3px blue ring with 2px offset; `.container-page` = `mx-auto w-full max-w-[1200px] px-5 sm:px-8`.

- [ ] **Step 6: Page shells, entries, stub pages**

Each HTML: `lang="en"`, `<div id="app">`, `<!--seo-->`, module script to its entry. Each entry calls `mountPage(Home)` etc. Each page stub renders `<MainLayout>` with a single `<h1>` so the gate can run. `src/data/pages.js` holds the seven titles/descriptions (unique, ≤ 65/160 chars, keyword themes from the design doc).

- [ ] **Step 7: Run the build and the gate**

Run: `npm run build && npm run check:dist`
Expected: PASS — 7 HTML files, sitemap with 7 URLs.

- [ ] **Step 8: Commit**

```bash
git add -A && git commit -m "chore: scaffold multi-page Vue build with SEO injection"
```

---

### Task 2: Content data modules

**Files:**
- Create: `src/data/site.js` (extend), `src/data/services.js`, `src/data/solutions.js`, `src/data/projects.js`, `src/data/articles.js`, `src/lib/icons.js`, `src/lib/path.js`
- Test: `tests/data.test.js`

**Interfaces:**
- `site` — `{ name, tagline, positioning, description, email, phone, location, socials: [{ label, href, icon }], isPlaceholder: true }`; `nav` — 7 × `{ label, path, id }`; `SITE_URL`.
- `services` — 6 × `{ slug, icon, title, summary, problems: string[], benefits: string[], examples: { title, body }[], image }`.
- `solutions` — 6 × `{ slug, icon, title, problem, approach, howItWorks: string[], benefits: string[], mockup }`; `mockup` ∈ `hr | inventory | crm | approvals | analytics`.
- `projects` — 5 × `{ slug, name, category, problem, solution, stack: string[], mockup, demo: true }`.
- `articles` — 6 × `{ slug, title, category, excerpt, readTime, body: string[], image }`.
- `icon(name)` returns a lucide component; `currentPath()` returns `window.location.pathname` normalised to end in `/`.

- [ ] **Step 1: Write failing invariants**

`tests/data.test.js` asserts:

```js
expect(services.map(s => s.title)).toEqual([...six exact titles from docs/content-brief.md])
expect(solutions.map(s => s.title)).toEqual([...six exact titles])
expect(projects).toHaveLength(5); expect(articles).toHaveLength(6)
expect(nav.map(n => n.path)).toEqual(['/', '/services/', '/solutions/', '/about/', '/portfolio/', '/insights/', '/contact/'])
// unique slugs within each collection
// every project.demo === true and every project has a "Demonstration" disclaimer string in projects.note
// every article.body has >= 4 paragraphs and total words 250–450
// no forbidden words across all copy: /best|cheapest|world-class|guarantee/i
// every services[i].examples has 2 entries; every solutions[i].howItWorks has >= 3 entries
```

- [ ] **Step 2: Run, confirm failure**

Run: `npx vitest run tests/data.test.js` — Expected: FAIL (module not found).

- [ ] **Step 3: Write `site.js` and `pages.js` metadata**

Use `docs/content-brief.md` for voice. Placeholders: `hello@soldigital.com`, `+63 900 000 0000`, socials Facebook/LinkedIn with `href: '#'` and `isPlaceholder` copy in `site.js`. Nav labels: Home, Services, Solutions, About, Portfolio, Insights, Contact.

- [ ] **Step 4: Write the five content modules**

Copy rules per the brief: outcome language, second person, concrete artefacts, Filipino SME scenarios (payroll cutoff, branch stock, chat-based approvals, month-end reporting). Two examples per service, five-part structure per solution, 150–250 words per project, 300–400 words per article.

- [ ] **Step 5: Run tests, then commit**

Run: `npx vitest run tests/data.test.js` — Expected: PASS.
```bash
git add src/data src/lib && git commit -m "feat: add site content data modules with copy invariants"
```

---

### Task 3: Image pipeline and credits

**Files:**
- Create: `scripts/images.manifest.json`, `scripts/fetch-images.mjs`, `src/lib/images.js`, `docs/image-credits.md`
- Test: `tests/images.test.js`

**Interfaces:**
- Manifest entry `{ key, url, alt, credit: { photographer, source, license }, aspect: [w, h] }`.
- `img(key)` → `{ src, srcset, width, height, alt }` at 1024 default with `srcset` for 640/1024/1600.

- [ ] **Step 1: Write failing test**

```js
// for every manifest key: src/assets/images/<key>-640.webp, -1024, -1600 exist
// img('hero-consultation').srcset includes '640w', '1024w', '1600w'
// every file < 300 KB; every alt non-empty and 40–160 chars
// every key used in services/articles/projects resolves
```

- [ ] **Step 2: Run, confirm failure.** `npx vitest run tests/images.test.js`

- [ ] **Step 3: Source 14–18 licensed photos**

Search Unsplash and Pexels for Filipino/SEA business scenes: retail counter, warehouse stock count, small-office team, laptop with dashboard, client consultation, meeting, manufacturing floor, delivery/operations. Record photographer, page URL, license in the manifest. Reject anything that reads as generic Western handshake stock or futuristic AI imagery. If a scene genuinely cannot be licensed, substitute the closest true scene and note it in `docs/image-credits.md` — never mislabel a photo.

- [ ] **Step 4: Convert and write the helper**

`fetch-images.mjs` downloads each `url`, uses `sharp` to emit WebP at widths 640/1024/1600 (quality 78), prints total bytes. `images.js` builds `img(key)` from the manifest plus `import.meta.glob` URLs.

- [ ] **Step 5: Verify and commit**

Run: `npm run images && npx vitest run tests/images.test.js` — Expected: PASS.
```bash
git add scripts src/assets src/lib docs/image-credits.md && git commit -m "feat: add licensed image pipeline with WebP variants"
```

---

### Task 4: UI primitives

**Files:**
- Create: `src/components/common/{BaseButton,Tag,SectionHeading,PageHeader,Banner,PhotoFigure,CtaSection,ProcessTimeline}.vue`
- Test: `tests/primitives.test.js`

**Interfaces:**
- `BaseButton` props `{ href?, variant?: 'primary'|'secondary'|'ghost', size?: 'md'|'lg' }` — renders `<a>` when `href`, `<button type="button">` otherwise; primary = blue fill/white text, secondary = navy outline, ghost = underline link.
- `PhotoFigure` props `{ image, ratio?: '3:2'|'4:3'|'1:1', rounded?: boolean, priority?: boolean }` — renders `<img>` with `srcset`, `sizes`, width/height, `loading="lazy"` unless `priority`, and `alt` from the image object.
- `SectionHeading` props `{ eyebrow?, title, lead?, align?, level? }` — heading level 2 default via `<component :is>`.
- `PageHeader` props `{ eyebrow?, title, lead?, image? }`.
- `Banner` props `{ tone: 'info'|'note', title?, text }` — used for demonstration/sample notices.
- `ProcessTimeline` props `{ steps: {title, body}[] }` — ordered list, horizontal ≥ md, vertical below.

- [ ] **Step 1: Write failing tests** — BaseButton href/button rendering and variant classes; PhotoFigure `srcset` + `loading` + explicit dimensions; PageHeader renders exactly one `h1`; ProcessTimeline renders 4 `li` in order.
- [ ] **Step 2: Run, confirm failure.** `npx vitest run tests/primitives.test.js`
- [ ] **Step 3: Implement the components** with Tailwind utilities against the tokens; no arbitrary one-off hex values.
- [ ] **Step 4: Run tests, commit.** `npx vitest run tests/primitives.test.js`

---

### Task 5: Layout, navigation, mobile panel, reveal

**Files:**
- Create: `src/components/layout/{SiteHeader,MobileNav,SiteFooter,Wordmark}.vue`, `src/layouts/MainLayout.vue`, `src/lib/composables/useReveal.js`, `src/lib/composables/useMobileNav.js`
- Test: `tests/layout.test.js`

**Interfaces:**
- `Wordmark` props `{ tone?: 'dark'|'light', size?: 'sm'|'md' }` — inline SVG symbol (two interlocking rounded paths forming an S/link, 24×24, `currentColor`) plus "Sol" in Manrope 600 and "Digital" in 400; accessible name "Sol Digital"; identical geometry reused by the favicon in Task 14.
- `SiteHeader` — wordmark link to `/`, desktop nav with `aria-current="page"` on the active item (via `currentPath()`), "Let's talk" primary button, mobile trigger `aria-expanded`/`aria-controls="mobile-nav"`.
- `MobileNav` props `{ open }`, emits `close`; traps focus, closes on Escape, restores focus to the trigger, locks `body` scroll.
- `SiteFooter` — brand line, tagline, nav columns, service links, marked placeholder contact details, demonstration note.
- `useReveal()` — adds `is-revealed` when an element enters the viewport; elements are visible by default in CSS (only `[data-reveal].pending` is offset), and it no-ops when `IntersectionObserver` is absent or reduced motion is set.

- [ ] **Step 1: Write failing tests**
  - header marks `/services/` active when `window.history.pushState({}, '', '/services/')`
  - Escape inside the mobile panel emits `close` and returns focus to the trigger
  - focus stays inside the panel when tabbing from the last link (focus trap)
  - `useReveal` leaves elements visible when `matchMedia('(prefers-reduced-motion: reduce)')` matches
  - footer contains the placeholder marker text and the demonstration note
  - nav has no element wider than 320px at the CSS level: assert the container uses `flex-wrap` and the trigger has `min-w-11 min-h-11`
- [ ] **Step 2: Run, confirm failure.** `npx vitest run tests/layout.test.js`
- [ ] **Step 3: Implement header, panel, footer, layout.** Skip link first in DOM: `Skip to content` → `#main`.
- [ ] **Step 4: Run tests, commit.**

---

### Task 6: Dashboard mockups

**Files:**
- Create: `src/components/mockups/{MockFrame,MockHr,MockInventory,MockAnalytics,MockApprovals,MockCrm}.vue`, `src/components/mockups/index.js` (`mockFor(kind)`)
- Test: `tests/mockups.test.js`

**Interfaces:** each mock accepts `{ title?: string }` and renders inside `MockFrame` (navy chrome, window dots, breadcrumb, `aria-hidden="true"` on decorative chrome, real `<table>` with `<caption class="sr-only">`). Numeric data is invented but plausible and never labelled as client data.

- [ ] **Step 1: Write failing tests** — `mockFor('hr')` renders a table with 5 attendance rows and a "Present" status; `mockFor('inventory')` shows 3 SKUs and a low-stock marker; `mockFor('analytics')` renders 4 KPI values and a bar series; `mockFor('approvals')` renders a 3-step approval chain; `mockFor('crm')` renders 4 client rows; every mock root has class `overflow-x-auto` on the table wrapper.
- [ ] **Step 2: Run, confirm failure.** `npx vitest run tests/mockups.test.js`
- [ ] **Step 3: Implement the five mockups** as DOM/SVG — no images, no fake vendor logos.
- [ ] **Step 4: Run tests, commit.**

---

### Task 7: Home page

**Files:**
- Create: `src/components/sections/{HeroSection,ChallengesSection,ServicesOverview,WhySection,SolutionsOverview,ProcessSection,FinalCta}.vue`, `src/components/cards/{ServiceCard,ChallengeCard,SolutionCard}.vue`, `src/pages/Home.vue`
- Modify: `src/entries/home.js`

**Interfaces:** consumes `services`, `solutions`, `img`, `BaseButton`, `PhotoFigure`, `SectionHeading`, `ProcessTimeline`.

- [ ] **Step 1: Write failing test** — Home renders one `h1` equal to "Better business starts with better systems."; hero has both CTAs linking to `/contact/` and `/services/`; 6 service cards; 6 challenge cards; 6 solution tiles; 4 process steps; final CTA "Start a Conversation" → `/contact/`; no text matches `/best|cheapest|guarantee/i`; hero image is eager-loaded.
- [ ] **Step 2: Run, confirm failure.** `npx vitest run tests/home.test.js`
- [ ] **Step 3: Build the sections.** Exact hero copy from the design doc; navy used for the process band only; photographic hero (3:2) with the headline dominant; challenges as a 2/3-column editorial grid, not six identical cards.
- [ ] **Step 4: Run tests, build, commit.**

---

### Task 8: Services page

**Files:** Create `src/components/sections/ServiceDetail.vue`, `src/pages/Services.vue`; modify `src/entries/services.js`
**Test:** `tests/services.test.js`

- [ ] **Step 1: Write failing test** — 6 detail sections in brief order; each has heading level 2, a problems list, ≥ 2 benefits, exactly 2 examples, and a `/contact/` CTA; alternate image side via `index % 2`; desktop section nav lists 6 anchors whose ids match section ids.
- [ ] **Step 2: Run, confirm failure** → **Step 3: implement** → **Step 4: run tests, build, commit.**

---

### Task 9: Solutions page

**Files:** Create `src/components/sections/SolutionDetail.vue`, `src/pages/Solutions.vue`; modify `src/entries/solutions.js`
**Test:** `tests/solutions.test.js`

- [ ] **Step 1: Write failing test** — 6 solution blocks; each renders problem, approach, ≥3 "how it works" items, ≥2 benefits, a mockup (`MockFrame` child present), and a CTA; page states these are illustrative, not commercial products.
- [ ] **Step 2: Run, confirm failure** → **Step 3: implement** → **Step 4: run tests, build, commit.**

---

### Task 10: About page

**Files:** Create `src/pages/About.vue`; modify `src/entries/about.js`
**Test:** `tests/about.test.js`

- [ ] **Step 1: Write failing test** — `h1` = "Technology that works for your business."; 5 values in brief order; one collaboration `PhotoFigure`; page contains none of `/years of experience|awards|certified|award-winning|trusted by \d+/i`.
- [ ] **Step 2: Run, confirm failure** → **Step 3: implement** (positioning paragraphs from the brief, values as a numbered editorial list with photos) → **Step 4: run tests, build, commit.**

---

### Task 11: Portfolio page

**Files:** Create `src/components/cards/ProjectCard.vue`, `src/components/sections/ProjectDetail.vue`, `src/pages/Portfolio.vue`; modify `src/entries/portfolio.js`
**Test:** `tests/portfolio.test.js`

- [ ] **Step 1: Write failing test** — 5 projects in brief order, each with a "Demonstration project" label, category, problem, solution, ≥3 stack items, and a mockup; page-level `Banner` present; no project text contains `/client:|our client|case study/i`.
- [ ] **Step 2: Run, confirm failure** → **Step 3: implement** (expandable detail with `aria-expanded`/`aria-controls`) → **Step 4: run tests, build, commit.**

---

### Task 12: Insights page

**Files:** Create `src/components/cards/ArticleCard.vue`, `src/components/sections/ArticlePanel.vue`, `src/pages/Insights.vue`; modify `src/entries/insights.js`
**Test:** `tests/insights.test.js`

- [ ] **Step 1: Write failing test** — 6 cards visible by default (no filter applied); category chips include "All" plus the six brief categories; selecting a category filters cards; selecting an article opens a panel with the full body and closes on Escape with focus restored; the sample-content note is present; every card has a thumbnail with alt text.
- [ ] **Step 2: Run, confirm failure** → **Step 3: implement** → **Step 4: run tests, build, commit.**

---

### Task 13: Contact page and mailto logic

**Files:** Create `src/lib/mailto.js`, `src/components/contact/ContactForm.vue`, `src/pages/Contact.vue`; modify `src/entries/contact.js`
**Test:** `tests/contact.test.js`

**Interfaces:**
- `validateInquiry(values)` → `{ valid: boolean, errors: Record<'name'|'email'|'description'|'consent', string> }`. Name ≥ 2 chars; email matches `/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/`; description ≥ 20 chars; consent must be true.
- `buildMailto(values)` → `mailto:` URL to `site.email` with subject `New enquiry — {name}{' — ' + company if set}` and body lines for every provided field, encoded with `encodeURIComponent`.

- [ ] **Step 1: Write failing tests**
  - empty submit → `valid === false`, 4 errors, `role="alert"` summary rendered
  - `'jose.rizal@example.com'` accepted; `'not-an-email'` rejected
  - description of 2,000 chars with `ñ`, `&`, `#`, newlines → `buildMailto` round-trips through `decodeURIComponent` without loss
  - consent unchecked → blocked even when other fields are valid
  - valid submit → an `<a href^="mailto:">` with the encoded subject exists and the "not yet connected" note is visible
  - a plain `mailto:` link and the consent explanation are present in the initial DOM (no interaction needed)
- [ ] **Step 2: Run, confirm failure.** `npx vitest run tests/contact.test.js`
- [ ] **Step 3: Implement `mailto.js`, the form, and the page.** Fields: name, email, company, phone, service (from `services`), budget, description, consent. Placeholders visibly marked. Copy-to-clipboard button with `aria-live` confirmation.
- [ ] **Step 4: Run tests, build, commit.**

---

### Task 14: SEO, OG image, favicon, docs, deployment config

**Files:** Create `scripts/make-og.mjs`, `docs/image-credits.md` (final), `README.md`, `public/_headers`, `.nvmrc`
**Modify:** `src/data/pages.js` (OG image paths), `build/seo-plugin.js` (JSON-LD on Home only)

- [ ] **Step 1: Write failing assertions** — `check-dist.mjs` additionally requires: `<html lang="en">`; JSON-LD `Organization` present on `/` only, valid JSON with `name`, `url`, `description`; every page's `og:image` file exists in `dist`; `dist/sitemap.xml` lastmod is a valid date.
- [ ] **Step 2: Run, confirm failure.** `npm run build && npm run check:dist`
- [ ] **Step 3: Generate assets** — `make-og.mjs` composes a 1200×630 PNG from an SVG (wordmark, tagline, navy background, teal rule) via `sharp`; `public/favicon.svg` is the geometric mark; add `public/_headers` with cache rules for hashed assets and an `X-Content-Type-Options: nosniff` header.
- [ ] **Step 4: Write README** — local dev, build, content editing, adding images, connecting Formspree later, Cloudflare Pages setup (build `npm run build`, output `dist`, Node 22), launch checklist (real email/phone, domain in `site.js`, legal review of demo labels).
- [ ] **Step 5: Run the full gate.** `npm run check` — Expected: build passes, all tests pass, check-dist PASS. Print per-page JS and first-view image weight from `dist/`; fail the task if any page's JS exceeds 250 KB uncompressed or the seven pages together exceed 20 MB of images. Commit.

---

### Task 15: Responsive and visual QA

**Files:** Modify any component or token that fails.

- [ ] **Step 1: Serve the build.** `npm run build && npm run preview`
- [ ] **Step 2: Screenshot every page at 320, 768, 1280, 1600** using the browser tools; for each, evaluate `document.documentElement.scrollWidth <= window.innerWidth` and record the result.
- [ ] **Step 3: Fix** any horizontal overflow, cramped nav, mockup table clipping, unreadable hero text over photos, or section spacing that collapses on mobile. Re-run Step 2.
- [ ] **Step 4: Keyboard pass** — Tab through every page: skip link appears first, focus visible, mobile panel traps and restores focus, article panel closes on Escape.
- [ ] **Step 5: Contrast and motion pass** — verify body text against each background ≥ 4.5:1; toggle reduced motion and confirm no content is hidden.
- [ ] **Step 6: Final gate and commit.** `npm run check`
```bash
git add -A && git commit -m "fix: responsive and accessibility polish pass"
```
