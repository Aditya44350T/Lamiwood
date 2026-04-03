import type { Category } from "@/types";
import { products } from "./products";

function countByCategory(slug: Category["slug"]): number {
  return products.filter((p) => p.category === slug).length;
}

export const categories: Category[] = [
  {
    slug: "flooring",
    name: "Flooring",
    description:
      "Engineered hardwood and solid wood flooring crafted for beauty and endurance.",
    image: "https://images.unsplash.com/photo-1722604828977-395d52c3cd23?w=1200&h=600&fit=crop&q=80",
    productCount: countByCategory("flooring"),
  },
  {
    slug: "wall-panels",
    name: "Wall Panels",
    description:
      "Transform your walls into statements of luxury with our curated panel collections.",
    image: "https://images.unsplash.com/photo-1754380629457-b833f6bea68a?w=1200&h=600&fit=crop&q=80",
    productCount: countByCategory("wall-panels"),
  },
  {
    slug: "decking",
    name: "Decking",
    description:
      "Premium outdoor surfaces built to withstand the elements in style.",
    image: "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=1200&h=600&fit=crop&q=80",
    productCount: countByCategory("decking"),
  },
  {
    slug: "ceiling-panels",
    name: "Ceiling Panels",
    description:
      "Elevate the fifth wall with our range of wood ceiling treatments.",
    image: "https://images.unsplash.com/photo-1664509941658-bb5483d3eba7?w=1200&h=600&fit=crop&q=80",
    productCount: countByCategory("ceiling-panels"),
  },
  {
    slug: "cladding",
    name: "Cladding",
    description:
      "Weather-resistant wood cladding that wraps your home in natural beauty.",
    image: "https://images.unsplash.com/photo-1758239652314-b68992ea55bc?w=1200&h=600&fit=crop&q=80",
    productCount: countByCategory("cladding"),
  },
  {
    slug: "acoustic-panels",
    name: "Acoustic Panels",
    description:
      "Sound-absorbing panels that balance acoustics with architectural elegance.",
    image: "https://images.unsplash.com/photo-1647697362146-3352eeddd458?w=1200&h=600&fit=crop&q=80",
    productCount: countByCategory("acoustic-panels"),
  },
];
