import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'he';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  isRTL: boolean;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.solutions': 'Solutions',
    'nav.products': 'Products',
    'nav.services': 'Services',
    'nav.about': 'About',
    'nav.contact': 'Contact',
    'nav.getQuote': 'Get Quote',
    'nav.phone': '+1 (555) 123-4567',
    
    // Hero Section
    'hero.title': 'Reliable Industrial Pumping Solutions',
    'hero.subtitle': 'for Every Industry',
    'hero.description': 'Leading provider of industrial pumps and equipment with over 25 years of experience. Trusted by industries worldwide for reliable, efficient pumping solutions.',
    'hero.requestQuote': 'Request a Quote',
    'hero.viewProducts': 'View Products',
    
    // Features
    'features.title': 'Why Choose AquaPump?',
    'features.subtitle': 'We deliver exceptional quality and service that keeps your operations running smoothly.',
    'features.reliable.title': 'Reliable Performance',
    'features.reliable.desc': 'Built to last with premium materials and rigorous quality testing.',
    'features.expert.title': 'Expert Installation',
    'features.expert.desc': 'Professional installation and setup by certified technicians.',
    'features.support.title': '24/7 Support',
    'features.support.desc': 'Round-the-clock technical support and emergency service.',
    'features.certified.title': 'Industry Certified',
    'features.certified.desc': 'All products meet or exceed industry standards and certifications.',
    
    // Products
    'products.title': 'Our Product Categories',
    'products.subtitle': 'Comprehensive range of industrial pumping solutions for every application.',
    'products.centrifugal.title': 'Centrifugal Pumps',
    'products.centrifugal.desc': 'High-efficiency pumps for water transfer and circulation applications.',
    'products.centrifugal.feature1': 'High flow rates',
    'products.centrifugal.feature2': 'Energy efficient',
    'products.centrifugal.feature3': 'Low maintenance',
    'products.submersible.title': 'Submersible Pumps',
    'products.submersible.desc': 'Reliable underwater pumping solutions for various depths and applications.',
    'products.submersible.feature1': 'Waterproof design',
    'products.submersible.feature2': 'Corrosion resistant',
    'products.submersible.feature3': 'Variable speeds',
    'products.custom.title': 'Custom Solutions',
    'products.custom.desc': 'Tailored pumping systems designed for specific industrial requirements.',
    'products.custom.feature1': 'Custom engineering',
    'products.custom.feature2': 'Specialized materials',
    'products.custom.feature3': 'Unique specifications',
    'products.learnMore': 'Learn More',
    
    // Industries
    'industries.title': 'Industries We Serve',
    'industries.subtitle': 'Trusted by leading companies across diverse industries worldwide.',
    'industries.manufacturing': 'Manufacturing',
    'industries.oilGas': 'Oil & Gas',
    'industries.waterTreatment': 'Water Treatment',
    'industries.mining': 'Mining',
    'industries.agriculture': 'Agriculture',
    'industries.construction': 'Construction',
    
    // CTA
    'cta.title': 'Ready to Get Started?',
    'cta.subtitle': 'Contact our team of experts to discuss your pumping requirements and get a custom quote.',
    'cta.getFreeQuote': 'Get Free Quote',
    'cta.viewServices': 'View Services',
  },
  he: {
    // Navigation
    'nav.home': 'בית',
    'nav.solutions': 'פתרונות',
    'nav.products': 'מוצרים',
    'nav.services': 'שירותים',
    'nav.about': 'אודות',
    'nav.contact': 'צור קשר',
    'nav.getQuote': 'קבל הצעת מחיר',
    'nav.phone': '+1 (555) 123-4567',
    
    // Hero Section
    'hero.title': 'פתרונות שאיבה תעשייתיים אמינים',
    'hero.subtitle': 'לכל תעשייה',
    'hero.description': 'ספק מוביל של משאבות וציוד תעשייתי עם למעלה מ-25 שנות ניסיון. נבטח על ידי תעשיות ברחבי העולם עבור פתרונות שאיבה אמינים ויעילים.',
    'hero.requestQuote': 'בקש הצעת מחיר',
    'hero.viewProducts': 'צפה במוצרים',
    
    // Features
    'features.title': 'למה לבחור באקווהפאמפ?',
    'features.subtitle': 'אנו מספקים איכות ושירות יוצאי דופן ששומרים על פעילות חלקה של הפעילות שלך.',
    'features.reliable.title': 'ביצועים אמינים',
    'features.reliable.desc': 'בנוי להחזיק מעמד עם חומרים מתקדמים ובדיקות איכות קפדניות.',
    'features.expert.title': 'התקנה מקצועית',
    'features.expert.desc': 'התקנה והתקנה מקצועית על ידי טכנאים מוסמכים.',
    'features.support.title': 'תמיכה 24/7',
    'features.support.desc': 'תמיכה טכנית מסביב לשעון ושירות חירום.',
    'features.certified.title': 'מוסמך בתעשייה',
    'features.certified.desc': 'כל המוצרים עומדים או עולים על תקני התעשייה וההסמכות.',
    
    // Products
    'products.title': 'קטגוריות המוצרים שלנו',
    'products.subtitle': 'מגוון מקיף של פתרונות שאיבה תעשייתיים לכל יישום.',
    'products.centrifugal.title': 'משאבות צנטריפוגליות',
    'products.centrifugal.desc': 'משאבות יעילות גבוהות להעברת מים ויישומי זרם.',
    'products.centrifugal.feature1': 'קצבי זרימה גבוהים',
    'products.centrifugal.feature2': 'חסכון באנרגיה',
    'products.centrifugal.feature3': 'תחזוקה נמוכה',
    'products.submersible.title': 'משאבות טבולות',
    'products.submersible.desc': 'פתרונות שאיבה תת-מימיים אמינים לעומקים ויישומים שונים.',
    'products.submersible.feature1': 'עיצוב עמיד במים',
    'products.submersible.feature2': 'עמיד בפני קורוזיה',
    'products.submersible.feature3': 'מהירויות משתנות',
    'products.custom.title': 'פתרונות מותאמים',
    'products.custom.desc': 'מערכות שאיבה מותאמות שמתוכננות לדרישות תעשייתיות ספציפיות.',
    'products.custom.feature1': 'הנדסה מותאמת',
    'products.custom.feature2': 'חומרים מיוחדים',
    'products.custom.feature3': 'מפרטים ייחודיים',
    'products.learnMore': 'למד עוד',
    
    // Industries
    'industries.title': 'התעשיות שאנו משרתים',
    'industries.subtitle': 'נבטח על ידי חברות מובילות בתעשיות מגוונות ברחבי העולם.',
    'industries.manufacturing': 'ייצור',
    'industries.oilGas': 'נפט וגז',
    'industries.waterTreatment': 'טיפול במים',
    'industries.mining': 'כרייה',
    'industries.agriculture': 'חקלאות',
    'industries.construction': 'בנייה',
    
    // CTA
    'cta.title': 'מוכן להתחיל?',
    'cta.subtitle': 'צור קשר עם צוות המומחים שלנו כדי לדון בדרישות השאיבה שלך ולקבל הצעת מחיר מותאמת.',
    'cta.getFreeQuote': 'קבל הצעת מחיר חינם',
    'cta.viewServices': 'צפה בשירותים',
  }
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');
  const isRTL = language === 'he';

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['en']] || key;
  };

  useEffect(() => {
    // Update document direction and lang
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
    
    // Update font family based on language
    document.documentElement.style.fontFamily = isRTL 
      ? "'Heebo', -apple-system, BlinkMacSystemFont, sans-serif"
      : "'Inter', -apple-system, BlinkMacSystemFont, sans-serif";
  }, [language, isRTL]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, isRTL, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};