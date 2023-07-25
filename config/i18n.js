import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import enTranslation from '../../jury-lookup-frontend/locales/en.json';
import esTranslation from '../../jury-lookup-frontend/locales/es.json';

i18next.use(initReactI18next).init({
  resources: {
    en: { translation: enTranslation },
    es: { translation: esTranslation }
  },
  lng: 'en', //default language
  fallbackLng: 'en',
  interpolation: { escapeValue: false }
});

export default i18next;
 