# Deployment — Cloudflare Pages

The site builds to static files in `dist/`. There is no database or SPA rewrite. Every page is a directory with its own `index.html`, so `/services/` resolves without any routing rules. One Cloudflare Pages Function, `functions/api/contact.js`, handles contact-form delivery.

## Build settings

| Setting | Value |
| --- | --- |
| Framework preset | None (or Vite) |
| Build command | `npm run build` |
| Build output directory | `dist` |
| Node version | 22 (`NODE_VERSION=22` environment variable if `.nvmrc` is ignored) |
| Install command | `npm ci` (or the platform default) |
| Functions directory | `functions/` at the repo root, auto-detected by Pages |

Do **not** enable a single-page-application fallback. A catch-all rewrite to `index.html` will make `/services/` return the home page and break canonicals.

## Contact form delivery

`functions/api/contact.js` handles `POST /api/contact`. It validates the form, blocks a filled honeypot and unrecognized origins, then sends the enquiry through Resend to `info@kaynasolutions.com`. The visitor's address becomes `reply_to`, and the site does not store the submission.

Add these Pages environment variables before testing the form:

| Variable | Required | Default |
| --- | --- | --- |
| `RESEND_API_KEY` | Yes | — |
| `CONTACT_TO` | No | `info@kaynasolutions.com` |
| `CONTACT_FROM` | No | `Kayna Website <website@kaynasolutions.com>` |
| `ALLOWED_ORIGINS` | No | The production domains plus the current Pages origin |

Mark `RESEND_API_KEY` as a secret. Do not commit it, and do not expose it through a `VITE_` variable. Verify `kaynasolutions.com` in Resend first; otherwise Resend will reject the send.

For local end-to-end testing, build the site and run Wrangler from the repo root so it picks up both `dist/` and `functions/`:

```bash
npm run build
npx wrangler pages dev dist --compatibility-date=2026-11-17
```

Create a gitignored `.dev.vars` in the repo root with `RESEND_API_KEY=...` for that local server. The normal `npm run dev` Vite server does not run Pages Functions, so use Wrangler when testing actual delivery.

For direct uploads, run `npx wrangler pages deploy dist --project-name kayna-digital-solutions` from the repo root. Wrangler uploads the `functions/` folder beside `dist/`; dashboard drag-and-drop does not support Functions.

## First deployment (Git-connected)

1. Push the repository to GitHub or GitLab.
2. In the Cloudflare dashboard, go to **Workers & Pages → Create → Pages → Connect to Git**.
3. Select the repository and the production branch (usually `main`).
4. Enter the build settings above.
5. Deploy. The first build installs dependencies, builds `dist/`, and publishes a `*.pages.dev` URL.
6. Open every page on the preview URL and click through the navigation, footer, service anchors, and article panels.

## Deploying without Git

```bash
npm ci
npm run check
npx wrangler pages deploy dist --project-name kayna-digital-solutions
```

`npm run check` must print the PASS line before uploading. The command uploads only `dist/`.

## Headers and caching

`public/_headers` is copied to the site root and applied by Cloudflare Pages:

- Hashed files under `/assets/*` are cached for a year as immutable.
- HTML is revalidated on every request, so a new deployment is visible immediately.
- The OG image is cached for a week.
- `X-Content-Type-Options: nosniff`, `Referrer-Policy`, `X-Frame-Options`, and `Permissions-Policy` are set globally.

If you add third-party scripts later, revisit the `Permissions-Policy` and consider a Content-Security-Policy. Test any CSP against the built site first; inline Vite module preloads and JSON-LD can require hashes.

## Custom domain

Pointing the real domain is the client's step and requires access to their DNS.

1. In the Pages project, open **Custom domains → Set up a domain**.
2. Enter the apex domain (for example `kaynasolutions.com`, currently a placeholder until the real domain is confirmed) and the `www` variant.
3. If the domain's DNS is already on Cloudflare, the required records are created automatically. Otherwise, add the CNAME or nameserver records shown.
4. Wait for the certificate to issue, then confirm both variants redirect to one canonical host.
5. Update `SITE_URL` in `src/data/site.js` to the chosen canonical host, update the `Sitemap:` line in `public/robots.txt` to the same host, run `npm run check`, and redeploy so canonicals, the sitemap, robots, Open Graph URLs, and JSON-LD all match.
6. Regenerate the sitemap by rebuilding (`npm run build` writes it), then submit `https://your-domain/sitemap.xml` in Google Search Console.

## After every content change

```bash
npm test
npm run check
git add -A && git commit -m "content: ..."
```

Cloudflare Pages builds each push to the production branch and keeps previous deployments for instant rollback.

## Rollback

In the Pages project, open **Deployments**, select the last known-good deployment, and choose **Rollback**. Static assets are immutable per deployment, so a rollback is immediate.

## Troubleshooting

- **`/services/` returns the home page** — an SPA fallback rewrite is active. Remove the `/* /index.html 200` rule.
- **404 on a folder URL** — confirm `dist/services/index.html` exists. The build creates it from `services/index.html` at the project root; do not rename those entry files.
- **Stale HTML after deploy** — check that the `/*.html` cache rule in `_headers` is present. Hashed assets can stay immutable.
- **OG preview shows the wrong image** — social platforms cache aggressively. Re-scrape with the platform's debugger after deploying; confirm `SITE_URL` matches the live host.
- **Build fails on Node** — set `NODE_VERSION=22`. `sharp` ships prebuilt binaries for the supported platforms.
- **Contact form says it is not configured** — add `RESEND_API_KEY` to the Pages environment and redeploy.
- **Contact form returns a 502** — confirm the Resend domain is verified, `CONTACT_FROM` uses that verified domain, and the API key is a valid send-only key.
- **Contact form works locally but not on Pages** — confirm the deployment includes `functions/api/contact.js` and that the environment variable is set for the matching environment.

## What this deployment does not include

- No database, CRM, or marketing automation. Contact submissions are emailed through Resend and are not stored on the website.
- No analytics or consent tooling.
- No redirects file. If pages are renamed later, add `public/_redirects` and update internal links plus `src/data/pages.js`.
