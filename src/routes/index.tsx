import { Link, createFileRoute, useNavigate } from "@tanstack/react-router";
import {
  ArrowRight,
  BookOpen,
  Eye,
  LineChart,
  Layers,
  PiggyBank,
} from "lucide-react";
import { HeroGauge } from "@/components/hero-gauge";
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
    icon: BookOpen,
    title: "Books quality",
    body: "Whether the close is real, or a tax-season reconstruction.",
  },
  {
    icon: Eye,
    title: "Cash visibility",
    body: "Today’s position — and whether you can see 30 to 90 days out.",
  },
  {
    icon: LineChart,
    title: "Forecasting readiness",
    body: "A living plan, or an annual binder nobody opens.",
  },
  {
    icon: Layers,
    title: "Systems & automation",
    body: "A source of truth, or exports, inboxes, and side sheets.",
  },
  {
    icon: PiggyBank,
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
      <section className="relative overflow-hidden">
        <div
          className="pointer-events-none absolute inset-0 paper-grain opacity-[0.07]"
          aria-hidden="true"
        />
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-14 sm:px-8 sm:py-20 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="rise-in text-xs uppercase tracking-[0.18em] text-subtle">
              Free · United States · Under 3 minutes
            </p>
            <h1 className="rise-in rise-in-1 mt-4 font-display text-[2.15rem] leading-[1.12] tracking-tight sm:text-5xl lg:text-[3.15rem]">
              Financial clarity for growing businesses.
            </h1>
            <p className="rise-in rise-in-2 mt-5 max-w-xl text-[1.07rem] leading-relaxed text-muted">
              A short diagnostic that shows whether your finance function is
              keeping up with the company you’ve already built — books, cash,
              forecasting, systems, and profit — then writes you a plain-English
              report.
            </p>
            <div className="rise-in rise-in-3 mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                to="/start"
                className="inline-flex h-14 items-center justify-center rounded-lg bg-primary px-6 text-base font-medium text-primary-fg shadow-card hover:bg-primary-soft"
              >
                Get my free Financial Clarity Report
              </Link>
              <button
                type="button"
                onClick={openSample}
                className="inline-flex h-14 items-center justify-center px-2 text-sm text-muted hover:text-fg"
              >
                See a sample report
                <ArrowRight className="ml-1 size-4" strokeWidth={1.75} />
              </button>
            </div>
            <p className="rise-in rise-in-4 mt-6 text-sm text-subtle">
              Used by growing business owners across the United States. Answers
              stay on this device. We don’t sell your data.
            </p>
          </div>
          <div className="rise-in rise-in-2">
            <HeroGauge />
          </div>
        </div>
      </section>

      <section className="border-t border-border">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
          <p className="text-xs uppercase tracking-[0.18em] text-subtle">
            What the report covers
          </p>
          <h2 className="mt-3 max-w-xl font-display text-3xl tracking-tight sm:text-4xl">
            Five signals. One score. Next steps you can actually take.
          </h2>
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {SIGNALS.map((s) => (
              <li
                key={s.title}
                className="rounded-xl bg-surface px-5 py-6 shadow-card"
              >
                <s.icon
                  className="size-5 text-primary"
                  strokeWidth={1.6}
                  aria-hidden="true"
                />
                <h3 className="mt-4 font-display text-lg tracking-tight">
                  {s.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{s.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-t border-border bg-bg-warm/40">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
          <p className="text-xs uppercase tracking-[0.18em] text-subtle">
            How it works
          </p>
          <ol className="mt-8 grid gap-8 md:grid-cols-3">
            {[
              {
                n: "01",
                t: "Answer ten questions",
                b: "Revenue band, books, cash, reporting, forecast, systems, profit. Optional industry and state. Under three minutes if you are honest.",
              },
              {
                n: "02",
                t: "Get a Clarity Score",
                b: "A 1–100 snapshot with a plain-English reading of the gaps — not a generic checklist, and not a sales letter.",
              },
              {
                n: "03",
                t: "Leave with an order of operations",
                b: "Three to five next steps, what “good” looks like at your stage, and a partner if you want the systems installed.",
              },
            ].map((s) => (
              <li key={s.n}>
                <p className="font-display text-3xl text-primary/40">{s.n}</p>
                <h3 className="mt-3 font-display text-2xl tracking-tight">{s.t}</h3>
                <p className="mt-2 text-[0.95rem] leading-relaxed text-muted">
                  {s.b}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-t border-border">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
          <p className="text-xs uppercase tracking-[0.18em] text-subtle">
            Who this is for
          </p>
          <h2 className="mt-3 max-w-2xl font-display text-3xl tracking-tight">
            Owners whose companies have grown past the point where basic
            bookkeeping is enough.
          </h2>
          <ul className="mt-10 grid gap-4 md:grid-cols-3">
            {[
              {
                t: "The owner",
                b: "Decisions got bigger. The financial side did not. You can feel the lag even if you cannot name it.",
              },
              {
                t: "The builder",
                b: "You are focused on what comes next — a hire, a location, a line of work — and you need to know if cash and margin can carry it.",
              },
              {
                t: "The operator",
                b: "A real business, real complexity. You want a close you trust and a picture that does not arrive after the meeting.",
              },
            ].map((c) => (
              <li key={c.t} className="rounded-xl bg-surface px-6 py-7 shadow-card">
                <h3 className="font-display text-xl tracking-tight">{c.t}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{c.b}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-t border-border">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-subtle">
                Field notes
              </p>
              <h2 className="mt-3 font-display text-3xl tracking-tight">
                Questions owners actually ask
              </h2>
            </div>
            <Link
              to="/guides"
              className="hidden text-sm text-muted hover:text-fg sm:inline-flex"
            >
              All guides
              <ArrowRight className="ml-1 size-4" />
            </Link>
          </div>
          <ul className="mt-8 grid gap-4 md:grid-cols-2">
            {GUIDES.slice(0, 4).map((g) => (
              <li key={g.slug}>
                <Link
                  to="/guides/$slug"
                  params={{ slug: g.slug }}
                  className="block rounded-xl bg-surface px-6 py-6 shadow-card hover:shadow-card-hover"
                >
                  <p className="text-xs uppercase tracking-[0.16em] text-subtle">
                    {g.kicker}
                  </p>
                  <h3 className="mt-2 font-display text-xl tracking-tight">
                    {g.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {g.description}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-t border-border bg-primary text-primary-fg">
        <div className="mx-auto max-w-3xl px-5 py-16 text-center sm:px-8 sm:py-20">
          <h2 className="font-display text-3xl tracking-tight sm:text-4xl">
            Is your finance function keeping up?
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-primary-fg/75">
            Three minutes. A score. A report you can take to Monday. The tool is
            free and useful on its own.
          </p>
          <Link
            to="/start"
            className="mt-8 inline-flex h-14 items-center justify-center rounded-lg bg-primary-fg px-6 text-base font-medium text-primary hover:bg-bg"
          >
            Get my free Financial Clarity Report
          </Link>
        </div>
      </section>
    </main>
  );
}
