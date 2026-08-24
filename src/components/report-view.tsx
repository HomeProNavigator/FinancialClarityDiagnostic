import { useMemo } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, Download, Mail, Printer } from "lucide-react";
import { ScoreRing } from "@/components/score-ring";
import { VisariPartner } from "@/components/visari-partner";
import { Button } from "@/components/ui/button";
import { track } from "@/lib/diagnostic/analytics";
import {
  FRICTION_LABEL,
  INDUSTRY_LABEL,
  REVENUE_LABEL,
} from "@/lib/diagnostic/questions";
import type { ClarityReport, ReportFinding } from "@/lib/diagnostic/types";
import { cn } from "@/lib/cn";

const SEV: Record<ReportFinding["severity"], { label: string; className: string }> = {
  gap: { label: "Gap", className: "text-warn bg-warn/10" },
  watch: { label: "Watch", className: "text-watch bg-watch/10" },
  strength: { label: "Strength", className: "text-good bg-good/10" },
};

function summaryMailto(report: ClarityReport) {
  const lines = [
    report.headline,
    "",
    `Clarity Score: ${report.score} (${report.bandLabel})`,
    "",
    report.scoreExplanation,
    "",
    "Key findings:",
    ...report.findings.map((f) => `• ${f.title}: ${f.body}`),
    "",
    "Next steps:",
    ...report.nextSteps.map((s) => `• ${s.title} (${s.timeframe})`),
    "",
    "If you want Visari to follow up for a free consultation, use the request on your report. They reach out. No second form.",
  ];
  const params = new URLSearchParams({
    subject: `Your Financial Clarity Report: ${report.score} ${report.bandLabel}`,
    body: lines.join("\n"),
  });
  return `mailto:?${params.toString()}`;
}

