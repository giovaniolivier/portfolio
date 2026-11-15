import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { translations, type Language, type Translations } from '../constants/translations';

type Theme = 'dark' | 'light';

interface AppContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  theme: Theme;
  toggleTheme: () => void;
  t: Translations;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

function readStorage(key: string): string | null {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

function writeStorage(key: string, value: string) {
  try {
    localStorage.setItem(key, value);
  } catch {
    // Stockage indisponible (navigation privée…) : le choix vaut pour la session.
  }
}

// public/theme-init.js applique déjà ces valeurs avant le premier rendu ;
// on relit les mêmes sources pour que React démarre dans le même état.
function initialLanguage(): Language {
  const saved = readStorage('lang');
  return saved === 'en' || saved === 'fr' ? saved : 'fr';
}

function initialTheme(): Theme {
  const saved = readStorage('theme');
  if (saved === 'light' || saved === 'dark') return saved;
  return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(initialLanguage);
  const [theme, setTheme] = useState<Theme>(initialTheme);

  // Langue du document pour les lecteurs d'écran, la traduction auto et le SEO.
  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  useEffect(() => {
    document.documentElement.classList.toggle('light', theme === 'light');
  }, [theme]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    writeStorage('lang', lang);
  };

  const toggleTheme = () => {
    const next: Theme = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    writeStorage('theme', next);
  };

  return (
    <AppContext.Provider value={{ language, setLanguage, theme, toggleTheme, t: translations[language] }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
}
