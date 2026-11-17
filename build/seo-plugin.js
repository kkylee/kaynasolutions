import fs from 'node:fs'
import path from 'node:path'
import { pages, pageFor } from '../src/data/pages.js'
import { SITE_URL, site, nav } from '../src/data/site.js'
import { THEME_COLORS, themeInitScript } from '../src/lib/theme.js'

const esc = (value) =>
  String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')

function jsonLd() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: site.name,
    alternateName: site.shortName,
    url: SITE_URL,
    description: site.description,
    email: site.email,
    telephone: site.mobileHref,
    areaServed: 'Philippines',
    sameAs: site.socials.map((social) => social.href).filter((href) => href && href !== '#'),
  }
  return `<script type="application/ld+json">${JSON.stringify(data)}</script>`
}

function headFor(page) {
  const url = SITE_URL + page.path
  const image = SITE_URL + page.ogImage
  return [
    `<title>${esc(page.title)}</title>`,
    `<meta name="description" content="${esc(page.description)}" />`,
    `<meta name="theme-color" content="${THEME_COLORS.light}" />`,
    `<meta name="color-scheme" content="light dark" />`,
    `<script>${themeInitScript()}</script>`,
    `<link rel="canonical" href="${url}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="${esc(site.name)}" />`,
    `<meta property="og:title" content="${esc(page.title)}" />`,
    `<meta property="og:description" content="${esc(page.description)}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:image" content="${image}" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${esc(page.title)}" />`,
    `<meta name="twitter:description" content="${esc(page.description)}" />`,
    `<meta name="twitter:image" content="${image}" />`,
    ...(page.path === '/' ? [jsonLd()] : []),
  ].join('\n    ')
}

function noscriptFor() {
  return [
    '<div class="noscript-fallback">',
    `<p><strong>${esc(site.name)}</strong> — ${esc(site.tagline)}</p>`,
    `<nav aria-label="Pages">${nav.map((item) => `<a href="${item.path}">${esc(item.label)}</a>`).join(' · ')}</nav>`,
    `<p>Email <a href="mailto:${esc(site.email)}">${esc(site.email)}</a> · <a href="tel:${esc(site.phoneHref)}">${esc(site.phone)}</a> · <a href="tel:${esc(site.mobileHref)}">${esc(site.mobile)}</a> · ${esc(site.location)}</p>`,
    '</div>',
  ].join('')
}

function sitemap() {
  const today = new Date().toISOString().slice(0, 10)
  const urls = pages
    .map(
      (page) => `  <url>
    <loc>${SITE_URL}${page.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>${page.path === '/' ? '1.0' : '0.8'}</priority>
  </url>`,
    )
    .join('\n')
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`
}

export function seo() {
  let outDir = 'dist'

  return {
    name: 'kayna-digital-solutions-seo',
    configResolved(config) {
      outDir = config.build.outDir
    },
    transformIndexHtml: {
      order: 'pre',
      handler(html, ctx) {
        const page = pageFor(ctx.filename)
        if (!page) return html
        return {
          html: html.replace('<!--seo-->', headFor(page)),
          tags: [{ tag: 'noscript', children: noscriptFor(), injectTo: 'body-prepend' }],
        }
      },
    },
    closeBundle() {
      const dir = path.resolve(process.cwd(), outDir)
      if (!fs.existsSync(dir)) return
      fs.writeFileSync(path.join(dir, 'sitemap.xml'), sitemap())

      const assetDir = path.join(dir, 'assets')
      if (!fs.existsSync(assetDir)) return
      const fonts = fs
        .readdirSync(assetDir)
        .filter((file) => /-latin-wght-normal-[A-Za-z0-9_-]+\.woff2$/.test(file))
      if (!fonts.length) return
      const preloads = fonts
        .map(
          (font) =>
            `<link rel="preload" href="/assets/${font}" as="font" type="font/woff2" crossorigin />`,
        )
        .join('\n    ')

      for (const page of pages) {
        const file = path.join(dir, page.html)
        if (!fs.existsSync(file)) continue
        const html = fs.readFileSync(file, 'utf8')
        if (!html.includes('as="font"')) {
          fs.writeFileSync(file, html.replace('</head>', `  ${preloads}\n  </head>`))
        }
      }
    },
  }
}
