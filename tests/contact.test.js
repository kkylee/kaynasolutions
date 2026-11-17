import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import Contact from '../src/pages/Contact.vue'
import { site } from '../src/data/site'

const wrapper = mount(Contact)

describe('Contact page', () => {
  it('has a single page heading', () => {
    const headings = wrapper.findAll('h1')
    expect(headings).toHaveLength(1)
    expect(headings[0].text()).toBe('Start with the process that is slowing you down.')
  })

  it('puts the enquiry form on the page', () => {
    expect(wrapper.find('form').exists()).toBe(true)
    expect(wrapper.find('#message').exists()).toBe(true)
  })

  it('shows direct contact details as working links', () => {
    const email = wrapper.get('#contact-details a[data-email]')
    expect(email.attributes('href')).toBe(`mailto:${site.email}`)
    expect(email.text()).toBe('info@kaynasolutions.com')
    const phone = wrapper.get('#contact-details a[data-phone]')
    expect(phone.attributes('href')).toBe(`tel:${site.phoneHref}`)
    const mobile = wrapper.get('#contact-details a[data-mobile]')
    expect(mobile.attributes('href')).toBe(`tel:${site.mobileHref}`)
  })

  it('shows the supplied social profiles as safe external links', () => {
    for (const social of site.socials) {
      const link = wrapper.get(`#contact-details a[href="${social.href}"]`)
      expect(link.text()).toBe(social.label)
      expect(link.attributes('target')).toBe('_blank')
      expect(link.attributes('rel')).toContain('noopener')
      expect(link.attributes('rel')).toContain('noreferrer')
    }
  })

  it('does not show launch placeholder copy', () => {
    expect(wrapper.text()).not.toMatch(/placeholder/i)
  })

  it('explains what happens after someone writes in', () => {
    const steps = wrapper.findAll('#next-steps li')
    expect(steps).toHaveLength(3)
  })

  it('uses a photograph with descriptive alt text', () => {
    const image = wrapper.get('main img')
    expect(image.attributes('alt').length).toBeGreaterThan(30)
    expect(image.attributes('loading')).toBe('eager')
  })

  it('avoids invented response promises and superlatives', () => {
    const text = wrapper.text()
    expect(text).not.toMatch(/within \d+ (hours|days)|24\/7|guarantee|best|cheapest/i)
  })
})
