import fs from 'node:fs'
import path from 'node:path'
import sharp from 'sharp'

const root = process.cwd()
const fontFile = path.resolve(root, 'node_modules/@fontsource-variable/manrope/files/manrope-latin-wght-normal.woff2')
const font = fs.readFileSync(fontFile).toString('base64')
const fontStyle = `<style>@font-face{font-family:Manrope;src:url(data:font/woff2;base64,${font}) format('woff2');font-weight:200 800;font-style:normal;}text{font-family:Manrope,Arial,sans-serif;}</style>`

const gradients = `
  <linearGradient id="k-purple" x1="0" y1="0" x2="1" y2="1">
    <stop offset="0" stop-color="#4B2EE6" />
    <stop offset="1" stop-color="#6D3AF0" />
  </linearGradient>
  <linearGradient id="k-blue" x1="0" y1="0" x2="1" y2="1">
    <stop offset="0" stop-color="#4F86F7" />
    <stop offset="1" stop-color="#2F62E3" />
  </linearGradient>`

const mark = (white = false) => `
  <g fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="9">
    <path d="M12 18C12 9 23 8 28 19L34 34V60" stroke="${white ? '#FFFFFF' : 'url(#k-purple)'}" />
    <path d="M56 14L34 36L56 58" stroke="${white ? '#FFFFFF' : 'url(#k-blue)'}" />
  </g>
  <circle cx="34" cy="12" r="7" fill="${white ? '#FFFFFF' : '#00AEEF'}" />`

const wordmark = (inverse = false, compact = false) => {
  const primary = inverse ? '#FFFFFF' : '#1B2A5B'
  const secondary = inverse ? '#E2E8F0' : '#64748B'
  const name = `<text x="96" y="52" font-size="48" font-weight="700" fill="${primary}">Kayna</text>`
  const descriptor = compact
    ? ''
    : `<text x="98" y="80" font-size="18" font-weight="500" letter-spacing="6" fill="${secondary}">SOLUTIONS</text>`
  const width = compact ? 272 : 348
  const height = compact ? 72 : 96
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" role="img" aria-label="Kayna Digital Solutions">
  <title>Kayna Digital Solutions</title>
  ${fontStyle}
  <defs>${gradients}</defs>
  ${mark()}
  ${name}
  ${descriptor}
</svg>`
}

const markSvg = (inverse = false) => `<svg xmlns="http://www.w3.org/2000/svg" width="72" height="72" viewBox="0 0 72 72" role="img" aria-label="Kayna Digital Solutions">
  <title>Kayna Digital Solutions</title>
  <defs>${gradients}</defs>
  ${inverse ? '<rect width="72" height="72" rx="18" fill="#FFFFFF" />' : ''}
  ${mark(inverse)}
</svg>`

const avatarSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="1024" height="1024" viewBox="0 0 1024 1024" role="img" aria-label="Kayna Digital Solutions">
  <title>Kayna Digital Solutions</title>
  <defs>${gradients}</defs>
  <rect width="1024" height="1024" rx="220" fill="#1B2A5B" />
  <g transform="translate(176 176) scale(9.333)">
    ${mark(true)}
  </g>
</svg>`

const faviconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" role="img" aria-label="Kayna Digital Solutions">
  <title>Kayna Digital Solutions</title>
  <rect width="64" height="64" rx="16" fill="#1B2A5B" />
  <g transform="translate(6 6) scale(0.775)">
    ${mark(true)}
  </g>
</svg>`

const ogSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630" role="img" aria-label="Kayna Digital Solutions — Better business starts with better systems.">
  <title>Kayna Digital Solutions — Better business starts with better systems.</title>
  ${fontStyle}
  <defs>${gradients}</defs>
  <rect width="1200" height="630" fill="#101D35" />
  <circle cx="1090" cy="118" r="230" fill="#14B8A6" opacity="0.07" />
  <circle cx="1140" cy="560" r="180" fill="#2563EB" opacity="0.10" />
  <g transform="translate(80 64) scale(1.55)">
    ${mark()}
    <text x="96" y="52" font-size="48" font-weight="700" fill="#FFFFFF">Kayna</text>
    <text x="98" y="80" font-size="18" font-weight="500" letter-spacing="6" fill="#CBD5E1">SOLUTIONS</text>
  </g>
  <rect x="80" y="244" width="72" height="6" rx="3" fill="#14B8A6" />
  <text x="80" y="332" font-size="62" font-weight="700" fill="#FFFFFF">Better business starts</text>
  <text x="80" y="404" font-size="62" font-weight="700" fill="#FFFFFF">with better systems.</text>
  <text x="80" y="500" font-size="24" font-weight="400" fill="#CBD5E1">Big-business capabilities, practical solutions for growing businesses.</text>
</svg>`

const files = {
  'brand/kayna-logo.svg': wordmark(false, false),
  'brand/kayna-logo-compact.svg': wordmark(false, true),
  'brand/kayna-logo-inverse.svg': wordmark(true, false),
  'brand/kayna-mark.svg': markSvg(false),
  'brand/kayna-mark-inverse.svg': markSvg(true),
  'brand/kayna-avatar.svg': avatarSvg,
  'public/favicon.svg': faviconSvg,
  'public/brand/kayna-logo.svg': wordmark(false, false),
  'public/brand/kayna-logo-compact.svg': wordmark(false, true),
  'public/og/og-default.svg': ogSvg,
}

for (const [file, svg] of Object.entries(files)) {
  fs.mkdirSync(path.dirname(path.resolve(root, file)), { recursive: true })
  fs.writeFileSync(path.resolve(root, file), svg)
  console.log(`wrote ${file}`)
}

const raster = async (svg, file, width) => {
  const out = path.resolve(root, file)
  fs.mkdirSync(path.dirname(out), { recursive: true })
  await sharp(Buffer.from(svg)).resize({ width }).png().toFile(out)
  console.log(`rendered ${file} @${width}px`)
}

await raster(files['brand/kayna-logo.svg'], 'brand/png/kayna-logo-1600.png', 1600)
await raster(files['brand/kayna-logo-inverse.svg'], 'brand/png/kayna-logo-inverse-1600.png', 1600)
await raster(files['brand/kayna-mark.svg'], 'brand/png/kayna-mark-512.png', 512)
await raster(files['brand/kayna-mark.svg'], 'brand/png/kayna-mark-1024.png', 1024)
await raster(files['brand/kayna-mark-inverse.svg'], 'brand/png/kayna-mark-inverse-1024.png', 1024)
await raster(files['brand/kayna-avatar.svg'], 'brand/png/kayna-avatar-1024.png', 1024)
await sharp(Buffer.from(ogSvg)).png().toFile(path.resolve(root, 'public/og/og-default.png'))
console.log('rendered public/og/og-default.png @1200x630')
