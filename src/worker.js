/*
 * Cloudflare Worker — codeana-marketing
 *
 * Routing:
 *   POST /api/contact  →  handleContact() — envía mail via Resend
 *   todo lo demás      →  assets estáticos de dist/ (fallback SPA a index.html)
 *
 * Variables de entorno requeridas:
 *   RESEND_API_KEY  — cargada en Cloudflare dashboard → Workers → codeana-marketing
 *                     → Settings → Variables and Secrets
 *
 * Pruebas locales:
 *   1. Crear .dev.vars en la raíz con: RESEND_API_KEY=re_xxxxx
 *   2. npm run build && npm run dev:worker
 *   3. curl -X POST http://localhost:8787/api/contact \
 *        -H "Content-Type: application/json" \
 *        -d '{"nombre":"Test","email":"test@ejemplo.com","mensaje":"Mensaje de prueba","_honeypot":""}'
 */

export default {
  async fetch(request, env) {
    const { pathname } = new URL(request.url)

    if (pathname === '/api/contact') {
      if (request.method !== 'POST') {
        return json({ ok: false, message: 'Method not allowed.' }, 405)
      }
      return handleContact(request, env)
    }

    return env.ASSETS.fetch(request)
  },
}

async function handleContact(request, env) {
  let body
  try {
    body = await request.json()
  } catch {
    return json({ ok: false, message: 'Solicitud inválida.' }, 400)
  }

  const { nombre, email, empresa, mensaje, _honeypot } = body

  // Honeypot: si viene con valor es un bot — descartar silenciosamente
  if (_honeypot) {
    return json({ ok: true }, 200)
  }

  // Validación server-side
  if (!nombre?.trim() || nombre.trim().length < 2) {
    return json({ ok: false, message: 'El nombre es requerido.', field: 'nombre' }, 400)
  }
  if (!email?.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return json({ ok: false, message: 'Email inválido.', field: 'email' }, 400)
  }
  if (!mensaje?.trim() || mensaje.trim().length < 10) {
    return json({ ok: false, message: 'El mensaje es requerido.', field: 'mensaje' }, 400)
  }

  const apiKey = env.RESEND_API_KEY
  if (!apiKey) {
    console.error('RESEND_API_KEY no está configurada')
    return json({ ok: false, message: 'Error de configuración del servidor.' }, 500)
  }

  const empresaLine = empresa?.trim() ? `Empresa:  ${empresa.trim()}\n` : ''

  const textBody =
    `Nuevo contacto desde codeana.uy\n` +
    `${'─'.repeat(40)}\n\n` +
    `Nombre:   ${nombre.trim()}\n` +
    `Email:    ${email.trim()}\n` +
    `${empresaLine}\n` +
    `Mensaje:\n${mensaje.trim()}\n`

  try {
    const resendRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'web@codeana.uy',
        to: ['codeanauy@gmail.com'],
        reply_to: email.trim(),
        subject: `Nuevo contacto desde codeana.uy — ${nombre.trim()}`,
        text: textBody,
      }),
    })

    if (!resendRes.ok) {
      const err = await resendRes.json().catch(() => ({}))
      console.error('Resend error:', err)
      return json({ ok: false, message: 'No se pudo enviar el mensaje. Intentá de nuevo.' }, 502)
    }

    return json({ ok: true }, 200)
  } catch (err) {
    console.error('Error de red al llamar a Resend:', err)
    return json({ ok: false, message: 'No se pudo enviar el mensaje. Intentá de nuevo.' }, 502)
  }
}

function json(data, status) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  })
}
