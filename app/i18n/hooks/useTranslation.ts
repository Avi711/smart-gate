import { useCallback, useEffect, useState } from "react";
import en from "../dictionaries/en.json";
import he from "../dictionaries/he.json";

const dictionaries = {
  en,
  he,
} as const;

export type Language = "en" | "he";
type Dictionary = typeof en;
type NestedKeys<T> = T extends object
  ? {
      [K in keyof T]: K extends string
        ? T[K] extends object
          ? `${K}.${NestedKeys<T[K]>}`
          : K
        : never;
    }[keyof T]
  : never;

type TranslationKey = NestedKeys<Dictionary>;

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

// Create a global store for the current language
let currentLanguage: Language =
  typeof window !== "undefined"
    ? (localStorage.getItem("language") as Language) || "en"
    : "en";

// Create a list of subscribers
const subscribers = new Set<(lang: Language) => void>();

// Function to notify all subscribers
const notifySubscribers = (lang: Language) => {
  subscribers.forEach((subscriber) => subscriber(lang));
};

export function useTranslation() {
  const [language, setLanguage] = useState<Language>(currentLanguage);

  useEffect(() => {
    // Subscribe to language changes
    const handleLanguageChange = (newLang: Language) => {
      setLanguage(newLang);
    };

    subscribers.add(handleLanguageChange);

    return () => {
      subscribers.delete(handleLanguageChange);
    };
  }, []);

  useEffect(() => {
    document.documentElement.dir = language === "he" ? "rtl" : "ltr";
    document.documentElement.lang = language;
  }, [language]);

  const t = useCallback(
    (key: TranslationKey) => {
      const dictionary = dictionaries[language];
      return getNestedValue(dictionary, key);
    },
    [language]
  );

  const changeLanguage = useCallback((newLang: Language) => {
    currentLanguage = newLang;
    localStorage.setItem("language", newLang);
    notifySubscribers(newLang);
  }, []);

  return {
    t,
    language,
    changeLanguage,
  };
}
