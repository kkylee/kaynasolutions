<script setup>
import { ChevronDown } from 'lucide-vue-next'
import PhotoFigure from '../common/PhotoFigure.vue'
import { img } from '../../lib/images'

defineProps({
  article: { type: Object, required: true },
})
</script>

<template>
  <article
    :id="article.slug"
    class="scroll-mt-24 overflow-hidden rounded-2xl border border-navy/10 bg-white"
  >
    <div class="grid sm:grid-cols-[15rem_1fr] lg:grid-cols-[18rem_1fr]">
      <PhotoFigure
        :image="img(article.image)"
        ratio="4:3"
        :rounded="false"
        class="sm:h-full"
        sizes="(min-width: 1024px) 288px, (min-width: 640px) 240px, 100vw"
      />

      <div class="p-5 sm:p-6">
        <div class="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs">
          <span class="font-semibold uppercase tracking-[0.14em] text-blue">
            {{ article.category }}
          </span>
          <span class="text-navy/30" aria-hidden="true">•</span>
          <span class="text-slate-ink">{{ article.readTime }}</span>
        </div>

        <h2 class="mt-2 text-xl leading-snug sm:text-2xl">{{ article.title }}</h2>
        <p class="mt-2 text-sm leading-relaxed text-slate-ink">{{ article.excerpt }}</p>

        <details class="group mt-4">
          <summary
            class="inline-flex cursor-pointer list-none items-center gap-2 rounded-md text-sm font-semibold text-navy hover:text-blue [&::-webkit-details-marker]:hidden"
          >
            <span>Read the article</span>
            <span class="sr-only">: {{ article.title }}</span>
            <ChevronDown
              class="h-4 w-4 transition-transform group-open:rotate-180"
              aria-hidden="true"
            />
          </summary>
          <div class="mt-4 space-y-3 border-t border-navy/10 pt-4">
            <p
              v-for="paragraph in article.body"
              :key="paragraph"
              class="text-sm leading-relaxed text-slate-ink"
            >
              {{ paragraph }}
            </p>
          </div>
        </details>
      </div>
    </div>
  </article>
</template>
