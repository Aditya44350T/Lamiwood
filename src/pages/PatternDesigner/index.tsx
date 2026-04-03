import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import Container from "@/components/ui/Container";
import Breadcrumb from "@/components/ui/Breadcrumb";
import Button from "@/components/ui/Button";
import PageTransition from "@/components/shared/PageTransition";
import AnimatedSection from "@/components/shared/AnimatedSection";
import { patternTypes, generatePattern } from "@/lib/patterns";
import { formatPrice } from "@/lib/utils";
import { cn } from "@/lib/utils";
import { SPRING_GENTLE } from "@/lib/animations";

const woodColors = [
  { name: "Natural Oak", light: "#C8A96E", dark: "#A88B4F", grain: "#B8985E" },
  { name: "Dark Walnut", light: "#5C3A1E", dark: "#3D2510", grain: "#4E3018" },
  { name: "Honey Maple", light: "#D4A843", dark: "#B8922E", grain: "#C49A38" },
  { name: "Grey Ash", light: "#9E9A92", dark: "#888480", grain: "#93908A" },
  { name: "Charred Cedar", light: "#2C2420", dark: "#1A1614", grain: "#231E1A" },
  { name: "White Oak", light: "#E2D5C0", dark: "#C9BCA8", grain: "#D5C9B4" },
];

