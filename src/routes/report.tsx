import { useEffect } from "react";
import { Link, createFileRoute } from "@tanstack/react-router";
import { ReportView } from "@/components/report-view";
import { track } from "@/lib/diagnostic/analytics";
import { useHydrated } from "@/lib/diagnostic/hydrate";
import { useDiagnosticStore } from "@/lib/diagnostic/store";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/report")({
  head: () =>
    pageHead({
      title: "Your Financial Clarity Report",
      description:
        "Your personalized Financial Clarity Report — score, findings, and next steps for books, cash, forecasting, and systems.",
      path: "/report",
    }),
  component: ReportPage,
});

function ReportPage() {
  const hydrated = useHydrated();
  const report = useDiagnosticStore((s) => s.report);

  useEffect(() => {
    if (report) {
      track("report_viewed", {
        score: report.score,
        source: report.source,
      });
    }
  }, [report]);

  if (!hydrated) {
    return (
      <main className="mx-auto max-w-3xl px-5 py-16">
        <div className="h-4 w-40 rounded-full bg-border" />
        <div className="mt-6 h-12 w-4/5 rounded-md bg-border/70" />
        <div className="mt-4 h-24 rounded-xl bg-border/40" />
      </main>
    );
  }

  if (!report) {
    return (
      <main className="mx-auto max-w-lg px-5 py-20 text-center">
        <h1 className="font-display text-3xl tracking-tight">
          No report on this device yet.
        </h1>
        <p className="mt-3 text-muted">
          The diagnostic takes under three minutes. Your answers stay here unless
          you choose to share them.
        </p>
        <Link
          to="/start"
          className="mt-8 inline-flex h-12 items-center justify-center rounded-md bg-primary px-5 text-sm font-medium text-primary-fg"
        >
          Get my free report
        </Link>
      </main>
    );
  }

  return (
    <main>
      <ReportView report={report} sample={report.source === "sample"} />
    </main>
  );
}
