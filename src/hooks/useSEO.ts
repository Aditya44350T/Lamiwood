import { useEffect } from "react";

interface SEOProps {
  title: string;
  description?: string;
  ogImage?: string;
  ogType?: string;
  canonical?: string;
}

export function useSEO({
  title,
  description,
  ogImage,
  ogType = "website",
  canonical,
}: SEOProps) {
  useEffect(() => {
    document.title = title;

    const setMeta = (property: string, content: string) => {
      let el = document.querySelector(`meta[property="${property}"]`) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute("property", property);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };

    const setNameMeta = (name: string, content: string) => {
      let el = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute("name", name);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };

    if (description) {
      setNameMeta("description", description);
      setMeta("og:description", description);
      setNameMeta("twitter:description", description);
    }

    setMeta("og:title", title);
    setMeta("og:type", ogType);
    setMeta("og:url", window.location.href);
    setNameMeta("twitter:card", "summary_large_image");
    setNameMeta("twitter:title", title);

    if (ogImage) {
      setMeta("og:image", ogImage);
      setNameMeta("twitter:image", ogImage);
    }

    if (canonical) {
      let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
      if (!link) {
        link = document.createElement("link");
        link.setAttribute("rel", "canonical");
        document.head.appendChild(link);
      }
      link.setAttribute("href", canonical);
    }
  }, [title, description, ogImage, ogType, canonical]);
}
