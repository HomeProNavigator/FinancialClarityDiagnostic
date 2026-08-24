import { QUESTION_INDEX, QUESTIONS } from "./questions";
import type { Answers, ClarityReport } from "./types";

function optionLabel(questionId: keyof Answers, value?: string) {
  if (!value) return "";
  const q = QUESTION_INDEX[questionId];
  return q?.options?.find((o) => o.value === value)?.label ?? value;
}

export function formatAnswers(answers: Answers) {
  return QUESTIONS.map((q) => {
    const raw = answers[q.id];
    if (!raw?.trim()) return null;
    const label = optionLabel(q.id, raw);
    const title = q.title.replace(/[.?:]\s*$/, "");
    return `${title}: ${label}`;
  }).filter(Boolean) as string[];
}

/** Human-readable packet Visari can read in the Netlify Forms row. */
export function buildVisariPacket(answers: Answers, report: ClarityReport | null) {
  const lines: string[] = [];
  if (report) {
    lines.push(`Clarity Score: ${report.score}/100 (${report.bandLabel})`);
    lines.push(report.headline);
    lines.push("");
  }
  lines.push("Answers");
  const listed = formatAnswers(answers);
  lines.push(...(listed.length ? listed.map((l) => `• ${l}`) : ["• (no diagnostic on this device)"]));
  if (report) {
    lines.push("");
    lines.push("Findings");
    for (const f of report.findings) {
      lines.push(`• [${f.severity}] ${f.title}: ${f.body}`);
    }
    lines.push("");
    lines.push("Next steps");
    for (const s of report.nextSteps) {
      lines.push(`• [${s.timeframe}] ${s.title} — ${s.detail}`);
    }
    if (report.scoreExplanation) {
      lines.push("");
      lines.push(report.scoreExplanation);
    }
    if (report.whatGoodLooksLike) {
      lines.push("");
      lines.push(`What good looks like: ${report.whatGoodLooksLike}`);
    }
    if (report.closingNote) {
      lines.push("");
      lines.push(report.closingNote);
    }
  }
  return {
    score: report ? String(report.score) : "",
    band: report?.bandLabel ?? "",
    headline: (report?.headline ?? "").slice(0, 180),
    answers_json: JSON.stringify(answers).slice(0, 4000),
    report_summary: lines.join("\n").slice(0, 15000),
  };
}
