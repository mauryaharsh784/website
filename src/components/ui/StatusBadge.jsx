import { useLanguage } from "../../context/LanguageContext";

const styles = {
  Completed: "bg-emerald/10 text-emerald border-emerald/30",
  Ongoing: "bg-saffron/10 text-saffron border-saffron/30",
  Upcoming: "bg-forest/10 text-accent border-forest/30",
};

export default function StatusBadge({ status }) {
  const { t } = useLanguage();
  return (
    <span
      className={`inline-flex items-center rounded-full border px-3 py-1 font-mono text-[11px] font-medium uppercase tracking-wide ${
        styles[status] || styles.Upcoming
      }`}
    >
      {t(`categories.${status}`)}
    </span>
  );
}
