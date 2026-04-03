import AnimatedSection from "@/components/shared/AnimatedSection";
import ImageWithFallback from "@/components/ui/ImageWithFallback";

export default function StorySection() {
  return (
    <section className="py-20 md:py-28 bg-cream">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <AnimatedSection direction="left">
            <div className="aspect-[4/3] overflow-hidden">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1631396328075-9c65a7406f09?w=800&h=600&fit=crop&q=80"
                alt="Lamiwood workshop"
                className="w-full h-full"
              />
            </div>
          </AnimatedSection>
          <AnimatedSection direction="right">
            <div>
              <h2 className="font-serif text-3xl md:text-4xl text-charcoal mb-6">
                Redefining Interior Surfaces Since 2012
              </h2>
              <div className="w-12 h-0.5 bg-gold mb-6" />
              <div className="space-y-4 text-charcoal-light leading-relaxed">
                <p>
                  Lamiwood was born from a simple observation: the spaces we inhabit
                  profoundly shape how we feel, think, and live. Our founders, with
                  decades of experience in architecture and material science, set out
                  to create surfaces that elevate everyday environments into
                  extraordinary ones.
                </p>
                <p>
                  From our workshop in Mumbai&rsquo;s Design District, we source the
                  world&rsquo;s finest timber and materials — from FSC-certified
                  European oak forests to reclaimed teak from heritage structures. Each
                  material is selected not just for its beauty, but for its story,
                  sustainability, and ability to stand the test of time.
                </p>
                <p>
                  Today, Lamiwood surfaces grace luxury residences, boutique hotels,
                  corporate headquarters, and award-winning restaurants across India
                  and beyond. But our mission remains unchanged: to bring nature&rsquo;s
                  finest materials into the spaces where life happens.
                </p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
