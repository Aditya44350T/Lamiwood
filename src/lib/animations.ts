import type { Transition, Variants } from "framer-motion";

// Spring configurations — calibrated for luxury feel
export const SPRING_GENTLE: Transition = {
  type: "spring",
  stiffness: 120,
  damping: 28,
  restDelta: 0.001,
};

export const SPRING_SNAPPY: Transition = {
  type: "spring",
  stiffness: 300,
  damping: 30,
  restDelta: 0.001,
};

export const SPRING_BOUNCY: Transition = {
  type: "spring",
  stiffness: 600,
  damping: 12,
  restDelta: 0.001,
};

export const SPRING_SMOOTH: Transition = {
  type: "spring",
  stiffness: 100,
  damping: 20,
  restDelta: 0.001,
};

// Easing
export const EASE_LUXURY: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

// Durations (in seconds)
export const DURATION_FAST = 0.3;
export const DURATION_NORMAL = 0.5;
export const DURATION_SLOW = 0.8;

// Stagger delays (in seconds)
export const STAGGER_FAST = 0.04;
export const STAGGER_NORMAL = 0.08;
export const STAGGER_SLOW = 0.15;

// Viewport config for whileInView
export const VIEWPORT_ONCE = { once: true, margin: "-80px" as const };
export const VIEWPORT_REPEAT = { once: false, margin: "-80px" as const };

// --- Variant Factories ---

export function fadeUp(delay = 0): Variants {
  return {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { ...SPRING_GENTLE, delay },
    },
  };
}

export function fadeIn(delay = 0): Variants {
  return {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: DURATION_NORMAL, ease: EASE_LUXURY, delay },
    },
  };
}

export function fadeLeft(delay = 0): Variants {
  return {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { ...SPRING_GENTLE, delay },
    },
  };
}

export function fadeRight(delay = 0): Variants {
  return {
    hidden: { opacity: 0, x: 30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { ...SPRING_GENTLE, delay },
    },
  };
}

export function scaleIn(delay = 0): Variants {
  return {
    hidden: { opacity: 0, scale: 0.92 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { ...SPRING_GENTLE, delay },
    },
  };
}

export function blurIn(delay = 0): Variants {
  return {
    hidden: { opacity: 0, filter: "blur(10px)" },
    visible: {
      opacity: 1,
      filter: "blur(0px)",
      transition: { duration: DURATION_SLOW, ease: EASE_LUXURY, delay },
    },
  };
}

export function clipRevealUp(delay = 0): Variants {
  return {
    hidden: { clipPath: "inset(100% 0 0 0)" },
    visible: {
      clipPath: "inset(0% 0 0 0)",
      transition: { duration: DURATION_SLOW, ease: EASE_LUXURY, delay },
    },
  };
}

// Stagger container variant
export function staggerContainer(staggerDelay = STAGGER_NORMAL): Variants {
  return {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: staggerDelay,
      },
    },
  };
}

// Child item for stagger containers
export const staggerChild: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: SPRING_GENTLE,
  },
};
