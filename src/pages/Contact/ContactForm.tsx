import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import Button from "@/components/ui/Button";
import { EASE_LUXURY, SPRING_GENTLE } from "@/lib/animations";

const subjects = [
  "General Inquiry",
  "Product Inquiry",
  "Project Consultation",
  "Partnership",
];

function AnimatedInput({
  id,
  label,
  required,
  type = "text",
  placeholder,
  value,
  onChange,
}: {
  id: string;
  label: string;
  required?: boolean;
  type?: string;
  placeholder: string;
  value: string;
  onChange: (val: string) => void;
}) {
  const [focused, setFocused] = useState(false);
  const hasValue = value.length > 0;

  return (
    <div className="relative">
      <motion.label
        htmlFor={id}
        className="absolute left-4 text-charcoal-light pointer-events-none origin-left"
        initial={false}
        animate={{
          y: focused || hasValue ? -24 : 12,
          scale: focused || hasValue ? 0.85 : 1,
          color: focused ? "#B8860B" : undefined,
        }}
        transition={{ duration: 0.2, ease: EASE_LUXURY }}
      >
        {label}
        {required && " *"}
      </motion.label>
      <input
        id={id}
        type={type}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder={focused ? placeholder : ""}
        className="w-full px-4 py-3 text-sm border border-beige dark:border-white/10 bg-white dark:bg-[#1E1E1E] text-charcoal placeholder:text-charcoal-light/40 focus:outline-none transition-colors"
      />
      {/* Animated gold underline */}
      <motion.span
        className="absolute bottom-0 left-0 right-0 h-[2px] bg-gold origin-left"
        initial={false}
        animate={{ scaleX: focused ? 1 : 0 }}
        transition={{ duration: 0.3, ease: EASE_LUXURY }}
      />
    </div>
  );
}

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: subjects[0],
    message: "",
  });

  const update = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={SPRING_GENTLE}
        className="p-8 border border-beige dark:border-white/10 bg-offwhite dark:bg-[#1E1E1E] text-center"
      >
        <div className="text-gold mb-4">
          <svg
            className="w-12 h-12 mx-auto"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <h3 className="font-serif text-2xl text-charcoal mb-2">
          Message Sent
        </h3>
        <p className="text-charcoal-light">
          Thank you for reaching out. Our team will respond within 24 hours.
        </p>
      </motion.div>
    );
  }

  const [msgFocused, setMsgFocused] = useState(false);

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        <AnimatedInput
          id="name"
          label="Name"
          required
          placeholder="Your full name"
          value={formData.name}
          onChange={(val) => update("name", val)}
        />
        <AnimatedInput
          id="email"
          label="Email"
          type="email"
          required
          placeholder="you@example.com"
          value={formData.email}
          onChange={(val) => update("email", val)}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        <AnimatedInput
          id="phone"
          label="Phone"
          type="tel"
          placeholder="+91 00000 00000"
          value={formData.phone}
          onChange={(val) => update("phone", val)}
        />
        <div>
          <label
            htmlFor="subject"
            className="block text-sm font-medium text-charcoal mb-1.5"
          >
            Subject *
          </label>
          <select
            id="subject"
            required
            value={formData.subject}
            onChange={(e) => update("subject", e.target.value)}
            className="w-full px-4 py-3 text-sm border border-beige dark:border-white/10 bg-white dark:bg-[#1E1E1E] text-charcoal focus:border-gold focus:outline-none transition-colors cursor-pointer"
          >
            {subjects.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="relative">
        <motion.label
          htmlFor="message"
          className="absolute left-4 text-charcoal-light pointer-events-none origin-left"
          initial={false}
          animate={{
            y: msgFocused || formData.message.length > 0 ? -24 : 12,
            scale: msgFocused || formData.message.length > 0 ? 0.85 : 1,
            color: msgFocused ? "#B8860B" : undefined,
          }}
          transition={{ duration: 0.2, ease: EASE_LUXURY }}
        >
          Message *
        </motion.label>
        <textarea
          id="message"
          required
          rows={6}
          value={formData.message}
          onChange={(e) => update("message", e.target.value)}
          onFocus={() => setMsgFocused(true)}
          onBlur={() => setMsgFocused(false)}
          placeholder={msgFocused ? "Tell us about your project..." : ""}
          className="w-full px-4 py-3 text-sm border border-beige dark:border-white/10 bg-white dark:bg-[#1E1E1E] text-charcoal placeholder:text-charcoal-light/40 focus:outline-none transition-colors resize-none"
        />
        <motion.span
          className="absolute bottom-0 left-0 right-0 h-[2px] bg-gold origin-left"
          initial={false}
          animate={{ scaleX: msgFocused ? 1 : 0 }}
          transition={{ duration: 0.3, ease: EASE_LUXURY }}
        />
      </div>

      <Button type="submit" size="lg">
        Send Message
      </Button>
    </form>
  );
}
