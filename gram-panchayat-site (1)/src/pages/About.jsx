import PageHeader from "../components/ui/PageHeader";
import SectionHeading from "../components/ui/SectionHeading";
import {
  ShieldCheck,
  Leaf,
  HandHeart,
  Target,
  Eye,
  Users,
  Building2,
  Landmark,
  MapPin,
  ArrowRight,
} from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

const valueIcons = [ShieldCheck, Leaf, HandHeart];

export default function About() {
  const { t } = useLanguage();

  const values = [
    {
      icon: valueIcons[0],
      title: t("aboutPage.value1Title"),
      text: t("aboutPage.value1Text"),
    },
    {
      icon: valueIcons[1],
      title: t("aboutPage.value2Title"),
      text: t("aboutPage.value2Text"),
    },
    {
      icon: valueIcons[2],
      title: t("aboutPage.value3Title"),
      text: t("aboutPage.value3Text"),
    },
  ];

  return (
    <div className="overflow-hidden">

      {/* =====================================================
          PAGE HEADER
      ====================================================== */}
      <PageHeader
        title={t("pageHeaders.about.title")}
        breadcrumb={t("nav.about")}
        description={t("pageHeaders.about.description")}
        image="https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?auto=format&fit=crop&w=1400&q=80"
      />

      {/* =====================================================
          INTRODUCTION / SARPANCH
      ====================================================== */}
      <section className="mx-auto max-w-7xl px-6 py-20 sm:px-10 lg:py-24">
        <div className="grid items-center gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">

          {/* Sarpanch Image */}
          <div className="relative mx-auto w-full max-w-xl">

            {/* Decorative background */}
            <div className="absolute -left-5 -top-5 h-24 w-24 rounded-3xl bg-saffron/10" />

            <div className="absolute -bottom-5 -right-5 h-28 w-28 rounded-3xl bg-emerald/10" />

            {/* Image */}
            <div className="relative overflow-hidden rounded-[2rem] bg-panel shadow-[0_30px_70px_-30px_rgba(15,61,46,0.35)]">
              <img
                src="/image/sarpanch.png"
                alt="Mr. Shanker Saran Maurya - Sarpanch, Gram Panchayat Gondwa"
                className="h-[430px] w-full object-cover object-center sm:h-[500px]"
              />

              {/* Image overlay */}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent p-6 pt-20">
                <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-saffron-light">
                  Gram Panchayat Gondwa
                </p>

                <h3 className="mt-1 font-display text-2xl font-semibold text-white">
                  Mr. Shanker Saran Maurya
                </h3>

                <p className="mt-1 text-sm text-white/75">
                  Sarpanch
                </p>
              </div>
            </div>
          </div>

          {/* Content */}
          <div>

            <span className="font-mono text-xs uppercase tracking-[0.22em] text-saffron">
              {t("aboutPage.storyEyebrow")}
            </span>

            <h2 className="font-display mt-4 max-w-2xl text-3xl font-semibold leading-tight text-heading sm:text-4xl lg:text-5xl">
              {t("aboutPage.storyTitle")}
            </h2>

            <div className="mt-6 space-y-4">
              <p className="text-base leading-8 text-ink/70">
                {t("aboutPage.storyText1")}
              </p>

              <p className="text-base leading-8 text-ink/70">
                {t("aboutPage.storyText2")}
              </p>
            </div>

            {/* Location */}
            <div className="mt-8 flex items-start gap-4 rounded-2xl border border-forest/10 bg-surface p-5 dark:border-line">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald/10 text-emerald">
                <MapPin size={20} />
              </span>

              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-ink/40">
                  Gram Panchayat
                </p>

                <p className="mt-1 font-display text-lg font-semibold text-heading">
                  Gondwa
                </p>

                <p className="mt-1 text-sm text-ink/60">
                  Gonda, Uttar Pradesh
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* =====================================================
          QUICK STATS
      ====================================================== */}
      <section className="border-y border-forest/10 bg-surface dark:border-line">
        <div className="mx-auto grid max-w-7xl grid-cols-2 sm:grid-cols-4">

          {/* Stat 1 */}
          <div className="border-r border-forest/10 px-6 py-10 text-center dark:border-line">
            <Users
              size={25}
              className="mx-auto text-emerald"
            />

            <p className="mt-3 font-display text-2xl font-bold text-heading">
              Community
            </p>

            <p className="mt-1 text-xs uppercase tracking-wide text-ink/45">
              People First
            </p>
          </div>

          {/* Stat 2 */}
          <div className="border-r-0 px-6 py-10 text-center sm:border-r sm:border-forest/10 dark:sm:border-line">
            <Building2
              size={25}
              className="mx-auto text-saffron"
            />

            <p className="mt-3 font-display text-2xl font-bold text-heading">
              Development
            </p>

            <p className="mt-1 text-xs uppercase tracking-wide text-ink/45">
              Village Growth
            </p>
          </div>

          {/* Stat 3 */}
          <div className="border-t border-forest/10 px-6 py-10 text-center sm:border-t-0 sm:border-r sm:border-forest/10 dark:border-line">
            <Landmark
              size={25}
              className="mx-auto text-emerald"
            />

            <p className="mt-3 font-display text-2xl font-bold text-heading">
              Governance
            </p>

            <p className="mt-1 text-xs uppercase tracking-wide text-ink/45">
              Transparent
            </p>
          </div>

          {/* Stat 4 */}
          <div className="border-t border-forest/10 px-6 py-10 text-center sm:border-t-0 dark:border-line">
            <ShieldCheck
              size={25}
              className="mx-auto text-saffron"
            />

            <p className="mt-3 font-display text-2xl font-bold text-heading">
              सेवा
            </p>

            <p className="mt-1 text-xs uppercase tracking-wide text-ink/45">
              Public Service
            </p>
          </div>

        </div>
      </section>

      {/* =====================================================
          MISSION & VISION
      ====================================================== */}
      <section className="mx-auto max-w-7xl px-6 py-20 sm:px-10 lg:py-24">

        <SectionHeading
          eyebrow="Our Direction"
          title="Building a better Gondwa together"
          align="center"
        />

        <div className="mt-12 grid gap-7 lg:grid-cols-2">

          {/* Mission */}
          <div className="group relative overflow-hidden rounded-[2rem] border border-forest/10 bg-surface p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-line sm:p-10">

            <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-emerald/5 transition-transform duration-500 group-hover:scale-150" />

            <div className="relative">
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald/10 text-emerald">
                <Target size={27} />
              </span>

              <h3 className="font-display mt-6 text-2xl font-semibold text-heading">
                {t("aboutPage.missionTitle")}
              </h3>

              <p className="mt-4 max-w-xl text-sm leading-7 text-ink/65">
                {t("aboutPage.missionText")}
              </p>

              <div className="mt-7 flex items-center gap-2 text-sm font-semibold text-emerald">
                People • Progress • Participation
                <ArrowRight size={16} />
              </div>
            </div>
          </div>

          {/* Vision */}
          <div className="group relative overflow-hidden rounded-[2rem] border border-forest/10 bg-surface p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-line sm:p-10">

            <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-saffron/5 transition-transform duration-500 group-hover:scale-150" />

            <div className="relative">
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-saffron/10 text-saffron">
                <Eye size={27} />
              </span>

              <h3 className="font-display mt-6 text-2xl font-semibold text-heading">
                {t("aboutPage.visionTitle")}
              </h3>

              <p className="mt-4 max-w-xl text-sm leading-7 text-ink/65">
                {t("aboutPage.visionText")}
              </p>

              <div className="mt-7 flex items-center gap-2 text-sm font-semibold text-saffron">
                Inclusive • Sustainable • Developed
                <ArrowRight size={16} />
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* =====================================================
          VALUES
      ====================================================== */}
      <section className="bg-surface py-20 dark:border-y dark:border-line sm:py-24">
        <div className="mx-auto max-w-7xl px-6 sm:px-10">

          <SectionHeading
            eyebrow={t("aboutPage.valuesEyebrow")}
            title={t("aboutPage.valuesTitle")}
            align="center"
          />

          <div className="mt-12 grid gap-6 md:grid-cols-3">

            {values.map((value) => {
              const Icon = value.icon;

              return (
                <div
                  key={value.title}
                  className="group rounded-[1.75rem] border border-forest/10 bg-page p-8 text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_45px_-25px_rgba(15,61,46,0.4)] dark:border-line"
                >

                  <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald/10 text-emerald transition-transform duration-300 group-hover:scale-110">
                    <Icon
                      size={24}
                      strokeWidth={1.75}
                    />
                  </span>

                  <h3 className="font-display mt-5 text-xl font-semibold text-heading">
                    {value.title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-ink/60">
                    {value.text}
                  </p>

                </div>
              );
            })}

          </div>
        </div>
      </section>

      {/* =====================================================
          COMMUNITY MESSAGE
      ====================================================== */}
      <section className="mx-auto max-w-7xl px-6 py-20 sm:px-10 lg:py-24">
        <div className="relative overflow-hidden rounded-[2rem] bg-forest px-7 py-12 text-center text-cream shadow-[0_25px_60px_-25px_rgba(15,61,46,0.5)] sm:px-12 sm:py-16">

          {/* Decorative circles */}
          <div className="absolute -left-16 -top-16 h-40 w-40 rounded-full bg-white/5" />
          <div className="absolute -bottom-20 -right-10 h-52 w-52 rounded-full bg-saffron/10" />

          <div className="relative mx-auto max-w-3xl">

            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-saffron-light">
              Gram Panchayat Gondwa
            </span>

            <h2 className="font-display mt-4 text-3xl font-semibold sm:text-4xl">
              Together for a stronger and better village
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-cream/70 sm:text-base">
              Our goal is to work with every citizen of Gondwa and create a
              transparent, inclusive and progressive village through
              participation, development and public service.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <span className="rounded-full bg-white/10 px-5 py-2 text-xs font-medium">
                जन सहभागिता
              </span>

              <span className="rounded-full bg-white/10 px-5 py-2 text-xs font-medium">
                विकास
              </span>

              <span className="rounded-full bg-white/10 px-5 py-2 text-xs font-medium">
                पारदर्शिता
              </span>

              <span className="rounded-full bg-white/10 px-5 py-2 text-xs font-medium">
                सेवा
              </span>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}