import { ArrowUpRight } from "lucide-react";
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
        Talk with Visari
        <ArrowUpRight className="size-4" strokeWidth={1.75} />
      </VisariLink>
    );
  }

  return (
    <section className="print-break rounded-xl bg-primary px-6 py-8 text-primary-fg sm:px-10 sm:py-10">
      <p className="text-xs uppercase tracking-[0.18em] text-primary-fg/70">
        Ready for full execution?
      </p>
      <h2 className="mt-3 max-w-xl font-display text-2xl tracking-tight sm:text-3xl">
        Most firms help you understand where the business has been. Visari helps
        you understand where it is going.
      </h2>
      <p className="mt-4 max-w-xl text-[0.95rem] leading-relaxed text-primary-fg/80">
        If this report named a gap you already feel — books that lag, cash that
        surprises, a forecast that does not exist — Visari Financial is the
        partner that installs the close, the cash view, the systems, and the
        advisory cadence so the picture stays clear.
      </p>
      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <VisariLink
          placement={placement}
          className="inline-flex h-12 items-center justify-center gap-1.5 rounded-md bg-primary-fg px-5 text-sm font-medium text-primary hover:bg-bg"
        >
          Start the conversation
          <ArrowUpRight className="size-4" strokeWidth={1.75} />
        </VisariLink>
        <p className="text-xs text-primary-fg/65">
          Calm, specific, no pitch deck. A conversation about what the business
          actually needs.
        </p>
      </div>
    </section>
  );
}
