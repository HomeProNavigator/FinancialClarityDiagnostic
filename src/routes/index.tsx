import { Link, createFileRoute, useNavigate } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { ReportExcerpt } from "@/components/report-excerpt";
import { VisariSiteLink } from "@/components/visari-link";
import { GUIDES } from "@/lib/guides";
import { pageHead } from "@/lib/seo";
import { buildSampleReport } from "@/lib/diagnostic/fallback-report";
import { useDiagnosticStore } from "@/lib/diagnostic/store";
import { track } from "@/lib/diagnostic/analytics";

export const Route = createFileRoute("/")({
  head: () =>
    pageHead({
      title:
        "Financial Clarity Diagnostic for Growing Businesses | Free Cash Flow & Finance Check",
      description:
        "Free 3-minute financial clarity diagnostic for U.S. business owners. See whether your finance function is keeping up — books, cash visibility, forecasting, systems, and profit. In partnership with Visari Financial.",
      path: "/",
    }),
  component: Home,
});

function Home() {
  const navigate = useNavigate();
  const setReport = useDiagnosticStore((s) => s.setReport);

  function openSample() {
    setReport(buildSampleReport());
    track("sample_viewed");
    void navigate({ to: "/report" });
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Financial Clarity Diagnostic",
    applicationCategory: "BusinessApplication",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    audience: {
      "@type": "Audience",
      audienceType: "Growing business owners in the United States",
    },
    description:
      "Free diagnostic that scores books, cash visibility, forecasting, systems, and profitability for growing U.S. businesses.",
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <section>
        <div className="mx-auto max-w-2xl px-5 pb-12 pt-10 sm:px-8 sm:pb-16 sm:pt-16">
          <p className="text-xs uppercase tracking-[0.18em] text-subtle">
            Free · United States · Under 3 minutes
          </p>
          <h1 className="mt-4 font-display text-[2.15rem] leading-[1.12] tracking-tight sm:text-5xl">
            Financial clarity for growing businesses.
          </h1>
          <p className="mt-4 text-sm text-muted">
            In partnership with{" "}
            <VisariSiteLink
              placement="home-hero"
              className="text-fg underline-offset-2 hover:underline"
            >
              Visari Financial
            </VisariSiteLink>
          </p>
          <p className="mt-5 text-[1.07rem] leading-relaxed text-muted">
            Nine questions. A Clarity Score. A plain-English report on books,
            cash, forecast, systems, and profit — for U.S. owners at $500k–$10M
            who have outgrown bookkeeping.
          </p>
          <div className="mt-8">
            <Link
              to="/start"
              className="inline-flex h-12 items-center justify-center rounded-md bg-primary px-5 text-[0.95rem] font-medium text-primary-fg shadow-card hover:bg-primary-soft"
            >
              Get my free report
            </Link>
          </div>
          <p className="mt-5 text-sm text-subtle">
            Answers stay on this device until you ask for a consult.
          </p>
        </div>
      </section>

      <section className="border-t border-border">
        <div className="mx-auto max-w-2xl px-5 py-12 sm:px-8 sm:py-16">
          <ReportExcerpt onOpenSample={openSample} />
        </div>
      </section>

      <section className="border-t border-border">
        <div className="mx-auto max-w-2xl px-5 py-12 sm:px-8 sm:py-16">
          <p className="text-xs uppercase tracking-[0.18em] text-subtle">
            Why take it
          </p>
          <h2 className="mt-3 font-display text-2xl tracking-tight sm:text-3xl">
            A score you can use Monday. Not a pitch.
          </h2>
          <ul className="mt-8 divide-y divide-border border-y border-border">
            {[
              {
                t: "What you get",
                b: "A Clarity Score, five signals, and an order of operations. Complete even if you never talk to anyone.",
              },
              {
                t: "What it costs",
                b: "Nothing. Under three minutes. Built for owners at roughly $500k–$10M — not startups, not companies with a sitting finance team.",
              },
              {
                t: "Your answers",
                b: "Stay on this device. Nothing is shared until you request a consult. Then Visari Financial follows up. One form.",
              },
            ].map((row) => (
              <li
                key={row.t}
                className="grid gap-1 py-4 sm:grid-cols-[11rem_1fr] sm:gap-8 sm:py-5"
              >
                <h3 className="text-sm font-medium">{row.t}</h3>
                <p className="text-sm leading-relaxed text-muted">{row.b}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-t border-border bg-bg-warm/40">
        <div className="mx-auto max-w-2xl px-5 py-12 sm:px-8 sm:py-16">
          <p className="text-xs uppercase tracking-[0.18em] text-subtle">
            How it works
          </p>
          <ol className="mt-8 space-y-8">
            {[
              {
                n: "01",
                t: "Answer nine questions",
                b: "Books, cash, reporting, forecast, systems, profit. Industry and state if you want.",
              },
              {
                n: "02",
                t: "Get a Clarity Score",
                b: "A 1–100 snapshot and a report written in the company’s language — not a generic checklist.",
              },
              {
                n: "03",
                t: "Decide what happens next",
                b: "Use the report on Monday. Or ask Visari to follow up and install the function it names.",
              },
            ].map((s) => (
              <li key={s.n} className="grid grid-cols-[2.5rem_1fr] gap-4">
                <p className="font-display text-xl text-primary/45">{s.n}</p>
                <div>
                  <h3 className="font-display text-xl tracking-tight">{s.t}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted">{s.b}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-t border-border">
        <div className="mx-auto max-w-2xl px-5 py-12 sm:px-8 sm:py-16">
          <p className="text-xs uppercase tracking-[0.18em] text-subtle">
            Straight answers
          </p>
          <h2 className="mt-3 font-display text-2xl tracking-tight sm:text-3xl">
            What this is not.
          </h2>
          <ul className="mt-8 divide-y divide-border border-y border-border">
            {[
              {
                q: "Is this a sales trap?",
                a: "The report is complete without talking to anyone. A consult is optional, and only if you ask.",
              },
              {
                q: "Who sees my answers?",
                a: "You. If you request a consult, Visari sees your contact details and the questions you answered.",
              },
              {
                q: "Can my attorney, banker, or broker send this?",
                a: "Yes. They keep their engagement. You get a finance read they should not have to improvise.",
              },
              {
                q: "Do I have to switch accountants to use it?",
                a: "No. Take the diagnostic either way. Installing a finance function is a later decision.",
              },
            ].map((row) => (
              <li key={row.q} className="py-5">
                <h3 className="text-sm font-medium">{row.q}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{row.a}</p>
              </li>
            ))}
          </ul>
          <Link
            to="/advisors"
            className="mt-6 inline-flex items-center text-sm text-muted hover:text-fg"
          >
            For attorneys, brokers, bankers, and coaches
            <ArrowRight className="ml-1 size-4" />
          </Link>
        </div>
      </section>

      <section className="border-t border-border">
        <div className="mx-auto max-w-2xl px-5 py-12 sm:px-8 sm:py-16">
          <p className="text-xs uppercase tracking-[0.18em] text-subtle">
            Field notes
          </p>
          <ul className="mt-6 divide-y divide-border border-y border-border">
            {GUIDES.slice(0, 4).map((g) => (
              <li key={g.slug}>
                <Link
                  to="/guides/$slug"
                  params={{ slug: g.slug }}
                  className="block py-4 hover:text-primary"
                >
                  <h3 className="font-display text-lg tracking-tight">{g.title}</h3>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-t border-border bg-primary text-primary-fg">
        <div className="mx-auto max-w-2xl px-5 py-14 sm:px-8 sm:py-16">
          <h2 className="font-display text-2xl tracking-tight sm:text-3xl">
            Is your finance function keeping up?
          </h2>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-primary-fg/75">
            Three minutes. A score. A report you can take to Monday.
          </p>
          <Link
            to="/start"
            className="mt-7 inline-flex h-12 items-center justify-center rounded-md bg-primary-fg px-5 text-[0.95rem] font-medium text-primary hover:bg-bg"
          >
            Get my free report
          </Link>
        </div>
      </section>
    </main>
  );
}
