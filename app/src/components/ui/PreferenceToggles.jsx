import { Sun, Moon, Languages } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";
import { useLanguage } from "../../context/LanguageContext";

export default function PreferenceToggles({ className = "" }) {
  const { theme, toggleTheme } = useTheme();
  const { lang, toggleLang } = useLanguage();

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {/* Language */}
      <button
        type="button"
        onClick={toggleLang}
        aria-label="Toggle language"
        className="flex h-9 shrink-0 items-center gap-1.5 rounded-full border border-forest/15 px-2.5 text-[11px] font-semibold text-ink transition-colors hover:border-emerald hover:text-emerald sm:px-3 sm:text-xs dark:border-line"
      >
        <Languages size={14} className="shrink-0" />

        <span className="whitespace-nowrap">
          {lang === "en" ? "हिंदी" : "English"}
        </span>
      </button>

      {/* Dark Mode */}
      <button
        type="button"
        onClick={toggleTheme}
        aria-label="Toggle dark mode"
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-forest/15 text-ink transition-colors hover:border-emerald hover:text-emerald dark:border-line"
      >
        {theme === "dark" ? (
          <Sun size={15} />
        ) : (
          <Moon size={15} />
        )}
      </button>
    </div>
  );
}