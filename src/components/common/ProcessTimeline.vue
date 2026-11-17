<script setup>
defineProps({
  steps: { type: Array, required: true },
})
</script>

<template>
  <ol class="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
    <li
      v-for="(step, index) in steps"
      :key="step.title"
      class="relative border-t border-white/20 pt-6"
    >
      <span class="text-xs font-semibold tabular-nums text-signal-bright">0{{ index + 1 }}</span>
      <h3 class="mt-3 text-xl text-white">{{ step.title }}</h3>
      <p class="mt-2 text-sm leading-relaxed text-white/70">{{ step.body }}</p>
    </li>
  </ol>
</template>
