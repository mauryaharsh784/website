export default function SectionHeading({ eyebrow, title, description, align = "left", light = false }) {
  return (
    <div className={`max-w-2xl ${align === "center" ? "mx-auto text-center" : ""}`}>
      {eyebrow && (
        <span
          className={`font-mono text-xs tracking-[0.2em] uppercase ${
            light ? "text-saffron-light" : "text-saffron"
          }`}
        >
          {eyebrow}
        </span>
      )}
      <h2
        className={`font-display mt-3 text-3xl sm:text-4xl md:text-[2.75rem] leading-[1.1] font-semibold ${
          light ? "text-cream" : "text-heading"
        }`}
      >
        {title}
      </h2>
      {description && (
        <p className={`mt-4 text-base leading-relaxed ${light ? "text-cream/80" : "text-ink/70"}`}>
          {description}
        </p>
      )}
    </div>
  );
}
