import { useState, useEffect } from 'react'
import { ArrowRight } from 'lucide-react'
import { useLang } from '../i18n'

/* Nodos ámbar en intersecciones del dot grid — solo desktop */
const NODES = [
  { id: 'a', left: '63%', top: '24%', size: 5, opacity: 0.82, pulse: false, delay: 0    },
  { id: 'b', left: '78%', top: '36%', size: 4, opacity: 1,    pulse: true,  delay: 0    },
  { id: 'c', left: '85%', top: '19%', size: 3, opacity: 0.52, pulse: false, delay: 0    },
  { id: 'd', left: '70%', top: '65%', size: 4, opacity: 1,    pulse: true,  delay: 1800 },
  { id: 'e', left: '91%', top: '30%', size: 2, opacity: 0.38, pulse: false, delay: 0    },
  { id: 'f', left: '68%', top: '52%', size: 3, opacity: 0.55, pulse: false, delay: 0    },
  { id: 'g', left: '82%', top: '62%', size: 2, opacity: 0.40, pulse: false, delay: 0    },
  { id: 'h', left: '75%', top: '78%', size: 3, opacity: 0.65, pulse: true,  delay: 2800 },
]

export default function Hero() {
  const { t } = useLang()
  const [reducedMotion] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  const [activeRing, setActiveRing] = useState(1)

  useEffect(() => {
    if (reducedMotion) return
    const id = setInterval(() => setActiveRing(prev => (prev + 1) % NODES.length), 2400)
    return () => clearInterval(id)
  }, [reducedMotion])

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden bg-opus-prusia-deep"
    >
      {/* ── Capa 1: cuadrícula técnica con máscara radial ────── */}
      <div
        className="absolute inset-0 hero-grid pointer-events-none"
        aria-hidden="true"
      />

      {/* ── Capa 2: barrido diagonal lento sobre la grilla ───── */}
      <div
        className="absolute inset-0 hero-grid-sweep pointer-events-none"
        aria-hidden="true"
      />

      {/* ── Capa 3: nodos ámbar en intersecciones (solo ≥ md) ── */}
      <div
        className="absolute inset-0 pointer-events-none hidden md:block"
        aria-hidden="true"
      >
        {NODES.map((n, i) => (
          <div
            key={n.id}
            className="absolute"
            style={{ left: n.left, top: n.top }}
          >
            {/* Anillo externo — cicla entre nodos */}
            <div
              className="absolute rounded-full"
              style={{
                width:      '22px',
                height:     '22px',
                top:        '-9px',
                left:       '-9px',
                border:     '1px solid rgba(232,163,61,0.5)',
                opacity:    activeRing === i ? 1 : 0,
                transition: 'opacity 0.9s ease',
              }}
            />
            {/* Punto del nodo */}
            <div
              className={n.pulse ? 'hero-node-pulse rounded-full' : 'rounded-full'}
              style={{
                width:           `${n.size}px`,
                height:          `${n.size}px`,
                backgroundColor: 'var(--color-opus-acento)',
                opacity:         n.pulse ? undefined : n.opacity,
                animationDelay:  n.delay ? `${n.delay}ms` : undefined,
              }}
            />
          </div>
        ))}
      </div>

      {/* ── Contenido ────────────────────────────────────────── */}
      <div
        className="relative z-10 max-w-7xl mx-auto px-6 w-full"
        style={{ paddingTop: '148px', paddingBottom: '108px' }}
      >
        <div className="max-w-2xl">

          {/* Label con línea de acento */}
          <div
            className="animate-fade-up flex items-center gap-3 mb-8"
            style={{ animation: 'fade-up 0.55s cubic-bezier(0.16,1,0.3,1) 0.1s both' }}
          >
            <span
              className="w-5 h-px bg-opus-cielo"
              aria-hidden="true"
            />
            <span className="text-opus-cielo text-xs font-semibold tracking-[0.22em] uppercase">
              {t.hero.label}
            </span>
          </div>

          {/* Headline */}
          <h1
            className="animate-fade-up text-opus-alba font-bold leading-[1.04] tracking-tight mb-6 text-5xl md:text-6xl lg:text-[68px]"
            style={{ animation: 'fade-up 0.55s cubic-bezier(0.16,1,0.3,1) 0.22s both' }}
          >
            {t.hero.title}
          </h1>

          {/* Subtext */}
          <p
            className="animate-fade-up text-opus-alba/60 text-lg md:text-xl font-normal leading-relaxed mb-10 max-w-lg"
            style={{ animation: 'fade-up 0.55s cubic-bezier(0.16,1,0.3,1) 0.34s both' }}
          >
            {t.hero.sub}
          </p>

          {/* CTAs */}
          <div
            className="animate-fade-up flex flex-col sm:flex-row gap-4"
            style={{ animation: 'fade-up 0.55s cubic-bezier(0.16,1,0.3,1) 0.46s both' }}
          >
            {/* Primario — color acento ámbar */}
            <a
              href="#contacto"
              className="group inline-flex items-center justify-center gap-2 bg-opus-acento text-opus-acento-contrast font-semibold px-8 py-4 rounded hover:bg-opus-acento-hover active:scale-[0.97] transition-all duration-200 text-base"
            >
              {t.hero.cta}
              <ArrowRight size={15} strokeWidth={2} className="transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
            </a>
            {/* Secundario — outline blanco */}
            <a
              href="#servicios"
              className="inline-flex items-center justify-center text-opus-alba/70 font-medium px-8 py-4 border border-opus-alba/18 rounded hover:border-opus-alba/35 hover:text-opus-alba active:scale-[0.97] transition-all duration-200 text-base"
            >
              {t.hero.cta2}
            </a>
          </div>
        </div>
      </div>

      {/* ── Indicador de scroll ──────────────────────────────── */}
      <div
        className="animate-fade-up absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-opus-alba/30"
        style={{ animation: 'fade-up 0.55s cubic-bezier(0.16,1,0.3,1) 0.7s both' }}
        aria-hidden="true"
      >
        <span className="text-[10px] tracking-widest uppercase font-medium">Scroll</span>
        <svg width="12" height="18" viewBox="0 0 12 18" fill="none">
          <rect x="1" y="1" width="10" height="16" rx="5" stroke="currentColor" strokeWidth="1.2" />
          <circle cx="6" cy="5" r="1.5" fill="currentColor">
            {!reducedMotion && (
              <>
                <animate attributeName="cy"      from="5"  to="11" dur="1.6s" repeatCount="indefinite" />
                <animate attributeName="opacity" from="1"  to="0"  dur="1.6s" repeatCount="indefinite" />
              </>
            )}
          </circle>
        </svg>
      </div>
    </section>
  )
}
