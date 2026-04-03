import type { FilterState } from "@/types";

interface SortDropdownProps {
  value: FilterState["sortBy"];
  onChange: (value: FilterState["sortBy"]) => void;
}

const options: { label: string; value: FilterState["sortBy"] }[] = [
  { label: "Name A–Z", value: "name-asc" },
  { label: "Name Z–A", value: "name-desc" },
  { label: "Price: Low–High", value: "price-asc" },
  { label: "Price: High–Low", value: "price-desc" },
  { label: "Newest", value: "newest" },
];

export default function SortDropdown({ value, onChange }: SortDropdownProps) {
  return (
    <div className="flex items-center gap-2">
      <label htmlFor="sort" className="text-sm text-charcoal-light whitespace-nowrap">
        Sort by:
      </label>
      <select
        id="sort"
        value={value}
        onChange={(e) => onChange(e.target.value as FilterState["sortBy"])}
        className="text-sm border border-beige dark:border-white/10 bg-white dark:bg-[#1E1E1E] px-3 py-2 text-charcoal focus:border-gold focus:outline-none cursor-pointer"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}
