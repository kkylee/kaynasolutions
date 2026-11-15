<script setup>
defineProps({
  tone: { type: String, default: 'dark' },
})
</script>

<template>
  <span class="inline-flex items-center gap-2.5">
    <svg viewBox="0 0 32 32" class="h-8 w-8 flex-none" aria-hidden="true" focusable="false">
      <rect width="32" height="32" rx="8" :class="tone === 'light' ? 'fill-white' : 'fill-navy'" />
      <path
        d="M11 12.25h7.25a4.75 4.75 0 0 1 0 9.5H13.5"
        fill="none"
        :stroke="tone === 'light' ? '#101D35' : '#FFFFFF'"
        stroke-width="2.6"
        stroke-linecap="round"
      />
      <path
        d="M21 19.75h-7.25a4.75 4.75 0 0 1 0-9.5H18.5"
        fill="none"
        stroke="#14B8A6"
        stroke-width="2.6"
        stroke-linecap="round"
      />
    </svg>
    <span
      class="font-display text-lg leading-none tracking-tight"
      :class="tone === 'light' ? 'text-white' : 'text-navy'"
    >
      <span class="font-semibold">Sol</span><span class="font-normal opacity-70"> Digital</span>
    </span>
  </span>
</template>
