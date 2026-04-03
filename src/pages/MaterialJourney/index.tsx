import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import Container from "@/components/ui/Container";
import Breadcrumb from "@/components/ui/Breadcrumb";
import Button from "@/components/ui/Button";
import PageTransition from "@/components/shared/PageTransition";
import AnimatedSection from "@/components/shared/AnimatedSection";
import { journeyStages } from "@/data/journey";
import { cn } from "@/lib/utils";
import { EASE_LUXURY } from "@/lib/animations";

const bgSlideVariants = {
  enter: (d: number) => ({ opacity: 0, x: `${d * 30}%` }),
  center: { opacity: 1, x: "0%" },
  exit: (d: number) => ({ opacity: 0, x: `${d * -30}%` }),
};

const contentSlideVariants = {
  enter: (d: number) => ({ opacity: 0, x: d * 80 }),
  center: { opacity: 1, x: 0 },
  exit: (d: number) => ({ opacity: 0, x: d * -80 }),
};

export default function MaterialJourney() {
  useEffect(() => {
    document.title = "Material Journey | Lamiwood";
  }, []);

  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <StaticJourney />;
  }

  return <SnapJourney />;
}

function SnapJourney() {
  const total = journeyStages.length;
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef(0);
  const lockRef = useRef(false);

  // Keep refs in sync
  useEffect(() => {
    activeRef.current = active;
  }, [active]);

  const goTo = (index: number) => {
    if (lockRef.current) return;
    const clamped = Math.max(0, Math.min(total - 1, index));
    if (clamped === activeRef.current) return;
    lockRef.current = true;
    setDirection(clamped > activeRef.current ? 1 : -1);
    setActive(clamped);
    setTimeout(() => { lockRef.current = false; }, 800);
  };

  const goNext = () => goTo(activeRef.current + 1);
  const goPrev = () => goTo(activeRef.current - 1);

  // Handle wheel/scroll/keyboard to move between stages
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    let touchStartY = 0;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (e.deltaY > 30) goNext();
      else if (e.deltaY < -30) goPrev();
    };

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      const deltaY = touchStartY - e.changedTouches[0].clientY;
      if (deltaY > 50) goNext();
      else if (deltaY < -50) goPrev();
    };

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown" || e.key === "ArrowRight") {
        e.preventDefault();
        goNext();
      } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
        e.preventDefault();
        goPrev();
      }
    };

    el.addEventListener("wheel", handleWheel, { passive: false });
    el.addEventListener("touchstart", handleTouchStart, { passive: true });
    el.addEventListener("touchend", handleTouchEnd, { passive: true });
    window.addEventListener("keydown", handleKey);

    return () => {
      el.removeEventListener("wheel", handleWheel);
      el.removeEventListener("touchstart", handleTouchStart);
      el.removeEventListener("touchend", handleTouchEnd);
      window.removeEventListener("keydown", handleKey);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Lock body scroll while in the journey
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const stage = journeyStages[active];
  const isLast = active === total - 1;

  return (
    <PageTransition>
      <div
        ref={containerRef}
        className="fixed inset-0 z-40 bg-black"
        style={{ top: 0 }}
      >
        {/* Background image slide */}
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={active}
            custom={direction}
            className="absolute inset-0"
            variants={bgSlideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.7, ease: EASE_LUXURY }}
          >
            <img
              src={stage.image}
              alt={stage.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/30" />
          </motion.div>
        </AnimatePresence>

        {/* Top bar */}
        <div className="absolute top-0 left-0 right-0 z-20 p-6 flex items-center justify-between">
          <Breadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "Material Journey" },
            ]}
            light
          />
          <Button href="/" variant="ghost" className="!text-white/60 hover:!text-white text-xs">
            Exit Journey
          </Button>
        </div>

        {/* Progress bar */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-white/10 z-30">
          <motion.div
            className="h-full bg-gold origin-left"
            animate={{ scaleX: (active + 1) / total }}
            transition={{ duration: 0.6, ease: EASE_LUXURY }}
          />
        </div>

        {/* Left dot navigation */}
        <div className="absolute left-6 top-1/2 -translate-y-1/2 z-20 hidden md:flex flex-col gap-4">
          {journeyStages.map((s, i) => (
            <button
              key={s.id}
              onClick={() => goTo(i)}
              className="group flex items-center gap-3 cursor-pointer"
              aria-label={`Go to ${s.title}`}
            >
              <div
                className={cn(
                  "w-2.5 h-2.5 rounded-full transition-all duration-500",
                  i === active
                    ? "bg-gold scale-150"
                    : i < active
                      ? "bg-white/50 scale-100"
                      : "bg-white/20 scale-100",
                )}
              />
              <span
                className={cn(
                  "text-xs font-medium transition-all duration-300 whitespace-nowrap",
                  i === active
                    ? "text-white opacity-100"
                    : "text-white/0 opacity-0 group-hover:text-white/60 group-hover:opacity-100",
                )}
              >
                {s.title}
              </span>
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="absolute inset-0 z-10 flex items-center">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={active}
              custom={direction}
              variants={contentSlideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.6, ease: EASE_LUXURY }}
              className="max-w-xl px-8 md:px-16 lg:px-24"
            >
              <span className="text-5xl md:text-6xl mb-5 block">
                {stage.icon}
              </span>
              <p className="text-gold text-xs uppercase tracking-[0.3em] mb-3 font-medium">
                Stage {active + 1} of {total}
              </p>
              <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl text-white mb-5 leading-tight">
                {stage.title}
              </h2>
              <p className="text-white/80 text-base md:text-lg leading-relaxed mb-8 max-w-md">
                {stage.description}
              </p>
              <div className="bg-white/10 backdrop-blur-md border border-white/10 px-5 py-4 rounded-sm inline-block max-w-sm">
                <p className="text-gold-light text-xs uppercase tracking-wider mb-1.5 font-medium">
                  Did you know?
                </p>
                <p className="text-white/90 text-sm leading-relaxed">
                  {stage.funFact}
                </p>
              </div>

              {/* Last stage CTA */}
              {isLast && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                  className="mt-8 flex flex-wrap gap-4"
                >
                  <Button href="/products" size="lg">
                    Explore Collection
                  </Button>
                  <Button href="/consultation" variant="secondary" size="lg" className="border-white/30 !text-white hover:!bg-white hover:!text-charcoal">
                    Get Recommendations
                  </Button>
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom hint */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20">
          {!isLast ? (
            <motion.div
              className="flex flex-col items-center gap-2 text-white/40"
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <span className="text-xs">Scroll for next</span>
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7" />
              </svg>
            </motion.div>
          ) : (
            <span className="text-white/40 text-xs">
              Scroll up to go back
            </span>
          )}
        </div>

        {/* Stage counter — bottom right (mobile) */}
        <div className="absolute bottom-8 right-6 z-20 md:hidden bg-black/30 backdrop-blur-sm px-3 py-1.5 rounded-full">
          <span className="text-white font-mono text-sm font-medium">
            {active + 1}
          </span>
          <span className="text-white/40 font-mono text-sm"> / {total}</span>
        </div>
      </div>
    </PageTransition>
  );
}

// Fallback for reduced motion
function StaticJourney() {
  return (
    <PageTransition>
      <section
        className="relative pb-12 bg-gradient-to-br from-[#2C2C2C] to-[#4A4A4A]"
        style={{ paddingTop: "calc(var(--header-height) + 2rem)" }}
      >
        <Container className="relative z-10">
          <Breadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "Material Journey" },
            ]}
            light
          />
          <h1 className="font-serif text-3xl md:text-5xl text-white mt-2 mb-3">
            From Forest to Floor
          </h1>
          <p className="text-white/70 text-lg max-w-xl">
            The story behind every surface.
          </p>
        </Container>
      </section>

      <section className="py-16 bg-cream">
        <Container>
          <div className="space-y-16">
            {journeyStages.map((stage, i) => (
              <AnimatedSection key={stage.id} delay={i * 0.05}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                  <div className={i % 2 === 1 ? "md:order-2" : ""}>
                    <div className="aspect-[3/2] overflow-hidden rounded-sm">
                      <img
                        src={stage.image}
                        alt={stage.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <div>
                    <span className="text-4xl mb-3 block">{stage.icon}</span>
                    <p className="text-gold text-xs uppercase tracking-[0.3em] mb-1">
                      Stage {i + 1}
                    </p>
                    <h2 className="font-serif text-2xl text-charcoal mb-3">
                      {stage.title}
                    </h2>
                    <p className="text-charcoal-light leading-relaxed mb-4">
                      {stage.description}
                    </p>
                    <p className="text-sm text-gold-muted italic">
                      {stage.funFact}
                    </p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>

          <div className="text-center mt-16">
            <Button href="/products" size="lg">
              Explore Collection
            </Button>
          </div>
        </Container>
      </section>
    </PageTransition>
  );
}
