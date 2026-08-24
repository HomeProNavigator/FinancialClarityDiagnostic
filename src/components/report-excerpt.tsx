import { buildSampleReport } from "@/lib/diagnostic/fallback-report";

const DIM: Record<string, string> = {
  books: "Books quality",
  cash: "Cash visibility",
  forecasting: "Forecasting",
  systems: "Systems",
  profitability: "Profitability",
};

export function ReportExcerpt({ onOpenSample }: { onOpenSample: () => void }) {
  const report = buildSampleReport();
  const finding = report.findings[0];
  const dim = finding ? DIM[finding.dimension] ?? finding.dimension : "";

  return (
    <figure className="rounded-xl bg-surface px-5 py-6 shadow-card sm:px-7 sm:py-8">
      <p className="text-xs uppercase tracking-[0.18em] text-subtle">
        Sample excerpt · $1-3M construction
      </p>
      <blockquote className="mt-4 font-display text-[1.35rem] leading-snug tracking-tight sm:text-2xl">
        {report.headline}
      </blockquote>
      <div className="mt-5 flex items-baseline gap-3">
        <span className="font-display text-4xl tabular-nums leading-none tracking-tight">
          {report.score}
        </span>
        <span className="text-xs uppercase tracking-[0.16em] text-muted">
          {report.bandLabel}
        </span>
      </div>
      {finding && (
        <div className="mt-6 border-t border-border pt-5">
          <p className="text-xs uppercase tracking-[0.14em] text-warn">
            Gap · {dim}
          </p>
          <p className="mt-1.5 font-display text-lg tracking-tight">{finding.title}</p>
          <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted">
            {finding.body}
          </p>
        </div>
      )}
      <figcaption className="mt-5">
        <button
          type="button"
          onClick={onOpenSample}
          className="text-sm text-fg underline-offset-2 hover:underline"
        >
          Read the full sample
        </button>
      </figcaption>
    </figure>
  );
}
