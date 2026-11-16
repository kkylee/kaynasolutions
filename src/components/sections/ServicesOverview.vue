<script setup>
import { ArrowUpRight } from 'lucide-vue-next'
import SectionHeading from '../common/SectionHeading.vue'
import { services } from '../../data/services'
import { icon } from '../../lib/icons'
</script>

<template>
  <section id="services-overview" class="py-20 lg:py-28" data-reveal>
    <div class="container-page">
      <div class="flex flex-wrap items-end justify-between gap-6">
        <SectionHeading
          eyebrow="Services"
          title="Technology solutions for businesses ready to grow."
          lead="Seven ways we help, from a ready-made starting point to a connected set of systems."
        />
        <a
          href="/services/"
          class="group inline-flex min-h-6 items-center gap-2 text-sm font-semibold text-navy hover:text-blue"
        >
          All services
          <ArrowUpRight
            class="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            aria-hidden="true"
          />
        </a>
      </div>

      <ul class="mt-12 grid border-t border-navy/10 sm:grid-cols-2 sm:gap-x-10">
        <li v-for="service in services" :key="service.slug" class="border-b border-navy/10">
          <a :href="`/services/#${service.slug}`" class="group flex gap-4 py-6">
            <component
              :is="icon(service.icon)"
              class="mt-1 h-5 w-5 flex-none text-blue"
              aria-hidden="true"
            />
            <div class="flex-1">
              <h3 class="text-lg group-hover:text-blue">{{ service.title }}</h3>
              <p class="mt-1.5 text-sm leading-relaxed text-slate-ink">{{ service.summary }}</p>
            </div>
            <ArrowUpRight
              class="mt-1 h-4 w-4 flex-none text-navy/30 group-hover:text-blue"
              aria-hidden="true"
            />
          </a>
        </li>
      </ul>
    </div>
  </section>
</template>
