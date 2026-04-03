import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import AnimatedSection from "@/components/shared/AnimatedSection";
import BeforeAfterSlider from "@/components/shared/BeforeAfterSlider";

const transformations = [
  {
    title: "Modern Living Room",
    beforeSrc:
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800&h=533&fit=crop&q=80",
    afterSrc:
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&h=533&fit=crop&q=80",
  },
  {
    title: "Executive Office",
    beforeSrc:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=533&fit=crop&q=80",
    afterSrc:
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&h=533&fit=crop&q=80",
  },
  {
    title: "Boutique Bedroom",
    beforeSrc:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800&h=533&fit=crop&q=80",
    afterSrc:
      "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=800&h=533&fit=crop&q=80",
  },
];

export default function TransformationsSection() {
  return (
    <section className="py-20 md:py-28 bg-offwhite dark:bg-[#1a1a1a]">
      <Container>
        <SectionHeading
          title="Transformations"
          subtitle="Drag the slider to see how Lamiwood surfaces transform spaces from ordinary to extraordinary."
        />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {transformations.slice(0, 2).map((t, i) => (
            <AnimatedSection key={t.title} delay={i * 0.15}>
              <BeforeAfterSlider
                beforeSrc={t.beforeSrc}
                afterSrc={t.afterSrc}
              />
              <h3 className="font-serif text-xl text-charcoal mt-4">
                {t.title}
              </h3>
            </AnimatedSection>
          ))}
        </div>
        <div className="mt-8 max-w-2xl mx-auto">
          <AnimatedSection delay={0.3}>
            <BeforeAfterSlider
              beforeSrc={transformations[2].beforeSrc}
              afterSrc={transformations[2].afterSrc}
            />
            <h3 className="font-serif text-xl text-charcoal mt-4 text-center">
              {transformations[2].title}
            </h3>
          </AnimatedSection>
        </div>
      </Container>
    </section>
  );
}
