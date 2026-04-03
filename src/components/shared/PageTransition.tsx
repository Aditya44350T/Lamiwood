import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { EASE_LUXURY } from "@/lib/animations";

interface PageTransitionProps {
  children: ReactNode;
}

export default function PageTransition({ children }: PageTransitionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12, scale: 0.98 }}
      animate={{
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
          type: "spring",
          stiffness: 300,
          damping: 30,
        },
      }}
      exit={{
        opacity: 0,
        y: -8,
        scale: 0.99,
        transition: { duration: 0.3, ease: EASE_LUXURY },
      }}
    >
      {children}
    </motion.div>
  );
}
