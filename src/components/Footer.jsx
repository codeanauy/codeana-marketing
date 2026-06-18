import { useLang } from '../i18n'

export default function Footer() {
  const { t } = useLang()
  const tf = t.footer

  const links = [
    { label: t.nav.services, href: '#servicios' },
    { label: t.nav.process,  href: '#proceso'   },
    { label: t.nav.about,    href: '#nosotros'  },
    { label: t.nav.contact,  href: '#contacto'  },
  ]

  return (
    <footer className="bg-opus-pergamino border-t border-opus-pergamino-border">
      <div className="max-w-7xl mx-auto px-6 py-14">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-10">

          {/* Brand */}
          <div className="max-w-xs">
            <a href="#" aria-label="Codeana — inicio">
              <svg
                viewBox="0 0 420 120"
                height="44"
                fill="none"
                aria-hidden="true"
              >
                <g transform="translate(-12,0)">
                  <path
                    d="M84 40 A26 26 0 1 0 84 80"
                    stroke="#1B4F82"
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
                  fill="#1B4F82"
                  dominantBaseline="central"
                >
                  Codeana
                </text>
              </svg>
            </a>
            <p className="text-opus-texto-muted text-sm mt-3 leading-relaxed">{tf.tagline}</p>
          </div>

          {/* Nav */}
          <nav aria-label="Pie de página">
            <ul className="flex flex-col sm:flex-row gap-4 sm:gap-8">
              {links.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="text-opus-texto-muted text-sm hover:text-opus-prusia transition-colors"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Bottom */}
        <div className="mt-10 pt-6 border-t border-opus-pergamino-border flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-opus-texto-light">
          <span>© {new Date().getFullYear()} Codeana. {tf.rights}</span>
          <span className="text-opus-prusia font-medium">{tf.made}</span>
        </div>
      </div>
    </footer>
  )
}
