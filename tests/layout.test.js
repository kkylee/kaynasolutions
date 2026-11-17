import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import SiteHeader from '../src/components/layout/SiteHeader.vue'
import SiteFooter from '../src/components/layout/SiteFooter.vue'
import Wordmark from '../src/components/layout/Wordmark.vue'
import { useReveal } from '../src/lib/composables/useReveal'
import { site } from '../src/data/site'

function mockMatchMedia({ reduce = false } = {}) {
  window.matchMedia = vi.fn().mockImplementation((query) => ({
    matches: query.includes('prefers-reduced-motion: reduce') ? reduce : false,
    media: query,
    onchange: null,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    addListener: vi.fn(),
    removeListener: vi.fn(),
    dispatchEvent: vi.fn(),
  }))
}

beforeEach(() => {
  mockMatchMedia()
  window.history.pushState({}, '', '/')
})

afterEach(() => {
  document.body.style.overflow = ''
  document.body.innerHTML = ''
  delete globalThis.IntersectionObserver
})

describe('Wordmark', () => {
  it('pairs the supplied icon with a live, standard typographic lockup', () => {
    const wrapper = mount(Wordmark)
    const image = wrapper.get('img')
    expect(image.attributes('src')).toBe('/brand/kayna-icon.png')
    expect(image.attributes('alt')).toBe('')
    expect(image.attributes('width')).toBe('40')
    expect(image.attributes('height')).toBe('40')
    expect(wrapper.text()).toContain('Kayna')
    expect(wrapper.text()).toContain('IT Solutions')
    expect(wrapper.find('.font-display').exists()).toBe(true)
    expect(wrapper.find('.font-body').exists()).toBe(true)
    expect(wrapper.find('.whitespace-nowrap').exists()).toBe(true)
  })
})

describe('SiteHeader', () => {
  it('marks the current page in the primary navigation', async () => {
    window.history.pushState({}, '', '/services/')
    const wrapper = mount(SiteHeader)
    await nextTick()
    const active = wrapper.findAll('a').find((link) => link.attributes('href') === '/services/')
    expect(active.attributes('aria-current')).toBe('page')
    const home = wrapper.findAll('a').find((link) => link.attributes('href') === '/')
    expect(home.attributes('aria-current')).toBeUndefined()
  })

  it('opens and closes the mobile panel with aria-expanded', async () => {
    const wrapper = mount(SiteHeader)
    const trigger = wrapper.get('button[aria-controls="mobile-nav"]')
    expect(trigger.attributes('aria-expanded')).toBe('false')
    await trigger.trigger('click')
    expect(trigger.attributes('aria-expanded')).toBe('true')
    expect(wrapper.find('#mobile-nav').exists()).toBe(true)
    await trigger.trigger('click')
    expect(trigger.attributes('aria-expanded')).toBe('false')
    expect(wrapper.find('#mobile-nav').exists()).toBe(false)
  })

  it('closes on Escape and returns focus to the trigger', async () => {
    const wrapper = mount(SiteHeader, { attachTo: document.body })
    const trigger = wrapper.get('button[aria-controls="mobile-nav"]')
    await trigger.trigger('click')
    const panel = wrapper.get('#mobile-nav')
    await panel.trigger('keydown', { key: 'Escape' })
    await nextTick()
    expect(wrapper.find('#mobile-nav').exists()).toBe(false)
    expect(document.activeElement).toBe(trigger.element)
  })

  it('keeps Tab inside the open panel', async () => {
    const wrapper = mount(SiteHeader, { attachTo: document.body })
    const trigger = wrapper.get('button[aria-controls="mobile-nav"]')
    await trigger.trigger('click')
    const panel = wrapper.get('#mobile-nav')
    const items = panel.findAll('a[href], button')
    expect(items.length).toBeGreaterThan(3)
    const first = items[0].element
    const last = items[items.length - 1].element
    last.focus()
    await panel.trigger('keydown', { key: 'Tab' })
    expect(document.activeElement).toBe(first)
    first.focus()
    await panel.trigger('keydown', { key: 'Tab', shiftKey: true })
    expect(document.activeElement).toBe(last)
  })

  it('offers a contact shortcut that is big enough to tap', () => {
    const wrapper = mount(SiteHeader)
    const talk = wrapper.findAll('a').find((link) => link.text().includes("Let's talk"))
    expect(talk).toBeTruthy()
    expect(talk.attributes('href')).toBe('/contact/')
    expect(talk.element.parentElement.className).toContain('hidden')
    expect(talk.element.parentElement.className).toContain('sm:block')
    const trigger = wrapper.get('button[aria-controls="mobile-nav"]')
    expect(trigger.classes().join(' ')).toContain('min-h-11')
    expect(trigger.classes().join(' ')).toContain('min-w-11')
  })

  it('offers a theme toggle that is big enough to tap', () => {
    const wrapper = mount(SiteHeader)
    const toggle = wrapper.get('[data-theme-toggle]')
    expect(toggle.classes().join(' ')).toContain('min-h-11')
    expect(toggle.classes().join(' ')).toContain('min-w-11')
  })
})

