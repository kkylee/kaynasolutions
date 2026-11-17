<script setup>
import { computed } from 'vue'

const props = defineProps({
  href: { type: String, default: '' },
  label: { type: String, required: true },
  variant: { type: String, default: 'primary' },
  size: { type: String, default: 'md' },
  type: { type: String, default: 'button' },
})

const tag = computed(() => (props.href ? 'a' : 'button'))

const base =
  'inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-50'

const variants = {
  primary: 'bg-action text-white hover:bg-action-hover',
  secondary: 'border border-line-strong text-ink hover:border-link hover:bg-subtle',
  ghost: 'text-ink underline decoration-link/40 decoration-2 underline-offset-4 hover:decoration-link',
  inverse: 'bg-inverse text-inverse-ink hover:bg-inverse/90',
  'ghost-inverse': 'border border-white/30 text-white hover:border-white/70',
}

const sizes = {
  md: 'px-5 py-2.5 text-sm',
  lg: 'px-6 py-3.5 text-base',
}

const classes = computed(() =>
  [base, variants[props.variant] ?? variants.primary, sizes[props.size] ?? sizes.md].join(' '),
)
</script>

<template>
  <component
    :is="tag"
    :href="href || undefined"
    :type="tag === 'button' ? type : undefined"
    :class="classes"
  >
    <span>{{ label }}</span>
  </component>
</template>
