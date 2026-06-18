import FadeIn from './FadeIn'
import SectionHeader from './SectionHeader'
import { useLang } from '../i18n'

export default function Technologies() {
  const { t } = useLang()

  return (
    <section id="stack" className="bg-opus-pergamino py-24">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader
          index={3}
          label={t.tech.label}
          title={t.tech.title}
        />

        <FadeIn>
          <p className="text-opus-texto-muted text-[17px] leading-relaxed -mt-6 mb-14 max-w-2xl">
            {t.tech.subtitle}
          </p>
        </FadeIn>

        <FadeIn delay={60}>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-8 gap-y-10 mb-16">
            {t.tech.categories.map((cat) => (
              <div key={cat.name}>
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-opus-acento mb-3">
                  {cat.name}
                </p>
                <div className="flex flex-col gap-2">
                  {cat.items.map((item) => (
                    <span
                      key={item}
                      className="text-sm font-medium text-opus-texto bg-white border border-opus-pergamino-border px-3 py-1.5 rounded-md w-fit"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </FadeIn>

        <FadeIn delay={140}>
          <div className="relative rounded-xl border border-opus-acento/30 bg-opus-acento-light overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-opus-acento rounded-l" aria-hidden="true" />
            <div className="px-8 py-7 md:flex items-center gap-8">
              <div className="w-11 h-11 rounded-lg bg-white/70 border border-opus-acento/20 flex items-center justify-center flex-shrink-0 mb-4 md:mb-0">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-opus-acento-contrast" aria-hidden="true">
                  <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
                </svg>
              </div>

              <div className="flex-1">
                <h3 className="font-semibold text-opus-texto text-lg mb-1">
                  {t.tech.callout_title}
                </h3>
                <p className="text-opus-texto-muted leading-relaxed text-[15px]">
                  {t.tech.callout_text}
                </p>
              </div>

              <a
                href="#contacto"
                className="flex-shrink-0 mt-5 md:mt-0 inline-flex items-center gap-2 bg-opus-prusia text-white text-sm font-semibold px-5 py-2.5 rounded hover:bg-opus-prusia-hover transition-colors"
              >
                {t.tech.callout_cta}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
