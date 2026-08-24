import {
  FRICTION_LABEL,
  INDUSTRY_LABEL,
  REVENUE_LABEL,
} from "./questions";
import { scoreBundle } from "./scoring";
import type {
  Answers,
  ClarityReport,
  DimensionId,
  NextStep,
  ReportFinding,
} from "./types";

const STAGE: Record<string, string> = {
  under_500k:
    "a company still forming its first real finance rhythm — owner-led, close enough to the bank account that instinct still substitutes for a system",
  "500k_1m":
    "a company that has outgrown napkin math. Decisions are bigger than the books can currently support",
  "1m_3m":
    "a company in the messy middle: revenue is real, complexity has arrived, and the finance function is usually the last thing to catch up",
  "3m_10m":
    "a company that should already have a finance operating cadence — monthly close, cash forecast, and a partner who can sit in the decisions",
  over_10m:
    "a company where finance is no longer a back-office chore. It is part of how the business is run",
};

function nameOf(answers: Answers) {
  const n = answers.company?.trim();
  return n ? n.replace(/\s+/g, " ").slice(0, 60) : null;
}

function you(answers: Answers) {
  const n = nameOf(answers);
  return n ?? "you";
}

function You(answers: Answers) {
  const n = nameOf(answers);
  return n ?? "You";
}

function industryBit(answers: Answers) {
  const ind = answers.industry ? INDUSTRY_LABEL[answers.industry] : null;
  return ind ? ` in ${ind}` : "";
}

function stageBit(answers: Answers) {
  return STAGE[answers.revenue ?? ""] ?? "a growing company";
}

function finding(
  dimension: DimensionId,
  severity: ReportFinding["severity"],
  title: string,
  body: string,
): ReportFinding {
  return { dimension, severity, title, body };
}

function booksFinding(answers: Answers, score: number): ReportFinding {
  const v = answers.books;
  if (score >= 80) {
    return finding(
      "books",
      "strength",
      "The close is real",
      `${You(answers)} already have a close process, not just a tax folder. That is the floor, not the ceiling. The next test is whether the package arrives fast enough — and is trusted enough — to change a hire, a bid, or a draw before the month is gone.`,
    );
  }
  if (v === "tax_bookkeeper" || v === "inconsistent") {
    return finding(
      "books",
      "gap",
      "Books are still a trailing record",
      `A bookkeeper who shows up for tax season is not the same as a monthly close. Right now the numbers explain last year more reliably than last month. For ${stageBit(answers)}, that gap is where slow decisions and surprise cash usually start.`,
    );
  }
  if (v === "spreadsheet") {
    return finding(
      "books",
      "gap",
      "The system of record is still a spreadsheet",
      `Spreadsheets are honest about being temporary. They are also where version control, audit trail, and a real close go to die. ${You(answers)} can run a company this way for a while. ${You(answers)} cannot scale a finance function this way.`,
    );
  }
  return finding(
    "books",
    "watch",
    "The close exists — the usefulness is uneven",
    answers.reporting === "decision_package"
      ? `Reporting is doing real work, which is rarer than people admit. Protect that cadence. If the underlying close still slips, the package will quietly stop being trusted.`
      : `There is a bookkeeping motion, but the package is not yet a decision tool. Late or unused P&Ls train a company to steer by bank balance and gut. That works until it doesn’t.`,
  );
}

