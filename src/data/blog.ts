export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  image: string;
  author: string;
  date: string;
  readTime: string;
}

export const blogPosts: BlogPost[] = [
  {
    id: "1",
    slug: "5-flooring-trends-2026",
    title: "5 Flooring Trends Defining Luxury Interiors in 2026",
    excerpt:
      "From wide-plank engineered oak to herringbone patterns making a comeback, discover the flooring choices that India's top designers are specifying this year.",
    content:
      "The Indian luxury interior market is evolving rapidly, and flooring is at the heart of every design conversation. Wide-plank engineered oak continues to dominate specifications, with designers favoring planks above 200mm for their ability to make spaces feel grander. The herringbone pattern, once considered traditional, is experiencing a renaissance in contemporary homes — particularly in American Walnut and European Oak. Sustainability is no longer optional; FSC-certified materials are now a baseline expectation, not a premium add-on. Thermal modification technology (Thermowood) is gaining traction for its chemical-free durability enhancement. Finally, the 'outdoor-indoor' trend sees strand-woven bamboo bridging terraces and living rooms seamlessly.",
    category: "Trends",
    image:
      "https://images.unsplash.com/photo-1722604828977-395d52c3cd23?w=800&h=500&fit=crop&q=80",
    author: "Ananya Krishnan",
    date: "2026-03-15",
    readTime: "5 min",
  },
  {
    id: "2",
    slug: "choosing-wall-panels-guide",
    title: "The Designer's Guide to Choosing the Right Wall Panels",
    excerpt:
      "Material, finish, acoustics, maintenance — a comprehensive framework for specifying wall panels that balance aesthetics with performance.",
    content:
      "Wall panels serve multiple functions beyond decoration: they manage acoustics, protect surfaces, and define spatial character. Start with the room's purpose — a home theater demands acoustic performance (NRC 0.7+), while a hotel lobby prioritizes visual impact and durability. Consider the base material: reclaimed teak offers unmatched warmth and character, European ash provides Scandinavian lightness, and charred cedar (Shou Sugi Ban) delivers dramatic texture with inherent fire resistance. Finish matters enormously — oil finishes allow the wood to breathe and age naturally, while lacquers provide stain resistance for high-traffic areas. Budget allocation should factor in not just material cost per sq.ft but installation complexity and long-term maintenance requirements.",
    category: "Guides",
    image:
      "https://images.unsplash.com/photo-1754380629457-b833f6bea68a?w=800&h=500&fit=crop&q=80",
    author: "Vikram Patel",
    date: "2026-02-28",
    readTime: "7 min",
  },
  {
    id: "3",
    slug: "sustainable-wood-sourcing",
    title: "How We Source: The Journey from Forest to Your Floor",
    excerpt:
      "A transparent look at Lamiwood's supply chain — from FSC-certified European forests to our Mumbai workshop and into your living spaces.",
    content:
      "Transparency in material sourcing is a cornerstone of our brand. Every plank of European Oak we use can be traced to FSC-certified forests in France and Germany, where sustainable harvesting ensures forest regeneration. Our American Walnut comes from managed plantations in Pennsylvania and Indiana. For reclaimed teak, we partner with heritage demolition specialists across Myanmar and Indonesia, giving century-old timber a second life. Once materials arrive at our Mumbai facility, they undergo rigorous quality grading, moisture testing, and conditioning before any milling begins. This end-to-end traceability isn't just about certification — it's about ensuring every surface we deliver carries a story of responsible stewardship.",
    category: "Behind the Scenes",
    image:
      "https://images.unsplash.com/photo-1631396328075-9c65a7406f09?w=800&h=500&fit=crop&q=80",
    author: "Rajesh Thakur",
    date: "2026-02-10",
    readTime: "6 min",
  },
  {
    id: "4",
    slug: "acoustic-panels-open-offices",
    title: "Solving the Open-Office Noise Problem with Acoustic Panels",
    excerpt:
      "Why slapping foam on walls doesn't work — and how engineered acoustic panels transform sound management into an architectural feature.",
    content:
      "Open-plan offices promised collaboration but delivered distraction. The average open office has reverberation times of 0.8-1.2 seconds — well above the recommended 0.4-0.6s for speech clarity. The solution isn't just sound absorption; it's strategic placement of materials that diffuse, absorb, and redirect sound. Slatted walnut panels with acoustic felt backing (NRC 0.85) excel at mid-to-high frequency absorption, making them ideal for meeting pods and focus zones. Hexagonal felt panels offer modular flexibility — you can target specific reflection points without covering entire walls. The key insight: acoustic treatment should be designed into the architecture, not applied as an afterthought. When done right, the same panels that solve your noise problem become your most photographed design feature.",
    category: "Design Tips",
    image:
      "https://images.unsplash.com/photo-1647697362146-3352eeddd458?w=800&h=500&fit=crop&q=80",
    author: "Ananya Krishnan",
    date: "2026-01-20",
    readTime: "8 min",
  },
];
