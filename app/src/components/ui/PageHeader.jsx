import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";

export default function PageHeader({ title, description, breadcrumb, image }) {
  const { t } = useLanguage();
  return (
    <div className="relative flex h-[280px] items-end overflow-hidden sm:h-[320px]">
      <img src={image} alt="" className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-forest-dark via-forest-dark/75 to-forest-dark/40" />
      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-10 sm:px-10">
        <div className="flex items-center gap-1.5 font-mono text-xs text-cream/70">
          <Link to="/" className="hover:text-saffron-light">{t("nav.home")}</Link>
          <ChevronRight size={12} />
          <span className="text-saffron-light">{breadcrumb}</span>
        </div>
        <h1 className="font-display mt-3 text-3xl font-semibold text-cream sm:text-4xl md:text-5xl">{title}</h1>
        {description && <p className="mt-3 max-w-xl text-sm text-cream/75 sm:text-base">{description}</p>}
      </div>
    </div>
  );
}
