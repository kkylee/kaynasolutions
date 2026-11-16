import fs from 'node:fs'
import path from 'node:path'
import sharp from 'sharp'
import manifest from './images.manifest.json' with { type: 'json' }

const outDir = path.resolve('src/assets/images')
const cacheDir = path.join(process.env.TEMP ?? '.', 'kayna-digital-originals')
const widths = [640, 1024, 1600]
const force = process.argv.includes('--force')

fs.mkdirSync(outDir, { recursive: true })
fs.mkdirSync(cacheDir, { recursive: true })

let total = 0
let downloaded = 0

for (const entry of manifest) {
  const original = path.join(cacheDir, `${entry.key}.jpg`)
  if (!fs.existsSync(original) || force) {
    const url = `https://images.pexels.com/photos/${entry.id}/pexels-photo-${entry.id}.jpeg?auto=compress&cs=tinysrgb&w=2000`
    const res = await fetch(url)
    if (!res.ok) {
      throw new Error(`download failed for ${entry.key}: ${res.status}`)
    }
    fs.writeFileSync(original, Buffer.from(await res.arrayBuffer()))
    downloaded += 1
  }

  for (const width of widths) {
    const target = path.join(outDir, `${entry.key}-${width}.webp`)
    const budget = 280 * 1024
    if (!force && fs.existsSync(target) && fs.statSync(target).size > 0 && fs.statSync(target).size <= budget) {
      total += fs.statSync(target).size
      continue
    }
    let quality = 78
    await sharp(original).resize({ width, withoutEnlargement: true }).webp({ quality, effort: 5 }).toFile(target)
    while (fs.statSync(target).size > budget && quality > 52) {
      quality -= 8
      await sharp(original).resize({ width, withoutEnlargement: true }).webp({ quality, effort: 5 }).toFile(target)
    }
    total += fs.statSync(target).size
  }

  console.log(
    `  ${entry.key.padEnd(24)} ${widths.map((w) => `${w}`).join('/')} · ${(fs.statSync(path.join(outDir, `${entry.key}-1600.webp`)).size / 1024).toFixed(0)} KB @1600`,
  )
}

const credits = [
  '# Image credits',
  '',
  'All photographs are used under the [Pexels License](https://www.pexels.com/license/), which permits free commercial use without attribution. Credits are recorded here as good practice and to make the sources auditable.',
  '',
  '| File key | Photographer | Source |',
  '| --- | --- | --- |',
  ...manifest.map((entry) => `| \`${entry.key}\` | ${entry.photographer} | ${entry.source} |`),
  '',
  '## Notes',
  '',
  '- Variants are generated at 640, 1024 and 1600 px wide in WebP (quality 78) by `scripts/fetch-images.mjs`.',
  '- No photograph is captioned as a named client, employee, or engagement. Alt text describes the scene only.',
  '- Photographs show Filipino and wider Southeast Asian business settings where the source library allowed. Where the library had no suitable scene, a general small-business or office scene was used rather than mislabelling a photo.',
  '',
].join('\n')

fs.writeFileSync(path.resolve('docs/image-credits.md'), credits)

console.log(
  `\n${manifest.length} images · ${downloaded} downloaded · ${(total / 1024 / 1024).toFixed(2)} MB of WebP generated`,
)
