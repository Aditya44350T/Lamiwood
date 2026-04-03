import type { NavLink } from "@/types";

export const mainNav: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/products" },
  { label: "Projects", href: "/projects" },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const footerLinks: NavLink[] = [
  { label: "All Products", href: "/products" },
  { label: "Compare Products", href: "/compare" },
  { label: "Project Gallery", href: "/projects" },
  { label: "Design Blog", href: "/blog" },
  { label: "Request a Quote", href: "/quote" },
  { label: "About Us", href: "/about" },
  { label: "Contact Us", href: "/contact" },
  { label: "Surface Calculator", href: "/calculator" },
  { label: "Pattern Designer", href: "/pattern-designer" },
  { label: "Design Consultation", href: "/consultation" },
  { label: "Material Journey", href: "/material-journey" },
];

export const categoryLinks: NavLink[] = [
  { label: "Flooring", href: "/products?category=flooring" },
  { label: "Wall Panels", href: "/products?category=wall-panels" },
  { label: "Decking", href: "/products?category=decking" },
  { label: "Ceiling Panels", href: "/products?category=ceiling-panels" },
  { label: "Cladding", href: "/products?category=cladding" },
  { label: "Acoustic Panels", href: "/products?category=acoustic-panels" },
];
