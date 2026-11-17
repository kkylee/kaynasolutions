# Kayna Digital Solutions

A seven-page corporate website for Kayna Digital Solutions, built with Vue 3, Vite, and Tailwind CSS v4. Every page is a real HTML entry point; Vue provides the interface, and all content lives in local JavaScript data files. There is no database, CMS, or admin area. Contact-form delivery uses the site's `/api/send` endpoint.

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
| `npm run brand` | Regenerate the icon sizes, favicons, logo lockups, and OG image from the supplied profile icon |
| `npm run og` | Regenerate `public/og/og-default.png` from the SVG |

Run `npm run check` before any deployment. It fails on broken internal links, missing metadata, missing image dimensions, duplicate IDs, a missing `<noscript>` fallback, oversized JS, or a broken sitemap.

## Structure

```
brand/                       supplied profile icon, generated logo pack, usage notes
build/seo-plugin.js          Per-page <head>, JSON-LD, <noscript>, sitemap
public/                      favicons, apple-touch-icon, robots.txt, _headers, OG image
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
- `services.js` — seven services with problems, benefits, and examples
- `solutions.js` — six solutions with problem, approach, steps, benefits
- `projects.js` — five demonstration projects and the portfolio note
- `articles.js` — six sample articles rendered inline on Insights
- `home.js`, `about.js` — page-specific narrative blocks
- `pages.js` — titles, meta descriptions, and OG image path per page

After editing content, run `npm test` — the data suite checks lengths, uniqueness of slugs, and word counts, and the page suites assert that the rendered pages match the data.

### Contact details

The email, telephone, and mobile number are stored in `site.js` and shown in the footer and on the Contact page. `phoneHref` and `mobileHref` hold the international `tel:` values. The Facebook and LinkedIn links point to the supplied profiles and open in a new tab with `rel="noopener noreferrer"`.

`SITE_URL` in the same file drives canonicals, Open Graph URLs, the sitemap, and JSON-LD. Change it to the final domain before launch. The site name, contact details, and description live in the same file; page titles and descriptions are in `pages.js`.

### Brand assets

The supplied profile icon is the source of truth and lives at [`brand/kayna-icon-master.png`](brand/kayna-icon-master.png). Run `npm run brand` to regenerate the centred icon crops, favicons, Apple touch icon, horizontal lockups, and OG image. See [`brand/README.md`](brand/README.md) for the full asset list and usage rules. The header and footer pair the icon with live Manrope/Inter typography in the `Wordmark` component.

### Photography

The image manifest at `scripts/images.manifest.json` records the Pexels photo ID, photographer, licence, aspect ratio, and alt text for every image. To add one:

1. Add an entry with a unique `key`, Pexels photo `id`, `source`, `photographer`, `aspect`, and a scene-describing `alt`.
2. Run `npm run images` (add `--force` to re-encode everything).
3. Reference it with `img('your-key')` from `src/lib/images.js`.
4. Run `npm test` — `tests/images.test.js` checks every manifest entry has three variants, dimensions, and meaningful alt text.

Variants are generated at 640, 1024, and 1600 px in WebP. The script lowers quality for any 1600 px variant that would exceed 280 KB. Credits are written to `docs/image-credits.md`.

### Demonstration content

Portfolio projects and Insights articles are labelled demonstrations in the page copy, in the footer, and on each card. They must never be rewritten to imply real client work without replacing the labels and the `projectsNote` in `src/data/projects.js`. The same applies to screenshots: the system panels are hand-built mockups, not client screenshots.

## Contact form delivery

The form posts JSON to `/api/send`, which is managed separately from this repository. That endpoint accepts `to`, `subject`, at least one of `text` or `html`, and an optional `reply_to`. The form sends to `site.email`, sets the visitor's address as `reply_to`, and does not store submissions on the site.

The endpoint allows the production origins `https://kaynasolutions.com` and `https://www.kaynasolutions.com`. The Vite dev server proxies `/api/send` to the production endpoint and rewrites the `Origin` header, so local form testing works without adding a localhost exception to the endpoint.

If delivery fails, the form shows a safe error and a `mailto:` fallback to `site.email`, so the visitor can still send the same details from their mail app. No API key is stored in this repository. If the endpoint URL or contract changes, update `src/components/sections/ContactForm.vue`, `vite.config.js`, and `tests/contact-form.test.js`.

## Deployment

Cloudflare Pages, static output. Full steps, custom domain notes, and rollback instructions are in [`docs/deployment.md`](docs/deployment.md). Short version:

- Build command: `npm run build`
- Output directory: `dist`
- Node version: 22 (set `NODE_VERSION=22` if the project does not pick up `.nvmrc`)
- No SPA rewrite rules: every page is a real folder with an `index.html`

## Launch checklist

- [ ] Confirm the email, phone, location, and Facebook/LinkedIn URLs in `src/data/site.js` before launch
- [ ] Set `SITE_URL` to the production domain (with no trailing slash) and update the `Sitemap:` line in `public/robots.txt`
- [ ] Review every demonstration label (portfolio, insights, footer, banners)
- [ ] Run `npm run check` and confirm the PASS line plus budgets
- [ ] Check the site on a real phone at 320 px and on a slow connection
- [ ] Tab through all seven pages and open/close the mobile menu and article panels
- [ ] Submit a real test enquiry through the deployed form, confirm it arrives at `info@kaynasolutions.com`, and test the mailto fallback by temporarily going offline in browser devtools
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
