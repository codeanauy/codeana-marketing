import FadeIn from './FadeIn'
import SectionHeader from './SectionHeader'
import { useLang } from '../i18n'

const SLOTS = Array.from({ length: 8 }, (_, i) => i + 1)

export default function Clients() {
  const { t } = useLang()

  return (
    <section id="clientes" className="bg-white py-24">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader
          index={3}
          label={t.clients.label}
          title={t.clients.title}
        />

        <FadeIn>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {SLOTS.map((n) => (
              <div
                key={n}
                className="flex items-center justify-center h-20 bg-opus-pergamino border border-opus-pergamino-border rounded hover:border-opus-prusia-border transition-colors cursor-default"
                aria-label={`${t.clients.slot_aria} ${n}`}
              >
                <span className="text-opus-texto-light text-sm font-medium select-none">
                  {t.clients.placeholder}
                </span>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
