import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import {
  SPRING_GENTLE,
  EASE_LUXURY,
  DURATION_SLOW,
  VIEWPORT_ONCE,
} from "@/lib/animations";

type AnimationVariant =
  | "fade-up"
  | "fade-left"
  | "fade-right"
  | "scale-in"
  | "blur-in"
  | "clip-reveal";

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "left" | "right";
  variant?: AnimationVariant;
  scrollLinked?: boolean;
}

const variantConfigs: Record<
  AnimationVariant,
  { hidden: Record<string, number | string>; visible: Record<string, number | string> }
> = {
  "fade-up": {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  },
  "fade-left": {
    hidden: { opacity: 0, x: -30 },
    visible: { opacity: 1, x: 0 },
  },
  "fade-right": {
    hidden: { opacity: 0, x: 30 },
    visible: { opacity: 1, x: 0 },
  },
  "scale-in": {
    hidden: { opacity: 0, scale: 0.92 },
    visible: { opacity: 1, scale: 1 },
  },
  "blur-in": {
    hidden: { opacity: 0, filter: "blur(10px)" },
    visible: { opacity: 1, filter: "blur(0px)" },
  },
  "clip-reveal": {
    hidden: { clipPath: "inset(100% 0 0 0)" },
    visible: { clipPath: "inset(0% 0 0 0)" },
  },
};

// Map legacy direction prop to variant
function resolveVariant(
  variant?: AnimationVariant,
  direction?: "up" | "left" | "right",
): AnimationVariant {
  if (variant) return variant;
  switch (direction) {
    case "left":
      return "fade-left";
    case "right":
      return "fade-right";
    default:
      return "fade-up";
  }
}

// Scroll-linked version — opacity/y driven by scroll position
function ScrollLinkedSection({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 0.5], [40, 0]);

  return (
    <motion.div ref={ref} style={{ opacity, y }} className={cn(className)}>
      {children}
    </motion.div>
  );
}

export default function AnimatedSection({
  children,
  className,
  delay = 0,
  direction = "up",
  variant,
  scrollLinked = false,
}: AnimatedSectionProps) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={cn(className)}>{children}</div>;
  }

  if (scrollLinked) {
    return (
      <ScrollLinkedSection className={className}>
        {children}
      </ScrollLinkedSection>
    );
  }

  const resolved = resolveVariant(variant, direction);
  const config = variantConfigs[resolved];

  const isFilterOrClip =
    resolved === "blur-in" || resolved === "clip-reveal";
  const transition = isFilterOrClip
    ? { duration: DURATION_SLOW, ease: EASE_LUXURY, delay }
    : { ...SPRING_GENTLE, delay };

  const variants = {
    hidden: config.hidden,
    visible: { ...config.visible, transition },
  };

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT_ONCE}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}
