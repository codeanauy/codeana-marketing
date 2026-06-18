import FadeIn from './FadeIn'
import { useLang } from '../i18n'

export default function Differentiators() {
  const { t } = useLang()

  return (
    <section className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-6">

        <FadeIn>
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-opus-acento mb-12">
            {t.diff.label}
          </p>
        </FadeIn>

        <div className="border-t border-opus-pergamino-border divide-y divide-opus-pergamino-border">
          {t.diff.items.map((item, i) => (
            <FadeIn key={item.statement} delay={i * 80}>
              <div className="py-9 flex gap-8 md:gap-14 items-start">
                <span className="text-[13px] font-semibold text-opus-acento flex-shrink-0 pt-1.5">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div>
                  <p className="text-[22px] md:text-[28px] font-bold text-opus-texto leading-snug mb-2">
                    {item.statement}
                  </p>
                  <p className="text-opus-texto-muted text-[15px] leading-relaxed max-w-2xl">
                    {item.desc}
                  </p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

      </div>
    </section>
  )
}
