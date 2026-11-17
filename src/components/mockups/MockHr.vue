<script setup>
import MockFrame from './MockFrame.vue'

const rows = [
  { name: 'Ana Reyes', role: 'Sales associate', clockIn: '07:58', clockOut: '17:02', status: 'Present', dot: 'bg-signal' },
  { name: 'Mark Santos', role: 'Warehouse', clockIn: '07:55', clockOut: '17:05', status: 'Present', dot: 'bg-signal' },
  { name: 'Liza Cruz', role: 'Cashier', clockIn: '08:24', clockOut: '17:00', status: 'Late', dot: 'bg-action' },
  { name: 'Paolo Garcia', role: 'Driver', clockIn: '06:55', clockOut: '16:40', status: 'Present', dot: 'bg-signal' },
  { name: 'Grace Lim', role: 'Admin', clockIn: '—', clockOut: '—', status: 'On leave', dot: 'bg-body/40' },
]
</script>

<template>
  <MockFrame title="People — Attendance">
    <div class="flex items-end justify-between gap-3">
      <div>
        <p class="text-sm font-semibold text-ink">Attendance</p>
        <p class="text-[0.6875rem] text-body">Today · cutoff 08:00</p>
      </div>
      <span class="rounded-full bg-signal/15 px-2.5 py-1 text-[0.625rem] font-semibold text-ink">
        18 present
      </span>
    </div>

    <div class="mt-3 overflow-x-auto">
      <table class="w-full min-w-[420px] text-left text-xs">
        <caption class="sr-only">
          Sample attendance records from a demonstration employee management system
        </caption>
        <thead>
          <tr class="text-[0.625rem] uppercase tracking-[0.12em] text-body">
            <th scope="col" class="pb-2 font-semibold">Employee</th>
            <th scope="col" class="pb-2 font-semibold">In</th>
            <th scope="col" class="pb-2 font-semibold">Out</th>
            <th scope="col" class="pb-2 text-right font-semibold">Status</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="row in rows" :key="row.name" class="border-t border-line/70">
            <td class="py-2">
              <span class="font-medium text-ink">{{ row.name }}</span>
              <span class="block text-[0.625rem] text-body">{{ row.role }}</span>
            </td>
            <td class="py-2 tabular-nums text-body">{{ row.clockIn }}</td>
            <td class="py-2 tabular-nums text-body">{{ row.clockOut }}</td>
            <td class="py-2 text-right">
              <span class="inline-flex items-center gap-1.5 text-[0.625rem] font-semibold text-body">
                <span :class="['h-1.5 w-1.5 rounded-full', row.dot]" />
                {{ row.status }}
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </MockFrame>
</template>
