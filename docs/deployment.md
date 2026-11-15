# Deployment — Cloudflare Pages

The site builds to plain static files in `dist/`. There is no server, database, or SPA rewrite. Every page is a directory with its own `index.html`, so `/services/` resolves without any routing rules.

## Build settings

| Setting | Value |
| --- | --- |
| Framework preset | None (or Vite) |
| Build command | `npm run build` |
| Build output directory | `dist` |
| Node version | 22 (`NODE_VERSION=22` environment variable if `.nvmrc` is ignored) |
| Install command | `npm ci` (or the platform default) |

Do **not** enable a single-page-application fallback. A catch-all rewrite to `index.html` will make `/services/` return the home page and break canonicals.

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
npx wrangler pages deploy dist --project-name sol-digital
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
2. Enter the apex domain (for example `soldigital.com`) and the `www` variant.
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
- **Contact form appears to do nothing** — that is expected: it prepares a `mailto:` draft rather than submitting. See the README before connecting an endpoint.

## What this deployment does not include

- No form backend, CRM, or email delivery. The contact form hands off to the visitor's mail app.
- No analytics or consent tooling.
- No redirects file. If pages are renamed later, add `public/_redirects` and update internal links plus `src/data/pages.js`.
