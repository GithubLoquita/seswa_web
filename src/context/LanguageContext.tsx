import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language } from '../types';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations: Record<string, Record<Language, string>> = {
  'site_name': {
    en: "Santal Engineering Students' Welfare Association (W.B.)",
    ol: "ᱥᱟᱱᱛᱟᱲ ᱤᱱᱡᱤᱱᱤᱭᱟᱨᱤᱝ ᱥᱴᱩᱰᱮᱱᱴᱥ' ᱣᱮᱞᱯᱷᱮᱭᱟᱨ ᱮᱥᱳᱥᱤᱭᱮᱥᱚᱱ (W.B.)"
  },
  'home': { en: 'Home', ol: 'ᱳᱲᱟᱜ' },
  'about': { en: 'About SESWA', ol: 'SESWA ᱵᱟᱵᱚᱛ' },
  'aims': { en: 'Aims & Objectives', ol: 'ᱡᱚᱥ ᱟᱨ ᱩᱫᱽᱫᱮᱥ' },
  'events': { en: 'Events', ol: 'ᱜᱷᱚᱴᱚᱱ' },
  'notice_board': { en: 'Notice Board', ol: 'ᱱᱳᱴᱤᱥ ᱵᱳᱨᱰ' },
  'members': { en: 'Governing Members', ol: 'ᱥᱚᱦᱮᱫ ᱠᱚ' },
  'achievements': { en: 'Achievements', ol: 'ᱡᱤᱛᱠᱟᱹᱨ' },
  'gallery': { en: 'Gallery', ol: 'ᱜᱮᱞᱮᱨᱤ' },
  'contact': { en: 'Contact', ol: 'ᱥᱟᱹᱜᱟᱹᱭ' },
  'login': { en: 'Login', ol: 'ᱞᱚᱜᱤᱱ' },
  'hero_text': {
    en: 'Empowering Santal Engineering Students through unity, support, and cultural preservation since 2003.',
    ol: '᱒᱐᱐᱓ ᱠᱷᱚᱱ ᱥᱟᱱᱛᱟᱲ ᱤᱱᱡᱤᱱᱤᱭᱟᱨᱤᱝ ᱯᱟᱹᱴᱷᱩᱣᱟᱹ ᱠᱚ ᱢᱤᱫ ᱡᱩᱢᱤᱫᱽ, ᱜᱚᱲᱚ, ᱟᱨ ᱞᱟᱠᱪᱟᱨ ᱡᱚᱜᱟᱣ ᱛᱟᱞᱟᱛᱮ ᱫᱟᱲᱮᱭᱟᱱ ᱵᱮᱱᱟᱣ ᱨᱮ ᱾'
  },
  'latest_announcements': { en: 'Latest Announcements', ol: 'ᱱᱟᱣᱟ ᱱᱳᱴᱤᱥ' },
  'view_all': { en: 'View All', ol: 'ᱡᱚᱛᱚ ᱧᱮᱞ' },
  'copyright': { en: '© 2026 Santal Engineering Students\' Welfare Association (W.B.). All Rights Reserved.', ol: '© ᱒᱐᱒᱖ ᱥᱟᱱᱛᱟᱲ ᱤᱱᱡᱤᱱᱤᱭᱟᱨᱤᱝ ᱥᱴᱩᱰᱮᱱᱴᱥ\' ᱣᱮᱞᱯᱷᱮᱭᱟᱨ ᱮᱥᱳᱥᱤᱭᱮᱥᱚᱱ (W.B.) ᱾ ᱡᱚᱛᱚ ᱟᱹᱭᱫᱟᱹᱨ ᱫᱚᱦᱚ ᱟᱠᱟᱱᱟ ᱾' }
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('seswa_lang');
    return (saved as Language) || 'en';
  });

  useEffect(() => {
    localStorage.setItem('seswa_lang', language);
    document.documentElement.lang = language;
  }, [language]);

  const t = (key: string) => {
    return translations[key]?.[language] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within LanguageProvider');
  return context;
};
