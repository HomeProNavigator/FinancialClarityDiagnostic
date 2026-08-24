import { useEffect, useState, type FormEvent } from "react";
import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRefCode } from "@/components/visari-link";
import { logHandoffEvent, submitIntroduction } from "@/lib/diagnostic/handoff";
import { DEFAULT_REF, captureReferralFromWindow, visariUrl } from "@/lib/diagnostic/referral";
import { useDiagnosticStore } from "@/lib/diagnostic/store";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/connect")({
  validateSearch: (search: Record<string, unknown>) => ({
    placement:
      typeof search.placement === "string" && search.placement.trim()
        ? search.placement.trim().slice(0, 80)
        : "direct",
  }),
  head: () =>
    pageHead({
      title: "Connect with Visari",
      description:
        "Leave a name and email, then continue to Visari Financial. The referring partner is credited on the conversation.",
      path: "/connect",
      robots: "noindex,nofollow",
    }),
  component: ConnectPage,
});

const FIELD =
  "mt-1.5 h-12 w-full rounded-md bg-surface px-4 text-base shadow-card placeholder:text-subtle focus:outline-none focus:ring-2 focus:ring-primary/30";

function ConnectPage() {
  const { placement } = Route.useSearch();
  const ref = useRefCode();
  const answers = useDiagnosticStore((s) => s.answers);
  const report = useDiagnosticStore((s) => s.report);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [note, setNote] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (answers.firstName) setName((n) => n || answers.firstName || "");
    if (answers.email) setEmail((e) => e || answers.email || "");
  }, [answers.firstName, answers.email]);

  useEffect(() => {
    const key = `fcd_open_${placement}`;
    try {
      if (sessionStorage.getItem(key)) return;
      sessionStorage.setItem(key, "1");
    } catch {
      /* private mode */
    }
    const code = captureReferralFromWindow() ?? DEFAULT_REF;
    void logHandoffEvent({
      data: { kind: "opened", placement, refCode: code },
    });
  }, [placement]);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setBusy(true);
    try {
      const result = await submitIntroduction({
        data: {
          name,
          email,
          company,
          note,
          placement,
          refCode: ref,
          score: report?.score ?? null,
          revenueBand: answers.revenue ?? "",
          industry: answers.industry ?? "",
        },
      });
      if (!result.ok) {
        setError(result.error);
        setBusy(false);
        return;
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not save the introduction.");
      setBusy(false);
      return;
    }
    const dest = visariUrl(
      "/contact",
      {
        utm_content: placement,
        name: name.trim(),
        email: email.trim(),
      },
      ref,
    );
    window.location.assign(dest);
  }

  function skipToVisari() {
    window.location.assign(
      visariUrl("/contact", { utm_content: `${placement}-skip` }, ref),
    );
  }

  return (
    <main className="mx-auto w-full max-w-xl px-5 py-14 sm:px-8 sm:py-20">
      <p className="text-xs uppercase tracking-[0.18em] text-subtle">
        Introduction
      </p>
      <h1 className="mt-3 font-display text-[2rem] leading-tight tracking-tight sm:text-4xl">
        A name and email, then Visari.
      </h1>
      <p className="mt-4 text-[1.05rem] leading-relaxed text-muted">
        This is how the conversation is credited to the partner who sent you.
        Visari sees it on their contact page; we keep a copy so nobody has to
        reconstruct who clicked.
      </p>

      <form onSubmit={(e) => void onSubmit(e)} className="mt-10 space-y-5">
        <label className="block">
          <span className="text-sm font-medium">Name</span>
          <input
            className={FIELD}
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoComplete="name"
            required
            minLength={2}
            placeholder="Jordan Hale"
          />
        </label>
        <label className="block">
          <span className="text-sm font-medium">Email</span>
          <input
            className={FIELD}
            type="email"
            inputMode="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="you@company.com"
          />
        </label>
        <label className="block">
          <span className="text-sm font-medium">
            Company <span className="font-normal text-subtle">optional</span>
          </span>
          <input
            className={FIELD}
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            autoComplete="organization"
            placeholder="Hale Builders"
          />
        </label>
        <label className="block">
          <span className="text-sm font-medium">
            What do you want help with?{" "}
            <span className="font-normal text-subtle">optional</span>
          </span>
          <textarea
            className="mt-1.5 min-h-[7rem] w-full rounded-md bg-surface px-4 py-3 text-base shadow-card placeholder:text-subtle focus:outline-none focus:ring-2 focus:ring-primary/30"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            maxLength={600}
            placeholder="Cash visibility, a real close, a forecast the bank will believe…"
          />
        </label>

        {error && (
          <p className="text-sm text-warn" role="alert">
            {error} You can still continue to Visari below.
          </p>
        )}

        <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:items-center">
          <Button type="submit" disabled={busy} className="h-12">
            {busy ? "Connecting…" : "Continue to Visari"}
            <ArrowUpRight className="size-4" strokeWidth={1.75} />
          </Button>
          {error && (
            <button
              type="button"
              onClick={skipToVisari}
              className="text-sm text-muted underline-offset-2 hover:text-fg hover:underline"
            >
              Skip and go to Visari anyway
            </button>
          )}
        </div>
        <p className="text-xs leading-relaxed text-subtle">
          Submitting shares name, email, and your note with Visari Financial and
          the referring partner. The diagnostic itself is still private unless
          you already chose to include it.{" "}
          <Link to="/privacy" className="underline-offset-2 hover:underline">
            Privacy
          </Link>
          .
        </p>
      </form>
    </main>
  );
}
