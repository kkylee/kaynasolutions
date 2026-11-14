<script setup>
import MockFrame from './MockFrame.vue'

const items = [
  { sku: 'SKU-1041', name: 'Coffee beans 1kg', onHand: 24, target: 30, reorder: 10 },
  { sku: 'SKU-2087', name: 'Paper cups 12oz', onHand: 8, target: 40, reorder: 12 },
  { sku: 'SKU-3312', name: 'Oat milk 1L', onHand: 3, target: 24, reorder: 6 },
]

const low = (item) => item.onHand <= item.reorder
const fill = (item) => `${Math.min(100, Math.round((item.onHand / item.target) * 100))}%`
</script>

<template>
  <MockFrame title="Inventory — Stock on hand">
    <div class="flex items-end justify-between gap-3">
      <div>
        <p class="text-sm font-semibold text-navy">Stock on hand</p>
        <p class="text-[0.6875rem] text-slate-ink">Main branch · updated 5 min ago</p>
      </div>
      <span class="rounded-full bg-navy/5 px-2.5 py-1 text-[0.625rem] font-semibold text-navy">
        3 of 412 items
      </span>
    </div>

    <div class="mt-3 overflow-x-auto">
      <table class="w-full min-w-[440px] text-left text-xs">
        <caption class="sr-only">
          Sample stock records from a demonstration inventory management system
        </caption>
        <thead>
          <tr class="text-[0.625rem] uppercase tracking-[0.12em] text-slate-ink">
            <th scope="col" class="pb-2 font-semibold">Item</th>
            <th scope="col" class="pb-2 font-semibold">On hand</th>
            <th scope="col" class="pb-2 font-semibold">Reorder</th>
            <th scope="col" class="pb-2 text-right font-semibold">Status</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in items" :key="item.sku" class="border-t border-navy/5">
            <td class="py-2.5">
              <span class="font-medium text-navy">{{ item.name }}</span>
              <span class="block text-[0.625rem] tabular-nums text-slate-ink">{{ item.sku }}</span>
            </td>
            <td class="py-2.5">
              <span class="block tabular-nums text-navy">{{ item.onHand }}</span>
              <span class="mt-1 block h-1 w-16 overflow-hidden rounded-full bg-navy/10">
                <span
                  class="block h-1 rounded-full"
                  :class="low(item) ? 'bg-blue' : 'bg-teal'"
                  :style="{ width: fill(item) }"
                />
              </span>
            </td>
            <td class="py-2.5 tabular-nums text-slate-ink">{{ item.reorder }}</td>
            <td class="py-2.5 text-right">
              <span
                class="inline-flex items-center gap-1.5 text-[0.625rem] font-semibold"
                :class="low(item) ? 'text-blue' : 'text-slate-ink'"
              >
                <span :class="['h-1.5 w-1.5 rounded-full', low(item) ? 'bg-blue' : 'bg-teal']" />
                {{ low(item) ? 'Low stock' : 'In stock' }}
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </MockFrame>
</template>
