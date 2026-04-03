import { Link } from "react-router-dom";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import ProductCard from "@/components/shared/ProductCard";
import { products } from "@/data/products";

const featured = products
  .filter((p) => p.badge === "bestseller" || p.badge === "premium")
  .slice(0, 4);

export default function FeaturedProducts() {
  return (
    <section className="py-20 md:py-28 bg-offwhite">
      <Container>
        <SectionHeading
          title="Curated Selections"
          subtitle="Our most sought-after surfaces, chosen by designers and architects worldwide."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        <div className="text-center mt-12">
          <Link
            to="/products"
            className="text-gold font-medium tracking-wide hover:text-gold-light transition-colors inline-flex items-center gap-2"
          >
            View All Products
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </Link>
        </div>
      </Container>
    </section>
  );
}
