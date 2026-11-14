<script setup>
import MockFrame from './MockFrame.vue'

const systems = [
  { name: 'Payroll', role: 'owner: employee hours', state: 'Synced', when: '2 min ago' },
  { name: 'Accounting', role: 'owner: invoices', state: 'Synced', when: '2 min ago' },
  { name: 'Inventory', role: 'receives: sales', state: 'Synced', when: '6 min ago' },
  { name: 'CRM', role: 'receives: customer records', state: 'Queued', when: '1 record' },
]
</script>

<template>
  <MockFrame title="Systems — Connections">
    <div class="flex items-end justify-between gap-3">
      <div>
        <p class="text-sm font-semibold text-navy">Connections</p>
        <p class="text-[0.6875rem] text-slate-ink">4 systems · one owner per record</p>
      </div>
      <span class="rounded-full bg-teal/15 px-2.5 py-1 text-[0.625rem] font-semibold text-navy">
        Healthy
      </span>
    </div>

    <ul class="mt-4 space-y-2">
      <li
        v-for="system in systems"
        :key="system.name"
        class="flex items-center gap-3 rounded-lg border border-navy/10 bg-white px-3 py-2.5"
      >
        <span
          class="h-2 w-2 flex-none rounded-full"
          :class="system.state === 'Synced' ? 'bg-teal' : 'bg-blue'"
        />
        <div class="min-w-0 flex-1">
          <p class="text-xs font-semibold text-navy">{{ system.name }}</p>
          <p class="truncate text-[0.625rem] text-slate-ink">{{ system.role }}</p>
        </div>
        <div class="text-right">
          <p
            class="text-[0.625rem] font-semibold"
            :class="system.state === 'Synced' ? 'text-slate-ink' : 'text-blue'"
          >
            {{ system.state }}
          </p>
          <p class="text-[0.625rem] tabular-nums text-slate-ink/80">{{ system.when }}</p>
        </div>
      </li>
    </ul>
  </MockFrame>
</template>
