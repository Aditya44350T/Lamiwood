import { useState, useRef, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { EASE_LUXURY } from "@/lib/animations";
import ImageWithFallback from "@/components/ui/ImageWithFallback";

interface ProductGalleryProps {
  images: string[];
  name: string;
}

export default function ProductGallery({ images, name }: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [zooming, setZooming] = useState(false);
  const [lensPos, setLensPos] = useState({ x: 50, y: 50 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setLensPos({
      x: Math.max(0, Math.min(100, x)),
      y: Math.max(0, Math.min(100, y)),
    });
  }, []);

  const zoomSrc = images[activeIndex]
    ?.replace("w=800", "w=1600")
    .replace("h=600", "h=1200")
    .replace("h=800", "h=1600");

  return (
    <div className="flex flex-col">
      <div className="flex gap-4">
        {/* Thumbnails — vertical strip on left (desktop) */}
        {images.length > 1 && (
          <div className="hidden md:flex flex-col gap-2 shrink-0">
            {images.map((img, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                onMouseEnter={() => setActiveIndex(i)}
                className={`w-16 h-16 overflow-hidden border-2 transition-colors cursor-pointer ${
                  i === activeIndex
                    ? "border-gold"
                    : "border-transparent hover:border-beige dark:hover:border-white/30"
                }`}
              >
                <ImageWithFallback
                  src={img}
                  alt={`${name} thumbnail ${i + 1}`}
                  className="w-full h-full"
                />
              </button>
            ))}
          </div>
        )}

        {/* Main image with cursor-aware zoom */}
        <div className="relative flex-1">
          <div
            ref={containerRef}
            className="relative aspect-[4/3] overflow-hidden bg-cream-dark dark:bg-[#1a1a1a] cursor-crosshair"
            onMouseEnter={() => setZooming(true)}
            onMouseLeave={() => setZooming(false)}
            onMouseMove={handleMouseMove}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3, ease: EASE_LUXURY }}
                className="absolute inset-0"
              >
                {/* Cursor-aware subtle zoom — transformOrigin follows mouse */}
                <motion.div
                  className="w-full h-full"
                  animate={{
                    scale: zooming ? 1.08 : 1,
                  }}
                  style={{
                    transformOrigin: `${lensPos.x}% ${lensPos.y}%`,
                  }}
                  transition={{ duration: 0.4, ease: EASE_LUXURY }}
                >
                  <ImageWithFallback
                    src={images[activeIndex]}
                    alt={`${name} — image ${activeIndex + 1}`}
                    className="w-full h-full"
                  />
                </motion.div>
              </motion.div>
            </AnimatePresence>

            {/* Zoom hint */}
            <AnimatePresence>
              {!zooming && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-3 right-3 w-8 h-8 bg-white/80 dark:bg-black/50 rounded-full flex items-center justify-center"
                >
                  <svg
                    className="w-4 h-4 text-charcoal"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM10.5 7.5v6m3-3h-6"
                    />
                  </svg>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Zoomed preview panel with smooth entry */}
          <AnimatePresence>
            {zooming && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.25, ease: EASE_LUXURY }}
                className="hidden md:block absolute left-[calc(100%+16px)] top-0 bottom-0 aspect-[4/3] border border-beige dark:border-white/10 bg-cream-dark dark:bg-[#1a1a1a] overflow-hidden z-30 shadow-lg"
                style={{ height: "100%" }}
              >
                <img
                  src={zoomSrc}
                  alt=""
                  className="absolute max-w-none"
                  style={{
                    width: "250%",
                    height: "250%",
                    left: `${-lensPos.x * 2.5 + 50}%`,
                    top: `${-lensPos.y * 2.5 + 50}%`,
                  }}
                  draggable={false}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Thumbnails — horizontal strip (mobile only) */}
      {images.length > 1 && (
        <div className="flex md:hidden gap-3 mt-4">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={`w-20 h-20 overflow-hidden border-2 transition-colors cursor-pointer ${
                i === activeIndex
                  ? "border-gold"
                  : "border-transparent hover:border-beige dark:hover:border-white/30"
              }`}
            >
              <ImageWithFallback
                src={img}
                alt={`${name} thumbnail ${i + 1}`}
                className="w-full h-full"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
