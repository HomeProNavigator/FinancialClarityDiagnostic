import { timingSafeEqual } from "node:crypto";
import { getRequest } from "@tanstack/react-start/server";
import { getSql } from "@/lib/db";

/** Server-only. Never import this module from a client file. */
const INBOX_KEY = "kyle-visari-clarity";

const hits = new Map<string, number[]>();

function clientKey() {
  try {
    const req = getRequest();
    const fwd = req.headers.get("x-forwarded-for");
    if (fwd) return fwd.split(",")[0]!.trim().slice(0, 80);
    return (req.headers.get("x-real-ip") ?? "unknown").slice(0, 80);
  } catch {
    return "unknown";
  }
}

function allow(kind: string, limit: number, windowMs: number) {
  const key = `${kind}:${clientKey()}`;
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < windowMs);
  if (recent.length >= limit) {
    hits.set(key, recent);
    return false;
  }
  recent.push(now);
  hits.set(key, recent);
  return true;
}

function stamp(value: unknown) {
  if (value instanceof Date) return value.toISOString();
  return String(value ?? "");
}

export async function recordHandoffEvent(input: {
  kind: "opened" | "submitted";
  placement: string;
  refCode: string;
}) {
  if (!allow("event", 30, 60 * 60 * 1000)) return { ok: true as const };
  const sql = await getSql();
  await sql`
    insert into handoff_events (kind, placement, ref_code)
    values (${input.kind}, ${input.placement}, ${input.refCode})
  `;
  return { ok: true as const };
}

export async function insertIntroduction(input: {
  name: string;
  email: string;
  company: string;
  note: string;
  placement: string;
  refCode: string;
  score: number | null;
  revenueBand: string;
  industry: string;
}) {
  if (!allow("intro", 8, 60 * 60 * 1000)) {
    return { ok: false as const, error: "Too many introductions from this network. Try again shortly." };
  }
  const sql = await getSql();
  const rows = await sql<{ id: number }>`
    insert into introductions (
      name, email, company, note, placement, ref_code, score, revenue_band, industry
    )
    values (
      ${input.name},
      ${input.email},
      ${input.company},
      ${input.note},
      ${input.placement},
      ${input.refCode},
      ${input.score},
      ${input.revenueBand},
      ${input.industry}
    )
    returning id
  `;
  await sql`
    insert into handoff_events (kind, placement, ref_code)
    values ('submitted', ${input.placement}, ${input.refCode})
  `;
  return { ok: true as const, id: rows[0]?.id ?? 0 };
}

export type InboxIntro = {
  id: number;
  name: string;
  email: string;
  company: string;
  note: string;
  placement: string;
  refCode: string;
  score: number | null;
  revenueBand: string;
  industry: string;
  createdAt: string;
};

function keyMatches(input: string) {
  const a = Buffer.from(input.trim());
  const b = Buffer.from(INBOX_KEY);
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

export async function loadInbox(key: string): Promise<
  | { ok: true; intros: InboxIntro[]; opened: number; submitted: number }
  | { ok: false; error: string }
> {
  if (!allow("inbox", 20, 60 * 60 * 1000)) {
    return { ok: false, error: "Too many attempts. Wait a minute and try again." };
  }
  if (!keyMatches(key)) {
    return { ok: false, error: "That access code does not match." };
  }
  const sql = await getSql();
  const intros = await sql<{
    id: number;
    name: string;
    email: string;
    company: string;
    note: string;
    placement: string;
    ref_code: string;
    score: number | null;
    revenue_band: string | null;
    industry: string | null;
    created_at: unknown;
  }>`
    select id, name, email, company, note, placement, ref_code, score, revenue_band, industry, created_at
    from introductions
    order by created_at desc
    limit 300
  `;
  const counts = await sql<{ kind: string; n: number }>`
    select kind, count(*)::int as n from handoff_events group by kind
  `;
  const opened = counts.find((c) => c.kind === "opened")?.n ?? 0;
  const submitted = counts.find((c) => c.kind === "submitted")?.n ?? 0;
  return {
    ok: true,
    opened,
    submitted,
    intros: intros.map((row) => ({
      id: row.id,
      name: row.name,
      email: row.email,
      company: row.company,
      note: row.note,
      placement: row.placement,
      refCode: row.ref_code,
      score: row.score,
      revenueBand: row.revenue_band ?? "",
      industry: row.industry ?? "",
      createdAt: stamp(row.created_at),
    })),
  };
}
