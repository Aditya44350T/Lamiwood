import { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import type { CategorySlug, FilterState } from "@/types";
import { products } from "@/data/products";
import { categories } from "@/data/categories";
import Container from "@/components/ui/Container";
import PageTransition from "@/components/shared/PageTransition";
import ImageWithFallback from "@/components/ui/ImageWithFallback";
import FilterSidebar from "./FilterSidebar";
import SortDropdown from "./SortDropdown";
import ActiveFilters from "./ActiveFilters";
import ProductGrid from "./ProductGrid";
import { SPRING_GENTLE } from "@/lib/animations";

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const [filters, setFilters] = useState<FilterState>(() => {
    const cat = searchParams.get("category");
    return {
      categories: cat ? [cat as CategorySlug] : [],
      sortBy:
        (searchParams.get("sort") as FilterState["sortBy"]) || "name-asc",
    };
  });

  useEffect(() => {
    document.title = "Products | Lamiwood";
  }, []);

  useEffect(() => {
    const params = new URLSearchParams();
    if (filters.categories.length === 1) {
      params.set("category", filters.categories[0]);
    }
    if (filters.sortBy !== "name-asc") {
      params.set("sort", filters.sortBy);
    }
    setSearchParams(params, { replace: true });
  }, [filters, setSearchParams]);

  const filtered = useMemo(() => {
    let result = [...products];

    if (filters.categories.length > 0) {
      result = result.filter((p) => filters.categories.includes(p.category));
    }

    switch (filters.sortBy) {
      case "name-asc":
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "name-desc":
        result.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "newest":
        result.reverse();
        break;
    }

    return result;
  }, [filters]);

  const removeCategory = (slug: CategorySlug) => {
    setFilters((f) => ({
      ...f,
      categories: f.categories.filter((c) => c !== slug),
    }));
  };

  const toggleCategory = (slug: CategorySlug) => {
    setFilters((f) => ({
      ...f,
      categories: f.categories.includes(slug)
        ? f.categories.filter((c) => c !== slug)
        : [slug],
    }));
  };

  return (
    <PageTransition>
      {/* Category quick-filters */}
      <div style={{ paddingTop: "var(--header-height)" }} />
      <section className="bg-offwhite border-b border-beige">
        <Container>
          <div className="flex gap-1 overflow-x-auto py-4 -mx-1 scrollbar-hide">
            <button
              onClick={() => setFilters((f) => ({ ...f, categories: [] }))}
              className={`shrink-0 px-5 py-2.5 text-sm font-medium tracking-wide transition-all cursor-pointer rounded-sm ${
                filters.categories.length === 0
                  ? "bg-gold text-white"
                  : "bg-transparent text-charcoal-light hover:text-charcoal hover:bg-beige/50"
              }`}
            >
              All Products
              <span className="ml-1.5 text-xs opacity-60">
                ({products.length})
              </span>
            </button>
            {categories.map((cat) => (
              <button
                key={cat.slug}
                onClick={() => toggleCategory(cat.slug)}
                className={`shrink-0 px-5 py-2.5 text-sm font-medium tracking-wide transition-all cursor-pointer rounded-sm ${
                  filters.categories.includes(cat.slug)
                    ? "bg-gold text-white"
                    : "bg-transparent text-charcoal-light hover:text-charcoal hover:bg-beige/50"
                }`}
              >
                {cat.name}
                <span className="ml-1.5 text-xs opacity-60">
                  ({cat.productCount})
                </span>
              </button>
            ))}
          </div>
        </Container>
      </section>

      {/* Featured category banner — show when a single category is selected */}
      {filters.categories.length === 1 && (
        <CategoryBanner slug={filters.categories[0]} />
      )}

      {/* Main content */}
      <div className="py-10 md:py-14 bg-cream min-h-[60vh]">
        <Container>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
                className="lg:hidden text-sm text-charcoal border border-beige dark:border-white/10 px-4 py-2 hover:border-gold transition-colors cursor-pointer"
              >
                {mobileFiltersOpen ? "Hide Filters" : "Show Filters"}
              </button>
              <p className="text-sm text-charcoal-light">
                {filtered.length} product{filtered.length !== 1 ? "s" : ""}
              </p>
            </div>
            <SortDropdown
              value={filters.sortBy}
              onChange={(sortBy) => setFilters((f) => ({ ...f, sortBy }))}
            />
          </div>

          <div className="flex gap-10">
            <FilterSidebar
              filters={filters}
              onFilterChange={setFilters}
              className={`w-56 shrink-0 ${mobileFiltersOpen ? "block" : "hidden"} lg:block`}
            />
            <div className="flex-1 min-w-0">
              <ActiveFilters filters={filters} onRemove={removeCategory} />
              <ProductGrid products={filtered} />
            </div>
          </div>
        </Container>
      </div>
    </PageTransition>
  );
}

function CategoryBanner({ slug }: { slug: CategorySlug }) {
  const cat = categories.find((c) => c.slug === slug);
  if (!cat) return null;

  return (
    <motion.section
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      transition={SPRING_GENTLE}
      className="overflow-hidden"
    >
      <div className="relative h-48 md:h-56">
        <div className="absolute inset-0">
          <ImageWithFallback
            src={cat.image}
            alt={cat.name}
            className="w-full h-full"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
        <Container className="relative z-10 h-full flex items-center">
          <div>
            <h2 className="font-serif text-3xl md:text-4xl text-white mb-2">
              {cat.name}
            </h2>
            <p className="text-white/80 text-sm md:text-base max-w-md">
              {cat.description}
            </p>
          </div>
        </Container>
      </div>
    </motion.section>
  );
}
