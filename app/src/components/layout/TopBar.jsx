import { Phone, Mail, Clock } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";

export default function TopBar() {
  const { t } = useLanguage();

  return (
    <div className="hidden bg-forest-dark text-cream/80 sm:block">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-2 text-xs sm:px-10">
        <div className="flex items-center gap-5">
          <span className="flex items-center gap-1.5">
            <Phone size={12} /> +91 8299307415
          </span>

          <span className="flex items-center gap-1.5">
            <Mail size={12} /> office@gpgondwa.gov.demo
          </span>
        </div>

        <span className="flex items-center gap-1.5">
          <Clock size={12} /> {t("topbar.hours")}
        </span>
      </div>
    </div>
  );
}
