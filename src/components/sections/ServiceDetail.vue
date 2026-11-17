<script setup>
import { computed } from 'vue'
import { ArrowUpRight, Check } from 'lucide-vue-next'
import PhotoFigure from '../common/PhotoFigure.vue'
import { img } from '../../lib/images'
import { icon } from '../../lib/icons'

const props = defineProps({
  service: { type: Object, required: true },
  index: { type: Number, required: true },
})

const flipped = computed(() => props.index % 2 === 1)
</script>

<template>
  <article :id="service.slug" class="scroll-mt-24 border-t border-line py-16 lg:py-24">
    <div
      class="container-page grid gap-10 lg:grid-cols-[1.02fr_0.98fr] lg:items-start lg:gap-16"
    >
      <div :class="[flipped ? 'lg:order-2' : '', 'min-w-0']">
        <p
          class="flex items-center gap-2.5 text-xs font-semibold uppercase tracking-[0.16em] text-link"
        >
          <component :is="icon(service.icon)" class="h-4 w-4" aria-hidden="true" />
          Service {{ String(index + 1).padStart(2, '0') }}
        </p>
        <h2 class="mt-4 text-2xl sm:text-3xl lg:text-4xl">{{ service.title }}</h2>
        <p class="mt-4 text-base leading-relaxed text-body">{{ service.summary }}</p>

        <h3 class="mt-8 text-xs font-semibold uppercase tracking-[0.16em] text-body">
          You might recognise this
        </h3>
        <ul class="mt-3 space-y-2.5">
          <li
            v-for="problem in service.problems"
            :key="problem"
            class="flex gap-3 text-sm leading-relaxed text-body"
          >
            <span class="mt-2 h-1 w-1 flex-none rounded-full bg-ink/35" aria-hidden="true" />
            {{ problem }}
          </li>
        </ul>

        <a
          href="/contact/"
          class="group mt-8 inline-flex min-h-6 items-center gap-2 text-sm font-semibold text-ink hover:text-link"
        >
          Talk about this service
          <ArrowUpRight
            class="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            aria-hidden="true"
          />
        </a>
      </div>

      <div :class="[flipped ? 'lg:order-1' : '', 'min-w-0']">
        <PhotoFigure
          :image="img(service.image)"
          ratio="4:3"
          sizes="(min-width: 1024px) 560px, 100vw"
        />
        <div class="mt-6 rounded-xl border border-line bg-subtle p-5">
          <h3 class="text-xs font-semibold uppercase tracking-[0.16em] text-ink">What changes</h3>
          <ul class="mt-3 space-y-2.5">
            <li
              v-for="benefit in service.benefits"
              :key="benefit"
              class="flex gap-2.5 text-sm leading-relaxed text-body"
            >
              <Check class="mt-0.5 h-4 w-4 flex-none text-signal" aria-hidden="true" />
              {{ benefit }}
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div class="container-page mt-10 grid gap-4 sm:grid-cols-2">
      <div
        v-for="example in service.examples"
        :key="example.title"
        class="rounded-xl border border-line p-5"
      >
        <h3 class="text-base">{{ example.title }}</h3>
        <p class="mt-2 text-sm leading-relaxed text-body">{{ example.body }}</p>
      </div>
    </div>
  </article>
</template>
