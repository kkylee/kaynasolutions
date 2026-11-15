import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import Insights from '../src/pages/Insights.vue'
import { articles } from '../src/data/articles'

const wrapper = mount(Insights)

describe('Insights page', () => {
  it('has a single page heading', () => {
    const headings = wrapper.findAll('h1')
    expect(headings).toHaveLength(1)
    expect(headings[0].text()).toBe('Practical notes on systems, operations, and growth.')
  })

  it('lists every article with its category and reading time', () => {
    const cards = wrapper.findAll('main article')
    expect(cards).toHaveLength(articles.length)
    cards.forEach((card, index) => {
      const article = articles[index]
      expect(card.attributes('id')).toBe(article.slug)
      expect(card.get('h2').text()).toBe(article.title)
      expect(card.text()).toContain(article.category)
      expect(card.text()).toContain(article.readTime)
    })
  })

  it('expands the full article inline without a separate page', () => {
    for (const article of articles) {
      const card = wrapper.get(`article#${article.slug}`)
      const details = card.get('details')
      expect(details.get('summary').text()).toContain('Read the article')
      expect(details.findAll('p')).toHaveLength(article.body.length)
      expect(details.text()).toContain(article.body[0])
      expect(details.text()).toContain(article.body[article.body.length - 1])
    }
  })

  it('shows a lazily loaded photograph for every article', () => {
    const images = wrapper.findAll('main article img')
    expect(images).toHaveLength(articles.length)
    for (const image of images) {
      expect(image.attributes('loading')).toBe('lazy')
      expect(image.attributes('alt').length).toBeGreaterThan(30)
    }
  })

  it('states that the articles are samples, not client stories', () => {
    expect(wrapper.text()).toMatch(/sample articles/i)
    expect(wrapper.text()).toMatch(/not client case studies/i)
  })

  it('keeps the copy inside the brand rules', () => {
    expect(wrapper.text()).not.toMatch(/best|cheapest|world-class|guarantee/i)
  })
})
