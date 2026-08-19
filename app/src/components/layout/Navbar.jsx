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

  /* ================= SCROLL ================= */
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 12);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  /* ================= CLOSE MENU ON ROUTE CHANGE ================= */
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  /* ================= LOCK BODY SCROLL ================= */
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "bg-surface/95 shadow-[0_4px_24px_-8px_rgba(15,61,46,0.15)] backdrop-blur-md"
          : "bg-page"
      }`}
    >
      {/* =====================================================
          NAVBAR
      ====================================================== */}
      <div className="mx-auto flex min-h-[60px] w-full max-w-7xl items-center justify-between gap-2 px-3 py-2 sm:min-h-[68px] sm:px-6 sm:py-3 lg:px-10">

        {/* ================= LOGO ================= */}
        <Link
          to="/"
          className="flex min-w-0 flex-1 items-center gap-2 sm:gap-3"
        >
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-forest text-cream shadow-md sm:h-11 sm:w-11">
            <Sprout
              size={18}
              strokeWidth={1.75}
              className="sm:h-5 sm:w-5"
            />
          </span>

          <span className="flex min-w-0 flex-col leading-tight">
            <span className="truncate font-display text-sm font-semibold text-heading sm:text-lg">
              Gram Panchayat
            </span>

            <span className="font-mono text-[9px] uppercase tracking-wide text-saffron sm:text-[11px]">
              Gondwa
            </span>
          </span>
        </Link>

        {/* ================= DESKTOP NAV ================= */}
        <nav className="hidden items-center gap-1 xl:flex">
          {navKeys.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === "/"}
              className={({ isActive }) =>
                `rounded-full px-3 py-2 text-[13px] font-medium transition-colors duration-200 ${
                  isActive
                    ? "text-emerald"
                    : "text-ink/70 hover:text-accent"
                }`
              }
            >
              {t(item.key)}
            </NavLink>
          ))}
        </nav>

        {/* ================= RIGHT SIDE ================= */}
        <div className="flex shrink-0 items-center gap-2 sm:gap-3">

          {/* Preferences - desktop */}
          <PreferenceToggles className="hidden lg:flex" />

          {/* Citizen Services - desktop/tablet */}
          <Link
            to="/services"
            className="hidden rounded-full bg-saffron px-4 py-2 text-sm font-semibold text-white shadow-[0_8px_20px_-8px_rgba(221,124,52,0.6)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-saffron-light md:inline-flex"
          >
            {t("nav.citizenServices")}
          </Link>

          {/* ================= MOBILE MENU BUTTON ================= */}
          <button
            type="button"
            onClick={() => setOpen((prev) => !prev)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-forest/15 text-accent transition-colors hover:bg-emerald/10 dark:border-line xl:hidden"
          >
            {open ? (
              <X size={20} />
            ) : (
              <Menu size={20} />
            )}
          </button>
        </div>
      </div>

      {/* =====================================================
          MOBILE MENU
      ====================================================== */}
      <div
        className={`absolute left-0 right-0 top-full z-50 overflow-hidden border-t border-forest/10 bg-surface shadow-xl transition-all duration-300 dark:border-line xl:hidden ${
          open
            ? "visible max-h-[calc(100vh-60px)] opacity-100"
            : "invisible max-h-0 opacity-0"
        }`}
      >
        <nav className="max-h-[calc(100vh-60px)] overflow-y-auto overscroll-contain px-4 py-4 sm:px-6">

          {/* Navigation links */}
          {navKeys.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === "/"}
              className={({ isActive }) =>
                `mb-1 block rounded-xl px-4 py-3 text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-emerald/10 text-emerald"
                    : "text-ink/70 hover:bg-emerald/5"
                }`
              }
            >
              {t(item.key)}
            </NavLink>
          ))}

          {/* Preferences */}
          <div className="mt-3 border-t border-forest/10 pt-4 dark:border-line">
            <PreferenceToggles />
          </div>

          {/* Citizen Services */}
          <Link
            to="/services"
            className="mt-3 block rounded-full bg-saffron px-5 py-3 text-center text-sm font-semibold text-white transition-colors hover:bg-saffron-light"
          >
            {t("nav.citizenServices")}
          </Link>
        </nav>
      </div>
    </header>
  );
}