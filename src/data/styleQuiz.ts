export interface QuizQuestion {
  id: number;
  question: string;
  optionA: { label: string; image: string; tags: string[] };
  optionB: { label: string; image: string; tags: string[] };
}

export const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: "Which space feels more like you?",
    optionA: {
      label: "Warm & Natural",
      image: "https://images.unsplash.com/photo-1763392199096-6efd9d28d8cc?w=600&h=400&fit=crop&q=80",
      tags: ["warm", "natural", "oak", "teak"],
    },
    optionB: {
      label: "Cool & Minimal",
      image: "https://images.unsplash.com/photo-1690268798033-ae52e4e57db6?w=600&h=400&fit=crop&q=80",
      tags: ["cool", "minimal", "ash", "grey"],
    },
  },
  {
    id: 2,
    question: "What's your tone preference?",
    optionA: {
      label: "Rich & Dark",
      image: "https://images.unsplash.com/photo-1722650362305-44e25091cde3?w=600&h=400&fit=crop&q=80",
      tags: ["dark", "walnut", "charred", "dramatic"],
    },
    optionB: {
      label: "Light & Airy",
      image: "https://images.unsplash.com/photo-1727872496300-57e476478a54?w=600&h=400&fit=crop&q=80",
      tags: ["light", "bleached", "pine", "bamboo"],
    },
  },
  {
    id: 3,
    question: "How do you feel about texture?",
    optionA: {
      label: "Tactile & Rustic",
      image: "https://images.unsplash.com/photo-1676126487789-5bfd6aa9f585?w=600&h=400&fit=crop&q=80",
      tags: ["textured", "rustic", "reclaimed", "rough"],
    },
    optionB: {
      label: "Smooth & Refined",
      image: "https://images.unsplash.com/photo-1762978902169-e5789f7b56b8?w=600&h=400&fit=crop&q=80",
      tags: ["smooth", "refined", "lacquer", "satin"],
    },
  },
  {
    id: 4,
    question: "Where's the main project?",
    optionA: {
      label: "Indoor Living",
      image: "https://images.unsplash.com/photo-1722604828977-395d52c3cd23?w=600&h=400&fit=crop&q=80",
      tags: ["indoor", "flooring", "wall-panels", "acoustic"],
    },
    optionB: {
      label: "Outdoor & Exterior",
      image: "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=600&h=400&fit=crop&q=80",
      tags: ["outdoor", "decking", "cladding", "weather"],
    },
  },
  {
    id: 5,
    question: "What matters most?",
    optionA: {
      label: "Eco-Friendly & Sustainable",
      image: "https://images.unsplash.com/photo-1546588793-7107a323d068?w=600&h=400&fit=crop&q=80",
      tags: ["sustainable", "fsc", "recycled", "bamboo"],
    },
    optionB: {
      label: "Luxury & Premium",
      image: "https://images.unsplash.com/photo-1687671582187-d02e850494bc?w=600&h=400&fit=crop&q=80",
      tags: ["premium", "luxury", "walnut", "ipe"],
    },
  },
];
