<script setup>
import { computed } from 'vue'
import { Moon, Sun } from 'lucide-vue-next'
import { useTheme } from '../../lib/useTheme'

const { isDark, toggle } = useTheme()
const label = computed(() => (isDark.value ? 'Switch to light theme' : 'Switch to dark theme'))
</script>

<template>
  <button
    type="button"
    data-theme-toggle
    class="inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg border border-line-strong text-ink transition-colors hover:border-link hover:text-link"
    :aria-label="label"
    :title="label"
    @click="toggle"
  >
    <Sun v-if="isDark" class="h-5 w-5" aria-hidden="true" />
    <Moon v-else class="h-5 w-5" aria-hidden="true" />
  </button>
</template>
