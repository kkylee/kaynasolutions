import fs from 'node:fs'
import path from 'node:path'
import { describe, expect, it } from 'vitest'

const root = path.resolve(__dirname, '..')
const read = (file) => fs.readFileSync(path.join(root, file), 'utf8')
const exists = (file) => fs.existsSync(path.join(root, file))

const pageFiles = [
  'index.html',
  'services/index.html',
  'solutions/index.html',
  'about/index.html',
  'portfolio/index.html',
  'insights/index.html',
  'contact/index.html',
]

describe('Kayna brand assets', () => {
  it('uses the supplied profile icon as the logo master', () => {
    expect(exists('brand/kayna-icon-master.png')).toBe(true)
    expect(exists('brand/png/kayna-icon-1024.png')).toBe(true)
    expect(exists('brand/png/kayna-icon-512.png')).toBe(true)
    expect(exists('public/brand/kayna-icon.png')).toBe(true)
  })

  it('ships PNG favicons and the Apple touch icon', () => {
    expect(exists('public/favicon-32.png')).toBe(true)
    expect(exists('public/favicon-192.png')).toBe(true)
    expect(exists('public/apple-touch-icon.png')).toBe(true)
  })

  it('links the supplied icon favicons from every page', () => {
    for (const file of pageFiles) {
      const html = read(file)
      expect(html).toContain('href="/favicon-32.png"')
      expect(html).toContain('href="/favicon-192.png"')
      expect(html).toContain('href="/apple-touch-icon.png"')
      expect(html).not.toContain('/favicon.svg')
    }
  })

  it('builds the logo lockup from the supplied icon and standard type', () => {
    const logo = read('brand/kayna-logo.svg')
    expect(logo).toContain('data:image/png;base64,')
    expect(logo).toContain('font-family="Manrope"')
    expect(logo).toContain('font-family="Inter"')
    expect(logo).toContain('Kayna')
    expect(logo).toContain('IT Solutions')
    expect(logo).not.toContain('>SOLUTIONS<')
    expect(read('brand/kayna-logo-inverse.svg')).toContain('data:image/png;base64,')
  })

  it('uses the supplied icon and the full brand name in the Open Graph image', () => {
    const og = read('public/og/og-default.svg')
    expect(og).toContain('data:image/png;base64,')
    expect(og).toContain('<title>Kayna IT Solutions')
    expect(og).toContain('Better business starts with better systems.')
    expect(og).toContain('IT Solutions')
    expect(exists('public/og/og-default.png')).toBe(true)
  })

  it('uses the package name and no old or unused brand files', () => {
    expect(read('package.json')).toContain('"name": "kayna-digital-solutions"')
    expect(exists('public/favicon.svg')).toBe(false)
    expect(exists('brand/kayna-mark-dark.svg')).toBe(false)
    expect(exists('public/brand/kayna-logo.svg')).toBe(false)
  })

  it('points robots.txt at the Kayna sitemap', () => {
    expect(read('public/robots.txt')).toContain('Sitemap: https://kaynasolutions.com/sitemap.xml')
  })
})
