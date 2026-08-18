import { Link } from "react-router-dom";
import {
  ChevronDown,
  Landmark,
  Hammer,
  Bell,
  MessageSquareWarning,
  FileStack,
  HeartHandshake,
  MapPinned,
  ShieldCheck,
  Leaf,
  HandHeart,
  MapPin,
  Phone,
  Mail,
  Clock,
  ArrowRight,
  Quote,
} from "lucide-react";

import Button from "../components/ui/Button";
import SectionHeading from "../components/ui/SectionHeading";
import StatCard from "../components/ui/StatCard";
import QuickActionCard from "../components/ui/QuickActionCard";
import SchemeCard from "../components/ui/SchemeCard";
import NoticeCard from "../components/ui/NoticeCard";
import DevelopmentCard from "../components/ui/DevelopmentCard";
import ServiceCard from "../components/ui/ServiceCard";
import ContactCard from "../components/ui/ContactCard";

import { useLanguage } from "../context/LanguageContext";

import { sarpanch } from "../data/members";
import { schemes } from "../data/schemes";
import { notices } from "../data/notices";
import { developmentWorks } from "../data/developmentWorks";
import { services } from "../data/services";

const quickActionIcons = [
  Landmark,
  Hammer,
  Bell,
  MessageSquareWarning,
  FileStack,
  HeartHandshake,
];

const quickActionRoutes = [
  "/schemes",
  "/development",
  "/notices",
  "/grievance",
  "/documents",
  "/services",
];

const aboutFeatureIcons = [
  ShieldCheck,
  Leaf,
  HandHeart,
];

const GOOGLE_MAPS_URL =
  "https://www.google.com/maps/place/Godwa+ghat+Ram+avtar+purwa+kali+mata+mandir/@27.0804701,81.9570943,17z/data=!3m1!4b1!4m6!3m5!1s0x3999f1ce484649df:0x512586917ed7c92e!8m2!3d27.0804653!4d81.9596692!16s%2Fg%2F11t_gvt03j?entry=ttu";

