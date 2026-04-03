import { useParams } from "react-router-dom";
import { products } from "@/data/products";
import { useSEO } from "@/hooks/useSEO";
import Container from "@/components/ui/Container";
import Breadcrumb from "@/components/ui/Breadcrumb";
import Button from "@/components/ui/Button";
import PageTransition from "@/components/shared/PageTransition";
import ProductJsonLd from "@/components/shared/ProductJsonLd";
import AgingSimulator from "@/components/shared/AgingSimulator";
import SustainabilityScorecard from "@/components/shared/SustainabilityScorecard";
import ProductGallery from "./ProductGallery";
import ProductInfo from "./ProductInfo";
import ProductSpecs from "./ProductSpecs";
import RelatedProducts from "./RelatedProducts";

export default function ProductDetail() {
  const { slug } = useParams<{ slug: string }>();
  const product = products.find((p) => p.slug === slug);

  useSEO({
    title: product
      ? `${product.name} | Lamiwood`
      : "Product Not Found | Lamiwood",
    description: product?.shortDescription,
    ogImage: product?.thumbnail,
    ogType: "product",
  });

  if (!product) {
    return (
      <PageTransition>
        <div className="pb-20 bg-cream min-h-screen flex items-center justify-center" style={{ paddingTop: "var(--header-height)" }}>
          <div className="text-center">
            <h1 className="font-serif text-4xl text-charcoal mb-4">
              Product Not Found
            </h1>
            <p className="text-charcoal-light mb-8">
              The product you&rsquo;re looking for doesn&rsquo;t exist.
            </p>
            <Button href="/products">Browse Products</Button>
          </div>
        </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <ProductJsonLd product={product} />
      <div className="pb-20 bg-cream" style={{ paddingTop: "var(--header-height)" }}>
        <Container>
          <Breadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "Products", href: "/products" },
              { label: product.name },
            ]}
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-6">
            <ProductGallery images={product.images} name={product.name} />
            <ProductInfo product={product} />
          </div>

          <ProductSpecs specs={product.specs} />
          <AgingSimulator
            material={product.material}
            imageUrl={product.thumbnail}
            productName={product.name}
          />
          <SustainabilityScorecard product={product} />
          <RelatedProducts current={product} />
        </Container>
      </div>
    </PageTransition>
  );
}
