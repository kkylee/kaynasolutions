const RESEND_ENDPOINT = 'https://api.resend.com/emails'
const DEFAULT_TO = 'info@kaynasolutions.com'
const DEFAULT_FROM = 'Kayna Website <website@kaynasolutions.com>'
const SITE_ORIGINS = ['https://kaynasolutions.com', 'https://www.kaynasolutions.com']
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const LIMITS = {
  name: 120,
  email: 254,
  company: 160,
  phone: 60,
  service: 120,
  message: 5000,
}

function json(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json; charset=utf-8' },
  })
}

function asText(value) {
  return typeof value === 'string' ? value.trim() : ''
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (character) => {
    const entities = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;',
    }
    return entities[character]
  })
}

function validate(payload) {
  const fields = {}
  const data = payload && typeof payload === 'object' && !Array.isArray(payload) ? payload : {}
  const value = {
    name: asText(data.name),
    email: asText(data.email),
    company: asText(data.company),
    phone: asText(data.phone),
    service: asText(data.service),
    message: asText(data.message),
  }

  if (value.name.length < 2 || value.name.length > LIMITS.name) {
    fields.name = 'Please enter your name.'
  }
  if (
    value.email.length === 0 ||
    value.email.length > LIMITS.email ||
    !EMAIL_PATTERN.test(value.email)
  ) {
    fields.email = 'Please enter a valid email address.'
  }
  if (value.message.length < 20 || value.message.length > LIMITS.message) {
    fields.message = 'Please add a little more detail (at least 20 characters).'
  }
  if (value.company.length > LIMITS.company) {
    fields.company = 'That business name is too long.'
  }
  if (value.phone.length > LIMITS.phone) {
    fields.phone = 'That phone number is too long.'
  }
  if (value.service.length > LIMITS.service) {
    fields.service = 'That service selection is too long.'
  }

  return {
    fields,
    value,
    spam: asText(data.website).length > 0,
  }
}

function allowedOrigins(env) {
  const configured = (env.ALLOWED_ORIGINS ?? '')
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean)
  return new Set([...SITE_ORIGINS, ...configured])
}

function isAllowedOrigin(request, env) {
  const origin = request.headers.get('origin')
  if (!origin) return true

  try {
    if (origin === new URL(request.url).origin) return true
  } catch {
    return false
  }

  return allowedOrigins(env).has(origin)
}

function buildEmail(contact, { from, to }) {
  const subjectName = contact.name.replace(/[\r\n]+/g, ' ')
  const subjectCompany = contact.company.replace(/[\r\n]+/g, ' ')
  const subject = `Website enquiry — ${subjectName}${subjectCompany ? ` (${subjectCompany})` : ''}`

  const lines = [
    `Name: ${contact.name}`,
    `Email: ${contact.email}`,
    contact.company ? `Business: ${contact.company}` : '',
    contact.phone ? `Phone: ${contact.phone}` : '',
    contact.service ? `Interested in: ${contact.service}` : '',
    '',
    contact.message,
  ].filter((line) => line !== '')

  const rows = [
    ['Name', contact.name],
    ['Email', contact.email],
    ['Business', contact.company],
    ['Phone', contact.phone],
    ['Interested in', contact.service],
  ].filter(([, value]) => value)

  const htmlRows = rows
    .map(
      ([label, value]) =>
        `<tr><th align="left" style="padding:6px 16px 6px 0;vertical-align:top;color:#475569;font-weight:600">${escapeHtml(
          label,
        )}</th><td style="padding:6px 0;vertical-align:top;color:#101D35">${escapeHtml(
          value,
        )}</td></tr>`,
    )
    .join('')

  const html = `<!doctype html>
<html>
  <body style="margin:0;padding:24px;background:#F8FAFC;font-family:Inter,Arial,sans-serif;color:#475569">
    <div style="max-width:640px;margin:0 auto;padding:28px;background:#FFFFFF;border:1px solid #E2E8F0;border-radius:12px">
      <h1 style="margin:0 0 18px;font-family:Manrope,Arial,sans-serif;font-size:22px;line-height:1.25;color:#101D35">New website enquiry</h1>
      <table style="border-collapse:collapse;font-size:14px;line-height:1.5">${htmlRows}</table>
      <h2 style="margin:24px 0 8px;font-family:Manrope,Arial,sans-serif;font-size:16px;color:#101D35">Message</h2>
      <p style="margin:0;font-size:14px;line-height:1.65;white-space:pre-wrap">${escapeHtml(
        contact.message,
      )}</p>
    </div>
  </body>
</html>`

  return {
    from,
    to,
    reply_to: contact.email,
    subject: subject.slice(0, 180),
    text: lines.join('\n'),
    html,
  }
}

export async function onRequestPost({ request, env }) {
  if (!isAllowedOrigin(request, env)) {
    return json({ ok: false, error: 'This request came from an unrecognized origin.' }, 403)
  }

  let payload
  try {
    payload = await request.json()
  } catch {
    return json({ ok: false, error: 'The form request could not be read.' }, 400)
  }

  const { fields, value, spam } = validate(payload)

  if (spam) {
    return json({ ok: true })
  }

  if (Object.keys(fields).length > 0) {
    return json(
      {
        ok: false,
        error: 'Please check the highlighted fields.',
        fields,
      },
      400,
    )
  }

  if (!env.RESEND_API_KEY) {
    return json(
      { ok: false, error: 'The contact form is not configured yet. Please email us directly.' },
      503,
    )
  }

  const to = (env.CONTACT_TO || DEFAULT_TO)
    .split(',')
    .map((address) => address.trim())
    .filter(Boolean)
  const from = env.CONTACT_FROM || DEFAULT_FROM
  const message = buildEmail(value, { from, to })

  let response
  try {
    response = await fetch(RESEND_ENDPOINT, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(message),
    })
  } catch {
    return json(
      { ok: false, error: 'We could not send your message right now. Please email us directly.' },
      502,
    )
  }

  if (!response.ok) {
    return json(
      { ok: false, error: 'We could not send your message right now. Please email us directly.' },
      502,
    )
  }

  return json({ ok: true })
}
