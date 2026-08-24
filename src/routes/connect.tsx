import { useEffect, useState, type FormEvent } from "react";
import { Link, createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { useRefCode } from "@/components/visari-link";
import {
  NETLIFY_FORM_ACTION,
  NETLIFY_FORM_NAME,
  isNetlifyHost,
  submitNetlifyForm,
} from "@/lib/diagnostic/netlify-form";
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
      title: "Request a Visari consultation",
      description:
        "Share your name, email, phone, and company. We pass your diagnostic answers to Visari Financial so they can follow up for a free business consultation.",
      path: "/connect",
      robots: "noindex,nofollow",
    }),
  component: ConnectPage,
});

const FIELD =
  "mt-1.5 h-12 w-full rounded-md bg-surface px-4 text-base shadow-card placeholder:text-subtle focus:outline-none focus:ring-2 focus:ring-primary/30";

function phoneDigits(value: string) {
  return value.replace(/\D/g, "");
}

function ConnectPage() {
  const { placement } = Route.useSearch();
  const ref = useRefCode();
  const storedAnswers = useDiagnosticStore((s) => s.answers);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [note, setNote] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [sent, setSent] = useState(false);

  const packet = buildVisariPacket(storedAnswers);

  useEffect(() => {
    if (storedAnswers.company) setCompany((c) => c || storedAnswers.company || "");
  }, [storedAnswers.company]);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    if (phoneDigits(phone).length < 10) {
      setError("Add a phone number Visari can actually reach.");
      return;
    }
    setBusy(true);
    const form = e.currentTarget;
    try {
      const recorded = await submitNetlifyForm(form);
      if (!recorded && isNetlifyHost(window.location.hostname)) {
        setError("The request didn’t save just then. Try once more.");
        setBusy(false);
        return;
      }
    } catch {
      if (isNetlifyHost(window.location.hostname)) {
        setError("The request didn’t save just then. Try once more.");
        setBusy(false);
        return;
      }
    }
    setBusy(false);
    setSent(true);
  }

  if (sent) {
    return (
      <main className="mx-auto w-full max-w-xl px-5 py-14 sm:px-8 sm:py-20">
        <p className="text-xs uppercase tracking-[0.18em] text-subtle">
          Request received
        </p>
        <h1 className="mt-3 font-display text-[2rem] leading-tight tracking-tight sm:text-4xl">
          Visari will follow up.
        </h1>
        <p className="mt-4 text-[1.05rem] leading-relaxed text-muted">
          We passed your name, email, phone, company, and diagnostic answers to
          Visari Financial. Expect a note from them to schedule a free business
          consultation. Nothing else to fill out.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
          <Link
            to="/report"
            className="inline-flex h-12 items-center justify-center rounded-md bg-primary px-5 text-sm font-medium text-primary-fg"
          >
            Back to your report
          </Link>
          <Link to="/" className="text-sm text-muted underline-offset-2 hover:underline">
            Home
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto w-full max-w-xl px-5 py-14 sm:px-8 sm:py-20">
      <p className="text-xs uppercase tracking-[0.18em] text-subtle">
        Free consultation
      </p>
      <h1 className="mt-3 font-display text-[2rem] leading-tight tracking-tight sm:text-4xl">
        Ask Visari to follow up.
      </h1>
      <p className="mt-4 text-[1.05rem] leading-relaxed text-muted">
        Visari Financial is a fractional finance partner for owners who have
        outgrown bookkeeping. They install the close, the cash view, the
        systems, and the advisory cadence — financial clarity, fully executed.
      </p>

      <ul className="mt-6 space-y-2 text-sm leading-relaxed text-fg/90">
        <li>Full-stack accounting with a monthly close you can trust.</li>
        <li>Cash visibility today and 13 weeks out — not a glance at the bank.</li>
        <li>Forecasting, systems, and a partner in the decisions, not a year-end recap.</li>
      </ul>

      <p className="mt-6 text-[1.05rem] leading-relaxed text-muted">
        Submit this form and we pass your contact details plus the diagnostic
        answers to Visari. They reach out to schedule a free business
        consultation. You will not be sent to another form.
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
        <textarea name="answers" hidden readOnly value={packet.answers} />

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
          <span className="text-sm font-medium">Phone</span>
          <input
            className={FIELD}
            type="tel"
            name="phone"
            inputMode="tel"
            autoComplete="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            placeholder="(702) 555-0140"
          />
        </label>
        <label className="block">
          <span className="text-sm font-medium">Company</span>
          <input
            className={FIELD}
            name="company"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            autoComplete="organization"
            required
            minLength={2}
            placeholder="Hale Builders"
          />
        </label>
        <label className="block">
          <span className="text-sm font-medium">
            Anything Visari should know?{" "}
            <span className="font-normal text-subtle">optional</span>
          </span>
          <textarea
            className="mt-1.5 min-h-[7rem] w-full rounded-md bg-surface px-4 py-3 text-base shadow-card placeholder:text-subtle focus:outline-none focus:ring-2 focus:ring-primary/30"
            name="note"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            maxLength={600}
            placeholder="Cash surprises, a close you don’t trust, a hire you’re not sure you can afford…"
          />
        </label>

        {error && (
          <p className="text-sm text-warn" role="alert">
            {error}
          </p>
        )}

        <Button type="submit" disabled={busy} className="h-12">
          {busy ? "Sending…" : "Request a free consultation"}
        </Button>
        <p className="text-xs leading-relaxed text-subtle">
          By submitting, you ask us to share your name, email, phone, company,
          and diagnostic answers with Visari Financial so they can follow up
          about a free business consultation.{" "}
          <Link to="/privacy" className="underline-offset-2 hover:underline">
            Privacy
          </Link>
          .
        </p>
      </form>
    </main>
  );
}
