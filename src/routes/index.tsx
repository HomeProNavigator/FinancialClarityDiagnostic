import { Link, createFileRoute, useNavigate } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { ReportExcerpt } from "@/components/report-excerpt";
import { VisariSiteLink } from "@/components/visari-link";
import { GUIDES } from "@/lib/guides";
import { pageHead, homeJsonLd } from "@/lib/seo";
import { buildSampleReport } from "@/lib/diagnostic/fallback-report";
import { useDiagnosticStore } from "@/lib/diagnostic/store";
import { track } from "@/lib/diagnostic/analytics";

export const Route = createFileRoute("/")({
  head: () =>
    pageHead({
      title:
        "Financial Clarity Diagnostic for Growing Businesses | Free Cash Flow & Finance Check",
      description:
        "Free 3-minute financial clarity diagnostic for U.S. business owners. See whether your finance function is keeping up: books, cash visibility, forecasting, systems, and profit. In partnership with Visari Financial.",
      path: "/",
    }),
  component: Home,
});

const HOME_FAQS = [
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
];

const SIGNALS = [
  {
    title: "Books quality",
    body: "Whether the close is real, or a tax-season reconstruction.",
  },
  {
    title: "Cash visibility",
    body: "Today’s position, and whether you can see 30 to 90 days out.",
  },
  {
    title: "Forecasting",
    body: "A living plan, or an annual binder nobody opens.",
  },
  {
    title: "Systems",
    body: "One source of truth, or exports, inboxes, and side sheets.",
  },
  {
    title: "Profitability",
    body: "Which work actually pays, not just how busy the company is.",
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

  const jsonLd = homeJsonLd(HOME_FAQS);

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section>
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 pb-14 pt-10 sm:px-8 sm:pb-20 sm:pt-16 lg:grid-cols-2 lg:gap-16">
          <div>
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
              Nine questions, then a score and a report written for this
              company, not a template. For U.S. owners at $500k-$10M who have
              outgrown bookkeeping.
            </p>
            <p className="mt-4 text-[1.07rem] leading-relaxed text-muted">
              Cash tighter than the P&L. A close you would not take into a
              meeting. No clean answer to whether you can afford the next hire.
              The report names which of those is actually the problem, in order.
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
              Answers stay on this device until you ask for a consult. The
              report is complete even if you never talk to anyone.
            </p>
          </div>
          <div>
            <ReportExcerpt onOpenSample={openSample} />
          </div>
        </div>
      </section>

      <section className="border-t border-border">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:px-8 sm:py-20 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-subtle">
              What you leave with
            </p>
            <h2 className="mt-3 font-display text-2xl tracking-tight sm:text-3xl">
              Five signals. One score. Next steps you can take.
            </h2>
            <p className="mt-4 text-[1.05rem] leading-relaxed text-muted">
              The report is useful on its own. A consult with Visari is
              optional, and only if you ask.
            </p>
          </div>
          <ul className="divide-y divide-border border-y border-border">
            {SIGNALS.map((s) => (
              <li key={s.title} className="grid gap-1 py-4 sm:grid-cols-[10rem_1fr] sm:gap-8">
                <h3 className="text-sm font-medium">{s.title}</h3>
                <p className="text-sm leading-relaxed text-muted">{s.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-t border-border bg-bg-warm/40">
        <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8 sm:py-20">
          <p className="text-xs uppercase tracking-[0.18em] text-subtle">
            How it works
          </p>
          <h2 className="mt-3 max-w-xl font-display text-2xl tracking-tight sm:text-3xl">
            Three minutes. Then you decide.
          </h2>
          <ol className="mt-10 grid gap-10 md:grid-cols-3">
            {[
              {
                n: "01",
                t: "Answer nine questions",
                b: "Books, cash, reporting, forecast, systems, profit. Industry and state if you want. Honest answers beat polished ones.",
              },
              {
                n: "02",
                t: "Get a Clarity Score",
                b: "A 1-100 snapshot and a report written in the company’s language, not a generic checklist.",
              },
              {
                n: "03",
                t: "Decide what happens next",
                b: "Use the report on Monday. Or ask Visari to follow up and install the function it names. One form. No second site.",
              },
            ].map((s) => (
              <li key={s.n}>
                <p className="font-display text-2xl text-primary/40">{s.n}</p>
                <h3 className="mt-3 font-display text-xl tracking-tight">{s.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{s.b}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-t border-border">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:px-8 sm:py-20 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-subtle">
              Who this is for
            </p>
            <h2 className="mt-3 font-display text-2xl tracking-tight sm:text-3xl">
              Owners whose companies have grown past basic bookkeeping.
            </h2>
            <p className="mt-4 text-[1.05rem] leading-relaxed text-muted">
              Construction, professional services, healthcare practices,
              multi-location operators. Real payroll. Real complexity. Not a
              sitting finance team, and not a startup hunting a dashboard.
            </p>
          </div>
          <ul className="divide-y divide-border border-y border-border">
            {[
              {
                t: "The owner",
                b: "Decisions got bigger. The financial side did not. You can feel the lag even if you cannot name it.",
              },
              {
                t: "The builder",
                b: "A hire, a location, a line of work, and you need to know if cash and margin can carry it.",
              },
              {
                t: "The operator",
                b: "You want a close you trust and a picture that does not arrive after the meeting.",
              },
              {
                t: "Attorneys, bankers, brokers",
                b: "Send it when a client asks about cash. You keep your engagement. They get a finance read you should not have to improvise.",
              },
            ].map((c) => (
              <li key={c.t} className="grid gap-1 py-4 sm:grid-cols-[10rem_1fr] sm:gap-8">
                <h3 className="text-sm font-medium">{c.t}</h3>
                <p className="text-sm leading-relaxed text-muted">{c.b}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-t border-border bg-bg-warm/40">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:px-8 sm:py-20 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-subtle">
              In partnership with Visari
            </p>
            <h2 className="mt-3 font-display text-2xl tracking-tight sm:text-3xl">
              This tool names the gap. Visari does the work it names.
            </h2>
            <p className="mt-4 text-[1.05rem] leading-relaxed text-muted">
              Visari Financial is a fractional finance partner for owners who
              have outgrown bookkeeping. They run the close, the cash view, the
              systems, and sit in the decisions. You can take the diagnostic
              without talking to them. If you want the function installed, they
              follow up.
            </p>
            <p className="mt-4 text-sm text-muted">
              <VisariSiteLink
                placement="home-visari"
                className="text-fg underline-offset-2 hover:underline"
              >
                visarifinancial.com
              </VisariSiteLink>
            </p>
          </div>
          <ul className="divide-y divide-border border-y border-border">
            {[
              {
                t: "The close",
                b: "Full-stack accounting and a monthly package you can use in the room, not a tax folder in March.",
              },
              {
                t: "Cash",
                b: "A real position today and a 13-week view, so a hire or a draw is a decision instead of a guess.",
              },
              {
                t: "Systems",
                b: "One source of truth. The picture stops being rebuilt from inboxes every month.",
              },
              {
                t: "The seat at the table",
                b: "Someone who can answer “can we afford this?” before you commit, not a year-end recap.",
              },
            ].map((item) => (
              <li key={item.t} className="grid gap-1 py-4 sm:grid-cols-[10rem_1fr] sm:gap-8">
                <h3 className="text-sm font-medium">{item.t}</h3>
                <p className="text-sm leading-relaxed text-muted">{item.b}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-t border-border">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:px-8 sm:py-20 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-subtle">
              Straight answers
            </p>
            <h2 className="mt-3 font-display text-2xl tracking-tight sm:text-3xl">
              What this is not.
            </h2>
            <Link
              to="/advisors"
              className="mt-6 inline-flex items-center text-sm text-muted hover:text-fg"
            >
              For attorneys, brokers, bankers, and coaches
              <ArrowRight className="ml-1 size-4" />
            </Link>
          </div>
          <ul className="divide-y divide-border border-y border-border">
            {HOME_FAQS.map((row) => (
              <li key={row.q} className="py-4">
                <h3 className="text-sm font-medium">{row.q}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted">{row.a}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-t border-border">
        <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8 sm:py-20">
          <p className="text-xs uppercase tracking-[0.18em] text-subtle">
            Field notes
          </p>
          <h2 className="mt-3 font-display text-2xl tracking-tight sm:text-3xl">
            Questions owners actually ask
          </h2>
          <ul className="mt-10 grid gap-x-16 gap-y-0 sm:grid-cols-2">
            {GUIDES.map((g) => (
              <li key={g.slug} className="border-t border-border">
                <Link
                  to="/guides/$slug"
                  params={{ slug: g.slug }}
                  className="block py-5 hover:text-primary"
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
            className="mt-8 inline-flex items-center text-sm text-muted hover:text-fg"
          >
            All field notes for growing owners
            <ArrowRight className="ml-1 size-4" />
          </Link>
        </div>
      </section>

      <section className="border-t border-border bg-primary text-primary-fg">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-8 px-5 py-14 sm:px-8 sm:py-16 lg:flex-row lg:items-center">
          <div>
            <h2 className="font-display text-2xl tracking-tight sm:text-3xl">
              Is your finance function keeping up?
            </h2>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-primary-fg/75">
              Three minutes. A score. A report you can take to Monday.
            </p>
          </div>
          <Link
            to="/start"
            className="inline-flex h-12 items-center justify-center rounded-md bg-primary-fg px-5 text-[0.95rem] font-medium text-primary hover:bg-bg"
          >
            Get my free report
          </Link>
        </div>
      </section>
    </main>
  );
}
