import React, { useContext } from 'react';

interface LanguageContextType {
  language: string;
  changeLanguage: (lang: string) => void;
}

export const LanguageContext = React.createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
