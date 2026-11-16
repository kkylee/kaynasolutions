# Kayna Digital Solutions rebrand — short design

## Goal

Rename the site from **Sol Digital** to **Kayna Digital Solutions** everywhere it is presented, and replace the old “S” link mark with an interlocking **K** mark built from the same navy, white, and teal visual language.

## Brand

- **Full name:** Kayna Digital Solutions
- **Short name:** Kayna
- **Domain:** `https://kaynasolutions.com` — used as a documented placeholder until the real domain is confirmed.
- **Tagline:** “Better business starts with better systems.” (unchanged)
- **Positioning:** “Big-business capabilities, practical solutions for growing businesses.” (unchanged)
- **Palette and type:** unchanged — navy `#101D35`, blue `#2563EB`, teal `#14B8A6`, white, paper `#F8FAFC`, slate `#475569`; Manrope for display, Inter for body.
- **Contact details:** unchanged — the real email, telephone, and mobile number stay as supplied.

## Wordmark

- **Kayna** in Manrope 600, followed by **Digital Solutions** in Manrope 400 at 70% opacity.
- The descriptor hides below the `sm` breakpoint so the header still fits at 320 px; the full name remains available to assistive technology and in the footer copyright.
- Page titles end with `| Kayna Digital Solutions`; the home title leads with the full name.

## Mark

- A geometric **K** on the existing 32 px navy rounded tile.
- White vertical stem and lower arm, teal upper arm, with the arms meeting the stem in an interlocking joint that echoes the old two-link symbol.
- Reused at different sizes for the favicon, social avatar, and OG image.
- Old Sol Digital brand files are replaced by `brand/kayna-*` files; git history preserves the previous pack.

## Site changes

- `src/data/site.js`: full name, short name, description, `SITE_URL`.
- `src/data/pages.js`: all seven titles, descriptions, and the About description.
- Body copy in `about.js`, `projects.js`, `About.vue`, `Insights.vue`, and `WhySection.vue`.
- `Wordmark.vue`, `SiteHeader.vue`, and `SiteFooter.vue` where the name is rendered.
- `build/seo-plugin.js` JSON-LD, sitemap, and no-JS fallback use the new name and URL automatically.
- `public/robots.txt`, `public/favicon.svg`, and `public/og/og-default.*` regenerated.
- `package.json`, package-lock, plugin names, image cache directory, README, content brief, deployment notes, and brand README.
- Tests updated for the new site name, URL, and wordmark.

## Out of scope

- No change to the page structure, services, solutions, articles, portfolio demonstrations, photography, contact form behaviour, or contact details.
- No claim that `kaynasolutions.com` is owned or live.
- No social profile URLs until real handles are supplied.

## Verification

- `npm run check` passes (build, 113 tests, dist checks).
- Header fits at 320 px, 768 px, 1024 px, and 1440 px.
- Favicon and OG image render with the new mark and wordmark.
- No remaining Sol Digital references in current site copy, metadata, or docs.
