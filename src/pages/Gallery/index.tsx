import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { projects, type Project } from "@/data/projects";
import Container from "@/components/ui/Container";
import Breadcrumb from "@/components/ui/Breadcrumb";
import SectionHeading from "@/components/ui/SectionHeading";
import PageTransition from "@/components/shared/PageTransition";
import ImageWithFallback from "@/components/ui/ImageWithFallback";
import {
  SPRING_GENTLE,
  STAGGER_FAST,
  EASE_LUXURY,
} from "@/lib/animations";

const filters: { label: string; value: Project["category"] | "all" }[] = [
  { label: "All", value: "all" },
  { label: "Residential", value: "residential" },
  { label: "Commercial", value: "commercial" },
  { label: "Hospitality", value: "hospitality" },
];

export default function Gallery() {
  const [active, setActive] = useState<Project["category"] | "all">("all");
  const [expanded, setExpanded] = useState<string | null>(null);

  useEffect(() => {
    document.title = "Project Gallery | Lamiwood";
  }, []);

  const filtered = useMemo(
    () =>
      active === "all"
        ? projects
        : projects.filter((p) => p.category === active),
    [active],
  );

  return (
    <PageTransition>
      <div className="pb-20 bg-cream min-h-screen" style={{ paddingTop: "var(--header-height)" }}>
        <Container>
          <Breadcrumb
            items={[{ label: "Home", href: "/" }, { label: "Projects" }]}
          />
          <SectionHeading
            title="Project Gallery"
            subtitle="Explore how Lamiwood surfaces transform spaces across India."
            className="mt-4"
          />

          {/* Filter tabs with active indicator */}
          <div className="flex flex-wrap gap-2 justify-center mb-12">
            {filters.map((f) => (
              <button
                key={f.value}
                onClick={() => {
                  setActive(f.value);
                  setExpanded(null);
                }}
                className="relative px-5 py-2 text-sm font-medium tracking-wide transition-colors cursor-pointer"
              >
                {/* Active background indicator */}
                {active === f.value && (
                  <motion.span
                    layoutId="gallery-filter-bg"
                    className="absolute inset-0 bg-gold"
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 30,
                    }}
                  />
                )}
                <span
                  className={`relative z-10 ${active === f.value ? "text-white" : "text-charcoal-light hover:text-charcoal"}`}
                >
                  {f.label}
                </span>
              </button>
            ))}
          </div>

          {/* Projects grid with layout animations */}
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-8"
            >
              {filtered.map((project, i) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    y: 0,
                    transition: {
                      ...SPRING_GENTLE,
                      delay: Math.min(i * STAGGER_FAST, 0.4),
                    },
                  }}
                  layout
                >
                  <div className="bg-white dark:bg-[#1E1E1E] overflow-hidden group">
                    <div className="aspect-[3/2] overflow-hidden">
                      <div className="w-full h-full transition-transform duration-500 group-hover:scale-105">
                        <ImageWithFallback
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full"
                        />
                      </div>
                    </div>
                    <div className="p-6">
                      <span className="text-xs uppercase tracking-wider text-gold font-medium">
                        {project.category} &middot; {project.year}
                      </span>
                      <h3 className="font-serif text-2xl text-charcoal mt-1 mb-2">
                        {project.title}
                      </h3>
                      <p className="text-sm text-charcoal-light mb-3">
                        {project.location} &middot; {project.area}
                      </p>

                      <motion.div
                        initial={false}
                        animate={{
                          height: expanded === project.id ? "auto" : 0,
                          opacity: expanded === project.id ? 1 : 0,
                        }}
                        transition={{ duration: 0.4, ease: EASE_LUXURY }}
                        className="overflow-hidden"
                      >
                        <p className="text-sm text-charcoal-light leading-relaxed mb-4">
                          {project.description}
                        </p>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {project.productsUsed.map((p) => (
                            <span
                              key={p}
                              className="text-xs bg-beige dark:bg-white/10 px-2 py-1 text-charcoal-light"
                            >
                              {p}
                            </span>
                          ))}
                        </div>
                      </motion.div>

                      <button
                        onClick={() =>
                          setExpanded(
                            expanded === project.id ? null : project.id,
                          )
                        }
                        className="text-sm text-gold font-medium hover:text-gold-light transition-colors cursor-pointer"
                      >
                        {expanded === project.id ? "Show less" : "Read more"}{" "}
                        &rarr;
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </Container>
      </div>
    </PageTransition>
  );
}
