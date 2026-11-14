export function currentPath() {
  if (typeof window === 'undefined') return '/'
  const path = window.location.pathname
  if (!path) return '/'
  return path.endsWith('/') ? path : `${path}/`
}
