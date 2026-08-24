export const DIMENSIONS = [
  "books",
  "cash",
  "forecasting",
  "systems",
  "profitability",
] as const;

export type DimensionId = (typeof DIMENSIONS)[number];

export type ClarityBand = "fog" | "forming" | "clear" | "sharp";

export type RevenueBand =
  | "under_500k"
  | "500k_1m"
  | "1m_3m"
  | "3m_10m"
  | "over_10m";

export type QuestionId =
  | "revenue"
  | "industry"
  | "state"
  | "books"
  | "cashToday"
  | "cashForward"
  | "reporting"
  | "forecasting"
  | "friction"
  | "systems"
  | "profitability"
  | "company";

export type Answers = Partial<Record<QuestionId, string>>;

export type DimensionScore = {
  id: DimensionId;
  label: string;
  score: number;
  blurb: string;
};

export type ReportFinding = {
  dimension: DimensionId;
  title: string;
  body: string;
  severity: "gap" | "watch" | "strength";
};

export type NextStep = {
  title: string;
  detail: string;
  timeframe: "this week" | "this month" | "this quarter";
};

export type ClarityReport = {
  score: number;
  band: ClarityBand;
  bandLabel: string;
  headline: string;
  scoreExplanation: string;
  dimensions: DimensionScore[];
  findings: ReportFinding[];
  whatGoodLooksLike: string;
  nextSteps: NextStep[];
  closingNote: string;
  generatedAt: string;
  source: "ai" | "fallback" | "sample";
  answers: Answers;
};

export const DIMENSION_META: Record<
  DimensionId,
  { label: string; short: string }
> = {
  books: { label: "Books quality", short: "Books" },
  cash: { label: "Cash visibility", short: "Cash" },
  forecasting: { label: "Forecasting readiness", short: "Forecast" },
  systems: { label: "Systems & automation", short: "Systems" },
  profitability: { label: "Profitability signal", short: "Profit" },
};

export const BAND_COPY: Record<
  ClarityBand,
  { label: string; range: string }
> = {
  fog: { label: "Fog", range: "0-39" },
  forming: { label: "Forming", range: "40-64" },
  clear: { label: "Clear", range: "65-84" },
  sharp: { label: "Sharp", range: "85-100" },
};

export function bandFromScore(score: number): ClarityBand {
  if (score >= 85) return "sharp";
  if (score >= 65) return "clear";
  if (score >= 40) return "forming";
  return "fog";
}

export const REQUIRED_QUESTIONS: QuestionId[] = [
  "revenue",
  "books",
  "cashToday",
  "cashForward",
  "reporting",
  "forecasting",
  "friction",
  "systems",
  "profitability",
];
