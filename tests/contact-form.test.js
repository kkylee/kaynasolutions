import { afterEach, describe, expect, it, vi } from 'vitest'
import { flushPromises, mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import ContactForm from '../src/components/sections/ContactForm.vue'
import { site } from '../src/data/site'

async function submit(wrapper) {
  await wrapper.get('form').trigger('submit')
  await flushPromises()
}

async function fillValid(wrapper) {
  await wrapper.get('#name').setValue('Ada Santos')
  await wrapper.get('#email').setValue('ada@example.com')
  await wrapper.get('#company').setValue('Santos Trading')
  await wrapper.get('#message').setValue('We reconcile stock in three spreadsheets every Friday and it takes two people half a day.')
}

function jsonResponse(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json' },
  })
}

function mockFetch(response = jsonResponse({ id: 'email_123' })) {
  const fetchMock = vi.fn().mockResolvedValue(response)
  vi.stubGlobal('fetch', fetchMock)
  return fetchMock
}

afterEach(() => {
  vi.unstubAllGlobals()
})

describe('ContactForm', () => {
  it('renders labelled fields and a clear submit action', () => {
    const wrapper = mount(ContactForm)
    for (const id of ['name', 'email', 'company', 'phone', 'message']) {
      expect(wrapper.find(`label[for="${id}"]`).exists()).toBe(true)
      expect(wrapper.find(`#${id}`).exists()).toBe(true)
    }
    expect(wrapper.get('button[type="submit"]').text()).toContain('Send message')
  })

  it('tells people what happens to their details', () => {
    const wrapper = mount(ContactForm)
    expect(wrapper.text()).toMatch(/use your details only to reply/i)
    expect(wrapper.text()).not.toMatch(/does not send/i)
  })

  it('blocks an empty submission and explains what is missing', async () => {
    const fetchMock = mockFetch()
    const wrapper = mount(ContactForm)
    await submit(wrapper)
    const errors = wrapper.findAll('[data-error]')
    expect(errors).toHaveLength(3)
    expect(wrapper.text()).toContain('Please enter your name.')
    expect(wrapper.text()).toContain('Please enter a valid email address.')
    expect(wrapper.text()).toContain('Please add a little more detail')
    expect(wrapper.get('#name').attributes('aria-invalid')).toBe('true')
    expect(fetchMock).not.toHaveBeenCalled()
  })

  it('rejects an email address without a domain', async () => {
    const fetchMock = mockFetch()
    const wrapper = mount(ContactForm)
    await wrapper.get('#name').setValue('Ada Santos')
    await wrapper.get('#email').setValue('ada@example')
    await wrapper.get('#message').setValue('We need help with stock reconciliation every Friday afternoon.')
    await submit(wrapper)
    expect(wrapper.text()).toContain('Please enter a valid email address.')
    expect(fetchMock).not.toHaveBeenCalled()
  })

  it('posts the enquiry and shows a success state', async () => {
    const fetchMock = mockFetch()
    const wrapper = mount(ContactForm)
    await fillValid(wrapper)
    await submit(wrapper)

    expect(fetchMock).toHaveBeenCalledTimes(1)
    const [url, init] = fetchMock.mock.calls[0]
    expect(url).toBe('/api/send')
    expect(init.method).toBe('POST')
    const payload = JSON.parse(init.body)
    expect(payload).toMatchObject({
      to: site.email,
      reply_to: 'ada@example.com',
      subject: 'Website enquiry — Ada Santos (Santos Trading)',
    })
    expect(payload.text).toContain('three spreadsheets every Friday')
    expect(payload.text).toContain('Santos Trading')
    expect(payload.html).toContain('Ada Santos')
    expect(payload.html).toContain('Santos Trading')
    expect(payload.html).not.toContain('undefined')
    expect(wrapper.text()).toContain('Message sent')
    expect(wrapper.text()).toContain('ada@example.com')
    expect(wrapper.find('form').exists()).toBe(false)
  })

  it('disables the button while the enquiry is sending', async () => {
    let resolveFetch
    const pending = new Promise((resolve) => {
      resolveFetch = resolve
    })
    const fetchMock = vi.fn().mockReturnValue(pending)
    vi.stubGlobal('fetch', fetchMock)

    const wrapper = mount(ContactForm)
    await fillValid(wrapper)
    await wrapper.get('form').trigger('submit')
    await nextTick()

    const button = wrapper.get('button[type="submit"]')
    expect(button.text()).toContain('Sending')
    expect(button.attributes('disabled')).toBeDefined()

    resolveFetch(jsonResponse({ id: 'email_123' }))
    await flushPromises()
  })

  it('shows an error and a mailto fallback when the endpoint rejects the message', async () => {
    mockFetch(jsonResponse({ message: 'Invalid `to` field.' }, 502))
    const wrapper = mount(ContactForm)
    await fillValid(wrapper)
    await submit(wrapper)

    expect(wrapper.get('[role="alert"]').text()).toContain(
      'We could not send your message right now.',
    )
    const link = wrapper.get('[data-mailto]')
    expect(link.attributes('href').startsWith(`mailto:${site.email}`)).toBe(true)
    expect(decodeURIComponent(link.attributes('href'))).toContain('three spreadsheets')
  })

  it('shows a mailto fallback when the network request fails', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new TypeError('Failed to fetch')))
    const wrapper = mount(ContactForm)
    await fillValid(wrapper)
    await submit(wrapper)

    expect(wrapper.get('[role="alert"]').text()).toMatch(/could not reach the form service/i)
    expect(wrapper.find('[data-mailto]').exists()).toBe(true)
  })

  it('does not leak technical endpoint errors to the visitor', async () => {
    mockFetch(
      jsonResponse(
        {
          message: 'Invalid `to` field. The email address needs to follow the email@example.com format.',
        },
        422,
      ),
    )
    const wrapper = mount(ContactForm)
    await fillValid(wrapper)
    await submit(wrapper)

    expect(wrapper.text()).not.toContain('Invalid `to` field')
    expect(wrapper.text()).toContain('We could not send your message right now.')
    expect(wrapper.find('[data-mailto]').exists()).toBe(true)
  })

  it('quietly accepts a honeypot submission without posting it', async () => {
    const fetchMock = mockFetch()
    const wrapper = mount(ContactForm)
    await fillValid(wrapper)
    await wrapper.get('#website').setValue('https://spam.example')
    await submit(wrapper)

    expect(fetchMock).not.toHaveBeenCalled()
    expect(wrapper.text()).toContain('Message sent')
  })

  it('clears an error when the visitor edits the form again', async () => {
    mockFetch(jsonResponse({ message: 'Invalid `to` field.' }, 502))
    const wrapper = mount(ContactForm)
    await fillValid(wrapper)
    await submit(wrapper)

    expect(wrapper.find('[role="alert"]').exists()).toBe(true)
    await wrapper.get('#name').setValue('Ada S.')
    expect(wrapper.find('[role="alert"]').exists()).toBe(false)
  })

  it('lets the visitor send another message after success', async () => {
    mockFetch()
    const wrapper = mount(ContactForm)
    await fillValid(wrapper)
    await submit(wrapper)

    await wrapper.get('[data-send-another]').trigger('click')
    expect(wrapper.find('form').exists()).toBe(true)
    expect(wrapper.get('#name').element.value).toBe('')
    expect(wrapper.get('button[type="submit"]').text()).toContain('Send message')
  })
})
