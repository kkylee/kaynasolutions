<script setup>
import ProcessTimeline from '../common/ProcessTimeline.vue'
import { process } from '../../data/home'
</script>

<template>
  <section id="process" class="bg-deep py-20 text-white lg:py-28" data-reveal>
    <div class="container-page">
      <div class="max-w-2xl">
        <p class="text-xs font-semibold uppercase tracking-[0.18em] text-signal-bright">How we work</p>
        <h2 class="mt-3 text-3xl text-white sm:text-4xl">
          Four steps, and you know where things stand.
        </h2>
        <p class="mt-4 text-base leading-relaxed text-white/70">
          No big reveal at the end. Each step ends with something you can read, test, or use.
        </p>
      </div>
      <ProcessTimeline class="mt-12" :steps="process" />
    </div>
  </section>
</template>
