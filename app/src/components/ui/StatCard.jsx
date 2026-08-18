export default function StatCard({ value, label, delay = 0 }) {
  return (
    <div
      className="animate-fade-up rounded-3xl border border-forest/10 bg-surface px-6 py-8 text-center shadow-[0_20px_40px_-24px_rgba(15,61,46,0.25)]"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="font-display text-4xl sm:text-5xl font-semibold text-accent">{value}</div>
      <div className="mt-2 font-mono text-xs uppercase tracking-[0.15em] text-ink/60">{label}</div>
    </div>
  );
}
