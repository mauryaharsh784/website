import { useState, useMemo } from "react";
import PageHeader from "../components/ui/PageHeader";
import SearchBar from "../components/ui/SearchBar";
import FilterButtons from "../components/ui/FilterButtons";
import NoticeCard from "../components/ui/NoticeCard";
import { notices, noticeCategories } from "../data/notices";
import { useLanguage } from "../context/LanguageContext";

export default function Notices() {
  const { t } = useLanguage();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");

  const categoryOptions = noticeCategories.map((c) => ({ value: c, label: t(`categories.${c}`) }));

  const filtered = useMemo(() => {
    return notices
      .filter((n) => category === "All" || n.category === category)
      .filter((n) => n.title.toLowerCase().includes(query.toLowerCase()))
      .sort((a, b) => new Date(b.date) - new Date(a.date));
  }, [query, category]);

  return (
    <div>
      <PageHeader
        title={t("pageHeaders.notices.title")}
        breadcrumb={t("nav.notices")}
        description={t("pageHeaders.notices.description")}
        image="https://images.unsplash.com/photo-1591115765373-5207764f72e7?auto=format&fit=crop&w=1400&q=80"
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
          <div className="mt-10 space-y-4">
            {filtered.map((n) => (
              <NoticeCard key={n.id} notice={n} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
