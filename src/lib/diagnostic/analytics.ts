export type AnalyticsEvent =
  | "form_started"
  | "form_step"
  | "form_completed"
  | "report_viewed"
  | "cta_clicked"
  | "sample_viewed"
  | "pdf_clicked"
  | "email_clicked";

const KEY = "fcd_events";
const MAX = 40;

type Payload = Record<string, string | number | boolean | null | undefined>;

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
  }
}

export function track(event: AnalyticsEvent, payload: Payload = {}) {
  if (typeof window === "undefined") return;
  const entry = {
    event,
    ts: Date.now(),
    path: window.location.pathname,
    ...payload,
  };
  try {
    const prev = JSON.parse(localStorage.getItem(KEY) || "[]") as unknown[];
    const next = [...prev, entry].slice(-MAX);
    localStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    /* ignore */
  }
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(entry);
}
