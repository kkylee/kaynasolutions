<script setup>
import { onMounted } from 'vue'
import MainLayout from '../layouts/MainLayout.vue'
import PageHeader from '../components/common/PageHeader.vue'
import ContactForm from '../components/sections/ContactForm.vue'
import { site } from '../data/site'
import { img } from '../lib/images'
import { useReveal } from '../lib/composables/useReveal'

const nextSteps = [
  'You send the email with as much detail as you have.',
  'We reply to arrange a short conversation about the process.',
  'You get a plain-language view of what to fix first, and what can wait.',
]

onMounted(() => {
  useReveal().revealAll()
})
</script>

<template>
  <MainLayout>
    <PageHeader
      eyebrow="Contact"
      title="Start with the process that is slowing you down."
      lead="Tell us what your team is working around. A few plain sentences are enough — no brief, no jargon, and no obligation."
      :image="img('contact-meeting')"
    />

    <section class="py-16 lg:py-24" data-reveal>
      <div class="container-page grid gap-10 lg:grid-cols-[1.12fr_0.88fr] lg:items-start lg:gap-14">
        <ContactForm />

        <aside id="contact-details" class="space-y-6">
          <div class="rounded-2xl border border-line bg-subtle p-6">
            <h2 class="text-base">Or reach us directly</h2>
            <dl class="mt-4 space-y-4 text-sm">
              <div>
                <dt class="text-xs font-semibold uppercase tracking-[0.12em] text-body">Email</dt>
                <dd class="mt-0.5">
                  <a
                    data-email
                    :href="`mailto:${site.email}`"
                    class="inline-flex min-h-6 items-center text-ink underline decoration-link/30 underline-offset-4 hover:decoration-link"
                  >
                    {{ site.email }}
                  </a>
                </dd>
              </div>
              <div>
                <dt class="text-xs font-semibold uppercase tracking-[0.12em] text-body">Telephone</dt>
                <dd class="mt-0.5">
                  <a
                    data-phone
                    :href="`tel:${site.phoneHref}`"
                    class="inline-flex min-h-6 items-center text-ink underline decoration-link/30 underline-offset-4 hover:decoration-link"
                  >
                    {{ site.phone }}
                  </a>
                </dd>
              </div>
              <div>
                <dt class="text-xs font-semibold uppercase tracking-[0.12em] text-body">Mobile</dt>
                <dd class="mt-0.5">
                  <a
                    data-mobile
                    :href="`tel:${site.mobileHref}`"
                    class="inline-flex min-h-6 items-center text-ink underline decoration-link/30 underline-offset-4 hover:decoration-link"
                  >
                    {{ site.mobile }}
                  </a>
                </dd>
              </div>
              <div>
                <dt class="text-xs font-semibold uppercase tracking-[0.12em] text-body">Based in</dt>
                <dd class="mt-0.5 text-ink">{{ site.location }}</dd>
              </div>
              <div>
                <dt class="text-xs font-semibold uppercase tracking-[0.12em] text-body">Social</dt>
                <dd class="mt-1 flex flex-wrap gap-x-4 gap-y-2">
                  <a
                    v-for="social in site.socials"
                    :key="social.label"
                    :href="social.href"
                    target="_blank"
                    rel="noopener noreferrer"
                    :aria-label="`${social.label} (opens in a new tab)`"
                    class="inline-flex min-h-6 items-center text-ink underline decoration-link/30 underline-offset-4 hover:decoration-link"
                  >
                    {{ social.label }}
                  </a>
                </dd>
              </div>
            </dl>
          </div>

          <div class="rounded-2xl border border-line p-6">
            <h2 class="text-base">What happens next</h2>
            <ol id="next-steps" class="mt-4 space-y-3">
              <li
                v-for="(step, index) in nextSteps"
                :key="step"
                class="grid grid-cols-[1.5rem_1fr] gap-2 text-sm leading-relaxed text-body"
              >
                <span class="text-xs font-semibold tabular-nums text-link">{{ index + 1 }}</span>
                {{ step }}
              </li>
            </ol>
            <p class="mt-4 text-xs leading-relaxed text-body">
              No newsletter, no automated sequence, and no pressure to book anything.
            </p>
          </div>
        </aside>
      </div>
    </section>
  </MainLayout>
</template>
