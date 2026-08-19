
export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  light = false,
}) {
  return (
    <div
      className={`w-full min-w-0 max-w-2xl ${
        align === "center" ? "mx-auto text-center" : ""
      }`}
    >
      {eyebrow && (
        <span
          className={`block max-w-full break-words font-mono text-[10px] uppercase tracking-[0.12em] sm:text-xs sm:tracking-[0.2em] ${
            light ? "text-saffron-light" : "text-saffron"
          }`}
        >
          {eyebrow}
        </span>
      )}

      <h2
        className={`mt-2 max-w-full break-words font-display text-2xl font-semibold leading-tight sm:mt-3 sm:text-4xl md:text-[2.75rem] md:leading-[1.1] ${
          light ? "text-cream" : "text-heading"
        }`}
      >
        {title}
      </h2>

      {description && (
        <p
          className={`mt-3 max-w-full break-words text-sm leading-relaxed sm:mt-4 sm:text-base ${
            light ? "text-cream/80" : "text-ink/70"
          }`}
        >
          {description}
        </p>
      )}
    </div>
  );
}

