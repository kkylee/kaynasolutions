# Kayna Digital Solutions rebrand — short design

## Goal

Rename the site from **Sol Digital** to **Kayna Digital Solutions** everywhere it is presented, and use the supplied profile icon as the single logo and favicon source.

## Brand

- **Full name:** Kayna Digital Solutions
- **Short name:** Kayna
- **Domain:** `https://kaynasolutions.com` — used as a documented placeholder until the real domain is confirmed.
- **Tagline:** “Better business starts with better systems.” (unchanged)
- **Positioning:** “Big-business capabilities, practical solutions for growing businesses.” (unchanged)
- **Palette and type:** navy `#101D35`, blue `#2563EB`, teal `#14B8A6`, white, paper `#F8FAFC`, slate `#475569`; Manrope for display, Inter for body.
- **Contact details:** `info@kaynasolutions.com`, `(043) 756 8818`, `+63 977 400 9654`, and the supplied Facebook and LinkedIn profiles.

## Wordmark

- The supplied profile icon at 40 px, paired with live type: **Kayna** in Manrope 700 and **Digital Solutions** in Inter 500.
- The lockup uses the site’s standard type tokens and stays on one line at 320 px.
- The header CTA is hidden below the `sm` breakpoint, leaving room for the full wordmark and the menu button.
- Page titles end with `| Kayna Digital Solutions`; the home title leads with the full name.

## Mark

- The supplied profile icon is used as supplied and is not redrawn.
- `scripts/make-brand.mjs` crops a centred 1024 × 1024 window so the mark keeps its optical size from the 32 px favicon to the Open Graph lockup.
- The same icon feeds the header, footer, favicons, Apple touch icon, horizontal lockups, and OG image.
- Old recreated brand files are removed; git history preserves the previous pack.

## Site changes

- `src/data/site.js`: full name, short name, description, `SITE_URL`, email, and social URLs.
- `src/data/pages.js`: all seven titles, descriptions, and the About description.
- Body copy in `about.js`, `projects.js`, `About.vue`, `Insights.vue`, and `WhySection.vue`.
- `Wordmark.vue`, `SiteHeader.vue`, and `SiteFooter.vue` where the name is rendered.
- `build/seo-plugin.js` JSON-LD, sitemap, and no-JS fallback use the new name, URL, email, and `sameAs` profiles automatically.
- `public/robots.txt`, `public/favicon-32.png`, `public/favicon-192.png`, `public/apple-touch-icon.png`, `public/brand/kayna-icon.png`, and `public/og/og-default.*` regenerated.
- `package.json`, package-lock, plugin names, image cache directory, README, content brief, deployment notes, and brand README.
- Tests updated for the new site name, URL, contact details, social profiles, wordmark, and favicons.

## Out of scope

- No change to the page structure, services, solutions, articles, portfolio demonstrations, photography, or contact form behaviour.
- No claim that `kaynasolutions.com` is owned or live.

## Verification

- `npm run check` passes (build, full test suite, dist checks).
- Header fits at 320 px, 768 px, 1024 px, and 1440 px with no overflow or overlap.
- Favicon, Apple touch icon, and OG image render from the supplied icon.
- No remaining Sol Digital references in current site copy, metadata, or docs.
