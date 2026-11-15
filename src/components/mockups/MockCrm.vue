<script setup>
import MockFrame from './MockFrame.vue'

const clients = [
  { name: 'Northwind Trading', owner: 'Ana R.', stage: 'Quotation', value: '₱182,000' },
  { name: 'Mabini Hardware', owner: 'Mark S.', stage: 'Won', value: '₱96,500' },
  { name: 'Sea Lane Foods', owner: 'Liza C.', stage: 'Follow-up', value: '₱64,000' },
  { name: 'Rizal Prints', owner: 'Paolo G.', stage: 'Quotation', value: '₱41,200' },
]

const stageClass = (stage) => {
  if (stage === 'Won') return 'bg-teal/15 text-navy'
  if (stage === 'Quotation') return 'bg-blue/10 text-navy'
  return 'bg-navy/5 text-slate-ink'
}
</script>

<template>
  <MockFrame title="Customers — Pipeline">
    <div class="flex items-end justify-between gap-3">
      <div>
        <p class="text-sm font-semibold text-navy">Pipeline</p>
        <p class="text-[0.6875rem] text-slate-ink">This month · 4 active records</p>
      </div>
      <span class="rounded-full bg-teal/15 px-2.5 py-1 text-[0.625rem] font-semibold text-navy">
        ₱383,700 open
      </span>
    </div>

    <div class="mt-3 overflow-x-auto">
      <table class="w-full min-w-[420px] text-left text-xs">
        <caption class="sr-only">
          Sample customer records from a demonstration client management system
        </caption>
        <thead>
          <tr class="text-[0.625rem] uppercase tracking-[0.12em] text-slate-ink">
            <th scope="col" class="pb-2 font-semibold">Client</th>
            <th scope="col" class="pb-2 font-semibold">Owner</th>
            <th scope="col" class="pb-2 font-semibold">Stage</th>
            <th scope="col" class="pb-2 text-right font-semibold">Value</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="client in clients" :key="client.name" class="border-t border-navy/5">
            <td class="py-2.5 font-medium text-navy">{{ client.name }}</td>
            <td class="py-2.5 text-slate-ink">{{ client.owner }}</td>
            <td class="py-2.5">
              <span
                class="inline-flex rounded-full px-2 py-0.5 text-[0.625rem] font-semibold"
                :class="stageClass(client.stage)"
              >
                {{ client.stage }}
              </span>
            </td>
            <td class="py-2.5 text-right tabular-nums text-navy">{{ client.value }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </MockFrame>
</template>
