import { Link, createFileRoute } from "@tanstack/react-router";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/privacy")({
  head: () =>
    pageHead({
      title: "Privacy",
      description:
        "Privacy note for the Financial Clarity Diagnostic. We collect as little as possible. Answers stay on your device unless you choose to share them.",
      path: "/privacy",
    }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <main className="mx-auto max-w-2xl px-5 py-14 sm:px-8 sm:py-20">
      <p className="text-xs uppercase tracking-[0.18em] text-subtle">Privacy</p>
      <h1 className="mt-3 font-display text-4xl tracking-tight">
        As little as possible, on purpose.
      </h1>
      <div className="mt-8 space-y-5 text-[1.02rem] leading-relaxed text-fg/90">
        <p>
          This diagnostic is built to be useful without becoming a lead-capture
          trap. Required questions are about how the business is run. Name,
          email, industry, and state are optional and can be skipped.
        </p>
        <p>
          Answers and your report are stored in this browser so you can refresh
          the report page. They are not written to a public database. If you
          submit the form, the answers are sent once to generate the narrative
          — then discarded on the server.
        </p>
        <p>
          We do not sell data. We do not add optional email addresses to a
          marketing list. The “email summary” button opens your own mail client
          with a copy of the findings.
        </p>
        <p>
          If you choose “Start the conversation,” you land on a short
          introduction form (name and email, optional company and note). That
          record — including your diagnostic answers and the report — is stored
          as a Netlify form submission so Visari Financial and the referring
          partner can follow up. Then you are sent to Visari’s contact page with
          the referral tagged on the URL.
        </p>
        <p>
          If you arrived with a referral code in the URL (
          <code className="rounded-sm bg-bg-warm px-1 text-sm">?ref=</code>
          ), that code is stored on this device so the person who sent you can
          be credited. The code is a tracking parameter, not a profile.
        </p>
        <p>
          Basic analytics (form started, form completed, report viewed, CTA
          clicked) stay on this device unless you later add your own analytics
          tag.
        </p>
        <p>
          Questions: write{" "}
          <a
            className="text-primary underline-offset-2 hover:underline"
            href="mailto:clientsuccess@visarifinancial.com"
          >
            clientsuccess@visarifinancial.com
          </a>
          .
        </p>
      </div>
      <Link
        to="/"
        className="mt-10 inline-flex text-sm text-muted hover:text-fg"
      >
        Back to the diagnostic
      </Link>
    </main>
  );
}
