import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { LanguageContext } from '@/hooks/use-language';

export const LanguageProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const { i18n } = useTranslation();
  const [language, setLanguage] = useState(i18n.language);

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
    setLanguage(lang);
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};
