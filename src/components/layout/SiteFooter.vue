<script setup>
import { nav, site } from '../../data/site'
import { services } from '../../data/services'
import Wordmark from './Wordmark.vue'

const year = new Date().getFullYear()
</script>

<template>
  <footer class="border-t border-navy/10 bg-paper">
    <div class="container-page grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
      <div>
        <Wordmark />
        <p class="mt-5 max-w-xs text-sm leading-relaxed text-slate-ink">{{ site.tagline }}</p>
      </div>

      <nav aria-label="Footer pages">
        <h2 class="text-xs font-semibold uppercase tracking-[0.16em] text-navy">Pages</h2>
        <ul class="mt-4 space-y-2 text-sm">
          <li v-for="item in nav" :key="item.id">
            <a :href="item.path" class="text-slate-ink hover:text-navy hover:underline">{{ item.label }}</a>
          </li>
        </ul>
      </nav>

      <nav aria-label="Footer services">
        <h2 class="text-xs font-semibold uppercase tracking-[0.16em] text-navy">Services</h2>
        <ul class="mt-4 space-y-2 text-sm">
          <li v-for="service in services" :key="service.slug">
            <a :href="`/services/#${service.slug}`" class="text-slate-ink hover:text-navy hover:underline">
              {{ service.title }}
            </a>
          </li>
        </ul>
      </nav>

      <div>
        <h2 class="text-xs font-semibold uppercase tracking-[0.16em] text-navy">Contact</h2>
        <ul class="mt-4 space-y-3 text-sm">
          <li>
            <a :href="`mailto:${site.email}`" class="text-slate-ink hover:text-navy hover:underline">
              {{ site.email }}
            </a>
          </li>
          <li>
            <a :href="`tel:${site.phoneHref}`" class="text-slate-ink hover:text-navy hover:underline">
              {{ site.phone }}
            </a>
          </li>
          <li>
            <a :href="`tel:${site.mobileHref}`" class="text-slate-ink hover:text-navy hover:underline">
              {{ site.mobile }}
            </a>
          </li>
          <li class="text-slate-ink">{{ site.location }}</li>
        </ul>
        <ul class="mt-5 flex flex-wrap gap-x-4 gap-y-2 text-sm">
          <li v-for="social in site.socials" :key="social.label">
            <a
              v-if="social.href !== '#'"
              :href="social.href"
              class="text-navy underline decoration-navy/30 underline-offset-4 hover:decoration-navy"
            >
              {{ social.label }}
            </a>
            <span v-else class="text-slate-ink">
              {{ social.label }} <span class="text-xs">(link to be added)</span>
            </span>
          </li>
        </ul>
      </div>
    </div>

    <div class="border-t border-navy/10">
      <div
        class="container-page flex flex-col gap-2 py-6 text-xs leading-relaxed text-slate-ink sm:flex-row sm:items-center sm:justify-between"
      >
        <p>© {{ year }} {{ site.name }}. All rights reserved.</p>
        <p>Demonstration projects and sample articles are illustrative, not real engagements.</p>
      </div>
    </div>
  </footer>
</template>
