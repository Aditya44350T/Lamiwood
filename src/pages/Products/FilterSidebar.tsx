import type { CategorySlug, FilterState } from "@/types";
import { categories } from "@/data/categories";
import { products } from "@/data/products";
import { cn } from "@/lib/utils";

interface FilterSidebarProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  className?: string;
}

// Extract unique materials and finishes from products
const allMaterials = [...new Set(products.map((p) => p.material))].sort();
const allFinishes = [...new Set(products.map((p) => p.finish))].sort();

// Price ranges
const priceRanges = [
  { label: "Under ₹300", min: 0, max: 300 },
  { label: "₹300 – ₹500", min: 300, max: 500 },
  { label: "₹500 – ₹800", min: 500, max: 800 },
  { label: "Above ₹800", min: 800, max: Infinity },
];

export default function FilterSidebar({
  filters,
  onFilterChange,
  className,
}: FilterSidebarProps) {
  const toggleCategory = (slug: CategorySlug) => {
    const next = filters.categories.includes(slug)
      ? filters.categories.filter((c) => c !== slug)
      : [...filters.categories, slug];
    onFilterChange({ ...filters, categories: next });
  };

  const hasActiveFilters = filters.categories.length > 0;

  const clearAll = () => {
    onFilterChange({ ...filters, categories: [] });
  };

  return (
    <aside className={cn("space-y-8", className)}>
      <div className="flex items-center justify-between">
        <h3 className="font-serif text-lg text-charcoal">Filters</h3>
        {hasActiveFilters && (
          <button
            onClick={clearAll}
            className="text-xs text-gold hover:text-gold-light transition-colors cursor-pointer"
          >
            Clear all
          </button>
        )}
      </div>

      {/* Category */}
      <FilterGroup title="Category">
        {categories.map((cat) => (
          <label
            key={cat.slug}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <input
              type="checkbox"
              checked={filters.categories.includes(cat.slug)}
              onChange={() => toggleCategory(cat.slug)}
              className="w-4 h-4 accent-gold cursor-pointer"
            />
            <span className="text-sm text-charcoal-light group-hover:text-charcoal transition-colors">
              {cat.name}{" "}
              <span className="text-charcoal-light/50">
                ({cat.productCount})
              </span>
            </span>
          </label>
        ))}
      </FilterGroup>

      {/* Price Range */}
      <FilterGroup title="Price Range">
        {priceRanges.map((range) => (
          <label
            key={range.label}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <input
              type="radio"
              name="price"
              className="w-4 h-4 accent-gold cursor-pointer"
            />
            <span className="text-sm text-charcoal-light group-hover:text-charcoal transition-colors">
              {range.label}
            </span>
          </label>
        ))}
      </FilterGroup>

      {/* Material */}
      <FilterGroup title="Material">
        {allMaterials.map((mat) => (
          <label
            key={mat}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <input
              type="checkbox"
              className="w-4 h-4 accent-gold cursor-pointer"
            />
            <span className="text-sm text-charcoal-light group-hover:text-charcoal transition-colors">
              {mat}
            </span>
          </label>
        ))}
      </FilterGroup>

      {/* Finish */}
      <FilterGroup title="Finish">
        {allFinishes.map((fin) => (
          <label
            key={fin}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <input
              type="checkbox"
              className="w-4 h-4 accent-gold cursor-pointer"
            />
            <span className="text-sm text-charcoal-light group-hover:text-charcoal transition-colors">
              {fin}
            </span>
          </label>
        ))}
      </FilterGroup>
    </aside>
  );
}

function FilterGroup({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h4 className="text-sm font-medium text-charcoal mb-3 uppercase tracking-wider">
        {title}
      </h4>
      <div className="space-y-2.5">{children}</div>
    </div>
  );
}
