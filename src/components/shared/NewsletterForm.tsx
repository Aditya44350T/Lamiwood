import { useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SPRING_GENTLE, EASE_LUXURY } from "@/lib/animations";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [focused, setFocused] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setEmail("");
    }
  };

  if (submitted) {
    return (
      <motion.p
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={SPRING_GENTLE}
        className="text-sm text-gold"
      >
        Thank you for subscribing! We&rsquo;ll be in touch.
      </motion.p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <div className="relative flex-1">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder="Your email"
          required
          className="w-full px-3 py-2 text-sm bg-transparent border border-charcoal-light/30 dark:border-white/20 text-charcoal placeholder:text-charcoal-light/50 focus:border-gold focus:outline-none transition-colors"
        />
        {/* Animated gold underline */}
        <motion.span
          className="absolute bottom-0 left-0 right-0 h-[2px] bg-gold origin-left"
          initial={false}
          animate={{ scaleX: focused ? 1 : 0 }}
          transition={{ duration: 0.3, ease: EASE_LUXURY }}
        />
      </div>
      <AnimatePresence mode="wait">
        <motion.button
          type="submit"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="px-4 py-2 text-sm font-medium bg-gold text-white hover:bg-gold-light transition-colors cursor-pointer"
        >
          Subscribe
        </motion.button>
      </AnimatePresence>
    </form>
  );
}
