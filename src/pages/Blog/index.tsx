import { useEffect } from "react";
import { Link } from "react-router-dom";
import { blogPosts } from "@/data/blog";
import Container from "@/components/ui/Container";
import Breadcrumb from "@/components/ui/Breadcrumb";
import SectionHeading from "@/components/ui/SectionHeading";
import PageTransition from "@/components/shared/PageTransition";
import AnimatedSection from "@/components/shared/AnimatedSection";
import ImageWithFallback from "@/components/ui/ImageWithFallback";

export default function Blog() {
  useEffect(() => {
    document.title = "Design Inspiration | Lamiwood";
  }, []);

  return (
    <PageTransition>
      <div className="pb-20 bg-cream min-h-screen" style={{ paddingTop: "var(--header-height)" }}>
        <Container>
          <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Blog" }]} />
          <SectionHeading
            title="Design Inspiration"
            subtitle="Insights, trends, and stories from the world of premium surfaces."
            className="mt-4"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {blogPosts.map((post, i) => (
              <AnimatedSection key={post.id} delay={i * 0.1}>
                <Link to={`/blog/${post.slug}`} className="group block bg-white dark:bg-[#1E1E1E] hover:shadow-lg transition-shadow">
                  <div className="aspect-[16/9] overflow-hidden">
                    <div className="w-full h-full transition-transform duration-500 group-hover:scale-105">
                      <ImageWithFallback src={post.image} alt={post.title} className="w-full h-full" />
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-3 text-xs text-charcoal-light mb-3">
                      <span className="text-gold font-medium uppercase tracking-wider">{post.category}</span>
                      <span>&middot;</span>
                      <span>{post.readTime} read</span>
                      <span>&middot;</span>
                      <span>{new Date(post.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</span>
                    </div>
                    <h3 className="font-serif text-xl text-charcoal group-hover:text-gold transition-colors mb-2 leading-snug">
                      {post.title}
                    </h3>
                    <p className="text-sm text-charcoal-light leading-relaxed line-clamp-2">
                      {post.excerpt}
                    </p>
                    <p className="text-xs text-charcoal-light mt-4">
                      By {post.author}
                    </p>
                  </div>
                </Link>
              </AnimatedSection>
            ))}
          </div>
        </Container>
      </div>
    </PageTransition>
  );
}
