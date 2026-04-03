import type { Product } from "@/types";

// Score a product against collected style tags
export function scoreProduct(product: Product, tags: string[]): number {
  let score = 0;
  const lower = (s: string) => s.toLowerCase();
  const matLower = lower(product.material);
  const finLower = lower(product.finish);
  const catLower = lower(product.category);
  const descLower = lower(product.description);

  for (const tag of tags) {
    const t = lower(tag);

    // Material match
    if (matLower.includes(t)) score += 3;

    // Finish match
    if (finLower.includes(t)) score += 2;

    // Category match
    if (catLower.includes(t)) score += 2;

    // Description keyword match
    if (descLower.includes(t)) score += 1;

    // Specific tag mappings
    if (t === "warm" && (matLower.includes("oak") || matLower.includes("teak")))
      score += 2;
    if (t === "cool" && (matLower.includes("ash") || finLower.includes("grey")))
      score += 2;
    if (t === "dark" && (matLower.includes("walnut") || finLower.includes("charred") || finLower.includes("smoked")))
      score += 2;
    if (t === "light" && (matLower.includes("pine") || finLower.includes("bleached") || finLower.includes("white")))
      score += 2;
    if (t === "indoor" && ["flooring", "wall-panels", "acoustic-panels", "ceiling-panels"].includes(product.category))
      score += 2;
    if (t === "outdoor" && ["decking", "cladding"].includes(product.category))
      score += 2;
    if (t === "sustainable" && product.sustainability?.fscCertified)
      score += 3;
    if (t === "recycled" && (product.sustainability?.recycledContent ?? 0) > 30)
      score += 2;
    if (t === "premium" && product.badge === "premium")
      score += 2;
    if (t === "luxury" && product.price > 500)
      score += 1;
  }

  return score;
}

// Get top N product matches for a set of style tags
export function getRecommendations(
  products: Product[],
  tags: string[],
  count = 4,
): Product[] {
  return [...products]
    .map((p) => ({ product: p, score: scoreProduct(p, tags) }))
    .sort((a, b) => b.score - a.score)
    .slice(0, count)
    .map((r) => r.product);
}
