import { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, X, Sprout } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";
import PreferenceToggles from "../ui/PreferenceToggles";

const navKeys = [
  { to: "/", key: "nav.home" },
  { to: "/about", key: "nav.about" },
  { to: "/panchayat", key: "nav.panchayat" },
  { to: "/schemes", key: "nav.schemes" },
  { to: "/development", key: "nav.development" },
  { to: "/notices", key: "nav.notices" },
  { to: "/services", key: "nav.services" },
  { to: "/gallery", key: "nav.gallery" },
  { to: "/grievance", key: "nav.grievance" },
  { to: "/family", key: "nav.family" },
  { to: "/contact", key: "nav.contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const { t } = useLanguage();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);

    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-surface/90 shadow-[0_4px_24px_-8px_rgba(15,61,46,0.15)] backdrop-blur-md"
          : "bg-page"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3.5 sm:px-10">
        <Link to="/" className="flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-forest text-cream shadow-md">
            <Sprout size={20} strokeWidth={1.75} />
          </span>

          <span className="flex flex-col leading-tight">
            <span className="font-display text-lg font-semibold text-heading">
              Gram Panchayat
            </span>

            <span className="font-mono text-[11px] uppercase tracking-wide text-saffron">
              Gondwa
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 xl:flex">
          {navKeys.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === "/"}
              className={({ isActive }) =>
                `rounded-full px-3.5 py-2 text-[13.5px] font-medium transition-colors duration-200 ${
                  isActive
                    ? "text-emerald"
                    : "text-ink/70 hover:text-accent"
                }`
              }
            >
              {t(l.key)}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <PreferenceToggles className="hidden md:flex" />

          <Link
            to="/services"
            className="hidden rounded-full bg-saffron px-5 py-2.5 text-sm font-semibold text-white shadow-[0_8px_20px_-8px_rgba(221,124,52,0.6)] transition-all duration-300 hover:bg-saffron-light hover:-translate-y-0.5 md:inline-flex"
          >
            {t("nav.citizenServices")}
          </Link>

          <button
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-forest/15 dark:border-line text-accent xl:hidden"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      <div
        className={`overflow-hidden transition-all duration-300 xl:hidden ${
          open
            ? "max-h-[640px] border-t border-forest/10 dark:border-line"
            : "max-h-0"
        }`}
      >
        <nav className="flex flex-col gap-1 bg-surface px-6 py-4">
          {navKeys.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === "/"}
              className={({ isActive }) =>
                `rounded-xl px-4 py-2.5 text-sm font-medium ${
                  isActive
                    ? "bg-emerald/10 text-emerald"
                    : "text-ink/70"
                }`
              }
            >
              {t(l.key)}
            </NavLink>
          ))}

          <div className="mt-3 flex items-center justify-between gap-3 border-t border-forest/10 dark:border-line pt-4">
            <PreferenceToggles />
          </div>

          <Link
            to="/services"
            className="mt-2 rounded-full bg-saffron px-5 py-3 text-center text-sm font-semibold text-white"
          >
            {t("nav.citizenServices")}
          </Link>
        </nav>
      </div>
    </header>
  );
}