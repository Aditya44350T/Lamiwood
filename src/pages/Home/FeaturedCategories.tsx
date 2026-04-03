import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import CategoryCard from "@/components/shared/CategoryCard";
import { categories } from "@/data/categories";

export default function FeaturedCategories() {
  return (
    <section className="py-20 md:py-28 bg-cream">
      <Container>
        <SectionHeading
          title="Our Collections"
          subtitle="Explore our carefully curated range of premium interior and exterior surfaces, each crafted to transform spaces."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <CategoryCard key={category.slug} category={category} />
          ))}
        </div>
      </Container>
    </section>
  );
}
