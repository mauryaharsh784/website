import { useState, useMemo } from "react";
import PageHeader from "../components/ui/PageHeader";
import SearchBar from "../components/ui/SearchBar";
import FilterButtons from "../components/ui/FilterButtons";
import GalleryCard from "../components/ui/GalleryCard";
import Modal from "../components/ui/Modal";
import { gallery, galleryCategories } from "../data/gallery";
import { useLanguage } from "../context/LanguageContext";

export default function Gallery() {
  const { t } = useLanguage();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [active, setActive] = useState(null);

  const categoryOptions = galleryCategories.map((c) => ({ value: c, label: t(`categories.${c}`) }));

  const filtered = useMemo(() => {
    return gallery
      .filter((g) => category === "All" || g.category === category)
      .filter((g) => g.title.toLowerCase().includes(query.toLowerCase()));
  }, [query, category]);

  return (
    <div>
      <PageHeader
        title={t("pageHeaders.gallery.title")}
        breadcrumb={t("nav.gallery")}
        description={t("pageHeaders.gallery.description")}
        image="https://images.unsplash.com/photo-1604423043492-6e0b7c47a06b?auto=format&fit=crop&w=1400&q=80"
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
          <div className="mt-10 columns-1 gap-5 sm:columns-2 lg:columns-3 [&>*]:mb-5">
            {filtered.map((item) => (
              <GalleryCard key={item.id} item={item} onClick={() => setActive(item)} />
            ))}
          </div>
        )}
      </section>

      <Modal open={!!active} onClose={() => setActive(null)} title={active?.title}>
        {active && (
          <div>
            <img src={active.image} alt={active.title} className="w-full rounded-2xl object-cover" />
            <span className="mt-3 inline-block font-mono text-xs uppercase tracking-wide text-saffron">
              {t(`categories.${active.category}`)}
            </span>
          </div>
        )}
      </Modal>
    </div>
  );
}
