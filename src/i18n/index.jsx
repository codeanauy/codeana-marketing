import { createContext, useContext, useState, useEffect } from 'react'
import { es } from './es'
import { en } from './en'

const TRANSLATIONS = { es, en }

const LangContext = createContext({ lang: 'es', t: es, setLang: () => {} })

export function LangProvider({ children }) {
  const [lang, setLang] = useState('es')

  const titles = { es: 'Codeana | Desarrollo de Software', en: 'Codeana | Software Development' }

  useEffect(() => {
    document.documentElement.lang = lang
    document.title = titles[lang]
  }, [lang])

  return (
    <LangContext.Provider value={{ lang, t: TRANSLATIONS[lang], setLang }}>
      {children}
    </LangContext.Provider>
  )
}

export function useLang() {
  return useContext(LangContext)
}
