import { Link } from "@tanstack/react-router";
import { ClarityMark } from "@/components/mark";
import { cn } from "@/lib/cn";

export function SiteHeader({ solid = false }: { solid?: boolean }) {
  return (
    <header
      className={cn(
        "no-print sticky top-0 z-30 border-b border-transparent",
        solid
          ? "border-border bg-bg/90 backdrop-blur-md"
          : "bg-bg/80 backdrop-blur-md",
      )}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5 sm:h-[4.25rem] sm:px-8">
        <Link
          to="/"
          className="flex items-center gap-2.5 text-fg no-underline"
          aria-label="Financial Clarity Diagnostic home"
        >
          <ClarityMark className="size-8 shrink-0" />
          <span className="flex flex-col leading-none">
            <span className="font-display text-[1.05rem] tracking-tight">
              Financial Clarity
            </span>
            <span className="mt-0.5 text-[0.68rem] uppercase tracking-[0.16em] text-muted">
              Diagnostic
            </span>
          </span>
        </Link>
        <nav className="flex items-center gap-1 sm:gap-2">
          <Link
            to="/guides"
            className="hidden h-10 items-center px-3 text-sm text-muted hover:text-fg sm:inline-flex"
          >
            Guides
          </Link>
          <Link
            to="/start"
            className="inline-flex h-11 items-center rounded-md bg-primary px-4 text-sm font-medium text-primary-fg shadow-card hover:bg-primary-soft"
          >
            Get the report
          </Link>
        </nav>
      </div>
    </header>
  );
}
