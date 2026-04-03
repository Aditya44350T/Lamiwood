# Lamiwood — Premium Interior Surfaces

A production-ready React frontend for **Lamiwood**, a premium interior design eCommerce brand. Built with Vite, TypeScript, Tailwind CSS v4, and Framer Motion.

---

## Features Implemented

- **5 fully built pages** — Home, Product Listing, Product Detail, About Us, Contact Us, plus a 404 page
- **16 mock products** across 6 categories (Flooring, Wall Panels, Decking, Ceiling Panels, Cladding, Acoustic Panels)
- **Product filtering & sorting** — filter by category, sort by name/price/newest, URL-driven state for shareable links
- **Product detail** — image gallery with crossfade, specifications table, features list, related products, CTAs
- **Responsive design** — mobile-first, works at 375px through 1440px+
- **Smooth animations** — Framer Motion page transitions, scroll-triggered reveals, staggered text, hover micro-interactions
- **Sticky header** — transparent on home hero, solid with blur on scroll / inner pages
- **Mobile navigation** — animated slide-in drawer with AnimatePresence
- **Self-hosted fonts** — Playfair Display (serif headings) + Inter (body) via @fontsource
- **Lazy-loaded routes** — every page is code-split via React.lazy()
- **Error boundary** — graceful error handling with fallback UI
- **Image fallbacks** — shimmer skeleton loaders and graceful error states
- **SEO-friendly** — per-page document titles, meta description, semantic HTML
- **Contact form** — client-side validation with success state
- **Newsletter signup** — email subscription form in footer
- **Breadcrumb navigation** — on product listing and detail pages

---

## Tech Stack

| Technology | Version | Purpose |
|---|---|---|
| React | 19 | UI framework |
| Vite | 8 | Build tool & dev server |
| TypeScript | 6 | Type safety |
| Tailwind CSS | 4 | Utility-first styling (via Vite plugin) |
| React Router | 7 | Client-side routing |
| Framer Motion | 12 | Animations & page transitions |
| @fontsource | 5 | Self-hosted web fonts |

---

## Folder Structure

