<script setup>
import BaseButton from '../common/BaseButton.vue'
import PhotoFigure from '../common/PhotoFigure.vue'
import { site } from '../../data/site'
import { img } from '../../lib/images'
</script>

<template>
  <section id="hero" class="relative overflow-hidden bg-white pt-28 sm:pt-32 lg:pt-36">
    <div
      class="container-page grid items-center gap-10 pb-14 lg:grid-cols-[1.02fr_0.98fr] lg:gap-14 lg:pb-24"
    >
      <div>
        <p
          class="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-navy/70"
        >
          <span class="h-1.5 w-1.5 rounded-full bg-teal" aria-hidden="true" />
          Business systems for growing companies
        </p>
        <h1 class="mt-5 text-[2.6rem] leading-[1.02] sm:text-5xl lg:text-6xl">
          Better business starts with better systems.
        </h1>
        <p class="mt-6 max-w-xl text-lg leading-relaxed text-slate-ink">
          Big-business capabilities, practical solutions for growing businesses. We replace manual
          workarounds with software, automation, and systems that talk to each other.
        </p>
        <div class="mt-8 flex flex-wrap gap-3">
          <BaseButton href="/contact/" label="Start a Conversation" size="lg" />
          <BaseButton
            href="/services/"
            label="Explore Our Services"
            variant="secondary"
            size="lg"
          />
        </div>
        <ul
          class="mt-10 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-navy/10 pt-5 text-sm text-slate-ink"
        >
          <li v-for="audience in site.audiences" :key="audience" class="flex items-center gap-2">
            <span class="h-1 w-1 rounded-full bg-navy/30" aria-hidden="true" />
            {{ audience }}
          </li>
        </ul>
      </div>

      <PhotoFigure
        :image="img('hero-consultation')"
        ratio="4:3"
        priority
        sizes="(min-width: 1024px) 560px, 100vw"
      />
    </div>
  </section>
</template>