export default function PatternDesigner() {
  useEffect(() => {
    document.title = "Pattern Designer | Lamiwood";
  }, []);

  const [selectedPattern, setSelectedPattern] = useState("straight");
  const [selectedColor, setSelectedColor] = useState(0);
  const [roomWidth, setRoomWidth] = useState("15");
  const [roomLength, setRoomLength] = useState("12");
  const [pricePerSqft, setPricePerSqft] = useState("450");

  const pattern = patternTypes.find((p) => p.id === selectedPattern)!;
  const color = woodColors[selectedColor];

  const roomW = parseFloat(roomWidth) || 15;
  const roomL = parseFloat(roomLength) || 12;
  const area = roomW * roomL;
  const areaWithWastage = area * (1 + pattern.wastage / 100);
  const price = parseFloat(pricePerSqft) || 0;

  // Generate pattern for SVG preview
  const planks = useMemo(
    () => generatePattern(selectedPattern, 10, 10, 40, 8),
    [selectedPattern],
  );

  const inputClass =
    "w-full px-3 py-2.5 text-sm border border-beige dark:border-white/10 bg-white dark:bg-[#1E1E1E] text-charcoal placeholder:text-charcoal-light/40 focus:border-gold focus:outline-none transition-colors rounded-sm";

  return (
    <PageTransition>
      {/* Hero */}
      <section
        className="relative pb-12 bg-gradient-to-br from-[#2C2C2C] to-[#4A4A4A] overflow-hidden"
        style={{ paddingTop: "calc(var(--header-height) + 2rem)" }}
      >
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_50%_50%,rgba(184,134,11,0.4),transparent_60%)]" />
        <Container className="relative z-10">
          <Breadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "Pattern Designer" },
            ]}
            light
          />
          <AnimatedSection>
            <h1 className="font-serif text-3xl md:text-5xl text-white mt-2 mb-3">
              Installation Pattern Designer
            </h1>
            <p className="text-white/70 text-base md:text-lg max-w-xl">
              Preview installation patterns, estimate material needs, and find
              the layout that transforms your space.
            </p>
          </AnimatedSection>
        </Container>
      </section>

      <section className="py-10 md:py-14 bg-cream">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-10">
            {/* Pattern preview */}
            <div>
              {/* Pattern selector */}
              <div className="grid grid-cols-3 md:grid-cols-6 gap-3 mb-8">
                {patternTypes.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => setSelectedPattern(p.id)}
                    className={cn(
                      "relative p-3 text-center cursor-pointer border rounded-sm transition-all",
                      selectedPattern === p.id
                        ? "border-gold bg-gold/5"
                        : "border-beige hover:border-gold/50",
                    )}
                  >
                    {/* Mini pattern preview */}
                    <PatternThumbnail
                      patternId={p.id}
                      color={color}
                      active={selectedPattern === p.id}
                    />
                    <span className="block text-xs font-medium text-charcoal mt-2">
                      {p.name}
                    </span>
                    <span className="block text-[10px] text-charcoal-light">
                      +{p.wastage}% waste
                    </span>
                  </button>
                ))}
              </div>

              {/* Main canvas */}
              <motion.div
                key={selectedPattern + selectedColor}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={SPRING_GENTLE}
                className="relative aspect-[4/3] bg-[#1a1a1a] rounded-sm overflow-hidden border border-beige dark:border-white/10"
              >
                <svg
                  viewBox="0 0 400 300"
                  className="w-full h-full"
                  preserveAspectRatio="xMidYMid slice"
                >
                  {planks.map((plank, i) => (
                    <rect
                      key={i}
                      x={plank.x}
                      y={plank.y}
                      width={plank.width - 0.5}
                      height={plank.height - 0.3}
                      rx={0.3}
                      fill={i % 3 === 0 ? color.dark : i % 3 === 1 ? color.light : color.grain}
                      transform={
                        plank.rotation !== 0
                          ? `rotate(${plank.rotation} ${plank.x + plank.width / 2} ${plank.y + plank.height / 2})`
                          : undefined
                      }
                      opacity={0.9}
                    />
                  ))}
                </svg>

                {/* Pattern name overlay */}
                <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-sm text-white px-3 py-1.5 rounded-sm">
                  <span className="text-xs uppercase tracking-wider opacity-70">
                    Pattern
                  </span>
                  <span className="block font-serif text-lg leading-tight">
                    {pattern.name}
                  </span>
                </div>
              </motion.div>

              {/* Color selector */}
              <div className="mt-6">
                <h3 className="text-sm font-medium text-charcoal uppercase tracking-wider mb-3">
                  Wood Tone
                </h3>
                <div className="flex gap-3">
                  {woodColors.map((c, i) => (
                    <button
                      key={c.name}
                      onClick={() => setSelectedColor(i)}
                      className={cn(
                        "flex flex-col items-center gap-1.5 cursor-pointer group",
                      )}
                    >
                      <div
                        className={cn(
                          "w-10 h-10 rounded-full transition-all shadow-sm",
                          i === selectedColor
                            ? "ring-2 ring-gold ring-offset-2 scale-110"
                            : "group-hover:scale-105",
                        )}
                        style={{ backgroundColor: c.light }}
                      />
                      <span className="text-[10px] text-charcoal-light">
                        {c.name.split(" ")[0]}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Pattern description */}
              <p className="mt-6 text-charcoal-light text-sm">
                {pattern.description}
              </p>
            </div>

            {/* Sidebar — inputs + results */}
            <div className="space-y-6">
              <div className="border border-beige dark:border-white/10 bg-white dark:bg-[#1E1E1E] p-6 rounded-sm">
                <h3 className="text-sm font-medium text-charcoal uppercase tracking-wider mb-4">
                  Room Dimensions
                </h3>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-xs text-charcoal-light mb-1">
                      Width (ft)
                    </label>
                    <input
                      type="number"
                      min="1"
                      value={roomWidth}
                      onChange={(e) => setRoomWidth(e.target.value)}
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-charcoal-light mb-1">
                      Length (ft)
                    </label>
                    <input
                      type="number"
                      min="1"
                      value={roomLength}
                      onChange={(e) => setRoomLength(e.target.value)}
                      className={inputClass}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs text-charcoal-light mb-1">
                    Price per sq.ft (₹)
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={pricePerSqft}
                    onChange={(e) => setPricePerSqft(e.target.value)}
                    className={inputClass}
                  />
                </div>
              </div>

              {/* Results */}
              <div className="border border-beige dark:border-white/10 bg-white dark:bg-[#1E1E1E] p-6 rounded-sm">
                <h3 className="text-sm font-medium text-charcoal uppercase tracking-wider mb-4">
                  Material Estimate
                </h3>

                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-charcoal-light">Base area</span>
                    <span className="text-charcoal font-medium">
                      {area.toFixed(0)} sq.ft
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-charcoal-light">
                      Pattern wastage ({pattern.wastage}%)
                    </span>
                    <span className="text-charcoal font-medium">
                      +{(area * pattern.wastage / 100).toFixed(0)} sq.ft
                    </span>
                  </div>
                  <div className="border-t border-beige pt-3 flex justify-between">
                    <span className="text-charcoal font-medium">
                      Total material
                    </span>
                    <span className="text-gold font-serif text-lg">
                      {Math.ceil(areaWithWastage)} sq.ft
                    </span>
                  </div>
                </div>

                {price > 0 && (
                  <div className="mt-4 pt-4 border-t border-beige">
                    <div className="flex justify-between items-end">
                      <span className="text-charcoal-light text-sm">
                        Estimated cost
                      </span>
                      <span className="text-gold font-serif text-2xl">
                        {formatPrice(Math.round(areaWithWastage * price))}
                      </span>
                    </div>
                  </div>
                )}

                <div className="mt-6 space-y-3">
                  <Button href="/products" className="w-full">
                    Browse {color.name} Products
                  </Button>
                  <Button
                    href="/calculator"
                    variant="secondary"
                    className="w-full"
                  >
                    Detailed Calculator
                  </Button>
                </div>
              </div>

              {/* Pattern comparison */}
              <div className="border border-beige dark:border-white/10 bg-white dark:bg-[#1E1E1E] p-6 rounded-sm">
                <h3 className="text-sm font-medium text-charcoal uppercase tracking-wider mb-3">
                  Wastage Comparison
                </h3>
                <div className="space-y-2">
                  {patternTypes.map((p) => (
                    <div key={p.id} className="flex items-center gap-3">
                      <span className="text-xs text-charcoal-light w-24 shrink-0">
                        {p.name}
                      </span>
                      <div className="flex-1 h-1.5 bg-beige rounded-full overflow-hidden">
                        <div
                          className={cn(
                            "h-full rounded-full transition-all duration-500",
                            p.id === selectedPattern ? "bg-gold" : "bg-charcoal-light/30",
                          )}
                          style={{ width: `${(p.wastage / 20) * 100}%` }}
                        />
                      </div>
                      <span className="text-xs text-charcoal-light w-8 text-right">
                        {p.wastage}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </PageTransition>
  );
}

// Mini pattern thumbnail for selector
function PatternThumbnail({
  patternId,
  color,
  active,
}: {
  patternId: string;
  color: (typeof woodColors)[number];
  active: boolean;
}) {
  const miniPlanks = useMemo(
    () => generatePattern(patternId, 4, 4, 12, 3),
    [patternId],
  );

  return (
    <svg viewBox="0 0 48 36" className="w-full aspect-[4/3]">
      <rect width="48" height="36" fill="#1a1a1a" rx="1" />
      {miniPlanks.slice(0, 40).map((p, i) => (
        <rect
          key={i}
          x={p.x}
          y={p.y}
          width={p.width - 0.3}
          height={p.height - 0.2}
          rx={0.1}
          fill={i % 3 === 0 ? color.dark : i % 3 === 1 ? color.light : color.grain}
          transform={
            p.rotation !== 0
              ? `rotate(${p.rotation} ${p.x + p.width / 2} ${p.y + p.height / 2})`
              : undefined
          }
          opacity={active ? 0.95 : 0.6}
        />
      ))}
    </svg>
  );
}
