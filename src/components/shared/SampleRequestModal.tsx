import { useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Product } from "@/types";
import { useBodyScrollLock } from "@/hooks/useBodyScrollLock";
import { useKeydown } from "@/hooks/useKeydown";
import Button from "@/components/ui/Button";

interface SampleRequestModalProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
}

export default function SampleRequestModal({
  product,
  isOpen,
  onClose,
}: SampleRequestModalProps) {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", address: "" });

  useBodyScrollLock(isOpen);
  useKeydown("Escape", onClose);

  const update = (field: string, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleClose = () => {
    setSubmitted(false);
    setForm({ name: "", email: "", phone: "", address: "" });
    onClose();
  };

  const inputClass =
    "w-full px-3 py-2.5 text-sm border border-beige dark:border-white/10 bg-white dark:bg-[#1E1E1E] text-charcoal placeholder:text-charcoal-light/40 focus:border-gold focus:outline-none transition-colors";

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[55]"
            onClick={handleClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-4 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 z-[55] bg-white dark:bg-[#1E1E1E] max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl p-6 md:p-8"
          >
            <button
              onClick={handleClose}
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
                <h3 className="font-serif text-2xl text-charcoal mb-2">Sample Requested</h3>
                <p className="text-charcoal-light text-sm">
                  Your free sample of <strong>{product.name}</strong> will be
                  shipped within 3-5 business days.
                </p>
                <button
                  onClick={handleClose}
                  className="mt-6 text-gold text-sm font-medium hover:text-gold-light transition-colors cursor-pointer"
                >
                  Close
                </button>
              </div>
            ) : (
              <>
                <h2 className="font-serif text-2xl text-charcoal mb-1">
                  Request a Free Sample
                </h2>
                <p className="text-sm text-charcoal-light mb-6">
                  {product.name} — {product.material}, {product.finish}
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-charcoal mb-1">Name *</label>
                    <input type="text" required value={form.name} onChange={(e) => update("name", e.target.value)} placeholder="Full name" className={inputClass} />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-charcoal mb-1">Email *</label>
                      <input type="email" required value={form.email} onChange={(e) => update("email", e.target.value)} placeholder="you@example.com" className={inputClass} />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-charcoal mb-1">Phone</label>
                      <input type="tel" value={form.phone} onChange={(e) => update("phone", e.target.value)} placeholder="+91" className={inputClass} />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-charcoal mb-1">Shipping Address *</label>
                    <textarea required rows={3} value={form.address} onChange={(e) => update("address", e.target.value)} placeholder="Full shipping address with pincode" className={`${inputClass} resize-none`} />
                  </div>
                  <Button type="submit" className="w-full">
                    Request Free Sample
                  </Button>
                </form>
              </>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
