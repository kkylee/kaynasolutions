<script setup>
import { onMounted } from 'vue'
import MainLayout from '../layouts/MainLayout.vue'
import PageHeader from '../components/common/PageHeader.vue'
import { site } from '../data/site'
import { useReveal } from '../lib/composables/useReveal'

const lastUpdated = '21 November 2026'

const sections = [
  {
    title: 'Who we are',
    body: [
      `${site.name} is an information technology solutions provider based in the ${site.location}. This privacy policy explains how we collect, use, and protect personal information when you visit our website or contact us about our services.`,
      `Questions about this policy can be sent to ${site.email}.`,
    ],
  },
  {
    title: 'Information we collect',
    body: [
      'We collect information you choose to give us: your name, business email address, company name, contact number, the service you are interested in, an estimated budget, and a description of the process you want to improve.',
      'We do not run analytics, advertising, or tracking scripts on this website, and we do not set tracking cookies. Our hosting provider may keep standard server logs (such as IP address and browser type) for security and reliability; those logs are not used to identify individual visitors.',
    ],
  },
  {
    title: 'How we use your information',
    body: [
      'We use the information you send us only to reply to your enquiry, understand your requirements, and decide whether we can help.',
      'We do not sell, rent, or share your personal information with third parties for marketing. We do not add you to any mailing list without your consent.',
    ],
  },
  {
    title: 'How your enquiry is handled',
    body: [
      'The contact form on this website does not store your message or send it automatically. It opens your email application with a prepared message addressed to us. Nothing is saved on the website itself.',
      'If you choose to email or call us, your message is handled through our normal business email and phone systems and is kept only for as long as needed to respond and to maintain a reasonable record of the conversation.',
    ],
  },
  {
    title: 'Cookies',
    body: [
      'This website does not use cookies for tracking or personalisation. Only essential technical cookies set by our hosting provider may be used to keep the site working. You can disable cookies in your browser without affecting your ability to read the site.',
    ],
  },
  {
    title: 'Third parties and links',
    body: [
      'We use a hosting provider to deliver this website and an email provider to handle enquiries. These providers may process technical information on our behalf under their own privacy terms.',
      'Our pages may link to external websites, including our social media profiles. We are not responsible for the privacy practices of those sites.',
    ],
  },
  {
    title: 'Your rights',
    body: [
      'Under the Data Privacy Act of 2012 (Republic Act No. 10173) of the Philippines, you have the right to be informed, to access your personal information, to correct or update it, to request its deletion or blocking, to object to its processing, and to file a complaint with the National Privacy Commission.',
      'To exercise any of these rights, contact us at the email address above. We will respond within a reasonable time.',
    ],
  },
  {
    title: 'Children',
    body: [
      'This website is not directed at children, and we do not knowingly collect personal information from anyone under 18 years of age.',
    ],
  },
  {
    title: 'Changes to this policy',
    body: [
      'We may update this policy from time to time. The date at the top of this page shows when it was last revised. Continued use of the website after a change means you accept the updated policy.',
    ],
  },
  {
    title: 'Contact',
    body: [
      `For any privacy question or request, email ${site.email} or call ${site.phone} / ${site.mobile}.`,
    ],
  },
]

onMounted(() => {
  useReveal().revealAll()
})
</script>

<template>
  <MainLayout>
    <PageHeader
      eyebrow="Privacy"
      title="Privacy Policy"
      lead="How we collect, use, and protect information from visitors and people who enquire about our services."
    />

    <section class="py-16 lg:py-24" data-reveal>
      <div class="container-page max-w-3xl">
        <p class="text-xs font-semibold uppercase tracking-[0.16em] text-body">
          Last updated: {{ lastUpdated }}
        </p>

        <div class="mt-10 space-y-10">
          <section
            v-for="section in sections"
            :key="section.title"
            class="border-t border-line pt-8"
          >
            <h2 class="text-xl leading-snug">{{ section.title }}</h2>
            <div class="mt-3 space-y-3 text-base leading-relaxed text-body">
              <p v-for="(paragraph, index) in section.body" :key="index">
                {{ paragraph }}
              </p>
            </div>
          </section>
        </div>
      </div>
    </section>
  </MainLayout>
</template>