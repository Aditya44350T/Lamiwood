import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import Container from "@/components/ui/Container";
import Breadcrumb from "@/components/ui/Breadcrumb";
import Button from "@/components/ui/Button";
import PageTransition from "@/components/shared/PageTransition";
import AnimatedSection from "@/components/shared/AnimatedSection";
import { formatPrice } from "@/lib/utils";
import { SPRING_GENTLE, EASE_LUXURY } from "@/lib/animations";

const roomTypes = [
  "Living Room",
  "Bedroom",
  "Kitchen",
  "Bathroom",
  "Balcony",
  "Office",
  "Restaurant",
  "Hotel / Resort",
  "Retail Space",
  "Other",
];

const surfaceTypes = [
  { label: "Floor", value: "floor" },
  { label: "Wall", value: "wall" },
  { label: "Ceiling", value: "ceiling" },
  { label: "Deck / Outdoor", value: "deck" },
];

const productSizes: { label: string; sqftPerUnit: number }[] = [
  { label: 'Plank — 190mm x 1900mm (6" x 75")', sqftPerUnit: 3.88 },
  { label: 'Plank — 150mm x 1200mm (6" x 48")', sqftPerUnit: 1.94 },
  { label: 'Wide Plank — 220mm x 2200mm (9" x 87")', sqftPerUnit: 5.21 },
  { label: 'Panel — 300mm x 1200mm (12" x 48")', sqftPerUnit: 3.88 },
  { label: 'Panel — 600mm x 600mm (24" x 24")', sqftPerUnit: 3.88 },
  { label: 'Deck Board — 140mm x 2400mm (6" x 96")', sqftPerUnit: 3.62 },
  { label: "Custom Size", sqftPerUnit: 0 },
];

const wastageOptions = [
  { label: "5% — Simple rectangular room", value: 5 },
  { label: "10% — Standard (recommended)", value: 10 },
  { label: "15% — Diagonal / herringbone pattern", value: 15 },
  { label: "20% — Complex layout with many cuts", value: 20 },
];

const pricePerSqft = [
  { label: "Budget (₹200–350/sq.ft)", value: 275 },
  { label: "Mid-Range (₹350–550/sq.ft)", value: 450 },
  { label: "Premium (₹550–900/sq.ft)", value: 725 },
  { label: "Luxury (₹900+/sq.ft)", value: 1100 },
  { label: "Custom price", value: 0 },
];

type InputMode = "dimensions" | "area";

interface WallSection {
  id: number;
  length: string;
  width: string;
}

