<script setup>
import PhotoFigure from './PhotoFigure.vue'

defineProps({
  eyebrow: { type: String, default: '' },
  title: { type: String, required: true },
  lead: { type: String, default: '' },
  image: { type: Object, default: null },
})
</script>

<template>
  <header class="border-b border-navy/10 bg-paper">
    <div
      class="container-page grid gap-10 pb-14 pt-32 lg:grid-cols-[1.15fr_0.85fr] lg:items-end lg:gap-16 lg:pb-20 lg:pt-40"
    >
      <div>
        <p v-if="eyebrow" class="text-xs font-semibold uppercase tracking-[0.18em] text-blue">
          {{ eyebrow }}
        </p>
        <h1 class="mt-4 text-4xl leading-[1.05] sm:text-5xl lg:text-6xl">{{ title }}</h1>
        <p v-if="lead" class="measure mt-6 text-lg leading-relaxed text-slate-ink">{{ lead }}</p>
        <slot />
      </div>
      <PhotoFigure v-if="image" :image="image" ratio="4:3" priority />
    </div>
  </header>
</template>
