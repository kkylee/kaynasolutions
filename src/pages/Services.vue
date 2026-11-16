<script setup>
import { onMounted } from 'vue'
import MainLayout from '../layouts/MainLayout.vue'
import PageHeader from '../components/common/PageHeader.vue'
import ServiceDetail from '../components/sections/ServiceDetail.vue'
import CtaSection from '../components/common/CtaSection.vue'
import { services } from '../data/services'
import { img } from '../lib/images'
import { useReveal } from '../lib/composables/useReveal'

onMounted(() => {
  useReveal().revealAll()
})
</script>

<template>
  <MainLayout>
    <PageHeader
      eyebrow="Services"
      title="Technology solutions for businesses ready to grow."
      lead="Seven services that work on their own or together. Most engagements start with one process that keeps costing your team time, then grow from there."
      :image="img('hero-consultation')"
    />

    <section aria-label="Service index" class="border-b border-navy/10 bg-paper">
      <div id="service-index" class="container-page flex flex-wrap gap-2 py-5">
        <a
          v-for="service in services"
          :key="service.slug"
          :href="`#${service.slug}`"
          class="rounded-full border border-navy/15 bg-white px-3.5 py-1.5 text-sm text-navy transition-colors hover:border-navy/40"
        >
          {{ service.title }}
        </a>
      </div>
    </section>

    <ServiceDetail
      v-for="(service, index) in services"
      :key="service.slug"
      :service="service"
      :index="index"
      data-reveal
    />

    <CtaSection
      title="Not sure which service fits?"
      text="Describe the process that keeps slipping. We will tell you whether it needs software, automation, a connection between tools, or simply a clearer process."
      href="/contact/"
      label="Start a Conversation"
      secondary-href="/solutions/"
      secondary-label="Browse solutions"
    />
  </MainLayout>
</template>
