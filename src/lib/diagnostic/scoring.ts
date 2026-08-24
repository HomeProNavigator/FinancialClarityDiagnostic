import { optionScore } from "./questions";
import {
  BAND_COPY,
  DIMENSION_META,
  bandFromScore,
  type Answers,
  type DimensionId,
  type DimensionScore,
} from "./types";

function clamp(n: number) {
  return Math.max(0, Math.min(100, Math.round(n)));
}

export function scoreDimensions(answers: Answers): Record<DimensionId, number> {
  const books = clamp(
    (optionScore("books", answers.books) ?? 40) * 0.65 +
      (optionScore("reporting", answers.reporting) ?? 40) * 0.35,
  );

  const cash = clamp(
    (optionScore("cashToday", answers.cashToday) ?? 40) * 0.4 +
      (optionScore("cashForward", answers.cashForward) ?? 40) * 0.6,
  );

  const forecasting = clamp(optionScore("forecasting", answers.forecasting) ?? 40);
  const systems = clamp(optionScore("systems", answers.systems) ?? 40);
  const profitability = clamp(
    optionScore("profitability", answers.profitability) ?? 40,
  );

  return { books, cash, forecasting, systems, profitability };
}

export function overallScore(dims: Record<DimensionId, number>): number {
  return clamp(
    dims.books * 0.2 +
      dims.cash * 0.25 +
      dims.forecasting * 0.2 +
      dims.systems * 0.2 +
      dims.profitability * 0.15,
  );
}

export function dimensionList(dims: Record<DimensionId, number>): DimensionScore[] {
  const blurbs: Record<DimensionId, (s: number) => string> = {
    books: (s) =>
      s >= 75
        ? "Close process looks real — the question is whether the package drives decisions."
        : s >= 45
          ? "Books exist, but the close or the usefulness of the package is still thin."
          : "The books are not yet a decision system. They are a trailing record.",
    cash: (s) =>
      s >= 75
        ? "You can see today and a stretch of the road ahead."
        : s >= 45
          ? "Today is roughly visible. The next 30–90 days are still a guess."
          : "Cash is being felt, not seen. That is the usual source of tight-chest decisions.",
    forecasting: (s) =>
      s >= 75
        ? "Planning is tied to operations, not just an annual binder."
        : s >= 45
          ? "There is a plan on paper. It is not yet a living forecast."
          : "The business is being steered without a forward view of cash, margin, or capacity.",
    systems: (s) =>
      s >= 75
        ? "The stack is doing real work. Keep the handoffs clean as you grow."
        : s >= 45
          ? "Software is in place; the picture still lives in exports and side sheets."
          : "The system of record is still people, inboxes, and memory.",
    profitability: (s) =>
      s >= 75
        ? "You can see which work actually pays. That is rare at this stage."
        : s >= 45
          ? "Overall margin is known. Mix, jobs, or customers are still opaque."
          : "Activity is visible. Profit is not.",
  };

  return (Object.keys(DIMENSION_META) as DimensionId[]).map((id) => ({
    id,
    label: DIMENSION_META[id].label,
    score: dims[id],
    blurb: blurbs[id](dims[id]),
  }));
}

export function scoreBundle(answers: Answers) {
  const dims = scoreDimensions(answers);
  const score = overallScore(dims);
  const band = bandFromScore(score);
  return {
    dims,
    score,
    band,
    bandLabel: BAND_COPY[band].label,
    dimensions: dimensionList(dims),
  };
}
