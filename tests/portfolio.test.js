import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import Portfolio from '../src/pages/Portfolio.vue'
import { projects, projectsNote } from '../src/data/projects'

const wrapper = mount(Portfolio)

describe('Portfolio page', () => {
  it('has a single page heading', () => {
    const headings = wrapper.findAll('h1')
    expect(headings).toHaveLength(1)
    expect(headings[0].text()).toBe('Demonstration projects, built to show how we think.')
  })

  it('labels the work as demonstration concepts up front', () => {
    expect(wrapper.text()).toContain(projectsNote)
    expect(wrapper.get('#portfolio-note').text()).toMatch(/not client engagements/i)
  })

  it('renders every project with its name and category', () => {
    const articles = wrapper.findAll('main article')
    expect(articles).toHaveLength(projects.length)
    articles.forEach((article, index) => {
      const project = projects[index]
      expect(article.attributes('id')).toBe(project.slug)
      expect(article.get('h2').text()).toBe(project.name)
      expect(article.text()).toContain(project.category)
    })
  })

  it('marks each project as a demonstration', () => {
    const tags = wrapper.findAll('main article [data-demo]')
    expect(tags).toHaveLength(projects.length)
    for (const tag of tags) {
      expect(tag.text()).toBe('Demonstration')
    }
  })

  it('tells the problem, the solution, and the stack in every project', () => {
    for (const project of projects) {
      const article = wrapper.get(`article#${project.slug}`)
      expect(article.text()).toContain(project.problem)
      expect(article.text()).toContain(project.solution)
      for (const tool of project.stack) {
        expect(article.text()).toContain(tool)
      }
    }
  })

  it('shows a system mockup for every project', () => {
    for (const project of projects) {
      const article = wrapper.get(`article#${project.slug}`)
      expect(article.find('[data-chrome]').exists()).toBe(true)
    }
  })

  it('never presents the concepts as real client work', () => {
    const text = wrapper.text()
    expect(text).not.toMatch(/our client|client work|case study|delivered for/i)
    expect(text).not.toMatch(/best|cheapest|world-class|guarantee/i)
  })
})
