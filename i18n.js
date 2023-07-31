import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import enTranslation from "./translations/en.json";
import esTranslation from "./translations/es.json";

i18next.use(initReactI18next).init({
  resources: {
    en: { translation: enTranslation },
    es: { translation: esTranslation },
  },
  lng: "en", //default language
  fallbackLng: "en",
  interpolation: { escapeValue: false },
});

export default i18next;
