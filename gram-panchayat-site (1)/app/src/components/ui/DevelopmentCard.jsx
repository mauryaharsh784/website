import StatusBadge from "./StatusBadge";
import { MapPin, IndianRupee, CalendarDays } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";

export default function DevelopmentCard({ project }) {
  const { t } = useLanguage();
  return (
    <div className="group overflow-hidden rounded-3xl border border-forest/10 dark:border-line bg-surface transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_28px_55px_-28px_rgba(15,61,46,0.4)]">
      <div className="relative h-48 overflow-hidden">
        <img
          src={project.image}
          alt={project.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-forest-dark/70 via-forest-dark/0 to-transparent" />
        <div className="absolute left-4 top-4">
          <StatusBadge status={project.status} />
        </div>
      </div>
      <div className="p-6">
        <h3 className="font-display text-lg font-semibold text-heading">{project.name}</h3>
        <div className="mt-3 space-y-1.5 text-sm text-ink/65">
          <div className="flex items-center gap-2">
            <MapPin size={14} className="text-saffron" /> {project.location}
          </div>
          <div className="flex items-center gap-2">
            <IndianRupee size={14} className="text-saffron" /> {project.cost}
          </div>
          <div className="flex items-center gap-2">
            <CalendarDays size={14} className="text-saffron" /> {project.completionDate}
          </div>
        </div>
        {project.status === "Ongoing" && (
          <div className="mt-4">
            <div className="flex justify-between font-mono text-[11px] text-ink/50">
              <span>{t("developmentSection.progress")}</span>
              <span>{project.progress}%</span>
            </div>
            <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-panel">
              <div
                className="h-full rounded-full bg-gradient-to-r from-emerald to-saffron transition-all duration-700"
                style={{ width: `${project.progress}%` }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
