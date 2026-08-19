
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function QuickActionCard({
  icon: Icon,
  title,
  description,
  to,
  delay = 0,
}) {
  return (
    <Link
      to={to}
      className="
        group relative flex min-w-0 flex-col
        rounded-3xl
        border border-forest/10
        bg-surface
        p-5 sm:p-6
        shadow-[0_20px_45px_-28px_rgba(15,61,46,0.35)]
        transition-all duration-300
        hover:-translate-y-1.5
        hover:shadow-[0_28px_55px_-24px_rgba(15,61,46,0.4)]
        focus-visible:outline-none
        focus-visible:ring-2
        focus-visible:ring-saffron
        focus-visible:ring-offset-2
      "
      style={{
        animationDelay: `${delay}ms`,
      }}
    >
      <div className="flex min-w-0 items-center justify-between gap-3">
        <span
          className="
            flex h-11 w-11 shrink-0
            items-center justify-center
            rounded-2xl
            bg-emerald/10
            text-emerald
            transition-colors duration-300
            group-hover:bg-emerald
            group-hover:text-white
            sm:h-12 sm:w-12
          "
        >
          {Icon && <Icon size={21} strokeWidth={1.75} />}
        </span>

        <ArrowUpRight
          size={18}
          className="
            shrink-0
            text-ink/30
            transition-all duration-300
            group-hover:-translate-y-0.5
            group-hover:translate-x-0.5
            group-hover:text-saffron
          "
        />
      </div>

      <h3
        className="
          mt-4
          break-words
          font-display
          text-base font-semibold
          leading-snug
          text-heading
          sm:mt-5 sm:text-lg
        "
      >
        {title}
      </h3>

      <p
        className="
          mt-1.5
          break-words
          text-sm
          leading-relaxed
          text-ink/60
        "
      >
        {description}
      </p>
    </Link>
  );
}

