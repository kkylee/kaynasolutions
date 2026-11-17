import { beforeEach, describe, expect, it } from 'vitest'
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
