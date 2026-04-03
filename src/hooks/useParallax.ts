import { useRef } from "react";
import {
  useScroll,
  useTransform,
  useSpring,
  type MotionValue,
} from "framer-motion";

type ScrollEdge = `${"start" | "center" | "end"} ${"start" | "center" | "end"}`;

interface UseParallaxOptions {
  speed?: number;
  direction?: "up" | "down" | "left" | "right";
  smooth?: boolean;
  offset?: [ScrollEdge, ScrollEdge];
}

interface UseParallaxReturn {
  ref: React.RefObject<HTMLElement | null>;
  value: MotionValue<number>;
  /** @deprecated Use `value` instead */
  y: MotionValue<number>;
}

export function useParallax({
  speed = 0.3,
  direction = "up",
  smooth = false,
  offset = ["start start", "end start"],
}: UseParallaxOptions = {}): UseParallaxReturn {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset,
  });

  const magnitude = speed * 100;

  const outputRange: [number, number] = (() => {
    switch (direction) {
      case "up":
        return [0, -magnitude];
      case "down":
        return [0, magnitude];
      case "left":
        return [0, -magnitude];
      case "right":
        return [0, magnitude];
    }
  })();

  const rawValue = useTransform(scrollYProgress, [0, 1], outputRange);

  const smoothedValue = useSpring(rawValue, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const value = smooth ? smoothedValue : rawValue;

  return { ref, value, y: value };
}
