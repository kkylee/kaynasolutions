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
  if (!doc.querySelector('meta[name="twitter:card"]')) fail(`${label} — missing twitter:card`)

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

console.log(`PASS — ${pages.length} pages, sitemap and robots OK (${site.name})`)
