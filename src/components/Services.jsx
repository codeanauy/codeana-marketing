import { Code2, Globe, Zap, Lightbulb } from 'lucide-react'
import FadeIn from './FadeIn'
import SectionHeader from './SectionHeader'
import { useLang } from '../i18n'

const ICONS = [
  <Code2    key="code"    size={18} strokeWidth={1.5} aria-hidden="true" />,
  <Globe    key="web"     size={18} strokeWidth={1.5} aria-hidden="true" />,
  <Zap      key="perf"    size={18} strokeWidth={1.5} aria-hidden="true" />,
  <Lightbulb key="consult" size={18} strokeWidth={1.5} aria-hidden="true" />,
]

export default function Services() {
  const { t } = useLang()

  return (
    <section id="servicios" className="bg-opus-pergamino py-20">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader
          label={t.services.label}
          title={t.services.title}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {t.services.items.map((s, i) => (
            <FadeIn key={s.title} delay={i * 60}>
              <div className="group flex flex-col bg-white rounded-xl p-6 border border-opus-pergamino-border
                hover:border-opus-prusia-border hover:shadow-md hover:scale-[1.015]
                transition-all duration-200 ease-out h-full">

                <div className="flex items-center justify-between mb-4">
                  <div className="w-9 h-9 rounded-lg bg-opus-prusia-light text-opus-prusia
                    group-hover:bg-opus-acento-light group-hover:text-opus-acento-contrast
                    flex items-center justify-center flex-shrink-0 transition-colors duration-200">
                    {ICONS[i]}
                  </div>
                  <span
                    className="text-[34px] font-extrabold leading-none tabular-nums select-none text-opus-acento/60"
                    aria-hidden="true"
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>

                <h3 className="text-[18px] font-bold text-opus-texto leading-snug mb-4">
                  {s.title}
                </h3>

                <div className="bg-opus-pergamino rounded-lg px-5 py-4 flex-1">
                  <p className="text-opus-texto-muted text-sm leading-relaxed">
                    {s.desc}
                  </p>
                </div>

              </div>
            </FadeIn>
          ))}
        </div>

        {/* Por qué Codeana — integrado como cierre de la sección */}
        <div className="mt-12 pt-10 border-t border-opus-pergamino-border">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-opus-prusia mb-8">
            {t.diff.label}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {t.diff.items.map((item, i) => (
              <FadeIn key={item.statement} delay={i * 80}>
                <div className="flex gap-4 items-start pl-4 border-l-2 border-opus-acento/35 hover:border-opus-acento transition-colors duration-300">
                  <div>
                    <p className="font-bold text-opus-texto text-[15px] leading-snug mb-1">
                      {item.statement}
                    </p>
                    <p className="text-opus-texto-muted text-sm leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
