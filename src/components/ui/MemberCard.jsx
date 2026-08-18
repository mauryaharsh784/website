export default function MemberCard({ member }) {
  return (
    <div className="group rounded-3xl border border-forest/10 bg-surface p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_48px_-28px_rgba(15,61,46,0.35)]">
      <div className="mx-auto h-24 w-24 overflow-hidden rounded-full ring-4 ring-panel">
        <img src={member.image} alt={member.name} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
      </div>
      <h3 className="font-display mt-4 text-base font-semibold text-heading">{member.name}</h3>
      <p className="mt-0.5 text-sm text-saffron">{member.role}</p>
      <p className="mt-1 font-mono text-[11px] uppercase tracking-wide text-ink/50">{member.ward}</p>
    </div>
  );
}
