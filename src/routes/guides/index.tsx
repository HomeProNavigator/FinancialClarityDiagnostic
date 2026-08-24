import { Link, createFileRoute } from "@tanstack/react-router";
import { GUIDES } from "@/lib/guides";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/guides/")({
  head: () =>
    pageHead({
      title: "Guides for growing business owners",
      description:
        "Plain-English notes on cash tightness, lagging finance functions, forecasting readiness, and when bookkeeping is no longer enough.",
      path: "/guides",
    }),
  component: GuidesIndex,
});

function GuidesIndex() {
  return (
    <main className="mx-auto max-w-3xl px-5 py-14 sm:px-8 sm:py-20">
      <p className="text-xs uppercase tracking-[0.18em] text-subtle">Guides</p>
      <h1 className="mt-3 font-display text-4xl tracking-tight">
        Questions owners actually ask
      </h1>
      <p className="mt-4 max-w-xl text-muted">
        Short field notes, not blog filler. Each one ends where it should: the
        free diagnostic.
      </p>
      <ul className="mt-10 space-y-4">
        {GUIDES.map((g) => (
          <li key={g.slug}>
            <Link
              to="/guides/$slug"
              params={{ slug: g.slug }}
              className="block rounded-xl bg-surface px-6 py-6 shadow-card hover:shadow-card-hover"
            >
              <p className="text-xs uppercase tracking-[0.16em] text-subtle">
                {g.kicker} · {g.readMinutes} min
              </p>
              <h2 className="mt-2 font-display text-2xl tracking-tight">
                {g.title}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {g.description}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
