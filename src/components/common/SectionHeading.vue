<script setup>
import { computed } from 'vue'

const props = defineProps({
  eyebrow: { type: String, default: '' },
  title: { type: String, required: true },
  lead: { type: String, default: '' },
  align: { type: String, default: 'left' },
  level: { type: Number, default: 2 },
})

const heading = computed(() => `h${props.level}`)
const centered = computed(() => props.align === 'center')
</script>

<template>
  <div :class="['max-w-3xl', centered ? 'mx-auto text-center' : '']">
    <p v-if="eyebrow" class="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-blue">
      {{ eyebrow }}
    </p>
    <component :is="heading" class="text-3xl leading-[1.15] sm:text-4xl lg:text-[2.75rem]">
      {{ title }}
    </component>
    <p
      v-if="lead"
      class="mt-5 text-base leading-relaxed text-slate-ink sm:text-lg"
      :class="['measure', centered ? 'mx-auto' : '']"
    >
      {{ lead }}
    </p>
  </div>
</template>
