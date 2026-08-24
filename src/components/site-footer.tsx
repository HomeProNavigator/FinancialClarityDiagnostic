import { Link } from "@tanstack/react-router";
import { ClarityMark } from "@/components/mark";
import { VisariLink } from "@/components/visari-link";

export function SiteFooter() {
  return (
    <footer className="no-print mt-auto border-t border-border bg-bg-warm/50">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-12 sm:px-8 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2.5">
            <ClarityMark className="size-7" />
            <p className="font-display text-lg tracking-tight">Financial Clarity</p>
          </div>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted">
            A free diagnostic for growing U.S. businesses. Built to surface gaps
            in books, cash, forecasting, and systems — and to point toward a
            finance function that can keep up.
          </p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.16em] text-subtle">Explore</p>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <Link to="/start" className="text-fg hover:text-primary">
                Take the diagnostic
              </Link>
            </li>
            <li>
              <Link to="/guides" className="text-fg hover:text-primary">
                Guides
              </Link>
            </li>
            <li>
              <Link to="/privacy" className="text-fg hover:text-primary">
                Privacy
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.16em] text-subtle">Partner</p>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <a
                href="https://visarifinancial.com"
                className="text-fg hover:text-primary"
                rel="noopener noreferrer"
              >
                Visari Financial
              </a>
            </li>
            <li>
              <VisariLink
                placement="footer-contact"
                className="text-fg hover:text-primary"
              >
                Request a consultation
              </VisariLink>
            </li>
            <li>
              <Link to="/inbox" className="text-fg hover:text-primary">
                Partner inbox
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-5 py-5 text-xs text-subtle sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <p>
            © {new Date().getFullYear()} Financial Clarity Diagnostic. Free for
            business owners in the United States.
          </p>
          <p>
            Referring partners: append{" "}
            <code className="rounded-sm bg-surface px-1 py-0.5 text-[0.7rem] text-fg">
              ?ref=yourcode
            </code>{" "}
            so conversations can be attributed.
          </p>
        </div>
      </div>
    </footer>
  );
}
