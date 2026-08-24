import { ArrowRight } from "lucide-react";
import { VisariLink } from "@/components/visari-link";

export function VisariCta({
  placement,
  compact = false,
}: {
  placement: string;
  compact?: boolean;
}) {
  if (compact) {
    return (
      <VisariLink
        placement={placement}
        className="inline-flex h-12 items-center justify-center gap-1.5 rounded-md bg-primary px-5 text-sm font-medium text-primary-fg shadow-card hover:bg-primary-soft"
      >
        Request a free consultation
        <ArrowRight className="size-4" strokeWidth={1.75} />
      </VisariLink>
    );
  }

  return (
    <section className="print-break rounded-xl bg-primary px-6 py-8 text-primary-fg sm:px-10 sm:py-10">
      <p className="text-xs uppercase tracking-[0.18em] text-primary-fg/70">
        Financial clarity, fully executed
      </p>
      <h2 className="mt-3 max-w-xl font-display text-2xl tracking-tight sm:text-3xl">
        Visari installs the finance function this report just measured.
      </h2>
      <p className="mt-4 max-w-xl text-[0.95rem] leading-relaxed text-primary-fg/80">
        Fractional finance for owners navigating growth: a real monthly close,
        cash you can see 13 weeks out, systems that stop the re-keying, and a
        partner in the decisions — not a year-end recap. Request a consult and
        Visari will follow up. No second form.
      </p>
      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <VisariLink
          placement={placement}
          className="inline-flex h-12 items-center justify-center gap-1.5 rounded-md bg-primary-fg px-5 text-sm font-medium text-primary hover:bg-bg"
        >
          Request a free consultation
          <ArrowRight className="size-4" strokeWidth={1.75} />
        </VisariLink>
        <p className="text-xs text-primary-fg/65">
          We pass your answers to Visari. They reach out to schedule.
        </p>
      </div>
    </section>
  );
}
