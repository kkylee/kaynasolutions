import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import Home from '../src/pages/Home.vue'
import { challenges, process, reasons } from '../src/data/home'
import { services } from '../src/data/services'
import { solutions } from '../src/data/solutions'

const wrapper = mount(Home)

describe('Home page', () => {
  it('leads with the brand promise as the only h1', () => {
    const headings = wrapper.findAll('h1')
    expect(headings).toHaveLength(1)
    expect(headings[0].text()).toBe('Better business starts with better systems.')
  })

  it('offers both hero actions', () => {
    const hero = wrapper.get('#hero')
    const hrefs = hero.findAll('a').map((link) => link.attributes('href'))
    expect(hrefs).toContain('/contact/')
    expect(hrefs).toContain('/services/')
  })

  it('loads the hero photograph eagerly with alt text', () => {
    const image = wrapper.get('#hero img')
    expect(image.attributes('loading')).toBe('eager')
    expect(image.attributes('fetchpriority')).toBe('high')
    expect(image.attributes('alt').length).toBeGreaterThan(20)
  })

  it('names the six manual-work challenges', () => {
    const items = wrapper.findAll('#challenges li')
    expect(items).toHaveLength(6)
    expect(challenges).toHaveLength(6)
    expect(wrapper.get('#challenges').text()).toContain('Payroll cutoff takes days')
  })

  it('links every service to its detail section', () => {
    const links = wrapper.findAll('#services-overview a[href^="/services/#"]')
    expect(links).toHaveLength(services.length)
    for (const [index, service] of services.entries()) {
      expect(links[index].attributes('href')).toBe(`/services/#${service.slug}`)
    }
  })

  it('links every solution to its detail section', () => {
    const links = wrapper.findAll('#solutions-overview a[href^="/solutions/#"]')
    expect(links).toHaveLength(solutions.length)
    expect(links[0].attributes('href')).toBe(`/solutions/#${solutions[0].slug}`)
  })

  it('explains the working approach without invented credentials', () => {
    expect(wrapper.findAll('#why li')).toHaveLength(reasons.length)
    expect(wrapper.get('#why').text()).not.toMatch(/years of experience|award|trusted by \d+/i)
  })

  it('shows the four process steps', () => {
    const steps = wrapper.findAll('#process li')
    expect(steps).toHaveLength(4)
    expect(steps.map((step) => step.text().split('\n')[0])).toBeTruthy()
    for (const step of process) {
      expect(wrapper.get('#process').text()).toContain(step.title)
    }
  })

  it('ends with a conversation call to action', () => {
    const calls = wrapper
      .findAll('a')
      .filter((link) => link.text().includes('Start a Conversation'))
    expect(calls.length).toBeGreaterThan(0)
    expect(calls.every((link) => link.attributes('href') === '/contact/')).toBe(true)
  })

  it('keeps the copy inside the brand rules', () => {
    expect(wrapper.text()).not.toMatch(/best|cheapest|world-class|guarantee/i)
  })
})
