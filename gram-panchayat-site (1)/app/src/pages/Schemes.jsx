import { useState, useMemo } from "react";
import PageHeader from "../components/ui/PageHeader";
import SearchBar from "../components/ui/SearchBar";
import FilterButtons from "../components/ui/FilterButtons";
import SchemeCard from "../components/ui/SchemeCard";
import { schemes, schemeCategories } from "../data/schemes";
import { useLanguage } from "../context/LanguageContext";

export default function Schemes() {
  const { t } = useLanguage();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");

  const categoryOptions = schemeCategories.map((c) => ({ value: c, label: t(`categories.${c}`) }));

  const filtered = useMemo(() => {
    return schemes.filter((s) => {
      const matchesCategory = category === "All" || s.category === category;
      const matchesQuery = s.name.toLowerCase().includes(query.toLowerCase());
      return matchesCategory && matchesQuery;
    });
  }, [query, category]);

  return (
    <div>
      <PageHeader
        title={t("pageHeaders.schemes.title")}
        breadcrumb={t("nav.schemes")}
        description={t("pageHeaders.schemes.description")}
        image="https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=1400&q=80"
      />

      <section className="mx-auto max-w-7xl px-6 py-16 sm:px-10">
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
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((s) => (
              <SchemeCard key={s.id} scheme={s} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
