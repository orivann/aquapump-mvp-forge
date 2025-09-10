import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: true,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
    resources: {
      en: {
        translation: {
          nav: {
            home: "Home",
            products: "Products",
            services: "Services",
            about: "About",
            contact: "Contact",
            get_quote: "Get Quote"
          },
          hero: {
            title: "AquaPump Industries",
            subtitle: "A new force in industrial pumping solutions, backed by a legacy of excellence. We engineer reliability for your most demanding applications."
          }
        }
      },
      he: {
        translation: {
          nav: {
            home: "בית",
            products: "מוצרים",
            services: "שירותים",
            about: "אודות",
            contact: "צור קשר",
            get_quote: "הצעת מחיר"
          },
          hero: {
            title: "אקווה-פאמפ תעשיות",
            subtitle: "כוח חדש בתחום פתרונות השאיבה התעשייתיים, עם גב של מצוינות. אנו מהנדסים אמינות ליישומים התובעניים ביותר שלך."
          }
        }
      }
    }
  });

export default i18n;
