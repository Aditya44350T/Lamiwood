import { useState, useEffect, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/contexts/CartContext";
import { formatPrice } from "@/lib/utils";
import Container from "@/components/ui/Container";
import Breadcrumb from "@/components/ui/Breadcrumb";
import Button from "@/components/ui/Button";
import PageTransition from "@/components/shared/PageTransition";

const STEPS = ["Products", "Project Details", "Contact Info"];

const spaceTypes = [
  "Living Room",
  "Bedroom",
  "Kitchen",
  "Office",
  "Restaurant",
  "Hotel / Resort",
  "Retail Space",
  "Other",
];

const timelines = [
  "Within 1 month",
  "1-3 months",
  "3-6 months",
  "6+ months",
  "Just exploring",
];

export default function Quote() {
  const { items, subtotal } = useCart();
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    spaceType: "",
    area: "",
    timeline: "",
    notes: "",
    name: "",
    email: "",
    phone: "",
    company: "",
  });

  useEffect(() => {
    document.title = "Request a Quote | Lamiwood";
  }, []);

  const update = (field: string, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const inputClass =
    "w-full px-4 py-3 text-sm border border-beige dark:border-white/10 bg-white dark:bg-[#1E1E1E] text-charcoal placeholder:text-charcoal-light/40 focus:border-gold focus:outline-none transition-colors";

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const canProceed = () => {
    if (step === 0) return items.length > 0;
    if (step === 1) return form.spaceType && form.area && form.timeline;
    return form.name && form.email;
  };

  return (
    <PageTransition>
      <div className="pb-20 bg-cream min-h-screen" style={{ paddingTop: "var(--header-height)" }}>
        <Container size="narrow">
          <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Request a Quote" }]} />

          {submitted ? (
            <div className="text-center py-20">
              <div className="text-gold mb-6">
                <svg className="w-16 h-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h1 className="font-serif text-4xl text-charcoal mb-4">Quote Requested</h1>
              <p className="text-charcoal-light max-w-md mx-auto mb-8">
                Thank you, {form.name}! Our team will prepare a detailed quotation and contact you within 24 hours.
              </p>
              <Button href="/">Return Home</Button>
            </div>
          ) : (
            <>
              <h1 className="font-serif text-3xl md:text-4xl text-charcoal mt-6 mb-8">
                Request a Quote
              </h1>

              {/* Progress bar */}
              <div className="flex items-center gap-2 mb-10">
                {STEPS.map((s, i) => (
                  <div key={s} className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${
                        i <= step ? "bg-gold text-white" : "bg-beige dark:bg-white/10 text-charcoal-light"
                      }`}>
                        {i + 1}
                      </div>
                      <span className={`text-xs tracking-wide ${i <= step ? "text-charcoal" : "text-charcoal-light"}`}>
                        {s}
                      </span>
                    </div>
                    <div className={`h-0.5 ${i <= step ? "bg-gold" : "bg-beige dark:bg-white/10"}`} />
                  </div>
                ))}
              </div>

              <form onSubmit={handleSubmit}>
                <AnimatePresence mode="wait">
                  {step === 0 && (
                    <motion.div key="step0" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
                      <h2 className="font-serif text-xl text-charcoal mb-4">Selected Products</h2>
                      {items.length === 0 ? (
                        <div className="text-center py-12 border border-beige dark:border-white/10">
                          <p className="text-charcoal-light mb-4">Your cart is empty. Add products first.</p>
                          <Button href="/products" variant="secondary">Browse Products</Button>
                        </div>
                      ) : (
                        <div className="space-y-3 mb-4">
                          {items.map((item) => (
                            <div key={item.product.id} className="flex items-center justify-between py-3 border-b border-beige dark:border-white/10">
                              <div>
                                <p className="text-sm font-medium text-charcoal">{item.product.name}</p>
                                <p className="text-xs text-charcoal-light">Qty: {item.quantity} &middot; {formatPrice(item.product.price)} {item.product.unit}</p>
                              </div>
                              <span className="text-sm text-gold font-medium">{formatPrice(item.product.price * item.quantity)}</span>
                            </div>
                          ))}
                          <div className="flex justify-between pt-2">
                            <span className="font-medium text-charcoal">Subtotal</span>
                            <span className="font-medium text-gold text-lg">{formatPrice(subtotal)}</span>
                          </div>
                        </div>
                      )}
                    </motion.div>
                  )}

                  {step === 1 && (
                    <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }} className="space-y-5">
                      <h2 className="font-serif text-xl text-charcoal mb-4">Project Details</h2>
                      <div>
                        <label className="block text-sm font-medium text-charcoal mb-1">Space Type *</label>
                        <select value={form.spaceType} onChange={(e) => update("spaceType", e.target.value)} required className={`${inputClass} cursor-pointer`}>
                          <option value="">Select space type</option>
                          {spaceTypes.map((t) => (<option key={t} value={t}>{t}</option>))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-charcoal mb-1">Total Area (sq.ft) *</label>
                        <input type="number" min="1" value={form.area} onChange={(e) => update("area", e.target.value)} required placeholder="e.g. 1200" className={inputClass} />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-charcoal mb-1">Timeline *</label>
                        <select value={form.timeline} onChange={(e) => update("timeline", e.target.value)} required className={`${inputClass} cursor-pointer`}>
                          <option value="">Select timeline</option>
                          {timelines.map((t) => (<option key={t} value={t}>{t}</option>))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-charcoal mb-1">Additional Notes</label>
                        <textarea rows={3} value={form.notes} onChange={(e) => update("notes", e.target.value)} placeholder="Any specific requirements..." className={`${inputClass} resize-none`} />
                      </div>
                    </motion.div>
                  )}

                  {step === 2 && (
                    <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }} className="space-y-5">
                      <h2 className="font-serif text-xl text-charcoal mb-4">Contact Information</h2>
                      <div>
                        <label className="block text-sm font-medium text-charcoal mb-1">Full Name *</label>
                        <input type="text" required value={form.name} onChange={(e) => update("name", e.target.value)} placeholder="Your name" className={inputClass} />
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
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
                        <label className="block text-sm font-medium text-charcoal mb-1">Company / Firm</label>
                        <input type="text" value={form.company} onChange={(e) => update("company", e.target.value)} placeholder="Optional" className={inputClass} />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Navigation */}
                <div className="flex items-center justify-between mt-8 pt-6 border-t border-beige dark:border-white/10">
                  {step > 0 ? (
                    <button type="button" onClick={() => setStep((s) => s - 1)} className="text-sm text-charcoal-light hover:text-charcoal transition-colors cursor-pointer">
                      &larr; Back
                    </button>
                  ) : <div />}
                  {step < 2 ? (
                    <Button type="button" onClick={() => setStep((s) => s + 1)} disabled={!canProceed()}>
                      Continue
                    </Button>
                  ) : (
                    <Button type="submit" disabled={!canProceed()}>
                      Submit Quote Request
                    </Button>
                  )}
                </div>
              </form>
            </>
          )}
        </Container>
      </div>
    </PageTransition>
  );
}
