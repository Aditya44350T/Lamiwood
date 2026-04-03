import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { products } from "@/data/products";
import { formatPrice } from "@/lib/utils";
import Container from "@/components/ui/Container";
import Breadcrumb from "@/components/ui/Breadcrumb";
import SectionHeading from "@/components/ui/SectionHeading";
import PageTransition from "@/components/shared/PageTransition";
import ImageWithFallback from "@/components/ui/ImageWithFallback";

const MAX_COMPARE = 3;

export default function Compare() {
  const [searchParams] = useSearchParams();
  const [selectedIds, setSelectedIds] = useState<string[]>(() => {
    const preselect = searchParams.get("select");
    if (preselect && products.some((p) => p.id === preselect)) {
      return [preselect];
    }
    return [];
  });

  useEffect(() => {
    document.title = "Compare Products | Lamiwood";
  }, []);

  const toggle = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id)
        ? prev.filter((x) => x !== id)
        : prev.length < MAX_COMPARE
          ? [...prev, id]
          : prev,
    );
  };

  const selected = selectedIds.map((id) => products.find((p) => p.id === id)!).filter(Boolean);

  const allSpecLabels = [
    ...new Set(selected.flatMap((p) => p.specs.map((s) => s.label))),
  ];

  return (
    <PageTransition>
      <div className="pb-20 bg-cream min-h-screen" style={{ paddingTop: "var(--header-height)" }}>
        <Container>
          <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Compare" }]} />
          <SectionHeading
            title="Compare Products"
            subtitle="Select up to 3 products to compare side by side."
            className="mt-4"
          />

          {/* Product selector */}
          <div className="mb-10">
            <p className="text-sm text-charcoal-light mb-3">
              {selectedIds.length}/{MAX_COMPARE} selected
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
              {products.map((p) => (
                <button
                  key={p.id}
                  onClick={() => toggle(p.id)}
                  disabled={!selectedIds.includes(p.id) && selectedIds.length >= MAX_COMPARE}
                  className={`p-2 border text-left transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed ${
                    selectedIds.includes(p.id)
                      ? "border-gold bg-gold/5"
                      : "border-beige hover:border-gold/50"
                  }`}
                >
                  <div className="aspect-square mb-1 overflow-hidden">
                    <ImageWithFallback src={p.thumbnail} alt={p.name} className="w-full h-full" />
                  </div>
                  <p className="text-[10px] text-charcoal leading-tight line-clamp-2">{p.name}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Comparison table */}
          {selected.length >= 2 ? (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr>
                    <th className="text-left p-3 border border-beige dark:border-white/10 bg-offwhite dark:bg-[#1a1a1a] text-sm font-medium text-charcoal-light w-36">
                      Product
                    </th>
                    {selected.map((p) => (
                      <th key={p.id} className="p-3 border border-beige dark:border-white/10 bg-offwhite dark:bg-[#1a1a1a] text-center min-w-[200px]">
                        <div className="aspect-[4/3] mb-2 overflow-hidden">
                          <ImageWithFallback src={p.thumbnail} alt={p.name} className="w-full h-full" />
                        </div>
                        <p className="font-serif text-base text-charcoal">{p.name}</p>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="p-3 border border-beige dark:border-white/10 text-sm font-medium text-charcoal bg-cream">Price</td>
                    {selected.map((p) => (
                      <td key={p.id} className="p-3 border border-beige dark:border-white/10 text-center text-gold font-medium">
                        {formatPrice(p.price)} <span className="text-xs text-charcoal-light font-normal">{p.unit}</span>
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-3 border border-beige dark:border-white/10 text-sm font-medium text-charcoal bg-cream">Category</td>
                    {selected.map((p) => (
                      <td key={p.id} className="p-3 border border-beige dark:border-white/10 text-center text-sm capitalize text-charcoal-light">
                        {p.category.replace("-", " ")}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-3 border border-beige dark:border-white/10 text-sm font-medium text-charcoal bg-cream">Material</td>
                    {selected.map((p) => (
                      <td key={p.id} className="p-3 border border-beige dark:border-white/10 text-center text-sm text-charcoal-light">{p.material}</td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-3 border border-beige dark:border-white/10 text-sm font-medium text-charcoal bg-cream">Finish</td>
                    {selected.map((p) => (
                      <td key={p.id} className="p-3 border border-beige dark:border-white/10 text-center text-sm text-charcoal-light">{p.finish}</td>
                    ))}
                  </tr>
                  {allSpecLabels.map((label) => (
                    <tr key={label}>
                      <td className="p-3 border border-beige dark:border-white/10 text-sm font-medium text-charcoal bg-cream">{label}</td>
                      {selected.map((p) => {
                        const spec = p.specs.find((s) => s.label === label);
                        return (
                          <td key={p.id} className="p-3 border border-beige dark:border-white/10 text-center text-sm text-charcoal-light">
                            {spec?.value ?? "—"}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                  <tr>
                    <td className="p-3 border border-beige dark:border-white/10 text-sm font-medium text-charcoal bg-cream">Features</td>
                    {selected.map((p) => (
                      <td key={p.id} className="p-3 border border-beige dark:border-white/10 text-left text-sm text-charcoal-light">
                        <ul className="space-y-1">
                          {p.features.map((f) => (
                            <li key={f} className="flex items-start gap-1.5">
                              <span className="text-gold mt-1 shrink-0 text-xs">&#9670;</span>
                              <span className="text-xs">{f}</span>
                            </li>
                          ))}
                        </ul>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-12 border border-beige dark:border-white/10">
              <p className="text-charcoal-light">
                Select at least 2 products above to start comparing.
              </p>
            </div>
          )}
        </Container>
      </div>
    </PageTransition>
  );
}
