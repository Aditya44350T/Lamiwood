import { motion } from "framer-motion";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { useCountUp } from "@/hooks/useCountUp";
import Container from "@/components/ui/Container";
import { SPRING_GENTLE, EASE_LUXURY } from "@/lib/animations";

const stats = [
  { value: 12, suffix: "+", label: "Years of Excellence" },
  { value: 500, suffix: "+", label: "Projects Completed" },
  { value: 50, suffix: "+", label: "Cities Served" },
  { value: 1000, suffix: "+", label: "Happy Clients" },
];

function StatItem({
  value,
  suffix,
  label,
  enabled,
  index,
}: {
  value: number;
  suffix: string;
  label: string;
  enabled: boolean;
  index: number;
}) {
  const count = useCountUp({ end: value, duration: 2000, enabled });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={
        enabled
          ? {
              opacity: 1,
              y: 0,
              transition: {
                ...SPRING_GENTLE,
                delay: index * 0.2,
              },
            }
          : undefined
      }
      className="text-center py-6"
    >
      <span className="font-serif text-5xl md:text-6xl text-gold-light">
        {count}
        {suffix}
      </span>

      {/* Gold underline that expands after counter */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={
          enabled
            ? {
                scaleX: 1,
                transition: {
                  delay: index * 0.2 + 1.5,
                  duration: 0.5,
                  ease: EASE_LUXURY,
                },
              }
            : undefined
        }
        className="w-8 h-[1px] bg-gold mx-auto mt-3 mb-2 origin-center"
      />

      <p className="text-white/70 text-sm uppercase tracking-[0.2em] mt-1">
        {label}
      </p>
    </motion.div>
  );
}

export default function StatsSection() {
  const { ref, isIntersecting } = useIntersectionObserver({
    threshold: 0.3,
    triggerOnce: true,
  });

  return (
    <section className="py-16 md:py-20 bg-[#2C2C2C]">
      <Container>
        <div ref={ref} className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <StatItem
              key={stat.label}
              {...stat}
              index={i}
              enabled={isIntersecting}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
