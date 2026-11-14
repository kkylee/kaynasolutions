import MockHr from './MockHr.vue'
import MockInventory from './MockInventory.vue'
import MockAnalytics from './MockAnalytics.vue'
import MockApprovals from './MockApprovals.vue'
import MockCrm from './MockCrm.vue'
import MockSync from './MockSync.vue'

const registry = {
  hr: MockHr,
  inventory: MockInventory,
  analytics: MockAnalytics,
  approvals: MockApprovals,
  crm: MockCrm,
  sync: MockSync,
}

export function mockFor(kind) {
  return registry[kind] ?? null
}
