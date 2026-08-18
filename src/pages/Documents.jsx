import { useState, useMemo } from "react";
import PageHeader from "../components/ui/PageHeader";
import SearchBar from "../components/ui/SearchBar";
import FilterButtons from "../components/ui/FilterButtons";
import { documents, documentCategories } from "../data/documents";
import { FileText, Download } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

export default function Documents() {
  const { t, lang } = useLanguage();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("Forms");

  const categoryOptions = documentCategories.map((c) => ({ value: c, label: t(`categories.${c}`) }));

  const filtered = useMemo(() => {
    return documents
      .filter((d) => d.category === category)
      .filter((d) => d.name.toLowerCase().includes(query.toLowerCase()));
  }, [query, category]);

  return (
    <div>
      <PageHeader
        title={t("pageHeaders.documents.title")}
        breadcrumb={t("nav.documents")}
        description={t("pageHeaders.documents.description")}
        image="https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=1400&q=80"
      />

      <section className="mx-auto max-w-5xl px-6 py-16 sm:px-10">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="w-full sm:max-w-xs">
            <SearchBar value={query} onChange={setQuery} placeholder={`${t("common.search")}...`} />
          </div>
          <FilterButtons options={categoryOptions} active={category} onChange={setCategory} />
        </div>

        {filtered.length === 0 ? (
          <div className="mt-16 rounded-3xl border border-dashed border-forest/20 p-16 text-center text-ink/50">
            {t("common.noResults")}
          </div>
        ) : (
          <div className="mt-10 divide-y divide-forest/10 overflow-hidden rounded-3xl border border-forest/10 dark:border-line bg-surface">
            {filtered.map((d) => (
              <div key={d.id} className="flex items-center gap-4 p-5 transition-colors hover:bg-panel">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-saffron/10 text-saffron">
                  <FileText size={20} />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="truncate font-display text-[15px] font-semibold text-heading">{d.name}</div>
                  <div className="mt-0.5 font-mono text-xs text-ink/50">
                    {new Date(d.date).toLocaleDateString(lang === "hi" ? "hi-IN" : "en-IN", { day: "2-digit", month: "short", year: "numeric" })} · {d.size}
                  </div>
                </div>
                <button className="flex shrink-0 items-center gap-1.5 rounded-full bg-forest px-4 py-2 text-xs font-semibold text-cream transition-colors hover:bg-emerald">
                  <Download size={14} /> {t("common.download")}
                </button>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
