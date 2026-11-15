<script setup>
import { nextTick, reactive, ref, watch } from 'vue'
import BaseButton from '../common/BaseButton.vue'
import { services } from '../../data/services'
import { site } from '../../data/site'

const form = reactive({
  name: '',
  email: '',
  company: '',
  phone: '',
  service: '',
  message: '',
})

const errors = reactive({})
const prepared = ref(null)
const copied = ref('')
const formEl = ref(null)

const validName = () => form.name.trim().length >= 2
const validEmail = () => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())
const validMessage = () => form.message.trim().length >= 20

function validate() {
  for (const key of Object.keys(errors)) delete errors[key]
  if (!validName()) errors.name = 'Please enter your name.'
  if (!validEmail()) errors.email = 'Please enter a valid email address.'
  if (!validMessage()) errors.message = 'Please add a little more detail (at least 20 characters).'
  return Object.keys(errors).length === 0
}

function onSubmit() {
  prepared.value = null
  copied.value = ''

  if (!validate()) {
    nextTick(() => formEl.value?.querySelector('[aria-invalid="true"]')?.focus())
    return
  }

  const details = [
    `Name: ${form.name.trim()}`,
    `Email: ${form.email.trim()}`,
    form.company.trim() ? `Company: ${form.company.trim()}` : '',
    form.phone.trim() ? `Phone: ${form.phone.trim()}` : '',
    form.service ? `Interested in: ${form.service}` : '',
  ].filter(Boolean)

  const subject = `Website enquiry${form.company.trim() ? ` — ${form.company.trim()}` : ''}`
  const body = `${details.join('\n')}\n\n${form.message.trim()}`
  const href = `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`

  prepared.value = { href, body }
}

async function copyDetails() {
  if (!prepared.value) return
  try {
    if (!navigator.clipboard?.writeText) throw new Error('clipboard unavailable')
    await navigator.clipboard.writeText(prepared.value.body)
    copied.value = 'Copied to clipboard.'
  } catch {
    copied.value = 'Copy did not work. Select the text below and copy it manually.'
  }
}

watch(
  form,
  () => {
    if (prepared.value) {
      prepared.value = null
      copied.value = ''
    }
    if (errors.name && validName()) delete errors.name
    if (errors.email && validEmail()) delete errors.email
    if (errors.message && validMessage()) delete errors.message
  },
  { deep: true },
)
</script>

<template>
  <form ref="formEl" class="rounded-2xl border border-navy/10 bg-white p-6 sm:p-8" novalidate @submit.prevent="onSubmit">
    <div class="grid gap-5 sm:grid-cols-2">
      <div>
        <label for="name" class="field-label">Name <span class="text-blue">*</span></label>
        <input
          id="name"
          v-model="form.name"
          type="text"
          autocomplete="name"
          class="field"
          placeholder="Your name"
          :aria-invalid="errors.name ? 'true' : undefined"
          :aria-describedby="errors.name ? 'name-error' : undefined"
        />
        <p v-if="errors.name" id="name-error" data-error class="field-error">{{ errors.name }}</p>
      </div>

      <div>
        <label for="email" class="field-label">Email <span class="text-blue">*</span></label>
        <input
          id="email"
          v-model="form.email"
          type="email"
          autocomplete="email"
          class="field"
          placeholder="you@company.com"
          :aria-invalid="errors.email ? 'true' : undefined"
          :aria-describedby="errors.email ? 'email-error' : undefined"
        />
        <p v-if="errors.email" id="email-error" data-error class="field-error">
          {{ errors.email }}
        </p>
      </div>

      <div>
        <label for="company" class="field-label">Business name (optional)</label>
        <input
          id="company"
          v-model="form.company"
          type="text"
          autocomplete="organization"
          class="field"
          placeholder="How your business is known"
        />
      </div>

      <div>
        <label for="phone" class="field-label">Phone (optional)</label>
        <input
          id="phone"
          v-model="form.phone"
          type="tel"
          autocomplete="tel"
          class="field"
          placeholder="Mobile or landline"
        />
      </div>
    </div>

    <div class="mt-5">
      <label for="service" class="field-label">What would you like help with? (optional)</label>
      <select id="service" v-model="form.service" class="field">
        <option value="">Not sure yet</option>
        <option v-for="service in services" :key="service.slug" :value="service.title">
          {{ service.title }}
        </option>
      </select>
    </div>

    <div class="mt-5">
      <label for="message" class="field-label">What is happening? <span class="text-blue">*</span></label>
      <textarea
        id="message"
        v-model="form.message"
        rows="5"
        class="field"
        placeholder="A sentence or two about the process, who is affected, and what it costs you."
        :aria-invalid="errors.message ? 'true' : undefined"
        :aria-describedby="errors.message ? 'message-error' : 'message-help'"
      />
      <p v-if="!errors.message" id="message-help" class="mt-1.5 text-xs leading-relaxed text-slate-ink">
        No need to prepare a brief. A few plain sentences are enough.
      </p>
      <p v-if="errors.message" id="message-error" data-error class="field-error">
        {{ errors.message }}
      </p>
    </div>

    <div class="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3">
      <BaseButton type="submit" label="Prepare email" size="lg" />
      <p class="max-w-xs text-xs leading-relaxed text-slate-ink">
        This form does not send or store anything. It prepares an email in your mail app so you can
        review it before sending.
      </p>
    </div>

    <p role="status" aria-live="polite" class="mt-3 text-xs font-medium text-navy">{{ copied }}</p>

    <div v-if="prepared" class="mt-3 rounded-xl border border-teal/40 bg-teal/5 p-5">
      <h3 class="text-base">Your email draft is ready.</h3>
      <p class="mt-1 text-sm leading-relaxed text-slate-ink">
        Open it in your mail app, or copy the details if you would rather send them another way.
      </p>
      <div class="mt-4 flex flex-wrap gap-3">
        <a
          data-mailto
          :href="prepared.href"
          class="inline-flex items-center rounded-lg bg-navy px-4 py-2.5 text-sm font-medium text-white hover:bg-navy/90"
        >
          Open email draft
        </a>
        <button
          data-copy
          type="button"
          class="inline-flex items-center rounded-lg border border-navy/20 px-4 py-2.5 text-sm font-medium text-navy hover:border-navy/50"
          @click="copyDetails"
        >
          Copy details
        </button>
      </div>

      <label for="prepared-message" class="mt-4 block text-xs font-semibold text-navy">
        Message preview
      </label>
      <textarea
        id="prepared-message"
        readonly
        rows="6"
        class="mt-1 w-full rounded-lg border border-navy/15 bg-white p-3 text-xs leading-relaxed text-slate-ink"
        :value="prepared.body"
      />
    </div>
  </form>
</template>
