import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getAgingProfile } from "@/data/aging";
import { cn } from "@/lib/utils";
import { EASE_LUXURY } from "@/lib/animations";
import AnimatedSection from "./AnimatedSection";

interface AgingSimulatorProps {
  material: string;
  imageUrl: string;
  productName: string;
}

export default function AgingSimulator({
  material,
  imageUrl,
  productName,
}: AgingSimulatorProps) {
  const profile = getAgingProfile(material);
  const [activeIndex, setActiveIndex] = useState(0);
  const stage = profile.stages[activeIndex];

  const filterStyle = {
    filter: `hue-rotate(${stage.filters.hueRotate}deg) saturate(${stage.filters.saturate}%) brightness(${stage.filters.brightness}%) sepia(${stage.filters.sepia}%)`,
    transition: "filter 0.8s cubic-bezier(0.25, 0.1, 0.25, 1)",
  };

  return (
    <AnimatedSection>
      <div className="mt-16">
        <h2 className="font-serif text-2xl text-charcoal mb-2">
          How It Ages Over Time
        </h2>
        <p className="text-charcoal-light text-sm mb-8">
          See how {productName} naturally evolves — drag the timeline to
          preview decades of graceful aging.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8">
          {/* Image with aging filter */}
          <div className="relative aspect-[4/3] overflow-hidden bg-beige rounded-sm">
            <img
              src={imageUrl}
              alt={`${productName} at ${stage.label}`}
              className="w-full h-full object-cover"
              style={filterStyle}
            />
            {/* Year badge */}
            <div className="absolute top-4 left-4 bg-charcoal/80 backdrop-blur-sm text-white px-3 py-1.5 rounded-sm">
              <span className="text-xs uppercase tracking-wider opacity-70">
                Age
              </span>
              <span className="block font-serif text-lg leading-tight">
                {stage.label}
              </span>
            </div>
          </div>

          {/* Timeline + description */}
          <div>
            {/* Timeline stops */}
            <div className="flex flex-col gap-1 mb-6">
              {profile.stages.map((s, i) => (
                <button
                  key={s.year}
                  onClick={() => setActiveIndex(i)}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 text-left transition-all cursor-pointer rounded-sm",
                    i === activeIndex
                      ? "bg-gold/10 border-l-2 border-gold"
                      : "hover:bg-beige/50 border-l-2 border-transparent",
                  )}
                >
                  <span
                    className={cn(
                      "w-2 h-2 rounded-full shrink-0",
                      i === activeIndex ? "bg-gold" : "bg-beige",
                    )}
                  />
                  <span
                    className={cn(
                      "text-sm font-medium",
                      i === activeIndex
                        ? "text-gold"
                        : "text-charcoal-light",
                    )}
                  >
                    {s.label}
                  </span>
                </button>
              ))}
            </div>

            {/* Description */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3, ease: EASE_LUXURY }}
                className="px-3"
              >
                <p className="text-charcoal text-sm leading-relaxed">
                  {stage.description}
                </p>
              </motion.div>
            </AnimatePresence>

            {/* Slider */}
            <div className="mt-6 px-3">
              <input
                type="range"
                min={0}
                max={profile.stages.length - 1}
                value={activeIndex}
                onChange={(e) => setActiveIndex(Number(e.target.value))}
                className="w-full accent-gold cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-charcoal-light mt-1">
                <span>New</span>
                <span>25+ Years</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}
