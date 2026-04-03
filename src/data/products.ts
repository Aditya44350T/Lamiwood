import type { Product } from "@/types";

export const products: Product[] = [
  {
    id: "1",
    slug: "natural-oak-flooring",
    name: "Natural Oak Flooring",
    category: "flooring",
    price: 450,
    unit: "per sq.ft",
    description:
      "Our Natural Oak Flooring brings the timeless warmth of European oak into your living spaces. Each plank is carefully selected for its distinctive grain patterns and natural color variations, creating a floor that tells a story. The multi-layer construction ensures dimensional stability, while the UV-cured oil finish enhances the wood's natural beauty and provides lasting protection against daily wear.",
    shortDescription:
      "Timeless European oak with distinctive grain patterns and a UV-cured oil finish.",
    images: [
      "https://images.unsplash.com/photo-1763392199096-6efd9d28d8cc?w=800&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1763392199096-6efd9d28d8cc?w=800&h=800&fit=crop&q=80",
      "https://images.unsplash.com/photo-1763392199096-6efd9d28d8cc?w=800&h=600&fit=crop&crop=entropy&q=80",
    ],
    thumbnail:
      "https://images.unsplash.com/photo-1763392199096-6efd9d28d8cc?w=800&h=600&fit=crop&q=80",
    badge: "bestseller",
    inStock: true,
    specs: [
      { label: "Material", value: "European Oak" },
      { label: "Dimensions", value: "190mm × 1900mm × 14mm" },
      { label: "Finish", value: "UV-Cured Natural Oil" },
      { label: "Installation", value: "Click-lock / Glue-down" },
      { label: "Warranty", value: "25 Years" },
    ],
    features: [
      "Multi-layer engineered construction for stability",
      "FSC-certified sustainable sourcing",
      "Compatible with underfloor heating",
      "Pre-finished for immediate installation",
    ],
    material: "European Oak",
    finish: "UV-Cured Natural Oil",
  },
  {
    id: "2",
    slug: "dark-walnut-flooring",
    name: "Dark Walnut Flooring",
    category: "flooring",
    price: 620,
    unit: "per sq.ft",
    description:
      "The Dark Walnut Flooring exudes sophistication with its rich, deep tones and flowing grain. Sourced from premium American walnut, each plank delivers the depth of color and character that only genuine hardwood can provide. A hand-rubbed matte finish creates a velvety surface that feels luxurious underfoot while concealing minor scratches and imperfections.",
    shortDescription:
      "Rich American walnut with hand-rubbed matte finish for ultimate sophistication.",
    images: [
      "https://images.unsplash.com/photo-1722650362305-44e25091cde3?w=800&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1722650362305-44e25091cde3?w=800&h=800&fit=crop&q=80",
      "https://images.unsplash.com/photo-1722650362305-44e25091cde3?w=800&h=600&fit=crop&crop=entropy&q=80",
    ],
    thumbnail:
      "https://images.unsplash.com/photo-1722650362305-44e25091cde3?w=800&h=600&fit=crop&q=80",
    badge: "premium",
    inStock: true,
    specs: [
      { label: "Material", value: "American Walnut" },
      { label: "Dimensions", value: "220mm × 2200mm × 15mm" },
      { label: "Finish", value: "Hand-Rubbed Matte" },
      { label: "Installation", value: "Glue-down" },
      { label: "Warranty", value: "30 Years" },
    ],
    features: [
      "Premium grade American walnut selection",
      "Hand-rubbed finish for a velvety feel",
      "Extra-wide planks for grand spaces",
      "Superior scratch resistance",
    ],
    material: "American Walnut",
    finish: "Hand-Rubbed Matte",
  },
  {
    id: "3",
    slug: "honey-maple-flooring",
    name: "Honey Maple Flooring",
    category: "flooring",
    price: 380,
    unit: "per sq.ft",
    description:
      "Honey Maple Flooring bathes your interiors in warm, golden light. The subtle grain of Canadian maple combined with our proprietary honey-tone stain creates a floor that brightens any space while maintaining a refined, contemporary aesthetic. Ideal for modern homes seeking warmth without heaviness.",
    shortDescription:
      "Warm golden tones of Canadian maple with a contemporary honey stain.",
    images: [
      "https://images.unsplash.com/photo-1727872496300-57e476478a54?w=800&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1727872496300-57e476478a54?w=800&h=800&fit=crop&q=80",
      "https://images.unsplash.com/photo-1727872496300-57e476478a54?w=800&h=600&fit=crop&crop=entropy&q=80",
    ],
    thumbnail:
      "https://images.unsplash.com/photo-1727872496300-57e476478a54?w=800&h=600&fit=crop&q=80",
    inStock: true,
    specs: [
      { label: "Material", value: "Canadian Maple" },
      { label: "Dimensions", value: "180mm × 1800mm × 14mm" },
      { label: "Finish", value: "Honey-Tone Lacquer" },
      { label: "Installation", value: "Click-lock / Floating" },
      { label: "Warranty", value: "20 Years" },
    ],
    features: [
      "Proprietary honey-tone stain formula",
      "High-density maple for durability",
      "Easy click-lock installation",
      "Brightens spaces naturally",
    ],
    material: "Canadian Maple",
    finish: "Honey-Tone Lacquer",
  },
  {
    id: "4",
    slug: "teak-wall-panel",
    name: "Teak Wall Panel",
    category: "wall-panels",
    price: 350,
    unit: "per sq.ft",
    description:
      "Our Teak Wall Panel transforms ordinary walls into statements of luxury. Reclaimed Burmese teak, with its signature golden-brown hue and natural oils, brings unparalleled warmth and texture to any interior. Each panel is handcrafted with precision-milled grooves that create a contemporary linear pattern while celebrating the wood's heritage.",
    shortDescription:
      "Reclaimed Burmese teak with precision-milled contemporary linear patterns.",
    images: [
      "https://images.unsplash.com/photo-1762978902169-e5789f7b56b8?w=800&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1762978902169-e5789f7b56b8?w=800&h=800&fit=crop&q=80",
      "https://images.unsplash.com/photo-1762978902169-e5789f7b56b8?w=800&h=600&fit=crop&crop=entropy&q=80",
    ],
    thumbnail:
      "https://images.unsplash.com/photo-1762978902169-e5789f7b56b8?w=800&h=600&fit=crop&q=80",
    badge: "new",
    inStock: true,
    specs: [
      { label: "Material", value: "Reclaimed Burmese Teak" },
      { label: "Dimensions", value: "300mm × 2400mm × 18mm" },
      { label: "Finish", value: "Natural Teak Oil" },
      { label: "Installation", value: "Adhesive / Hidden Clip" },
      { label: "Warranty", value: "15 Years" },
    ],
    features: [
      "Reclaimed wood — sustainable and characterful",
      "Natural teak oil for moisture resistance",
      "Precision CNC-milled groove pattern",
      "Suitable for both residential and commercial spaces",
    ],
    material: "Reclaimed Burmese Teak",
    finish: "Natural Teak Oil",
  },
  {
    id: "5",
    slug: "ash-white-wall-panel",
    name: "Ash White Wall Panel",
    category: "wall-panels",
    price: 280,
    unit: "per sq.ft",
    description:
      "The Ash White Wall Panel brings Scandinavian serenity to your interiors. European ash, bleached to a soft ivory tone, creates a light and airy backdrop that makes spaces feel larger and more open. The subtle grain texture adds depth without visual weight, perfect for minimalist and contemporary design schemes.",
    shortDescription:
      "Bleached European ash for a light, Scandinavian-inspired aesthetic.",
    images: [
      "https://images.unsplash.com/photo-1690268798033-ae52e4e57db6?w=800&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1690268798033-ae52e4e57db6?w=800&h=800&fit=crop&q=80",
      "https://images.unsplash.com/photo-1690268798033-ae52e4e57db6?w=800&h=600&fit=crop&crop=entropy&q=80",
    ],
    thumbnail:
      "https://images.unsplash.com/photo-1690268798033-ae52e4e57db6?w=800&h=600&fit=crop&q=80",
    inStock: true,
    specs: [
      { label: "Material", value: "European Ash" },
      { label: "Dimensions", value: "250mm × 2400mm × 12mm" },
      { label: "Finish", value: "Bleached Matte" },
      { label: "Installation", value: "Adhesive / Nail" },
      { label: "Warranty", value: "15 Years" },
    ],
    features: [
      "Bleached finish for a bright, open feel",
      "Lightweight yet structurally sound",
      "Pairs beautifully with any color palette",
      "Low-VOC finish for healthy interiors",
    ],
    material: "European Ash",
    finish: "Bleached Matte",
  },
  {
    id: "6",
    slug: "charred-cedar-wall-panel",
    name: "Charred Cedar Wall Panel",
    category: "wall-panels",
    price: 520,
    unit: "per sq.ft",
    description:
      "Inspired by the ancient Japanese art of Shou Sugi Ban, our Charred Cedar Wall Panel features genuine flame-charred western red cedar. The controlled burning process creates a dramatic black-to-charcoal surface with a distinctive alligator-skin texture that is both fire-resistant and naturally preserved against decay and insects.",
    shortDescription:
      "Shou Sugi Ban-inspired flame-charred cedar with dramatic texture.",
    images: [
      "https://images.unsplash.com/photo-1676126487789-5bfd6aa9f585?w=800&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1676126487789-5bfd6aa9f585?w=800&h=800&fit=crop&q=80",
      "https://images.unsplash.com/photo-1676126487789-5bfd6aa9f585?w=800&h=600&fit=crop&crop=entropy&q=80",
    ],
    thumbnail:
      "https://images.unsplash.com/photo-1676126487789-5bfd6aa9f585?w=800&h=600&fit=crop&q=80",
    badge: "premium",
    inStock: true,
    specs: [
      { label: "Material", value: "Western Red Cedar" },
      { label: "Dimensions", value: "200mm × 2400mm × 20mm" },
      { label: "Finish", value: "Charred / Shou Sugi Ban" },
      { label: "Installation", value: "Hidden Clip System" },
      { label: "Warranty", value: "20 Years" },
    ],
    features: [
      "Authentic Shou Sugi Ban flame treatment",
      "Naturally fire, rot, and insect resistant",
      "Each panel uniquely textured",
      "Striking visual impact for feature walls",
    ],
    material: "Western Red Cedar",
    finish: "Charred / Shou Sugi Ban",
  },
  {
    id: "7",
    slug: "ipe-brown-decking",
    name: "Ipê Brown Decking",
    category: "decking",
    price: 750,
    unit: "per sq.ft",
    description:
      "Ipê Brown Decking is the gold standard of outdoor surfaces. Brazilian Ipê, one of the hardest and most durable woods in the world, delivers unmatched longevity even in the harshest weather conditions. Its deep chocolate-brown color, fine grain, and natural oils make it resistant to moisture, UV, and insect damage without chemical treatments.",
    shortDescription:
      "Brazilian Ipê hardwood — the gold standard for outdoor decking.",
    images: [
      "https://images.unsplash.com/photo-1687671582187-d02e850494bc?w=800&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1687671582187-d02e850494bc?w=800&h=800&fit=crop&q=80",
      "https://images.unsplash.com/photo-1687671582187-d02e850494bc?w=800&h=600&fit=crop&crop=entropy&q=80",
    ],
    thumbnail:
      "https://images.unsplash.com/photo-1687671582187-d02e850494bc?w=800&h=600&fit=crop&q=80",
    badge: "bestseller",
    inStock: true,
    specs: [
      { label: "Material", value: "Brazilian Ipê" },
      { label: "Dimensions", value: "140mm × 2100mm × 21mm" },
      { label: "Finish", value: "Smooth / Grooved" },
      { label: "Installation", value: "Hidden Fastener" },
      { label: "Warranty", value: "35 Years" },
    ],
    features: [
      "Janka hardness rating of 3,680 lbf",
      "Naturally resistant to rot and insects",
      "Requires minimal maintenance",
      "Ages gracefully to silver patina if untreated",
    ],
    material: "Brazilian Ipê",
    finish: "Smooth / Grooved",
  },
  {
    id: "8",
    slug: "composite-grey-decking",
    name: "Composite Grey Decking",
    category: "decking",
    price: 340,
    unit: "per sq.ft",
    description:
      "Our Composite Grey Decking combines the beauty of wood with the performance of advanced composites. Made from recycled wood fibers and high-density polymers, it delivers a sophisticated slate-grey finish that never needs staining or sealing. The capped surface resists stains, scratches, and fading for decades of worry-free enjoyment.",
    shortDescription:
      "Eco-friendly composite with sophisticated slate-grey finish, zero maintenance.",
    images: [
      "https://images.unsplash.com/photo-1759238136859-b6fe007fe126?w=800&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1759238136859-b6fe007fe126?w=800&h=800&fit=crop&q=80",
      "https://images.unsplash.com/photo-1759238136859-b6fe007fe126?w=800&h=600&fit=crop&crop=entropy&q=80",
    ],
    thumbnail:
      "https://images.unsplash.com/photo-1759238136859-b6fe007fe126?w=800&h=600&fit=crop&q=80",
    inStock: true,
    specs: [
      { label: "Material", value: "Recycled Wood-Polymer Composite" },
      { label: "Dimensions", value: "138mm × 3600mm × 23mm" },
      { label: "Finish", value: "Capped Matte" },
      { label: "Installation", value: "Hidden Clip System" },
      { label: "Warranty", value: "25 Years Structural" },
    ],
    features: [
      "Made from 95% recycled materials",
      "Zero staining or sealing required",
      "Slip-resistant textured surface",
      "Colour-stable against UV fading",
    ],
    material: "Recycled Wood-Polymer Composite",
    finish: "Capped Matte",
  },
  {
    id: "9",
    slug: "bamboo-natural-decking",
    name: "Bamboo Natural Decking",
    category: "decking",
    price: 390,
    unit: "per sq.ft",
    description:
      "Bamboo Natural Decking offers exceptional sustainability without sacrificing performance. Strand-woven bamboo is compressed under extreme pressure to create a board harder than most hardwoods. Its warm honey tone and clean lines bring a contemporary tropical feel to outdoor living areas, balconies, and pool surrounds.",
    shortDescription:
      "Strand-woven bamboo — harder than hardwood, beautifully sustainable.",
    images: [
      "https://images.unsplash.com/photo-1546588793-7107a323d068?w=800&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1546588793-7107a323d068?w=800&h=800&fit=crop&q=80",
      "https://images.unsplash.com/photo-1546588793-7107a323d068?w=800&h=600&fit=crop&crop=entropy&q=80",
    ],
    thumbnail:
      "https://images.unsplash.com/photo-1546588793-7107a323d068?w=800&h=600&fit=crop&q=80",
    badge: "new",
    inStock: true,
    specs: [
      { label: "Material", value: "Strand-Woven Bamboo" },
      { label: "Dimensions", value: "140mm × 1850mm × 20mm" },
      { label: "Finish", value: "Thermal-Treated Natural" },
      { label: "Installation", value: "Hidden Fastener / Screw" },
      { label: "Warranty", value: "20 Years" },
    ],
    features: [
      "Harder than oak, teak, and Ipê",
      "Rapid-renewable bamboo — matures in 5 years",
      "Thermal treatment for enhanced durability",
      "Naturally antimicrobial surface",
    ],
    material: "Strand-Woven Bamboo",
    finish: "Thermal-Treated Natural",
  },
  {
    id: "10",
    slug: "pine-ceiling-panel",
    name: "Pine Ceiling Panel",
    category: "ceiling-panels",
    price: 220,
    unit: "per sq.ft",
    description:
      "The Pine Ceiling Panel adds rustic charm and architectural interest overhead. Kiln-dried Scandinavian pine with a gentle whitewash finish softens the natural knots and grain, creating a ceiling that is warm yet contemporary. The tongue-and-groove profile ensures seamless installation and a clean, continuous surface.",
    shortDescription:
      "Scandinavian pine with whitewash finish for rustic contemporary ceilings.",
    images: [
      "https://images.unsplash.com/photo-1675325152993-b3a5fa7f0356?w=800&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1675325152993-b3a5fa7f0356?w=800&h=800&fit=crop&q=80",
      "https://images.unsplash.com/photo-1675325152993-b3a5fa7f0356?w=800&h=600&fit=crop&crop=entropy&q=80",
    ],
    thumbnail:
      "https://images.unsplash.com/photo-1675325152993-b3a5fa7f0356?w=800&h=600&fit=crop&q=80",
    inStock: true,
    specs: [
      { label: "Material", value: "Scandinavian Pine" },
      { label: "Dimensions", value: "130mm × 3000mm × 14mm" },
      { label: "Finish", value: "Whitewash Oil" },
      { label: "Installation", value: "Tongue & Groove / Clip" },
      { label: "Warranty", value: "15 Years" },
    ],
    features: [
      "Kiln-dried for dimensional stability",
      "Tongue-and-groove for seamless joints",
      "Lightweight — easy ceiling installation",
      "Natural knots add authentic character",
    ],
    material: "Scandinavian Pine",
    finish: "Whitewash Oil",
  },
  {
    id: "11",
    slug: "oak-whitewash-ceiling-panel",
    name: "Oak Whitewash Ceiling Panel",
    category: "ceiling-panels",
    price: 310,
    unit: "per sq.ft",
    description:
      "Our Oak Whitewash Ceiling Panel brings refined elegance to the fifth wall of your room. Select-grade European oak, treated with a layered whitewash technique, reveals the grain's depth while maintaining a bright, luminous appearance. Perfect for living rooms, bedrooms, and hospitality spaces seeking a touch of understated grandeur.",
    shortDescription:
      "Select-grade European oak with layered whitewash for luminous ceilings.",
    images: [
      "https://images.unsplash.com/photo-1766445318570-1dc4bf3f5d79?w=800&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1766445318570-1dc4bf3f5d79?w=800&h=800&fit=crop&q=80",
      "https://images.unsplash.com/photo-1766445318570-1dc4bf3f5d79?w=800&h=600&fit=crop&crop=entropy&q=80",
    ],
    thumbnail:
      "https://images.unsplash.com/photo-1766445318570-1dc4bf3f5d79?w=800&h=600&fit=crop&q=80",
    badge: "new",
    inStock: true,
    specs: [
      { label: "Material", value: "European Oak" },
      { label: "Dimensions", value: "160mm × 2400mm × 15mm" },
      { label: "Finish", value: "Layered Whitewash" },
      { label: "Installation", value: "Hidden Clip System" },
      { label: "Warranty", value: "20 Years" },
    ],
    features: [
      "Multi-layered whitewash reveals grain depth",
      "Select grade — minimal knots",
      "Hidden clip system for clean appearance",
      "Compatible with integrated lighting channels",
    ],
    material: "European Oak",
    finish: "Layered Whitewash",
  },
  {
    id: "12",
    slug: "cedar-rustic-cladding",
    name: "Cedar Rustic Cladding",
    category: "cladding",
    price: 480,
    unit: "per sq.ft",
    description:
      "Cedar Rustic Cladding wraps your home in the natural beauty and proven performance of western red cedar. The rough-sawn texture and natural colour variation — from honey to amber to warm brown — create a facade that is both rugged and refined. Cedar's natural oils provide exceptional weather resistance, making it ideal for exterior applications.",
    shortDescription:
      "Rough-sawn western red cedar for naturally weather-resistant facades.",
    images: [
      "https://images.unsplash.com/photo-1722109997425-40f920848aed?w=800&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1722109997425-40f920848aed?w=800&h=800&fit=crop&q=80",
      "https://images.unsplash.com/photo-1722109997425-40f920848aed?w=800&h=600&fit=crop&crop=entropy&q=80",
    ],
    thumbnail:
      "https://images.unsplash.com/photo-1722109997425-40f920848aed?w=800&h=600&fit=crop&q=80",
    inStock: true,
    specs: [
      { label: "Material", value: "Western Red Cedar" },
      { label: "Dimensions", value: "180mm × 3600mm × 19mm" },
      { label: "Finish", value: "Rough-Sawn Natural" },
      { label: "Installation", value: "Horizontal / Vertical Nail" },
      { label: "Warranty", value: "20 Years" },
    ],
    features: [
      "Natural oils resist moisture and decay",
      "Rough-sawn texture for authentic character",
      "Beautiful natural colour variation",
      "Dimensionally stable in all climates",
    ],
    material: "Western Red Cedar",
    finish: "Rough-Sawn Natural",
  },
  {
    id: "13",
    slug: "thermowood-cladding",
    name: "Thermowood Cladding",
    category: "cladding",
    price: 560,
    unit: "per sq.ft",
    description:
      "Thermowood Cladding represents the pinnacle of thermally modified timber technology. Scandinavian pine, treated at temperatures exceeding 212°C, undergoes a permanent chemical transformation that dramatically improves dimensional stability, decay resistance, and thermal insulation — all without chemicals. The resulting rich brown tone and silky-smooth surface are maintenance-minimal and architecturally striking.",
    shortDescription:
      "Thermally modified Scandinavian pine — chemical-free, dimensionally stable.",
    images: [
      "https://images.unsplash.com/photo-1657487287603-e797597d0a3a?w=800&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1657487287603-e797597d0a3a?w=800&h=800&fit=crop&q=80",
      "https://images.unsplash.com/photo-1657487287603-e797597d0a3a?w=800&h=600&fit=crop&crop=entropy&q=80",
    ],
    thumbnail:
      "https://images.unsplash.com/photo-1657487287603-e797597d0a3a?w=800&h=600&fit=crop&q=80",
    badge: "premium",
    inStock: true,
    specs: [
      { label: "Material", value: "Thermally Modified Pine" },
      { label: "Dimensions", value: "140mm × 4200mm × 20mm" },
      { label: "Finish", value: "Smooth Thermal Brown" },
      { label: "Installation", value: "Rainscreen / Direct Fix" },
      { label: "Warranty", value: "25 Years" },
    ],
    features: [
      "Chemical-free thermal modification at 212°C+",
      "70% improved dimensional stability",
      "Class 1 durability rating",
      "Ideal for rainscreen cladding systems",
    ],
    material: "Thermally Modified Pine",
    finish: "Smooth Thermal Brown",
  },
  {
    id: "14",
    slug: "modern-oak-staircase",
    name: "Modern Oak Staircase Treads",
    category: "flooring",
    price: 8500,
    unit: "per piece",
    description:
      "Our Modern Oak Staircase Treads elevate every transition between levels into a design moment. Each tread is crafted from solid European oak with a floating-edge profile that creates a dramatic cantilever effect. The brushed and oiled finish enhances the grain's tactile quality while providing a non-slip surface for safe, stylish navigation.",
    shortDescription:
      "Solid European oak staircase treads with floating-edge cantilever profile.",
    images: [
      "https://images.unsplash.com/photo-1758801304964-417e328be877?w=800&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1758801304964-417e328be877?w=800&h=800&fit=crop&q=80",
      "https://images.unsplash.com/photo-1758801304964-417e328be877?w=800&h=600&fit=crop&crop=entropy&q=80",
    ],
    thumbnail:
      "https://images.unsplash.com/photo-1758801304964-417e328be877?w=800&h=600&fit=crop&q=80",
    badge: "bestseller",
    inStock: true,
    specs: [
      { label: "Material", value: "Solid European Oak" },
      { label: "Dimensions", value: "300mm × 1000mm × 40mm" },
      { label: "Finish", value: "Brushed & Oiled" },
      { label: "Installation", value: "Structural Mount" },
      { label: "Warranty", value: "Lifetime" },
    ],
    features: [
      "Solid oak — no laminations",
      "Floating-edge cantilever design",
      "Brushed surface for natural non-slip grip",
      "Custom lengths available on request",
    ],
    material: "Solid European Oak",
    finish: "Brushed & Oiled",
  },
  {
    id: "15",
    slug: "walnut-acoustic-panel",
    name: "Walnut Acoustic Panel",
    category: "acoustic-panels",
    price: 650,
    unit: "per sq.ft",
    description:
      "The Walnut Acoustic Panel marries sound science with material beauty. Precision-routed slats in American walnut create an elegant diffusion pattern that tames reverberation and echo while adding rich visual warmth. Behind the slats, a high-density acoustic felt absorbs mid-to-high frequencies, making these panels ideal for home theaters, studios, offices, and living rooms.",
    shortDescription:
      "American walnut slatted panel with acoustic felt for sound absorption.",
    images: [
      "https://images.unsplash.com/photo-1754380629457-b833f6bea68a?w=800&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1754380629457-b833f6bea68a?w=800&h=800&fit=crop&q=80",
      "https://images.unsplash.com/photo-1754380629457-b833f6bea68a?w=800&h=600&fit=crop&crop=entropy&q=80",
    ],
    thumbnail:
      "https://images.unsplash.com/photo-1754380629457-b833f6bea68a?w=800&h=600&fit=crop&q=80",
    badge: "new",
    inStock: true,
    specs: [
      { label: "Material", value: "American Walnut + Acoustic Felt" },
      { label: "Dimensions", value: "600mm × 2400mm × 22mm" },
      { label: "Finish", value: "Clear Satin Lacquer" },
      { label: "NRC Rating", value: "0.85" },
      { label: "Installation", value: "Adhesive / Z-Clip" },
      { label: "Warranty", value: "10 Years" },
    ],
    features: [
      "NRC 0.85 — excellent sound absorption",
      "Precision CNC-routed walnut slats",
      "High-density recycled PET acoustic felt",
      "Class A fire rating available",
    ],
    material: "American Walnut + Acoustic Felt",
    finish: "Clear Satin Lacquer",
  },
  {
    id: "16",
    slug: "felt-grey-acoustic-panel",
    name: "Felt Grey Acoustic Panel",
    category: "acoustic-panels",
    price: 420,
    unit: "per sq.ft",
    description:
      "Our Felt Grey Acoustic Panel offers a modern, textile-forward approach to sound management. Compressed recycled PET felt in a sophisticated heathered grey creates a soft, tactile wall surface that absorbs sound across a wide frequency range. The modular hexagonal format allows creative, customizable installations that serve as both functional acoustic treatment and contemporary wall art.",
    shortDescription:
      "Recycled PET felt hexagonal panels — modular acoustic art for modern spaces.",
    images: [
      "https://images.unsplash.com/photo-1582135739786-3bceafcaea85?w=800&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1582135739786-3bceafcaea85?w=800&h=800&fit=crop&q=80",
      "https://images.unsplash.com/photo-1582135739786-3bceafcaea85?w=800&h=600&fit=crop&crop=entropy&q=80",
    ],
    thumbnail:
      "https://images.unsplash.com/photo-1582135739786-3bceafcaea85?w=800&h=600&fit=crop&q=80",
    inStock: true,
    specs: [
      { label: "Material", value: "Compressed Recycled PET Felt" },
      { label: "Dimensions", value: "400mm hex × 12mm" },
      { label: "Finish", value: "Heathered Grey" },
      { label: "NRC Rating", value: "0.75" },
      { label: "Installation", value: "Adhesive Peel & Stick" },
      { label: "Warranty", value: "10 Years" },
    ],
    features: [
      "100% recycled PET material",
      "Modular hexagonal format",
      "Easy peel-and-stick installation",
      "Available in 12 color options",
    ],
    material: "Compressed Recycled PET Felt",
    finish: "Heathered Grey",
  },
];
