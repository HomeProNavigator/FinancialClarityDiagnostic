const SITE = "Financial Clarity Diagnostic";

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
  return {
    meta: [
      { title: full },
      { name: "description", content: description },
      { name: "theme-color", content: "#1E3D34" },
      { name: "robots", content: robots },
      {
        name: "keywords",
        content:
          "financial clarity for growing businesses, cash flow diagnostic for business owners, is my finance function keeping up, free financial diagnostic, forecasting readiness, bookkeeping vs CFO",
      },
    ],
    links: path
      ? [{ rel: "canonical", href: path }]
      : [],
  };
}
