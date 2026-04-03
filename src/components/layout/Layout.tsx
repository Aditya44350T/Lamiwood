import { Outlet } from "react-router-dom";
import { motion, useScroll, useSpring } from "framer-motion";
import Header from "./Header";
import Footer from "./Footer";
import ScrollToTop from "./ScrollToTop";
import QuickViewModal from "@/components/shared/QuickViewModal";
import WhatsAppButton from "@/components/shared/WhatsAppButton";
import CallbackButton from "@/components/shared/CallbackButton";
import { OrganizationJsonLd } from "@/components/shared/ProductJsonLd";
import { usePageView } from "@/hooks/useAnalytics";

function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] bg-gold z-[60] origin-left"
      style={{ scaleX }}
    />
  );
}

export default function Layout() {
  usePageView();

  return (
    <>
      <a href="#main-content" className="skip-to-content">
        Skip to content
      </a>
      <ScrollToTop />
      <ScrollProgressBar />
      <Header />
      <main id="main-content" className="min-h-screen" role="main">
        <Outlet />
      </main>
      <Footer />
      <QuickViewModal />
      <WhatsAppButton />
      <CallbackButton />
      <OrganizationJsonLd />
    </>
  );
}
