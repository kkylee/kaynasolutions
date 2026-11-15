import fs from 'node:fs'
import path from 'node:path'
import sharp from 'sharp'

const svgFile = path.resolve('public/og/og-default.svg')
const pngFile = path.resolve('public/og/og-default.png')

if (!fs.existsSync(svgFile)) {
  console.error(`Missing ${path.relative(process.cwd(), svgFile)}`)
  process.exit(1)
}

const info = await sharp(fs.readFileSync(svgFile))
  .png({ compressionLevel: 9 })
  .toFile(pngFile)

console.log(
  `OG image written: ${path.relative(process.cwd(), pngFile)} — ${info.width}×${info.height}, ${(info.size / 1024).toFixed(1)} KB`,
)