```
src/
├── main.tsx                  # App entry point
├── App.tsx                   # ErrorBoundary + Router wrapper
├── index.css                 # Tailwind imports + design system theme
├── vite-env.d.ts             # Vite type declarations
│
├── types/                    # TypeScript interfaces
│   ├── index.ts              # Re-exports
│   └── product.ts            # Product, Category, FilterState, etc.
│
├── data/                     # Mock data (no API calls)
│   ├── products.ts           # 16 product objects
│   ├── categories.ts         # 6 category definitions
│   ├── testimonials.ts       # 4 client testimonials
│   └── navigation.ts         # Nav links, footer links, category links
│
├── lib/                      # Utilities & constants
│   ├── utils.ts              # cn(), formatPrice(), slugify()
│   └── constants.ts          # App name, contact info, social links
│
├── hooks/                    # Custom React hooks
│   ├── useScrollPosition.ts  # Scroll Y tracking (header)
│   ├── useIntersectionObserver.ts  # Scroll-triggered visibility
│   └── useMediaQuery.ts      # Responsive breakpoint detection
│
├── components/
│   ├── ui/                   # Primitive reusable components
│   │   ├── Button.tsx        # Primary/secondary/ghost variants
│   │   ├── Container.tsx     # Max-width wrapper
│   │   ├── SectionHeading.tsx # Serif heading + gold line
│   │   ├── Badge.tsx         # Product badges (new, bestseller, premium)
│   │   ├── Breadcrumb.tsx    # Navigation breadcrumbs
│   │   ├── LoadingSpinner.tsx # Suspense fallback
│   │   └── ImageWithFallback.tsx  # Shimmer + error fallback
│   │
│   ├── shared/               # Domain-specific shared components
│   │   ├── ProductCard.tsx   # Product thumbnail card
│   │   ├── CategoryCard.tsx  # Category image card with overlay
│   │   ├── TestimonialCard.tsx # Quote card
│   │   ├── NewsletterForm.tsx # Email subscribe form
│   │   ├── ErrorBoundary.tsx # React error boundary
│   │   ├── PageTransition.tsx # Framer Motion page wrapper
│   │   └── AnimatedSection.tsx # Scroll-triggered reveal
│   │
│   └── layout/               # App shell components
│       ├── Header.tsx        # Sticky header with scroll effect
│       ├── Footer.tsx        # 4-column footer
│       ├── Layout.tsx        # Header + Outlet + Footer
│       ├── MobileMenu.tsx    # Slide-in mobile nav
│       └── ScrollToTop.tsx   # Reset scroll on navigation
│
├── pages/
│   ├── Home/
│   │   ├── index.tsx         # Page composition
│   │   ├── HeroSection.tsx   # Full-viewport hero with staggered animation
│   │   ├── FeaturedCategories.tsx  # 6 category cards grid
│   │   ├── FeaturedProducts.tsx    # 4 featured product cards
│   │   ├── WhyChooseUs.tsx   # 4 value propositions
│   │   ├── TestimonialsSection.tsx # Dark section, testimonials
│   │   └── CtaSection.tsx    # Contact call-to-action banner
│   │
│   ├── Products/
│   │   ├── index.tsx         # Filter/sort state, URL params
│   │   ├── FilterSidebar.tsx # Category checkboxes
│   │   ├── SortDropdown.tsx  # Sort by name/price/newest
│   │   ├── ActiveFilters.tsx # Filter chips with remove
│   │   └── ProductGrid.tsx   # Responsive product grid
│   │
│   ├── ProductDetail/
│   │   ├── index.tsx         # Slug lookup, layout
│   │   ├── ProductGallery.tsx # Image with crossfade
│   │   ├── ProductInfo.tsx   # Name, price, features, CTAs
│   │   ├── ProductSpecs.tsx  # Specifications table
│   │   └── RelatedProducts.tsx # Same-category recommendations
│   │
│   ├── About/
│   │   ├── index.tsx         # Page with hero
│   │   ├── StorySection.tsx  # Brand origin story
│   │   ├── ValuesSection.tsx # 4 core values
│   │   ├── CraftsmanshipSection.tsx # Dark section, process description
│   │   └── TeamSection.tsx   # Team member cards
│   │
│   ├── Contact/
│   │   ├── index.tsx         # Page with hero
│   │   ├── ContactForm.tsx   # Validated form with success state
│   │   ├── ContactInfo.tsx   # Address, phone, email, hours
│   │   └── MapPlaceholder.tsx # Future map embed placeholder
│   │
│   └── NotFound.tsx          # 404 page
│
└── router/
    ├── index.tsx             # BrowserRouter + Suspense
    └── routes.tsx            # Lazy-loaded route definitions
```

---

## Setup Instructions

### Prerequisites
- Node.js 18+ and npm

### Install & Run

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Development

The dev server runs on `http://localhost:5173` by default.

Path aliases are configured — use `@/` to reference the `src/` directory:
```ts
import Button from "@/components/ui/Button";
```

---

## Design System

### Colors
| Token | Hex | Usage |
|---|---|---|
| `cream` | `#FAF7F2` | Page backgrounds |
| `beige` | `#E8E0D4` | Borders, dividers |
| `charcoal` | `#2C2C2C` | Primary text |
| `charcoal-light` | `#4A4A4A` | Secondary text |
| `gold` | `#B8860B` | Accents, CTAs, highlights |
| `gold-light` | `#D4A843` | Hover states |
| `offwhite` | `#FDFCFA` | Alternate section backgrounds |

### Typography
- **Headings**: Playfair Display Variable (serif)
- **Body**: Inter (sans-serif)

### Animation
All animations use Framer Motion with a consistent easing: `cubic-bezier(0.25, 0.1, 0.25, 1)`

---

## Pending / Future Improvements

- [ ] Replace placeholder product images with real photography
- [ ] Add product search functionality
- [ ] Implement shopping cart with Context API or Zustand
- [ ] Add dark mode toggle
- [ ] Integrate with a headless CMS (Sanity, Strapi) for product management
- [ ] Add product comparison feature
- [ ] Implement wishlist / favorites
- [ ] Add Google Maps embed on contact page
- [ ] Set up unit tests (Vitest + Testing Library)
- [ ] Add sitemap.xml and robots.txt for SEO
- [ ] Implement i18n for multi-language support
- [ ] Add analytics integration (GA4 / Plausible)
- [ ] Progressive Web App (PWA) setup
- [ ] Image optimization pipeline (WebP/AVIF generation)
- [ ] Lighthouse performance audit and optimizations
