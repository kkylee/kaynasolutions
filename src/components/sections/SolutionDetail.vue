<script setup>
import { computed } from 'vue'
import { ArrowUpRight, Check } from 'lucide-vue-next'
import { mockFor } from '../mockups'
import { icon } from '../../lib/icons'

const props = defineProps({
  solution: { type: Object, required: true },
  index: { type: Number, required: true },
})

const flipped = computed(() => props.index % 2 === 1)
</script>

<template>
  <article :id="solution.slug" class="scroll-mt-24 border-t border-navy/10 py-16 lg:py-24">
    <div class="container-page grid gap-10 lg:grid-cols-2 lg:items-start lg:gap-16">
      <div :class="[flipped ? 'lg:order-2' : '', 'min-w-0']">
        <p
          class="flex items-center gap-2.5 text-xs font-semibold uppercase tracking-[0.16em] text-blue"
        >
          <component :is="icon(solution.icon)" class="h-4 w-4" aria-hidden="true" />
          Solution {{ String(index + 1).padStart(2, '0') }}
        </p>
        <h2 class="mt-4 text-2xl sm:text-3xl lg:text-4xl">{{ solution.title }}</h2>
        <p class="mt-4 text-base leading-relaxed text-slate-ink">{{ solution.problem }}</p>

        <div class="mt-6 rounded-xl border border-navy/10 bg-paper p-5">
          <h3 class="text-xs font-semibold uppercase tracking-[0.16em] text-navy">The approach</h3>
          <p class="mt-2 text-sm leading-relaxed text-slate-ink">{{ solution.approach }}</p>
        </div>

        <h3 class="mt-8 text-xs font-semibold uppercase tracking-[0.16em] text-slate-ink">
          How it works
        </h3>
        <ol data-how class="mt-3 space-y-3">
          <li
            v-for="(step, stepIndex) in solution.howItWorks"
            :key="step"
            class="grid grid-cols-[1.5rem_1fr] gap-2 text-sm leading-relaxed text-slate-ink"
          >
            <span class="text-xs font-semibold tabular-nums text-blue">{{ stepIndex + 1 }}</span>
            {{ step }}
          </li>
        </ol>

        <a
          href="/contact/"
          class="group mt-8 inline-flex min-h-6 items-center gap-2 text-sm font-semibold text-navy hover:text-blue"
        >
          {{ solution.cta }}
          <ArrowUpRight
            class="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            aria-hidden="true"
          />
        </a>
      </div>

      <div :class="[flipped ? 'lg:order-1' : '', 'min-w-0 lg:sticky lg:top-24']">
        <component :is="mockFor(solution.mockup)" />
        <ul class="mt-4 flex flex-wrap gap-2">
          <li
            v-for="benefit in solution.benefits"
            :key="benefit"
            class="inline-flex items-center gap-1.5 rounded-full bg-teal/10 px-3 py-1 text-xs font-medium text-navy"
          >
            <Check class="h-3.5 w-3.5 flex-none text-teal" aria-hidden="true" />
            {{ benefit }}
          </li>
        </ul>
      </div>
    </div>
  </article>
</template>
