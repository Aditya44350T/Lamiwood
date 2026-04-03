import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import type { Product } from "@/types";
import { useCountUp } from "@/hooks/useCountUp";
import { cn } from "@/lib/utils";
import { EASE_LUXURY } from "@/lib/animations";
import AnimatedSection from "./AnimatedSection";

interface SustainabilityScorecardProps {
  product: Product;
}

const metrics = [
  { key: "carbonFootprint" as const, label: "Carbon Footprint", unit: "kg CO₂/sq.ft", icon: "🌱", max: 5, invert: true },
  { key: "recycledContent" as const, label: "Recycled Content", unit: "%", icon: "♻️", max: 100, invert: false },
  { key: "lifespan" as const, label: "Expected Lifespan", unit: " years", icon: "⏳", max: 50, invert: false },
  { key: "recyclability" as const, label: "Recyclability", unit: "%", icon: "🔄", max: 100, invert: false },
];

export default function SustainabilityScorecard({
  product,
}: SustainabilityScorecardProps) {
  const sus = product.sustainability;
  if (!sus) return null;

  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  // Calculate overall score (0-100)
  const carbonScore = Math.max(0, (1 - sus.carbonFootprint / 5) * 100);
  const overallScore = Math.round(
    (carbonScore +
      sus.recycledContent +
      (sus.lifespan / 50) * 100 +
      sus.recyclability +
      (sus.fscCertified ? 100 : 0) +
      (sus.vocRating === "A+" ? 100 : sus.vocRating === "A" ? 80 : sus.vocRating === "B" ? 50 : 20)) /
      6,
  );

  return (
    <AnimatedSection>
      <div ref={ref} className="mt-16">
        <h2 className="font-serif text-2xl text-charcoal mb-2">
          Sustainability Scorecard
        </h2>
        <p className="text-charcoal-light text-sm mb-8">
          Transparent environmental metrics — because premium should also mean
          responsible.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8">
          {/* Radar / Score circle */}
          <div className="flex flex-col items-center justify-center">
            <div className="relative w-40 h-40">
              <svg viewBox="0 0 120 120" className="w-full h-full -rotate-90">
                {/* Background circle */}
                <circle
                  cx="60"
                  cy="60"
                  r="52"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="8"
                  className="text-beige"
                />
                {/* Score arc */}
                <motion.circle
                  cx="60"
                  cy="60"
                  r="52"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="8"
                  strokeLinecap="round"
                  className="text-gold"
                  strokeDasharray={`${2 * Math.PI * 52}`}
                  initial={{ strokeDashoffset: 2 * Math.PI * 52 }}
                  animate={
                    inView
                      ? {
                          strokeDashoffset:
                            2 * Math.PI * 52 * (1 - overallScore / 100),
                        }
                      : undefined
                  }
                  transition={{ duration: 1.5, ease: EASE_LUXURY, delay: 0.3 }}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <ScoreNumber value={overallScore} enabled={inView} />
                <span className="text-xs text-charcoal-light uppercase tracking-wider">
                  Score
                </span>
              </div>
            </div>

            {/* Badges */}
            <div className="flex flex-wrap gap-2 mt-6 justify-center">
              {sus.fscCertified && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-green-50 text-green-700 text-xs font-medium rounded-full">
                  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                  </svg>
                  FSC Certified
                </span>
              )}
              <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded-full">
                VOC: {sus.vocRating}
              </span>
            </div>
          </div>

          {/* Metric bars */}
          <div className="space-y-5">
            {metrics.map((m, i) => {
              const raw = sus[m.key] as number;
              const percentage = m.invert
                ? Math.max(0, (1 - raw / m.max) * 100)
                : (raw / m.max) * 100;

              return (
                <div key={m.key}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-sm text-charcoal font-medium">
                      {m.icon} {m.label}
                    </span>
                    <span className="text-sm text-charcoal-light">
                      {raw}
                      {m.unit}
                    </span>
                  </div>
                  <div className="h-2 bg-beige rounded-full overflow-hidden">
                    <motion.div
                      className={cn(
                        "h-full rounded-full",
                        percentage > 70
                          ? "bg-green-500"
                          : percentage > 40
                            ? "bg-gold"
                            : "bg-orange-400",
                      )}
                      initial={{ width: 0 }}
                      animate={
                        inView
                          ? { width: `${Math.min(100, percentage)}%` }
                          : undefined
                      }
                      transition={{
                        duration: 1,
                        ease: EASE_LUXURY,
                        delay: 0.2 + i * 0.15,
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}

function ScoreNumber({
  value,
  enabled,
}: {
  value: number;
  enabled: boolean;
}) {
  const count = useCountUp({ end: value, duration: 1500, enabled });
  return (
    <span className="font-serif text-4xl text-gold leading-none">{count}</span>
  );
}
