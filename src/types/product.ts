export type CategorySlug =
  | "flooring"
  | "wall-panels"
  | "decking"
  | "ceiling-panels"
  | "cladding"
  | "acoustic-panels";

export interface ProductSpec {
  label: string;
  value: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: CategorySlug;
  price: number;
  unit: string;
  description: string;
  shortDescription: string;
  images: string[];
  thumbnail: string;
  badge?: "new" | "bestseller" | "premium";
  inStock: boolean;
  specs: ProductSpec[];
  features: string[];
  material: string;
  finish: string;
  sustainability?: {
    carbonFootprint: number; // kg CO2 per sq.ft (lower is better)
    recycledContent: number; // percentage 0-100
    fscCertified: boolean;
    vocRating: "A+" | "A" | "B" | "C";
    lifespan: number; // years
    recyclability: number; // percentage 0-100
  };
}

export interface Category {
  slug: CategorySlug;
  name: string;
  description: string;
  image: string;
  productCount: number;
}

export interface FilterState {
  categories: CategorySlug[];
  sortBy: "name-asc" | "name-desc" | "price-asc" | "price-desc" | "newest";
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  rating: number;
}

export interface NavLink {
  label: string;
  href: string;
}
