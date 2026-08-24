import { createFileRoute } from "@tanstack/react-router";
import { DiagnosticForm } from "@/components/diagnostic-form";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/start")({
  head: () =>
    pageHead({
      title: "Start your free Financial Clarity Report",
      description:
        "Answer nine questions about books, cash flow, forecasting, and systems. Get a personalized Financial Clarity Report in under three minutes.",
      path: "/start",
    }),
  component: StartPage,
});

function StartPage() {
  return (
    <main className="flex-1">
      <DiagnosticForm />
    </main>
  );
}
