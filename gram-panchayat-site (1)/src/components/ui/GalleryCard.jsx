import { Eye } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";

export default function GalleryCard({ item, onClick }) {
  const { t } = useLanguage();
  return (
    <button
      onClick={onClick}
      className="group relative block w-full overflow-hidden rounded-2xl text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-saffron"
    >
      <img
        src={item.image}
        alt={item.title}
        className="h-64 w-full object-cover transition-transform duration-500 group-hover:scale-110"
      />
      <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-forest-dark/85 via-forest-dark/10 to-transparent p-5 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <span className="font-mono text-[10px] uppercase tracking-wide text-saffron-light">{t(`categories.${item.category}`)}</span>
        <h4 className="font-display mt-1 text-sm font-semibold text-white">{item.title}</h4>
        <span className="mt-2 flex items-center gap-1.5 text-xs font-medium text-cream/80">
          <Eye size={13} /> {t("common.viewMore")}
        </span>
      </div>
    </button>
  );
}
