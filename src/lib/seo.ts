const SITE = "Financial Clarity Diagnostic";
export const SITE_URL = "https://financialclaritydiagnostic.netlify.app";

export function pageHead({
  title,
  description,
  path = "/",
  robots = "index,follow",
}: {
  title: string;
  description: string;
  path?: string;
  robots?: string;
}) {
  const full = title.includes(SITE) ? title : `${title} · ${SITE}`;
  const url = `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
  const image = `${SITE_URL}/og.jpg`;
  return {
    meta: [
      { title: full },
      { name: "description", content: description },
      { name: "theme-color", content: "#1E3D34" },
      { name: "robots", content: robots },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: SITE },
      { property: "og:title", content: full },
      { property: "og:description", content: description },
      { property: "og:url", content: url },
      { property: "og:image", content: image },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: full },
      { name: "twitter:description", content: description },
      { name: "twitter:image", content: image },
    ],
    links: [{ rel: "canonical", href: url }],
  };
}
