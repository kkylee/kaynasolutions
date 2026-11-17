<script setup>
import { ref, watch, nextTick, onBeforeUnmount } from 'vue'
import { nav } from '../../data/site'
import BaseButton from '../common/BaseButton.vue'

const props = defineProps({
  open: { type: Boolean, default: false },
  active: { type: String, default: '/' },
})

const emit = defineEmits(['close'])
const panel = ref(null)
const focusable = 'a[href], button:not([disabled])'

watch(
  () => props.open,
  async (open) => {
    if (typeof document === 'undefined') return
    if (!open) {
      document.body.style.overflow = ''
      return
    }
    document.body.style.overflow = 'hidden'
    await nextTick()
    panel.value?.querySelector(focusable)?.focus()
  },
)

onBeforeUnmount(() => {
  if (typeof document !== 'undefined') document.body.style.overflow = ''
})

function onKeydown(event) {
  if (event.key === 'Escape') {
    event.preventDefault()
    emit('close')
    return
  }
  if (event.key !== 'Tab' || !panel.value) return

  const items = [...panel.value.querySelectorAll(focusable)]
  if (!items.length) return
  const first = items[0]
  const last = items[items.length - 1]

  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault()
    last.focus()
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault()
    first.focus()
  }
}
</script>

<template>
  <div v-if="open" id="mobile-nav" ref="panel" class="lg:hidden" @keydown="onKeydown">
    <div class="max-h-[calc(100dvh-4rem)] overflow-y-auto border-t border-line bg-surface">
      <nav aria-label="Mobile" class="container-page py-6">
        <ul class="flex flex-col gap-1">
          <li v-for="item in nav" :key="item.id">
            <a
              :href="item.path"
              :aria-current="active === item.path ? 'page' : undefined"
              class="flex min-h-11 items-center rounded-md px-3 text-base font-medium text-ink hover:bg-subtle aria-[current=page]:text-link"
              @click="emit('close')"
            >
              {{ item.label }}
            </a>
          </li>
        </ul>
        <BaseButton class="mt-6 w-full" href="/contact/" label="Let's talk" @click="emit('close')" />
      </nav>
    </div>
  </div>
</template>
