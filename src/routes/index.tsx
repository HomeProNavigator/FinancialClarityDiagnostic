import { Link, createFileRoute, useNavigate } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
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
        "Free 3-minute financial clarity diagnostic for U.S. business owners. See whether your finance function is keeping up — books, cash visibility, forecasting, systems, and profit.",
      path: "/",
    }),
  component: Home,
});

const SIGNALS = [
  {
    title: "Books quality",
    body: "Whether the close is real, or a tax-season reconstruction.",
  },
  {
    title: "Cash visibility",
    body: "Today’s position — and whether you can see 30 to 90 days out.",
  },
  {
    title: "Forecasting readiness",
    body: "A living plan, or an annual binder nobody opens.",
  },
  {
    title: "Systems & automation",
    body: "A source of truth, or exports, inboxes, and side sheets.",
  },
  {
    title: "Profitability signal",
    body: "Which work actually pays — not just how busy the company is.",
  },
];

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
        <div className="mx-auto max-w-2xl px-5 pb-14 pt-10 sm:px-8 sm:pb-20 sm:pt-16">
          <p className="text-xs uppercase tracking-[0.18em] text-subtle">
            Free · United States · Under 3 minutes
          </p>
          <h1 className="mt-4 font-display text-[2.15rem] leading-[1.12] tracking-tight sm:text-5xl">
            Financial clarity for growing businesses.
          </h1>
          <p className="mt-5 text-[1.07rem] leading-relaxed text-muted">
            A short diagnostic that shows whether your finance function is
            keeping up with the company you’ve already built — then writes you a
            plain-English report.
          </p>
          <div className="mt-8">
            <Link
              to="/start"
              className="inline-flex h-12 items-center justify-center rounded-md bg-primary px-5 text-[0.95rem] font-medium text-primary-fg shadow-card hover:bg-primary-soft"
            >
              Get my free report
            </Link>
          </div>
          <p className="mt-5 text-sm text-muted">
            <button
              type="button"
              onClick={openSample}
              className="text-fg underline-offset-2 hover:underline"
            >
              See a sample
            </button>
            <span className="text-subtle"> · Answers stay on this device.</span>
          </p>
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
                b: "A Clarity Score (1–100), five signals — books, cash, forecast, systems, profit — and an order of operations written in plain English.",
              },
              {
                t: "What it costs",
                b: "Nothing. Nine questions. Under three minutes. Built for U.S. owners at roughly $500k–$10M.",
              },
              {
                t: "What happens to your answers",
                b: "They stay on this device. We do not sell data. Nothing is shared until you request a free consultation.",
              },
              {
                t: "If you want the function installed",
                b: "Visari Financial — a fractional finance partner, not a dashboard vendor — follows up. One form. No second site.",
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

      <section className="border-t border-border">
        <div className="mx-auto max-w-2xl px-5 py-12 sm:px-8 sm:py-16">
          <p className="text-xs uppercase tracking-[0.18em] text-subtle">
            What the report covers
          </p>
          <h2 className="mt-3 font-display text-2xl tracking-tight sm:text-3xl">
            Five signals. One score. Next steps you can take.
          </h2>
          <ul className="mt-8 divide-y divide-border border-y border-border">
            {SIGNALS.map((s) => (
              <li key={s.title} className="grid gap-1 py-4 sm:grid-cols-[11rem_1fr] sm:gap-8 sm:py-5">
                <h3 className="text-sm font-medium">{s.title}</h3>
                <p className="text-sm leading-relaxed text-muted">{s.body}</p>
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
                b: "Books, cash, reporting, forecast, systems, profit. Industry and state if you want. Under three minutes if you are honest.",
              },
              {
                n: "02",
                t: "Get a Clarity Score",
                b: "A 1–100 snapshot with a plain-English reading of the gaps — not a generic checklist, and not a sales letter.",
              },
              {
                n: "03",
                t: "Leave with an order of operations",
                b: "Next steps, what “good” looks like at your stage, and a partner if you want the systems installed.",
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
            Who this is for
          </p>
          <h2 className="mt-3 font-display text-2xl tracking-tight sm:text-3xl">
            Owners whose companies have grown past basic bookkeeping.
          </h2>
          <ul className="mt-8 divide-y divide-border border-y border-border">
            {[
              {
                t: "The owner",
                b: "Decisions got bigger. The financial side did not. You can feel the lag even if you cannot name it.",
              },
              {
                t: "The builder",
                b: "A hire, a location, a line of work — and you need to know if cash and margin can carry it.",
              },
              {
                t: "The operator",
                b: "A real business, real complexity. You want a close you trust and a picture that does not arrive after the meeting.",
              },
              {
                t: "Not this",
                b: "Startups hunting a dashboard, companies with a sitting finance team, or anyone who wants a pitch deck. This is a diagnostic.",
              },
            ].map((c) => (
              <li key={c.t} className="grid gap-1 py-4 sm:grid-cols-[11rem_1fr] sm:gap-8 sm:py-5">
                <h3 className="text-sm font-medium">{c.t}</h3>
                <p className="text-sm leading-relaxed text-muted">{c.b}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-t border-border">
        <div className="mx-auto max-w-2xl px-5 py-12 sm:px-8 sm:py-16">
          <p className="text-xs uppercase tracking-[0.18em] text-subtle">
            Field notes
          </p>
          <h2 className="mt-3 font-display text-2xl tracking-tight sm:text-3xl">
            Questions owners actually ask
          </h2>
          <ul className="mt-8 divide-y divide-border border-y border-border">
            {GUIDES.slice(0, 4).map((g) => (
              <li key={g.slug}>
                <Link
                  to="/guides/$slug"
                  params={{ slug: g.slug }}
                  className="block py-4 hover:text-primary sm:py-5"
                >
                  <p className="text-xs uppercase tracking-[0.16em] text-subtle">
                    {g.kicker}
                  </p>
                  <h3 className="mt-1 font-display text-lg tracking-tight">{g.title}</h3>
                </Link>
              </li>
            ))}
          </ul>
          <Link
            to="/guides"
            className="mt-6 inline-flex items-center text-sm text-muted hover:text-fg"
          >
            All guides
            <ArrowRight className="ml-1 size-4" />
          </Link>
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
                a: "The report is complete without talking to anyone. A consult is optional, on a later screen, and only if you ask.",
              },
              {
                q: "Who sees my answers?",
                a: "You. If you request a consult, Visari Financial sees your contact details and the questions you answered — so they are not guessing.",
              },
              {
                q: "Can my attorney, banker, or broker send this?",
                a: "Yes. They keep their engagement. You get a finance read they should not have to improvise in the hallway.",
              },
              {
                q: "Do I have to switch accountants to use it?",
                a: "No. Take the diagnostic either way. Installing a full finance function is a separate decision, after you have seen the score.",
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

      <section className="border-t border-border bg-primary text-primary-fg">
        <div className="mx-auto max-w-2xl px-5 py-14 sm:px-8 sm:py-16">
          <h2 className="font-display text-2xl tracking-tight sm:text-3xl">
            Is your finance function keeping up?
          </h2>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-primary-fg/75">
            Three minutes. A score. A report you can take to Monday. Free, and
            useful on its own.
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
