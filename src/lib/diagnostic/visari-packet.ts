import { QUESTION_INDEX, QUESTIONS } from "./questions";
import type { Answers } from "./types";

function optionLabel(questionId: keyof Answers, value?: string) {
  if (!value) return "";
  const q = QUESTION_INDEX[questionId];
  return q?.options?.find((o) => o.value === value)?.label ?? value;
}

/** Numbered questions and answers, one pair per block — easy to read in Netlify. */
export function formatAnswers(answers: Answers) {
  const blocks: string[] = [];
  let n = 0;
  for (const q of QUESTIONS) {
    const raw = answers[q.id];
    if (!raw?.trim()) continue;
    n += 1;
    blocks.push(`${n}. ${q.title}\n${optionLabel(q.id, raw)}`);
  }
  return blocks.length
    ? blocks.join("\n\n")
    : "No diagnostic answers on this device.";
}

export function buildVisariPacket(answers: Answers) {
  return { answers: formatAnswers(answers).slice(0, 8000) };
}
