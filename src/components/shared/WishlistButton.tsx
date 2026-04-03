import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Product } from "@/types";
import { useWishlist } from "@/contexts/WishlistContext";
import { cn } from "@/lib/utils";

interface WishlistButtonProps {
  product: Product;
  size?: "sm" | "md";
  className?: string;
}

// Generate random particle positions
function generateParticles() {
  return Array.from({ length: 6 }, (_, i) => ({
    id: i,
    angle: (i / 6) * Math.PI * 2,
  }));
}

const particles = generateParticles();

export default function WishlistButton({
  product,
  size = "sm",
  className,
}: WishlistButtonProps) {
  const { isInWishlist, addItem, removeItem } = useWishlist();
  const active = isInWishlist(product.id);
  const [burstKey, setBurstKey] = useState(0);

  const toggle = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      if (active) {
        removeItem(product.id);
      } else {
        addItem(product);
        setBurstKey((k) => k + 1);
      }
    },
    [active, product, addItem, removeItem],
  );

  return (
    <div className="relative">
      {/* Particle burst on add */}
      <AnimatePresence>
        {burstKey > 0 && (
          <div
            key={burstKey}
            className="absolute inset-0 pointer-events-none flex items-center justify-center"
          >
            {particles.map((p) => (
              <motion.span
                key={p.id}
                className="absolute w-1.5 h-1.5 rounded-full bg-gold"
                initial={{ scale: 0, x: 0, y: 0, opacity: 1 }}
                animate={{
                  scale: [0, 1, 0],
                  x: Math.cos(p.angle) * 18,
                  y: Math.sin(p.angle) * 18,
                  opacity: [1, 1, 0],
                }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              />
            ))}
          </div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={toggle}
        whileTap={{ scale: 0.85 }}
        animate={
          active
            ? {
                scale: [1, 1.3, 1],
                transition: {
                  type: "spring",
                  stiffness: 600,
                  damping: 12,
                },
              }
            : { scale: 1 }
        }
        className={cn(
          "flex items-center justify-center rounded-full transition-colors cursor-pointer",
          size === "sm" ? "w-8 h-8" : "w-10 h-10",
          active
            ? "bg-red-50 text-red-500"
            : "bg-white/80 text-charcoal-light hover:text-red-500",
          className,
        )}
        aria-label={active ? "Remove from wishlist" : "Add to wishlist"}
      >
        <svg
          className={size === "sm" ? "w-4 h-4" : "w-5 h-5"}
          fill={active ? "currentColor" : "none"}
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={active ? 0 : 1.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
          />
        </svg>
      </motion.button>
    </div>
  );
}
