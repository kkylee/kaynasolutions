<script setup>
import { computed } from 'vue'

const props = defineProps({
  image: { type: Object, required: true },
  ratio: { type: String, default: '3:2' },
  rounded: { type: Boolean, default: true },
  priority: { type: Boolean, default: false },
  sizes: { type: String, default: '(min-width: 1024px) 560px, 100vw' },
})

const ratios = {
  '3:2': 'aspect-[3/2]',
  '4:3': 'aspect-[4/3]',
  '1:1': 'aspect-square',
  '4:5': 'aspect-[4/5]',
  '16:9': 'aspect-video',
}

const ratioClass = computed(() => ratios[props.ratio] ?? ratios['3:2'])
</script>

<template>
  <figure :class="['overflow-hidden bg-ink/5', rounded ? 'rounded-2xl' : '']">
    <img
      :src="image.src"
      :srcset="image.srcset"
      :sizes="sizes"
      :width="image.width"
      :height="image.height"
      :alt="image.alt"
      :loading="priority ? 'eager' : 'lazy'"
      :fetchpriority="priority ? 'high' : 'auto'"
      decoding="async"
      :class="[ratioClass, 'h-full w-full object-cover']"
    />
  </figure>
</template>
