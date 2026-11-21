<script setup>
import { nav, site } from '../../data/site'
import { services } from '../../data/services'
import Wordmark from './Wordmark.vue'

const year = new Date().getFullYear()
const dtiLogo = '/brand/dti-logo.png'
</script>

<template>
  <footer class="border-t border-line bg-subtle">
    <div class="container-page grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
      <div>
        <Wordmark />
        <p class="mt-5 max-w-xs text-sm leading-relaxed text-body">{{ site.tagline }}</p>
        <div class="mt-6 flex items-center gap-3">
          <img
            :src="dtiLogo"
            alt="DTI Registered Business Name Number 8623505"
            width="185"
            height="85"
            loading="lazy"
            decoding="async"
            class="h-10 w-auto shrink-0"
          />
          <p class="text-xs leading-relaxed text-body">
            DTI Registered<br />
            Business Name No. 8623505
          </p>
        </div>
      </div>

      <nav aria-label="Footer pages">
        <h2 class="text-xs font-semibold uppercase tracking-[0.16em] text-ink">Pages</h2>
        <ul class="mt-4 space-y-2 text-sm">
          <li v-for="item in nav" :key="item.id">
            <a :href="item.path" class="text-body hover:text-ink hover:underline">{{ item.label }}</a>
          </li>
        </ul>
      </nav>

      <nav aria-label="Footer services">
        <h2 class="text-xs font-semibold uppercase tracking-[0.16em] text-ink">Services</h2>
        <ul class="mt-4 space-y-2 text-sm">
          <li v-for="service in services" :key="service.slug">
            <a :href="`/services/#${service.slug}`" class="text-body hover:text-ink hover:underline">
              {{ service.title }}
            </a>
          </li>
        </ul>
      </nav>

      <div>
        <h2 class="text-xs font-semibold uppercase tracking-[0.16em] text-ink">Contact</h2>
        <ul class="mt-4 space-y-3 text-sm">
          <li>
            <a :href="`mailto:${site.email}`" class="text-body hover:text-ink hover:underline">
              {{ site.email }}
            </a>
          </li>
          <li>
            <a :href="`tel:${site.phoneHref}`" class="text-body hover:text-ink hover:underline">
              {{ site.phone }}
            </a>
          </li>
          <li>
            <a :href="`tel:${site.mobileHref}`" class="text-body hover:text-ink hover:underline">
              {{ site.mobile }}
            </a>
          </li>
          <li class="text-body">{{ site.location }}</li>
        </ul>
        <ul class="mt-5 flex flex-wrap gap-x-4 gap-y-2 text-sm">
          <li v-for="social in site.socials" :key="social.label">
            <a
              :href="social.href"
              target="_blank"
              rel="noopener noreferrer"
              :aria-label="`${social.label} (opens in a new tab)`"
              class="text-ink underline decoration-link/30 underline-offset-4 hover:decoration-link"
            >
              {{ social.label }}
            </a>
          </li>
        </ul>
      </div>
    </div>

    <div class="border-t border-line">
      <div
        class="container-page flex flex-col gap-2 py-6 text-xs leading-relaxed text-body sm:flex-row sm:items-center sm:justify-between"
      >
        <p>© {{ year }} {{ site.name }}. All rights reserved.</p>
        <a href="/privacy/" class="hover:text-ink hover:underline">Privacy Policy</a>
      </div>
    </div>
  </footer>
</template>
