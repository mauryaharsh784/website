import { ArrowRight } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";

function formatDate(dateStr, lang) {
  const d = new Date(dateStr);
  return d.toLocaleDateString(lang === "hi" ? "hi-IN" : "en-IN", { day: "2-digit", month: "short", year: "numeric" });
}

export default function NoticeCard({ notice, featured = false }) {
  const { t, lang } = useLanguage();

  if (featured) {
    return (
      <div className="relative flex h-full flex-col justify-between overflow-hidden rounded-3xl bg-forest p-8 text-cream shadow-[0_28px_60px_-24px_rgba(15,61,46,0.55)]">
        <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-saffron/20 blur-2xl" />
        <div>
          <span className="rounded-full bg-saffron px-3 py-1 font-mono text-[11px] uppercase tracking-wide text-white">
            {t("noticesSection.latest")}
          </span>
          <div className="mt-5 font-mono text-xs uppercase tracking-wide text-cream/60">{formatDate(notice.date, lang)}</div>
          <h3 className="font-display mt-2 text-2xl font-semibold leading-snug">{notice.title}</h3>
          <p className="mt-3 text-sm leading-relaxed text-cream/75">{notice.summary}</p>
        </div>
        <button className="group mt-8 flex items-center gap-1.5 text-sm font-semibold text-saffron-light">
          {t("noticesSection.readFull")}
          <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1" />
        </button>
      </div>
    );
  }

  return (
    <div className="group flex items-start gap-4 rounded-2xl border border-forest/10 dark:border-line bg-surface p-5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_32px_-20px_rgba(15,61,46,0.3)]">
      <div className="flex min-w-[64px] flex-col items-center rounded-xl bg-panel px-3 py-2 text-center">
        <span className="font-display text-lg font-semibold text-accent">{new Date(notice.date).getDate()}</span>
        <span className="font-mono text-[10px] uppercase text-ink/50">
          {new Date(notice.date).toLocaleDateString("en-IN", { month: "short" })}
        </span>
      </div>
      <div className="flex-1">
        <span className="font-mono text-[10px] uppercase tracking-wide text-saffron">{t(`categories.${notice.category}`)}</span>
        <h4 className="font-display mt-1 text-[15px] font-semibold leading-snug text-heading">{notice.title}</h4>
      </div>
      <ArrowRight size={16} className="mt-1 shrink-0 text-ink/30 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-saffron" />
    </div>
  );
}
