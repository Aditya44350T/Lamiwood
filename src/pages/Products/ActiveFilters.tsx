import type { CategorySlug, FilterState } from "@/types";
import { categories } from "@/data/categories";

interface ActiveFiltersProps {
  filters: FilterState;
  onRemove: (slug: CategorySlug) => void;
}

export default function ActiveFilters({ filters, onRemove }: ActiveFiltersProps) {
  if (filters.categories.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {filters.categories.map((slug) => {
        const cat = categories.find((c) => c.slug === slug);
        return (
          <button
            key={slug}
            onClick={() => onRemove(slug)}
            className="inline-flex items-center gap-1.5 px-3 py-1 bg-beige dark:bg-white/10 text-charcoal text-sm hover:bg-cream-dark dark:hover:bg-white/15 transition-colors cursor-pointer"
          >
            {cat?.name ?? slug}
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        );
      })}
    </div>
  );
}
