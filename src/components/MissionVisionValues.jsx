import { useState } from 'react'
import { Check, Loader2 } from 'lucide-react'
import FadeIn from './FadeIn'
import { useLang } from '../i18n'

const INITIAL_FIELDS = { nombre: '', email: '', empresa: '', mensaje: '' }

function validate(f, tf) {
  const errors = { nombre: '', email: '', mensaje: '' }
  if (!f.nombre.trim() || f.nombre.trim().length < 2) errors.nombre = tf.nombre_req
  if (!f.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email)) errors.email = tf.email_req
  if (!f.mensaje.trim() || f.mensaje.trim().length < 10) errors.mensaje = tf.mensaje_req
  return errors
}

const inputBase =
  'w-full border rounded-lg px-4 py-3 text-sm text-opus-texto bg-white placeholder:text-opus-texto-light outline-none transition-colors disabled:opacity-60 disabled:cursor-not-allowed'
const inputNormal = 'border-opus-pergamino-border focus:border-opus-prusia'
const inputError  = 'border-red-400 focus:border-red-500'

export default function MissionVisionValues() {
  const { t } = useLang()
  const m = t.mvv
  const tc = t.contact
  const tf = tc.form

  const [fields, setFields]           = useState(INITIAL_FIELDS)
  const [errors, setErrors]           = useState({ nombre: '', email: '', mensaje: '' })
  const [status, setStatus]           = useState('idle') // 'idle' | 'loading' | 'success' | 'error'
  const [serverError, setServerError] = useState('')
  const [honeypot, setHoneypot]       = useState('')

  function handleChange(e) {
    const { name, value } = e.target
    setFields((f) => ({ ...f, [name]: value }))
    if (errors[name]) setErrors((err) => ({ ...err, [name]: '' }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const newErrors = validate(fields, tf)
    if (Object.values(newErrors).some(Boolean)) { setErrors(newErrors); return }

    setStatus('loading')
    setServerError('')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...fields, _honeypot: honeypot }),
      })

      if (res.ok) {
        setStatus('success')
        setFields(INITIAL_FIELDS)
      } else {
        const data = await res.json().catch(() => ({}))
        setServerError(data.message || tc.error_generic)
        setStatus('error')
      }
    } catch {
      setServerError(tc.error_generic)
      setStatus('error')
    }
  }

  const isLoading = status === 'loading'

  return (
    <section id="nosotros" className="bg-opus-texto py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">

          {/* ── Columna izquierda: Nosotros ── */}
          <FadeIn>
            <div className="mb-10">
              <div className="flex items-center gap-2 mb-3">
                <span className="w-4 h-px bg-opus-acento flex-shrink-0 mt-2" aria-hidden="true" />
                <span className="text-[11px] font-semibold tracking-[0.22em] uppercase text-opus-acento">
                  {m.label}
                </span>
              </div>
              <h2 className="font-display text-3xl lg:text-4xl font-bold text-opus-alba tracking-tight">
                {m.title}
              </h2>
            </div>

            <div className="space-y-8">
              <div className="pt-5 border-t-2 border-opus-acento/50">
                <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-opus-acento mb-4 block">
                  {m.mission_label}
                </span>
                <p className="text-opus-alba text-lg font-medium leading-relaxed">
                  {m.mission_text}
                </p>
              </div>

              <div className="pt-5 border-t border-white/10">
                <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-opus-alba/60 mb-4 block">
                  {m.vision_label}
                </span>
                <p className="text-opus-alba/75 text-lg font-medium leading-relaxed">
                  {m.vision_text}
                </p>
              </div>

              <div className="pt-5 border-t border-white/10">
                <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-opus-alba/60 mb-4 block">
                  {m.values_label}
                </span>
                <ul className="space-y-3">
                  {m.values.map((v) => (
                    <li key={v} className="flex items-start gap-3">
                      <Check size={14} strokeWidth={2.5} className="mt-0.5 text-opus-acento flex-shrink-0" aria-hidden="true" />
                      <span className="text-opus-alba/75 font-medium leading-snug">{v}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </FadeIn>

          {/* ── Columna derecha: Contacto (card beige) ── */}
          <FadeIn delay={150}>
            <div id="contacto" className="bg-opus-pergamino rounded-2xl p-8 lg:p-10">

              <div className="mb-8">
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-4 h-px bg-opus-prusia flex-shrink-0 mt-2" aria-hidden="true" />
                  <span className="text-[11px] font-semibold tracking-[0.22em] uppercase text-opus-prusia">
                    {tc.label}
                  </span>
                </div>
                <h2 className="font-display text-2xl lg:text-3xl font-bold text-opus-texto tracking-tight mb-3">
                  {tc.title}
                </h2>
                <p className="text-opus-texto-muted text-[15px] leading-relaxed">
                  {tc.sub}
                </p>
              </div>

              {status === 'success' ? (
                <div className="bg-white border border-opus-pergamino-border rounded-xl p-10 text-center">
                  <div className="w-12 h-12 rounded-full bg-opus-prusia-light flex items-center justify-center mx-auto mb-5">
                    <Check size={22} strokeWidth={2} className="text-opus-prusia" aria-hidden="true" />
                  </div>
                  <h3 className="text-opus-texto font-semibold text-xl mb-2">{tc.success_title}</h3>
                  <p className="text-opus-texto-muted">{tc.success_sub}</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-4">

                  {/* Honeypot — oculto para humanos, trampa para bots */}
                  <div
                    style={{ position: 'absolute', left: '-9999px', opacity: 0, pointerEvents: 'none' }}
                    aria-hidden="true"
                  >
                    <input
                      name="_honeypot"
                      type="text"
                      tabIndex={-1}
                      autoComplete="off"
                      value={honeypot}
                      onChange={(e) => setHoneypot(e.target.value)}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="nombre" className="block text-sm font-medium text-opus-texto mb-1.5">
                        {tf.nombre} <span className="text-opus-prusia" aria-hidden="true">*</span>
                      </label>
                      <input
                        id="nombre" name="nombre" type="text" autoComplete="name"
                        value={fields.nombre} onChange={handleChange}
                        placeholder={tf.nombre_ph}
                        disabled={isLoading}
                        aria-required="true"
                        aria-invalid={!!errors.nombre}
                        aria-describedby={errors.nombre ? 'mvv-err-nombre' : undefined}
                        className={`${inputBase} ${errors.nombre ? inputError : inputNormal}`}
                      />
                      {errors.nombre && (
                        <p id="mvv-err-nombre" className="mt-1 text-xs text-red-600" role="alert">{errors.nombre}</p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-opus-texto mb-1.5">
                        {tf.email} <span className="text-opus-prusia" aria-hidden="true">*</span>
                      </label>
                      <input
                        id="email" name="email" type="email" autoComplete="email"
                        value={fields.email} onChange={handleChange}
                        placeholder={tf.email_ph}
                        disabled={isLoading}
                        aria-required="true"
                        aria-invalid={!!errors.email}
                        aria-describedby={errors.email ? 'mvv-err-email' : undefined}
                        className={`${inputBase} ${errors.email ? inputError : inputNormal}`}
                      />
                      {errors.email && (
                        <p id="mvv-err-email" className="mt-1 text-xs text-red-600" role="alert">{errors.email}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="empresa" className="block text-sm font-medium text-opus-texto mb-1.5">
                      {tf.empresa}{' '}
                      <span className="text-opus-texto-light text-xs font-normal">{tf.empresa_opt}</span>
                    </label>
                    <input
                      id="empresa" name="empresa" type="text" autoComplete="organization"
                      value={fields.empresa} onChange={handleChange}
                      placeholder={tf.empresa_ph}
                      disabled={isLoading}
                      className={`${inputBase} ${inputNormal}`}
                    />
                  </div>

                  <div>
                    <label htmlFor="mensaje" className="block text-sm font-medium text-opus-texto mb-1.5">
                      {tf.mensaje} <span className="text-opus-prusia" aria-hidden="true">*</span>
                    </label>
                    <textarea
                      id="mensaje" name="mensaje" rows={4}
                      value={fields.mensaje} onChange={handleChange}
                      placeholder={tf.mensaje_ph}
                      disabled={isLoading}
                      aria-required="true"
                      aria-invalid={!!errors.mensaje}
                      aria-describedby={errors.mensaje ? 'mvv-err-mensaje' : undefined}
                      className={`${inputBase} resize-none ${errors.mensaje ? inputError : inputNormal}`}
                    />
                    {errors.mensaje && (
                      <p id="mvv-err-mensaje" className="mt-1 text-xs text-red-600" role="alert">{errors.mensaje}</p>
                    )}
                  </div>

                  {status === 'error' && (
                    <div
                      className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
                      role="alert"
                    >
                      {serverError}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-opus-prusia text-white font-semibold py-3.5 rounded-lg hover:bg-opus-prusia-hover active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed disabled:active:scale-100 transition-all duration-200 text-sm flex items-center justify-center gap-2"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 size={15} className="animate-spin" aria-hidden="true" />
                        {tf.sending}
                      </>
                    ) : tf.submit}
                  </button>

                </form>
              )}

            </div>
          </FadeIn>

        </div>
      </div>
    </section>
  )
}
