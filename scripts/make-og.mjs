import fs from 'node:fs'
import path from 'node:path'
import sharp from 'sharp'

const outDir = path.resolve('public/og')
fs.mkdirSync(outDir, { recursive: true })

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="#101D35" />
  <circle cx="1090" cy="118" r="230" fill="#14B8A6" opacity="0.07" />
  <circle cx="1140" cy="560" r="180" fill="#2563EB" opacity="0.10" />

  <g transform="translate(80 64) scale(4)">
    <rect width="32" height="32" rx="8" fill="#FFFFFF" opacity="0.06" />
    <path d="M11 12.25h7.25a4.75 4.75 0 0 1 0 9.5H13.5" fill="none" stroke="#FFFFFF" stroke-width="2.6" stroke-linecap="round" />
    <path d="M21 19.75h-7.25a4.75 4.75 0 0 1 0-9.5H18.5" fill="none" stroke="#14B8A6" stroke-width="2.6" stroke-linecap="round" />
  </g>

  <text x="232" y="140" font-family="Manrope, 'Segoe UI', Arial, sans-serif" font-size="44" font-weight="700" letter-spacing="-0.5" fill="#FFFFFF">Solvanta<tspan font-weight="400" fill="#FFFFFF" opacity="0.68"> Digital</tspan></text>

  <rect x="80" y="244" width="72" height="6" rx="3" fill="#14B8A6" />

  <text font-family="Manrope, 'Segoe UI', Arial, sans-serif" font-size="66" font-weight="700" letter-spacing="-1.8" fill="#FFFFFF">
    <tspan x="80" y="344">Better business starts</tspan>
    <tspan x="80" y="420">with better systems.</tspan>
  </text>

  <text x="80" y="492" font-family="Inter, 'Segoe UI', Arial, sans-serif" font-size="26" fill="#CBD5E1">Practical software, automation, and connected systems for growing businesses.</text>

  <text x="80" y="566" font-family="Inter, 'Segoe UI', Arial, sans-serif" font-size="22" font-weight="600" letter-spacing="1.6" fill="#14B8A6">SOLVANTADIGITAL.COM</text>
</svg>`

const svgFile = path.join(outDir, 'og-default.svg')
const pngFile = path.join(outDir, 'og-default.png')

fs.writeFileSync(svgFile, svg)
const info = await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toFile(pngFile)

console.log(
  `OG image written: ${path.relative(process.cwd(), pngFile)} — ${info.width}×${info.height}, ${(info.size / 1024).toFixed(1)} KB`,
)
