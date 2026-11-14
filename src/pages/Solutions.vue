<script setup>
import { onMounted } from 'vue'
import MainLayout from '../layouts/MainLayout.vue'
import PageHeader from '../components/common/PageHeader.vue'
import Banner from '../components/common/Banner.vue'
import SolutionDetail from '../components/sections/SolutionDetail.vue'
import CtaSection from '../components/common/CtaSection.vue'
import { solutions } from '../data/solutions'
import { img } from '../lib/images'
import { useReveal } from '../lib/composables/useReveal'

onMounted(() => {
  useReveal().revealAll()
})
</script>

<template>
  <MainLayout>
    <PageHeader
      eyebrow="Solutions"
      title="Solutions for the problems growing businesses know."
      lead="Each solution starts with a familiar problem, then shows the process and the system behind it. Find the one that sounds like your week."
      :image="img('service-integration')"
    />

    <section aria-label="Solution index" class="border-b border-navy/10 bg-paper">
      <div id="solution-index" class="container-page flex flex-wrap gap-2 py-5">
        <a
          v-for="solution in solutions"
          :key="solution.slug"
          :href="`#${solution.slug}`"
          class="rounded-full border border-navy/15 bg-white px-3.5 py-1.5 text-sm text-navy transition-colors hover:border-navy/40"
        >
          {{ solution.title }}
        </a>
      </div>
    </section>

    <div class="container-page pt-8">
      <Banner
        title="About these examples"
        text="The systems shown are illustrative mockups, not client screenshots or live data. They show the shape of the work, not a finished product for a named client."
      />
    </div>

    <SolutionDetail
      v-for="(solution, index) in solutions"
      :key="solution.slug"
      :solution="solution"
      :index="index"
      data-reveal
    />

    <CtaSection
      title="Which of these sounds like your week?"
      text="Tell us where the work gets stuck. We will suggest the smallest useful step, whether that is a new system, a connection between two tools, or a change in process."
      href="/contact/"
      label="Start a Conversation"
      secondary-href="/portfolio/"
      secondary-label="See example projects"
    />
  </MainLayout>
</template>