export default function Home() {
  const { t, lang } = useLanguage();

  const stats = [
    {
      value: "2,345+",
      label: t("stats.population"),
    },
    {
      value: "512+",
      label: t("stats.households"),
    },
    {
      value: "07",
      label: t("stats.wards"),
    },
    {
      value: "18",
      label: t("stats.projects"),
    },
    {
      value: "12",
      label: t("stats.members"),
    },
  ];

  const aboutFeatures = [
    t("about.feature1"),
    t("about.feature2"),
    t("about.feature3"),
  ];

  const grievanceFeatures = [
    t("grievanceSection.feature1"),
    t("grievanceSection.feature2"),
    t("grievanceSection.feature3"),
  ];

  const quickActions = t("quickActions.items").map((item, i) => ({
    ...item,
    icon: quickActionIcons[i],
    to: quickActionRoutes[i],
  }));

  return (
    <div>

      {/* ================= HERO ================= */}
      <section className="relative flex min-h-[92vh] items-center overflow-hidden">

        <img
          src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1600&q=80"
          alt="Gondwa village fields"
          className="absolute inset-0 h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-forest-dark/95 via-forest-dark/75 to-forest-dark/40" />

        <div className="absolute inset-0 bg-gradient-to-t from-forest-dark/80 via-transparent to-transparent" />

        <div className="relative z-10 mx-auto grid w-full max-w-7xl gap-10 px-6 py-28 sm:px-10 lg:grid-cols-[1.3fr_0.9fr] lg:items-center">

          <div
            className="animate-fade-up"
            key={lang}
          >
            <span className="inline-flex items-center rounded-full border border-cream/25 bg-white/10 px-4 py-1.5 font-mono text-xs uppercase tracking-[0.15em] text-saffron-light backdrop-blur-sm">
              {t("hero.badge")}
            </span>

            <h1 className="font-display mt-6 text-4xl font-semibold leading-[1.08] text-cream sm:text-5xl md:text-6xl">
              {t("hero.titleLine1")}
              <br />
              {t("hero.titleLine2")}
            </h1>

            <p className="font-display mt-3 text-xl text-saffron-light sm:text-2xl">
              {t("hero.villageName")}
            </p>

            <p className="mt-5 max-w-lg text-base leading-relaxed text-cream/80">
              {t("hero.description")}
            </p>

            <div className="mt-9 flex flex-wrap gap-4">

              <Button
                as={Link}
                to="/panchayat"
                variant="primary"
                arrow
                className="group"
              >
                {t("hero.explore")}
              </Button>

              <Button
                as={Link}
                to="/services"
                variant="outline"
              >
                {t("hero.services")}
              </Button>

            </div>
          </div>


          {/* SARPANCH CARD */}
          <div
            className="glass hidden animate-fade-up rounded-3xl p-6 lg:block"
            style={{ animationDelay: "200ms" }}
          >

            <span className="font-mono text-[11px] uppercase tracking-wide text-saffron-light">
              {t("hero.sarpanchLabel")}
            </span>

            <div className="mt-4 flex items-center gap-4">

              <img
                src={sarpanch.image}
                alt={sarpanch.name}
                className="h-16 w-16 rounded-full object-cover ring-2 ring-white/30"
              />

              <div>
                <div className="font-display text-base font-semibold text-cream">
                  {sarpanch.name}
                </div>

                <div className="text-xs text-cream/70">
                  {t("hero.sarpanchRole")}
                </div>
              </div>

            </div>

            <p className="mt-4 text-sm italic leading-relaxed text-cream/85">
              "{sarpanch.message}"
            </p>

          </div>

        </div>

        <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 animate-bounce text-cream/70">
          <ChevronDown size={26} />
        </div>

      </section>


      {/* ================= QUICK ACTIONS ================= */}
      <section className="relative z-20 mx-auto -mt-16 max-w-7xl px-6 sm:px-10">

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">

          {quickActions.map((qa, i) => (
            <QuickActionCard
              key={qa.title}
              {...qa}
              delay={i * 80}
            />
          ))}

        </div>

      </section>


      {/* ================= STATISTICS ================= */}
      <section className="mx-auto max-w-7xl px-6 py-24 sm:px-10">

        <SectionHeading
          eyebrow={t("stats.eyebrow")}
          title={t("stats.title")}
          description={t("stats.description")}
        />

        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">

          {stats.map((s, i) => (
            <StatCard
              key={s.label}
              value={s.value}
              label={s.label}
              delay={i * 80}
            />
          ))}

        </div>

      </section>


      {/* ================= ABOUT ================= */}
      <section className="bg-surface py-24">

        <div className="mx-auto grid max-w-7xl gap-14 px-6 sm:px-10 lg:grid-cols-2 lg:items-center">

          <div className="relative">

            <img
              src="https://images.unsplash.com/photo-1596397249129-c7a8f8a97b6a?auto=format&fit=crop&w=900&q=80"
              alt="Gondwa village"
              className="h-[420px] w-full rounded-3xl object-cover shadow-[0_30px_60px_-24px_rgba(15,61,46,0.35)]"
            />

            <div className="glass absolute -bottom-6 left-6 rounded-2xl px-5 py-3 text-cream">

              <span className="font-mono text-xs uppercase tracking-wide">
                {t("about.badge")}
              </span>

            </div>

          </div>


          <div>

            <span className="font-mono text-xs uppercase tracking-[0.2em] text-saffron">
              {t("about.eyebrow")}
            </span>

            <h2 className="font-display mt-3 text-3xl font-semibold leading-tight text-heading sm:text-4xl">
              {t("about.title")}
            </h2>

            <p className="mt-5 text-base leading-relaxed text-ink/70">
              {t("about.text")}
            </p>


            <div className="mt-7 space-y-3">

              {aboutFeatures.map((text, i) => {

                const Icon = aboutFeatureIcons[i];

                return (
                  <div
                    key={text}
                    className="flex items-center gap-3"
                  >

                    <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald/10 text-emerald">
                      <Icon
                        size={17}
                        strokeWidth={1.75}
                      />
                    </span>

                    <span className="text-sm font-medium text-heading">
                      {text}
                    </span>

                  </div>
                );
              })}

            </div>


            <Button
              as={Link}
              to="/about"
              variant="ghost"
              className="mt-8 px-0 group"
            >
              {t("about.knowMore")}

              <ArrowRight
                size={16}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />

            </Button>

          </div>

        </div>

      </section>


      {/* ================= SARPANCH MESSAGE ================= */}
      <section className="relative overflow-hidden bg-panel py-24">

        <div className="pointer-events-none absolute -left-24 top-10 h-64 w-64 rounded-full bg-emerald/10" />

        <div className="pointer-events-none absolute -right-16 bottom-0 h-72 w-72 rounded-full bg-saffron/10" />

        <div className="relative mx-auto grid max-w-6xl gap-12 px-6 sm:px-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">

          <img
            src={sarpanch.image}
            alt={sarpanch.name}
            className="mx-auto h-72 w-72 rounded-3xl object-cover shadow-[0_30px_60px_-24px_rgba(15,61,46,0.3)] sm:h-96 sm:w-80"
          />

          <div>

            <Quote
              size={40}
              className="text-saffron/40"
            />

            <h2 className="font-display mt-2 text-2xl font-semibold text-heading sm:text-3xl">
              {t("sarpanchSection.title")}
            </h2>

            <p className="font-display mt-5 text-xl italic leading-relaxed text-heading/85 sm:text-2xl">
              "{sarpanch.message}"
            </p>

            <div className="mt-6">

              <div className="font-display text-lg font-semibold text-heading">
                {sarpanch.name}
              </div>

              <div className="text-sm text-saffron">
                {t("sarpanchSection.designation")}
              </div>

            </div>

          </div>

        </div>

      </section>


      {/* ================= SCHEMES ================= */}
      <section className="mx-auto max-w-7xl px-6 py-24 sm:px-10">

        <div className="flex flex-wrap items-end justify-between gap-6">

          <SectionHeading
            eyebrow={t("schemesSection.eyebrow")}
            title={t("schemesSection.title")}
            description={t("schemesSection.description")}
          />

          <Button
            as={Link}
            to="/schemes"
            variant="outlineDark"
            arrow
            className="group shrink-0"
          >
            {t("schemesSection.viewAll")}
          </Button>

        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">

          {schemes.slice(0, 6).map((s) => (
            <SchemeCard
              key={s.id}
              scheme={s}
            />
          ))}

        </div>

      </section>


      {/* ================= DEVELOPMENT ================= */}
      <section className="bg-surface py-24">

        <div className="mx-auto max-w-7xl px-6 sm:px-10">

          <div className="flex flex-wrap items-end justify-between gap-6">

            <SectionHeading
              eyebrow={t("developmentSection.eyebrow")}
              title={t("developmentSection.title")}
              description={t("developmentSection.description")}
            />

            <Button
              as={Link}
              to="/development"
              variant="outlineDark"
              arrow
              className="shrink-0"
            >
              {t("developmentSection.viewAll")}
            </Button>

          </div>


          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">

            {developmentWorks.slice(0, 3).map((p) => (
              <DevelopmentCard
                key={p.id}
                project={p}
              />
            ))}

          </div>

        </div>

      </section>


      {/* ================= NOTICES ================= */}
      <section className="mx-auto max-w-7xl px-6 py-24 sm:px-10">

        <SectionHeading
          eyebrow={t("noticesSection.eyebrow")}
          title={t("noticesSection.title")}
        />

        <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-2">

          <NoticeCard
            notice={notices.find((n) => n.featured)}
            featured
          />

          <div className="space-y-4">

            {notices
              .filter((n) => !n.featured)
              .slice(0, 4)
              .map((n) => (
                <NoticeCard
                  key={n.id}
                  notice={n}
                />
              ))}

          </div>

        </div>

        <div className="mt-8 text-center">

          <Button
            as={Link}
            to="/notices"
            variant="ghost"
            arrow
            className="group mx-auto"
          >
            {t("noticesSection.viewAll")}
          </Button>

        </div>

      </section>


      {/* ================= CITIZEN SERVICES ================= */}
      <section className="bg-surface py-24">

        <div className="mx-auto max-w-7xl px-6 sm:px-10">

          <div className="flex flex-wrap items-end justify-between gap-6">

            <SectionHeading
              eyebrow={t("servicesSection.eyebrow")}
              title={t("servicesSection.title")}
            />

            <div className="max-w-xs rounded-2xl border border-forest/10 bg-panel p-4">

              <div className="font-display text-sm font-semibold text-heading">
                {t("servicesSection.needHelp")}
              </div>

              <div className="mt-1 text-xs text-ink/60">
                {t("servicesSection.needHelpText")}
              </div>

            </div>

          </div>


          <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">

            {services.map((s) => (
              <ServiceCard
                key={s.id}
                service={s}
              />
            ))}

          </div>

        </div>

      </section>


      {/* ================= GRIEVANCE ================= */}
      <section className="mx-auto max-w-7xl px-6 py-24 sm:px-10">

        <div className="grid gap-12 rounded-[2.5rem] bg-forest p-10 sm:p-14 lg:grid-cols-2 lg:items-center">

          <div>

            <span className="font-mono text-xs uppercase tracking-[0.2em] text-saffron-light">
              {t("grievanceSection.eyebrow")}
            </span>

            <h2 className="font-display mt-3 text-3xl font-semibold text-cream sm:text-4xl">
              {t("grievanceSection.title")}
            </h2>

            <p className="mt-4 text-cream/75">
              {t("grievanceSection.text")}
            </p>

            <div className="mt-6 space-y-3">

              {grievanceFeatures.map((f) => (
                <div
                  key={f}
                  className="flex items-center gap-3 text-sm text-cream/85"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-saffron-light" />

                  {f}
                </div>
              ))}

            </div>

            <Button
              as={Link}
              to="/grievance"
              variant="primary"
              arrow
              className="mt-8 group"
            >
              {t("grievanceSection.cta")}
            </Button>

          </div>


          <div className="glass rounded-3xl p-8">

            <MessageSquareWarning
              size={32}
              className="text-saffron-light"
            />

            <div className="mt-5 space-y-3">

              <div className="h-3 w-3/4 rounded-full bg-white/25" />
              <div className="h-3 w-full rounded-full bg-white/15" />
              <div className="h-3 w-5/6 rounded-full bg-white/15" />

            </div>

            <div className="mt-6 flex items-center justify-between rounded-xl bg-white/10 p-4">

              <span className="font-mono text-xs text-cream/70">
                {t("grievanceSection.refLabel")}
              </span>

              <span className="font-mono text-sm font-semibold text-saffron-light">
                GP-2026-00124
              </span>

            </div>

          </div>

        </div>

      </section>


      {/* ================= VILLAGE MAP ================= */}
      {/* ================= VILLAGE MAP ================= */}
<section className="bg-surface py-24">
  <div className="mx-auto max-w-7xl px-6 sm:px-10">

    <SectionHeading
      eyebrow={t("mapSection.eyebrow")}
      title={t("mapSection.title")}
    />

    <div className="mt-12 grid gap-6 lg:grid-cols-[1.4fr_1fr]">

      {/* GOOGLE MAP */}
      <div className="h-[400px] overflow-hidden rounded-3xl border border-forest/10 bg-panel sm:h-[500px]">
        <iframe
          title="Gondwa Village Location"
          src="https://www.google.com/maps?q=27.0804653,81.9596692&z=17&output=embed"
          className="block h-full w-full border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>

      {/* CONTACT INFORMATION */}
      <div className="flex flex-col justify-center space-y-4">

        <ContactCard
          icon={MapPin}
          label={t("mapSection.addressLabel")}
          value="Panchayat Bhavan, Gondwa, Gonda, Uttar Pradesh 271001"
        />

        <ContactCard
          icon={Phone}
          label={t("mapSection.phoneLabel")}
          value="+91 8299307415"
        />

        <ContactCard
          icon={Mail}
          label={t("mapSection.emailLabel")}
          value="office@gpgondwa.gov.demo"
        />

        <ContactCard
          icon={Clock}
          label={t("mapSection.hoursLabel")}
          value={t("topbar.hours")}
        />

        {/* GET DIRECTIONS */}
        <a
          href={GOOGLE_MAPS_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-forest px-5 py-3 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-emerald"
        >
          <MapPinned size={17} />

          {t("mapSection.getDirections")}

          <ArrowRight size={16} />
        </a>

      </div>
    </div>
  </div>
</section>

      {/* ================= CTA ================= */}
      <section className="relative overflow-hidden bg-forest-dark py-24">

        <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-emerald/20 blur-3xl" />

        <div className="pointer-events-none absolute -left-16 bottom-0 h-56 w-56 rounded-full bg-saffron/15 blur-3xl" />

        <div className="relative mx-auto max-w-3xl px-6 text-center sm:px-10">

          <h2 className="font-display text-3xl font-semibold text-cream sm:text-4xl">
            {t("ctaSection.title")}
          </h2>

          <p className="mt-4 text-cream/75">
            {t("ctaSection.description")}
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">

            <Button
              as={Link}
              to="/services"
              variant="primary"
              arrow
            >
              {t("ctaSection.exploreServices")}
            </Button>

            <Button
              as={Link}
              to="/contact"
              variant="outline"
            >
              {t("ctaSection.contactPanchayat")}
            </Button>

          </div>

        </div>

      </section>

    </div>
  );
}