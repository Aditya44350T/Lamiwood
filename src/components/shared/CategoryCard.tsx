import { useCallback } from "react";
import { Link } from "react-router-dom";
import {
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from "framer-motion";
import type { Category } from "@/types";
import { SPRING_GENTLE, VIEWPORT_ONCE } from "@/lib/animations";
import ImageWithFallback from "@/components/ui/ImageWithFallback";

interface CategoryCardProps {
  category: Category;
}

export default function CategoryCard({ category }: CategoryCardProps) {
  const prefersReducedMotion = useReducedMotion();

  // Cursor-aware image parallax
  const imgX = useMotionValue(0);
  const imgY = useMotionValue(0);
  const springImgX = useSpring(imgX, { stiffness: 150, damping: 20 });
  const springImgY = useSpring(imgY, { stiffness: 150, damping: 20 });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      if (prefersReducedMotion) return;
      const rect = e.currentTarget.getBoundingClientRect();
      const percentX =
        (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
      const percentY =
        (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
      imgX.set(-percentX * 5);
      imgY.set(-percentY * 5);
    },
    [prefersReducedMotion, imgX, imgY],
  );

  const handleMouseLeave = useCallback(() => {
    imgX.set(0);
    imgY.set(0);
  }, [imgX, imgY]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT_ONCE}
      transition={SPRING_GENTLE}
    >
      <Link
        to={`/products?category=${category.slug}`}
        className="group relative block aspect-[4/3] overflow-hidden"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {/* Image with parallax shift */}
        <motion.div
          className="absolute inset-0 scale-[1.02] transition-transform duration-500 group-hover:scale-110"
          style={{
            x: prefersReducedMotion ? 0 : springImgX,
            y: prefersReducedMotion ? 0 : springImgY,
          }}
        >
          <ImageWithFallback
            src={category.image}
            alt={category.name}
            className="w-full h-full"
          />
        </motion.div>

        {/* Gradient overlay — darkens + gold tint on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent transition-all duration-500 group-hover:from-black/80 group-hover:via-black/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-gold/0 to-transparent transition-opacity duration-500 opacity-0 group-hover:opacity-10" />

        {/* Text content */}
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <h3 className="font-serif text-2xl mb-1 group-hover:translate-y-[-4px] transition-transform duration-300">
            {category.name}
          </h3>
          <p className="text-sm text-white/80 relative inline-block">
            {category.productCount} products
            {/* Expanding underline on hover */}
            <span className="absolute bottom-0 left-0 h-[1px] bg-gold-light w-0 group-hover:w-full transition-all duration-500" />
          </p>
        </div>
      </Link>
    </motion.div>
  );
}
