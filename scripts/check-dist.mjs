import fs from 'node:fs'
import path from 'node:path'
import { pathToFileURL, fileURLToPath } from 'node:url'
import { parse } from 'node-html-parser'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const dist = path.join(root, 'dist')

if (!fs.existsSync(dist)) {
  console.error('FAIL — dist not found. Run `npm run build` first.')
  process.exit(1)
}

const { pages } = await import(pathToFileURL(path.join(root, 'src/data/pages.js')).href)
const { SITE_URL, site, nav } = await import(pathToFileURL(path.join(root, 'src/data/site.js')).href)

const errors = []
const fail = (message) => errors.push(message)
const kb = (bytes) => `${(bytes / 1024).toFixed(1)} KB`
const pageWeights = []

const fileFor = (page) => (page.path === '/' ? path.join(dist, 'index.html') : path.join(dist, page.path, 'index.html'))

const resolves = (href) => {
  const clean = href.split('#')[0].split('?')[0]
  if (!clean.startsWith('/')) return true
  let decoded
  try {
    decoded = decodeURIComponent(clean)
  } catch {
    return false
  }
  const target = decoded.endsWith('/')
    ? path.join(dist, decoded, 'index.html')
    : path.join(dist, decoded)
  return fs.existsSync(target)
}

const seenIds = (root) => {
  const ids = new Map()
  for (const el of root.querySelectorAll('[id]')) {
    const id = el.getAttribute('id')
    ids.set(id, (ids.get(id) ?? 0) + 1)
  }
  return [...ids.entries()].filter(([, count]) => count > 1).map(([id]) => id)
}

for (const page of pages) {
  const file = fileFor(page)
  const label = page.path

  if (!fs.existsSync(file)) {
    fail(`${label} — built file missing (${path.relative(root, file)})`)
    continue
  }

  const html = fs.readFileSync(file, 'utf8')
  const doc = parse(html, { comment: true })
  const source = html

  const title = doc.querySelector('title')?.text?.trim() ?? ''
  if (title.length < 15 || title.length > 65) {
    fail(`${label} — title is ${title.length} chars (need 15–65): "${title}"`)
  }

  const desc = (doc.querySelector('meta[name="description"]')?.getAttribute('content') ?? '').trim()
  if (desc.length < 50 || desc.length > 160) {
    fail(`${label} — meta description is ${desc.length} chars (need 50–160)`)
  }

  const canonical = doc.querySelector('link[rel="canonical"]')?.getAttribute('href') ?? ''
  if (canonical !== SITE_URL + page.path) {
    fail(`${label} — canonical "${canonical}" ≠ "${SITE_URL + page.path}"`)
  }

  const og = (prop) => doc.querySelector(`meta[property="og:${prop}"]`)?.getAttribute('content') ?? ''
  for (const prop of ['title', 'description', 'url', 'image']) {
    if (!og(prop)) fail(`${label} — missing og:${prop}`)
  }
  if (og('url') && canonical && og('url') !== canonical) {
    fail(`${label} — og:url "${og('url')}" ≠ canonical`)
  }
  if (og('image') && !/^https?:\/\//.test(og('image'))) {
    fail(`${label} — og:image must be absolute: "${og('image')}"`)
  }
  if (og('image')) {
    const relative = og('image').replace(SITE_URL, '').replace(/^\/+/, '')
    if (!fs.existsSync(path.join(dist, relative))) {
      fail(`${label} — og:image file missing from dist: ${og('image')}`)
    }
  }
  if (!doc.querySelector('meta[name="twitter:card"]')) fail(`${label} — missing twitter:card`)

  const jsonLd = doc.querySelectorAll('script[type="application/ld+json"]')
  if (page.path === '/') {
    if (jsonLd.length !== 1) {
      fail(`${label} — expected exactly one Organization JSON-LD block, found ${jsonLd.length}`)
    } else {
      try {
        const data = JSON.parse(jsonLd[0].text ?? jsonLd[0].textContent ?? '')
        if (data['@type'] !== 'Organization') fail(`${label} — JSON-LD @type must be Organization`)
        for (const key of ['name', 'url', 'description']) {
          if (!data[key]) fail(`${label} — JSON-LD missing "${key}"`)
        }
        if (data.url !== SITE_URL) fail(`${label} — JSON-LD url "${data.url}" ≠ "${SITE_URL}"`)
        if (data.email !== site.email) fail(`${label} — JSON-LD email does not match site.email`)
        if (!Array.isArray(data.sameAs)) {
          fail(`${label} — JSON-LD missing sameAs social profiles`)
        } else {
          for (const social of site.socials) {
            if (!data.sameAs.includes(social.href)) {
              fail(`${label} — JSON-LD sameAs missing ${social.href}`)
            }
          }
        }
      } catch (error) {
        fail(`${label} — JSON-LD is not valid JSON (${error.message})`)
      }
    }
  } else if (jsonLd.length) {
    fail(`${label} — JSON-LD must only appear on the home page`)
  }

  const noscript = doc.querySelector('noscript')
  const noscriptHtml = noscript?.innerHTML ?? ''
  if (!noscript) {
    fail(`${label} — missing <noscript> fallback`)
  } else {
    for (const item of nav) {
      if (!noscriptHtml.includes(`href="${item.path}"`)) {
        fail(`${label} — noscript missing nav link ${item.path}`)
      }
    }
    if (!noscriptHtml.includes('mailto:')) fail(`${label} — noscript missing mailto: link`)
  }

  for (const img of doc.querySelectorAll('img')) {
    const alt = img.getAttribute('alt')
    if (alt === undefined || alt === null) fail(`${label} — <img> without alt: ${img.getAttribute('src') ?? '?'}`)
    if (!img.getAttribute('width') || !img.getAttribute('height')) {
      fail(`${label} — <img> without width/height: ${img.getAttribute('src') ?? '?'}`)
    }
  }

  for (const a of doc.querySelectorAll('a[href]')) {
    const href = a.getAttribute('href')
    if (!href || href.startsWith('#') || href.startsWith('mailto:') || /^https?:\/\//.test(href)) continue
    if (!resolves(href)) fail(`${label} — broken internal link: ${href}`)
  }

  for (const id of seenIds(doc)) fail(`${label} — duplicate id "${id}"`)

  if (!source.includes('lang="en"')) fail(`${label} — missing lang="en"`)

  const fontPreload = doc.querySelector('link[rel="preload"][as="font"]')
  if (!fontPreload) {
    fail(`${label} — missing preloaded variable font`)
  } else {
    const href = fontPreload.getAttribute('href').replace(/^\/+/, '')
    if (!fs.existsSync(path.join(dist, href))) fail(`${label} — font preload target missing: ${href}`)
  }

  const scripts = [
    ...new Set([
      ...doc.querySelectorAll('script[src]').map((el) => el.getAttribute('src')),
      ...doc.querySelectorAll('link[rel="modulepreload"]').map((el) => el.getAttribute('href')),
    ]),
  ]
  const jsBytes = scripts.reduce((total, src) => {
    const file = path.join(dist, src.replace(/^\/+/, ''))
    return total + (fs.existsSync(file) ? fs.statSync(file).size : 0)
  }, 0)
  pageWeights.push({ label, jsBytes })
}

const sitemapFile = path.join(dist, 'sitemap.xml')
if (!fs.existsSync(sitemapFile)) {
  fail('sitemap.xml missing')
} else {
  const sitemap = fs.readFileSync(sitemapFile, 'utf8')
  for (const page of pages) {
    if (!sitemap.includes(`<loc>${SITE_URL}${page.path}</loc>`)) {
      fail(`sitemap.xml missing <loc> for ${page.path}`)
    }
  }
  const lastmods = [...sitemap.matchAll(/<lastmod>([^<]+)<\/lastmod>/g)].map((match) => match[1])
  if (lastmods.length !== pages.length) {
    fail(`sitemap.xml has ${lastmods.length} lastmod values (expected ${pages.length})`)
  }
  for (const value of lastmods) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(value) || Number.isNaN(Date.parse(value))) {
      fail(`sitemap.xml has an invalid lastmod: "${value}"`)
    }
  }
}

