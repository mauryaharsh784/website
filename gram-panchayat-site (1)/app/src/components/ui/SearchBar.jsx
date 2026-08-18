import { Search } from "lucide-react";

export default function SearchBar({ value, onChange, placeholder = "Search..." }) {
  return (
    <div className="relative w-full">
      <Search size={18} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink/40" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-full border border-forest/15 bg-surface py-3 pl-11 pr-4 text-sm text-ink placeholder:text-ink/40 focus:border-emerald focus:outline-none focus:ring-2 focus:ring-emerald/20"
      />
    </div>
  );
}
