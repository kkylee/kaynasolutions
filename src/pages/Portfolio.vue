<script setup>
import { onMounted } from 'vue'
import MainLayout from '../layouts/MainLayout.vue'
import PageHeader from '../components/common/PageHeader.vue'
import Banner from '../components/common/Banner.vue'
import Tag from '../components/common/Tag.vue'
import CtaSection from '../components/common/CtaSection.vue'
import { mockFor } from '../components/mockups'
import { projects, projectsNote } from '../data/projects'
import { img } from '../lib/images'
import { useReveal } from '../lib/composables/useReveal'

onMounted(() => {
  useReveal().revealAll()
})
</script>

<template>
  <MainLayout>
    <PageHeader
      eyebrow="Portfolio"
      title="Demonstration projects, built to show how we think."
      lead="Five concepts drawn from problems we see repeatedly in growing businesses. Each one shows the problem, the proposed system, and the tools behind it."
      :image="img('service-consulting')"
    />

    <div id="portfolio-note" class="container-page pt-10">
      <Banner title="Demonstration content" :text="projectsNote" />
    </div>

    <section class="py-14 lg:py-20" data-reveal>
      <div class="container-page space-y-8">
        <article
          v-for="project in projects"
          :id="project.slug"
          :key="project.slug"
          class="scroll-mt-24 overflow-hidden rounded-2xl border border-navy/10 bg-white"
        >
          <div class="grid lg:grid-cols-[1.05fr_0.95fr]">
            <div class="min-w-0 p-6 sm:p-8 lg:p-10">
              <div class="flex flex-wrap items-center gap-3">
                <Tag tone="teal" label="Demonstration" data-demo />
                <span class="text-xs font-semibold uppercase tracking-[0.14em] text-slate-ink">
                  {{ project.category }}
                </span>
              </div>
              <h2 class="mt-4 text-2xl sm:text-3xl">{{ project.name }}</h2>

              <div class="mt-6 space-y-5">
                <div>
                  <h3 class="text-xs font-semibold uppercase tracking-[0.16em] text-slate-ink">
                    The problem
                  </h3>
                  <p class="mt-2 text-sm leading-relaxed text-slate-ink">{{ project.problem }}</p>
                </div>
                <div>
                  <h3 class="text-xs font-semibold uppercase tracking-[0.16em] text-slate-ink">
                    The concept
                  </h3>
                  <p class="mt-2 text-sm leading-relaxed text-slate-ink">{{ project.solution }}</p>
                </div>
              </div>

              <ul class="mt-6 flex flex-wrap gap-2">
                <li
                  v-for="tool in project.stack"
                  :key="tool"
                  class="rounded-full bg-paper px-3 py-1 text-xs font-medium text-navy ring-1 ring-inset ring-navy/10"
                >
                  {{ tool }}
                </li>
              </ul>
            </div>

            <div
              class="min-w-0 border-t border-navy/10 bg-paper p-6 sm:p-8 lg:grid lg:items-center lg:border-l lg:border-t-0 lg:p-10"
            >
              <component :is="mockFor(project.mockup)" />
            </div>
          </div>
        </article>
      </div>
    </section>

    <CtaSection
      title="Have a problem like one of these?"
      text="We can walk through how a real project would start — what we would look at first, and what could wait."
      href="/contact/"
      label="Start a Conversation"
      secondary-href="/services/"
      secondary-label="See our services"
    />
  </MainLayout>
</template>
