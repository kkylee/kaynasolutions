<script setup>
import { nextTick, reactive, ref, watch } from 'vue'
import BaseButton from '../common/BaseButton.vue'
import { services } from '../../data/services'
import { site } from '../../data/site'

const endpoint = import.meta.env.VITE_CONTACT_ENDPOINT || '/api/contact'

const form = reactive({
  name: '',
  email: '',
  company: '',
  phone: '',
  service: '',
  message: '',
  website: '',
})

const errors = reactive({})
const status = ref('idle')
const errorMessage = ref('')
const sentTo = ref('')
const fallback = ref(null)
const formEl = ref(null)

const isSubmitting = () => status.value === 'submitting'

const validName = () => {
  const value = form.name.trim()
  return value.length >= 2 && value.length <= 120
}
const validEmail = () => {
  const value = form.email.trim()
  return value.length <= 254 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}
const validMessage = () => {
  const value = form.message.trim()
  return value.length >= 20 && value.length <= 5000
}

function validate() {
  for (const key of Object.keys(errors)) delete errors[key]
  if (!validName()) errors.name = 'Please enter your name.'
  if (!validEmail()) errors.email = 'Please enter a valid email address.'
  if (!validMessage()) errors.message = 'Please add a little more detail (at least 20 characters).'
  return Object.keys(errors).length === 0
}

function buildBody() {
  const details = [
    `Name: ${form.name.trim()}`,
    `Email: ${form.email.trim()}`,
    form.company.trim() ? `Business: ${form.company.trim()}` : '',
    form.phone.trim() ? `Phone: ${form.phone.trim()}` : '',
    form.service ? `Interested in: ${form.service}` : '',
  ].filter(Boolean)

  return `${details.join('\n')}\n\n${form.message.trim()}`
}

function mailtoHref() {
  const subject = `Website enquiry${form.company.trim() ? ` — ${form.company.trim()}` : ''}`
  return `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(buildBody())}`
}

function resetFields() {
  form.name = ''
  form.email = ''
  form.company = ''
  form.phone = ''
  form.service = ''
  form.message = ''
  form.website = ''
  for (const key of Object.keys(errors)) delete errors[key]
}

function sendAnother() {
  resetFields()
  status.value = 'idle'
  errorMessage.value = ''
  sentTo.value = ''
  fallback.value = null
}

async function onSubmit() {
  if (isSubmitting()) return

  errorMessage.value = ''
  fallback.value = null

  if (!validate()) {
    status.value = 'idle'
    nextTick(() => formEl.value?.querySelector('[aria-invalid="true"]')?.focus())
    return
  }

  status.value = 'submitting'

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: form.name.trim(),
        email: form.email.trim(),
        company: form.company.trim(),
        phone: form.phone.trim(),
        service: form.service,
        message: form.message.trim(),
        website: form.website,
      }),
    })

    let data = null
    try {
      data = await response.json()
    } catch {
      data = null
    }

    if (!response.ok || !data?.ok) {
      if (data?.fields && typeof data.fields === 'object') {
        for (const [key, message] of Object.entries(data.fields)) {
          if (typeof message === 'string') errors[key] = message
        }
      }
      throw new Error(data?.error || 'We could not send your message right now.')
    }

    sentTo.value = form.email.trim()
    status.value = 'success'
  } catch (error) {
    status.value = 'error'
    errorMessage.value =
      error instanceof TypeError
        ? 'We could not reach the form service. Please email us directly.'
        : error.message
    fallback.value = { href: mailtoHref(), body: buildBody() }
    nextTick(() => formEl.value?.querySelector('[role="alert"]')?.focus())
  }
}

watch(
  form,
  () => {
    if (status.value === 'error') {
      status.value = 'idle'
      errorMessage.value = ''
      fallback.value = null
    }
    if (errors.name && validName()) delete errors.name
    if (errors.email && validEmail()) delete errors.email
    if (errors.message && validMessage()) delete errors.message
  },
  { deep: true },
)
</script>

