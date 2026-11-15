import { afterEach, describe, expect, it, vi } from 'vitest'
import { flushPromises, mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import ContactForm from '../src/components/sections/ContactForm.vue'
import { site } from '../src/data/site'

async function submit(wrapper) {
  await wrapper.get('form').trigger('submit')
  await nextTick()
}

async function fillValid(wrapper) {
  await wrapper.get('#name').setValue('Ada Santos')
  await wrapper.get('#email').setValue('ada@example.com')
  await wrapper.get('#company').setValue('Santos Trading')
  await wrapper.get('#message').setValue('We reconcile stock in three spreadsheets every Friday and it takes two people half a day.')
}

afterEach(() => {
  vi.restoreAllMocks()
})

describe('ContactForm', () => {
  it('renders labelled fields and a clear submit action', () => {
    const wrapper = mount(ContactForm)
    for (const id of ['name', 'email', 'company', 'phone', 'message']) {
      expect(wrapper.find(`label[for="${id}"]`).exists()).toBe(true)
      expect(wrapper.find(`#${id}`).exists()).toBe(true)
    }
    expect(wrapper.get('button[type="submit"]').text()).toContain('Prepare email')
  })

  it('tells people plainly what the form does and does not do', () => {
    const wrapper = mount(ContactForm)
    expect(wrapper.text()).toMatch(/does not send or store/i)
    expect(wrapper.text()).toMatch(/review it before sending/i)
  })

  it('blocks an empty submission and explains what is missing', async () => {
    const wrapper = mount(ContactForm)
    await submit(wrapper)
    const errors = wrapper.findAll('[data-error]')
    expect(errors).toHaveLength(3)
    expect(wrapper.text()).toContain('Please enter your name.')
    expect(wrapper.text()).toContain('Please enter a valid email address.')
    expect(wrapper.text()).toContain('Please add a little more detail')
    expect(wrapper.get('#name').attributes('aria-invalid')).toBe('true')
    expect(wrapper.find('[data-mailto]').exists()).toBe(false)
  })

  it('rejects an email address without a domain', async () => {
    const wrapper = mount(ContactForm)
    await wrapper.get('#name').setValue('Ada Santos')
    await wrapper.get('#email').setValue('ada@example')
    await wrapper.get('#message').setValue('We need help with stock reconciliation every Friday afternoon.')
    await submit(wrapper)
    expect(wrapper.text()).toContain('Please enter a valid email address.')
    expect(wrapper.find('[data-mailto]').exists()).toBe(false)
  })

  it('prepares a mailto handoff containing the entered details', async () => {
    const wrapper = mount(ContactForm)
    await fillValid(wrapper)
    await submit(wrapper)

    const link = wrapper.get('[data-mailto]')
    const href = link.attributes('href')
    expect(href.startsWith(`mailto:${site.email}`)).toBe(true)

    const decoded = decodeURIComponent(href)
    expect(decoded).toContain('Ada Santos')
    expect(decoded).toContain('ada@example.com')
    expect(decoded).toContain('Santos Trading')
    expect(decoded).toContain('three spreadsheets every Friday')
    expect(decoded).toContain('Santos Trading')
  })

  it('copies the prepared message to the clipboard and confirms it', async () => {
    const writeText = vi.fn().mockResolvedValue(undefined)
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText },
      configurable: true,
    })

    const wrapper = mount(ContactForm)
    await fillValid(wrapper)
    await submit(wrapper)
    await wrapper.get('[data-copy]').trigger('click')
    await flushPromises()

    expect(writeText).toHaveBeenCalledTimes(1)
    expect(writeText.mock.calls[0][0]).toContain('three spreadsheets every Friday')
    expect(wrapper.get('[role="status"]').text()).toContain('Copied')
  })

  it('falls back to manual copying when the clipboard is unavailable', async () => {
    Object.defineProperty(navigator, 'clipboard', { value: undefined, configurable: true })

    const wrapper = mount(ContactForm)
    await fillValid(wrapper)
    await submit(wrapper)
    await wrapper.get('[data-copy]').trigger('click')
    await flushPromises()

    expect(wrapper.get('[role="status"]').text()).toMatch(/select the text/i)
    expect(wrapper.get('#prepared-message').attributes('readonly')).toBeDefined()
    expect(wrapper.get('#prepared-message').element.value).toContain('three spreadsheets')
  })

  it('clears the prepared draft when the form is edited again', async () => {
    const wrapper = mount(ContactForm)
    await fillValid(wrapper)
    await submit(wrapper)
    expect(wrapper.find('[data-mailto]').exists()).toBe(true)
    await wrapper.get('#name').setValue('Ada S.')
    expect(wrapper.find('[data-mailto]').exists()).toBe(false)
  })
})
