import { useEffect } from "react";
import { useWishlist } from "@/contexts/WishlistContext";
import Container from "@/components/ui/Container";
import Breadcrumb from "@/components/ui/Breadcrumb";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import PageTransition from "@/components/shared/PageTransition";
import ProductCard from "@/components/shared/ProductCard";

export default function Wishlist() {
  const { items } = useWishlist();

  useEffect(() => {
    document.title = "Wishlist | Lamiwood";
  }, []);

  return (
    <PageTransition>
      <div className="pb-20 bg-cream min-h-screen" style={{ paddingTop: "var(--header-height)" }}>
        <Container>
          <Breadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "Wishlist" },
            ]}
          />
          <SectionHeading
            title="Your Wishlist"
            subtitle={
              items.length > 0
                ? `${items.length} item${items.length !== 1 ? "s" : ""} saved`
                : undefined
            }
            className="mt-4"
          />

          {items.length === 0 ? (
            <div className="text-center py-16">
              <svg className="w-16 h-16 mx-auto mb-6 text-beige" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
              </svg>
              <p className="text-charcoal-light text-lg mb-6">
                Your wishlist is empty
              </p>
              <Button href="/products">Browse Products</Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {items.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </Container>
      </div>
    </PageTransition>
  );
}
