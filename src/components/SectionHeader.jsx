import FadeIn from './FadeIn'

export default function SectionHeader({ index, label, title, dark = false, watermarkColor }) {
  const defaultNumColor = dark ? 'rgba(247, 248, 252, 0.07)' : 'rgba(27, 79, 130, 0.13)'
  const numColor = watermarkColor ?? defaultNumColor

  const labelClass = dark ? 'text-opus-acento'  : 'text-opus-prusia'
  const titleClass = dark ? 'text-opus-alba'     : 'text-opus-texto'

  const pad = index != null ? String(index).padStart(2, '0') : null

  return (
    <FadeIn className="mb-14 md:mb-16">
      {/* Mobile: siempre simple — solo label + título */}
      <div className="md:hidden">
        <div className="flex items-center gap-2 mb-3">
          <span className="w-4 h-px bg-opus-acento flex-shrink-0" aria-hidden="true" />
          <span className={`text-xs font-semibold tracking-[0.22em] uppercase ${labelClass}`}>
            {label}
          </span>
        </div>
        <h2 className={`font-display text-3xl font-bold tracking-tight ${titleClass}`}>{title}</h2>
      </div>

      {/* Desktop: con watermark si hay index, sin él si no */}
      {pad ? (
        <div className="hidden md:grid grid-cols-[5fr_8fr] gap-16 items-end">
          <div>
            <div
              className="text-[108px] font-bold leading-none tracking-tighter select-none pointer-events-none"
              aria-hidden="true"
              style={{ color: numColor }}
            >
              {pad}
            </div>
            <div className="flex items-center gap-2 -mt-1">
              <span className="w-4 h-px bg-opus-acento flex-shrink-0" aria-hidden="true" />
              <span className={`text-xs font-semibold tracking-[0.22em] uppercase ${labelClass}`}>
                {label}
              </span>
            </div>
          </div>
          <div className="pb-2">
            <h2 className={`font-display text-4xl font-bold tracking-tight ${titleClass}`}>{title}</h2>
          </div>
        </div>
      ) : (
        <div className="hidden md:block">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-4 h-px bg-opus-acento flex-shrink-0" aria-hidden="true" />
            <span className={`text-xs font-semibold tracking-[0.22em] uppercase ${labelClass}`}>
              {label}
            </span>
          </div>
          <h2 className={`text-4xl font-bold tracking-tight ${titleClass}`}>{title}</h2>
        </div>
      )}
    </FadeIn>
  )
}
