export interface Project {
  id: string;
  slug: string;
  title: string;
  category: "residential" | "commercial" | "hospitality";
  location: string;
  description: string;
  image: string;
  gallery: string[];
  productsUsed: string[];
  area: string;
  year: string;
}

export const projects: Project[] = [
  {
    id: "1",
    slug: "sea-facing-penthouse-mumbai",
    title: "Sea-Facing Penthouse",
    category: "residential",
    location: "Worli, Mumbai",
    description:
      "A 4,200 sq.ft penthouse transformed with Natural Oak Flooring throughout and Charred Cedar Wall Panels as feature walls. The warm oak tones balance the cool sea breeze while the Shou Sugi Ban panels create dramatic focal points in the living and dining areas.",
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=600&fit=crop&q=80",
    ],
    productsUsed: ["Natural Oak Flooring", "Charred Cedar Wall Panel"],
    area: "4,200 sq.ft",
    year: "2024",
  },
  {
    id: "2",
    slug: "nexus-coworks-bangalore",
    title: "Nexus Coworking Hub",
    category: "commercial",
    location: "Koramangala, Bangalore",
    description:
      "A 12,000 sq.ft open-plan office featuring Walnut Acoustic Panels in meeting pods and Felt Grey Acoustic Panels across the open workspace. The acoustic treatment reduced ambient noise by 60% while adding architectural character to every zone.",
    image:
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&h=600&fit=crop&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop&q=80",
    ],
    productsUsed: ["Walnut Acoustic Panel", "Felt Grey Acoustic Panel"],
    area: "12,000 sq.ft",
    year: "2024",
  },
  {
    id: "3",
    slug: "horizon-resort-goa",
    title: "Horizon Beach Resort",
    category: "hospitality",
    location: "Ashwem, Goa",
    description:
      "A boutique 40-key resort where Ipê Brown Decking connects guest villas to the oceanfront pool area, and Teak Wall Panels line the spa interiors. Three monsoon seasons in, every surface looks as pristine as installation day.",
    image:
      "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=800&h=600&fit=crop&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=800&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=600&fit=crop&q=80",
    ],
    productsUsed: ["Ipê Brown Decking", "Teak Wall Panel"],
    area: "8,500 sq.ft",
    year: "2023",
  },
  {
    id: "4",
    slug: "forma-studio-delhi",
    title: "Studio Forma Headquarters",
    category: "commercial",
    location: "Hauz Khas, New Delhi",
    description:
      "An award-winning design studio wrapped in Thermowood Cladding on the exterior and Pine Ceiling Panels overhead. The thermal-modified facade weathers beautifully while the pine ceilings create a warm, creative atmosphere for the 50-person team.",
    image:
      "https://images.unsplash.com/photo-1657487287603-e797597d0a3a?w=800&h=600&fit=crop&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1657487287603-e797597d0a3a?w=800&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1675325152993-b3a5fa7f0356?w=800&h=600&fit=crop&q=80",
    ],
    productsUsed: ["Thermowood Cladding", "Pine Ceiling Panel"],
    area: "6,800 sq.ft",
    year: "2023",
  },
  {
    id: "5",
    slug: "lakeside-villa-udaipur",
    title: "Lakeside Heritage Villa",
    category: "residential",
    location: "Fateh Sagar, Udaipur",
    description:
      "A heritage villa renovation blending traditional Rajasthani architecture with modern materials. Dark Walnut Flooring throughout the ground floor and Modern Oak Staircase Treads create a seamless transition between old-world charm and contemporary luxury.",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&h=600&fit=crop&q=80",
    ],
    productsUsed: ["Dark Walnut Flooring", "Modern Oak Staircase Treads"],
    area: "5,400 sq.ft",
    year: "2024",
  },
  {
    id: "6",
    slug: "taj-restaurant-chennai",
    title: "The Fig & Cedar Restaurant",
    category: "hospitality",
    location: "Anna Nagar, Chennai",
    description:
      "A 3,200 sq.ft fine-dining restaurant featuring Cedar Rustic Cladding as an accent wall behind the open kitchen and Oak Whitewash Ceiling Panels creating an intimate canopy over the dining area. The natural materials ground the space while elevating the dining experience.",
    image:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=600&fit=crop&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&h=600&fit=crop&q=80",
    ],
    productsUsed: ["Cedar Rustic Cladding", "Oak Whitewash Ceiling Panel"],
    area: "3,200 sq.ft",
    year: "2025",
  },
];
