import AsyncStorage from "@react-native-async-storage/async-storage";
import i18n from "i18next";
import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { initReactI18next, useTranslation } from "react-i18next";
import { I18nManager } from "react-native";
import ar from "../translations/ar.json";
import en from "../translations/en.json";

const LANGUAGE_STORAGE_KEY = "app_language_preference";


i18n
  .use(initReactI18next)
  .init({
    compatibilityJSON: "v3",
    lng: "en",
    fallbackLng: "en",
    resources: {
      en: { translation: en },
      ar: { translation: ar },
    },
    interpolation: { escapeValue: false },
  });

const LanguageContext = createContext({
  language: "en",
  isRTL: false,
  toggleLanguage: () => {},
});

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState("en");
  const isRTL = language === "ar";

  useEffect(() => {
    (async () => {
      // Always default to English on app start
      setLanguage("en");
      i18n.changeLanguage("en");
      I18nManager.allowRTL(false);
      I18nManager.forceRTL(false);
      
      // Note: Saved preference is ignored to ensure English is always the default
      // Users can still toggle to Arabic using the language toggle button
      // If you want to restore saved preference, uncomment the code below:
      /*
      try {
        const saved = await AsyncStorage.getItem(LANGUAGE_STORAGE_KEY);
        if (saved === "ar") {
          setLanguage("ar");
          i18n.changeLanguage("ar");
          I18nManager.allowRTL(true);
          I18nManager.forceRTL(true);
        }
      } catch (error) {
        console.error("Error loading language preference:", error);
      }
      */
    })();
  }, []);

  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language]);

  const toggleLanguage = useCallback(async () => {
    const next = language === "en" ? "ar" : "en";
    setLanguage(next);
    await AsyncStorage.setItem(LANGUAGE_STORAGE_KEY, next);
    const shouldRTL = next === "ar";
    if (I18nManager.isRTL !== shouldRTL) {
      I18nManager.allowRTL(shouldRTL);
      I18nManager.forceRTL(shouldRTL);

    }
  }, [language]);

  const value = useMemo(() => ({ language, isRTL, toggleLanguage }), [language, isRTL, toggleLanguage]);
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

export const useLanguage = () => useContext(LanguageContext);
export const useT = () => useTranslation().t;



