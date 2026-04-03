import type { ProductSpec } from "@/types";
import AnimatedSection from "@/components/shared/AnimatedSection";

interface ProductSpecsProps {
  specs: ProductSpec[];
}

export default function ProductSpecs({ specs }: ProductSpecsProps) {
  return (
    <AnimatedSection>
      <div className="mt-16">
        <h2 className="font-serif text-2xl text-charcoal mb-6">Specifications</h2>
        <div className="border border-beige dark:border-white/10">
          {specs.map((spec, i) => (
            <div
              key={spec.label}
              className={`flex ${i % 2 === 0 ? "bg-offwhite dark:bg-white/5" : "bg-cream dark:bg-white/[0.02]"}`}
            >
              <div className="w-1/3 px-4 py-3 text-sm font-medium text-charcoal border-r border-beige dark:border-white/10">
                {spec.label}
              </div>
              <div className="flex-1 px-4 py-3 text-sm text-charcoal-light">
                {spec.value}
              </div>
            </div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}
