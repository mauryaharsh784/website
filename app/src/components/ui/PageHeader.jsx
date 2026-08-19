import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";

export default function PageHeader({
  title,
  description,
  breadcrumb,
  image,
}) {
  const { t } = useLanguage();

  return (
    <div className="relative flex min-h-[260px] w-full items-end overflow-hidden sm:min-h-[300px] md:min-h-[320px]">
      {/* Background Image */}
      <img
        src={image}
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-forest-dark via-forest-dark/75 to-forest-dark/40" />

      {/* Content */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-8 sm:px-6 sm:pb-10 lg:px-10">
        
        {/* Breadcrumb */}
        <div className="flex min-w-0 flex-wrap items-center gap-1.5 font-mono text-[11px] text-cream/70 sm:text-xs">
          <Link
            to="/"
            className="shrink-0 transition-colors hover:text-saffron-light"
          >
            {t("nav.home")}
          </Link>

          <ChevronRight size={12} className="shrink-0" />

          <span className="break-words text-saffron-light">
            {breadcrumb}
          </span>
        </div>

        {/* Title */}
        <h1 className="mt-2 break-words font-display text-2xl font-semibold leading-tight text-cream sm:mt-3 sm:text-4xl md:text-5xl">
          {title}
        </h1>

        {/* Description */}
        {description && (
          <p className="mt-2 max-w-xl break-words text-xs leading-relaxed text-cream/75 sm:mt-3 sm:text-base">
            {description}
          </p>
        )}
      </div>
    </div>
  );
}