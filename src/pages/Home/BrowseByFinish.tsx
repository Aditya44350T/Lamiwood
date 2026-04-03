import { Link } from "react-router-dom";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import AnimatedSection from "@/components/shared/AnimatedSection";

const finishes = [
  {
    name: "Natural Oil",
    color: "bg-[#C8A96E]",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=400&h=400&fit=crop&q=80",
  },
  {
    name: "Charred Black",
    color: "bg-[#2C2C2C]",
    image: "https://images.unsplash.com/photo-1566305977571-5ada26186bac?w=400&h=400&fit=crop&q=80",
  },
  {
    name: "Bleached White",
    color: "bg-[#E8E0D4]",
    image: "https://images.unsplash.com/photo-1560185009-5bf9f2349488?w=400&h=400&fit=crop&q=80",
  },
  {
    name: "Honey Tone",
    color: "bg-[#D4A843]",
    image: "https://images.unsplash.com/photo-1622547748225-3fc4abd2cca0?w=400&h=400&fit=crop&q=80",
  },
  {
    name: "Dark Walnut",
    color: "bg-[#5C3A1E]",
    image: "https://images.unsplash.com/photo-1557682250-33bd709cbe85?w=400&h=400&fit=crop&q=80",
  },
  {
    name: "Grey Wash",
    color: "bg-[#8B8B8B]",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=400&h=400&fit=crop&q=80",
  },
];

export default function BrowseByFinish() {
  return (
    <section className="py-20 md:py-28 bg-offwhite">
      <Container>
        <SectionHeading
          title="Browse by Finish"
          subtitle="Find the perfect tone for your space — from warm naturals to bold charred textures."
        />
        <div className="grid grid-cols-3 md:grid-cols-6 gap-4 md:gap-6">
          {finishes.map((finish, i) => (
            <AnimatedSection key={finish.name} delay={i * 0.06}>
              <Link
                to="/products"
                className="group flex flex-col items-center text-center"
              >
                <div
                  className={`w-20 h-20 md:w-24 md:h-24 rounded-full ${finish.color} mb-3 transition-transform duration-300 group-hover:scale-110 shadow-md`}
                />
                <span className="text-sm text-charcoal font-medium group-hover:text-gold transition-colors">
                  {finish.name}
                </span>
              </Link>
            </AnimatedSection>
          ))}
        </div>
      </Container>
    </section>
  );
}
