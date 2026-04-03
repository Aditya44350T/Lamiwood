import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { blogPosts } from "@/data/blog";
import Container from "@/components/ui/Container";
import Breadcrumb from "@/components/ui/Breadcrumb";
import Button from "@/components/ui/Button";
import PageTransition from "@/components/shared/PageTransition";
import ImageWithFallback from "@/components/ui/ImageWithFallback";

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const post = blogPosts.find((p) => p.slug === slug);

  useEffect(() => {
    document.title = post ? `${post.title} | Lamiwood` : "Post Not Found | Lamiwood";
  }, [post]);

  if (!post) {
    return (
      <PageTransition>
        <div className="pb-20 bg-cream min-h-screen flex items-center justify-center" style={{ paddingTop: "var(--header-height)" }}>
          <div className="text-center">
            <h1 className="font-serif text-4xl text-charcoal mb-4">Post Not Found</h1>
            <Button href="/blog">Back to Blog</Button>
          </div>
        </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <div className="pb-20 bg-cream" style={{ paddingTop: "var(--header-height)" }}>
        <Container size="narrow">
          <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Blog", href: "/blog" }, { label: post.title }]} />

          <article className="mt-6">
            <div className="mb-8">
              <span className="text-gold text-sm font-medium uppercase tracking-wider">
                {post.category}
              </span>
              <h1 className="font-serif text-3xl md:text-5xl text-charcoal mt-2 mb-4 leading-tight">
                {post.title}
              </h1>
              <div className="flex items-center gap-3 text-sm text-charcoal-light">
                <span>By {post.author}</span>
                <span>&middot;</span>
                <span>{new Date(post.date).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}</span>
                <span>&middot;</span>
                <span>{post.readTime} read</span>
              </div>
            </div>

            <div className="aspect-[2/1] mb-10 overflow-hidden">
              <ImageWithFallback src={post.image} alt={post.title} className="w-full h-full" />
            </div>

            <div className="prose max-w-none">
              <p className="text-charcoal-light leading-relaxed text-lg mb-6">
                {post.excerpt}
              </p>
              <p className="text-charcoal-light leading-relaxed">
                {post.content}
              </p>
            </div>

            <div className="mt-12 pt-8 border-t border-beige dark:border-white/10 text-center">
              <Button href="/blog" variant="secondary">
                &larr; Back to Blog
              </Button>
            </div>
          </article>
        </Container>
      </div>
    </PageTransition>
  );
}
