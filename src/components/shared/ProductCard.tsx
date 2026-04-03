import { useCallback } from "react";
import { Link } from "react-router-dom";
import {
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from "framer-motion";
import type { Product } from "@/types";
import { useCart } from "@/contexts/CartContext";
import { useQuickView } from "@/contexts/QuickViewContext";
import { formatPrice } from "@/lib/utils";
import { SPRING_GENTLE, VIEWPORT_ONCE } from "@/lib/animations";
import Badge from "@/components/ui/Badge";
import ImageWithFallback from "@/components/ui/ImageWithFallback";
import WishlistButton from "./WishlistButton";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();
  const { openQuickView } = useQuickView();
  const prefersReducedMotion = useReducedMotion();

  // 3D tilt motion values — all via motion values, no React state
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const imgX = useMotionValue(0);
  const imgY = useMotionValue(0);

  const springRotateX = useSpring(rotateX, { stiffness: 150, damping: 20 });
  const springRotateY = useSpring(rotateY, { stiffness: 150, damping: 20 });
  const springImgX = useSpring(imgX, { stiffness: 150, damping: 20 });
  const springImgY = useSpring(imgY, { stiffness: 150, damping: 20 });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      if (prefersReducedMotion) return;
      const rect = e.currentTarget.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const percentX = (e.clientX - centerX) / (rect.width / 2);
      const percentY = (e.clientY - centerY) / (rect.height / 2);

      // Tilt: max 4 degrees
      rotateX.set(-percentY * 4);
      rotateY.set(percentX * 4);

      // Image shift: opposite direction, 3px max
      imgX.set(-percentX * 3);
      imgY.set(-percentY * 3);
    },
    [prefersReducedMotion, rotateX, rotateY, imgX, imgY],
  );

  const handleMouseLeave = useCallback(() => {
    rotateX.set(0);
    rotateY.set(0);
    imgX.set(0);
    imgY.set(0);
  }, [rotateX, rotateY, imgX, imgY]);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    openQuickView(product);
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT_ONCE}
      transition={SPRING_GENTLE}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: prefersReducedMotion ? 0 : springRotateX,
        rotateY: prefersReducedMotion ? 0 : springRotateY,
        perspective: 800,
        transformStyle: "preserve-3d",
      }}
      className="group bg-white dark:bg-[#1E1E1E] transition-shadow duration-500 hover:shadow-[0_10px_40px_rgba(0,0,0,0.08),0_2px_8px_rgba(0,0,0,0.04)]"
    >
      {/* Image area */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <Link to={`/products/${product.slug}`} className="block w-full h-full">
          <motion.div
            className="w-full h-full transition-transform duration-500 group-hover:scale-105"
            style={{
              x: prefersReducedMotion ? 0 : springImgX,
              y: prefersReducedMotion ? 0 : springImgY,
            }}
          >
            <ImageWithFallback
              src={product.thumbnail}
              alt={product.name}
              className="w-full h-full"
            />
          </motion.div>
        </Link>

        {/* Badge */}
        {product.badge && (
          <div className="absolute top-3 left-3 z-10">
            <Badge variant={product.badge}>{product.badge}</Badge>
          </div>
        )}

        {/* Wishlist heart */}
        <div className="absolute top-3 right-3 z-10">
          <WishlistButton product={product} />
        </div>

        {/* Hover action bar — staggered reveal */}
        <div className="absolute bottom-0 left-0 right-0 z-10 flex gap-1 p-2 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <motion.button
            onClick={handleAddToCart}
            className="flex-1 py-2 bg-gold text-white text-xs font-medium uppercase tracking-wider hover:bg-gold-light transition-colors cursor-pointer"
            initial={false}
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
          >
            Add to Cart
          </motion.button>
          <motion.button
            onClick={handleQuickView}
            className="py-2 px-3 bg-charcoal text-white text-xs hover:bg-charcoal-light transition-colors cursor-pointer"
            initial={false}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            aria-label="Quick view"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </motion.button>
        </div>
      </div>

      {/* Text area */}
      <Link to={`/products/${product.slug}`} className="block p-4">
        <p className="text-xs uppercase tracking-wider text-charcoal-light mb-1 transition-all duration-300 group-hover:translate-y-[-1px] group-hover:opacity-80">
          {product.category.replace("-", " ")}
        </p>
        <h3 className="font-serif text-lg text-charcoal group-hover:text-gold transition-colors duration-300">
          {product.name}
        </h3>
        <p className="mt-2 text-gold font-medium">
          {formatPrice(product.price)}{" "}
          <span className="text-sm text-charcoal-light font-normal">
            {product.unit}
          </span>
        </p>
      </Link>
    </motion.article>
  );
}