function cashFinding(answers: Answers, score: number): ReportFinding {
  if (answers.cashForward === "tighter_than_pl" || answers.friction === "cash_tight") {
    return finding(
      "cash",
      "gap",
      "Cash is tighter than the P&L, and that is information",
      `This is one of the most common — and most solvable — gaps in growing companies${industryBit(answers)}. Profit on paper and cash in the account diverge because of timing: receivables, deposits, inventory, owner draws, tax estimates, job costs that hit before the invoice. Until there is a 13-week view (or a close cousin), every growth decision feels like a coin flip.`,
    );
  }
  if (score >= 80) {
    return finding(
      "cash",
      "strength",
      "You can see cash, not just feel it",
      `A current position plus a forward view is the difference between managing and reacting. Keep the forecast on a weekly rhythm. The value is not the first version — it is the habit of updating it when the week disagrees with the model.`,
    );
  }
  if (answers.cashToday === "bank_look" || answers.cashToday === "surprised" || answers.cashToday === "no_view") {
    return finding(
      "cash",
      "gap",
      "Today’s cash is a glance, not a position",
      `Looking at the bank is not cash visibility. A position includes what is already committed, what is likely to clear, and what is sitting in receivables that will not. Without that, ${you(answers)} are making payroll-sized decisions with a screenshot.`,
    );
  }
  return finding(
    "cash",
    "watch",
    "The next 30–90 days are still a guess",
    `Knowing roughly where cash is today is a start. Growing companies get hurt in the window no one is watching: the next two payrolls, a deposit that slips, a tax estimate, a job that pays late. A simple rolling 13-week forecast closes more anxiety than another year of cleaner P&Ls.`,
  );
}

function forecastFinding(answers: Answers, score: number): ReportFinding {
  if (score >= 80) {
    return finding(
      "forecasting",
      "strength",
      "Planning is already a living thing",
      `A rolling forecast tied to operations is what “good” looks like at ${REVENUE_LABEL[answers.revenue ?? ""] ?? "this"} scale. Use it to test hires and capital before they become commitments, not after.`,
    );
  }
  if (answers.forecasting === "annual") {
    return finding(
      "forecasting",
      "watch",
      "The budget is a snapshot, not a steering wheel",
      `Annual budgets go stale in a quarter. If the document is not revisited when a large decision appears, it is a reporting artifact. A lightweight rolling view — revenue, gross margin, operating costs, cash — beats a beautiful binder no one opens.`,
    );
  }
  if (answers.forecasting === "revenue_only") {
    return finding(
      "forecasting",
      "gap",
      "Revenue is planned. Cash and margin are not.",
      `Top-line targets without cash, capacity, or contribution margin create a particular kind of stress: hitting the number and still feeling broke. Build the forecast from the unit of work (job, customer, location), not from last year’s revenue plus hope.`,
    );
  }
  return finding(
    "forecasting",
    "gap",
    "The business is being steered without a forward view",
    `Ad-hoc spreadsheets at decision time are better than nothing and worse than a rhythm. The cost is not the hour in Excel. It is the hire that was delayed, the job that was underbid, the tax bill that arrived as a surprise.`,
  );
}

function systemsFinding(answers: Answers, score: number): ReportFinding {
  if (score >= 80) {
    return finding(
      "systems",
      "strength",
      "The stack is doing real work",
      `Integrated systems are an advantage only if the close still has an owner. As volume grows, the risk shifts from “we don’t have tools” to “the tools quietly disagree.” A short monthly systems check — what is source of truth, what is exported — keeps the advantage.`,
    );
  }
  if (answers.systems === "spreadsheet_truth" || answers.systems === "inbox") {
    return finding(
      "systems",
      "gap",
      "The real picture still lives outside the books",
      `When spreadsheets or inboxes are the system of record, every report is a reconstruction. That is why month-end feels like a scramble and why ${you(answers)} hesitate to trust the number in a meeting. The first automation is not a dashboard. It is a single place the close actually happens.`,
    );
  }
  return finding(
    "systems",
    "watch",
    "Software is in place. The handoffs are still manual.",
    `Exports, re-keying, and island tools are how growing companies accidentally create two sets of numbers. Pick a source of truth for cash, for revenue, and for job or product cost — then make everything else reconcile to those three.`,
  );
}

function profitFinding(answers: Answers, score: number): ReportFinding {
  if (score >= 80) {
    return finding(
      "profitability",
      "strength",
      "You can see which work actually pays",
      `Contribution by offering, customer, or job is the difference between growing revenue and growing the company. Protect that view. Use it to say no as often as yes.`,
    );
  }
  if (answers.profitability === "unsure" || answers.profitability === "tax_time") {
    return finding(
      "profitability",
      "gap",
      "Activity is visible. Profit is not.",
      `Busy is a feeling. Profit is a calculation that includes the costs people forget — labor that isn’t billed, rework, owner time, financing, the job that looked fine until it closed. Until that lands monthly, growth can quietly be a transfer of effort into a thinner company.`,
    );
  }
  return finding(
    "profitability",
    "watch",
    "Overall margin hides the mix",
    `Knowing “we’re about X%” is not the same as knowing which customers, jobs, or SKUs produce it. Mix shifts are how healthy-looking companies get poorer. A simple contribution view — even on the top ten customers or jobs — would change the next pricing conversation.`,
  );
}

