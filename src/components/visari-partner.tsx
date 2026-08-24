import { Link } from "@tanstack/react-router";
import {
  ConsultForm,
  ConsultThanks,
  useConsultSent,
} from "@/components/consult-form";
import { VisariMoreLine } from "@/components/visari-link";

const STRENGTHS = [
  {
    title: "The close",
    body: "Full-stack accounting and a monthly package you can use in the room — not a tax folder in March.",
  },
  {
    title: "Cash",
    body: "A real position today and a 13-week view, so a hire or a draw is a decision instead of a guess.",
  },
  {
    title: "Systems",
    body: "One source of truth. The picture stops being rebuilt from inboxes and side sheets every month.",
  },
  {
    title: "The seat at the table",
    body: "Fractional finance that can answer “can we afford this?” before you commit — not a year-end recap.",
  },
];

export function VisariPartner({
  placement,
  variant = "report",
  sample = false,
}: {
  placement: string;
  variant?: "page" | "report" | "footer";
  sample?: boolean;
}) {
  const sent = useConsultSent();
  const Heading = variant === "page" ? "h1" : "h2";
  const headingClass =
    variant === "page"
      ? "mt-3 font-display text-[2rem] leading-tight tracking-tight sm:text-4xl"
      : "mt-3 font-display text-2xl tracking-tight sm:text-3xl";

  return (
    <section className="rounded-xl bg-primary px-6 py-8 text-primary-fg sm:px-8 sm:py-10">
      <p className="text-xs uppercase tracking-[0.18em] text-primary-fg/70">
        Why Visari
      </p>
      <Heading className={headingClass}>
        {variant === "footer"
          ? "Ready for Visari to follow up?"
          : "We built this to name the gap. Visari is who closes it."}
      </Heading>
      <p className="mt-4 max-w-2xl text-[1.02rem] leading-relaxed text-primary-fg/85">
        {variant === "footer"
          ? "Same request as above. Name, email, phone, and company — we pass your diagnostic answers to Visari. They reach out to schedule a free business consultation."
          : "This diagnostic is independent of any pitch. We partner with Visari Financial because they do the job the report describes: they run the finance function for owners who have outgrown bookkeeping. Not a dashboard. Not a deck. The close, the cash view, the systems, and a partner in the decisions."}
      </p>

      {variant !== "footer" && (
        <ul className="mt-6 grid gap-4 sm:grid-cols-2">
          {STRENGTHS.map((item) => (
            <li key={item.title} className="border-t border-primary-fg/15 pt-3">
              <p className="text-sm font-medium">{item.title}</p>
              <p className="mt-1 text-sm leading-relaxed text-primary-fg/75">
                {item.body}
              </p>
            </li>
          ))}
        </ul>
      )}

      {!sent && (
        <VisariMoreLine
          placement={`${placement}-site`}
          className="mt-6 max-w-2xl text-sm leading-relaxed text-primary-fg/80"
        />
      )}

      <div className="mt-8 no-print">
        {sample ? (
          <p className="text-sm text-primary-fg/80">
            This is a sample report.{" "}
            <Link
              to="/start"
              className="underline decoration-primary-fg/40 underline-offset-2 hover:decoration-primary-fg"
            >
              Run yours
            </Link>{" "}
            to request a free consultation — we pass it to Visari, they follow
            up.
          </p>
        ) : sent ? (
          <ConsultThanks placement={placement} onPine />
        ) : (
          <div className="rounded-lg bg-bg px-5 py-6 text-fg shadow-card sm:px-6">
            <p className="text-sm leading-relaxed text-muted">
              Request a free consultation. By submitting, you ask us to share
              your contact details and these answers with Visari. Expect a
              follow-up to schedule. No second form.
            </p>
            <div className="mt-5">
              <ConsultForm placement={placement} note={variant === "page"} />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
