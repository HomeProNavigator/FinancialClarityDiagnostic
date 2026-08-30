import { Link, createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { pageHead, SITE_URL } from "@/lib/seo";

export const Route = createFileRoute("/advisors")({
  head: () =>
    pageHead({
      title: "For attorneys, brokers, bankers, and coaches",
      description:
        "A free three-minute finance diagnostic you can send a client. You keep the relationship. They get a score and a report. If they want the function installed, Visari Financial follows up.",
      path: "/advisors",
    }),
  component: AdvisorsPage,
});

const BLURB = `A free three-minute diagnostic for owners who’ve outgrown basic bookkeeping. It scores books, cash, forecasting, systems, and profit, then writes a report in ordinary language. Answers stay on their device unless they ask Visari Financial to follow up. You stay in your lane. This is not a competing engagement.

${SITE_URL}`;

function AdvisorsPage() {
  const [copied, setCopied] = useState(false);

  async function copyBlurb() {
    try {
      await navigator.clipboard.writeText(BLURB);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  return (
    <main className="mx-auto w-full max-w-2xl px-5 py-14 sm:px-8 sm:py-20">
      <p className="text-xs uppercase tracking-[0.18em] text-subtle">
        For attorneys, brokers, bankers, and coaches
      </p>
      <h1 className="mt-3 font-display text-[2rem] leading-tight tracking-tight sm:text-4xl">
        Something you can send when a client asks about cash.
      </h1>
      <p className="mt-5 text-[1.05rem] leading-relaxed text-muted">
        You are not their finance function. You should not have to become one
        in the hallway after a meeting. This diagnostic is the thing you
        forward instead.
      </p>

      <ul className="mt-10 divide-y divide-border border-y border-border">
        {[
          {
            t: "You keep the relationship",
            b: "Legal, lending, insurance, and coaching stay yours. This does not bid on your work.",
          },
          {
            t: "They leave with something useful",
            b: "A Clarity Score, five signals, and an order of operations, even if they never talk to anyone.",
          },
          {
            t: "No ambush",
            b: "Free. Under three minutes. Answers stay on their device until they request a consult. Then Visari Financial follows up. One form. No second site.",
          },
          {
            t: "You look like the adult in the room",
            b: "You sent a specific tool for a specific problem, not a vendor’s brochure.",
          },
        ].map((row) => (
          <li key={row.t} className="py-5">
            <h2 className="font-display text-xl tracking-tight">{row.t}</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted">{row.b}</p>
          </li>
        ))}
      </ul>

      <section className="mt-12">
        <p className="text-xs uppercase tracking-[0.18em] text-subtle">
          Who to send it to
        </p>
        <h2 className="mt-3 font-display text-2xl tracking-tight">
          Owners at $500k-$10M who can feel the lag.
        </h2>
        <p className="mt-3 text-[1.02rem] leading-relaxed text-muted">
          Cash tighter than the P&L. A hire they can’t underwrite. Month-end
          that arrives after the decision. Construction, professional services,
          healthcare practices, multi-location operators. Not startups. Not
          companies that already have a finance team.
        </p>
      </section>

      <section className="mt-12">
        <p className="text-xs uppercase tracking-[0.18em] text-subtle">
          Copy this
        </p>
        <h2 className="mt-3 font-display text-2xl tracking-tight">
          A note you can paste.
        </h2>
        <div className="mt-5 rounded-xl bg-surface px-5 py-5 shadow-card sm:px-6">
          <p className="whitespace-pre-wrap text-sm leading-relaxed text-fg/90">
            {BLURB}
          </p>
          <button
            type="button"
            onClick={() => void copyBlurb()}
            className="mt-4 inline-flex h-11 items-center rounded-md bg-primary px-4 text-sm font-medium text-primary-fg hover:bg-primary-soft"
          >
            {copied ? "Copied" : "Copy note"}
          </button>
        </div>
      </section>

      <div className="mt-12 flex flex-col gap-3 sm:flex-row sm:items-center">
        <Link
          to="/start"
          className="inline-flex h-12 items-center justify-center rounded-md bg-primary px-5 text-sm font-medium text-primary-fg"
        >
          Run the Financial Clarity Diagnostic first
        </Link>
        <Link
          to="/connect"
          className="text-sm text-muted underline-offset-2 hover:underline"
        >
          Request a Visari consultation
        </Link>
      </div>
    </main>
  );
}
