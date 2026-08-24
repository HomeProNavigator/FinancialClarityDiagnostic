const SITE = "Financial Clarity Diagnostic";
export const SITE_URL = "https://financialclaritydiagnostic.com";
export const PARTNER_URL = "https://visarifinancial.com";

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

export type Faq = { q: string; a: string };

export function faqPage(faqs: Faq[]) {
  return {
    "@type": "FAQPage" as const,
    mainEntity: faqs.map((f) => ({
      "@type": "Question" as const,
      name: f.q,
      acceptedAnswer: { "@type": "Answer" as const, text: f.a },
    })),
  };
}

export function homeJsonLd(faqs: Faq[]) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${SITE_URL}/#org`,
        name: SITE,
        url: SITE_URL,
        description:
          "Free 3-minute finance diagnostic for growing U.S. businesses. Educational, not personalized financial, tax, or legal advice.",
        knowsAbout: [
          "cash flow",
          "small business finance",
          "forecasting",
          "fractional finance",
        ],
        partner: {
          "@type": "Organization",
          name: "Visari Financial",
          url: PARTNER_URL,
        },
      },
      {
        "@type": "WebApplication",
        "@id": `${SITE_URL}/#app`,
        name: SITE,
        url: SITE_URL,
        applicationCategory: "BusinessApplication",
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        audience: {
          "@type": "Audience",
          audienceType: "Growing business owners in the United States",
        },
        description:
          "Free diagnostic that scores books, cash visibility, forecasting, systems, and profitability for growing U.S. businesses.",
        publisher: { "@id": `${SITE_URL}/#org` },
      },
      faqPage(faqs),
    ],
  };
}

export const GUIDE_FAQS: Record<string, Faq[]> = {
  "cash-feels-tight": [
    {
      q: "Why is a business profitable but still short on cash?",
      a: "Profit records work when it is earned. Cash records what actually moved. Receivables, deposits, job costs, payroll, tax estimates, and draws sit between those two views.",
    },
    {
      q: "What is a 13-week cash view?",
      a: "A rolling calendar of committed inflows and outflows, updated on a rhythm (Friday is enough), so tightness has a date instead of a personality.",
    },
  ],
  "finance-function-lagging": [
    {
      q: "How do I know the finance function is lagging growth?",
      a: "The close is late, reports arrive after decisions, two people give two answers for last month, and you steer by bank balance. That is a historian, not a co-pilot.",
    },
    {
      q: "Do I need a full-time CFO?",
      a: "No. Caught up means a close with a date, a one-page package that is used, a forward cash view, and a named owner — internal or a designed partner.",
    },
  ],
  "forecasting-readiness": [
    {
      q: "Is an annual budget a forecast?",
      a: "No. Readiness is a rolling view of revenue, margin, cash, and capacity that can survive contact with last month.",
    },
    {
      q: "How do I know we are ready to hire?",
      a: "If a $12k monthly hire showed up tomorrow, you could tell in twenty minutes whether cash and margin can carry it. If not, forecasting is the gap.",
    },
  ],
  "beyond-bookkeeping": [
    {
      q: "When is bookkeeping no longer enough?",
      a: "When decisions get larger than the last bank screenshot: a second location, a key hire, a job that would starve cash. Books are the floor. A finance function helps you decide.",
    },
    {
      q: "Do I have to switch accountants to use the diagnostic?",
      a: "No. Take it either way. Installing a finance function is a later decision.",
    },
  ],
  "cash-visibility": [
    {
      q: "Is today’s bank balance cash visibility?",
      a: "No. Visibility is a rolling view of what is committed, what is likely, and what will not clear, far enough ahead to change a decision.",
    },
    {
      q: "How far out should I see cash?",
      a: "Thirty days catches payroll and rent. Ninety days catches tax estimates, insurance, slow-pay customers, and hires whose paychecks arrive before their work.",
    },
  ],
};

export function guideJsonLd(opts: {
  title: string;
  description: string;
  path: string;
  faqs?: Faq[];
}) {
  const graph: unknown[] = [
    {
      "@type": "Article",
      headline: opts.title,
      description: opts.description,
      url: `${SITE_URL}${opts.path}`,
      author: { "@type": "Organization", name: SITE, url: SITE_URL },
      publisher: { "@type": "Organization", name: SITE, url: SITE_URL },
    },
  ];
  if (opts.faqs?.length) graph.push(faqPage(opts.faqs));
  return { "@context": "https://schema.org", "@graph": graph };
}

export const ADVISOR_FAQS: Faq[] = [
  {
    q: "Do I lose the client if I send this diagnostic?",
    a: "No. Legal, lending, insurance, and coaching stay yours. This does not bid on your work.",
  },
  {
    q: "Is the report useful if they never talk to Visari?",
    a: "Yes. They leave with a Clarity Score, five signals, and an order of operations even if they never book a consult.",
  },
];
