<script setup>
defineProps({
  tone: { type: String, default: 'dark' },
})

const iconSrc = '/brand/kayna-icon.png'
</script>

<template>
  <span class="inline-flex items-center gap-2.5">
    <img
      :src="iconSrc"
      alt=""
      width="40"
      height="40"
      class="h-10 w-10 shrink-0 rounded-lg object-cover shadow-sm ring-1 ring-line"
    />
    <span class="flex flex-col justify-center whitespace-nowrap leading-none">
      <span
        class="font-display text-xl font-bold leading-none tracking-[-0.03em]"
        :class="tone === 'light' ? 'text-white' : 'text-ink'"
      >
        Kayna
      </span>
      <span
        class="mt-1 font-body text-xs font-medium leading-none"
        :class="tone === 'light' ? 'text-slate-200' : 'text-body'"
      >
        IT Solutions
      </span>
    </span>
  </span>
</template>
