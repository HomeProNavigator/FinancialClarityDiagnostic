import { Link, createFileRoute } from "@tanstack/react-router";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/inbox")({
  head: () =>
    pageHead({
      title: "Partner inbox",
      description: "Where Visari introductions from this diagnostic are recorded.",
      path: "/inbox",
      robots: "noindex,nofollow",
    }),
  component: InboxPage,
});

function InboxPage() {
  return (
    <main className="mx-auto w-full max-w-2xl px-5 py-14 sm:px-8 sm:py-20">
      <p className="text-xs uppercase tracking-[0.18em] text-subtle">
        Referring partners
      </p>
      <h1 className="mt-3 font-display text-3xl tracking-tight sm:text-4xl">
        Consult requests live in Netlify Forms
      </h1>
      <div className="mt-6 space-y-5 text-[1.05rem] leading-relaxed text-fg/90">
        <p>
          When someone requests a free consultation, Netlify stores the
          submission. Form name:{" "}
          <code className="rounded-sm bg-bg-warm px-1 text-sm">visari-intro</code>
          . Pass that row to Visari. They follow up to schedule. Your referral
          code is on every row (
          <code className="rounded-sm bg-bg-warm px-1 text-sm">ref=kyle</code>{" "}
          by default).
        </p>
        <p>
          Each row is name, email, phone, company, optional note, referral code,
          and the diagnostic questions with the owner’s answers.
        </p>
        <ol className="list-decimal space-y-3 pl-5">
          <li>
            Open{" "}
            <a
              className="text-primary underline-offset-2 hover:underline"
              href="https://app.netlify.com/projects/financialclaritydiagnostic/forms"
              rel="noopener noreferrer"
            >
              Netlify → this site → Forms
            </a>
            .
          </li>
          <li>
            Select <strong>visari-intro</strong>. Turn on email notifications so
            every request hits your inbox.
          </li>
          <li>
            Forward the row to Visari (name, email, phone, company, answers).
            They schedule the free consultation. Your <code className="rounded-sm bg-bg-warm px-1 text-sm">ref</code> is on the row so you get credit.
          </li>
        </ol>
        <p className="text-muted">
          Share the diagnostic as{" "}
          <code className="rounded-sm bg-bg-warm px-1 text-sm">
            ?ref=kyle
          </code>{" "}
          so every conversation from this site is tagged to you.
        </p>
      </div>
      <Link to="/" className="mt-10 inline-flex text-sm text-muted hover:text-fg">
        Back to the diagnostic
      </Link>
    </main>
  );
}
