import { useMemo, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/cn";
import { track } from "@/lib/diagnostic/analytics";
import { generateClarityReport } from "@/lib/diagnostic/generate-report";
import { QUESTIONS, type Question } from "@/lib/diagnostic/questions";
import { useDiagnosticStore } from "@/lib/diagnostic/store";
import { useHydrated } from "@/lib/diagnostic/hydrate";

const STEPS = QUESTIONS;

function isAnswered(q: Question, value?: string) {
  if (q.optional) return true;
  return Boolean(value && value.trim());
}

export function DiagnosticForm() {
  const hydrated = useHydrated();
  const navigate = useNavigate();
  const { answers, step, setAnswer, clearAnswer, setStep, markStarted, setReport } =
    useDiagnosticStore();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const q = STEPS[Math.min(step, STEPS.length - 1)];
  const total = STEPS.length;
  const progress = ((step + 1) / total) * 100;
  const value = answers[q.id] ?? "";
  const canContinue = isAnswered(q, value);

  const requiredLeft = useMemo(
    () => STEPS.filter((item) => !item.optional && !answers[item.id]).length,
    [answers],
  );

  function go(next: number) {
    setStep(Math.max(0, Math.min(total - 1, next)));
  }

  async function finish() {
    setBusy(true);
    setError(null);
    track("form_completed", { filled: Object.keys(answers).length });
    try {
      const report = await generateClarityReport({ data: { answers } });
      setReport(report);
      setStep(0);
      await navigate({ to: "/report" });
    } catch {
      setError(
        "The report could not be generated just then. Try once more — your answers are saved.",
      );
      setBusy(false);
    }
  }

  async function onNext() {
    if (step === 0) {
      markStarted();
      track("form_started");
    }
    track("form_step", { id: q.id, step });
    if (step === total - 1) {
      await finish();
      return;
    }
    go(step + 1);
  }

  if (!hydrated) {
    return (
      <div className="mx-auto max-w-xl px-5 py-16 sm:px-8">
        <div className="h-3 w-24 rounded-full bg-border" />
        <div className="mt-6 h-10 w-4/5 rounded-md bg-border/70" />
        <div className="mt-3 h-4 w-2/3 rounded-md bg-border/50" />
      </div>
    );
  }

  if (busy) {
    return (
      <div className="mx-auto max-w-xl px-5 py-16 sm:px-8 sm:py-24">
        <p className="text-xs uppercase tracking-[0.18em] text-subtle">
          Writing your report
        </p>
        <h1 className="mt-3 font-display text-3xl tracking-tight sm:text-4xl">
          Reading the signals in what you answered.
        </h1>
        <ul className="mt-8 space-y-3 text-sm text-muted">
          {[
            "Scoring books and the close",
            "Checking cash today and 30–90 days out",
            "Weighing forecast and systems maturity",
            "Writing findings a busy owner can use",
          ].map((line, i) => (
            <li
              key={line}
              className="flex items-center gap-3 rise-in"
              style={{ animationDelay: `${i * 120}ms` }}
            >
              <span className="size-1.5 rounded-full bg-primary shimmer" />
              {line}
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-xl px-5 py-10 sm:px-8 sm:py-14">
      <div className="mb-8">
        <div className="flex items-center justify-between text-xs uppercase tracking-[0.16em] text-subtle">
          <span>
            {step + 1} of {total}
          </span>
          {q.optional ? (
            <span>Optional</span>
          ) : (
            <span>About {Math.max(1, requiredLeft)} left</span>
          )}
        </div>
        <div className="mt-3 h-1 overflow-hidden rounded-full bg-border">
          <div
            className="h-full rounded-full bg-primary transition-[width] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <fieldset className="min-h-[22rem]">
        <legend className="font-display text-[1.65rem] leading-tight tracking-tight sm:text-3xl">
          {q.title}
        </legend>
        <p className="mt-3 text-[0.95rem] leading-relaxed text-muted">{q.helper}</p>

        {q.input === "choice" && q.options && (
          <div className="mt-6 grid gap-2">
            {q.options.map((opt) => {
              const selected = value === opt.value;
              return (
                <label
                  key={opt.value}
                  className={cn(
                    "flex min-h-14 cursor-pointer items-center gap-3 rounded-lg bg-surface px-4 py-3.5 text-left shadow-card transition-[box-shadow] duration-150",
                    selected
                      ? "shadow-card-hover ring-1 ring-primary"
                      : "hover:shadow-card-hover",
                  )}
                >
                  <input
                    type="radio"
                    name={q.id}
                    value={opt.value}
                    checked={selected}
                    onChange={() => setAnswer(q.id, opt.value)}
                    className="sr-only"
                  />
                  <span
                    className={cn(
                      "flex size-4 shrink-0 items-center justify-center rounded-full border",
                      selected
                        ? "border-primary bg-primary"
                        : "border-muted/40 bg-surface",
                    )}
                    aria-hidden="true"
                  >
                    {selected && (
                      <span className="size-1.5 rounded-full bg-primary-fg" />
                    )}
                  </span>
                  <span className="text-[0.95rem] leading-snug">{opt.label}</span>
                </label>
              );
            })}
          </div>
        )}

        {q.input === "select" && q.options && (
          <select
            className="mt-6 h-12 w-full rounded-md bg-surface px-3 text-base shadow-card focus:outline-none focus:ring-2 focus:ring-primary/30"
            value={value}
            onChange={(e) => {
              if (e.target.value) setAnswer(q.id, e.target.value);
              else clearAnswer(q.id);
            }}
          >
            <option value="">{q.placeholder ?? "Select"}</option>
            {q.options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        )}

        {(q.input === "text" || q.input === "email") && (
          <input
            type={q.input}
            inputMode={q.input === "email" ? "email" : "text"}
            autoComplete={q.id === "company" ? "organization" : "on"}
            placeholder={q.placeholder}
            value={value}
            onChange={(e) => {
              const next = e.target.value;
              if (next) setAnswer(q.id, next);
              else clearAnswer(q.id);
            }}
            className="mt-6 h-12 w-full rounded-md bg-surface px-4 text-base shadow-card placeholder:text-subtle focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
        )}
      </fieldset>

      {error && (
        <p className="mt-4 text-sm text-warn" role="alert">
          {error}
        </p>
      )}

      <div className="mt-8 flex items-center justify-between gap-3">
        <Button
          variant="ghost"
          onClick={() => go(step - 1)}
          disabled={step === 0}
          className={cn(step === 0 && "invisible")}
        >
          <ArrowLeft className="size-4" strokeWidth={1.75} />
          Back
        </Button>
        <div className="flex gap-2">
          {q.optional && (
            <Button
              variant="ghost"
              onClick={() => {
                clearAnswer(q.id);
                void onNext();
              }}
            >
              Skip
            </Button>
          )}
          <Button onClick={() => void onNext()} disabled={!canContinue}>
            {step === total - 1 ? "Get my report" : "Continue"}
            <ArrowRight className="size-4" strokeWidth={1.75} />
          </Button>
        </div>
      </div>
    </div>
  );
}
