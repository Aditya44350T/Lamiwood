import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  SPRING_GENTLE,
  EASE_LUXURY,
  STAGGER_NORMAL,
  DURATION_NORMAL,
  VIEWPORT_ONCE,
} from "@/lib/animations";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
}

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: STAGGER_NORMAL },
  },
};

const wordVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: SPRING_GENTLE,
  },
};

const lineVariants = {
  hidden: { scaleX: 0 },
  visible: {
    scaleX: 1,
    transition: { duration: DURATION_NORMAL, ease: EASE_LUXURY },
  },
};

const subtitleVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION_NORMAL, ease: EASE_LUXURY },
  },
};

export default function SectionHeading({
  title,
  subtitle,
  align = "center",
  className,
}: SectionHeadingProps) {
  const prefersReducedMotion = useReducedMotion();

  const words = title.split(" ");

  if (prefersReducedMotion) {
    return (
      <div
        className={cn(
          "mb-12",
          align === "center" && "text-center",
          className,
        )}
      >
        <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-charcoal tracking-tight">
          {title}
        </h2>
        <div
          className={cn(
            "w-12 h-0.5 bg-gold mt-4 mb-4",
            align === "center" && "mx-auto",
          )}
        />
        {subtitle && (
          <p className="text-charcoal-light text-lg max-w-2xl leading-relaxed mx-auto">
            {subtitle}
          </p>
        )}
      </div>
    );
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT_ONCE}
      className={cn(
        "mb-12",
        align === "center" && "text-center",
        className,
      )}
    >
      <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-charcoal tracking-tight">
        {words.map((word, i) => (
          <motion.span
            key={i}
            variants={wordVariants}
            className="inline-block mr-[0.3em]"
          >
            {word}
          </motion.span>
        ))}
      </h2>
      <motion.div
        variants={lineVariants}
        className={cn(
          "w-12 h-0.5 bg-gold mt-4 mb-4",
          align === "center" ? "mx-auto origin-center" : "origin-left",
        )}
      />
      {subtitle && (
        <motion.p
          variants={subtitleVariants}
          className="text-charcoal-light text-lg max-w-2xl leading-relaxed mx-auto"
        >
          {subtitle}
        </motion.p>
      )}
    </motion.div>
  );
}
