import { useRef, useCallback } from "react";
import {
  useMotionValue,
  useSpring,
  type MotionValue,
} from "framer-motion";

interface UseMagneticElementOptions {
  strength?: number;
  radius?: number;
  stiffness?: number;
  damping?: number;
}

interface UseMagneticElementReturn {
  ref: React.RefObject<HTMLElement | null>;
  magneticX: MotionValue<number>;
  magneticY: MotionValue<number>;
  handlers: {
    onMouseMove: (e: React.MouseEvent) => void;
    onMouseLeave: () => void;
  };
}

export function useMagneticElement({
  strength = 0.3,
  radius = 150,
  stiffness = 150,
  damping = 15,
}: UseMagneticElementOptions = {}): UseMagneticElementReturn {
  const ref = useRef<HTMLElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness, damping, restDelta: 0.001 });
  const springY = useSpring(y, { stiffness, damping, restDelta: 0.001 });

  const onMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const distX = e.clientX - centerX;
      const distY = e.clientY - centerY;
      const distance = Math.sqrt(distX * distX + distY * distY);

      if (distance < radius) {
        x.set(distX * strength);
        y.set(distY * strength);
      } else {
        x.set(0);
        y.set(0);
      }
    },
    [strength, radius, x, y],
  );

  const onMouseLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  return {
    ref,
    magneticX: springX,
    magneticY: springY,
    handlers: { onMouseMove, onMouseLeave },
  };
}
