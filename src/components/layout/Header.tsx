import { useState, useEffect, useRef, useCallback } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useScrollPosition } from "@/hooks/useScrollPosition";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";
import { useTheme } from "@/contexts/ThemeContext";
import { mainNav } from "@/data/navigation";
import { cn } from "@/lib/utils";
import Container from "@/components/ui/Container";
import AnnouncementBar from "./AnnouncementBar";
import MobileMenu from "./MobileMenu";
import CartDrawer from "@/components/shared/CartDrawer";
import SearchOverlay from "@/components/shared/SearchOverlay";

const LOGO_URL =
  "https://www.lamiwood.in/wp-content/uploads/2024/01/Lamiwood-Logo-small-light-min.png";

// Animated nav link with underline
function NavLink({
  href,
  label,
  isActive,
  lightMode,
}: {
  href: string;
  label: string;
  isActive: boolean;
  lightMode: boolean;
}) {
  return (
    <Link
      to={href}
      className={cn(
        "relative text-sm font-medium tracking-wide transition-colors duration-300 py-1",
        isActive
          ? "text-gold"
          : lightMode
            ? "text-white/90 hover:text-gold"
            : "text-charcoal hover:text-gold",
      )}
    >
      {label}
      {/* Animated underline */}
      <motion.span
        className="absolute -bottom-0.5 left-0 right-0 h-[1.5px] bg-gold origin-left"
        initial={false}
        animate={{ scaleX: isActive ? 1 : 0 }}
        whileHover={{ scaleX: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      />
    </Link>
  );
}

// More dropdown items
const moreLinks = [
  {
    href: "/calculator",
    label: "Surface Calculator",
    description: "Estimate material quantity & cost",
    icon: "📐",
  },
  {
    href: "/consultation",
    label: "Design Consultation",
    description: "Style quiz & free expert booking",
    icon: "🎨",
  },
  {
    href: "/pattern-designer",
    label: "Pattern Designer",
    description: "Preview herringbone, chevron & more",
    icon: "🔲",
  },
  {
    href: "/material-journey",
    label: "Material Journey",
    description: "From forest to floor — our story",
    icon: "🌳",
  },
  {
    href: "/compare",
    label: "Compare Products",
    description: "Side-by-side product comparison",
    icon: "⚖️",
  },
];

// More dropdown nav item
function MoreDropdown({ lightMode }: { lightMode: boolean }) {
  const location = useLocation();
  const isActiveInMore = moreLinks.some((l) => location.pathname === l.href);

  return (
    <div className="relative group/more">
      <button
        className={cn(
          "relative text-sm font-medium tracking-wide transition-colors duration-300 py-1 cursor-pointer inline-flex items-center gap-1",
          isActiveInMore
            ? "text-gold"
            : lightMode
              ? "text-white/90 hover:text-gold"
              : "text-charcoal hover:text-gold",
        )}
      >
        More
        <svg
          className="w-3.5 h-3.5 transition-transform duration-200 group-hover/more:rotate-180"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
        {/* Animated underline */}
        <motion.span
          className="absolute -bottom-0.5 left-0 right-0 h-[1.5px] bg-gold origin-left"
          initial={false}
          animate={{ scaleX: isActiveInMore ? 1 : 0 }}
          whileHover={{ scaleX: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
        />
      </button>

      {/* Dropdown panel */}
      <div className="absolute top-full right-0 pt-3 opacity-0 invisible group-hover/more:opacity-100 group-hover/more:visible transition-all duration-200 z-50">
        <div className="bg-white dark:bg-[#1E1E1E] border border-beige dark:border-white/10 shadow-xl w-72 py-2">
          {moreLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className={cn(
                "flex items-start gap-3 px-4 py-3 hover:bg-beige/30 dark:hover:bg-white/5 transition-colors",
                location.pathname === link.href && "bg-gold/5",
              )}
            >
              <span className="text-lg mt-0.5 shrink-0">{link.icon}</span>
              <div>
                <span
                  className={cn(
                    "block text-sm font-medium",
                    location.pathname === link.href
                      ? "text-gold"
                      : "text-charcoal",
                  )}
                >
                  {link.label}
                </span>
                <span className="block text-xs text-charcoal-light mt-0.5">
                  {link.description}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

// Bouncing badge
function AnimatedBadge({ count, color }: { count: number; color: string }) {
  const prevCount = useRef(count);
  const [key, setKey] = useState(0);

  useEffect(() => {
    if (count !== prevCount.current && count > 0) {
      setKey((k) => k + 1);
    }
    prevCount.current = count;
  }, [count]);

  if (count === 0) return null;

  return (
    <AnimatePresence mode="popLayout">
      <motion.span
        key={key}
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 500, damping: 15 }}
        className={cn(
          "absolute -top-0.5 -right-0.5 w-4 h-4 text-white text-[10px] font-bold rounded-full flex items-center justify-center",
          color,
        )}
      >
        {count}
      </motion.span>
    </AnimatePresence>
  );
}

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const scrollY = useScrollPosition();
  const location = useLocation();
  const navigate = useNavigate();
  const { totalItems: cartCount } = useCart();
  const { totalItems: wishlistCount } = useWishlist();
  const { isDark, toggleTheme } = useTheme();
  const isScrolled = scrollY > 80;
  const isHome = location.pathname === "/";
  const useLight = isHome && !isScrolled;

  // Measure header height and expose as CSS variable for page content spacing
  const updateHeaderHeight = useCallback(() => {
    if (headerRef.current) {
      const h = headerRef.current.offsetHeight;
      document.documentElement.style.setProperty("--header-height", `${h}px`);
    }
  }, []);

  useEffect(() => {
    updateHeaderHeight();
    const el = headerRef.current;
    if (!el) return;
    const ro = new ResizeObserver(updateHeaderHeight);
    ro.observe(el);
    return () => ro.disconnect();
  }, [updateHeaderHeight]);

  const iconColor = useLight
    ? "text-white hover:text-gold"
    : "text-charcoal hover:text-gold";

  return (
    <>
      <motion.header
        ref={headerRef}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          isScrolled || !isHome
            ? "bg-cream/95 backdrop-blur-sm shadow-sm"
            : "bg-transparent",
        )}
        initial={false}
        animate={{
          borderBottomColor:
            isScrolled || !isHome
              ? "rgba(232, 224, 212, 0.5)"
              : "rgba(232, 224, 212, 0)",
        }}
      >
        {!isScrolled && <AnnouncementBar />}
        <Container size="wide">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link to="/" className="block shrink-0">
              <img
                src={LOGO_URL}
                alt="Lamiwood"
                className={cn(
                  "h-10 md:h-[70px] w-auto transition-all duration-300",
                  useLight || isDark ? "brightness-100" : "brightness-0",
                )}
              />
            </Link>

            {/* Desktop nav with animated underlines */}
            <nav className="hidden md:flex items-center gap-8">
              {mainNav.map((link) => (
                <NavLink
                  key={link.href}
                  href={link.href}
                  label={link.label}
                  isActive={location.pathname === link.href}
                  lightMode={useLight}
                />
              ))}
              <MoreDropdown lightMode={useLight} />
            </nav>

            {/* Action icons */}
            <div className="flex items-center gap-3">
              {/* Theme toggle */}
              <button
                onClick={toggleTheme}
                className={cn(
                  "p-2 transition-colors cursor-pointer hidden sm:block",
                  iconColor,
                )}
                aria-label={
                  isDark ? "Switch to light mode" : "Switch to dark mode"
                }
              >
                {isDark ? (
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                    />
                  </svg>
                ) : (
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
                    />
                  </svg>
                )}
              </button>

              {/* Search */}
              <button
                onClick={() => setSearchOpen(true)}
                className={cn(
                  "p-2 transition-colors cursor-pointer",
                  iconColor,
                )}
                aria-label="Search"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                  />
                </svg>
              </button>

              {/* Wishlist */}
              <button
                onClick={() => navigate("/wishlist")}
                className={cn(
                  "p-2 transition-colors cursor-pointer relative hidden sm:block",
                  iconColor,
                )}
                aria-label="Wishlist"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                  />
                </svg>
                <AnimatedBadge count={wishlistCount} color="bg-red-500" />
              </button>

              {/* Cart */}
              <button
                onClick={() => setCartOpen(true)}
                className={cn(
                  "p-2 transition-colors cursor-pointer relative",
                  iconColor,
                )}
                aria-label="Cart"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                  />
                </svg>
                <AnimatedBadge count={cartCount} color="bg-gold" />
              </button>

              {/* Mobile hamburger */}
              <button
                onClick={() => setMobileOpen(true)}
                className={cn(
                  "md:hidden p-2 transition-colors cursor-pointer",
                  iconColor,
                )}
                aria-label="Open menu"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5"
                  />
                </svg>
              </button>
            </div>
          </div>
        </Container>
      </motion.header>

      <MobileMenu isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
      <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />
      <SearchOverlay
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
      />
    </>
  );
}
