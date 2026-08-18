import { Link } from "react-router-dom";
import {
  Sprout,
  MapPin,
  Phone,
  Mail,
  Clock,
  Rss,
  MessageCircle,
  Send,
} from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();

  const quickLinks = [
    [t("nav.home"), "/"],
    [t("nav.about"), "/about"],
    [t("nav.panchayat"), "/panchayat"],
    [t("nav.schemes"), "/schemes"],
    [t("nav.development"), "/development"],
  ];

  const serviceLinks = [
    [t("nav.notices"), "/notices"],
    [t("nav.documents"), "/documents"],
    [t("nav.grievance"), "/grievance"],
    [t("nav.services"), "/services"],
    [t("nav.gallery"), "/gallery"],
  ];

  return (
    <footer className="bg-forest-dark text-cream/80">
      <div className="mx-auto max-w-7xl px-6 py-16 sm:px-10">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link to="/" className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-saffron text-white">
                <Sprout size={20} strokeWidth={1.75} />
              </span>

              <span className="flex flex-col leading-tight">
                <span className="font-display text-lg font-semibold text-cream">
                  Gram Panchayat
                </span>

                <span className="font-mono text-[11px] uppercase tracking-wide text-saffron-light">
                  Gondwa
                </span>
              </span>
            </Link>

            <p className="mt-4 text-sm leading-relaxed text-cream/60">
              {t("footer.description")}
            </p>

            <div className="mt-5 flex gap-3">
              {[Rss, MessageCircle, Send].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-cream/15 text-cream/70 transition-colors hover:border-saffron hover:text-saffron-light"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-display text-sm font-semibold uppercase tracking-wide text-cream">
              {t("footer.quickLinks")}
            </h4>

            <ul className="mt-4 space-y-2.5 text-sm">
              {quickLinks.map(([label, to]) => (
                <li key={to}>
                  <Link
                    to={to}
                    className="text-cream/60 transition-colors hover:text-saffron-light"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display text-sm font-semibold uppercase tracking-wide text-cream">
              {t("footer.citizenServices")}
            </h4>

            <ul className="mt-4 space-y-2.5 text-sm">
              {serviceLinks.map(([label, to]) => (
                <li key={to}>
                  <Link
                    to={to}
                    className="text-cream/60 transition-colors hover:text-saffron-light"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display text-sm font-semibold uppercase tracking-wide text-cream">
              {t("footer.contact")}
            </h4>

            <ul className="mt-4 space-y-3 text-sm text-cream/60">
              <li className="flex gap-2.5">
                <MapPin
                  size={16}
                  className="mt-0.5 shrink-0 text-saffron-light"
                />
                Panchayat Bhavan, Gondwa, Gonda, UP 271001
              </li>

              <li className="flex gap-2.5">
                <Phone size={16} className="shrink-0 text-saffron-light" />
                +91 8299307415
              </li>

              <li className="flex gap-2.5">
                <Mail size={16} className="shrink-0 text-saffron-light" />
                office@gpgondwa.gov.in
              </li>

              <li className="flex gap-2.5">
                <Clock size={16} className="shrink-0 text-saffron-light" />
                {t("topbar.hours")}
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-cream/10">
        <div className="mx-auto flex max-w-7xl items-center justify-center px-6 py-6 text-xs text-cream/50 sm:px-10">
          <span>{t("footer.copyright")}</span>
        </div>
      </div>
    </footer>
  );
}