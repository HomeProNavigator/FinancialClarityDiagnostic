import { Link } from "@tanstack/react-router";
import { ClarityMark } from "@/components/mark";
import { VisariLink, VisariSiteLink } from "@/components/visari-link";

export function SiteFooter() {
  return (
    <footer className="no-print mt-auto border-t border-border bg-bg-warm/50">
      <div className="mx-auto grid max-w-2xl gap-10 px-5 py-12 sm:max-w-6xl sm:px-8 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-2.5">
            <ClarityMark className="size-7" />
            <p className="font-display text-lg tracking-tight">Financial Clarity</p>
          </div>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted">
            A free diagnostic for growing U.S. businesses. Built to surface gaps
            in books, cash, forecasting, and systems.
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
              <Link to="/advisors" className="text-fg hover:text-primary">
                For advisors
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
          <p className="text-xs uppercase tracking-[0.16em] text-subtle">
            In partnership with
          </p>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <VisariSiteLink
                placement="footer-home"
                className="text-fg hover:text-primary"
              >
                Visari Financial
              </VisariSiteLink>
            </li>
            <li>
              <VisariLink
                placement="footer-contact"
                className="text-fg hover:text-primary"
              >
                Request a consultation
              </VisariLink>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border">
        <p className="mx-auto max-w-6xl px-5 py-5 text-xs leading-relaxed text-subtle sm:px-8">
          © {new Date().getFullYear()} Financial Clarity Diagnostic. Free for
          business owners in the United States. Educational information only —
          not personalized financial, tax, accounting, or legal advice, and not
          an offer of advisory services. A consult with Visari Financial is
          optional and only if you ask.
        </p>
      </div>
    </footer>
  );
}
