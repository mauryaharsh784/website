import PageHeader from "../components/ui/PageHeader";
import SectionHeading from "../components/ui/SectionHeading";
import MemberCard from "../components/ui/MemberCard";
import { members } from "../data/members";
import { useLanguage } from "../context/LanguageContext";

export default function Panchayat() {
  const { t } = useLanguage();

  const structure = [
    { title: t("panchayatPage.gramSabhaTitle"), text: t("panchayatPage.gramSabhaText") },
    { title: t("panchayatPage.gramPanchayatTitle"), text: t("panchayatPage.gramPanchayatText") },
    { title: t("panchayatPage.committeesTitle"), text: t("panchayatPage.committeesText") },
  ];

  return (
    <div>
      <PageHeader
        title={t("pageHeaders.panchayat.title")}
        breadcrumb={t("nav.panchayat")}
        description={t("pageHeaders.panchayat.description")}
        image="https://images.unsplash.com/photo-1591115765373-5207764f72e7?auto=format&fit=crop&w=1400&q=80"
      />

      <section className="mx-auto max-w-7xl px-6 py-20 sm:px-10">
        <SectionHeading
          eyebrow={t("panchayatPage.membersEyebrow")}
          title={t("panchayatPage.membersTitle")}
          description={t("panchayatPage.membersDescription")}
        />
        <div className="mt-12 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
          {members.map((m) => (
            <MemberCard key={m.id} member={m} />
          ))}
        </div>
      </section>

      <section className="bg-surface py-20">
        <div className="mx-auto max-w-5xl px-6 sm:px-10">
          <SectionHeading eyebrow={t("panchayatPage.structureEyebrow")} title={t("panchayatPage.structureTitle")} align="center" />
          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            {structure.map((s, i) => (
              <div key={s.title} className="rounded-3xl border border-forest/10 dark:border-line bg-panel p-7">
                <span className="font-mono text-xs text-saffron">0{i + 1}</span>
                <h3 className="font-display mt-2 text-lg font-semibold text-heading">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink/65">{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
