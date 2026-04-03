import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { mainNav } from "@/data/navigation";
import { cn } from "@/lib/utils";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const location = useLocation();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 z-50"
            onClick={onClose}
          />
          <motion.nav
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="fixed top-0 right-0 bottom-0 w-72 bg-cream z-50 shadow-xl"
          >
            <div className="flex items-center justify-between px-6 py-5 border-b border-beige dark:border-white/10">
              <img
                src="https://www.lamiwood.in/wp-content/uploads/2024/01/Lamiwood-Logo-small-light-min.png"
                alt="Lamiwood"
                className="h-8 w-auto brightness-0 dark:brightness-100"
              />
              <button
                onClick={onClose}
                className="p-2 text-charcoal hover:text-gold transition-colors cursor-pointer"
                aria-label="Close menu"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="flex flex-col p-6 gap-1">
              {mainNav.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={onClose}
                  className={cn(
                    "py-3 px-2 text-lg font-medium tracking-wide transition-colors border-b border-beige/50 dark:border-white/10",
                    location.pathname === link.href
                      ? "text-gold"
                      : "text-charcoal hover:text-gold",
                  )}
                >
                  {link.label}
                </Link>
              ))}

              {/* More section */}
              <p className="text-xs uppercase tracking-wider text-charcoal-light mt-6 mb-2 px-2">
                Tools & More
              </p>
              {[
                { href: "/calculator", label: "Surface Calculator", icon: "📐" },
                { href: "/consultation", label: "Design Consultation", icon: "🎨" },
                { href: "/pattern-designer", label: "Pattern Designer", icon: "🔲" },
                { href: "/material-journey", label: "Material Journey", icon: "🌳" },
                { href: "/compare", label: "Compare Products", icon: "⚖️" },
              ].map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={onClose}
                  className={cn(
                    "py-2.5 px-2 text-base font-medium tracking-wide transition-colors border-b border-beige/50 dark:border-white/10 flex items-center gap-2.5",
                    location.pathname === link.href
                      ? "text-gold"
                      : "text-charcoal hover:text-gold",
                  )}
                >
                  <span className="text-sm">{link.icon}</span>
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.nav>
        </>
      )}
    </AnimatePresence>
  );
}
