import { Link } from "react-router-dom";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import AnimatedSection from "@/components/shared/AnimatedSection";
import ImageWithFallback from "@/components/ui/ImageWithFallback";
import { blogPosts } from "@/data/blog";

const latestPosts = blogPosts.slice(0, 3);

export default function BlogPreview() {
  return (
    <section className="py-20 md:py-28 bg-cream">
      <Container>
        <SectionHeading
          title="Design Inspiration"
          subtitle="Insights, trends, and guides from the world of premium surfaces."
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {latestPosts.map((post, i) => (
            <AnimatedSection key={post.id} delay={i * 0.1}>
              <Link
                to={`/blog/${post.slug}`}
                className="group block bg-white dark:bg-[#1E1E1E] hover:shadow-lg transition-shadow"
              >
                <div className="aspect-[16/9] overflow-hidden">
                  <div className="w-full h-full transition-transform duration-500 group-hover:scale-105">
                    <ImageWithFallback
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full"
                    />
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2 text-xs text-charcoal-light mb-2">
                    <span className="text-gold font-medium uppercase tracking-wider">
                      {post.category}
                    </span>
                    <span>&middot;</span>
                    <span>{post.readTime}</span>
                  </div>
                  <h3 className="font-serif text-lg text-charcoal group-hover:text-gold transition-colors leading-snug line-clamp-2">
                    {post.title}
                  </h3>
                </div>
              </Link>
            </AnimatedSection>
          ))}
        </div>
        <div className="text-center mt-12">
          <Link
            to="/blog"
            className="text-gold font-medium tracking-wide hover:text-gold-light transition-colors inline-flex items-center gap-2"
          >
            Read More Articles
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </Container>
    </section>
  );
}
