import { afterEach, describe, expect, it, vi } from 'vitest'
import { onRequestPost } from '../functions/api/contact.js'

const valid = {
  name: 'Ada Santos',
  email: 'ada@example.com',
  company: 'Santos Trading',
  phone: '+63 917 000 0000',
  service: 'Business Process Automation',
  message:
    'We reconcile stock in three spreadsheets every Friday and it takes two people half a day.',
  website: '',
}

function requestFor(payload, { origin = 'https://kaynasolutions.com', headers = {} } = {}) {
  return new Request('https://kaynasolutions.com/api/contact', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      origin,
      ...headers,
    },
    body: JSON.stringify(payload),
  })
}

function contextFor(
  payload = valid,
  { env = { RESEND_API_KEY: 'test-key' }, origin, headers } = {},
) {
  return {
    request: requestFor(payload, { origin, headers }),
    env,
  }
}

function resendResponse(body = { id: 'email_123' }, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json' },
  })
}

afterEach(() => {
  vi.unstubAllGlobals()
})

describe('contact API', () => {
  it('sends a valid enquiry through Resend', async () => {
    const fetchMock = vi.fn().mockResolvedValue(resendResponse())
    vi.stubGlobal('fetch', fetchMock)

    const response = await onRequestPost(contextFor())
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data).toEqual({ ok: true })
    expect(fetchMock).toHaveBeenCalledTimes(1)

    const [url, init] = fetchMock.mock.calls[0]
    expect(url).toBe('https://api.resend.com/emails')
    expect(init.headers.Authorization).toBe('Bearer test-key')

    const message = JSON.parse(init.body)
    expect(message.from).toBe('Kayna Website <website@kaynasolutions.com>')
    expect(message.to).toEqual(['info@kaynasolutions.com'])
    expect(message.reply_to).toBe('ada@example.com')
    expect(message.subject).toContain('Ada Santos')
    expect(message.text).toContain('three spreadsheets every Friday')
    expect(message.text).toContain('Santos Trading')
    expect(message.html).toContain('Ada Santos')
  })

  it('rejects invalid fields before calling Resend', async () => {
    const fetchMock = vi.fn()
    vi.stubGlobal('fetch', fetchMock)

    const response = await onRequestPost(
      contextFor({ name: 'A', email: 'not-an-email', message: 'too short' }),
    )
    const data = await response.json()

    expect(response.status).toBe(400)
    expect(data.ok).toBe(false)
    expect(data.fields).toEqual(
      expect.objectContaining({
        name: expect.any(String),
        email: expect.any(String),
        message: expect.any(String),
      }),
    )
    expect(fetchMock).not.toHaveBeenCalled()
  })

  it('treats a filled honeypot as done without sending', async () => {
    const fetchMock = vi.fn()
    vi.stubGlobal('fetch', fetchMock)

    const response = await onRequestPost(contextFor({ ...valid, website: 'https://spam.example' }))

    expect(response.status).toBe(200)
    expect(await response.json()).toEqual({ ok: true })
    expect(fetchMock).not.toHaveBeenCalled()
  })

  it('rejects an untrusted origin', async () => {
    const fetchMock = vi.fn()
    vi.stubGlobal('fetch', fetchMock)

    const response = await onRequestPost(
      contextFor(valid, { origin: 'https://lookalike.example' }),
    )

    expect(response.status).toBe(403)
    expect((await response.json()).ok).toBe(false)
    expect(fetchMock).not.toHaveBeenCalled()
  })

  it('reports missing Resend configuration', async () => {
    const fetchMock = vi.fn()
    vi.stubGlobal('fetch', fetchMock)

    const response = await onRequestPost(contextFor(valid, { env: {} }))

    expect(response.status).toBe(503)
    expect((await response.json()).ok).toBe(false)
    expect(fetchMock).not.toHaveBeenCalled()
  })

  it('returns a safe error when Resend rejects the message', async () => {
    const fetchMock = vi.fn().mockResolvedValue(
      resendResponse({ message: 'Invalid API key' }, 401),
    )
    vi.stubGlobal('fetch', fetchMock)

    const response = await onRequestPost(contextFor())
    const data = await response.json()

    expect(response.status).toBe(502)
    expect(data.ok).toBe(false)
    expect(data.error).not.toContain('test-key')
  })

  it('escapes visitor text in the HTML notification', async () => {
    const fetchMock = vi.fn().mockResolvedValue(resendResponse())
    vi.stubGlobal('fetch', fetchMock)

    const response = await onRequestPost(
      contextFor({
        ...valid,
        name: '<b>Ada</b>',
        message: 'We need help with <script>alert(1)</script> stock reconciliation every Friday.',
      }),
    )

    expect(response.status).toBe(200)
    const message = JSON.parse(fetchMock.mock.calls[0][1].body)
    expect(message.html).not.toContain('<script>')
    expect(message.html).toContain('&lt;script&gt;')
  })

  it('accepts an enquiry without optional fields', async () => {
    const fetchMock = vi.fn().mockResolvedValue(resendResponse())
    vi.stubGlobal('fetch', fetchMock)

    const response = await onRequestPost(
      contextFor({
        name: 'Ada Santos',
        email: 'ada@example.com',
        message: 'We need help with stock reconciliation every Friday afternoon.',
      }),
    )

    expect(response.status).toBe(200)
    const message = JSON.parse(fetchMock.mock.calls[0][1].body)
    expect(message.text).not.toContain('undefined')
    expect(message.text).not.toContain('Company:')
  })

  it('rejects malformed JSON', async () => {
    const fetchMock = vi.fn()
    vi.stubGlobal('fetch', fetchMock)

    const request = new Request('https://kaynasolutions.com/api/contact', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        origin: 'https://kaynasolutions.com',
      },
      body: '{',
    })

    const response = await onRequestPost({ request, env: { RESEND_API_KEY: 'test-key' } })

    expect(response.status).toBe(400)
    expect(fetchMock).not.toHaveBeenCalled()
  })
})
