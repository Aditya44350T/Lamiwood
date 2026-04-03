import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { useQuickView } from "@/contexts/QuickViewContext";
import { useCart } from "@/contexts/CartContext";
import { useBodyScrollLock } from "@/hooks/useBodyScrollLock";
import { useKeydown } from "@/hooks/useKeydown";
import { formatPrice } from "@/lib/utils";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import ImageWithFallback from "@/components/ui/ImageWithFallback";

export default function QuickViewModal() {
  const { product, closeQuickView } = useQuickView();
  const { addItem } = useCart();
  const isOpen = product !== null;

  useBodyScrollLock(isOpen);
  useKeydown("Escape", closeQuickView);

  const handleAdd = () => {
    if (product) {
      addItem(product);
      closeQuickView();
    }
  };

  return (
    <AnimatePresence>
      {product && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[55]"
            onClick={closeQuickView}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="fixed inset-4 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 z-[55] bg-white dark:bg-[#1E1E1E] max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
          >
            {/* Close */}
            <button
              onClick={closeQuickView}
              className="absolute top-4 right-4 z-10 p-2 text-charcoal-light hover:text-charcoal transition-colors cursor-pointer"
              aria-label="Close"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2">
              {/* Image */}
              <div className="aspect-square">
                <ImageWithFallback
                  src={product.images[0]}
                  alt={product.name}
                  className="w-full h-full"
                />
              </div>

              {/* Info */}
              <div className="p-6 md:p-8 flex flex-col">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs uppercase tracking-wider text-charcoal-light">
                    {product.category.replace("-", " ")}
                  </span>
                  {product.badge && (
                    <Badge variant={product.badge}>{product.badge}</Badge>
                  )}
                </div>

                <h2 className="font-serif text-2xl text-charcoal mb-3">
                  {product.name}
                </h2>

                <p className="text-gold text-xl font-medium mb-4">
                  {formatPrice(product.price)}{" "}
                  <span className="text-sm text-charcoal-light font-normal">
                    {product.unit}
                  </span>
                </p>

                <p className="text-charcoal-light text-sm leading-relaxed mb-6">
                  {product.shortDescription}
                </p>

                {/* Specs preview */}
                <div className="space-y-2 mb-6">
                  {product.specs.slice(0, 3).map((spec) => (
                    <div key={spec.label} className="flex text-sm">
                      <span className="w-28 shrink-0 text-charcoal-light">
                        {spec.label}
                      </span>
                      <span className="text-charcoal">{spec.value}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-auto flex flex-col gap-3">
                  <Button onClick={handleAdd}>Add to Cart</Button>
                  <Link
                    to={`/products/${product.slug}`}
                    onClick={closeQuickView}
                    className="text-center text-sm text-gold hover:text-gold-light transition-colors"
                  >
                    View Full Details &rarr;
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
