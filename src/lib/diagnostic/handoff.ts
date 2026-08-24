import { createServerFn } from "@tanstack/react-start";

function clean(v: unknown, max: number) {
  if (typeof v !== "string") return "";
  return v.replace(/\s+/g, " ").trim().slice(0, max);
}

function asKind(v: unknown): "opened" | "submitted" {
  return v === "submitted" ? "submitted" : "opened";
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

export const logHandoffEvent = createServerFn({ method: "POST" })
  .validator((input: unknown) => {
    const o = input && typeof input === "object" ? (input as Record<string, unknown>) : {};
    return {
      kind: asKind(o.kind),
      placement: clean(o.placement, 80) || "direct",
      refCode: clean(o.refCode, 40).toLowerCase() || "kyle",
    };
  })
  .handler(async ({ data }) => {
    const { recordHandoffEvent } = await import("./handoff.server");
    return recordHandoffEvent(data);
  });

export const submitIntroduction = createServerFn({ method: "POST" })
  .validator((input: unknown) => {
    const o = input && typeof input === "object" ? (input as Record<string, unknown>) : {};
    const name = clean(o.name, 80);
    const email = clean(o.email, 120).toLowerCase();
    if (name.length < 2) throw new Error("Name is required.");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      throw new Error("A real email is required.");
    }
    const scoreRaw = o.score;
    const score =
      typeof scoreRaw === "number" && Number.isFinite(scoreRaw)
        ? Math.max(0, Math.min(100, Math.round(scoreRaw)))
        : null;
    return {
      name,
      email,
      company: clean(o.company, 120),
      note: clean(o.note, 600),
      placement: clean(o.placement, 80) || "direct",
      refCode: clean(o.refCode, 40).toLowerCase() || "kyle",
      score,
      revenueBand: clean(o.revenueBand, 40),
      industry: clean(o.industry, 40),
    };
  })
  .handler(async ({ data }) => {
    const { insertIntroduction } = await import("./handoff.server");
    return insertIntroduction(data);
  });

export const loadPartnerInbox = createServerFn({ method: "POST" })
  .validator((input: unknown) => {
    const o = input && typeof input === "object" ? (input as Record<string, unknown>) : {};
    return { key: typeof o.key === "string" ? o.key.slice(0, 80) : "" };
  })
  .handler(async ({ data }) => {
    const { loadInbox } = await import("./handoff.server");
    return loadInbox(data.key);
  });
