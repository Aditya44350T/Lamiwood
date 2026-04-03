import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

export default function AnnouncementBar() {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: "auto", opacity: 1 }}
        exit={{ height: 0, opacity: 0 }}
        className="bg-[#1a1a1a] text-white text-center text-xs md:text-sm relative z-[51]"
      >
        <div className="px-10 py-2.5 flex items-center justify-center gap-2">
          <span className="text-gold">&#9670;</span>
          <span>
            Free consultation on orders above ₹50,000 &middot;{" "}
            <Link
              to="/contact"
              className="text-gold-light underline underline-offset-2 hover:text-gold transition-colors"
            >
              Book Now
            </Link>
          </span>
          <span className="text-gold">&#9670;</span>
          <button
            onClick={() => setVisible(false)}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-white/50 hover:text-white transition-colors cursor-pointer"
            aria-label="Dismiss"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
