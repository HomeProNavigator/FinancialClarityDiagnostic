import { Link, createFileRoute } from "@tanstack/react-router";
import { VisariPartner } from "@/components/visari-partner";
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

function ConnectPage() {
  const { placement } = Route.useSearch();
  return (
    <main className="mx-auto w-full max-w-3xl px-5 py-14 sm:px-8 sm:py-20">
      <VisariPartner placement={placement} variant="page" />
      <Link
        to="/start"
        className="mt-8 inline-flex text-sm text-muted hover:text-fg"
      >
        Get the free Financial Clarity Report
      </Link>
    </main>
  );
}
