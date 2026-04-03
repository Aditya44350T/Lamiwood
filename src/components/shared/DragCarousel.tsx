import { useRef, useState, useEffect, useCallback, type ReactNode } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  animate,
} from "framer-motion";
import { cn } from "@/lib/utils";

interface DragCarouselProps {
  children: ReactNode;
  className?: string;
  itemClassName?: string;
  showArrows?: boolean;
  showDots?: boolean;
  autoAdvance?: number; // auto-advance interval in ms, 0 = disabled
}

export default function DragCarousel({
  children,
  className,
  itemClassName,
  showArrows = true,
  showDots = false,
  autoAdvance = 0,
}: DragCarouselProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const [constraint, setConstraint] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const x = useMotionValue(0);
  const prefersReducedMotion = useReducedMotion();

  // Smooth animated scroll to a position
  const animateTo = useCallback(
    (target: number) => {
      animate(x, target, {
        type: "spring",
        stiffness: 120,
        damping: 28,
        restDelta: 0.5,
      });
    },
    [x],
  );

  // Calculate drag constraints
  useEffect(() => {
    const calculateConstraints = () => {
      if (containerRef.current && innerRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        const scrollWidth = innerRef.current.scrollWidth;
        setConstraint(Math.min(0, -(scrollWidth - containerWidth)));
      }
    };
    calculateConstraints();
    window.addEventListener("resize", calculateConstraints);
    return () => window.removeEventListener("resize", calculateConstraints);
  }, [children]);

  // Track active index for dots
  useEffect(() => {
    if (!showDots && autoAdvance === 0) return;
    const unsubscribe = x.on("change", (latest) => {
      if (!containerRef.current) return;
      const containerWidth = containerRef.current.offsetWidth;
      if (containerWidth > 0) {
        const index = Math.round(Math.abs(latest) / containerWidth);
        setActiveIndex(index);
      }
    });
    return unsubscribe;
  }, [x, showDots, autoAdvance]);

  // Auto-advance with smooth animation
  useEffect(() => {
    if (autoAdvance === 0 || isDragging) return;
    const interval = setInterval(() => {
      if (!containerRef.current || !innerRef.current) return;
      const containerWidth = containerRef.current.offsetWidth;
      const scrollWidth = innerRef.current.scrollWidth;
      const totalSlides = Math.ceil(scrollWidth / containerWidth);
      const nextIndex = (activeIndex + 1) % totalSlides;
      const nextX = Math.max(constraint, -(nextIndex * containerWidth));
      animateTo(nextX);
    }, autoAdvance);
    return () => clearInterval(interval);
  }, [autoAdvance, activeIndex, constraint, isDragging, animateTo]);

  const scrollBy = (direction: number) => {
    if (!containerRef.current) return;
    const containerWidth = containerRef.current.offsetWidth;
    const currentX = x.get();
    const nextX = Math.min(
      0,
      Math.max(constraint, currentX + direction * containerWidth * 0.8),
    );
    animateTo(nextX);
  };

  const totalDots = (() => {
    if (!containerRef.current || !innerRef.current) return 0;
    const containerWidth = containerRef.current.offsetWidth;
    const scrollWidth = innerRef.current.scrollWidth;
    return Math.ceil(scrollWidth / containerWidth);
  })();

  return (
    <div className={cn("relative group/carousel", className)}>
      {/* Scrollable container */}
      <div ref={containerRef} className="overflow-hidden">
        <motion.div
          ref={innerRef}
          className={cn(
            "flex cursor-grab active:cursor-grabbing",
            itemClassName,
          )}
          drag={prefersReducedMotion ? false : "x"}
          style={{ x }}
          dragConstraints={{ left: constraint, right: 0 }}
          dragElastic={0.15}
          dragTransition={{ bounceStiffness: 300, bounceDamping: 30 }}
          onDragStart={() => setIsDragging(true)}
          onDragEnd={() => setIsDragging(false)}
          whileDrag={{ cursor: "grabbing" }}
        >
          {children}
        </motion.div>
      </div>

      {/* Navigation arrows */}
      {showArrows && (
        <>
          <button
            onClick={() => scrollBy(1)}
            className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-md opacity-0 group-hover/carousel:opacity-100 transition-opacity duration-300 cursor-pointer hover:bg-white z-10"
            aria-label="Previous"
          >
            <svg
              className="w-5 h-5 text-charcoal"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <button
            onClick={() => scrollBy(-1)}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-md opacity-0 group-hover/carousel:opacity-100 transition-opacity duration-300 cursor-pointer hover:bg-white z-10"
            aria-label="Next"
          >
            <svg
              className="w-5 h-5 text-charcoal"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </>
      )}

      {/* Progress dots */}
      {showDots && totalDots > 1 && (
        <div className="flex justify-center gap-2 mt-6">
          {Array.from({ length: totalDots }).map((_, i) => (
            <button
              key={i}
              onClick={() => {
                if (!containerRef.current) return;
                const containerWidth = containerRef.current.offsetWidth;
                animateTo(Math.max(constraint, -(i * containerWidth)));
              }}
              className={cn(
                "h-1.5 rounded-full transition-all duration-300 cursor-pointer",
                i === activeIndex
                  ? "w-8 bg-gold"
                  : "w-1.5 bg-white/30 hover:bg-white/50",
              )}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
