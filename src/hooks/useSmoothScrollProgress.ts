import { useRef } from "react";
import {
  useScroll,
  useSpring,
  type MotionValue,
} from "framer-motion";

type ScrollEdge = `${"start" | "center" | "end"} ${"start" | "center" | "end"}`;

interface UseSmoothScrollProgressOptions {
  offset?: [ScrollEdge, ScrollEdge];
  stiffness?: number;
  damping?: number;
}

interface UseSmoothScrollProgressReturn {
  ref: React.RefObject<HTMLElement | null>;
  scrollYProgress: MotionValue<number>;
  smoothProgress: MotionValue<number>;
}

export function useSmoothScrollProgress({
  offset = ["start end", "end start"],
  stiffness = 100,
  damping = 30,
}: UseSmoothScrollProgressOptions = {}): UseSmoothScrollProgressReturn {
  const ref = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset,
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness,
    damping,
    restDelta: 0.001,
  });

  return { ref, scrollYProgress, smoothProgress };
}
