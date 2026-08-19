import * as Icons from "lucide-react";
import { Link } from "react-router-dom";

export default function ServiceCard({ service }) {
  const Icon = Icons[service.icon] || Icons.FileText;

  return (
    <Link
      to="/grievance"
      className="
        group flex w-full min-w-0 flex-col
        overflow-hidden
        rounded-2xl
        border border-forest/10
        bg-surface
        p-4
        transition-all duration-300
        hover:-translate-y-1
        hover:border-emerald/30
        hover:shadow-[0_20px_40px_-26px_rgba(15,61,46,0.35)]
        sm:p-5
      "
    >
      {/* Icon */}
      <span
        className="
          flex h-10 w-10 shrink-0
          items-center justify-center
          rounded-xl
          bg-emerald/10
          text-emerald
          transition-colors
          group-hover:bg-emerald
          group-hover:text-white
          sm:h-11 sm:w-11
        "
      >
        <Icon
          size={20}
          strokeWidth={1.75}
        />
      </span>

      {/* Title */}
      <h3
        className="
          mt-3
          w-full
          break-words
          [overflow-wrap:anywhere]
          font-display
          text-sm
          font-semibold
          leading-snug
          text-heading
          sm:mt-4
          sm:text-[15px]
        "
      >
        {service.name}
      </h3>

      {/* Description */}
      <p
        className="
          mt-1
          w-full
          break-words
          [overflow-wrap:anywhere]
          text-xs
          leading-relaxed
          text-ink/55
        "
      >
        {service.description}
      </p>

      {/* Processing Time */}
      <span
        className="
          mt-3
          max-w-full
          break-words
          [overflow-wrap:anywhere]
          font-mono
          text-[10px]
          uppercase
          tracking-wide
          text-saffron
        "
      >
        {service.processingTime}
      </span>
    </Link>
  );
}