const robotsFile = path.join(dist, 'robots.txt')
if (!fs.existsSync(robotsFile)) {
  fail('robots.txt missing')
} else if (!/^Sitemap:/m.test(fs.readFileSync(robotsFile, 'utf8'))) {
  fail('robots.txt missing Sitemap: line')
}

if (errors.length) {
  console.error(`FAIL — ${errors.length} issue(s):`)
  for (const error of errors) console.error(`  • ${error}`)
  process.exit(1)
}

const JS_BUDGET = 250 * 1024
for (const page of pageWeights) {
  if (page.jsBytes > JS_BUDGET) {
    fail(`${page.label} — JS weight ${kb(page.jsBytes)} exceeds 250 KB uncompressed`)
  }
}

const assetsDir = path.join(dist, 'assets')
const cssFiles = fs.existsSync(assetsDir)
  ? fs.readdirSync(assetsDir).filter((file) => file.endsWith('.css'))
  : []
const cssText = cssFiles.map((file) => fs.readFileSync(path.join(assetsDir, file), 'utf8')).join('\n')
if (cssText.includes('font-display:swap')) {
  fail('webfonts still use font-display: swap (layout shift risk)')
}
if (!cssText.includes('font-display:optional')) {
  fail('webfonts should use font-display: optional')
}
const webpFiles = fs.existsSync(assetsDir)
  ? fs.readdirSync(assetsDir).filter((file) => file.endsWith('.webp'))
  : []
const imageBytes = webpFiles.reduce((total, file) => total + fs.statSync(path.join(assetsDir, file)).size, 0)
const IMAGE_BUDGET = 20 * 1024 * 1024
if (imageBytes > IMAGE_BUDGET) {
  fail(`image weight ${(imageBytes / 1024 / 1024).toFixed(2)} MB exceeds 20 MB across ${webpFiles.length} files`)
}

if (errors.length) {
  console.error(`FAIL — ${errors.length} issue(s):`)
  for (const error of errors) console.error(`  • ${error}`)
  process.exit(1)
}

console.log('Per-page JS (uncompressed):')
for (const page of pageWeights) console.log(`  ${page.label.padEnd(12)} ${kb(page.jsBytes)}`)
console.log(
  `Images: ${(imageBytes / 1024 / 1024).toFixed(2)} MB across ${webpFiles.length} WebP files`,
)
console.log(`PASS — ${pages.length} pages, sitemap and robots OK (${site.name})`)
