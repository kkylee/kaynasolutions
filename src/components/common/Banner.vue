<script setup>
import { Info } from 'lucide-vue-next'

defineProps({
  tone: { type: String, default: 'note' },
  title: { type: String, default: '' },
  text: { type: String, required: true },
})
</script>

<template>
  <div
    class="flex gap-3 rounded-xl border border-navy/10 bg-paper px-5 py-4 text-sm leading-relaxed text-slate-ink"
  >
    <Info class="mt-0.5 h-5 w-5 flex-none text-blue" aria-hidden="true" />
    <p>
      <strong v-if="title" class="font-semibold text-navy">{{ title }}. </strong>{{ text }}
    </p>
  </div>
</template>
