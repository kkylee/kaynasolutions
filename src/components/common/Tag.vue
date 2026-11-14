<script setup>
import { computed } from 'vue'

const props = defineProps({
  label: { type: String, required: true },
  tone: { type: String, default: 'neutral' },
})

const tones = {
  neutral: 'bg-paper text-slate-ink ring-navy/10',
  navy: 'bg-navy text-white ring-navy',
  teal: 'bg-teal/10 text-navy ring-teal/40',
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
