import { createApp } from 'vue'
import '@fontsource-variable/manrope'
import '@fontsource-variable/inter'
import '../styles/main.css'

export function mountPage(Page, props = {}) {
  const el = document.getElementById('app')
  if (!el) return
  createApp(Page, props).mount(el)
}
