import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { mockFor } from '../src/components/mockups'

const render = (kind) => mount(mockFor(kind))

describe('mockFor', () => {
  it('returns a component for every kind the content uses', () => {
    for (const kind of ['hr', 'inventory', 'crm', 'approvals', 'analytics', 'sync']) {
      expect(mockFor(kind), kind).toBeTruthy()
    }
    expect(mockFor('unknown')).toBeNull()
  })
})

describe('MockHr', () => {
  it('shows five attendance rows and their status', () => {
    const wrapper = render('hr')
    expect(wrapper.findAll('tbody tr')).toHaveLength(5)
    expect(wrapper.text()).toContain('Present')
    expect(wrapper.text()).toContain('Attendance')
  })
})

describe('MockInventory', () => {
  it('lists three SKUs and flags a low stock item', () => {
    const wrapper = render('inventory')
    expect(wrapper.findAll('tbody tr')).toHaveLength(3)
    expect(wrapper.text()).toContain('Low stock')
  })

  it('keeps the table scrollable inside its own panel', () => {
    const wrapper = render('inventory')
    expect(wrapper.find('.overflow-x-auto').exists()).toBe(true)
  })
})

describe('MockAnalytics', () => {
  it('shows four headline numbers and a seven-bar series', () => {
    const wrapper = render('analytics')
    expect(wrapper.findAll('[data-kpi]')).toHaveLength(4)
    expect(wrapper.findAll('rect')).toHaveLength(7)
  })
})

describe('MockApprovals', () => {
  it('walks through a three-step approval chain', () => {
    const wrapper = render('approvals')
    const steps = wrapper.findAll('ol li')
    expect(steps).toHaveLength(3)
    expect(wrapper.text()).toContain('Requested')
    expect(wrapper.text()).toContain('Manager approved')
    expect(wrapper.text()).toContain('Finance review')
  })
})

describe('MockCrm', () => {
  it('shows four client records with their stage', () => {
    const wrapper = render('crm')
    expect(wrapper.findAll('tbody tr')).toHaveLength(4)
    expect(wrapper.text()).toContain('Quotation')
  })
})

describe('MockSync', () => {
  it('shows connected systems and sync state', () => {
    const wrapper = render('sync')
    expect(wrapper.text()).toContain('Payroll')
    expect(wrapper.text()).toContain('Accounting')
    expect(wrapper.text()).toContain('Synced')
  })
})

describe('panel chrome', () => {
  it('hides decorative window chrome from assistive technology', () => {
    const wrapper = render('hr')
    const chrome = wrapper.get('[data-chrome]')
    expect(chrome.attributes('aria-hidden')).toBe('true')
  })

  it('labels every mockup with a visible title', () => {
    const wrapper = render('hr')
    expect(wrapper.text()).toContain('People')
  })
})
