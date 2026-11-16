<script setup>
import { computed, onMounted } from 'vue'
import MainLayout from '../layouts/MainLayout.vue'
import PageHeader from '../components/common/PageHeader.vue'
import Banner from '../components/common/Banner.vue'
import ArticleCard from '../components/sections/ArticleCard.vue'
import CtaSection from '../components/common/CtaSection.vue'
import { articles } from '../data/articles'
import { useReveal } from '../lib/composables/useReveal'

const topics = computed(() => [...new Set(articles.map((article) => article.category))])

onMounted(() => {
  useReveal().revealAll()
})
</script>

<template>
  <MainLayout>
    <PageHeader
      eyebrow="Insights"
      title="Practical notes on systems, operations, and growth."
      lead="Short articles about the problems we see most often, written for owners and managers rather than technical teams."
    >
      <p class="measure mt-8 text-sm leading-relaxed text-slate-ink">
        <span class="font-semibold text-navy">Topics:</span>
        {{ topics.join(' · ') }}
      </p>
    </PageHeader>

    <div class="container-page pt-10">
      <Banner
        title="About these articles"
        text="Sample articles written in the Kayna Digital Solutions voice to demonstrate the kind of guidance we publish. They are not client case studies, and they are not a substitute for advice about your specific situation."
      />
    </div>

    <section class="py-14 lg:py-20" data-reveal>
      <div class="container-page grid gap-4">
        <ArticleCard v-for="article in articles" :key="article.slug" :article="article" />
      </div>
    </section>

    <CtaSection
      title="Want this applied to your business?"
      text="Bring the process that frustrates your team most. We will talk through what to fix first and what can wait."
      href="/contact/"
      label="Start a Conversation"
      secondary-href="/portfolio/"
      secondary-label="See example projects"
    />
  </MainLayout>
</template>
