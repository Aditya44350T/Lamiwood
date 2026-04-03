import type { Product } from "@/types";

interface ProductJsonLdProps {
  product: Product;
}

export default function ProductJsonLd({ product }: ProductJsonLdProps) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.shortDescription,
    image: product.images,
    brand: {
      "@type": "Brand",
      name: "Lamiwood",
    },
    offers: {
      "@type": "Offer",
      price: product.price,
      priceCurrency: "INR",
      availability: product.inStock
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        price: product.price,
        priceCurrency: "INR",
        unitText: product.unit,
      },
    },
    material: product.material,
    category: product.category.replace("-", " "),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export function OrganizationJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Lamiwood",
    url: "https://www.lamiwood.in",
    logo: "https://www.lamiwood.in/wp-content/uploads/2024/01/Lamiwood-Logo-small-light-min.png",
    description:
      "Premium interior surfaces crafted for extraordinary spaces.",
    address: {
      "@type": "PostalAddress",
      streetAddress: "42 Artisan Boulevard, Design District",
      addressLocality: "Mumbai",
      postalCode: "400001",
      addressCountry: "IN",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+91-22-4000-1234",
      contactType: "customer service",
    },
    sameAs: [
      "https://instagram.com/lamiwood",
      "https://pinterest.com/lamiwood",
      "https://linkedin.com/company/lamiwood",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
