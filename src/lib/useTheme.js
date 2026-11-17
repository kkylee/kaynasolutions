import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { THEME_STORAGE_KEY, applyTheme, resolveTheme } from './theme'

function storedTheme() {
  try {
    return localStorage.getItem(THEME_STORAGE_KEY)
  } catch {
    return null
  }
}

export function useTheme() {
  const theme = ref('light')
  const isDark = computed(() => theme.value === 'dark')

  let media = null
  let onChange = null

  function setTheme(next, persist = false) {
    theme.value = applyTheme(next)
    if (!persist) return
    try {
      localStorage.setItem(THEME_STORAGE_KEY, theme.value)
    } catch {
      // A visitor can block storage; the current page still changes theme.
    }
  }

  onMounted(() => {
    if (typeof window === 'undefined' || typeof document === 'undefined') return

    media =
      typeof window.matchMedia === 'function'
        ? window.matchMedia('(prefers-color-scheme: dark)')
        : null

    const rootTheme = document.documentElement.dataset.theme
    theme.value =
      rootTheme === 'dark' || rootTheme === 'light'
        ? rootTheme
        : resolveTheme(storedTheme(), Boolean(media?.matches))

    if (!media) return

    onChange = (event) => {
      if (storedTheme()) return
      theme.value = applyTheme(event.matches ? 'dark' : 'light')
    }

    if (typeof media.addEventListener === 'function') {
      media.addEventListener('change', onChange)
    } else if (typeof media.addListener === 'function') {
      media.addListener(onChange)
    }
  })

  onBeforeUnmount(() => {
    if (!media || !onChange) return
    if (typeof media.removeEventListener === 'function') {
      media.removeEventListener('change', onChange)
    } else if (typeof media.removeListener === 'function') {
      media.removeListener(onChange)
    }
  })

  function toggle() {
    setTheme(theme.value === 'dark' ? 'light' : 'dark', true)
  }

  return { theme, isDark, toggle }
}
