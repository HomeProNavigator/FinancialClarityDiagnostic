export const NETLIFY_FORM_NAME = "visari-intro";
export const NETLIFY_FORM_ACTION = "/visari-intro.html";

export function encodeForm(form: HTMLFormElement) {
  const params = new URLSearchParams();
  const data = new FormData(form);
  if (!data.get("form-name")) params.set("form-name", NETLIFY_FORM_NAME);
  for (const [key, value] of data.entries()) {
    if (typeof value === "string") params.append(key, value);
  }
  return params.toString();
}

/** True when this page is the production Netlify site. */
export function isNetlifyHost(hostname = "") {
  return hostname.endsWith("netlify.app") || hostname.endsWith("netlify.com");
}

/**
 * POST to Netlify Forms via the static detection page, then the caller
 * redirects to Visari. Returns whether Netlify accepted the submission.
 */
export async function submitNetlifyForm(form: HTMLFormElement): Promise<boolean> {
  const res = await fetch(NETLIFY_FORM_ACTION, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: encodeForm(form),
  });
  return res.ok;
}
