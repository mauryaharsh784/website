import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function QuickActionCard({ icon: Icon, title, description, to, delay = 0 }) {
  return (
    <Link
      to={to}
      className="group animate-fade-up relative flex flex-col rounded-3xl border border-forest/10 bg-surface p-6 shadow-[0_20px_45px_-28px_rgba(15,61,46,0.35)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_28px_55px_-24px_rgba(15,61,46,0.4)]"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex items-center justify-between">
        <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald/10 text-emerald transition-colors duration-300 group-hover:bg-emerald group-hover:text-white">
          <Icon size={22} strokeWidth={1.75} />
        </span>
        <ArrowUpRight
          size={18}
          className="text-ink/30 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-saffron"
        />
      </div>
      <h3 className="font-display mt-5 text-lg font-semibold text-heading">{title}</h3>
      <p className="mt-1.5 text-sm leading-relaxed text-ink/60">{description}</p>
    </Link>
  );
}