export default function Calculator() {
  useEffect(() => {
    document.title = "Surface Calculator | Lamiwood";
  }, []);

  const [roomType, setRoomType] = useState("");
  const [surfaceType, setSurfaceType] = useState("floor");
  const [inputMode, setInputMode] = useState<InputMode>("dimensions");
  const [sections, setSections] = useState<WallSection[]>([
    { id: 1, length: "", width: "" },
  ]);
  const [totalAreaInput, setTotalAreaInput] = useState("");
  const [selectedSize, setSelectedSize] = useState(1);
  const [customSqft, setCustomSqft] = useState("");
  const [wastage, setWastage] = useState(10);
  const [selectedPrice, setSelectedPrice] = useState(1);
  const [customPrice, setCustomPrice] = useState("");
  const [calculated, setCalculated] = useState(false);

  const addSection = () => {
    setSections((s) => [
      ...s,
      { id: Date.now(), length: "", width: "" },
    ]);
  };

  const removeSection = (id: number) => {
    if (sections.length <= 1) return;
    setSections((s) => s.filter((sec) => sec.id !== id));
  };

  const updateSection = (id: number, field: "length" | "width", value: string) => {
    setSections((s) =>
      s.map((sec) => (sec.id === id ? { ...sec, [field]: value } : sec)),
    );
  };

  // Calculations
  const results = useMemo(() => {
    let rawArea = 0;

    if (inputMode === "dimensions") {
      for (const sec of sections) {
        const l = parseFloat(sec.length) || 0;
        const w = parseFloat(sec.width) || 0;
        rawArea += l * w;
      }
    } else {
      rawArea = parseFloat(totalAreaInput) || 0;
    }

    if (rawArea <= 0) return null;

    const areaWithWastage = rawArea * (1 + wastage / 100);

    const sizeOption = productSizes[selectedSize];
    const sqftPerUnit =
      sizeOption.label === "Custom Size"
        ? parseFloat(customSqft) || 1
        : sizeOption.sqftPerUnit;

    const unitsNeeded = Math.ceil(areaWithWastage / sqftPerUnit);

    const priceOption = pricePerSqft[selectedPrice];
    const unitPrice =
      priceOption.label === "Custom price"
        ? parseFloat(customPrice) || 0
        : priceOption.value;

    const estimatedCost = areaWithWastage * unitPrice;

    return {
      rawArea,
      areaWithWastage: Math.ceil(areaWithWastage),
      unitsNeeded,
      wastageArea: Math.ceil(areaWithWastage - rawArea),
      estimatedCost,
      unitPrice,
    };
  }, [
    inputMode,
    sections,
    totalAreaInput,
    selectedSize,
    customSqft,
    wastage,
    selectedPrice,
    customPrice,
  ]);

  const handleCalculate = () => {
    setCalculated(true);
  };

  const handleReset = () => {
    setRoomType("");
    setSurfaceType("floor");
    setInputMode("dimensions");
    setSections([{ id: 1, length: "", width: "" }]);
    setTotalAreaInput("");
    setSelectedSize(1);
    setCustomSqft("");
    setWastage(10);
    setSelectedPrice(1);
    setCustomPrice("");
    setCalculated(false);
  };

  const inputClass =
    "w-full px-4 py-3 text-sm border border-beige dark:border-white/10 bg-white dark:bg-white/5 text-charcoal placeholder:text-charcoal-light/40 focus:border-gold focus:outline-none transition-colors rounded-sm";

  return (
    <PageTransition>
      {/* Hero */}
      <section className="relative pb-12 md:pb-16 bg-gradient-to-br from-[#2C2C2C] to-[#4A4A4A] overflow-hidden" style={{ paddingTop: "calc(var(--header-height) + 2rem)" }}>
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_40%_40%,rgba(184,134,11,0.4),transparent_60%)]" />
        <Container className="relative z-10">
          <Breadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "Surface Calculator" },
            ]}
            light
          />
          <AnimatedSection>
            <h1 className="font-serif text-3xl md:text-5xl text-white mt-2 mb-3">
              Surface Calculator
            </h1>
            <p className="text-white/70 text-base md:text-lg max-w-xl">
              Estimate the exact quantity of material you need for your project
              — area, units, wastage, and budget in one place.
            </p>
          </AnimatedSection>
        </Container>
      </section>

      <section className="py-12 md:py-16 bg-cream min-h-[60vh]">
        <Container size="narrow">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-10">
            {/* Calculator form */}
            <div className="space-y-5">
              {/* Step 1: Room & Surface */}
              <StepCard number={1} title="Room & Surface Type">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-charcoal mb-1.5">
                      Room Type
                    </label>
                    <select
                      value={roomType}
                      onChange={(e) => setRoomType(e.target.value)}
                      className={`${inputClass} cursor-pointer`}
                    >
                      <option value="">Select room</option>
                      {roomTypes.map((r) => (
                        <option key={r} value={r}>
                          {r}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-charcoal mb-1.5">
                      Surface
                    </label>
                    <div className="grid grid-cols-4 gap-2">
                      {surfaceTypes.map((s) => (
                        <button
                          key={s.value}
                          onClick={() => setSurfaceType(s.value)}
                          className={`py-3 text-xs font-medium tracking-wide transition-all cursor-pointer border rounded-sm text-center ${
                            surfaceType === s.value
                              ? "bg-gold text-white border-gold"
                              : "bg-transparent text-charcoal-light border-beige dark:border-white/10 hover:border-gold/50"
                          }`}
                        >
                          {s.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </StepCard>

              {/* Step 2: Area */}
              <StepCard number={2} title="Area Measurement">
                {/* Mode toggle */}
                <div className="flex gap-2 mb-4">
                  <button
                    onClick={() => setInputMode("dimensions")}
                    className={`flex-1 py-2 text-sm font-medium transition-all cursor-pointer border ${
                      inputMode === "dimensions"
                        ? "bg-gold text-white border-gold"
                        : "bg-transparent text-charcoal-light border-beige dark:border-white/10 hover:border-gold/50"
                    }`}
                  >
                    Use Dimensions (L x W)
                  </button>
                  <button
                    onClick={() => setInputMode("area")}
                    className={`flex-1 py-2 text-sm font-medium transition-all cursor-pointer border ${
                      inputMode === "area"
                        ? "bg-gold text-white border-gold"
                        : "bg-transparent text-charcoal-light border-beige dark:border-white/10 hover:border-gold/50"
                    }`}
                  >
                    Use Total Area
                  </button>
                </div>

                {inputMode === "dimensions" ? (
                  <div className="space-y-3">
                    {sections.map((sec, i) => (
                      <div
                        key={sec.id}
                        className="flex items-end gap-3"
                      >
                        <div className="flex-1">
                          <label className="block text-xs text-charcoal-light mb-1">
                            Length (ft){sections.length > 1 ? ` — Section ${i + 1}` : ""}
                          </label>
                          <input
                            type="number"
                            min="0"
                            step="0.1"
                            value={sec.length}
                            onChange={(e) =>
                              updateSection(sec.id, "length", e.target.value)
                            }
                            placeholder="e.g. 15"
                            className={inputClass}
                          />
                        </div>
                        <span className="pb-3 text-charcoal-light">x</span>
                        <div className="flex-1">
                          <label className="block text-xs text-charcoal-light mb-1">
                            Width (ft)
                          </label>
                          <input
                            type="number"
                            min="0"
                            step="0.1"
                            value={sec.width}
                            onChange={(e) =>
                              updateSection(sec.id, "width", e.target.value)
                            }
                            placeholder="e.g. 12"
                            className={inputClass}
                          />
                        </div>
                        {sections.length > 1 && (
                          <button
                            onClick={() => removeSection(sec.id)}
                            className="pb-3 text-charcoal-light hover:text-red-500 transition-colors cursor-pointer"
                            aria-label="Remove section"
                          >
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        )}
                      </div>
                    ))}
                    <button
                      onClick={addSection}
                      className="text-sm text-gold hover:text-gold-light transition-colors cursor-pointer inline-flex items-center gap-1"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                      Add another section
                    </button>
                  </div>
                ) : (
                  <div>
                    <label className="block text-xs text-charcoal-light mb-1">
                      Total Area (sq.ft)
                    </label>
                    <input
                      type="number"
                      min="0"
                      step="1"
                      value={totalAreaInput}
                      onChange={(e) => setTotalAreaInput(e.target.value)}
                      placeholder="e.g. 500"
                      className={inputClass}
                    />
                  </div>
                )}
              </StepCard>

              {/* Step 3: Product Size */}
              <StepCard number={3} title="Product Size">
                <select
                  value={selectedSize}
                  onChange={(e) => setSelectedSize(Number(e.target.value))}
                  className={`${inputClass} cursor-pointer`}
                >
                  {productSizes.map((s, i) => (
                    <option key={s.label} value={i}>
                      {s.label}
                    </option>
                  ))}
                </select>
                {productSizes[selectedSize].label === "Custom Size" && (
                  <div className="mt-3">
                    <label className="block text-xs text-charcoal-light mb-1">
                      Sq.ft per unit/plank
                    </label>
                    <input
                      type="number"
                      min="0.1"
                      step="0.01"
                      value={customSqft}
                      onChange={(e) => setCustomSqft(e.target.value)}
                      placeholder="e.g. 3.88"
                      className={inputClass}
                    />
                  </div>
                )}
              </StepCard>

              {/* Step 4: Wastage */}
              <StepCard number={4} title="Wastage & Reserve">
                <select
                  value={wastage}
                  onChange={(e) => setWastage(Number(e.target.value))}
                  className={`${inputClass} cursor-pointer`}
                >
                  {wastageOptions.map((w) => (
                    <option key={w.value} value={w.value}>
                      {w.label}
                    </option>
                  ))}
                </select>
                <p className="text-xs text-charcoal-light/60 mt-2">
                  Includes extra material for cuts, breakage, and future
                  repairs.
                </p>
              </StepCard>

              {/* Step 5: Budget */}
              <StepCard number={5} title="Budget Estimate">
                <select
                  value={selectedPrice}
                  onChange={(e) => setSelectedPrice(Number(e.target.value))}
                  className={`${inputClass} cursor-pointer`}
                >
                  {pricePerSqft.map((p, i) => (
                    <option key={p.label} value={i}>
                      {p.label}
                    </option>
                  ))}
                </select>
                {pricePerSqft[selectedPrice].label === "Custom price" && (
                  <div className="mt-3">
                    <label className="block text-xs text-charcoal-light mb-1">
                      Price per sq.ft (₹)
                    </label>
                    <input
                      type="number"
                      min="1"
                      value={customPrice}
                      onChange={(e) => setCustomPrice(e.target.value)}
                      placeholder="e.g. 450"
                      className={inputClass}
                    />
                  </div>
                )}
              </StepCard>

              {/* Actions */}
              <div className="flex gap-3">
                <Button size="lg" onClick={handleCalculate}>
                  Calculate
                </Button>
                <Button size="lg" variant="secondary" onClick={handleReset}>
                  Reset
                </Button>
              </div>
            </div>

            {/* Results sidebar */}
            <div className="lg:sticky lg:top-28 lg:self-start">
              <ResultsCard results={calculated ? results : null} wastage={wastage} />
            </div>
          </div>

          {/* FAQ */}
          <div className="mt-20">
            <h2 className="font-serif text-2xl text-charcoal mb-8 text-center">
              Frequently Asked Questions
            </h2>
            <div className="max-w-2xl mx-auto space-y-4">
              <FaqItem
                question="How much extra material should I order?"
                answer="We recommend 10% extra for standard rectangular rooms. For diagonal, herringbone, or complex patterns, increase to 15-20%. It's also wise to keep a small reserve for future repairs."
              />
              <FaqItem
                question="How do I measure an irregularly shaped room?"
                answer="Break the room into rectangular sections using the 'Add another section' button. Measure each section separately (Length x Width) and the calculator will sum them up automatically."
              />
              <FaqItem
                question="Does the calculator account for doors and windows?"
                answer="No — for simplicity, we calculate the full area. In practice, the material saved by door/window openings roughly offsets the wastage from cutting, so the estimate remains accurate."
              />
              <FaqItem
                question="What's the difference between planks and panels?"
                answer="Planks are long and narrow (common for flooring), while panels are wider and shorter (common for walls and ceilings). Select the product size that matches what you're installing."
              />
            </div>
          </div>
        </Container>
      </section>
    </PageTransition>
  );
}

function StepCard({
  number,
  title,
  children,
}: {
  number: number;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <AnimatedSection delay={number * 0.05}>
      <div className="border border-beige dark:border-white/10 bg-white dark:bg-[#1E1E1E] p-5 md:p-6 rounded-sm">
        <div className="flex items-center gap-3 mb-4">
          <span className="w-7 h-7 rounded-full bg-gold text-white text-xs font-bold flex items-center justify-center shrink-0">
            {number}
          </span>
          <h3 className="text-sm font-medium text-charcoal uppercase tracking-wider">
            {title}
          </h3>
        </div>
        {children}
      </div>
    </AnimatedSection>
  );
}

function ResultsCard({
  results,
  wastage,
}: {
  results: {
    rawArea: number;
    areaWithWastage: number;
    unitsNeeded: number;
    wastageArea: number;
    estimatedCost: number;
    unitPrice: number;
  } | null;
  wastage: number;
}) {
  return (
    <div className="border border-beige dark:border-white/10 bg-white dark:bg-[#1E1E1E] p-6 sticky top-28 rounded-sm">
      <h3 className="font-serif text-xl text-charcoal mb-6 flex items-center gap-2">
        <svg className="w-5 h-5 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.75 15.75V18m-7.5-6.75h.008v.008H8.25v-.008zm0 2.25h.008v.008H8.25V13.5zm0 2.25h.008v.008H8.25v-.008zm0 2.25h.008v.008H8.25V18zm2.498-6.75h.007v.008h-.007v-.008zm0 2.25h.007v.008h-.007V13.5zm0 2.25h.007v.008h-.007v-.008zm0 2.25h.007v.008h-.007V18zm2.504-6.75h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V13.5zm0 2.25h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V18zm2.498-6.75h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V13.5zM8.25 6h7.5v2.25h-7.5V6zM12 2.25c-1.892 0-3.758.11-5.593.322C5.307 2.7 4.5 3.65 4.5 4.757V19.5a2.25 2.25 0 002.25 2.25h10.5a2.25 2.25 0 002.25-2.25V4.757c0-1.108-.806-2.057-1.907-2.185A48.507 48.507 0 0012 2.25z" />
        </svg>
        Your Estimate
      </h3>

      {!results ? (
        <div className="text-center py-8">
          <div className="text-beige mb-3">
            <svg className="w-12 h-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5" />
            </svg>
          </div>
          <p className="text-charcoal-light text-sm">
            Fill in the details and click Calculate to see your estimate.
          </p>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={SPRING_GENTLE}
          className="space-y-5"
        >
          {/* Primary metrics */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-offwhite dark:bg-white/5 p-4 text-center rounded-sm">
              <p className="text-xs text-charcoal-light uppercase tracking-wider mb-1">
                Total Area
              </p>
              <p className="font-serif text-2xl text-gold">
                {results.areaWithWastage}
              </p>
              <p className="text-xs text-charcoal-light">sq.ft</p>
            </div>
            <div className="bg-offwhite dark:bg-white/5 p-4 text-center rounded-sm">
              <p className="text-xs text-charcoal-light uppercase tracking-wider mb-1">
                Units Needed
              </p>
              <p className="font-serif text-2xl text-gold">
                {results.unitsNeeded}
              </p>
              <p className="text-xs text-charcoal-light">pieces</p>
            </div>
          </div>

          {/* Breakdown */}
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-charcoal-light">Base area</span>
              <span className="text-charcoal font-medium">
                {Math.ceil(results.rawArea)} sq.ft
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-charcoal-light">
                Wastage ({wastage}%)
              </span>
              <span className="text-charcoal font-medium">
                +{results.wastageArea} sq.ft
              </span>
            </div>
            <div className="border-t border-beige dark:border-white/10 pt-2 flex justify-between">
              <span className="text-charcoal-light">Total required</span>
              <span className="text-charcoal font-medium">
                {results.areaWithWastage} sq.ft
              </span>
            </div>
          </div>

          {/* Cost estimate */}
          {results.unitPrice > 0 && (
            <div className="border-t border-beige dark:border-white/10 pt-4">
              <div className="flex justify-between items-end">
                <div>
                  <p className="text-xs text-charcoal-light uppercase tracking-wider mb-1">
                    Estimated Cost
                  </p>
                  <p className="font-serif text-3xl text-gold">
                    {formatPrice(Math.round(results.estimatedCost))}
                  </p>
                </div>
                <p className="text-xs text-charcoal-light">
                  @ ₹{results.unitPrice}/sq.ft
                </p>
              </div>
            </div>
          )}

          {/* CTA */}
          <div className="pt-2">
            <Button href="/contact" className="w-full" size="md">
              Get Exact Quote
            </Button>
            <p className="text-[10px] text-charcoal-light/60 text-center mt-2">
              This is an estimate. Contact us for a precise quotation.
            </p>
          </div>
        </motion.div>
      )}
    </div>
  );
}

function FaqItem({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border border-beige dark:border-white/10">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-4 text-left cursor-pointer hover:bg-offwhite/50 transition-colors"
      >
        <span className="text-sm font-medium text-charcoal pr-4">
          {question}
        </span>
        <motion.svg
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2, ease: EASE_LUXURY }}
          className="w-4 h-4 text-charcoal-light shrink-0"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </motion.svg>
      </button>
      <motion.div
        initial={false}
        animate={{
          height: open ? "auto" : 0,
          opacity: open ? 1 : 0,
        }}
        transition={{ duration: 0.3, ease: EASE_LUXURY }}
        className="overflow-hidden"
      >
        <p className="px-4 pb-4 text-sm text-charcoal-light leading-relaxed">
          {answer}
        </p>
      </motion.div>
    </div>
  );
}
