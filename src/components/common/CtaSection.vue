<script setup>
import BaseButton from './BaseButton.vue'

defineProps({
  title: { type: String, required: true },
  text: { type: String, default: '' },
  href: { type: String, required: true },
  label: { type: String, required: true },
  secondaryHref: { type: String, default: '' },
  secondaryLabel: { type: String, default: '' },
})
</script>

<template>
  <section class="bg-navy text-white">
    <div
      class="container-page flex flex-col gap-8 py-16 lg:flex-row lg:items-end lg:justify-between lg:py-20"
    >
      <div class="max-w-2xl">
        <h2 class="text-3xl leading-tight text-white sm:text-4xl">{{ title }}</h2>
        <p v-if="text" class="mt-4 text-base leading-relaxed text-white/75">{{ text }}</p>
      </div>
      <div class="flex flex-wrap gap-3">
        <BaseButton :href="href" :label="label" variant="inverse" size="lg" />
        <BaseButton
          v-if="secondaryHref"
          :href="secondaryHref"
          :label="secondaryLabel"
          variant="ghost-inverse"
          size="lg"
        />
      </div>
    </div>
  </section>
</template>
