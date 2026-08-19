
import { ArrowRight } from "lucide-react";

export default function Button({
  children,
  variant = "primary",
  arrow = false,
  className = "",
  as: Component = "button",
  ...props
}) {
  const base =
    "inline-flex max-w-full items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold tracking-wide whitespace-normal break-words transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-saffron";

  const variants = {
    primary:
      "bg-saffron text-white shadow-[0_8px_24px_-8px_rgba(221,124,52,0.6)] hover:bg-saffron-light hover:-translate-y-0.5",

    secondary:
      "bg-forest text-cream hover:bg-forest-dark hover:-translate-y-0.5",

    outline:
      "border border-white/40 text-white hover:bg-white/10 hover:-translate-y-0.5",

    outlineDark:
      "border border-forest/30 text-accent hover:bg-forest hover:text-cream hover:-translate-y-0.5",

    ghost:
      "text-accent hover:text-saffron",
  };

  return (
    <Component
      className={`${base} ${variants[variant] || variants.primary} ${className}`}
      {...props}
    >
      <span className="min-w-0">
        {children}
      </span>

      {arrow && (
        <ArrowRight
          size={16}
          className="shrink-0 transition-transform duration-300 group-hover:translate-x-1"
        />
      )}
    </Component>
  );
}

