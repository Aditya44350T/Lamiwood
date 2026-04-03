import { useSEO } from "@/hooks/useSEO";
import PageTransition from "@/components/shared/PageTransition";
import HeroSection from "./HeroSection";
import FeaturedCategories from "./FeaturedCategories";
import FeaturedProducts from "./FeaturedProducts";
import NewArrivals from "./NewArrivals";
import BrowseByFinish from "./BrowseByFinish";
import WhyChooseUs from "./WhyChooseUs";
import TransformationsSection from "./TransformationsSection";
import TestimonialsSection from "./TestimonialsSection";
import BlogPreview from "./BlogPreview";
import ShowroomGallery from "./ShowroomGallery";
import CtaSection from "./CtaSection";

export default function Home() {
  useSEO({
    title: "Lamiwood | Premium Interior Surfaces",
    description:
      "Premium interior surfaces crafted for extraordinary spaces. Explore our collection of flooring, wall panels, decking, and more.",
    ogImage:
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1200&h=630&fit=crop&q=80",
  });

  return (
    <PageTransition>
      <HeroSection />
      <FeaturedCategories />
      <FeaturedProducts />
      <NewArrivals />
      <BrowseByFinish />
      <WhyChooseUs />
      <TransformationsSection />
      <TestimonialsSection />
      <BlogPreview />
      <ShowroomGallery />
      <CtaSection />
    </PageTransition>
  );
}
