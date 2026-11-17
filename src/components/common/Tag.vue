<script setup>
import { computed } from 'vue'

const props = defineProps({
  label: { type: String, required: true },
  tone: { type: String, default: 'neutral' },
})

const tones = {
  neutral: 'bg-subtle text-body ring-line',
  navy: 'bg-deep text-white ring-deep',
  teal: 'bg-signal/10 text-ink ring-signal/40',
}

const classes = computed(() => tones[props.tone] ?? tones.neutral)
</script>

<template>
  <span
    class="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[0.6875rem] font-semibold uppercase tracking-[0.14em] ring-1 ring-inset"
    :class="classes"
  >
    {{ label }}
  </span>
</template>
