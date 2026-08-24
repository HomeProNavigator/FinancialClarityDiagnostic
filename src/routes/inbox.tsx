import { useMemo, useState, type FormEvent } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { loadPartnerInbox, type InboxIntro } from "@/lib/diagnostic/handoff";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/inbox")({
  head: () =>
    pageHead({
      title: "Partner inbox",
      description: "Named introductions from the Financial Clarity Diagnostic.",
      path: "/inbox",
      robots: "noindex,nofollow",
    }),
  component: InboxPage,
});

const KEY_STORE = "fcd_inbox_key";

function formatWhen(iso: string) {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

function toCsv(rows: InboxIntro[]) {
  const header = [
    "created_at",
    "name",
    "email",
    "company",
    "note",
    "ref",
    "placement",
    "score",
    "revenue",
    "industry",
  ];
  const lines = [
    header.join(","),
    ...rows.map((r) =>
      [
        r.createdAt,
        r.name,
        r.email,
        r.company,
        r.note,
        r.refCode,
        r.placement,
        r.score ?? "",
        r.revenueBand,
        r.industry,
      ]
        .map((v) => `"${String(v).replace(/"/g, '""')}"`)
        .join(","),
    ),
  ];
  return lines.join("\n");
}

function InboxPage() {
  const [key, setKey] = useState(() => {
    try {
      return sessionStorage.getItem(KEY_STORE) ?? "";
    } catch {
      return "";
    }
  });
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [opened, setOpened] = useState(0);
  const [submitted, setSubmitted] = useState(0);
  const [intros, setIntros] = useState<InboxIntro[] | null>(null);

  async function load(code: string) {
    setBusy(true);
    setError(null);
    try {
      const result = await loadPartnerInbox({ data: { key: code } });
      if (!result.ok) {
        setError(result.error);
        setIntros(null);
        return;
      }
      setOpened(result.opened);
      setSubmitted(result.submitted);
      setIntros(result.intros);
      try {
        sessionStorage.setItem(KEY_STORE, code);
      } catch {
        /* private mode */
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not load the inbox.");
    } finally {
      setBusy(false);
    }
  }

  async function onUnlock(e: FormEvent) {
    e.preventDefault();
    await load(key);
  }

  const rate = useMemo(() => {
    if (!opened) return submitted ? "—" : "0%";
    return `${Math.round((submitted / opened) * 100)}%`;
  }, [opened, submitted]);

  function downloadCsv() {
    if (!intros?.length) return;
    const blob = new Blob([toCsv(intros)], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "visari-introductions.csv";
    a.click();
    URL.revokeObjectURL(url);
  }

  if (!intros) {
    return (
      <main className="mx-auto w-full max-w-md px-5 py-16 sm:py-24">
        <p className="text-xs uppercase tracking-[0.18em] text-subtle">
          Referring partners
        </p>
        <h1 className="mt-3 font-display text-3xl tracking-tight">
          Partner inbox
        </h1>
        <p className="mt-3 text-muted">
          Named introductions from the diagnostic live here. Enter the access
          code to open it.
        </p>
        <form onSubmit={(e) => void onUnlock(e)} className="mt-8 space-y-4">
          <label className="block">
            <span className="text-sm font-medium">Access code</span>
            <input
              type="password"
              autoComplete="current-password"
              className="mt-1.5 h-12 w-full rounded-md bg-surface px-4 text-base shadow-card focus:outline-none focus:ring-2 focus:ring-primary/30"
              value={key}
              onChange={(e) => setKey(e.target.value)}
              required
            />
          </label>
          {error && (
            <p className="text-sm text-warn" role="alert">
              {error}
            </p>
          )}
          <Button type="submit" disabled={busy}>
            {busy ? "Opening…" : "Open inbox"}
          </Button>
        </form>
      </main>
    );
  }

  return (
    <main className="mx-auto w-full max-w-5xl px-5 py-10 sm:px-8 sm:py-14">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-subtle">
            Referring partners
          </p>
          <h1 className="mt-2 font-display text-3xl tracking-tight">
            Partner inbox
          </h1>
        </div>
        <Button variant="secondary" size="sm" onClick={downloadCsv} disabled={!intros.length}>
          Download CSV
        </Button>
      </div>

      <div className="mt-8 grid gap-3 sm:grid-cols-3">
        <Stat label="Clicked through" value={String(opened)} hint="Opened the intro form" />
        <Stat label="Named introductions" value={String(submitted)} hint="Finished the form" />
        <Stat label="Form completion" value={rate} hint="Introductions ÷ click-throughs" />
      </div>

      {intros.length === 0 ? (
        <p className="mt-12 max-w-lg text-muted">
          Nobody has left an introduction yet. When someone clicks “Start the
          conversation” and fills the short form, they will show up here — name,
          email, and the referral code that brought them.
        </p>
      ) : (
        <>
          <ul className="mt-10 space-y-4 md:hidden">
            {intros.map((row) => (
              <li
                key={row.id}
                className="rounded-xl bg-surface px-5 py-4 shadow-card"
              >
                <p className="font-medium">{row.name}</p>
                <a
                  href={`mailto:${row.email}`}
                  className="text-sm text-primary underline-offset-2 hover:underline"
                >
                  {row.email}
                </a>
                {row.company && (
                  <p className="mt-1 text-sm text-muted">{row.company}</p>
                )}
                {row.note && (
                  <p className="mt-2 text-sm leading-relaxed">{row.note}</p>
                )}
                <p className="mt-3 text-xs text-subtle">
                  {formatWhen(row.createdAt)} · ref {row.refCode}
                  {row.score != null ? ` · score ${row.score}` : ""}
                </p>
              </li>
            ))}
          </ul>

          <div className="mt-10 hidden overflow-x-auto md:block">
            <table className="w-full min-w-[720px] text-left text-sm">
              <thead>
                <tr className="border-b border-border text-xs uppercase tracking-[0.14em] text-subtle">
                  <th className="py-2 pr-4 font-medium">When</th>
                  <th className="py-2 pr-4 font-medium">Person</th>
                  <th className="py-2 pr-4 font-medium">Company</th>
                  <th className="py-2 pr-4 font-medium">Note</th>
                  <th className="py-2 font-medium">Ref</th>
                </tr>
              </thead>
              <tbody>
                {intros.map((row) => (
                  <tr key={row.id} className="border-b border-border/70 align-top">
                    <td className="whitespace-nowrap py-3 pr-4 text-muted">
                      {formatWhen(row.createdAt)}
                    </td>
                    <td className="py-3 pr-4">
                      <p className="font-medium">{row.name}</p>
                      <a
                        href={`mailto:${row.email}`}
                        className="text-primary underline-offset-2 hover:underline"
                      >
                        {row.email}
                      </a>
                      {row.score != null && (
                        <p className="text-xs text-subtle">Score {row.score}</p>
                      )}
                    </td>
                    <td className="py-3 pr-4 text-muted">{row.company || "—"}</td>
                    <td className="max-w-xs py-3 pr-4 text-fg/90">{row.note || "—"}</td>
                    <td className="py-3 font-mono text-xs text-muted">{row.refCode}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </main>
  );
}

function Stat({
  label,
  value,
  hint,
}: {
  label: string;
  value: string;
  hint: string;
}) {
  return (
    <div className="rounded-xl bg-surface px-5 py-4 shadow-card">
      <p className="text-xs uppercase tracking-[0.14em] text-subtle">{label}</p>
      <p className="mt-2 font-display text-3xl tracking-tight">{value}</p>
      <p className="mt-1 text-xs text-muted">{hint}</p>
    </div>
  );
}
