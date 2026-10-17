import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { COPY } from '../data/content.js';

const LangContext = createContext(null);

export function LangProvider({ children }) {
  const [lang, setLang] = useState(() => {
    try { return localStorage.getItem('lang') === 'ar' ? 'ar' : 'en'; } catch { return 'en'; }
  });

  useEffect(() => {
    const root = document.documentElement;
    root.lang = lang;
    root.dir = lang === 'ar' ? 'rtl' : 'ltr';
    try { localStorage.setItem('lang', lang); } catch { /* storage may be unavailable */ }
  }, [lang]);

  const value = useMemo(
    () => ({ lang, t: COPY[lang], toggle: () => setLang((l) => (l === 'en' ? 'ar' : 'en')) }),
    [lang]
  );
  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

export const useLang = () => useContext(LangContext);
