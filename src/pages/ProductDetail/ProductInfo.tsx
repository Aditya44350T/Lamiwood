import { useState } from "react";
import { Link } from "react-router-dom";
import type { Product } from "@/types";
import { useCart } from "@/contexts/CartContext";
import { formatPrice } from "@/lib/utils";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import WishlistButton from "@/components/shared/WishlistButton";
import PriceCalculator from "@/components/shared/PriceCalculator";
import SampleRequestModal from "@/components/shared/SampleRequestModal";

interface ProductInfoProps {
  product: Product;
}

export default function ProductInfo({ product }: ProductInfoProps) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);
  const [sampleOpen, setSampleOpen] = useState(false);

  const handleAdd = () => {
    addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div>
      <div className="flex items-center gap-3 mb-3">
        <span className="text-xs uppercase tracking-wider text-charcoal-light">
          {product.category.replace("-", " ")}
        </span>
        {product.badge && <Badge variant={product.badge}>{product.badge}</Badge>}
        <div className="ml-auto">
          <WishlistButton product={product} size="md" />
        </div>
      </div>

      <h1 className="font-serif text-3xl md:text-4xl text-charcoal mb-4">
        {product.name}
      </h1>

      <p className="text-gold text-2xl font-medium mb-6">
        {formatPrice(product.price)}{" "}
        <span className="text-base text-charcoal-light font-normal">
          {product.unit}
        </span>
      </p>

      <p className="text-charcoal-light leading-relaxed mb-8">
        {product.description}
      </p>

      <div className="mb-8">
        <h3 className="text-sm font-medium uppercase tracking-wider text-charcoal mb-3">
          Features
        </h3>
        <ul className="space-y-2">
          {product.features.map((feature) => (
            <li key={feature} className="flex items-start gap-2 text-sm text-charcoal-light">
              <span className="text-gold mt-1.5 shrink-0">&#9670;</span>
              {feature}
            </li>
          ))}
        </ul>
      </div>

      <div className="flex flex-wrap gap-3">
        <Button size="lg" onClick={handleAdd}>
          {added ? "Added!" : "Add to Cart"}
        </Button>
        <Button variant="secondary" size="lg" onClick={() => setSampleOpen(true)}>
          Request Free Sample
        </Button>
      </div>

      <div className="flex flex-wrap gap-3 mt-3">
        <Link
          to={`/compare?select=${product.id}`}
          className="inline-flex items-center gap-2 px-5 py-2.5 border border-beige text-sm font-medium text-charcoal hover:border-gold hover:text-gold transition-colors"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
          </svg>
          Compare
        </Link>
        <Link
          to="/consultation"
          className="inline-flex items-center gap-2 px-5 py-2.5 border border-beige text-sm font-medium text-charcoal hover:border-gold hover:text-gold transition-colors"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" />
          </svg>
          Get Recommendation
        </Link>
      </div>

      <PriceCalculator product={product} />

      <SampleRequestModal
        product={product}
        isOpen={sampleOpen}
        onClose={() => setSampleOpen(false)}
      />
    </div>
  );
}
