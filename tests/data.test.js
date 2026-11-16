import { describe, expect, it } from 'vitest'
import { nav, site, SITE_URL } from '../src/data/site'
import { pages } from '../src/data/pages'
import { services } from '../src/data/services'
import { solutions } from '../src/data/solutions'
import { projects, projectsNote } from '../src/data/projects'
import { articles } from '../src/data/articles'

const SERVICE_TITLES = [
  'Custom Software Development',
  'Business Process Automation',
  'API & System Integrations',
  'Business Intelligence & Analytics',
  'Cloud Solutions & Technical Support',
  'Technology Consulting',
  'Ready-Made Systems',
]

const SOLUTION_TITLES = [
  'HR & Employee Management',
  'Inventory & Operations Management',
  'Customer & Client Management',
  'Workflow & Approval Automation',
  'Reporting & Business Intelligence',
  'Connected Business Systems',
]

const CATEGORIES = [
  'Business Automation',
  'Software Development',
  'Digital Transformation',
  'Business Operations',
  'Technology Guides',
  'SME Technology Tips',
]

const MOCKUPS = ['hr', 'inventory', 'crm', 'approvals', 'analytics', 'sync']

const FORBIDDEN = /best|cheapest|world-class|guarantee|award|certified|trusted by \d+/i
const allCopy = JSON.stringify({ site, services, solutions, projects, projectsNote, articles })

const words = (text) => text.trim().split(/\s+/).filter(Boolean).length

describe('site', () => {
  it('uses the Kayna origin', () => {
    expect(SITE_URL).toBe('https://kaynasolutions.com')
  })

  it('uses the Kayna brand names', () => {
    expect(site.name).toBe('Kayna Digital Solutions')
    expect(site.shortName).toBe('Kayna')
    expect(site.descriptor).toBe('Digital Solutions')
  })

  it('puts the Kayna name in every page title within the build limit', () => {
    for (const page of pages) {
      expect(page.title).toContain('Kayna Digital Solutions')
      expect(page.title.length).toBeLessThanOrEqual(65)
    }
  })

  it('has the seven navigation entries in order', () => {
    expect(nav.map((item) => item.path)).toEqual([
      '/',
      '/services/',
      '/solutions/',
      '/about/',
      '/portfolio/',
      '/insights/',
      '/contact/',
    ])
    expect(nav.every((item) => item.label.length > 0)).toBe(true)
  })

  it('exposes the real contact details', () => {
    expect(site.isPlaceholder).toBe(false)
    expect(site.email).toBe('joshuakyle.malitig@gmail.com')
    expect(site.phone).toBe('(043) 756 8818')
    expect(site.mobile).toBe('+63 977 400 9654')
    expect(site.location).toBe('Philippines')
  })
})

describe('services', () => {
  it('lists the seven services in the brief order', () => {
    expect(services.map((service) => service.title)).toEqual(SERVICE_TITLES)
  })

  it('gives every service a full detail set', () => {
    for (const service of services) {
      expect(service.slug).toMatch(/^[a-z0-9-]+$/)
      expect(service.icon.length).toBeGreaterThan(0)
      expect(service.image.length).toBeGreaterThan(0)
      expect(service.summary.length).toBeGreaterThan(40)
      expect(service.problems.length).toBeGreaterThanOrEqual(3)
      expect(service.benefits.length).toBeGreaterThanOrEqual(2)
      expect(service.examples).toHaveLength(2)
      for (const example of service.examples) {
        expect(example.title.length).toBeGreaterThan(3)
        expect(example.body.length).toBeGreaterThan(30)
      }
    }
  })

  it('uses unique slugs', () => {
    expect(new Set(services.map((service) => service.slug)).size).toBe(services.length)
  })
})

describe('solutions', () => {
  it('lists the six solutions in the brief order', () => {
    expect(solutions.map((solution) => solution.title)).toEqual(SOLUTION_TITLES)
  })

  it('gives every solution a full five-part structure', () => {
    for (const solution of solutions) {
      expect(solution.problem.length).toBeGreaterThan(30)
      expect(solution.approach.length).toBeGreaterThan(30)
      expect(solution.howItWorks.length).toBeGreaterThanOrEqual(3)
      expect(solution.benefits.length).toBeGreaterThanOrEqual(2)
      expect(MOCKUPS).toContain(solution.mockup)
    }
  })

  it('uses unique slugs and unique mockups', () => {
    expect(new Set(solutions.map((solution) => solution.slug)).size).toBe(solutions.length)
    expect(new Set(solutions.map((solution) => solution.mockup)).size).toBe(solutions.length)
  })
})

describe('projects', () => {
  it('lists five demonstration projects', () => {
    expect(projects).toHaveLength(5)
    expect(projects.every((project) => project.demo === true)).toBe(true)
    expect(projectsNote).toMatch(/demonstration/i)
    expect(projectsNote).toMatch(/not client engagements/i)
  })

  it('gives every project a complete write-up', () => {
    for (const project of projects) {
      expect(project.name.length).toBeGreaterThan(4)
      expect(project.category.length).toBeGreaterThan(3)
      expect(words(project.problem)).toBeGreaterThanOrEqual(25)
      expect(words(project.solution)).toBeGreaterThanOrEqual(40)
      expect(project.stack.length).toBeGreaterThanOrEqual(3)
      expect(MOCKUPS).toContain(project.mockup)
      expect(words(`${project.problem} ${project.solution}`)).toBeLessThanOrEqual(250)
    }
  })
})

describe('articles', () => {
  it('lists six articles in known categories', () => {
    expect(articles).toHaveLength(6)
    for (const article of articles) {
      expect(CATEGORIES).toContain(article.category)
    }
    expect(new Set(articles.map((article) => article.slug)).size).toBe(6)
  })

  it('gives every article readable body copy', () => {
    for (const article of articles) {
      expect(article.excerpt.length).toBeGreaterThan(50)
      expect(article.body.length).toBeGreaterThanOrEqual(4)
      const count = words(article.body.join(' '))
      expect(count).toBeGreaterThanOrEqual(250)
      expect(count).toBeLessThanOrEqual(450)
      expect(article.readTime).toMatch(/^\d+ min read$/)
      expect(article.image.length).toBeGreaterThan(0)
    }
  })
})

describe('copy rules', () => {
  it('avoids superlatives, guarantees, and invented credentials', () => {
    expect(allCopy).not.toMatch(FORBIDDEN)
  })

  it('never claims real client work', () => {
    expect(allCopy).not.toMatch(/our clients|case study|client engagement:/i)
  })
})
