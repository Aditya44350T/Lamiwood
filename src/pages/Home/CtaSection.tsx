import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  type MotionValue,
} from "framer-motion";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import { SPRING_GENTLE } from "@/lib/animations";

const headingWords = "Ready to Transform Your Space?".split(" ");

export default function CtaSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const glowOpacity = useTransform(scrollYProgress, [0.2, 0.5], [0.05, 0.2]);

  // Track how many words to reveal based on scroll progress
  const wordProgress = useTransform(
    scrollYProgress,
    [0.15, 0.45],
    [0, headingWords.length],
  );

  return (
    <section
      ref={sectionRef}
      className="relative py-24 md:py-32 overflow-hidden"
    >
      {/* Parallax background — intensified */}
      <motion.div
        className="absolute inset-0 h-[140%] -top-[20%] bg-gradient-to-br from-[#4A4A4A] to-[#2C2C2C]"
        style={{ y: prefersReducedMotion ? 0 : bgY }}
      />

      {/* Gold glow — pulsing with scroll */}
      <motion.div
        className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(184,134,11,0.4),transparent_60%)]"
        style={{ opacity: prefersReducedMotion ? 0.1 : glowOpacity }}
      />

      <Container className="relative z-10">
        <div className="text-center max-w-2xl mx-auto">
          {/* Word-by-word heading reveal */}
          <h2 className="font-serif text-3xl md:text-5xl text-white mb-6">
            {prefersReducedMotion ? (
              headingWords.join(" ")
            ) : (
              headingWords.map((word, i) => (
                <WordReveal
                  key={i}
                  word={word}
                  index={i}
                  wordProgress={wordProgress}
                />
              ))
            )}
          </h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ ...SPRING_GENTLE, delay: 0.2 }}
            className="text-white/70 text-lg mb-10 leading-relaxed"
          >
            Let our team guide you in selecting the perfect surfaces for your
            project. From consultation to installation, we&rsquo;re with you
            every step of the way.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ ...SPRING_GENTLE, delay: 0.4 }}
          >
            <Button href="/contact" size="lg" magnetic>
              Get in Touch
            </Button>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}

function WordReveal({
  word,
  index,
  wordProgress,
}: {
  word: string;
  index: number;
  wordProgress: MotionValue<number>;
}) {
  const opacity = useTransform(
    wordProgress,
    [index - 0.5, index + 0.5],
    [0.15, 1],
  );
  const y = useTransform(wordProgress, [index - 0.5, index + 0.5], [8, 0]);

  return (
    <motion.span
      className="inline-block mr-[0.3em]"
      style={{ opacity, y }}
    >
      {word}
    </motion.span>
  );
}
