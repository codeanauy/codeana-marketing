import { LangProvider } from './i18n'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Services from './components/Services'
import Process from './components/Process'
import MissionVisionValues from './components/MissionVisionValues'
import Footer from './components/Footer'

export default function App() {
  return (
    <LangProvider>
      <Navbar />
      <main>
        <Hero />
        <Services />
        <Process />
        <MissionVisionValues />
      </main>
      <Footer />
    </LangProvider>
  )
}
