import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import About from '../src/pages/About.vue'
import { audiences, beliefs, measures, story } from '../src/data/about'

const wrapper = mount(About)

describe('About page', () => {
  it('has a single page heading', () => {
    const headings = wrapper.findAll('h1')
    expect(headings).toHaveLength(1)
    expect(headings[0].text()).toBe('A practical technology partner for growing businesses.')
  })

  it('tells the positioning story without invented history', () => {
    const text = wrapper.text()
    expect(text).toContain(story[0])
    expect(text).not.toMatch(
      /founded in|established in|since \d{4}|years of experience|award-winning|iso certified|certified partner/i,
    )
    expect(text).not.toMatch(/\b\d+\+? (employees|staff|clients|projects|customers)\b/i)
  })

  it('lists the beliefs that guide the work', () => {
    const items = wrapper.findAll('[data-belief]')
    expect(items).toHaveLength(beliefs.length)
    for (const [index, belief] of beliefs.entries()) {
      expect(items[index].text()).toContain(belief.title)
    }
  })

  it('describes every audience it serves', () => {
    const items = wrapper.findAll('#audiences li')
    expect(items).toHaveLength(audiences.length)
    expect(wrapper.get('#audiences').text()).toContain('Retail and local shops')
  })

  it('says how success is measured', () => {
    const items = wrapper.findAll('[data-measure]')
    expect(items).toHaveLength(measures.length)
    for (const measure of measures) {
      expect(items.some((item) => item.text().includes(measure.title))).toBe(true)
    }
  })

  it('uses two lazily loaded photographs with alt text', () => {
    const images = wrapper.findAll('main img')
    expect(images).toHaveLength(2)
    for (const image of images) {
      expect(image.attributes('alt').length).toBeGreaterThan(30)
    }
    expect(images[1].attributes('loading')).toBe('lazy')
  })

  it('keeps the copy inside the brand rules', () => {
    expect(wrapper.text()).not.toMatch(/best|cheapest|world-class|guarantee/i)
  })
})
