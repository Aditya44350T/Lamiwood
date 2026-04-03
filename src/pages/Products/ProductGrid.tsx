import { motion, AnimatePresence } from "framer-motion";
import type { Product } from "@/types";
import ProductCard from "@/components/shared/ProductCard";
import { SPRING_GENTLE, STAGGER_FAST } from "@/lib/animations";

interface ProductGridProps {
  products: Product[];
}

export default function ProductGrid({ products }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="py-16 text-center"
      >
        <p className="text-charcoal-light text-lg">
          No products match your filters.
        </p>
        <p className="text-charcoal-light/60 text-sm mt-2">
          Try removing some filters to see more results.
        </p>
      </motion.div>
    );
  }

  // Create a stable key from the set of product IDs for AnimatePresence
  const gridKey = products.map((p) => p.id).join(",");

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={gridKey}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {products.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{
              opacity: 1,
              y: 0,
              transition: {
                ...SPRING_GENTLE,
                delay: Math.min(index * STAGGER_FAST, 0.5),
              },
            }}
            layout
          >
            <ProductCard product={product} />
          </motion.div>
        ))}
      </motion.div>
    </AnimatePresence>
  );
}
