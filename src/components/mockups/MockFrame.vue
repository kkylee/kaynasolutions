<script setup>
defineProps({
  title: { type: String, required: true },
})
</script>

<template>
  <div
    role="img"
    :aria-label="`Illustrative interface mockup: ${title}`"
    class="overflow-hidden rounded-2xl border border-navy/10 bg-white shadow-lift"
  >
    <div class="flex items-center gap-3 bg-navy px-4 py-2.5" data-chrome aria-hidden="true">
      <div class="flex gap-1.5">
        <span class="h-2 w-2 rounded-full bg-white/25" />
        <span class="h-2 w-2 rounded-full bg-white/25" />
        <span class="h-2 w-2 rounded-full bg-teal/70" />
      </div>
      <p class="truncate text-[0.6875rem] font-medium tracking-wide text-white/70">{{ title }}</p>
    </div>
    <div class="bg-paper p-4 sm:p-5">
      <slot />
    </div>
  </div>
</template>
