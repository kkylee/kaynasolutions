<script setup>
defineProps({
  tone: { type: String, default: 'dark' },
})
</script>

<template>
  <span class="inline-flex items-center">
    <img
      v-if="tone === 'light'"
      src="/brand/kayna-logo-inverse.svg"
      class="h-8 w-auto"
      alt="Kayna Digital Solutions"
    />
    <template v-else>
      <img
        src="/brand/kayna-logo-compact.svg"
        class="h-8 w-auto sm:hidden"
        alt="Kayna Digital Solutions"
      />
      <img
        src="/brand/kayna-logo.svg"
        class="hidden h-8 w-auto sm:block"
        alt="Kayna Digital Solutions"
      />
    </template>
  </span>
</template>
