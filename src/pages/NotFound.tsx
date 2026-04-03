import { useEffect } from "react";
import Button from "@/components/ui/Button";
import PageTransition from "@/components/shared/PageTransition";

export default function NotFound() {
  useEffect(() => {
    document.title = "Page Not Found | Lamiwood";
  }, []);

  return (
    <PageTransition>
      <div className="min-h-screen flex items-center justify-center bg-cream px-4">
        <div className="text-center">
          <p className="text-gold text-sm font-medium tracking-[0.3em] uppercase mb-4">
            Error 404
          </p>
          <h1 className="font-serif text-6xl md:text-8xl text-charcoal mb-4">
            404
          </h1>
          <p className="text-charcoal-light text-lg mb-8 max-w-md mx-auto">
            The page you&rsquo;re looking for doesn&rsquo;t exist or has been moved.
          </p>
          <Button href="/" size="lg">
            Return Home
          </Button>
        </div>
      </div>
    </PageTransition>
  );
}
