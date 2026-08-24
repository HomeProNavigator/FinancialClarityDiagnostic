import { useEffect, useState, type FormEvent } from "react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { useRefCode, VisariMoreLine } from "@/components/visari-link";
import {
  NETLIFY_FORM_ACTION,
  NETLIFY_FORM_NAME,
  isNetlifyHost,
  submitNetlifyForm,
} from "@/lib/diagnostic/netlify-form";
import { useDiagnosticStore } from "@/lib/diagnostic/store";
import { buildVisariPacket } from "@/lib/diagnostic/visari-packet";

const SENT_KEY = "fcd_consult_sent";
const SENT_EVENT = "fcd-consult-sent";

const FIELD =
  "mt-1.5 h-12 w-full rounded-md bg-surface px-4 text-base shadow-card placeholder:text-subtle focus:outline-none focus:ring-2 focus:ring-primary/30";

function phoneDigits(value: string) {
  return value.replace(/\D/g, "");
}

function readSent() {
  try {
    return sessionStorage.getItem(SENT_KEY) === "1";
  } catch {
    return false;
  }
}

function markSent() {
  try {
    sessionStorage.setItem(SENT_KEY, "1");
  } catch {
    /* private mode */
  }
  window.dispatchEvent(new Event(SENT_EVENT));
}

export function ConsultForm({
  placement,
  note = false,
}: {
  placement: string;
  note?: boolean;
}) {
  const ref = useRefCode();
  const answers = useDiagnosticStore((s) => s.answers);
  const packet = buildVisariPacket(answers);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [noteText, setNoteText] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    setSent(readSent());
    const onSent = () => setSent(true);
    window.addEventListener(SENT_EVENT, onSent);
    return () => window.removeEventListener(SENT_EVENT, onSent);
  }, []);

  useEffect(() => {
    if (answers.company) setCompany((c) => c || answers.company || "");
  }, [answers.company]);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    if (phoneDigits(phone).length < 10) {
      setError("Add a phone number Visari can actually reach.");
      return;
    }
    setBusy(true);
    try {
      const recorded = await submitNetlifyForm(e.currentTarget);
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
    markSent();
    setSent(true);
  }

  if (sent) {
    return (
      <div className="rounded-xl bg-bg-warm px-5 py-6 sm:px-6">
        <p className="text-xs uppercase tracking-[0.18em] text-subtle">
          Request received
        </p>
        <p className="mt-2 font-display text-xl tracking-tight">
          Visari will follow up.
        </p>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          We passed your contact details and diagnostic answers to Visari
          Financial. Expect a note to schedule a free business consultation.
        </p>
        <VisariMoreLine
          placement={`${placement}-thanks`}
          className="mt-3 text-sm leading-relaxed text-muted"
        />
      </div>
    );
  }

  return (
    <form
      name={NETLIFY_FORM_NAME}
      method="POST"
      action={NETLIFY_FORM_ACTION}
      data-netlify="true"
      data-netlify-honeypot="bot-field"
      onSubmit={(e) => void onSubmit(e)}
      className="space-y-4"
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

      <div className="grid gap-4 sm:grid-cols-2">
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
      </div>

      {note && (
        <label className="block">
          <span className="text-sm font-medium">
            Anything Visari should know?{" "}
            <span className="font-normal text-subtle">optional</span>
          </span>
          <textarea
            className="mt-1.5 min-h-28 w-full rounded-md bg-surface px-4 py-3 text-base shadow-card placeholder:text-subtle focus:outline-none focus:ring-2 focus:ring-primary/30"
            name="note"
            value={noteText}
            onChange={(e) => setNoteText(e.target.value)}
            maxLength={600}
            placeholder="Cash surprises, a close you don’t trust, a hire you’re not sure you can afford…"
          />
        </label>
      )}

      {error && (
        <p className="text-sm text-warn" role="alert">
          {error}
        </p>
      )}

      <div className="flex flex-col gap-3 pt-1 sm:flex-row sm:items-center">
        <Button type="submit" disabled={busy} className="h-12">
          {busy ? "Sending…" : "Request a free consultation"}
        </Button>
        <p className="text-xs leading-relaxed text-subtle">
          We share this with Visari so they can follow up.{" "}
          <Link to="/privacy" className="underline-offset-2 hover:underline">
            Privacy
          </Link>
        </p>
      </div>
    </form>
  );
}
