import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import Solutions from '../src/pages/Solutions.vue'
import { solutions } from '../src/data/solutions'

const wrapper = mount(Solutions)

describe('Solutions page', () => {
  it('has a single page heading', () => {
    const headings = wrapper.findAll('h1')
    expect(headings).toHaveLength(1)
    expect(headings[0].text()).toBe(
      'Solutions for the problems growing businesses know.',
    )
  })

  it('renders a section for every solution', () => {
    const articles = wrapper.findAll('main article')
    expect(articles).toHaveLength(solutions.length)
    articles.forEach((article, index) => {
      const solution = solutions[index]
      expect(article.attributes('id')).toBe(solution.slug)
      expect(article.get('h2').text()).toBe(solution.title)
    })
  })

  it('pairs each solution with a clearly decorative product mockup', () => {
    for (const solution of solutions) {
      const article = wrapper.get(`article#${solution.slug}`)
      expect(article.find('[data-chrome]').exists()).toBe(true)
      expect(article.get('[data-chrome]').attributes('aria-hidden')).toBe('true')
    }
    expect(wrapper.findAll('main table caption')).toHaveLength(3)
  })

  it('explains the problem, the approach, and four working steps', () => {
    for (const solution of solutions) {
      const article = wrapper.get(`article#${solution.slug}`)
      expect(article.text()).toContain(solution.problem)
      expect(article.text()).toContain(solution.approach)
      expect(article.findAll('ol[data-how] li')).toHaveLength(4)
    }
  })

  it('offers a jump index that matches the sections', () => {
    const links = wrapper.findAll('#solution-index a')
    expect(links).toHaveLength(solutions.length)
    for (const [index, link] of links.entries()) {
      expect(link.attributes('href')).toBe(`#${solutions[index].slug}`)
    }
  })

  it('states that the systems shown are illustrative', () => {
    expect(wrapper.text()).toMatch(/illustrative/i)
    expect(wrapper.text()).toMatch(/not client screenshots/i)
  })

  it('keeps the copy inside the brand rules', () => {
    expect(wrapper.text()).not.toMatch(/best|cheapest|world-class|guarantee/i)
  })
})
