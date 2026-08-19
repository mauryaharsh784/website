
import { Link } from "react-router-dom";
import { MapPin, Phone, Mail } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="border-t border-forest/10 bg-surface dark:border-line">
      <div className="mx-auto max-w-7xl px-6 py-12 sm:px-10 lg:px-12">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">

          {/* Panchayat */}
          <div>
            <h3 className="text-lg font-bold text-heading">
              Gram Panchayat Gondwa
            </h3>

            <p className="mt-4 text-sm leading-6 text-ink/60">
              Digital platform of Gram Panchayat Gondwa for
              citizen services, schemes, development works
              and grievance redressal.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-heading">
              {t("footer.quickLinks") || "Quick Links"}
            </h3>

            <div className="mt-4 space-y-3">
              <Link
                to="/"
                className="block text-sm text-ink/60 transition-colors hover:text-emerald"
              >
                {t("nav.home") || "Home"}
              </Link>

              <Link
                to="/about"
                className="block text-sm text-ink/60 transition-colors hover:text-emerald"
              >
                {t("nav.about") || "About"}
              </Link>

              <Link
                to="/services"
                className="block text-sm text-ink/60 transition-colors hover:text-emerald"
              >
                {t("nav.services") || "Services"}
              </Link>

              <Link
                to="/grievance"
                className="block text-sm text-ink/60 transition-colors hover:text-emerald"
              >
                {t("nav.grievance") || "Grievance"}
              </Link>
            </div>
          </div>

          {/* Citizen Services */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-heading">
              {t("footer.citizenServices") || "Citizen Services"}
            </h3>

            <div className="mt-4 space-y-3">
              <Link
                to="/services"
                className="block text-sm text-ink/60 transition-colors hover:text-emerald"
              >
                {t("nav.citizenServices") || "Citizen Services"}
              </Link>

              <Link
                to="/schemes"
                className="block text-sm text-ink/60 transition-colors hover:text-emerald"
              >
                {t("nav.schemes") || "Schemes"}
              </Link>

              <Link
                to="/works"
                className="block text-sm text-ink/60 transition-colors hover:text-emerald"
              >
                {t("nav.works") || "Development Works"}
              </Link>

              <Link
                to="/notices"
                className="block text-sm text-ink/60 transition-colors hover:text-emerald"
              >
                {t("nav.notices") || "Notices"}
              </Link>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-heading">
              {t("footer.contact") || "Contact"}
            </h3>

            <div className="mt-4 space-y-4">

              <div className="flex items-start gap-3">
                <MapPin
                  size={18}
                  className="mt-0.5 shrink-0 text-emerald"
                />

                <p className="text-sm leading-6 text-ink/60">
                  Gram Panchayat Gondwa
                  <br />
                  Uttar Pradesh, India
                </p>
              </div>

              <div className="flex items-center gap-3">
                <Phone
                  size={18}
                  className="shrink-0 text-emerald"
                />

                <span className="text-sm text-ink/60">
                  Panchayat Office
                </span>
              </div>

              <div className="flex items-center gap-3">
                <Mail
                  size={18}
                  className="shrink-0 text-emerald"
                />

                <span className="text-sm text-ink/60">
                  Official Panchayat Contact
                </span>
              </div>

            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-10 flex flex-col gap-3 border-t border-forest/10 pt-6 dark:border-line sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-ink/50">
            © {new Date().getFullYear()} Gram Panchayat Gondwa.
            All rights reserved.
          </p>

          <div className="flex gap-5">
            <Link
              to="/privacy"
              className="text-xs text-ink/50 transition-colors hover:text-emerald"
            >
              Privacy Policy
            </Link>

            <Link
              to="/terms"
              className="text-xs text-ink/50 transition-colors hover:text-emerald"
            >
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
