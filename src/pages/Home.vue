<script setup>
import { onMounted } from 'vue'
import MainLayout from '../layouts/MainLayout.vue'
import HeroSection from '../components/sections/HeroSection.vue'
import ChallengesSection from '../components/sections/ChallengesSection.vue'
import ServicesOverview from '../components/sections/ServicesOverview.vue'
import WhySection from '../components/sections/WhySection.vue'
import SolutionsOverview from '../components/sections/SolutionsOverview.vue'
import ProcessSection from '../components/sections/ProcessSection.vue'
import CtaSection from '../components/common/CtaSection.vue'
import { useReveal } from '../lib/composables/useReveal'

onMounted(() => {
  useReveal().revealAll()
})
</script>

<template>
  <MainLayout>
    <HeroSection />
    <ChallengesSection />
    <ServicesOverview />
    <WhySection />
    <SolutionsOverview />
    <ProcessSection />
    <CtaSection
      title="Let’s make running your business easier."
      text="Tell us which process is slowing you down. We will reply with a practical next step, not a sales pitch."
      href="/contact/"
      label="Start a Conversation"
      secondary-href="/solutions/"
      secondary-label="See the solutions"
    />
  </MainLayout>
</template>
