export const THEME_STORAGE_KEY = 'kayna-theme'

export const THEME_COLORS = {
  light: '#FFFFFF',
  dark: '#071322',
}

const VALID_THEMES = new Set(['light', 'dark'])

export function resolveTheme(stored, systemDark) {
  if (VALID_THEMES.has(stored)) return stored
  return systemDark ? 'dark' : 'light'
}

export function applyTheme(theme, root = typeof document === 'undefined' ? null : document.documentElement) {
  const next = theme === 'dark' ? 'dark' : 'light'
  if (!root) return next

  root.classList.toggle('dark', next === 'dark')
  root.dataset.theme = next
  root.style.colorScheme = next

  if (typeof document !== 'undefined') {
    let meta = document.querySelector('meta[name="theme-color"]')
    if (!meta) {
      meta = document.createElement('meta')
      meta.setAttribute('name', 'theme-color')
      document.head.append(meta)
    }
    meta.setAttribute('content', THEME_COLORS[next])
  }

  return next
}

export function themeInitScript() {
  return `(function () {
  try {
    var key = ${JSON.stringify(THEME_STORAGE_KEY)};
    var stored = window.localStorage.getItem(key);
    var systemDark = window.matchMedia
      ? window.matchMedia('(prefers-color-scheme: dark)').matches
      : false;
    var theme = stored === 'light' || stored === 'dark'
      ? stored
      : (systemDark ? 'dark' : 'light');
    var root = document.documentElement;
    root.classList.toggle('dark', theme === 'dark');
    root.dataset.theme = theme;
    root.style.colorScheme = theme;
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) {
      meta.setAttribute('content', theme === 'dark' ? ${JSON.stringify(THEME_COLORS.dark)} : ${JSON.stringify(THEME_COLORS.light)});
    }
  } catch (error) {}
})();`
}
