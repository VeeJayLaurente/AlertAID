import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "../app/locales/en.json";
import ceb from "../app/locales/ceb.json";

const resources = {
  en: { translation: en },
  ceb: { translation: ceb },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en", // Default language
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
