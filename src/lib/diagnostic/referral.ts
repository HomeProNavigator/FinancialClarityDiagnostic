const STORAGE_KEY = "fcd_ref";
const PARAM = "ref";

/** Default partner attribution for this diagnostic. Overridden by ?ref= on the URL. */
export const DEFAULT_REF = "kyle";
export const VISARI_ORIGIN = "https://visarifinancial.com";
export const VISARI_CONTACT_PATH = "/contact";

export function readRefFromLocation(search = ""): string | null {
  const q = search.startsWith("?") ? search.slice(1) : search;
  const params = new URLSearchParams(q);
  const raw = params.get(PARAM) ?? params.get("referral") ?? params.get("source");
  if (!raw) return null;
  const cleaned = raw
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9_-]/g, "")
    .slice(0, 40);
  return cleaned || null;
}

export function persistRef(code: string) {
  try {
    localStorage.setItem(STORAGE_KEY, code);
  } catch {
    /* private mode */
  }
}

export function getStoredRef(): string | null {
  try {
    const v = localStorage.getItem(STORAGE_KEY);
    return v && v.length ? v : null;
  } catch {
    return null;
  }
}

export function captureReferralFromWindow() {
  if (typeof window === "undefined") return null;
  const fromUrl = readRefFromLocation(window.location.search);
  if (fromUrl) persistRef(fromUrl);
  return fromUrl ?? getStoredRef();
}

export function currentRef(): string | null {
  if (typeof window === "undefined") return null;
  return readRefFromLocation(window.location.search) ?? getStoredRef();
}

export function resolvedRef(explicit: string | null = null): string {
  return explicit && explicit.length ? explicit : DEFAULT_REF;
}

/**
 * Every outbound Visari URL lands on /contact with UTM + ref so the partner
 * who drove the lead can be credited. `ref` and `utm_term` both carry the code.
 */
export function visariUrl(
  path = VISARI_CONTACT_PATH,
  extras: Record<string, string> = {},
  ref: string | null = null,
) {
  const code = resolvedRef(ref);
  const params = new URLSearchParams({
    utm_source: "financial-clarity",
    utm_medium: "referral",
    utm_campaign: "clarity-report",
    ...extras,
  });
  params.set("utm_term", code);
  params.set("ref", code);
  const prefix = path.startsWith("http")
    ? path
    : `${VISARI_ORIGIN}${path.startsWith("/") ? path : `/${path}`}`;
  const join = prefix.includes("?") ? "&" : "?";
  return `${prefix}${join}${params.toString()}`;
}
