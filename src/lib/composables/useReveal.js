export function prefersReducedMotion() {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export function useReveal() {
  const reveal = (el) => {
    if (!el || el.classList.contains('reveal-in')) return
    if (prefersReducedMotion()) return
    if (typeof IntersectionObserver === 'undefined') return

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          entry.target.classList.add('reveal-in')
          observer.disconnect()
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
    )

    observer.observe(el)
  }

  const revealAll = (root = typeof document === 'undefined' ? null : document) => {
    if (!root) return
    for (const el of root.querySelectorAll('[data-reveal]')) reveal(el)
  }

  return { reveal, revealAll }
}
