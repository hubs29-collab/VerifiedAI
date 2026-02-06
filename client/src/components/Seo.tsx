import { useEffect } from "react";

type SeoProps = {
  title: string;
  description: string;
  canonicalPath?: string;
  og?: {
    title?: string;
    description?: string;
    type?: string;
  };
};

function upsertMeta(attr: "name" | "property", key: string, content: string) {
  const selector = `meta[${attr}="${key}"]`;
  let el = document.head.querySelector(selector) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

export default function Seo({ title, description, canonicalPath, og }: SeoProps) {
  useEffect(() => {
    document.title = title;

    upsertMeta("name", "description", description);

    // Open Graph
    upsertMeta("property", "og:title", og?.title ?? title);
    upsertMeta("property", "og:description", og?.description ?? description);
    upsertMeta("property", "og:type", og?.type ?? "website");

    // Basic Twitter
    upsertMeta("name", "twitter:card", "summary_large_image");
    upsertMeta("name", "twitter:title", og?.title ?? title);
    upsertMeta("name", "twitter:description", og?.description ?? description);

    // Canonical (optional)
    if (canonicalPath) {
      const href = `${window.location.origin}${canonicalPath}`;
      let link = document.head.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
      if (!link) {
        link = document.createElement("link");
        link.rel = "canonical";
        document.head.appendChild(link);
      }
      link.href = href;
    }
  }, [title, description, canonicalPath, og?.title, og?.description, og?.type]);

  return null;
}
