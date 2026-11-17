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
        <p class="text-sm font-semibold text-ink">Connections</p>
        <p class="text-[0.6875rem] text-body">4 systems · one owner per record</p>
      </div>
      <span class="rounded-full bg-signal/15 px-2.5 py-1 text-[0.625rem] font-semibold text-ink">
        Healthy
      </span>
    </div>

    <ul class="mt-4 space-y-2">
      <li
        v-for="system in systems"
        :key="system.name"
        class="flex items-center gap-3 rounded-lg border border-line bg-surface px-3 py-2.5"
      >
        <span
          class="h-2 w-2 flex-none rounded-full"
          :class="system.state === 'Synced' ? 'bg-signal' : 'bg-action'"
        />
        <div class="min-w-0 flex-1">
          <p class="text-xs font-semibold text-ink">{{ system.name }}</p>
          <p class="truncate text-[0.625rem] text-body">{{ system.role }}</p>
        </div>
        <div class="text-right">
          <p
            class="text-[0.625rem] font-semibold"
            :class="system.state === 'Synced' ? 'text-body' : 'text-link'"
          >
            {{ system.state }}
          </p>
          <p class="text-[0.625rem] tabular-nums text-body">{{ system.when }}</p>
        </div>
      </li>
    </ul>
  </MockFrame>
</template>
