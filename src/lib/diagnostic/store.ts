import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Answers, ClarityReport, QuestionId } from "./types";

type DiagnosticState = {
  answers: Answers;
  step: number;
  started: boolean;
  report: ClarityReport | null;
  setAnswer: (id: QuestionId, value: string) => void;
  clearAnswer: (id: QuestionId) => void;
  setStep: (n: number) => void;
  markStarted: () => void;
  setReport: (report: ClarityReport | null) => void;
  reset: () => void;
};

export const useDiagnosticStore = create<DiagnosticState>()(
  persist(
    (set) => ({
      answers: {},
      step: 0,
      started: false,
      report: null,
      setAnswer: (id, value) =>
        set((s) => ({ answers: { ...s.answers, [id]: value } })),
      clearAnswer: (id) =>
        set((s) => {
          const next = { ...s.answers };
          delete next[id];
          return { answers: next };
        }),
      setStep: (n) => set({ step: n }),
      markStarted: () => set({ started: true }),
      setReport: (report) => set({ report }),
      reset: () => set({ answers: {}, step: 0, started: false, report: null }),
    }),
    {
      name: "fcd-diagnostic",
      partialize: (s) => ({
        answers: s.answers,
        step: s.step,
        started: s.started,
        report: s.report,
      }),
    },
  ),
);
