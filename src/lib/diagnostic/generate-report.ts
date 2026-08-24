import { createServerFn } from "@tanstack/react-start";
import { buildFallbackReport } from "./fallback-report";
import { scoreBundle } from "./scoring";
import {
  FRICTION_LABEL,
  INDUSTRY_LABEL,
  REVENUE_LABEL,
} from "./questions";
import type {
  Answers,
  ClarityReport,
  NextStep,
  ReportFinding,
} from "./types";
import { DIMENSIONS } from "./types";

type AiPayload = {
  headline?: string;
  scoreExplanation?: string;
  findings?: ReportFinding[];
  whatGoodLooksLike?: string;
  nextSteps?: NextStep[];
  closingNote?: string;
};

function isFinding(v: unknown): v is ReportFinding {
  if (!v || typeof v !== "object") return false;
  const o = v as Record<string, unknown>;
  return (
    typeof o.title === "string" &&
    typeof o.body === "string" &&
    (DIMENSIONS as readonly string[]).includes(String(o.dimension)) &&
    (o.severity === "gap" || o.severity === "watch" || o.severity === "strength")
  );
}

function isStep(v: unknown): v is NextStep {
  if (!v || typeof v !== "object") return false;
  const o = v as Record<string, unknown>;
  return (
    typeof o.title === "string" &&
    typeof o.detail === "string" &&
    (o.timeframe === "this week" ||
      o.timeframe === "this month" ||
      o.timeframe === "this quarter")
  );
}

function mergeAi(base: ClarityReport, ai: AiPayload): ClarityReport {
  const findings = Array.isArray(ai.findings)
    ? ai.findings.filter(isFinding).slice(0, 5)
    : [];
  const nextSteps = Array.isArray(ai.nextSteps)
    ? ai.nextSteps.filter(isStep).slice(0, 5)
    : [];
  return {
    ...base,
    headline:
      typeof ai.headline === "string" && ai.headline.trim()
        ? ai.headline.trim().slice(0, 180)
        : base.headline,
    scoreExplanation:
      typeof ai.scoreExplanation === "string" && ai.scoreExplanation.trim()
        ? ai.scoreExplanation.trim().slice(0, 900)
        : base.scoreExplanation,
    findings: findings.length >= 3 ? findings : base.findings,
    whatGoodLooksLike:
      typeof ai.whatGoodLooksLike === "string" && ai.whatGoodLooksLike.trim()
        ? ai.whatGoodLooksLike.trim().slice(0, 900)
        : base.whatGoodLooksLike,
    nextSteps: nextSteps.length >= 3 ? nextSteps : base.nextSteps,
    closingNote:
      typeof ai.closingNote === "string" && ai.closingNote.trim()
        ? ai.closingNote.trim().slice(0, 400)
        : base.closingNote,
    source: "ai",
  };
}

function sanitizeAnswers(input: unknown): Answers {
  if (!input || typeof input !== "object") return {};
  const src = input as Record<string, unknown>;
  const out: Answers = {};
  for (const [k, v] of Object.entries(src)) {
    if (typeof v === "string") {
      out[k as keyof Answers] = v.slice(0, 120);
    }
  }
  return out;
}

export const generateClarityReport = createServerFn({ method: "POST" })
  .validator((input: unknown) => {
    if (!input || typeof input !== "object") {
      throw new Error("Invalid payload");
    }
    return { answers: sanitizeAnswers((input as { answers?: unknown }).answers) };
  })
  .handler(async ({ data }) => {
    const answers = data.answers;
    const base = buildFallbackReport(answers);

    const apiKey = process.env.XAI_API_KEY;
    if (!apiKey) return base;

    const scores = scoreBundle(answers);
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 12_000);

    try {
      const res = await fetch("https://api.x.ai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        signal: controller.signal,
        body: JSON.stringify({
          model: "grok-4.5",
          temperature: 0.4,
          max_tokens: 1600,
          response_format: { type: "json_object" },
          messages: [
            {
              role: "system",
              content:
                "You write Financial Clarity Reports for U.S. business owners. Voice: clear, competent, future-oriented, reassuring. No hype, no exclamation points, no jargon (no 'leverage', 'synergy', 'unlock', 'game-changer'). Write for a busy owner. Be specific to THEIR answers. Never mention being an AI. Return JSON only.",
            },
            {
              role: "user",
              content: JSON.stringify({
                instruction:
                  "Write a personalized 1–2 page diagnostic narrative. Score and dimensions are already computed — do not invent a new score. Findings should be plain English, concrete, and ordered most urgent first. Next steps must be actions the owner can take, not 'hire us'. Do not pitch Visari Financial.",
                answers: {
                  company: answers.company?.trim() || null,
                  revenue: REVENUE_LABEL[answers.revenue ?? ""] ?? answers.revenue ?? null,
                  industry:
                    INDUSTRY_LABEL[answers.industry ?? ""] ?? answers.industry ?? null,
                  state: answers.state ?? null,
                  books: answers.books ?? null,
                  cashToday: answers.cashToday ?? null,
                  cashForward: answers.cashForward ?? null,
                  reporting: answers.reporting ?? null,
                  forecasting: answers.forecasting ?? null,
                  friction:
                    FRICTION_LABEL[answers.friction ?? ""] ?? answers.friction ?? null,
                  systems: answers.systems ?? null,
                  profitability: answers.profitability ?? null,
                },
                score: scores.score,
                band: scores.bandLabel,
                dimensions: scores.dimensions.map((d) => ({
                  id: d.id,
                  score: d.score,
                })),
                json_schema: {
                  headline: "string",
                  scoreExplanation: "string",
                  findings: [
                    {
                      dimension:
                        "books | cash | forecasting | systems | profitability",
                      title: "short",
                      body: "2–4 sentences",
                      severity: "gap | watch | strength",
                    },
                  ],
                  whatGoodLooksLike: "string",
                  nextSteps: [
                    {
                      title: "short",
                      detail: "2–3 sentences",
                      timeframe: "this week | this month | this quarter",
                    },
                  ],
                  closingNote: "string",
                },
              }),
            },
          ],
        }),
      });
      if (!res.ok) return base;
      const body = (await res.json()) as {
        choices?: { message?: { content?: string } }[];
      };
      const text = body.choices?.[0]?.message?.content;
      if (!text) return base;
      const parsed = JSON.parse(text) as AiPayload;
      return mergeAi(base, parsed);
    } catch {
      return base;
    } finally {
      clearTimeout(timer);
    }
  });
