/**
 * @fontsource ships `font-display: swap` for every @font-face. On a slow
 * connection the webfont lands after the first paint, so the text reflows and
 * the page records layout shift. `optional` keeps typography stable: the font
 * is used when it is cached or ready within the block period, otherwise the
 * fallback stays for that page view and the font applies on the next one.
 */
export function stableFontDisplay() {
  return {
    name: 'kayna-digital-solutions-stable-font-display',
    enforce: 'pre',
    transform(code, id) {
      if (!id.includes('@fontsource') || !id.includes('.css')) return null
      if (!code.includes('font-display: swap')) return null
      return { code: code.replaceAll('font-display: swap', 'font-display: optional'), map: null }
    },
  }
}
