<script setup>
import { ref, onMounted, nextTick } from 'vue'
import { Menu, X } from 'lucide-vue-next'
import { nav } from '../../data/site'
import { currentPath } from '../../lib/path'
import Wordmark from './Wordmark.vue'
import MobileNav from './MobileNav.vue'
import ThemeToggle from './ThemeToggle.vue'
import BaseButton from '../common/BaseButton.vue'

const active = ref('/')
const open = ref(false)
const trigger = ref(null)

onMounted(() => {
  active.value = currentPath()
})

function toggle() {
  open.value = !open.value
}

async function close() {
  open.value = false
  await nextTick()
  trigger.value?.focus()
}
</script>

<template>
  <header class="fixed inset-x-0 top-0 z-40 border-b border-line bg-surface/95 backdrop-blur">
    <div class="container-page flex h-16 items-center justify-between gap-4">
      <a href="/" class="flex items-center rounded-md py-1">
        <Wordmark />
      </a>

      <nav aria-label="Primary" class="hidden lg:block">
        <ul class="flex items-center gap-1">
          <li v-for="item in nav" :key="item.id">
            <a
              :href="item.path"
              :aria-current="active === item.path ? 'page' : undefined"
              class="rounded-md px-3 py-2 text-sm font-medium text-body transition-colors hover:text-ink aria-[current=page]:text-ink"
            >
              {{ item.label }}
            </a>
          </li>
        </ul>
      </nav>

      <div class="flex items-center gap-2">
        <ThemeToggle />
        <div class="hidden sm:block">
          <BaseButton href="/contact/" label="Let's talk" />
        </div>
        <button
          ref="trigger"
          type="button"
          class="inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg border border-line-strong text-ink hover:border-link lg:hidden"
          :aria-expanded="open"
          aria-controls="mobile-nav"
          @click="toggle"
        >
          <span class="sr-only">{{ open ? 'Close menu' : 'Open menu' }}</span>
          <component :is="open ? X : Menu" class="h-5 w-5" aria-hidden="true" />
        </button>
      </div>
    </div>

    <MobileNav :open="open" :active="active" @close="close" />
  </header>
</template>
