import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "../languages/eng.json";
import ru from "../languages/rus.json";
import arab from "../languages/arab.json";
import tjk from "../languages/tjk.json";
import uzb from "../languages/uzb.json";


const savedLang = localStorage.getItem("lang") || "ru";

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      ru: { translation: ru },
      uz: { translation: uzb },
      tj: { translation: tjk },
      arab: { translation: arab },
    },
    lng: savedLang,
    fallbackLng: "ru",
    interpolation: {
      escapeValue: false,
    },
  });

export const changeLanguage = (lng) => {
  if (!lng) return;
  i18n.changeLanguage(lng);
  localStorage.setItem("lang", lng);
  console.log("Language changed to:", lng);
};

export default i18n;
