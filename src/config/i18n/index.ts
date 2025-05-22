// i18n.ts
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import * as Localization from "expo-localization";

import en from "@i18n/locales/en/translation";
import es from "@i18n/locales/es/translation";

const resources = {
  en: { translation: en },
  es: { translation: es },
};


const fallbackLng = "es";


const supportedLngs = ["en", "es"];

const rawLocale = typeof Localization.locale === "string" ? Localization.locale : fallbackLng;
const deviceLng = rawLocale.split("-")[0];


const lng = supportedLngs.includes(deviceLng) ? deviceLng : fallbackLng;


i18n.use(initReactI18next).init({
  resources,
  lng,
  fallbackLng,
  interpolation: {
    escapeValue: false, 
  },
});

export default i18n;
