export default function FilterButtons({ options, active, onChange }) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((opt) => {
        const value = typeof opt === "string" ? opt : opt.value;
        const label = typeof opt === "string" ? opt : opt.label;
        return (
          <button
            key={value}
            onClick={() => onChange(value)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 ${
              active === value
                ? "bg-forest text-cream shadow-md"
                : "bg-surface text-ink/70 border border-forest/10 dark:border-line hover:border-emerald/40 hover:text-accent"
            }`}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}
