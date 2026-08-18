import { Sun, Moon, Languages } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";
import { useLanguage } from "../../context/LanguageContext";

export default function PreferenceToggles({ className = "" }) {
  const { theme, toggleTheme } = useTheme();
  const { lang, toggleLang } = useLanguage();

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <button
        onClick={toggleLang}
        aria-label="Toggle language"
        className="flex h-9 items-center gap-1.5 rounded-full border border-forest/15 dark:border-line px-3 text-xs font-semibold text-ink transition-colors hover:border-emerald hover:text-emerald"
      >
        <Languages size={14} />
        {lang === "en" ? "हिंदी" : "English"}
      </button>
      <button
        onClick={toggleTheme}
        aria-label="Toggle dark mode"
        className="flex h-9 w-9 items-center justify-center rounded-full border border-forest/15 dark:border-line text-ink transition-colors hover:border-emerald hover:text-emerald"
      >
        {theme === "dark" ? <Sun size={15} /> : <Moon size={15} />}
      </button>
    </div>
  );
}
