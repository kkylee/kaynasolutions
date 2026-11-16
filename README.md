# Sol Digital

A seven-page static corporate website for Sol Digital, built with Vue 3, Vite, and Tailwind CSS v4. Every page is a real HTML entry point; Vue provides the interface, and all content lives in local JavaScript data files. There is no backend, database, CMS, or admin area.

**Positioning:** Big-business capabilities, practical solutions for growing businesses.
**Tagline:** Better business starts with better systems.

## Requirements

- Node.js 22 or newer (`.nvmrc` pins 22 for Cloudflare Pages)
- npm 10 or newer

## Commands

| Command | What it does |
| --- | --- |
| `npm install` | Install dependencies |
| `npm run dev` | Start the local dev server (Vite prints the URL) |
| `npm run build` | Build the production site into `dist/` |
| `npm run preview` | Serve the built site locally |
| `npm test` | Run the Vitest suite (content, components, pages) |
| `npm run check:dist` | Validate the built output (SEO, links, alt text, budgets) |
| `npm run check` | Build, test, then validate `dist/` — the full gate |
| `npm run images` | Download and convert the licensed photography |
| `npm run og` | Regenerate `public/og/og-default.png` |

Run `npm run check` before any deployment. It fails on broken internal links, missing metadata, missing image dimensions, duplicate IDs, a missing `<noscript>` fallback, oversized JS, or a broken sitemap.

## Structure

```
brand/                       logo pack (SVG + PNG) and usage notes
build/seo-plugin.js          Per-page <head>, JSON-LD, <noscript>, sitemap
public/                      favicon, robots.txt, _headers, OG image
scripts/                     image pipeline, OG generator, dist checks
src/assets/images/           generated WebP variants (committed)
src/components/common/       buttons, headings, photos, banners, CTA, timeline
src/components/layout/       header, mobile panel, footer, wordmark
src/components/mockups/      illustrative system panels (clearly decorative)
src/components/sections/     page sections
src/data/                    all copy and lists (edit here)
src/layouts/MainLayout.vue   skip link + header + main + footer
src/lib/                     image resolver, icon registry, path helpers
src/pages/                   one component per HTML entry
src/styles/main.css          Tailwind v4 theme tokens and base styles
tests/                       Vitest suites
```

## Editing content

All copy is in `src/data/`:

- `site.js` — site name, tagline, contact details, social links, audiences
- `services.js` — six services with problems, benefits, and examples
- `solutions.js` — six solutions with problem, approach, steps, benefits
- `projects.js` — five demonstration projects and the portfolio note
- `articles.js` — six sample articles rendered inline on Insights
- `home.js`, `about.js` — page-specific narrative blocks
- `pages.js` — titles, meta descriptions, and OG image path per page

After editing content, run `npm test` — the data suite checks lengths, uniqueness of slugs, and word counts, and the page suites assert that the rendered pages match the data.

### Contact details

The email, telephone, and mobile number are stored in `site.js` and shown in the footer and on the Contact page. `phoneHref` and `mobileHref` hold the international `tel:` values. The social links are still placeholders (`href: '#'`).

`SITE_URL` in the same file drives canonicals, Open Graph URLs, the sitemap, and JSON-LD. Change it to the final domain before launch. The site name, contact details, and description live in the same file; page titles and descriptions are in `pages.js`.

### Brand assets

The logo pack is in [`brand/`](brand/) — SVG lockups and marks, transparent PNG exports, and usage rules. See [`brand/README.md`](brand/README.md). The header and footer wordmark is the `Wordmark` component; the favicon and the OG image reuse the same mark geometry.

### Photography

The image manifest at `scripts/images.manifest.json` records the Pexels photo ID, photographer, licence, aspect ratio, and alt text for every image. To add one:

1. Add an entry with a unique `key`, Pexels photo `id`, `source`, `photographer`, `aspect`, and a scene-describing `alt`.
2. Run `npm run images` (add `--force` to re-encode everything).
3. Reference it with `img('your-key')` from `src/lib/images.js`.
4. Run `npm test` — `tests/images.test.js` checks every manifest entry has three variants, dimensions, and meaningful alt text.

Variants are generated at 640, 1024, and 1600 px in WebP. The script lowers quality for any 1600 px variant that would exceed 280 KB. Credits are written to `docs/image-credits.md`.

### Demonstration content

Portfolio projects and Insights articles are labelled demonstrations in the page copy, in the footer, and on each card. They must never be rewritten to imply real client work without replacing the labels and the `projectsNote` in `src/data/projects.js`. The same applies to screenshots: the system panels are hand-built mockups, not client screenshots.

## Contact form behaviour

There is no form endpoint. On submit the form validates in the browser, then prepares a `mailto:` link containing the entered details. The visitor can open it in their mail app or copy the text, and they are told plainly that nothing was sent or stored.

To connect a real endpoint later, replace the mailto handoff in `src/components/sections/ContactForm.vue` with a `fetch` to a form service (for example a Cloudflare Worker or Formspree), keep the current validation and error messaging, and update the explanatory text and `tests/contact-form.test.js` so the page no longer claims submissions are not stored. Add a privacy notice at that point.

## Deployment

Cloudflare Pages, static output. Full steps, custom domain notes, and rollback instructions are in [`docs/deployment.md`](docs/deployment.md). Short version:

- Build command: `npm run build`
- Output directory: `dist`
- Node version: 22 (set `NODE_VERSION=22` if the project does not pick up `.nvmrc`)
- No SPA rewrite rules: every page is a real folder with an `index.html`

## Launch checklist

- [ ] Replace email, phone, location, and social URLs in `src/data/site.js`; set `isPlaceholder: false`
- [ ] Set `SITE_URL` to the production domain (with no trailing slash) and update the `Sitemap:` line in `public/robots.txt`
- [ ] Review every demonstration label (portfolio, insights, footer, banners)
- [ ] Run `npm run check` and confirm the PASS line plus budgets
- [ ] Check the site on a real phone at 320 px and on a slow connection
- [ ] Tab through all seven pages and open/close the mobile menu and article panels
- [ ] Test the contact form's mailto handoff and the copy-to-clipboard button
- [ ] Confirm `dist/og/og-default.png` renders correctly in a social preview debugger
- [ ] Have the privacy note and demo-content wording reviewed if required
- [ ] After launch, submit `https://your-domain/sitemap.xml` in Google Search Console

## Performance notes

- Each page loads about 103–121 KB of uncompressed JavaScript (the shared Vue runtime plus the page entry). `check:dist` fails if any page exceeds 250 KB.
- Images ship as three WebP widths; the 1600 px variant is capped near 280 KB.
- The two variable fonts (Manrope, Inter) are preloaded. Their `font-display` is set to `optional` by `build/stable-font-display.js`, so a slow first visit keeps the system font instead of reflowing the page when the webfont arrives. Repeat visits and faster connections use the brand fonts. This is deliberate: it keeps layout shift at zero.

## Known limitations

- Pages render with Vue on the client. A `<noscript>` fallback provides navigation, the tagline, and an email link, but without JavaScript the marketing sections are not shown. If SEO without JavaScript becomes a requirement, add pre-rendering rather than weakening the fallback.
- Images and mockups use generic business scenarios; no photograph is captioned as a named client, employee, or engagement.
- No analytics, tracking pixels, or cookie banner are included. Add them only with the client's privacy review.
