import * as Icons from "lucide-react";
import { Link } from "react-router-dom";

export default function ServiceCard({ service }) {
  const Icon = Icons[service.icon] || Icons.FileText;
  return (
    <Link
      to="/grievance"
      className="group flex flex-col items-start rounded-2xl border border-forest/10 bg-surface p-5 transition-all duration-300 hover:-translate-y-1 hover:border-emerald/30 hover:shadow-[0_20px_40px_-26px_rgba(15,61,46,0.35)]"
    >
      <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald/10 text-emerald transition-colors group-hover:bg-emerald group-hover:text-white">
        <Icon size={20} strokeWidth={1.75} />
      </span>
      <h3 className="font-display mt-4 text-[15px] font-semibold text-heading">{service.name}</h3>
      <p className="mt-1 text-xs leading-relaxed text-ink/55">{service.description}</p>
      <span className="mt-3 font-mono text-[10px] uppercase tracking-wide text-saffron">{service.processingTime}</span>
    </Link>
  );
}
