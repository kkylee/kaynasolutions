import fs from 'node:fs'
import path from 'node:path'
import { describe, expect, it } from 'vitest'

const root = path.resolve(__dirname, '..')
const read = (file) => fs.readFileSync(path.join(root, file), 'utf8')
const exists = (file) => fs.existsSync(path.join(root, file))

describe('Kayna brand assets', () => {
  it('uses the new name in the favicon and logo pack', () => {
    expect(read('public/favicon.svg')).toContain('aria-label="Kayna Digital Solutions"')
    expect(read('brand/kayna-logo.svg')).toContain('Kayna')
    expect(read('brand/kayna-logo.svg')).toContain('SOLUTIONS')
    expect(read('brand/kayna-logo-inverse.svg')).toContain('Kayna')
  })

  it('ships the compact and public logo variants', () => {
    expect(exists('brand/kayna-logo-compact.svg')).toBe(true)
    expect(exists('public/brand/kayna-logo.svg')).toBe(true)
    expect(exists('public/brand/kayna-logo-compact.svg')).toBe(true)
  })

  it('uses the package name and no old Sol brand files', () => {
    expect(read('package.json')).toContain('"name": "kayna-digital-solutions"')
    expect(exists('brand/sol-digital-logo.svg')).toBe(false)
  })

  it('uses the Kayna name and tagline in the Open Graph image', () => {
    const og = read('public/og/og-default.svg')
    expect(og).toContain('<title>Kayna Digital Solutions')
    expect(og).toContain('Better business starts with better systems.')
    expect(exists('public/og/og-default.png')).toBe(true)
  })

  it('points robots.txt at the Kayna sitemap', () => {
    expect(read('public/robots.txt')).toContain('Sitemap: https://kaynasolutions.com/sitemap.xml')
  })
})
