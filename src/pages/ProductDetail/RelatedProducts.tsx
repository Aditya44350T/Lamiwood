import type { Product } from "@/types";
import { products } from "@/data/products";
import SectionHeading from "@/components/ui/SectionHeading";
import ProductCard from "@/components/shared/ProductCard";
import DragCarousel from "@/components/shared/DragCarousel";

interface RelatedProductsProps {
  current: Product;
}

export default function RelatedProducts({ current }: RelatedProductsProps) {
  const related = products
    .filter((p) => p.category === current.category && p.id !== current.id)
    .slice(0, 8);

  if (related.length === 0) return null;

  return (
    <section className="mt-20 pt-16 border-t border-beige dark:border-white/10">
      <SectionHeading title="You May Also Like" />
      {related.length <= 3 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {related.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <DragCarousel showArrows>
          {related.map((product) => (
            <div
              key={product.id}
              className="min-w-[280px] md:min-w-[300px] pr-6 shrink-0"
            >
              <ProductCard product={product} />
            </div>
          ))}
        </DragCarousel>
      )}
    </section>
  );
}
