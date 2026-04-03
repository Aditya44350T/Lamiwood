import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  type MotionValue,
} from "framer-motion";
import Container from "@/components/ui/Container";
import AnimatedSection from "@/components/shared/AnimatedSection";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { EASE_LUXURY, VIEWPORT_ONCE, SPRING_GENTLE } from "@/lib/animations";

const paragraphs = [
  "Every Lamiwood surface begins its journey in nature — in the slow growth of a European oak, the towering stands of Brazilian Ipê, or the rapid renewal of bamboo groves. We honour that journey by treating each piece with the respect it deserves.",
  "Our production process combines the irreplaceable eye of master craftsmen with the precision of modern CNC technology. From the thermal modification of Thermowood at 212°C to the ancient art of Shou Sugi Ban flame charring, we employ techniques that enhance wood\u2019s natural properties rather than masking them.",
  "The result? Surfaces that feel alive — with depth, texture, and character that synthetic materials simply cannot replicate.",
];

// Pinned scroll version for desktop
function PinnedCraftsmanship() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // Gold glow shifts with each paragraph
  const glowOpacity = useTransform(
    scrollYProgress,
    [0, 0.33, 0.66, 1],
    [0.05, 0.15, 0.1, 0.2],
  );

  return (
    <div ref={sectionRef} className="relative min-h-[250vh]">
      <div className="sticky top-0 h-screen flex items-center bg-[#2C2C2C] overflow-hidden">
        {/* Gold radial glow */}
        <motion.div
          className="absolute inset-0 bg-[radial-gradient(circle_at_20%_60%,rgba(184,134,11,0.3),transparent_50%)]"
          style={{ opacity: glowOpacity }}
        />

        <Container className="relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VIEWPORT_ONCE}
              transition={SPRING_GENTLE}
              className="font-serif text-3xl md:text-5xl text-white mb-6"
            >
              The Art of the Surface
            </motion.h2>
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={VIEWPORT_ONCE}
              transition={{ duration: 0.5, ease: EASE_LUXURY }}
              className="w-12 h-0.5 bg-gold mx-auto mb-8 origin-center"
            />

            {/* Paragraphs fade in/out based on scroll */}
            <div className="relative min-h-[120px] flex items-center justify-center">
              {paragraphs.map((text, i) => (
                <PinnedParagraph
                  key={i}
                  text={text}
                  index={i}
                  total={paragraphs.length}
                  scrollYProgress={scrollYProgress}
                />
              ))}
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
}

function PinnedParagraph({
  text,
  index,
  total,
  scrollYProgress,
}: {
  text: string;
  index: number;
  total: number;
  scrollYProgress: MotionValue<number>;
}) {
  const segmentSize = 1 / total;
  const start = index * segmentSize;
  const fadeInEnd = start + segmentSize * 0.25;
  const fadeOutStart = start + segmentSize * 0.75;
  const end = start + segmentSize;

  const opacity = useTransform(
    scrollYProgress,
    [start, fadeInEnd, fadeOutStart, end],
    [0, 1, 1, 0],
  );
  const y = useTransform(
    scrollYProgress,
    [start, fadeInEnd, fadeOutStart, end],
    [20, 0, 0, -20],
  );

  return (
    <motion.p
      className="absolute text-white/70 leading-relaxed text-lg"
      style={{ opacity, y }}
    >
      {text}
    </motion.p>
  );
}

// Static fallback for mobile / reduced motion
function StaticCraftsmanship() {
  return (
    <section className="relative py-24 md:py-32 bg-[#2C2C2C] overflow-hidden">
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_20%_60%,rgba(184,134,11,0.3),transparent_50%)]" />
      <Container className="relative z-10">
        <AnimatedSection>
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-serif text-3xl md:text-5xl text-white mb-6">
              The Art of the Surface
            </h2>
            <div className="w-12 h-0.5 bg-gold mx-auto mb-6" />
            <div className="space-y-4 text-white/70 leading-relaxed text-lg">
              {paragraphs.map((text, i) => (
                <p key={i}>{text}</p>
              ))}
            </div>
          </div>
        </AnimatedSection>
      </Container>
    </section>
  );
}

export default function CraftsmanshipSection() {
  const prefersReducedMotion = useReducedMotion();
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  if (prefersReducedMotion || !isDesktop) {
    return <StaticCraftsmanship />;
  }

  return <PinnedCraftsmanship />;
}
