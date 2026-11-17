import fs from 'node:fs'
import path from 'node:path'
import sharp from 'sharp'

const root = process.cwd()
const masterFile = path.resolve(root, 'brand/kayna-icon-master.png')

if (!fs.existsSync(masterFile)) {
  throw new Error('Missing brand/kayna-icon-master.png — save the supplied profile icon there first.')
}

const manropeFile = path.resolve(
  root,
  'node_modules/@fontsource-variable/manrope/files/manrope-latin-wght-normal.woff2',
)
const interFile = path.resolve(
  root,
  'node_modules/@fontsource-variable/inter/files/inter-latin-wght-normal.woff2',
)
const manrope = fs.readFileSync(manropeFile).toString('base64')
const inter = fs.readFileSync(interFile).toString('base64')

const fontStyle = `<style>
  @font-face{font-family:Manrope;src:url(data:font/woff2;base64,${manrope}) format('woff2');font-weight:200 800;font-style:normal;}
  @font-face{font-family:Inter;src:url(data:font/woff2;base64,${inter}) format('woff2');font-weight:100 900;font-style:normal;}
</style>`

// The supplied profile icon is 2048×2048 with generous navy margins. Crop a
// centred 1024×1024 window so the mark keeps a proper optical size wherever it
// appears, from the 32 px favicon to the 120 px Open Graph lockup.
const icon = await sharp(masterFile)
  .extract({ left: 512, top: 512, width: 1024, height: 1024 })
  .png({ compressionLevel: 9 })
  .toBuffer()
const iconForSvg = await sharp(icon).resize(512, 512).png({ compressionLevel: 9 }).toBuffer()
const iconData = iconForSvg.toString('base64')

const logoSvg = (inverse = false) => {
  const primary = inverse ? '#FFFFFF' : '#101D35'
  const secondary = inverse ? '#CBD5E1' : '#475569'
  return `<svg xmlns="http://www.w3.org/2000/svg" width="340" height="120" viewBox="0 0 340 120" role="img" aria-label="Kayna IT Solutions">
  <title>Kayna IT Solutions</title>
  ${fontStyle}
  <defs><clipPath id="logo-icon"><rect x="0" y="20" width="80" height="80" rx="14" /></clipPath></defs>
  <image x="0" y="20" width="80" height="80" clip-path="url(#logo-icon)" href="data:image/png;base64,${iconData}" />
  <text x="100" y="66" font-family="Manrope" font-size="48" font-weight="700" fill="${primary}">Kayna</text>
  <text x="102" y="94" font-family="Inter" font-size="17" font-weight="500" fill="${secondary}">IT Solutions</text>
</svg>`
}

const ogSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630" role="img" aria-label="Kayna IT Solutions — Better business starts with better systems.">
  <title>Kayna IT Solutions — Better business starts with better systems.</title>
  ${fontStyle}
  <rect width="1200" height="630" fill="#101D35" />
  <circle cx="1090" cy="118" r="230" fill="#14B8A6" opacity="0.07" />
  <circle cx="1140" cy="560" r="180" fill="#2563EB" opacity="0.10" />
  <defs><clipPath id="og-icon"><rect x="80" y="64" width="120" height="120" rx="26" /></clipPath></defs>
  <image x="80" y="64" width="120" height="120" clip-path="url(#og-icon)" href="data:image/png;base64,${iconData}" />
  <rect x="80.5" y="64.5" width="119" height="119" rx="25.5" fill="none" stroke="#FFFFFF" stroke-opacity="0.14" />
  <text x="224" y="128" font-family="Manrope" font-size="52" font-weight="700" fill="#FFFFFF">Kayna</text>
  <text x="226" y="164" font-family="Inter" font-size="20" font-weight="500" fill="#CBD5E1">IT Solutions</text>
  <rect x="80" y="244" width="72" height="6" rx="3" fill="#14B8A6" />
  <text x="80" y="332" font-family="Manrope" font-size="62" font-weight="700" fill="#FFFFFF">Better business starts</text>
  <text x="80" y="404" font-family="Manrope" font-size="62" font-weight="700" fill="#FFFFFF">with better systems.</text>
  <text x="80" y="500" font-family="Inter" font-size="24" font-weight="400" fill="#CBD5E1">Big-business capabilities, practical solutions for growing businesses.</text>
</svg>`

const files = {
  'brand/kayna-logo.svg': logoSvg(false),
  'brand/kayna-logo-inverse.svg': logoSvg(true),
  'public/og/og-default.svg': ogSvg,
}

for (const [file, svg] of Object.entries(files)) {
  const out = path.resolve(root, file)
  fs.mkdirSync(path.dirname(out), { recursive: true })
  fs.writeFileSync(out, svg)
  console.log(`wrote ${file}`)
}

const image = async (buffer, file, size) => {
  const out = path.resolve(root, file)
  fs.mkdirSync(path.dirname(out), { recursive: true })
  await sharp(buffer).resize(size, size, { fit: 'cover' }).png({ compressionLevel: 9 }).toFile(out)
  console.log(`rendered ${file} @${size}px`)
}

const raster = async (svg, file, width) => {
  const out = path.resolve(root, file)
  fs.mkdirSync(path.dirname(out), { recursive: true })
  await sharp(Buffer.from(svg)).resize({ width }).png({ compressionLevel: 9 }).toFile(out)
  console.log(`rendered ${file} @${width}px`)
}

await image(icon, 'brand/png/kayna-icon-1024.png', 1024)
await image(icon, 'brand/png/kayna-icon-512.png', 512)
await image(icon, 'public/brand/kayna-icon.png', 256)
await image(icon, 'public/favicon-32.png', 32)
await image(icon, 'public/favicon-192.png', 192)
await image(icon, 'public/apple-touch-icon.png', 180)

await raster(files['brand/kayna-logo.svg'], 'brand/png/kayna-logo-1600.png', 1600)
await raster(files['brand/kayna-logo-inverse.svg'], 'brand/png/kayna-logo-inverse-1600.png', 1600)
await sharp(Buffer.from(ogSvg)).png({ compressionLevel: 9 }).toFile(path.resolve(root, 'public/og/og-default.png'))
console.log('rendered public/og/og-default.png @1200x630')
