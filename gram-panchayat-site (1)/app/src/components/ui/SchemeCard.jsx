import * as Icons from "lucide-react";
import { useState } from "react";
import Modal from "./Modal";
import { useLanguage } from "../../context/LanguageContext";

export default function SchemeCard({ scheme }) {
  const [open, setOpen] = useState(false);
  const { t } = useLanguage();
  const Icon = Icons[scheme.icon] || Icons.Landmark;

  return (
    <>
      <div className="group flex h-full flex-col rounded-3xl border border-forest/10 dark:border-line bg-surface p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_48px_-28px_rgba(15,61,46,0.35)]">
        <div className="flex items-start justify-between">
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-forest/8 text-accent">
            <Icon size={22} strokeWidth={1.75} />
          </span>
          <span className="rounded-full bg-saffron/10 px-3 py-1 font-mono text-[11px] uppercase tracking-wide text-saffron">
            {t(`categories.${scheme.category}`)}
          </span>
        </div>
        <h3 className="font-display mt-5 text-lg font-semibold text-heading">{scheme.name}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-ink/65">{scheme.description}</p>
        <button
          onClick={() => setOpen(true)}
          className="group/btn mt-5 flex items-center gap-1.5 text-sm font-semibold text-emerald transition-colors hover:text-heading"
        >
          {t("schemesSection.viewDetails")}
          <Icons.ArrowRight size={15} className="transition-transform duration-300 group-hover/btn:translate-x-1" />
        </button>
      </div>

      <Modal open={open} onClose={() => setOpen(false)} title={scheme.name}>
        <div className="space-y-4">
          <span className="inline-flex rounded-full bg-saffron/10 px-3 py-1 font-mono text-[11px] uppercase tracking-wide text-saffron">
            {t(`categories.${scheme.category}`)}
          </span>
          <p className="text-sm leading-relaxed text-ink/70">{scheme.description}</p>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl bg-panel p-4">
              <div className="font-mono text-[11px] uppercase tracking-wide text-ink/50">{t("schemesSection.benefit")}</div>
              <div className="mt-1 text-sm font-medium text-heading">{scheme.benefit}</div>
            </div>
            <div className="rounded-2xl bg-panel p-4">
              <div className="font-mono text-[11px] uppercase tracking-wide text-ink/50">{t("schemesSection.eligibility")}</div>
              <div className="mt-1 text-sm font-medium text-heading">{scheme.eligibility}</div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}