export function ReportView({
  report,
  sample = false,
}: {
  report: ClarityReport;
  sample?: boolean;
}) {
  const meta = useMemo(() => {
    const bits = [
      report.answers.revenue ? REVENUE_LABEL[report.answers.revenue] : null,
      report.answers.industry ? INDUSTRY_LABEL[report.answers.industry] : null,
      report.answers.state ?? null,
    ].filter(Boolean);
    return bits.join(" · ");
  }, [report.answers]);

  const date = new Date(report.generatedAt).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  function savePdf() {
    track("pdf_clicked", { sample });
    window.print();
  }

  function emailReport() {
    track("email_clicked", { sample });
    window.location.href = summaryMailto(report);
  }

  return (
    <article className="mx-auto max-w-3xl px-5 pb-20 pt-8 sm:px-8 sm:pt-12">
      <div className="no-print mb-8 flex flex-wrap items-center justify-between gap-3">
        <Link
          to="/"
          className="inline-flex h-10 items-center gap-1.5 text-sm text-muted hover:text-fg"
        >
          <ArrowLeft className="size-4" strokeWidth={1.75} />
          Home
        </Link>
        <div className="flex flex-wrap gap-2">
          <Button variant="secondary" size="sm" onClick={savePdf}>
            <Printer className="size-4" strokeWidth={1.75} />
            Save as PDF
          </Button>
          <Button variant="secondary" size="sm" onClick={emailReport}>
            <Mail className="size-4" strokeWidth={1.75} />
            Email summary
          </Button>
        </div>
      </div>

      {sample && (
        <p className="no-print mb-6 rounded-md bg-bg-warm px-4 py-3 text-sm text-muted">
          This is a sample for a $1-3M construction company.{" "}
          <Link to="/start" className="text-primary underline-offset-2 hover:underline">
            Run yours in three minutes
          </Link>
          .
        </p>
      )}

      <header className="print-break">
        <p className="text-xs uppercase tracking-[0.18em] text-subtle">
          Financial Clarity Report · {date}
        </p>
        <h1 className="mt-3 font-display text-[2rem] leading-[1.15] tracking-tight sm:text-4xl">
          {report.headline}
        </h1>
        {meta && <p className="mt-3 text-sm text-muted">{meta}</p>}
        {report.answers.friction && (
          <p className="mt-1 text-sm text-muted">
            Sharpest friction named:{" "}
            {FRICTION_LABEL[report.answers.friction] ?? report.answers.friction}
          </p>
        )}
      </header>

      <section className="print-break mt-10 flex flex-col items-center gap-6 sm:grid sm:grid-cols-[auto_1fr] sm:items-center sm:gap-8">
        <ScoreRing score={report.score} band={report.band} className="shrink-0" />
        <div className="w-full">
          <p className="text-xs uppercase tracking-[0.18em] text-subtle">
            Overall · {report.bandLabel}
          </p>
          <p className="mt-3 text-[1.05rem] leading-relaxed text-fg">
            {report.scoreExplanation}
          </p>
        </div>
      </section>

      <div className="mt-14 no-print">
        <VisariPartner placement="report-top" variant="report" sample={sample} />
      </div>

      <section className="print-break mt-12 hidden print:block">
        <h2 className="font-display text-2xl tracking-tight">Why Visari</h2>
        <p className="mt-3 leading-relaxed text-fg/90">
          This diagnostic names whether the finance function is keeping up.
          Visari Financial is the partner we send owners to for the close, the
          cash view, the systems, and a seat in the decisions. For more on the
          firm, visit https://visarifinancial.com.
        </p>
      </section>

      <section className="print-break mt-12">
        <h2 className="font-display text-2xl tracking-tight">Five signals</h2>
        <ul className="mt-5 space-y-4">
          {report.dimensions.map((d) => (
            <li key={d.id}>
              <div className="flex items-baseline justify-between gap-3">
                <span className="text-sm font-medium">{d.label}</span>
                <span className="font-mono text-sm tabular-nums text-muted">
                  {d.score}
                </span>
              </div>
              <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-border">
                <div
                  className="h-full rounded-full bg-primary"
                  style={{ width: `${d.score}%` }}
                />
              </div>
              <p className="mt-2 text-sm text-muted">{d.blurb}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-14">
        <h2 className="font-display text-2xl tracking-tight">Key findings</h2>
        <ol className="mt-6 space-y-8">
          {report.findings.map((f, i) => (
            <li key={`${f.dimension}-${i}`} className="print-break">
              <div className="flex items-center gap-2">
                <span
                  className={cn(
                    "inline-flex h-6 items-center rounded-full px-2 text-[0.68rem] font-medium uppercase tracking-[0.12em]",
                    SEV[f.severity].className,
                  )}
                >
                  {SEV[f.severity].label}
                </span>
                <span className="text-xs uppercase tracking-[0.14em] text-subtle">
                  {f.dimension}
                </span>
              </div>
              <h3 className="mt-2 font-display text-xl tracking-tight">{f.title}</h3>
              <p className="mt-2 leading-relaxed text-fg/90">{f.body}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="print-break mt-14 rounded-xl bg-surface px-6 py-8 shadow-card sm:px-8">
        <h2 className="font-display text-2xl tracking-tight">
          What good looks like at this stage
        </h2>
        <p className="mt-3 leading-relaxed text-fg/90">{report.whatGoodLooksLike}</p>
      </section>

      <section className="mt-14">
        <h2 className="font-display text-2xl tracking-tight">Next steps, in order</h2>
        <ol className="mt-6 space-y-6">
          {report.nextSteps.map((s, i) => (
            <li key={s.title} className="print-break flex gap-4">
              <span className="font-display text-2xl tabular-nums text-primary/50">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <p className="text-xs uppercase tracking-[0.16em] text-subtle">
                  {s.timeframe}
                </p>
                <h3 className="mt-1 font-display text-xl tracking-tight">{s.title}</h3>
                <p className="mt-2 leading-relaxed text-fg/90">{s.detail}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <p className="mt-12 text-[1.05rem] leading-relaxed text-muted">
        {report.closingNote}
      </p>

      <div className="mt-14 no-print">
        <VisariPartner placement="report-bottom" variant="footer" sample={sample} />
      </div>

      <div className="no-print mt-8">
        <Button variant="secondary" onClick={savePdf}>
          <Download className="size-4" strokeWidth={1.75} />
          Save as PDF
        </Button>
      </div>
    </article>
  );
}
