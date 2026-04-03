import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import PageTransition from "@/components/shared/PageTransition";
import AnimatedSection from "@/components/shared/AnimatedSection";
import StorySection from "./StorySection";
import StatsSection from "./StatsSection";
import ValuesSection from "./ValuesSection";
import CraftsmanshipSection from "./CraftsmanshipSection";
import TeamSection from "./TeamSection";

export default function About() {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], [0, -50]);

  useEffect(() => {
    document.title = "About Us | Lamiwood";
  }, []);

  return (
    <PageTransition>
      {/* Hero with parallax */}
      <section ref={heroRef} className="relative pb-20 md:pb-28 overflow-hidden" style={{ paddingTop: "calc(var(--header-height) + 3rem)" }}>
        <motion.div
          className="absolute inset-0 h-[130%] -top-[15%] bg-gradient-to-br from-[#2C2C2C] to-[#4A4A4A]"
          style={{ y: bgY }}
        />
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_60%_30%,rgba(184,134,11,0.3),transparent_50%)]" />
        <div className="relative z-10 text-center max-w-3xl mx-auto px-4">
          <AnimatedSection>
            <p className="text-gold text-sm font-medium tracking-[0.3em] uppercase mb-4">
              Our Story
            </p>
            <h1 className="font-serif text-4xl md:text-6xl text-white mb-6">
              Crafting Surfaces,{" "}
              <span className="text-gold-light">Creating Spaces</span>
            </h1>
            <p className="text-white/70 text-lg leading-relaxed">
              For over a decade, we&rsquo;ve been transforming the way India
              experiences interior surfaces — one space at a time.
            </p>
          </AnimatedSection>
        </div>
      </section>

      <StorySection />
      <StatsSection />
      <ValuesSection />
      <CraftsmanshipSection />
      <TeamSection />
    </PageTransition>
  );
}