function rankedFindings(answers: Answers, dims: Record<DimensionId, number>): ReportFinding[] {
  const all = [
    booksFinding(answers, dims.books),
    cashFinding(answers, dims.cash),
    forecastFinding(answers, dims.forecasting),
    systemsFinding(answers, dims.systems),
    profitFinding(answers, dims.profitability),
  ];
  const weight = { gap: 0, watch: 1, strength: 2 };
  return all.sort((a, b) => {
    const sev = weight[a.severity] - weight[b.severity];
    if (sev !== 0) return sev;
    return dims[a.dimension] - dims[b.dimension];
  });
}

function nextSteps(answers: Answers, dims: Record<DimensionId, number>): NextStep[] {
  const steps: NextStep[] = [];
  const friction = answers.friction;

  if (dims.cash < 70 || friction === "cash_tight" || friction === "afford") {
    steps.push({
      timeframe: "this week",
      title: "Stand up a 13-week cash view",
      detail:
        "One sheet. Beginning cash, expected inflows by week, committed outflows (payroll, rent, taxes, vendors, draws). Update it every Friday. The first version will be wrong. That is the point — you will see where it is wrong.",
    });
  }
  if (dims.books < 70 || friction === "trust" || friction === "lag" || friction === "tax_time") {
    steps.push({
      timeframe: "this month",
      title: "Install a monthly close with a date",
      detail:
        "Pick a close date (business day 10 is a common, humane target) and a one-page package: P&L vs prior month, cash position, AR/AP aging, and three numbers you actually use. If a number cannot be explained, it does not belong on the page yet.",
    });
  }
  if (dims.profitability < 65 || friction === "margin_box") {
    steps.push({
      timeframe: "this month",
      title: "Name the unit of profit",
      detail:
        "Job, customer, location, or SKU — pick one. Calculate contribution on the top ten. You do not need a perfect cost system. You need to stop averaging away the work that does not pay.",
    });
  }
  if (dims.forecasting < 70) {
    steps.push({
      timeframe: "this quarter",
      title: "Replace the annual binder with a rolling forecast",
      detail:
        "Three scenarios is enough: base, tight, and stretch. Tie them to hires and capital so a decision has a home. Revisit monthly. A forecast that cannot survive contact with last month is a wish list.",
    });
  }
  if (dims.systems < 65 || friction === "no_owner") {
    steps.push({
      timeframe: "this quarter",
      title: "Name an owner of the finance function",
      detail:
        "Not a title. A person who is accountable for the close, the cash view, and the package. If that cannot be an internal seat yet, it is a designed partnership — not a bookkeeper who appears in March.",
    });
  }
  if (steps.length < 3) {
    steps.push({
      timeframe: "this quarter",
      title: "Use the package to say no",
      detail:
        "A finance function that only reports is a historian. Pick one upcoming decision (hire, equipment, expansion, owner draw) and run it through cash, margin, and capacity before you commit. That is the habit worth keeping.",
    });
  }
  return steps.slice(0, 5);
}

