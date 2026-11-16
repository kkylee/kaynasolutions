import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import Services from '../src/pages/Services.vue'
import { services } from '../src/data/services'

const wrapper = mount(Services)

describe('Services page', () => {
  it('has a single page heading', () => {
    const headings = wrapper.findAll('h1')
    expect(headings).toHaveLength(1)
    expect(headings[0].text()).toBe('Technology solutions for businesses ready to grow.')
  })

  it('describes the current number of services', () => {
    expect(wrapper.text()).toContain('Seven services')
    expect(wrapper.text()).not.toContain('Six services')
  })

  it('renders a detail section for every service', () => {
    const articles = wrapper.findAll('main article')
    expect(articles).toHaveLength(services.length)
    articles.forEach((article, index) => {
      const service = services[index]
      expect(article.attributes('id')).toBe(service.slug)
      expect(article.get('h2').text()).toBe(service.title)
    })
  })

  it('offers a jump index that matches the detail sections', () => {
    const links = wrapper.findAll('#service-index a')
    expect(links).toHaveLength(services.length)
    for (const [index, link] of links.entries()) {
      expect(link.attributes('href')).toBe(`#${services[index].slug}`)
    }
  })

  it('lists the benefits and typical signs for each service', () => {
    for (const service of services) {
      const article = wrapper.get(`article#${service.slug}`)
      expect(article.text()).toContain(service.benefits[0])
      expect(article.text()).toContain(service.problems[0])
    }
  })

  it('shows a photograph for each service with descriptive alt text', () => {
    const images = wrapper.findAll('main article img')
    expect(images).toHaveLength(services.length)
    for (const image of images) {
      expect(image.attributes('loading')).toBe('lazy')
      expect(image.attributes('alt').length).toBeGreaterThan(30)
      expect(image.attributes('srcset')).toContain('640w')
    }
  })

  it('links each service to the contact page', () => {
    const links = wrapper.findAll('main article a[href="/contact/"]')
    expect(links).toHaveLength(services.length)
  })

  it('keeps the copy inside the brand rules', () => {
    expect(wrapper.text()).not.toMatch(/best|cheapest|world-class|guarantee/i)
  })
})
