import { useEffect } from "react";
import Container from "@/components/ui/Container";
import Breadcrumb from "@/components/ui/Breadcrumb";
import PageTransition from "@/components/shared/PageTransition";
import AnimatedSection from "@/components/shared/AnimatedSection";
import ContactForm from "./ContactForm";
import ContactInfo from "./ContactInfo";
import MapPlaceholder from "./MapPlaceholder";

export default function Contact() {
  useEffect(() => {
    document.title = "Contact Us | Lamiwood";
  }, []);

  return (
    <PageTransition>
      {/* Hero */}
      <section className="relative pb-16 md:pb-20 bg-gradient-to-br from-[#2C2C2C] to-[#4A4A4A]" style={{ paddingTop: "calc(var(--header-height) + 3rem)" }}>
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_40%_40%,rgba(184,134,11,0.3),transparent_50%)]" />
        <div className="relative z-10 text-center max-w-3xl mx-auto px-4">
          <AnimatedSection>
            <p className="text-gold text-sm font-medium tracking-[0.3em] uppercase mb-4">
              Get in Touch
            </p>
            <h1 className="font-serif text-4xl md:text-6xl text-white mb-6">
              Let&rsquo;s Create Something{" "}
              <span className="text-gold-light">Beautiful</span>
            </h1>
            <p className="text-white/70 text-lg leading-relaxed">
              Whether you&rsquo;re an architect, designer, or homeowner, we&rsquo;d
              love to hear about your project.
            </p>
          </AnimatedSection>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-cream">
        <Container>
          <Breadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "Contact" },
            ]}
          />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mt-8">
            <div className="lg:col-span-2">
              <h2 className="font-serif text-2xl text-charcoal mb-6">
                Send Us a Message
              </h2>
              <ContactForm />
            </div>
            <div>
              <h2 className="font-serif text-2xl text-charcoal mb-6">
                Contact Details
              </h2>
              <ContactInfo />
            </div>
          </div>
          <MapPlaceholder />
        </Container>
      </section>
    </PageTransition>
  );
}