function whatGoodLooksLike(answers: Answers): string {
  const band = answers.revenue ?? "1m_3m";
  const map: Record<string, string> = {
    under_500k: `At this stage, “good” is not a CFO office. It is a clean monthly close, a bank reconciliation you trust, and a simple forward cash view so a slow month does not become a crisis. Bookkeeping should no longer be a December project.`,
    "500k_1m": `Companies in this band that feel calm usually have three things: a close by business day 10, a 13-week cash forecast updated weekly, and a person — internal or partner — who can answer “can we afford this?” without opening twelve tabs.`,
    "1m_3m": `This is where a real finance function earns its keep. Good looks like: monthly package used in a standing meeting, rolling forecast, contribution visibility on the work that matters, and systems that do not require a reconstruction every month-end. Most companies here still have a bookkeeper. The ones that scale have a designed finance operating cadence.`,
    "3m_10m": `At $3M–$10M, lagging books are no longer a quirk — they are a risk. Good looks like an owned close, integrated systems, a forecast that leadership actually uses, and advisory that sits in pricing, hiring, and capital decisions. If finance is still “the person who does QuickBooks,” the company has outgrown its infrastructure.`,
    over_10m: `At this scale, good is a finance engine: timely close, scenario planning, cash and covenant visibility, and a partner (internal or fractional) who can translate the package into decisions. Reporting that arrives after the decision is archaeology.`,
  };
  return map[band] ?? map["1m_3m"];
}

function headlineFor(score: number, answers: Answers): string {
  const n = nameOf(answers);
  if (score >= 85) {
    return n
      ? `${n} has a real foundation. The work now is to use it.`
      : "The foundation is here. The work now is to use it.";
  }
  if (score >= 65) {
    return n
      ? `${n} can see more than most companies at this stage — and the remaining gaps are specific.`
      : "You can see more than most companies at this stage — and the remaining gaps are specific.";
  }
  if (score >= 40) {
    return n
      ? `${n} has outgrown the way finance is currently run.`
      : "The business has outgrown the way finance is currently run.";
  }
  return n
    ? `At ${n}, finance is still a rear-view mirror. The company is already driving.`
    : "Finance is still a rear-view mirror. The company is already driving.";
}

function explanation(score: number, answers: Answers, dims: Record<DimensionId, number>) {
  const friction = answers.friction
    ? FRICTION_LABEL[answers.friction]
    : "the usual strain of a company that grew first and built the finance function second";
  const weakest = (Object.entries(dims) as [DimensionId, number][])
    .sort((a, b) => a[1] - b[1])[0];
  const weakestLabel = {
    books: "the quality and usefulness of the books",
    cash: "cash visibility, especially 30–90 days out",
    forecasting: "forecasting and planning",
    systems: "systems and automation",
    profitability: "seeing where profit actually comes from",
  }[weakest[0]];

  return `This score is a snapshot of financial clarity — not of how hard ${you(answers)} work, and not of whether the company is “good.” It reflects books, cash visibility, forecasting, systems, and profitability signal. The sharpest friction you named was ${friction}. The dimension pulling the score most is ${weakestLabel} (${weakest[1]}). That is the place to start; everything else gets easier once that is less foggy.`;
}

export function buildFallbackReport(answers: Answers): ClarityReport {
  const { dims, score, band, bandLabel, dimensions } = scoreBundle(answers);
  const findings = rankedFindings(answers, dims);
  return {
    score,
    band,
    bandLabel,
    headline: headlineFor(score, answers),
    scoreExplanation: explanation(score, answers, dims),
    dimensions,
    findings,
    whatGoodLooksLike: whatGoodLooksLike(answers),
    nextSteps: nextSteps(answers, dims),
    closingNote: `${You(answers)} do not need a more complicated dashboard. ${You(answers)} need a close ${you(answers)} trust, a cash view that looks forward, and a cadence that turns those numbers into decisions. That is the whole job.`,
    generatedAt: new Date().toISOString(),
    source: "fallback",
    answers,
  };
}

export function buildSampleReport(): ClarityReport {
  const answers: Answers = {
    revenue: "1m_3m",
    industry: "construction",
    state: "NV",
    books: "tax_bookkeeper",
    cashToday: "bank_look",
    cashForward: "tighter_than_pl",
    reporting: "late_pl",
    forecasting: "ad_hoc",
    friction: "cash_tight",
    systems: "spreadsheet_truth",
    profitability: "fuzzy",
    company: "Northline Construction",
  };
  const report = buildFallbackReport(answers);
  report.source = "sample";
  report.headline =
    "Northline Construction has outgrown the way finance is currently run.";
  return report;
}
