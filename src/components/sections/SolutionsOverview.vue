<script setup>
import { ArrowUpRight } from 'lucide-vue-next'
import SectionHeading from '../common/SectionHeading.vue'
import { solutions } from '../../data/solutions'
import { icon } from '../../lib/icons'
</script>

<template>
  <section id="solutions-overview" class="py-20 lg:py-28" data-reveal>
    <div class="container-page">
      <SectionHeading
        eyebrow="Solutions"
        title="From business challenges to practical solutions."
        lead="Start with the problem you recognise. Each solution shows the process, the system behind it, and what changes day to day."
      />

      <ul class="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <li v-for="solution in solutions" :key="solution.slug">
          <a
            :href="`/solutions/#${solution.slug}`"
            class="group flex h-full items-start justify-between gap-3 rounded-xl border border-line p-5 transition-colors hover:border-link hover:bg-subtle"
          >
            <div>
              <component :is="icon(solution.icon)" class="h-5 w-5 text-signal" aria-hidden="true" />
              <h3 class="mt-4 text-base leading-snug">{{ solution.title }}</h3>
            </div>
            <ArrowUpRight
              class="h-4 w-4 flex-none text-ink/30 group-hover:text-link"
              aria-hidden="true"
            />
          </a>
        </li>
      </ul>
    </div>
  </section>
</template>
