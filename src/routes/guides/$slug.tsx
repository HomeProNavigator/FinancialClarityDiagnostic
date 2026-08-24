import { Link, createFileRoute, notFound } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { GUIDES, guideBySlug, type Guide } from "@/lib/guides";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/guides/$slug")({
  head: ({ params }) => {
    const g = guideBySlug(params.slug);
    if (!g) {
      return pageHead({
        title: "Guide",
        description: "Financial clarity guides for growing businesses.",
        path: `/guides/${params.slug}`,
      });
    }
    return pageHead({
      title: g.title,
      description: g.description,
      path: `/guides/${g.slug}`,
    });
  },
  loader: ({ params }) => {
    const found = guideBySlug(params.slug);
    if (!found) throw notFound();
    const guide: Guide = found;
    return { guide };
  },
  component: GuidePage,
});

function GuidePage() {
  const { slug } = Route.useParams();
  const guide = guideBySlug(slug);
  if (!guide) return null;
  const others = GUIDES.filter((g) => g.slug !== guide.slug).slice(0, 3);

  return (
    <main className="mx-auto max-w-2xl px-5 py-14 sm:px-8 sm:py-20">
      <p className="text-xs uppercase tracking-[0.18em] text-subtle">
        {guide.kicker} · {guide.readMinutes} min read
      </p>
      <h1 className="mt-3 font-display text-[2.1rem] leading-[1.15] tracking-tight sm:text-4xl">
        {guide.title}
      </h1>
      <p className="mt-4 text-lg text-muted">{guide.description}</p>

      <div className="mt-10 space-y-5 text-[1.05rem] leading-[1.65] text-fg/90">
        {guide.paragraphs.map((p, i) => {
          if (guide.pull && i === 2) {
            return (
              <div key={p}>
                <p>{p}</p>
                <blockquote className="my-8 border-l-2 border-primary pl-5 font-display text-xl leading-snug tracking-tight text-primary">
                  {guide.pull}
                </blockquote>
              </div>
            );
          }
          return <p key={p}>{p}</p>;
        })}
      </div>

      <section className="mt-14 rounded-xl bg-primary px-6 py-8 text-primary-fg sm:px-8">
        <h2 className="font-display text-2xl tracking-tight">
          See where you stand
        </h2>
        <p className="mt-2 text-sm text-primary-fg/75">
          The free diagnostic turns this from a general problem into your
          score, your gaps, and an order of operations.
        </p>
        <Link
          to="/start"
          className="mt-5 inline-flex h-12 items-center justify-center rounded-md bg-primary-fg px-5 text-sm font-medium text-primary"
        >
          Get my free Financial Clarity Report
          <ArrowRight className="ml-1.5 size-4" strokeWidth={1.75} />
        </Link>
      </section>

      {others.length > 0 && (
        <section className="mt-14">
          <p className="text-xs uppercase tracking-[0.16em] text-subtle">
            Keep reading
          </p>
          <ul className="mt-4 space-y-3">
            {others.map((g) => (
              <li key={g.slug}>
                <Link
                  to="/guides/$slug"
                  params={{ slug: g.slug }}
                  className="text-fg hover:text-primary"
                >
                  {g.title}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </main>
  );
}
