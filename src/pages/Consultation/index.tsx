import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Container from "@/components/ui/Container";
import Breadcrumb from "@/components/ui/Breadcrumb";
import Button from "@/components/ui/Button";
import PageTransition from "@/components/shared/PageTransition";
import AnimatedSection from "@/components/shared/AnimatedSection";
import ProductCard from "@/components/shared/ProductCard";
import { quizQuestions } from "@/data/styleQuiz";
import { products } from "@/data/products";
import { getRecommendations } from "@/lib/styleMatching";
import { EASE_LUXURY, SPRING_GENTLE } from "@/lib/animations";

type Step = "intro" | "quiz" | "results" | "booking";

export default function Consultation() {
  useEffect(() => {
    document.title = "Design Consultation | Lamiwood";
  }, []);

  const [step, setStep] = useState<Step>("intro");
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [booked, setBooked] = useState(false);

  const handleChoice = (tags: string[]) => {
    const newTags = [...selectedTags, ...tags];
    setSelectedTags(newTags);

    if (questionIndex < quizQuestions.length - 1) {
      setQuestionIndex((i) => i + 1);
    } else {
      setStep("results");
    }
  };

  const recommendations = getRecommendations(products, selectedTags, 4);

  const handleBookSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setBooked(true);
  };

  const inputClass =
    "w-full px-4 py-3 text-sm border border-beige bg-white dark:bg-[#1E1E1E] text-charcoal placeholder:text-charcoal-light/40 focus:border-gold focus:outline-none transition-colors";

  return (
    <PageTransition>
      {/* Hero */}
      <section
        className="relative pb-16 md:pb-20 bg-gradient-to-br from-[#2C2C2C] to-[#4A4A4A] overflow-hidden"
        style={{ paddingTop: "calc(var(--header-height) + 2rem)" }}
      >
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_30%_50%,rgba(184,134,11,0.4),transparent_60%)]" />
        <Container className="relative z-10">
          <Breadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "Design Consultation" },
            ]}
            light
          />
          <AnimatedSection>
            <h1 className="font-serif text-3xl md:text-5xl text-white mt-2 mb-3">
              Find Your Perfect Surface
            </h1>
            <p className="text-white/70 text-base md:text-lg max-w-xl">
              Take our 30-second style quiz and get personalized product
              recommendations — then book a free consultation with our design
              team.
            </p>
          </AnimatedSection>
        </Container>
      </section>

      <section className="py-12 md:py-16 bg-cream min-h-[50vh]">
        <Container size="narrow">
          <AnimatePresence mode="wait">
            {/* Intro */}
            {step === "intro" && (
              <motion.div
                key="intro"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={SPRING_GENTLE}
                className="text-center py-12"
              >
                <div className="text-6xl mb-6">🎨</div>
                <h2 className="font-serif text-3xl text-charcoal mb-4">
                  5 Quick Questions
                </h2>
                <p className="text-charcoal-light max-w-md mx-auto mb-8">
                  Tell us your style preferences and we&rsquo;ll match you with
                  the perfect Lamiwood surfaces for your space.
                </p>
                <Button size="lg" onClick={() => setStep("quiz")}>
                  Start Style Quiz
                </Button>
              </motion.div>
            )}

            {/* Quiz */}
            {step === "quiz" && (
              <motion.div
                key={`quiz-${questionIndex}`}
                initial={{ opacity: 0, x: 60 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -60 }}
                transition={{ duration: 0.4, ease: EASE_LUXURY }}
              >
                {/* Progress */}
                <div className="flex gap-1 mb-8">
                  {quizQuestions.map((_, i) => (
                    <div
                      key={i}
                      className={`h-1 flex-1 rounded-full transition-colors duration-300 ${
                        i <= questionIndex ? "bg-gold" : "bg-beige"
                      }`}
                    />
                  ))}
                </div>

                <p className="text-xs text-charcoal-light uppercase tracking-wider mb-2">
                  Question {questionIndex + 1} of {quizQuestions.length}
                </p>
                <h2 className="font-serif text-2xl md:text-3xl text-charcoal mb-8">
                  {quizQuestions[questionIndex].question}
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {(["optionA", "optionB"] as const).map((key) => {
                    const opt = quizQuestions[questionIndex][key];
                    return (
                      <motion.button
                        key={key}
                        onClick={() => handleChoice(opt.tags)}
                        className="group relative aspect-[3/2] overflow-hidden cursor-pointer rounded-sm"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <img
                          src={opt.image}
                          alt={opt.label}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                        <div className="absolute bottom-0 left-0 right-0 p-5">
                          <span className="text-white font-serif text-xl">
                            {opt.label}
                          </span>
                        </div>
                      </motion.button>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* Results */}
            {step === "results" && (
              <motion.div
                key="results"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={SPRING_GENTLE}
              >
                <div className="text-center mb-10">
                  <div className="text-5xl mb-4">✨</div>
                  <h2 className="font-serif text-3xl text-charcoal mb-3">
                    Your Style Palette
                  </h2>
                  <p className="text-charcoal-light max-w-md mx-auto">
                    Based on your preferences, here are the Lamiwood surfaces
                    we think you&rsquo;ll love.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                  {recommendations.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>

                <div className="text-center">
                  <Button size="lg" onClick={() => setStep("booking")}>
                    Book Free Consultation
                  </Button>
                  <button
                    onClick={() => {
                      setStep("quiz");
                      setQuestionIndex(0);
                      setSelectedTags([]);
                    }}
                    className="block mx-auto mt-4 text-sm text-charcoal-light hover:text-gold transition-colors cursor-pointer"
                  >
                    Retake quiz
                  </button>
                </div>
              </motion.div>
            )}

            {/* Booking */}
            {step === "booking" && (
              <motion.div
                key="booking"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={SPRING_GENTLE}
              >
                {booked ? (
                  <div className="text-center py-16">
                    <div className="text-gold mb-4">
                      <svg
                        className="w-16 h-16 mx-auto"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <h2 className="font-serif text-3xl text-charcoal mb-3">
                      Consultation Booked!
                    </h2>
                    <p className="text-charcoal-light max-w-md mx-auto mb-8">
                      Our design team will reach out within 24 hours with your
                      personalized surface palette and availability.
                    </p>
                    <Button href="/">Return Home</Button>
                  </div>
                ) : (
                  <>
                    <h2 className="font-serif text-2xl text-charcoal mb-2">
                      Book Your Free Consultation
                    </h2>
                    <p className="text-charcoal-light text-sm mb-8">
                      Your style palette ({recommendations.length} products)
                      will be shared with our design consultant.
                    </p>

                    {/* Mini palette preview */}
                    <div className="flex gap-2 mb-8">
                      {recommendations.map((p) => (
                        <div
                          key={p.id}
                          className="w-16 h-16 overflow-hidden rounded-sm border border-beige"
                        >
                          <img
                            src={p.thumbnail}
                            alt={p.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ))}
                    </div>

                    <form
                      onSubmit={handleBookSubmit}
                      className="space-y-4 max-w-lg"
                    >
                      <div className="grid grid-cols-2 gap-4">
                        <input
                          type="text"
                          required
                          placeholder="Full name"
                          className={inputClass}
                        />
                        <input
                          type="tel"
                          required
                          placeholder="Phone number"
                          className={inputClass}
                        />
                      </div>
                      <input
                        type="email"
                        required
                        placeholder="Email address"
                        className={inputClass}
                      />
                      <select className={`${inputClass} cursor-pointer`}>
                        <option value="">Preferred time</option>
                        <option value="morning">
                          Morning (10AM – 12PM)
                        </option>
                        <option value="afternoon">
                          Afternoon (12PM – 4PM)
                        </option>
                        <option value="evening">
                          Evening (4PM – 7PM)
                        </option>
                      </select>
                      <textarea
                        rows={3}
                        placeholder="Tell us about your project (optional)"
                        className={`${inputClass} resize-none`}
                      />
                      <Button type="submit" size="lg" className="w-full">
                        Confirm Booking
                      </Button>
                    </form>
                  </>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </Container>
      </section>
    </PageTransition>
  );
}
