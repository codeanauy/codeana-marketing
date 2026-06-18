import FadeIn from './FadeIn'
import { useLang } from '../i18n'

export default function StatsStrip() {
  const { t } = useLang()

  return (
    <section className="bg-opus-texto border-t border-opus-alba/8" aria-label="Estadísticas">
      <div className="max-w-7xl mx-auto px-6 py-14">
        <FadeIn>
          <div className="grid grid-cols-1 sm:grid-cols-3">
            {t.stats.items.map((s, i) => (
              <div key={s.label} className="relative flex flex-col items-center text-center py-8 sm:py-0">
                {/* Divisor vertical entre items (solo desktop) */}
                {i > 0 && (
                  <div
                    className="hidden sm:block absolute left-0 top-1/2 -translate-y-1/2 h-12 w-px bg-opus-alba/12"
                    aria-hidden="true"
                  />
                )}
                {/* Divisor horizontal entre items (solo mobile) */}
                {i > 0 && (
                  <div
                    className="sm:hidden absolute top-0 left-1/4 right-1/4 h-px bg-opus-alba/12"
                    aria-hidden="true"
                  />
                )}

                {/* Valor */}
                <span className="text-4xl md:text-5xl font-bold text-opus-alba tracking-tight leading-none mb-2">
                  {s.value}
                </span>
                {/* Label */}
                <span className="text-sm text-opus-alba/50 font-medium">
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
