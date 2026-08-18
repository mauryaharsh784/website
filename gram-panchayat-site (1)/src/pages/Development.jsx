import { useState, useMemo } from "react";
import PageHeader from "../components/ui/PageHeader";
import FilterButtons from "../components/ui/FilterButtons";
import DevelopmentCard from "../components/ui/DevelopmentCard";
import { developmentWorks, developmentStatuses } from "../data/developmentWorks";
import { useLanguage } from "../context/LanguageContext";

export default function Development() {
  const { t } = useLanguage();
  const [status, setStatus] = useState("All");

  const statusOptions = developmentStatuses.map((s) => ({ value: s, label: t(`categories.${s}`) }));

  const filtered = useMemo(
    () => developmentWorks.filter((p) => status === "All" || p.status === status),
    [status]
  );

  return (
    <div>
      <PageHeader
        title={t("pageHeaders.development.title")}
        breadcrumb={t("nav.development")}
        description={t("pageHeaders.development.description")}
        image="https://images.unsplash.com/photo-1516156008625-3a9d6067fab5?auto=format&fit=crop&w=1400&q=80"
      />

      <section className="mx-auto max-w-7xl px-6 py-16 sm:px-10">
        <FilterButtons options={statusOptions} active={status} onChange={setStatus} />

        {filtered.length === 0 ? (
          <div className="mt-16 rounded-3xl border border-dashed border-forest/20 p-16 text-center text-ink/50">
            {t("common.noResults")}
          </div>
        ) : (
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((p) => (
              <DevelopmentCard key={p.id} project={p} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
