import { useState } from 'react'
import FadeIn from './FadeIn'
import SectionHeader from './SectionHeader'
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
  'w-full border rounded px-4 py-3 text-sm text-opus-texto bg-white placeholder:text-opus-texto-light outline-none transition-colors'
const inputNormal = 'border-opus-prusia-border focus:border-opus-prusia'
const inputError  = 'border-red-400 focus:border-red-500'

export default function Contact() {
  const { t } = useLang()
  const tc = t.contact
  const tf = tc.form

  const [fields, setFields]     = useState(INITIAL_FIELDS)
  const [errors, setErrors]     = useState({ nombre: '', email: '', mensaje: '' })
  const [submitted, setSubmitted] = useState(false)

  function handleChange(e) {
    const { name, value } = e.target
    setFields((f) => ({ ...f, [name]: value }))
    if (errors[name]) setErrors((err) => ({ ...err, [name]: '' }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    const newErrors = validate(fields, tf)
    if (Object.values(newErrors).some(Boolean)) { setErrors(newErrors); return }
    setSubmitted(true)
  }

  return (
    <section id="contacto" className="bg-white py-24">
      <div className="max-w-7xl mx-auto px-6">

        <SectionHeader
          index={5}
          label={tc.label}
          title={tc.title}
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          {/* Info */}
          <FadeIn>
            <p className="text-opus-texto-muted text-lg leading-relaxed mb-10">{tc.sub}</p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded bg-opus-prusia-light flex items-center justify-center text-opus-prusia flex-shrink-0">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="M2 8l10 7 10-7" />
                </svg>
              </div>
              <span className="text-opus-texto-mid font-medium">contacto@codeana.com</span>
            </div>
          </FadeIn>

          {/* Form */}
          <FadeIn delay={100}>
            {submitted ? (
              <div className="bg-white border border-opus-pergamino-border rounded-lg p-10 text-center">
                <div className="w-12 h-12 rounded-full bg-opus-prusia-light flex items-center justify-center mx-auto mb-5 text-opus-prusia">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-opus-texto font-semibold text-xl mb-3">{tc.success_title}</h3>
                <p className="text-opus-texto-muted">{tc.success_sub}</p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                noValidate
                className="bg-white border border-opus-pergamino-border rounded-lg p-8 space-y-5"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Nombre */}
                  <div>
                    <label htmlFor="nombre" className="block text-sm font-medium text-opus-texto mb-1.5">
                      {tf.nombre} <span className="text-opus-prusia" aria-hidden="true">*</span>
                    </label>
                    <input
                      id="nombre" name="nombre" type="text" autoComplete="name"
                      value={fields.nombre} onChange={handleChange}
                      placeholder={tf.nombre_ph}
                      aria-required="true"
                      aria-describedby={errors.nombre ? 'err-nombre' : undefined}
                      aria-invalid={!!errors.nombre}
                      className={`${inputBase} ${errors.nombre ? inputError : inputNormal}`}
                    />
                    {errors.nombre && (
                      <p id="err-nombre" className="mt-1.5 text-xs text-red-600" role="alert">
                        {errors.nombre}
                      </p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-opus-texto mb-1.5">
                      {tf.email} <span className="text-opus-prusia" aria-hidden="true">*</span>
                    </label>
                    <input
                      id="email" name="email" type="email" autoComplete="email"
                      value={fields.email} onChange={handleChange}
                      placeholder={tf.email_ph}
                      aria-required="true"
                      aria-describedby={errors.email ? 'err-email' : undefined}
                      aria-invalid={!!errors.email}
                      className={`${inputBase} ${errors.email ? inputError : inputNormal}`}
                    />
                    {errors.email && (
                      <p id="err-email" className="mt-1.5 text-xs text-red-600" role="alert">
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                {/* Empresa */}
                <div>
                  <label htmlFor="empresa" className="block text-sm font-medium text-opus-texto mb-1.5">
                    {tf.empresa}{' '}
                    <span className="text-opus-texto-light text-xs font-normal">{tf.empresa_opt}</span>
                  </label>
                  <input
                    id="empresa" name="empresa" type="text" autoComplete="organization"
                    value={fields.empresa} onChange={handleChange}
                    placeholder={tf.empresa_ph}
                    className={`${inputBase} ${inputNormal}`}
                  />
                </div>

                {/* Mensaje */}
                <div>
                  <label htmlFor="mensaje" className="block text-sm font-medium text-opus-texto mb-1.5">
                    {tf.mensaje} <span className="text-opus-prusia" aria-hidden="true">*</span>
                  </label>
                  <textarea
                    id="mensaje" name="mensaje" rows={5}
                    value={fields.mensaje} onChange={handleChange}
                    placeholder={tf.mensaje_ph}
                    aria-required="true"
                    aria-describedby={errors.mensaje ? 'err-mensaje' : undefined}
                    aria-invalid={!!errors.mensaje}
                    className={`${inputBase} resize-none ${errors.mensaje ? inputError : inputNormal}`}
                  />
                  {errors.mensaje && (
                    <p id="err-mensaje" className="mt-1.5 text-xs text-red-600" role="alert">
                      {errors.mensaje}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full bg-opus-prusia text-white font-semibold py-3.5 rounded hover:bg-opus-prusia-hover transition-colors text-sm"
                >
                  {tf.submit}
                </button>
              </form>
            )}
          </FadeIn>
        </div>
      </div>
    </section>
  )
}