<template>
  <div>
    <div
      v-if="status === 'success'"
      data-success
      class="rounded-2xl border border-teal/40 bg-teal/5 p-6 sm:p-8"
    >
      <p class="eyebrow">Message sent</p>
      <h3 class="mt-2 text-2xl">Thanks — your message is on its way.</h3>
      <p class="mt-3 max-w-xl text-sm leading-relaxed text-slate-ink">
        We’ll reply to <span class="font-medium text-navy">{{ sentTo }}</span> as soon as we can.
        If you need to add anything, reply to the email you receive from us.
      </p>
      <BaseButton
        class="mt-6"
        type="button"
        variant="secondary"
        label="Send another message"
        data-send-another
        @click="sendAnother"
      />
    </div>

    <form
      v-else
      ref="formEl"
      class="rounded-2xl border border-navy/10 bg-white p-6 sm:p-8"
      novalidate
      :aria-busy="isSubmitting() ? 'true' : undefined"
      @submit.prevent="onSubmit"
    >
      <fieldset :disabled="isSubmitting()" class="min-w-0 border-0 p-0">
        <div class="grid gap-5 sm:grid-cols-2">
          <div>
            <label for="name" class="field-label">Name <span class="text-blue">*</span></label>
            <input
              id="name"
              v-model="form.name"
              type="text"
              autocomplete="name"
              maxlength="120"
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
              maxlength="254"
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
              maxlength="160"
              class="field"
              placeholder="How your business is known"
              :aria-invalid="errors.company ? 'true' : undefined"
              :aria-describedby="errors.company ? 'company-error' : undefined"
            />
            <p v-if="errors.company" id="company-error" data-error class="field-error">
              {{ errors.company }}
            </p>
          </div>

          <div>
            <label for="phone" class="field-label">Phone (optional)</label>
            <input
              id="phone"
              v-model="form.phone"
              type="tel"
              autocomplete="tel"
              maxlength="60"
              class="field"
              placeholder="Mobile or landline"
              :aria-invalid="errors.phone ? 'true' : undefined"
              :aria-describedby="errors.phone ? 'phone-error' : undefined"
            />
            <p v-if="errors.phone" id="phone-error" data-error class="field-error">
              {{ errors.phone }}
            </p>
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
          <label for="message" class="field-label">
            What is happening? <span class="text-blue">*</span>
          </label>
          <textarea
            id="message"
            v-model="form.message"
            rows="5"
            maxlength="5000"
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

        <div class="absolute -left-[10000px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
          <label for="website">Leave this field blank</label>
          <input
            id="website"
            v-model="form.website"
            type="text"
            tabindex="-1"
            autocomplete="off"
            name="website"
          />
        </div>

        <div v-if="errorMessage" role="alert" tabindex="-1" class="mt-5 rounded-xl border border-red-200 bg-red-50 p-4">
          <p class="text-sm font-semibold text-red-900">Message not sent.</p>
          <p class="mt-1 text-sm leading-relaxed text-red-800">{{ errorMessage }}</p>
          <a
            v-if="fallback"
            data-mailto
            :href="fallback.href"
            class="mt-3 inline-flex items-center text-sm font-medium text-navy underline decoration-navy/40 underline-offset-4 hover:decoration-navy"
          >
            Email us directly
          </a>
        </div>

        <div class="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3">
          <BaseButton
            type="submit"
            :label="isSubmitting() ? 'Sending…' : 'Send message'"
            size="lg"
            :disabled="isSubmitting()"
            :aria-busy="isSubmitting() ? 'true' : undefined"
          />
          <p class="max-w-xs text-xs leading-relaxed text-slate-ink">
            We use your details only to reply to this enquiry. Nothing is stored on this website.
          </p>
        </div>
      </fieldset>
    </form>
  </div>
</template>
