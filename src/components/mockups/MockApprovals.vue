<script setup>
import MockFrame from './MockFrame.vue'

const steps = [
  {
    title: 'Requested',
    who: 'Mark Santos · Warehouse',
    time: '09:12',
    state: 'done',
    note: 'Purchase request PR-1042 · ₱48,200',
  },
  {
    title: 'Manager approved',
    who: 'Ana Reyes · Operations',
    time: '09:40',
    state: 'done',
    note: 'Within department budget',
  },
  {
    title: 'Finance review',
    who: 'Waiting on Grace Lim',
    time: 'due today',
    state: 'pending',
    note: 'Release payment terms',
  },
]
</script>

<template>
  <MockFrame title="Workflow — Purchase request #1042">
    <div class="flex items-end justify-between gap-3">
      <div>
        <p class="text-sm font-semibold text-navy">Purchase request #1042</p>
        <p class="text-[0.6875rem] text-slate-ink">Supplier onboarding · 3 steps</p>
      </div>
      <span class="rounded-full bg-blue/10 px-2.5 py-1 text-[0.625rem] font-semibold text-blue">
        In review
      </span>
    </div>

    <ol class="mt-4 space-y-0">
      <li
        v-for="(step, index) in steps"
        :key="step.title"
        class="relative flex gap-3 pb-3.5 last:pb-0"
      >
        <div class="flex flex-col items-center">
          <span
            :class="[
              'mt-0.5 flex h-4 w-4 items-center justify-center rounded-full border-2',
              step.state === 'done' ? 'border-teal bg-teal' : 'border-blue bg-white',
            ]"
          >
            <span v-if="step.state === 'done'" class="h-1.5 w-1.5 rounded-full bg-white" />
          </span>
          <span v-if="index < steps.length - 1" class="mt-1 w-px flex-1 bg-navy/10" />
        </div>
        <div class="flex-1">
          <div class="flex flex-wrap items-baseline justify-between gap-x-3">
            <p class="text-xs font-semibold text-navy">{{ step.title }}</p>
            <p class="text-[0.625rem] tabular-nums text-slate-ink">{{ step.time }}</p>
          </div>
          <p class="text-[0.625rem] text-slate-ink">{{ step.who }}</p>
          <p class="mt-0.5 text-[0.625rem] text-slate-ink/80">{{ step.note }}</p>
        </div>
      </li>
    </ol>
  </MockFrame>
</template>
