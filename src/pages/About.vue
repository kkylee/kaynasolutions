<script setup>
import { onMounted } from 'vue'
import MainLayout from '../layouts/MainLayout.vue'
import PageHeader from '../components/common/PageHeader.vue'
import SectionHeading from '../components/common/SectionHeading.vue'
import PhotoFigure from '../components/common/PhotoFigure.vue'
import CtaSection from '../components/common/CtaSection.vue'
import { audiences, beliefs, measures, story } from '../data/about'
import { img } from '../lib/images'
import { useReveal } from '../lib/composables/useReveal'

onMounted(() => {
  useReveal().revealAll()
})
</script>

<template>
  <MainLayout>
    <PageHeader
      eyebrow="About Solvanta"
      title="A practical technology partner for growing businesses."
      lead="We help teams replace spreadsheets, chat threads, and guesswork with systems that fit how they already work — and keep fitting as they grow."
      :image="img('about-collaboration')"
    />

    <section class="py-20 lg:py-28" data-reveal>
      <div class="container-page grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-start lg:gap-16">
        <div>
          <SectionHeading eyebrow="Why we exist" title="The gap between ambition and systems." />
          <div class="mt-6 max-w-[62ch] space-y-4 text-base leading-relaxed text-slate-ink">
            <p v-for="paragraph in story" :key="paragraph">{{ paragraph }}</p>
          </div>
        </div>

        <aside class="rounded-2xl bg-navy p-7 text-white sm:p-9 lg:mt-6">
          <p class="h-1 w-10 rounded-full bg-teal" aria-hidden="true" />
          <p class="mt-6 font-display text-2xl leading-snug tracking-tight text-white sm:text-[1.75rem]">
            Big-business capability should not be reserved for big businesses.
          </p>
          <p class="mt-5 text-sm leading-relaxed text-white/65">
            The working principle behind every engagement.
          </p>
        </aside>
      </div>
    </section>

    <section class="border-t border-navy/10 bg-paper py-20 lg:py-28" data-reveal>
      <div class="container-page">
        <SectionHeading
          eyebrow="What we believe"
          title="What we believe about building systems."
          lead="Four commitments that shape how a project is scoped, written, and handed over."
        />
        <ul class="mt-12 grid gap-x-12 gap-y-10 sm:grid-cols-2">
          <li
            v-for="(belief, index) in beliefs"
            :key="belief.title"
            data-belief
            class="border-t border-navy/15 pt-5"
          >
            <span class="text-xs font-semibold tabular-nums text-blue">0{{ index + 1 }}</span>
            <h3 class="mt-3 text-lg">{{ belief.title }}</h3>
            <p class="mt-2 text-sm leading-relaxed text-slate-ink">{{ belief.body }}</p>
          </li>
        </ul>
      </div>
    </section>

    <section id="audiences" class="py-20 lg:py-28" data-reveal>
      <div class="container-page grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start lg:gap-16">
        <div class="lg:sticky lg:top-24">
          <SectionHeading
            eyebrow="Who we work with"
            title="Businesses that have outgrown their workarounds."
            lead="The industries differ. The pattern is the same: the information is there, but it takes too much effort to keep it straight."
          />
          <PhotoFigure
            class="mt-8"
            :image="img('why-team')"
            ratio="4:3"
            sizes="(min-width: 1024px) 480px, 100vw"
          />
        </div>

        <ul class="border-t border-navy/10">
          <li
            v-for="audience in audiences"
            :key="audience.name"
            class="grid gap-1 border-b border-navy/10 py-5 sm:grid-cols-[0.85fr_1.15fr] sm:gap-6"
          >
            <h3 class="text-base">{{ audience.name }}</h3>
            <p class="text-sm leading-relaxed text-slate-ink">{{ audience.body }}</p>
          </li>
        </ul>
      </div>
    </section>

    <section class="border-t border-navy/10 bg-paper py-20 lg:py-28" data-reveal>
      <div class="container-page">
        <div class="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <SectionHeading
            eyebrow="How we measure success"
            title="A system is only good if it is still used."
            lead="These three questions decide whether a project actually worked."
          />
          <ul class="grid gap-6 sm:grid-cols-3 lg:gap-5">
            <li
              v-for="(measure, index) in measures"
              :key="measure.title"
              data-measure
              class="border-t-2 border-teal/60 pt-4"
            >
              <span class="text-xs font-semibold tabular-nums text-slate-ink">0{{ index + 1 }}</span>
              <h3 class="mt-3 text-base leading-snug">{{ measure.title }}</h3>
              <p class="mt-2 text-sm leading-relaxed text-slate-ink">{{ measure.body }}</p>
            </li>
          </ul>
        </div>
      </div>
    </section>

    <CtaSection
      title="Tell us what your team is working around."
      text="A short conversation is usually enough to see whether the problem needs new software or a simpler process."
      href="/contact/"
      label="Start a Conversation"
      secondary-href="/services/"
      secondary-label="See our services"
    />
  </MainLayout>
</template>
