import fs from 'node:fs'
import path from 'node:path'
import { describe, expect, it } from 'vitest'
import manifest from '../scripts/images.manifest.json'
import { img } from '../src/lib/images'
import { services } from '../src/data/services'
import { articles } from '../src/data/articles'

const WIDTHS = [640, 1024, 1600]
const dir = path.resolve(__dirname, '../src/assets/images')

describe('image manifest', () => {
  it('covers every scene the site uses', () => {
    const keys = manifest.map((entry) => entry.key)
    expect(keys.length).toBeGreaterThanOrEqual(15)
    expect(new Set(keys).size).toBe(keys.length)

    const used = [...services.map((service) => service.image), ...articles.map((article) => article.image)]
    for (const key of used) {
      expect(keys).toContain(key)
    }
    expect(keys).toContain('hero-consultation')
  })

  it('records a licence and a source for every image', () => {
    for (const entry of manifest) {
      expect(entry.source).toMatch(/^https:\/\/www\.pexels\.com\/photo\//)
      expect(entry.photographer.length).toBeGreaterThan(1)
      expect(entry.license).toBe('Pexels License')
      expect(entry.aspect[0]).toBeGreaterThan(0)
      expect(entry.aspect[1]).toBeGreaterThan(0)
    }
  })

  it('describes every image for screen readers', () => {
    for (const entry of manifest) {
      expect(entry.alt.length).toBeGreaterThanOrEqual(40)
      expect(entry.alt.length).toBeLessThanOrEqual(160)
    }
  })
})

describe('generated variants', () => {
  it('has three WebP widths per image, each under 300 KB', () => {
    for (const entry of manifest) {
      for (const width of WIDTHS) {
        const file = path.join(dir, `${entry.key}-${width}.webp`)
        expect(fs.existsSync(file), `${entry.key}-${width}.webp missing`).toBe(true)
        expect(fs.statSync(file).size).toBeLessThan(300 * 1024)
      }
    }
  })
})

describe('img()', () => {
  it('returns a responsive source set with real dimensions', () => {
    const image = img('hero-consultation')
    expect(image.src).toContain('hero-consultation-1024')
    expect(image.srcset).toContain('640w')
    expect(image.srcset).toContain('1024w')
    expect(image.srcset).toContain('1600w')
    expect(image.width).toBe(1024)
    expect(image.height).toBeGreaterThan(0)
    expect(image.alt.length).toBeGreaterThan(20)
  })
})
