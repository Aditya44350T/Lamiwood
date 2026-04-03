import { useState, useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { products } from "@/data/products";
import { useBodyScrollLock } from "@/hooks/useBodyScrollLock";
import { useKeydown } from "@/hooks/useKeydown";
import { useDebounce } from "@/hooks/useDebounce";
import { formatPrice } from "@/lib/utils";
import ImageWithFallback from "@/components/ui/ImageWithFallback";

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchOverlay({ isOpen, onClose }: SearchOverlayProps) {
  const [query, setQuery] = useState("");
  const [highlighted, setHighlighted] = useState(0);
  const navigate = useNavigate();
  const debouncedQuery = useDebounce(query, 150);

  useBodyScrollLock(isOpen);
  useKeydown("Escape", onClose);

  const results = useMemo(() => {
    if (!debouncedQuery.trim()) return [];
    const q = debouncedQuery.toLowerCase();
    return products
      .filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.material.toLowerCase().includes(q),
      )
      .slice(0, 5);
  }, [debouncedQuery]);

  const goToResult = useCallback(
    (slug: string) => {
      navigate(`/products/${slug}`);
      setQuery("");
      onClose();
    },
    [navigate, onClose],
  );

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlighted((h) => Math.min(h + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlighted((h) => Math.max(h - 1, 0));
    } else if (e.key === "Enter" && results[highlighted]) {
      goToResult(results[highlighted].slug);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[60] bg-cream/98 backdrop-blur-md"
        >
          <div className="max-w-2xl mx-auto px-4 pt-32">
            {/* Close */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 p-2 text-charcoal-light hover:text-charcoal transition-colors cursor-pointer"
              aria-label="Close search"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Input */}
            <div>
              <input
                type="text"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setHighlighted(0);
                }}
                onKeyDown={handleKeyDown}
                placeholder="Search products..."
                autoFocus
                className="w-full bg-transparent font-serif text-3xl md:text-4xl text-charcoal placeholder:text-charcoal-light/30 py-4 outline-none"
              />
            </div>

            {/* Results */}
            {query.trim() === "" ? (
              <p className="text-charcoal-light/50 text-sm mt-6">
                Start typing to search products by name, category, or material...
              </p>
            ) : results.length === 0 ? (
              <p className="text-charcoal-light mt-6">
                No products found for &ldquo;{query}&rdquo;
              </p>
            ) : (
              <div className="mt-6 space-y-1">
                {results.map((product, i) => (
                  <button
                    key={product.id}
                    onClick={() => goToResult(product.slug)}
                    onMouseEnter={() => setHighlighted(i)}
                    className={`w-full flex items-center gap-4 p-3 text-left transition-colors cursor-pointer ${
                      i === highlighted ? "bg-beige/50 dark:bg-white/10" : "hover:bg-beige/30 dark:hover:bg-white/5"
                    }`}
                  >
                    <div className="w-12 h-12 shrink-0 overflow-hidden">
                      <ImageWithFallback
                        src={product.thumbnail}
                        alt={product.name}
                        className="w-full h-full"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-charcoal text-sm truncate">
                        {product.name}
                      </p>
                      <p className="text-xs text-charcoal-light capitalize">
                        {product.category.replace("-", " ")}
                      </p>
                    </div>
                    <span className="text-sm text-gold font-medium">
                      {formatPrice(product.price)}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
