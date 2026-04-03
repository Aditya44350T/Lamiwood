import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { EASE_LUXURY } from "@/lib/animations";

const letters = "LAMIWOOD".split("");

const containerVariants = {
  initial: {},
  animate: {
    transition: { staggerChildren: 0.06 },
  },
};

const letterVariants = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: EASE_LUXURY },
  },
};

// Subtle breathing animation for each letter while loading
const breatheVariants = {
  animate: (i: number) => ({
    scale: [1, 1.03, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut" as const,
      delay: i * 0.12,
    },
  }),
};

export default function Preloader() {
  const [show, setShow] = useState(
    () => !sessionStorage.getItem("lamiwood-preloader-shown"),
  );

  if (!show) return null;

  const handleComplete = () => {
    sessionStorage.setItem("lamiwood-preloader-shown", "true");
    setShow(false);
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[9999] bg-[#1a1a1a] flex flex-col items-center justify-center"
          exit={{
            clipPath: "inset(0 0 100% 0)",
            transition: { duration: 0.6, ease: EASE_LUXURY },
          }}
        >
          <motion.div
            variants={containerVariants}
            initial="initial"
            animate="animate"
            className="flex"
          >
            {letters.map((char, i) => (
              <motion.span
                key={i}
                variants={letterVariants}
                animate="animate"
                custom={i}
                className="font-serif text-4xl md:text-6xl text-white tracking-[0.3em]"
              >
                <motion.span
                  className="inline-block"
                  variants={breatheVariants}
                  animate="animate"
                  custom={i}
                >
                  {char}
                </motion.span>
              </motion.span>
            ))}
          </motion.div>

          <motion.div
            className="h-0.5 bg-gold mt-6"
            initial={{ width: 0 }}
            animate={{ width: 120 }}
            transition={{
              delay: 0.6,
              duration: 0.8,
              ease: EASE_LUXURY,
            }}
            onAnimationComplete={handleComplete}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
