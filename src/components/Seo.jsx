import { useEffect } from "react";
import { SITE } from "../config.js";

// Per-page SEO — the React equivalent of the static site's setMeta() plus
// the JSON-LD each static page carried in its head. Sets the page title,
// meta description, canonical, Open Graph and Twitter tags, and (optionally)
// a page-specific JSON-LD block (used for the project BreadcrumbList).
function upsertMeta(selector, attrs) {
  let el = document.head.querySelector(selector);
  if (!el) {
    el = document.createElement(selector.startsWith("link") ? "link" : "meta");
    document.head.appendChild(el);
  }
  Object.entries(attrs).forEach(([k, v]) => el.setAttribute(k, v));
  return el;
}

export default function Seo({ title, description, path = "", image, jsonLd }) {
  useEffect(() => {
    const url = SITE.url + "/" + (path || "");
    const img = SITE.url + "/" + String(image || SITE.ogImage).replace(/^\//, "");
    document.title = title;
    upsertMeta('meta[name="description"]', { name: "description", content: description });
    upsertMeta('link[rel="canonical"]', { rel: "canonical", href: url });
    upsertMeta('meta[property="og:title"]', { property: "og:title", content: title });
    upsertMeta('meta[property="og:description"]', { property: "og:description", content: description });
    upsertMeta('meta[property="og:url"]', { property: "og:url", content: url });
    upsertMeta('meta[property="og:image"]', { property: "og:image", content: img });
    upsertMeta('meta[name="twitter:title"]', { name: "twitter:title", content: title });
    upsertMeta('meta[name="twitter:description"]', { name: "twitter:description", content: description });
    upsertMeta('meta[name="twitter:image"]', { name: "twitter:image", content: img });

    let script = null;
    if (jsonLd) {
      script = document.createElement("script");
      script.type = "application/ld+json";
      script.id = "crumbLd";
      script.textContent = JSON.stringify(jsonLd);
      document.head.appendChild(script);
    }
    return () => {
      if (script) script.remove();
    };
  }, [title, description, path, image, jsonLd]);
  return null;
}

// The per-page SEO values from the static site (js/site.js SEO map, which
// matches the static pages' heads).
export const PAGE_SEO = {
  home: {
    t: "ACE Group Projects in Noida & Greater Noida | ACE Group Sales",
    d: "Explore ACE Group residential and commercial projects in Noida, Greater Noida and Yamuna Expressway. Enquire now for prices, floor plans and site visits. Call +91 87997 56026.",
  },
  projects: {
    t: "All Ace Group Projects — Noida, Yamuna Expressway & Gr. Noida West",
    d: "Browse all 23 Ace Group projects: 1–4 BHK residences, penthouses, plots and commercial spaces across Noida, Yamuna Expressway, Greater Noida West and Gurugram. Prices on request.",
  },
  about: {
    t: "About Us | Real Estate Projects in Noida – ACE Group Sales",
    d: "Learn about ACE Group Sales, your real estate channel partner for premium real estate projects in Noida. Explore residential and commercial properties with us.",
  },
  contact: {
    t: "Enquire — Ace Group Projects | Call +91 87997 56026",
    d: "Enquire about any Ace Group project: price lists, availability, site visits and booking assistance from the authorized channel partner desk. Call or WhatsApp +91 87997 56026.",
  },
  notfound: {
    t: "Page Not Found (404) | Ace Group — Authorized Channel Partner",
    d: "The page you requested could not be found. Browse all Ace Group projects in Noida, Yamuna Expressway and Greater Noida West instead.",
  },
};
