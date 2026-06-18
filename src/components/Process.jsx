import { Search, PenLine, GitBranch, Rocket } from 'lucide-react'
import FadeIn from './FadeIn'
import SectionHeader from './SectionHeader'
import { useLang } from '../i18n'

const STEP_ICONS = [
  <Search    key="search" size={16} strokeWidth={1.75} aria-hidden="true" />,
  <PenLine   key="pen"    size={16} strokeWidth={1.75} aria-hidden="true" />,
  <GitBranch key="git"    size={16} strokeWidth={1.75} aria-hidden="true" />,
  <Rocket    key="rocket" size={16} strokeWidth={1.75} aria-hidden="true" />,
]

export default function Process() {
  const { t } = useLang()

  return (
    <section id="proceso" className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader
          label={t.process.label}
          title={t.process.title}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y lg:divide-y-0 lg:divide-x divide-opus-pergamino-border sm:gap-x-8 lg:gap-x-0">
          {t.process.steps.map((step, i) => (
            <FadeIn key={step.title} delay={i * 80}>
              <div className={`group py-8 lg:py-0 lg:px-10 ${i === 0 ? 'lg:pl-0' : ''} ${i === 3 ? 'lg:pr-0' : ''}`}>
                <div className="flex items-center justify-between mb-5">
                  <span
                    className="block text-[56px] font-bold leading-none tabular-nums select-none transition-colors duration-300 text-opus-acento/[0.28]"
                    aria-hidden="true"
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="text-opus-acento opacity-50 group-hover:opacity-100 transition-opacity duration-300">
                    {STEP_ICONS[i]}
                  </span>
                </div>
                <h3 className="font-bold text-opus-texto text-[17px] mb-2 group-hover:text-opus-prusia transition-colors duration-300">
                  {step.title}
                </h3>
                <p className="text-opus-texto-muted text-sm leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>

      </div>
    </section>
  )
}
