<script setup>
import SectionHeading from '../common/SectionHeading.vue'
import PhotoFigure from '../common/PhotoFigure.vue'
import { challenges } from '../../data/home'
import { img } from '../../lib/images'
</script>

<template>
  <section id="challenges" class="border-t border-line bg-subtle py-20 lg:py-28" data-reveal>
    <div class="container-page grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
      <div class="lg:sticky lg:top-24 lg:self-start">
        <SectionHeading
          eyebrow="The pattern"
          title="Still managing your business manually?"
          lead="None of this is a people problem. It is a systems problem, and it usually shows up in the same six places."
        />
        <PhotoFigure class="mt-8 max-w-sm" :image="img('challenges-counter')" ratio="3:2" />
      </div>

      <ol class="border-t border-line">
        <li
          v-for="(item, index) in challenges"
          :key="item.title"
          class="grid gap-2 border-b border-line py-5 sm:grid-cols-[2.5rem_1fr] sm:gap-4"
        >
          <span class="text-xs font-semibold tabular-nums text-link">0{{ index + 1 }}</span>
          <div>
            <h3 class="text-lg">{{ item.title }}</h3>
            <p class="mt-1 text-sm leading-relaxed text-body">{{ item.body }}</p>
          </div>
        </li>
      </ol>
    </div>
  </section>
</template>
