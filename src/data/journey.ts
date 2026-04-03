export interface JourneyStage {
  id: number;
  title: string;
  description: string;
  funFact: string;
  image: string;
  icon: string;
}

export const journeyStages: JourneyStage[] = [
  {
    id: 1,
    title: "The Forest",
    description:
      "Every Lamiwood surface begins in a responsibly managed forest — from the slow-growing oaks of Central Europe to the bamboo groves of Southeast Asia. We source exclusively from FSC-certified operations.",
    funFact: "A single European oak tree takes 80-120 years to reach harvest maturity.",
    image: "https://images.unsplash.com/photo-1448375240586-882707db888b?w=1200&h=800&fit=crop&q=80",
    icon: "🌳",
  },
  {
    id: 2,
    title: "Selective Harvest",
    description:
      "Our forestry partners practice selective harvesting — removing only mature trees while preserving biodiversity. Each tree is individually assessed for grain quality, density, and character before felling.",
    funFact: "For every tree harvested, our partners plant 3-5 new seedlings.",
    image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=1200&h=800&fit=crop&q=80",
    icon: "🪓",
  },
  {
    id: 3,
    title: "The Sawmill",
    description:
      "At the sawmill, logs are converted into rough-sawn lumber using precision band saws that maximize yield and minimize waste. Sawdust and offcuts are repurposed into wood pellets for energy.",
    funFact: "Modern sawmills achieve 65-70% yield from each log — up from 50% a decade ago.",
    image: "https://images.unsplash.com/photo-1631396328075-9c65a7406f09?w=1200&h=800&fit=crop&q=80",
    icon: "🏭",
  },
  {
    id: 4,
    title: "Treatment & Drying",
    description:
      "Lumber is kiln-dried over 2-4 weeks to reach optimal moisture content (8-12%). Some products undergo thermal modification at 212°C+ or the ancient Shou Sugi Ban charring process.",
    funFact: "Thermowood treatment permanently reduces wood's moisture absorption by 40-50%.",
    image: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=1200&h=800&fit=crop&q=80",
    icon: "🔥",
  },
  {
    id: 5,
    title: "Craftsmanship",
    description:
      "Master craftsmen and CNC machines work in tandem. Tongue-and-groove profiles are milled to 0.1mm tolerance. Acoustic panels receive precision-routed slat patterns. Every surface is hand-inspected.",
    funFact: "Our CNC machines cut at 18,000 RPM — faster than a Formula 1 engine.",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=1200&h=800&fit=crop&q=80",
    icon: "🛠️",
  },
  {
    id: 6,
    title: "Finishing",
    description:
      "UV-cured oils, hand-rubbed waxes, or lacquer coatings are applied in controlled-atmosphere chambers. Each finish is formulated to enhance the wood's natural beauty while providing lasting protection.",
    funFact: "UV-cured oil finishes harden in seconds — 100x faster than air-dried alternatives.",
    image: "https://images.unsplash.com/photo-1622547748225-3fc4abd2cca0?w=1200&h=800&fit=crop&q=80",
    icon: "✨",
  },
  {
    id: 7,
    title: "Quality Control",
    description:
      "Every batch undergoes 12-point inspection: dimensional accuracy, moisture content, finish adhesion, colour consistency, surface defects, and structural integrity. Only surfaces that pass every test earn the Lamiwood name.",
    funFact: "We reject approximately 8% of finished product — it's repurposed, never wasted.",
    image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=1200&h=800&fit=crop&q=80",
    icon: "🔍",
  },
  {
    id: 8,
    title: "Your Space",
    description:
      "From our warehouse to your doorstep — carefully packaged to arrive in perfect condition. Professional installation or DIY click-lock: the final step in a journey that began in nature.",
    funFact: "The average Lamiwood surface will be walked on 10,000+ times before its first anniversary.",
    image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1200&h=800&fit=crop&q=80",
    icon: "🏠",
  },
];