describe('SiteFooter', () => {
  it('shows contact details and the demonstration note', () => {
    const wrapper = mount(SiteFooter)
    expect(wrapper.text()).toMatch(/demonstration/i)
    expect(wrapper.find(`a[href="mailto:${site.email}"]`).exists()).toBe(true)
    expect(wrapper.find(`a[href="tel:${site.phoneHref}"]`).exists()).toBe(true)
    expect(wrapper.find(`a[href="tel:${site.mobileHref}"]`).exists()).toBe(true)
    expect(wrapper.text()).not.toMatch(/placeholder/i)
    expect(wrapper.text()).toMatch(/DTI Registered/i)
    expect(wrapper.text()).toMatch(/Business Name No\. 8623505/i)
  })

  it('links to the supplied social profiles safely', () => {
    const wrapper = mount(SiteFooter)
    for (const social of site.socials) {
      const link = wrapper.get(`a[href="${social.href}"]`)
      expect(link.text()).toBe(social.label)
      expect(link.attributes('target')).toBe('_blank')
      expect(link.attributes('rel')).toContain('noopener')
      expect(link.attributes('rel')).toContain('noreferrer')
    }
  })

  it('links to every page and every service anchor', () => {
    const wrapper = mount(SiteFooter)
    const hrefs = wrapper.findAll('a').map((link) => link.attributes('href'))
    for (const path of ['/', '/services/', '/solutions/', '/about/', '/portfolio/', '/insights/', '/contact/']) {
      expect(hrefs).toContain(path)
    }
    expect(hrefs.filter((href) => href.startsWith('/services/#'))).toHaveLength(7)
  })
})

describe('useReveal', () => {
  it('never animates when reduced motion is requested', () => {
    mockMatchMedia({ reduce: true })
    const el = document.createElement('div')
    useReveal().reveal(el)
    expect(el.classList.contains('reveal-in')).toBe(false)
  })

  it('leaves content untouched when IntersectionObserver is missing', () => {
    delete globalThis.IntersectionObserver
    const el = document.createElement('div')
    useReveal().reveal(el)
    expect(el.classList.contains('reveal-in')).toBe(false)
  })

  it('adds a one-shot animation class when the element enters the viewport', () => {
    let callback
    class FakeObserver {
      constructor(cb) {
        callback = cb
      }
      observe() {}
      disconnect() {}
      unobserve() {}
    }
    globalThis.IntersectionObserver = FakeObserver
    const el = document.createElement('div')
    useReveal().reveal(el)
    expect(el.classList.contains('reveal-in')).toBe(false)
    callback([{ isIntersecting: true, target: el }])
    expect(el.classList.contains('reveal-in')).toBe(true)
  })
})
