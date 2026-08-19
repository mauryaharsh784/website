import {
  createContext,
  useContext,
  useEffect,
  useState,
  useMemo,
} from "react";

import { translations } from "../data/translations";

const LanguageContext = createContext(null);

function getInitialLang() {
  if (typeof window === "undefined") {
    return "en";
  }

  const saved = localStorage.getItem("gp-lang");

  return saved === "hi" ? "hi" : "en";
}

function getByPath(obj, path) {
  return path
    .split(".")
    .reduce(
      (acc, key) =>
        acc && acc[key] !== undefined ? acc[key] : undefined,
      obj
    );
}

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(getInitialLang);

  useEffect(() => {
    localStorage.setItem("gp-lang", lang);
    document.documentElement.lang = lang;
  }, [lang]);

  function toggleLang() {
    setLang((currentLang) =>
      currentLang === "en" ? "hi" : "en"
    );
  }

  const t = useMemo(() => {
    return (path) => {
      const value = getByPath(translations[lang], path);

      if (value !== undefined) {
        return value;
      }

      const fallback = getByPath(translations.en, path);

      return fallback !== undefined ? fallback : path;
    };
  }, [lang]);

  return (
    <LanguageContext.Provider
      value={{
        lang,
        toggleLang,
        setLang,
        t,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);

  if (!ctx) {
    throw new Error(
      "useLanguage must be used within a LanguageProvider"
    );
  }

  return ctx;
}