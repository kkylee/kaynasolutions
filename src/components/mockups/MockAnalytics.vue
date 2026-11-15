<script setup>
import MockFrame from './MockFrame.vue'

const kpis = [
  { label: 'Revenue', value: '₱1.24M', change: '+6.2%', trend: 'up' },
  { label: 'Orders', value: '1,842', change: '+3.1%', trend: 'up' },
  { label: 'Avg. basket', value: '₱673', change: '−1.4%', trend: 'down' },
  { label: 'Stock cover', value: '18 days', change: 'on plan', trend: 'flat' },
]

const bars = [
  { day: 'M', height: 34 },
  { day: 'T', height: 46 },
  { day: 'W', height: 39 },
  { day: 'T', height: 58 },
  { day: 'F', height: 66 },
  { day: 'S', height: 52 },
  { day: 'S', height: 28 },
]
</script>

<template>
  <MockFrame title="Reports — Daily overview">
    <div class="flex items-end justify-between gap-3">
      <div>
        <p class="text-sm font-semibold text-navy">Daily overview</p>
        <p class="text-[0.6875rem] text-slate-ink">All branches · compared with last week</p>
      </div>
      <span class="rounded-full bg-teal/15 px-2.5 py-1 text-[0.625rem] font-semibold text-navy">
        Updated 06:00
      </span>
    </div>

    <dl class="mt-4 grid grid-cols-2 gap-2.5">
      <div v-for="kpi in kpis" :key="kpi.label" data-kpi class="rounded-lg border border-navy/10 bg-white px-3 py-2.5">
        <dt class="text-[0.625rem] font-semibold uppercase tracking-[0.12em] text-slate-ink">
          {{ kpi.label }}
        </dt>
        <dd class="mt-1 flex items-baseline gap-2">
          <span class="text-base font-semibold tabular-nums text-navy">{{ kpi.value }}</span>
          <span
            class="text-[0.625rem] font-semibold tabular-nums"
            :class="kpi.trend === 'up' ? 'text-teal-700' : kpi.trend === 'down' ? 'text-blue' : 'text-slate-ink'"
          >
            {{ kpi.change }}
          </span>
        </dd>
      </div>
    </dl>

    <div class="mt-4 rounded-lg border border-navy/10 bg-white px-3 pb-2 pt-3">
      <p class="text-[0.625rem] font-semibold uppercase tracking-[0.12em] text-slate-ink">Sales by day</p>
      <svg viewBox="0 0 280 80" class="mt-2 h-24 w-full" role="img" aria-label="Sample weekly sales bar chart">
        <g>
          <rect
            v-for="(bar, index) in bars"
            :key="index"
            :x="8 + index * 38"
            :y="72 - bar.height"
            width="26"
            :height="bar.height"
            rx="3"
            :class="index === 4 ? 'fill-blue' : 'fill-navy/15'"
          />
          <text
            v-for="(bar, index) in bars"
            :key="`label-${index}`"
            :x="21 + index * 38"
            y="80"
            text-anchor="middle"
            class="fill-slate-ink text-[8px]"
          >
            {{ bar.day }}
          </text>
        </g>
      </svg>
    </div>
  </MockFrame>
</template>
