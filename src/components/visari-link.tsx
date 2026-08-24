import {
  type AnchorHTMLAttributes,
  type ReactNode,
  useEffect,
  useState,
} from "react";
import { Link } from "@tanstack/react-router";
import {
  DEFAULT_REF,
  captureReferralFromWindow,
} from "@/lib/diagnostic/referral";
import { track } from "@/lib/diagnostic/analytics";

export function useRefCode() {
  const [ref, setRef] = useState(DEFAULT_REF);
  useEffect(() => {
    setRef(captureReferralFromWindow() ?? DEFAULT_REF);
  }, []);
  return ref;
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
