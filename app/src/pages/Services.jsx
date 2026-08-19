import PageHeader from "../components/ui/PageHeader";
import SectionHeading from "../components/ui/SectionHeading";
import ServiceCard from "../components/ui/ServiceCard";
import { services } from "../data/services";
import { useLanguage } from "../context/LanguageContext";

export default function Services() {
  const { t } = useLanguage();

  return (
    <div className="w-full overflow-hidden">
      <PageHeader
        title={t("pageHeaders.services.title")}
        breadcrumb={t("nav.services")}
        description={t("pageHeaders.services.description")}
        image="https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=1400&q=80"
      />

      <section className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-10 lg:py-20">
        <SectionHeading
          eyebrow={t("servicesSection.eyebrow")}
          title={t("pageHeaders.services.title")}
          description={t("servicesSection.needHelpText")}
        />

        <div className="mt-8 grid grid-cols-1 gap-5 sm:mt-10 sm:grid-cols-2 lg:mt-12 lg:grid-cols-4">
          {services.map((s) => (
            <ServiceCard key={s.id} service={s} />
          ))}
        </div>
      </section>
    </div>
  );
}