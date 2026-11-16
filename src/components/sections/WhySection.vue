<script setup>
import SectionHeading from '../common/SectionHeading.vue'
import PhotoFigure from '../common/PhotoFigure.vue'
import BaseButton from '../common/BaseButton.vue'
import { reasons } from '../../data/home'
import { img } from '../../lib/images'
</script>

<template>
  <section id="why" class="border-t border-navy/10 bg-paper py-20 lg:py-28" data-reveal>
    <div class="container-page grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
      <PhotoFigure :image="img('why-team')" ratio="4:3" sizes="(min-width: 1024px) 560px, 100vw" />

      <div>
        <SectionHeading
          eyebrow="Why Kayna Digital Solutions"
          title="Technology that works around your business."
          lead="Not the other way around. The tools should follow how your team already succeeds, then remove the parts that slow them down."
        />
        <ul class="mt-8 space-y-6">
          <li
            v-for="(reason, index) in reasons"
            :key="reason.title"
            class="grid grid-cols-[2rem_1fr] gap-3"
          >
            <span class="pt-1 text-xs font-semibold tabular-nums text-blue">0{{ index + 1 }}</span>
            <div>
              <h3 class="text-base">{{ reason.title }}</h3>
              <p class="mt-1 text-sm leading-relaxed text-slate-ink">{{ reason.body }}</p>
            </div>
          </li>
        </ul>
        <BaseButton
          class="mt-8"
          href="/about/"
          label="More about our approach"
          variant="secondary"
        />
      </div>
    </div>
  </section>
</template>
