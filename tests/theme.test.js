import { beforeEach, describe, expect, it, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import ThemeToggle from '../src/components/layout/ThemeToggle.vue'
import {
  THEME_COLORS,
  THEME_STORAGE_KEY,
  applyTheme,
  resolveTheme,
  themeInitScript,
} from '../src/lib/theme'

describe('resolveTheme', () => {
  it('uses a stored explicit choice over the system preference', () => {
    expect(resolveTheme('dark', false)).toBe('dark')
    expect(resolveTheme('light', true)).toBe('light')
  })

  it('falls back to the system preference without a stored choice', () => {
    expect(resolveTheme(null, true)).toBe('dark')
    expect(resolveTheme('', false)).toBe('light')
  })

  it('ignores unknown stored values', () => {
    expect(resolveTheme('sepia', true)).toBe('dark')
    expect(resolveTheme('sepia', false)).toBe('light')
  })
})

describe('applyTheme', () => {
  beforeEach(() => {
    document.documentElement.className = ''
    delete document.documentElement.dataset.theme
    document.documentElement.style.colorScheme = ''
    document.head.innerHTML = '<meta name="theme-color" content="#FFFFFF" />'
  })

  it('applies dark mode to the root element and browser chrome', () => {
    applyTheme('dark')

    expect(document.documentElement.classList.contains('dark')).toBe(true)
    expect(document.documentElement.dataset.theme).toBe('dark')
    expect(document.documentElement.style.colorScheme).toBe('dark')
    expect(document.querySelector('meta[name="theme-color"]').getAttribute('content')).toBe(
      THEME_COLORS.dark,
    )
  })

  it('removes dark mode when switching back to light', () => {
    document.documentElement.classList.add('dark')
    applyTheme('light')

    expect(document.documentElement.classList.contains('dark')).toBe(false)
    expect(document.documentElement.dataset.theme).toBe('light')
    expect(document.documentElement.style.colorScheme).toBe('light')
    expect(document.querySelector('meta[name="theme-color"]').getAttribute('content')).toBe(
      THEME_COLORS.light,
    )
  })
})

describe('themeInitScript', () => {
  it('runs the same storage and color contract before the app boots', () => {
    const script = themeInitScript()

    expect(script).toContain(THEME_STORAGE_KEY)
    expect(script).toContain('localStorage')
    expect(script).toContain(THEME_COLORS.light)
    expect(script).toContain(THEME_COLORS.dark)
    expect(script).toContain('document.documentElement')
  })
})

function mockThemeMedia({ systemDark = false } = {}) {
  const listeners = new Set()
  const media = {
    matches: systemDark,
    media: '(prefers-color-scheme: dark)',
    addEventListener: vi.fn((type, listener) => {
      if (type === 'change') listeners.add(listener)
    }),
    removeEventListener: vi.fn((type, listener) => {
      if (type === 'change') listeners.delete(listener)
    }),
    addListener: vi.fn(),
    removeListener: vi.fn(),
    dispatchEvent: vi.fn(),
  }

  window.matchMedia = vi.fn(() => media)

  return {
    media,
    setSystemDark(value) {
      media.matches = value
      for (const listener of listeners) listener({ matches: value })
    },
    listeners,
  }
}

describe('ThemeToggle', () => {
  beforeEach(() => {
    localStorage.clear()
    document.documentElement.className = ''
    delete document.documentElement.dataset.theme
    document.documentElement.style.colorScheme = ''
    document.head.innerHTML = '<meta name="theme-color" content="#FFFFFF" />'
  })

  it('switches to dark, persists the choice, and exposes the next action', async () => {
    mockThemeMedia()
    const wrapper = mount(ThemeToggle)

    const toggle = wrapper.get('[data-theme-toggle]')
    expect(toggle.attributes('aria-label')).toBe('Switch to dark theme')

    await toggle.trigger('click')
    await nextTick()

    expect(document.documentElement.classList.contains('dark')).toBe(true)
    expect(document.documentElement.dataset.theme).toBe('dark')
    expect(localStorage.getItem(THEME_STORAGE_KEY)).toBe('dark')
    expect(toggle.attributes('aria-label')).toBe('Switch to light theme')

    wrapper.unmount()
  })

  it('follows the system preference when no explicit choice exists', async () => {
    const media = mockThemeMedia({ systemDark: true })
    document.documentElement.classList.add('dark')
    document.documentElement.dataset.theme = 'dark'

    const wrapper = mount(ThemeToggle)
    await nextTick()
    const toggle = wrapper.get('[data-theme-toggle]')
    expect(toggle.attributes('aria-label')).toBe('Switch to light theme')

    media.setSystemDark(false)
    await nextTick()

    expect(document.documentElement.classList.contains('dark')).toBe(false)
    expect(localStorage.getItem(THEME_STORAGE_KEY)).toBeNull()
    expect(toggle.attributes('aria-label')).toBe('Switch to dark theme')

    wrapper.unmount()
  })

  it('keeps an explicit choice when the system preference changes', async () => {
    const media = mockThemeMedia()
    const wrapper = mount(ThemeToggle)

    await wrapper.get('[data-theme-toggle]').trigger('click')
    media.setSystemDark(false)
    await nextTick()

    expect(document.documentElement.classList.contains('dark')).toBe(true)
    expect(localStorage.getItem(THEME_STORAGE_KEY)).toBe('dark')

    wrapper.unmount()
  })
})
