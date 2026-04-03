import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useBodyScrollLock } from "@/hooks/useBodyScrollLock";
import { useKeydown } from "@/hooks/useKeydown";
import Button from "@/components/ui/Button";
import { EASE_LUXURY } from "@/lib/animations";

export default function CallbackButton() {
  const [open, setOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useBodyScrollLock(open);
  useKeydown("Escape", () => setOpen(false));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setOpen(false);
      setSubmitted(false);
    }, 2000);
  };

  const inputClass =
    "w-full px-3 py-2.5 text-sm border border-beige bg-white dark:bg-[#1E1E1E] text-charcoal placeholder:text-charcoal-light/40 focus:border-gold focus:outline-none transition-colors";

  return (
    <>
      {/* Floating button */}
      <motion.button
        onClick={() => setOpen(true)}
        className="fixed bottom-24 right-6 z-40 w-12 h-12 bg-[#2C2C2C] text-white rounded-full flex items-center justify-center shadow-lg hover:bg-[#4A4A4A] transition-colors cursor-pointer"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Request callback"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
        </svg>
      </motion.button>

      {/* Modal */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[55]"
              onClick={() => setOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3, ease: EASE_LUXURY }}
              className="fixed inset-4 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 z-[55] bg-white dark:bg-[#1E1E1E] max-w-md w-full max-h-[90vh] overflow-y-auto shadow-2xl p-6 md:p-8"
            >
              <button
                onClick={() => setOpen(false)}
                className="absolute top-4 right-4 p-2 text-charcoal-light hover:text-charcoal transition-colors cursor-pointer"
                aria-label="Close"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {submitted ? (
                <div className="text-center py-8">
                  <div className="text-gold mb-4">
                    <svg className="w-12 h-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="font-serif text-2xl text-charcoal mb-2">
                    We&rsquo;ll Call You Back
                  </h3>
                  <p className="text-charcoal-light text-sm">
                    Our team will contact you within 30 minutes during business hours.
                  </p>
                </div>
              ) : (
                <>
                  <h2 className="font-serif text-2xl text-charcoal mb-1">
                    Request a Callback
                  </h2>
                  <p className="text-sm text-charcoal-light mb-6">
                    Leave your details and our surface consultant will reach out to you.
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <input
                        type="text"
                        required
                        placeholder="First name"
                        className={inputClass}
                      />
                      <input
                        type="text"
                        required
                        placeholder="Last name"
                        className={inputClass}
                      />
                    </div>
                    <input
                      type="tel"
                      required
                      placeholder="Phone number"
                      className={inputClass}
                    />
                    <input
                      type="email"
                      placeholder="Email (optional)"
                      className={inputClass}
                    />
                    <select className={`${inputClass} cursor-pointer`}>
                      <option value="">What are you looking for?</option>
                      <option value="flooring">Flooring</option>
                      <option value="wall-panels">Wall Panels</option>
                      <option value="decking">Decking</option>
                      <option value="ceiling-panels">Ceiling Panels</option>
                      <option value="cladding">Cladding</option>
                      <option value="acoustic-panels">Acoustic Panels</option>
                      <option value="other">Other</option>
                    </select>
                    <Button type="submit" className="w-full">
                      Request Callback
                    </Button>
                  </form>
                </>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
