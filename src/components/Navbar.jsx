import { useState, useEffect } from 'react'
import { useLang } from '../i18n'

export default function Navbar() {
  const { lang, setLang, t } = useLang()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = [
    { label: t.nav.services, href: '#servicios' },
    { label: t.nav.process,  href: '#proceso'   },
    { label: t.nav.about,    href: '#nosotros'  },
    { label: t.nav.contact,  href: '#contacto'  },
  ]

  /* ── Estilos dependientes del scroll ─────────────────── */
  const onDark = !scrolled

  const navTextBase    = onDark ? 'text-opus-alba/80 hover:text-opus-alba'    : 'text-opus-texto-mid hover:text-opus-prusia'
  const underlineColor = onDark ? 'bg-opus-acento'                            : 'bg-opus-prusia'
  const toggleColor    = onDark ? 'text-opus-alba'                             : 'text-opus-texto'

  const switchBorder   = onDark ? 'border-opus-alba/20'                       : 'border-opus-prusia-border/60'
  const switchInactive = onDark ? 'text-opus-alba/55 hover:text-opus-alba'    : 'text-opus-texto-muted hover:text-opus-prusia'
  const switchActive   = onDark ? 'bg-opus-alba/15 text-opus-alba'            : 'bg-opus-prusia text-white'

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-sm border-b border-opus-pergamino-border shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* Logo */}
        <a href="#" aria-label="Codeana — inicio">
          <svg
            viewBox="0 0 420 120"
            height="52"
            fill="none"
            aria-hidden="true"
          >
            <g transform="translate(-12,0)">
              <path
                d="M84 40 A26 26 0 1 0 84 80"
                stroke={onDark ? '#F7F8FC' : '#1B4F82'}
                strokeWidth="13"
                strokeLinecap="round"
              />
              <rect x="78" y="53" width="14" height="14" rx="3" fill="#E8A33D" />
            </g>
            <text
              x="108"
              y="60"
              fontFamily="Plus Jakarta Sans, sans-serif"
              fontSize="56"
              fontWeight="600"
              letterSpacing="-1.8"
              fill={onDark ? '#F7F8FC' : '#1B4F82'}
              dominantBaseline="central"
            >
              Codeana
            </text>
          </svg>
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8" aria-label="Navegación principal">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={`text-sm font-medium transition-colors duration-300 relative group ${navTextBase}`}
            >
              {l.label}
              <span className={`absolute -bottom-0.5 left-0 w-0 h-px ${underlineColor} transition-all duration-200 group-hover:w-full`} />
            </a>
          ))}

          {/* Language switch */}
          <div
            className={`flex items-center border rounded overflow-hidden text-[11px] font-semibold ${switchBorder}`}
            role="group"
            aria-label={lang === 'es' ? 'Idioma' : 'Language'}
          >
            {(['es', 'en'] ).map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                aria-pressed={lang === l}
                aria-label={l === 'es' ? 'Cambiar a español' : 'Switch to English'}
                className={`px-2.5 py-1 uppercase transition-colors duration-200 ${
                  lang === l ? switchActive : switchInactive
                }`}
              >
                {l}
              </button>
            ))}
          </div>

          <a
            href="#contacto"
            className="bg-opus-prusia text-white text-sm font-semibold px-5 py-2.5 rounded hover:bg-opus-prusia-hover active:scale-[0.97] transition-all duration-200"
          >
            {t.nav.cta}
          </a>
        </nav>

        {/* Mobile toggle */}
        <button
          className={`md:hidden p-2 transition-colors duration-300 ${toggleColor}`}
          onClick={() => setOpen(!open)}
          aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={open}
          aria-controls="mobile-menu"
        >
          {open ? (
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <path d="M17 5L5 17M5 5l12 12" />
            </svg>
          ) : (
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <path d="M3 11h16M3 6h16M3 16h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div
          id="mobile-menu"
          className="md:hidden bg-white border-t border-opus-pergamino-border menu-slide-down"
        >
          {/* Lang switch en mobile */}
          <div className="flex items-center justify-end gap-0 px-6 pt-4 pb-2">
            <div
              className="flex items-center border border-opus-prusia-border/60 rounded overflow-hidden text-[11px] font-semibold"
              role="group"
              aria-label={lang === 'es' ? 'Idioma' : 'Language'}
            >
              {(['es', 'en']).map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  aria-pressed={lang === l}
                  aria-label={l === 'es' ? 'Cambiar a español' : 'Switch to English'}
                  className={`px-3 py-1.5 uppercase transition-colors ${
                    lang === l
                      ? 'bg-opus-prusia text-white'
                      : 'text-opus-texto-muted hover:text-opus-prusia'
                  }`}
                >
                  {l}
                </button>
              ))}
            </div>
          </div>

          <nav className="flex flex-col px-6 py-2 gap-1" aria-label="Menú móvil">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-opus-texto-mid font-medium py-3 border-b border-opus-pergamino-border last:border-0 hover:text-opus-prusia transition-colors"
                onClick={() => setOpen(false)}
              >
                {l.label}
              </a>
            ))}
            <a
              href="#contacto"
              className="mt-3 mb-2 bg-opus-prusia text-white font-semibold px-5 py-3 rounded text-center hover:bg-opus-prusia-hover transition-colors"
              onClick={() => setOpen(false)}
            >
              {t.nav.cta}
            </a>
          </nav>
        </div>
      )}
    </header>
  )
}
