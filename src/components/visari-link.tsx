import {
  type AnchorHTMLAttributes,
  type ReactNode,
  useEffect,
  useState,
} from "react";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import {
  DEFAULT_REF,
  captureReferralFromWindow,
  visariUrl,
} from "@/lib/diagnostic/referral";
import { track } from "@/lib/diagnostic/analytics";
import { cn } from "@/lib/cn";

export function useRefCode() {
  const [ref, setRef] = useState(DEFAULT_REF);
  useEffect(() => {
    setRef(captureReferralFromWindow() ?? DEFAULT_REF);
  }, []);
  return ref;
}

export function visariHomeHref(placement: string, ref: string) {
  return visariUrl("/", { utm_content: placement, utm_medium: "site-visit" }, ref);
}

export function VisariLink({
  placement,
  children,
  className,
  ...rest
}: {
  placement: string;
  children: ReactNode;
  className?: string;
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href">) {
  const ref = useRefCode();
  return (
    <Link
      {...rest}
      to="/connect"
      search={{ placement }}
      className={className}
      onClick={(e) => {
        track("cta_clicked", { placement, ref });
        rest.onClick?.(e);
      }}
    >
      {children}
    </Link>
  );
}

/** Homepage — for reading about Visari, not a second contact form. */
export function VisariSiteLink({
  placement,
  className,
  children = "visarifinancial.com",
}: {
  placement: string;
  className?: string;
  children?: ReactNode;
}) {
  const ref = useRefCode();
  return (
    <a
      href={visariHomeHref(placement, ref)}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "inline-flex items-center gap-0.5 underline-offset-2 hover:underline",
        className,
      )}
      onClick={() => track("visari_site_clicked", { placement, ref })}
    >
      {children}
      <ArrowUpRight className="size-3.5" strokeWidth={1.75} />
    </a>
  );
}

export function VisariMoreLine({
  placement,
  className,
}: {
  placement: string;
  className?: string;
}) {
  return (
    <p className={className}>
      For more on Visari Financial — who they are and how they work — visit{" "}
      <VisariSiteLink placement={placement} />. Look around their site to get a
      feel for the firm before they follow up.
    </p>
  );
}
