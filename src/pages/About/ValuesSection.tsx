import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import AnimatedSection from "@/components/shared/AnimatedSection";

const values = [
  {
    title: "Sustainable Sourcing",
    description:
      "We partner exclusively with certified forests and responsible suppliers, ensuring every plank protects the ecosystems it came from.",
  },
  {
    title: "Artisan Craftsmanship",
    description:
      "Our master craftsmen blend traditional woodworking heritage with CNC precision to create surfaces of uncompromising quality.",
  },
  {
    title: "Timeless Design",
    description:
      "We design for decades, not seasons. Our surfaces are chosen to remain beautiful and relevant long after trends have passed.",
  },
  {
    title: "Client Partnership",
    description:
      "From the first consultation to final installation, we work as an extension of your design team, not just a supplier.",
  },
];

export default function ValuesSection() {
  return (
    <section className="py-20 md:py-28 bg-offwhite dark:bg-[#1a1a1a]">
      <Container>
        <SectionHeading
          title="Our Values"
          subtitle="The principles that define every surface we craft and every relationship we build."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((v, i) => (
            <AnimatedSection key={v.title} delay={i * 0.1}>
              <div className="p-6 border border-beige dark:border-white/10 bg-white dark:bg-[#1E1E1E] h-full">
                <div className="w-8 h-0.5 bg-gold mb-4" />
                <h3 className="font-serif text-xl text-charcoal mb-3">
                  {v.title}
                </h3>
                <p className="text-charcoal-light text-sm leading-relaxed">
                  {v.description}
                </p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </Container>
    </section>
  );
}
