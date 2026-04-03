import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import { SPRING_GENTLE, STAGGER_SLOW } from "@/lib/animations";

const stagger = {
  animate: {
    transition: { staggerChildren: STAGGER_SLOW },
  },
};

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: SPRING_GENTLE,
  },
};

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // Multi-layer parallax: background moves fastest, text moves slowest
  const bgY = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const overlayY = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, -30]);
  // Scroll indicator fades out as user scrolls
  const scrollIndicatorOpacity = useTransform(
    scrollYProgress,
    [0, 0.15],
    [1, 0],
  );

  return (
    <section
      ref={sectionRef}
      className="relative h-screen flex items-center overflow-hidden"
    >
      {/* Layer 1: Ken Burns background image — deepest parallax */}
      <motion.div
        className="absolute inset-0 h-[140%] -top-[20%]"
        style={{ y: prefersReducedMotion ? 0 : bgY }}
      >
        <motion.div
          className="absolute inset-0 will-change-transform"
          animate={
            prefersReducedMotion
              ? undefined
              : {
                  scale: [1, 1.08, 1.04, 1.1, 1],
                  x: [0, -15, 8, -8, 0],
                  y: [0, -8, 4, -4, 0],
                }
          }
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <img
            src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1920&h=1080&fit=crop&q=80"
            alt=""
            className="w-full h-full object-cover"
          />
        </motion.div>
      </motion.div>

      {/* Layer 2: Dark overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Layer 3: Gold accent glow — medium parallax */}
      <motion.div
        className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_30%_40%,rgba(184,134,11,0.4),transparent_60%)]"
        style={{ y: prefersReducedMotion ? 0 : overlayY }}
      />

      {/* Vignette for depth */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          boxShadow: "inset 0 0 150px rgba(0,0,0,0.3)",
        }}
      />

      {/* Layer 4: Text content — subtle parallax */}
      <Container size="wide" className="relative z-10">
        <motion.div
          variants={stagger}
          initial="initial"
          animate="animate"
          className="max-w-3xl"
          style={{ y: prefersReducedMotion ? 0 : textY }}
        >
          <motion.p
            variants={fadeUp}
            className="text-gold-light text-sm font-semibold tracking-[0.3em] uppercase mb-6"
          >
            Premium Interior Surfaces
          </motion.p>
          <motion.h1
            variants={fadeUp}
            className="font-serif text-5xl md:text-6xl lg:text-7xl text-white leading-[1.1] mb-6"
            style={{ textShadow: "0 2px 20px rgba(0,0,0,0.3)" }}
          >
            Surfaces Crafted for{" "}
            <span className="text-gold-light">Extraordinary</span> Spaces
          </motion.h1>
          <motion.p
            variants={fadeUp}
            className="text-white/90 text-lg md:text-xl max-w-xl mb-10 leading-relaxed"
            style={{ textShadow: "0 1px 8px rgba(0,0,0,0.2)" }}
          >
            From sustainably sourced hardwood flooring to artisan wall panels, we
            bring nature&rsquo;s finest materials into your living spaces.
          </motion.p>
          <motion.div variants={fadeUp} className="flex flex-wrap gap-4">
            <Button href="/products" size="lg">
              Explore Collection
            </Button>
            <Button
              href="/about"
              variant="secondary"
              size="lg"
              className="border-white text-white hover:bg-white hover:text-charcoal"
            >
              Our Story
            </Button>
          </motion.div>
        </motion.div>
      </Container>

      {/* Scroll indicator — fades out on scroll */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        style={{ opacity: prefersReducedMotion ? 1 : scrollIndicatorOpacity }}
        animate={prefersReducedMotion ? undefined : { y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
          <div className="w-1 h-2 bg-white/50 rounded-full" />
        </div>
      </motion.div>
    </section>
  );
}
