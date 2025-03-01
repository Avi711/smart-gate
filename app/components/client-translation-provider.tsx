"use client";

import {
  createContext,
  useContext,
  useCallback,
  useEffect,
  useState,
  ReactNode,
} from "react";
import en from "../i18n/dictionaries/en.json";
import he from "../i18n/dictionaries/he.json";

const dictionaries = {
  en,
  he,
} as const;

export type Language = "en" | "he";
type Dictionary = typeof en;

const TranslationContext = createContext<{
  t: (key: string) => string;
  language: Language;
  changeLanguage: (lang: Language) => void;
} | null>(null);

// Helper function to get nested object value by path
const getNestedValue = (obj: Dictionary, path: string): string => {
  const result = path.split(".").reduce((acc: unknown, part) => {
    if (acc && typeof acc === "object" && part in acc) {
      return (acc as Record<string, unknown>)[part];
    }
    return path;
  }, obj);

  return typeof result === "string" ? result : path;
};

export function ClientTranslationProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [language, setLanguage] = useState<Language>("en");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const storedLanguage = localStorage.getItem("language") as Language;
    if (storedLanguage) {
      setLanguage(storedLanguage);
    }
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      document.documentElement.dir = language === "he" ? "rtl" : "ltr";
      document.documentElement.lang = language;
    }
  }, [language, mounted]);

  const t = useCallback(
    (key: string) => {
      const dictionary = dictionaries[language];
      return getNestedValue(dictionary, key);
    },
    [language]
  );

  const changeLanguage = useCallback((newLang: Language) => {
    setLanguage(newLang);
    localStorage.setItem("language", newLang);
  }, []);

  return (
    <TranslationContext.Provider value={{ t, language, changeLanguage }}>
      {children}
    </TranslationContext.Provider>
  );
}

export function useTranslation() {
  const context = useContext(TranslationContext);
  if (!context) {
    throw new Error("useTranslation must be used within a TranslationProvider");
  }
  return context;
}
