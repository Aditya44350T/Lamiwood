// Maps material types to aging color shift profiles
// Each stop: CSS filter values at that age point + description

export interface AgingStage {
  year: number;
  label: string;
  description: string;
  filters: {
    hueRotate: number; // degrees
    saturate: number; // percentage (100 = no change)
    brightness: number; // percentage
    sepia: number; // percentage
  };
}

export interface AgingProfile {
  material: string;
  stages: AgingStage[];
}

// Default profiles by material keyword
export const agingProfiles: AgingProfile[] = [
  {
    material: "Oak",
    stages: [
      { year: 0, label: "Day 1", description: "Fresh from the workshop — clean tones, crisp grain.", filters: { hueRotate: 0, saturate: 100, brightness: 100, sepia: 0 } },
      { year: 1, label: "1 Year", description: "Subtle UV mellowing begins. Honey undertones emerge.", filters: { hueRotate: 3, saturate: 95, brightness: 98, sepia: 5 } },
      { year: 5, label: "5 Years", description: "Rich amber warmth develops. Grain contrast deepens.", filters: { hueRotate: 8, saturate: 90, brightness: 95, sepia: 12 } },
      { year: 10, label: "10 Years", description: "Deep golden patina. Character marks tell the story of your home.", filters: { hueRotate: 12, saturate: 85, brightness: 92, sepia: 18 } },
      { year: 25, label: "25 Years", description: "Timeless beauty — a living surface that ages like fine wine.", filters: { hueRotate: 15, saturate: 80, brightness: 90, sepia: 22 } },
    ],
  },
  {
    material: "Walnut",
    stages: [
      { year: 0, label: "Day 1", description: "Rich, deep chocolate tones with purple undertones.", filters: { hueRotate: 0, saturate: 100, brightness: 100, sepia: 0 } },
      { year: 1, label: "1 Year", description: "Slight lightening as UV exposure mellows the darkest tones.", filters: { hueRotate: -2, saturate: 95, brightness: 103, sepia: 3 } },
      { year: 5, label: "5 Years", description: "Warm brown equilibrium — the purple fades to a rich coffee.", filters: { hueRotate: -5, saturate: 88, brightness: 105, sepia: 8 } },
      { year: 10, label: "10 Years", description: "Elegant, warm mid-brown. Smoother, more unified appearance.", filters: { hueRotate: -6, saturate: 82, brightness: 108, sepia: 12 } },
      { year: 25, label: "25 Years", description: "Distinguished caramel-brown. A classic surface with generations of character.", filters: { hueRotate: -8, saturate: 78, brightness: 110, sepia: 15 } },
    ],
  },
  {
    material: "Cedar",
    stages: [
      { year: 0, label: "Day 1", description: "Warm honey-to-amber tones with aromatic freshness.", filters: { hueRotate: 0, saturate: 100, brightness: 100, sepia: 0 } },
      { year: 1, label: "1 Year", description: "Tones begin to grey if exposed outdoors. Indoor pieces deepen.", filters: { hueRotate: -5, saturate: 85, brightness: 95, sepia: 8 } },
      { year: 5, label: "5 Years", description: "Beautiful silver-grey patina develops naturally outdoors.", filters: { hueRotate: -15, saturate: 60, brightness: 100, sepia: 15 } },
      { year: 10, label: "10 Years", description: "Even silver tone — the weathered look that designers covet.", filters: { hueRotate: -20, saturate: 40, brightness: 105, sepia: 20 } },
      { year: 25, label: "25 Years", description: "Elegant driftwood silver. Can be restored with oil treatment.", filters: { hueRotate: -25, saturate: 30, brightness: 108, sepia: 25 } },
    ],
  },
  {
    material: "Bamboo",
    stages: [
      { year: 0, label: "Day 1", description: "Light, clean honey tone with fine uniform grain.", filters: { hueRotate: 0, saturate: 100, brightness: 100, sepia: 0 } },
      { year: 1, label: "1 Year", description: "Minimal change — bamboo is remarkably colour-stable.", filters: { hueRotate: 2, saturate: 98, brightness: 99, sepia: 2 } },
      { year: 5, label: "5 Years", description: "Gentle deepening to a richer golden tone.", filters: { hueRotate: 5, saturate: 95, brightness: 97, sepia: 5 } },
      { year: 10, label: "10 Years", description: "Warm amber with excellent structural integrity maintained.", filters: { hueRotate: 8, saturate: 90, brightness: 95, sepia: 8 } },
      { year: 25, label: "25 Years", description: "Deep honey amber. Strand-woven bamboo remains rock-hard.", filters: { hueRotate: 10, saturate: 85, brightness: 93, sepia: 10 } },
    ],
  },
  {
    material: "Teak",
    stages: [
      { year: 0, label: "Day 1", description: "Golden-brown warmth with distinctive straight grain.", filters: { hueRotate: 0, saturate: 100, brightness: 100, sepia: 0 } },
      { year: 1, label: "1 Year", description: "Rich honey tones intensify. Natural oils darken slightly.", filters: { hueRotate: 5, saturate: 95, brightness: 97, sepia: 5 } },
      { year: 5, label: "5 Years", description: "Deep warm brown. Surface oils provide natural lustre.", filters: { hueRotate: 10, saturate: 88, brightness: 93, sepia: 10 } },
      { year: 10, label: "10 Years", description: "Outdoors: silver patina. Indoors: dark honey-brown.", filters: { hueRotate: 12, saturate: 82, brightness: 90, sepia: 14 } },
      { year: 25, label: "25 Years", description: "Antique character — teak only gets more beautiful with time.", filters: { hueRotate: 15, saturate: 78, brightness: 88, sepia: 18 } },
    ],
  },
  {
    material: "Pine",
    stages: [
      { year: 0, label: "Day 1", description: "Light straw-yellow with visible knots and resin patterns.", filters: { hueRotate: 0, saturate: 100, brightness: 100, sepia: 0 } },
      { year: 1, label: "1 Year", description: "Rapid yellowing begins as resin oxidises.", filters: { hueRotate: 5, saturate: 95, brightness: 97, sepia: 8 } },
      { year: 5, label: "5 Years", description: "Warm amber-yellow. Knots darken for more contrast.", filters: { hueRotate: 10, saturate: 90, brightness: 93, sepia: 15 } },
      { year: 10, label: "10 Years", description: "Rich honey tone throughout. A well-loved, warm surface.", filters: { hueRotate: 14, saturate: 85, brightness: 90, sepia: 20 } },
      { year: 25, label: "25 Years", description: "Deep golden amber. The character of a heritage home.", filters: { hueRotate: 18, saturate: 80, brightness: 87, sepia: 25 } },
    ],
  },
  {
    material: "Ipê",
    stages: [
      { year: 0, label: "Day 1", description: "Deep chocolate-brown with fine, tight grain.", filters: { hueRotate: 0, saturate: 100, brightness: 100, sepia: 0 } },
      { year: 1, label: "1 Year", description: "If oiled: maintains dark brown. If natural: begins silvering.", filters: { hueRotate: -3, saturate: 90, brightness: 102, sepia: 5 } },
      { year: 5, label: "5 Years", description: "Natural weathering produces an elegant silver-grey.", filters: { hueRotate: -10, saturate: 55, brightness: 110, sepia: 12 } },
      { year: 10, label: "10 Years", description: "Full silver patina. Still rock-hard underneath.", filters: { hueRotate: -18, saturate: 35, brightness: 115, sepia: 18 } },
      { year: 25, label: "25 Years", description: "Platinum-silver surface. Oil to restore brown at any time.", filters: { hueRotate: -22, saturate: 25, brightness: 118, sepia: 22 } },
    ],
  },
  {
    material: "Ash",
    stages: [
      { year: 0, label: "Day 1", description: "Pale cream-to-white with subtle open grain.", filters: { hueRotate: 0, saturate: 100, brightness: 100, sepia: 0 } },
      { year: 1, label: "1 Year", description: "Very slight warming. Ash is naturally colour-stable.", filters: { hueRotate: 2, saturate: 97, brightness: 99, sepia: 3 } },
      { year: 5, label: "5 Years", description: "Light golden undertone develops gently.", filters: { hueRotate: 5, saturate: 93, brightness: 97, sepia: 6 } },
      { year: 10, label: "10 Years", description: "Warm ivory tone. Open grain provides beautiful texture.", filters: { hueRotate: 7, saturate: 90, brightness: 95, sepia: 9 } },
      { year: 25, label: "25 Years", description: "Soft golden cream. Retains its light, airy character.", filters: { hueRotate: 10, saturate: 85, brightness: 93, sepia: 12 } },
    ],
  },
  {
    material: "Composite",
    stages: [
      { year: 0, label: "Day 1", description: "Consistent factory colour. No natural variation.", filters: { hueRotate: 0, saturate: 100, brightness: 100, sepia: 0 } },
      { year: 1, label: "1 Year", description: "Virtually no change — composites are engineered for stability.", filters: { hueRotate: 0, saturate: 99, brightness: 99, sepia: 0 } },
      { year: 5, label: "5 Years", description: "Minimal fading if capped. Uncapped may lighten 5-10%.", filters: { hueRotate: 0, saturate: 95, brightness: 102, sepia: 2 } },
      { year: 10, label: "10 Years", description: "Capped composites retain 95%+ of original colour.", filters: { hueRotate: -1, saturate: 92, brightness: 103, sepia: 3 } },
      { year: 25, label: "25 Years", description: "Structurally sound. Slight natural weathering adds character.", filters: { hueRotate: -2, saturate: 88, brightness: 105, sepia: 5 } },
    ],
  },
  {
    material: "Felt",
    stages: [
      { year: 0, label: "Day 1", description: "Vibrant, even colour with soft tactile surface.", filters: { hueRotate: 0, saturate: 100, brightness: 100, sepia: 0 } },
      { year: 1, label: "1 Year", description: "Colour remains stable. Surface may soften slightly.", filters: { hueRotate: 0, saturate: 98, brightness: 99, sepia: 1 } },
      { year: 5, label: "5 Years", description: "Minimal change. PET felt is inherently fade-resistant.", filters: { hueRotate: 0, saturate: 95, brightness: 98, sepia: 2 } },
      { year: 10, label: "10 Years", description: "Maintains acoustic performance. Colour gently softens.", filters: { hueRotate: -1, saturate: 92, brightness: 97, sepia: 3 } },
      { year: 25, label: "25 Years", description: "Excellent longevity. Can be replaced modularly if desired.", filters: { hueRotate: -2, saturate: 88, brightness: 95, sepia: 5 } },
    ],
  },
];

// Find the best matching aging profile for a product material
export function getAgingProfile(material: string): AgingProfile {
  const lower = material.toLowerCase();
  const match = agingProfiles.find((p) =>
    lower.includes(p.material.toLowerCase()),
  );
  // Default to Oak if no match
  return match ?? agingProfiles[0];
}
