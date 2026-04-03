import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { cn } from "@/lib/utils";
import { EASE_LUXURY } from "@/lib/animations";

const images = [
  "https://images.unsplash.com/photo-1631396328075-9c65a7406f09?w=800&h=500&fit=crop&q=80",
  "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=500&fit=crop&q=80",
  "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&h=500&fit=crop&q=80",
  "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&h=500&fit=crop&q=80",
];

export default function ShowroomGallery() {
  const [active, setActive] = useState(0);

  return (
    <section className="py-20 md:py-28 bg-[#2C2C2C] dark:bg-[#1a1a1a]">
      <Container>
        <SectionHeading
          title="Visit Our Showroom"
          subtitle="Experience our surfaces in person at the Lamiwood Design Studio, Mumbai."
          className="[&_h2]:text-white [&_p]:text-white/60"
        />

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-6">
          {/* Main image */}
          <div className="relative aspect-[16/9] overflow-hidden bg-black/20 rounded-sm">
            <AnimatePresence mode="wait">
              <motion.img
                key={active}
                src={images[active]}
                alt={`Showroom view ${active + 1}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, ease: EASE_LUXURY }}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </AnimatePresence>
          </div>

          {/* Thumbnails */}
          <div className="flex lg:flex-col gap-3 overflow-x-auto lg:overflow-y-auto">
            {images.map((img, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={cn(
                  "shrink-0 w-20 h-14 lg:w-full lg:h-[72px] overflow-hidden cursor-pointer border-2 transition-all",
                  i === active
                    ? "border-gold opacity-100"
                    : "border-transparent opacity-60 hover:opacity-100",
                )}
              >
                <img
                  src={img}
                  alt={`Showroom thumbnail ${i + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Info bar */}
        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-8">
          <div>
            <p className="text-white font-medium">Lamiwood Design Studio</p>
            <p className="text-white/60 text-sm mt-1">
              Lower Parel, Mumbai &middot; Mon–Sat, 10AM – 7PM
            </p>
          </div>
          <a
            href="tel:+919876543210"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-gold text-white text-sm font-medium tracking-wide hover:bg-gold-light transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
            </svg>
            Schedule a Visit
          </a>
        </div>
      </Container>
    </section>
  );
}
