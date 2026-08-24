import { useEffect, useState, type FormEvent } from "react";
import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRefCode } from "@/components/visari-link";
import {
  NETLIFY_FORM_ACTION,
  NETLIFY_FORM_NAME,
  isNetlifyHost,
  submitNetlifyForm,
} from "@/lib/diagnostic/netlify-form";
import { visariUrl } from "@/lib/diagnostic/referral";
import { useDiagnosticStore } from "@/lib/diagnostic/store";
import { buildVisariPacket } from "@/lib/diagnostic/visari-packet";
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

  const packet = buildVisariPacket(answers, report);

  useEffect(() => {
    if (answers.company) setCompany((c) => c || answers.company || "");
  }, [answers.company]);

  function goToVisari() {
    window.location.assign(
      visariUrl(
        "/contact",
        {
          utm_content: placement,
          name: name.trim(),
          email: email.trim(),
        },
        ref,
      ),
    );
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setBusy(true);
    const form = e.currentTarget;
    try {
      const recorded = await submitNetlifyForm(form);
      if (!recorded && isNetlifyHost(window.location.hostname)) {
        setError("The introduction didn’t save just then.");
        setBusy(false);
        return;
      }
    } catch {
      if (isNetlifyHost(window.location.hostname)) {
        setError("The introduction didn’t save just then.");
        setBusy(false);
        return;
      }
    }
    goToVisari();
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
        After you submit, the answers and report travel with the introduction so
        Visari does not have to reconstruct the conversation. Then you go
        straight to their contact page with the referral already on the link.
      </p>

      <form
        name={NETLIFY_FORM_NAME}
        method="POST"
        action={NETLIFY_FORM_ACTION}
        data-netlify="true"
        data-netlify-honeypot="bot-field"
        onSubmit={(e) => void onSubmit(e)}
        className="mt-10 space-y-5"
      >
        <input type="hidden" name="form-name" value={NETLIFY_FORM_NAME} />
        <p className="hidden">
          <label>
            Don’t fill this in
            <input name="bot-field" tabIndex={-1} autoComplete="off" />
          </label>
        </p>
        <input type="hidden" name="placement" value={placement} />
        <input type="hidden" name="ref" value={ref} />
        <input type="hidden" name="score" value={packet.score} />
        <input type="hidden" name="band" value={packet.band} />
        <input type="hidden" name="headline" value={packet.headline} />
        <input type="hidden" name="revenue" value={answers.revenue ?? ""} />
        <input type="hidden" name="industry" value={answers.industry ?? ""} />
        <textarea name="answers_json" hidden readOnly value={packet.answers_json} />
        <textarea name="report_summary" hidden readOnly value={packet.report_summary} />

        <label className="block">
          <span className="text-sm font-medium">Name</span>
          <input
            className={FIELD}
            name="name"
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
            name="email"
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
            name="company"
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
            name="note"
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
              onClick={goToVisari}
              className="text-sm text-muted underline-offset-2 hover:text-fg hover:underline"
            >
              Skip and go to Visari anyway
            </button>
          )}
        </div>
        <p className="text-xs leading-relaxed text-subtle">
          Submitting shares name, email, the diagnostic answers, and the report
          with Visari Financial and the referring partner.{" "}
          <Link to="/privacy" className="underline-offset-2 hover:underline">
            Privacy
          </Link>
          .
        </p>
      </form>
    </main>
  );
}
