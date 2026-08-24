import type { QuestionId } from "./types";

export type QuestionOption = {
  value: string;
  label: string;
  hint?: string;
  /** 0–100 contribution toward the parent dimension */
  score?: number;
};

export type Question = {
  id: QuestionId;
  title: string;
  helper: string;
  optional?: boolean;
  input: "choice" | "select" | "text" | "email";
  options?: QuestionOption[];
  placeholder?: string;
};

export const US_STATES: QuestionOption[] = [
  "AL","AK","AZ","AR","CA","CO","CT","DE","FL","GA","HI","ID","IL","IN","IA",
  "KS","KY","LA","ME","MD","MA","MI","MN","MS","MO","MT","NE","NV","NH","NJ",
  "NM","NY","NC","ND","OH","OK","OR","PA","RI","SC","SD","TN","TX","UT","VT",
  "VA","WA","WV","WI","WY","DC",
].map((code) => ({ value: code, label: code }));

export const QUESTIONS: Question[] = [
  {
    id: "revenue",
    title: "About where is annual revenue today?",
    helper:
      "A band is enough. This helps the report describe what “good” looks like at your stage — not to qualify you.",
    input: "choice",
    options: [
      { value: "under_500k", label: "Under $500k" },
      { value: "500k_1m", label: "$500k – $1M" },
      { value: "1m_3m", label: "$1M – $3M" },
      { value: "3m_10m", label: "$3M – $10M" },
      { value: "over_10m", label: "$10M+" },
    ],
  },
  {
    id: "industry",
    title: "What kind of business is it?",
    helper: "Optional. Industry shape how cash and margin usually behave.",
    optional: true,
    input: "choice",
    options: [
      { value: "professional_services", label: "Professional services" },
      { value: "construction", label: "Construction / trades" },
      { value: "healthcare", label: "Healthcare" },
      { value: "retail", label: "Retail / e-commerce" },
      { value: "manufacturing", label: "Manufacturing" },
      { value: "real_estate", label: "Real estate" },
      { value: "hospitality", label: "Hospitality" },
      { value: "other", label: "Other / mixed" },
    ],
  },
  {
    id: "state",
    title: "Where is the business based?",
    helper: "Optional. State is enough — this is a national diagnostic.",
    optional: true,
    input: "select",
    options: US_STATES,
    placeholder: "Select a state",
  },
  {
    id: "books",
    title: "How are the books actually kept?",
    helper: "Honest beats polished. The report is only useful if this is real.",
    input: "choice",
    options: [
      {
        value: "spreadsheet",
        label: "Mostly a spreadsheet, or I do it myself",
        score: 18,
      },
      {
        value: "tax_bookkeeper",
        label: "A bookkeeper, mainly to get through tax season",
        score: 42,
      },
      {
        value: "monthly_close",
        label: "Dedicated bookkeeper with a monthly close",
        score: 72,
      },
      {
        value: "real_team",
        label: "In-house or outsourced accounting with a real close process",
        score: 92,
      },
      {
        value: "inconsistent",
        label: "Inconsistent — it depends on the month",
        score: 28,
      },
    ],
  },
  {
    id: "cashToday",
    title: "How clearly do you know your cash position today?",
    helper: "Not the bank app glance. The number you would bet a hire on.",
    input: "choice",
    options: [
      {
        value: "precise",
        label: "I could tell you within a few dollars",
        score: 96,
      },
      {
        value: "reasonable",
        label: "I have a reasonable sense, within a week of actual",
        score: 72,
      },
      {
        value: "bank_look",
        label: "I look at the bank when I need to know",
        score: 44,
      },
      {
        value: "surprised",
        label: "Cash often surprises me",
        score: 22,
      },
      {
        value: "no_view",
        label: "I don’t have a reliable view",
        score: 8,
      },
    ],
  },
  {
    id: "cashForward",
    title: "How far ahead can you see cash — 30 to 90 days?",
    helper:
      "This is where growing companies usually feel the first real strain.",
    input: "choice",
    options: [
      {
        value: "thirteen_week",
        label: "A 13-week (or similar) forecast, updated on a rhythm",
        score: 96,
      },
      {
        value: "informal",
        label: "An informal projection I keep myself",
        score: 64,
      },
      {
        value: "estimate",
        label: "I can estimate, but it wouldn’t hold up under pressure",
        score: 40,
      },
      {
        value: "none",
        label: "I don’t forecast cash forward",
        score: 14,
      },
      {
        value: "tighter_than_pl",
        label: "Cash always feels tighter than the P&L, and I’m not sure why",
        score: 22,
      },
    ],
  },
  {
    id: "reporting",
    title: "What do financial reports actually do for you?",
    helper: "Frequency matters less than whether the package changes decisions.",
    input: "choice",
    options: [
      {
        value: "decision_package",
        label: "A monthly package I actually use to decide",
        score: 94,
      },
      {
        value: "late_pl",
        label: "A monthly P&L that arrives late or isn’t fully trusted",
        score: 48,
      },
      {
        value: "unused",
        label: "I get reports, but they don’t change how I operate",
        score: 36,
      },
      {
        value: "quarterly",
        label: "Quarterly, or mainly at tax time",
        score: 22,
      },
      {
        value: "rarely",
        label: "I rarely look at financial reports",
        score: 8,
      },
    ],
  },
  {
    id: "forecasting",
    title: "How do you plan the next two to four quarters?",
    helper: "A budget that sits in a drawer is not a forecast.",
    input: "choice",
    options: [
      {
        value: "rolling",
        label: "A rolling forecast tied to how we actually operate",
        score: 94,
      },
      {
        value: "annual",
        label: "An annual budget we don’t really revisit",
        score: 52,
      },
      {
        value: "ad_hoc",
        label: "Spreadsheets when a decision comes up",
        score: 38,
      },
      {
        value: "revenue_only",
        label: "We plan revenue, but not cash, margin, or capacity",
        score: 28,
      },
      {
        value: "none",
        label: "No formal forecast",
        score: 10,
      },
    ],
  },
  {
    id: "friction",
    title: "What is the sharpest financial friction right now?",
    helper: "Pick the one that costs you the most sleep or the slowest decisions.",
    input: "choice",
    options: [
      {
        value: "cash_tight",
        label: "Cash feels tight even when the P&L looks fine",
      },
      {
        value: "trust",
        label: "I don’t fully trust the numbers",
      },
      {
        value: "afford",
        label: "Hard to know if we can afford a hire, purchase, or expansion",
      },
      {
        value: "lag",
        label: "Month-end is a scramble — numbers lag the business",
      },
      {
        value: "no_owner",
        label: "No one really owns the finance function",
      },
      {
        value: "margin_box",
        label: "Profit by job, product, or location is a black box",
      },
      {
        value: "tax_time",
        label: "Tax time is when we find out how we actually did",
      },
    ],
  },
  {
    id: "systems",
    title: "How mature are the systems behind the numbers?",
    helper: "Tools are only as good as the handoffs between them.",
    input: "choice",
    options: [
      {
        value: "integrated",
        label: "Integrated stack — little re-keying, reporting flows",
        score: 94,
      },
      {
        value: "software_exports",
        label: "Accounting software in place, lots of exports and re-keying",
        score: 58,
      },
      {
        value: "spreadsheet_truth",
        label: "Spreadsheets hold the real picture",
        score: 32,
      },
      {
        value: "islands",
        label: "Multiple tools that don’t talk to each other",
        score: 24,
      },
      {
        value: "inbox",
        label: "Still mostly inbox, paper, and memory",
        score: 10,
      },
    ],
  },
  {
    id: "profitability",
    title: "How clearly do you see where profit actually comes from?",
    helper: "Busy and profitable are not the same thing.",
    input: "choice",
    options: [
      {
        value: "contribution",
        label: "I know contribution margin by offering, customer, or job",
        score: 94,
      },
      {
        value: "overall",
        label: "I know overall margin, not where it comes from",
        score: 62,
      },
      {
        value: "fuzzy",
        label: "Revenue is tracked; true profit is still fuzzy",
        score: 36,
      },
      {
        value: "tax_time",
        label: "I find out at tax time",
        score: 16,
      },
      {
        value: "unsure",
        label: "We are busy. I’m not sure we are making money.",
        score: 8,
      },
    ],
  },
  {
    id: "firstName",
    title: "Add a first name if you want the report addressed to you.",
    helper: "Optional. Stored on this device only.",
    optional: true,
    input: "text",
    placeholder: "First name",
  },
  {
    id: "email",
    title: "Want a copy you can forward to yourself?",
    helper:
      "Optional. We don’t add you to a list. Use this only if you want to open a message with your summary.",
    optional: true,
    input: "email",
    placeholder: "you@company.com",
  },
];

export const QUESTION_INDEX = Object.fromEntries(
  QUESTIONS.map((q) => [q.id, q]),
) as Record<QuestionId, Question>;

export function optionScore(questionId: QuestionId, value?: string): number | null {
  if (!value) return null;
  const q = QUESTION_INDEX[questionId];
  const opt = q.options?.find((o) => o.value === value);
  return opt?.score ?? null;
}

export const REVENUE_LABEL: Record<string, string> = {
  under_500k: "under $500k",
  "500k_1m": "$500k–$1M",
  "1m_3m": "$1M–$3M",
  "3m_10m": "$3M–$10M",
  over_10m: "$10M+",
};

export const INDUSTRY_LABEL: Record<string, string> = {
  professional_services: "professional services",
  construction: "construction and trades",
  healthcare: "healthcare",
  retail: "retail / e-commerce",
  manufacturing: "manufacturing",
  real_estate: "real estate",
  hospitality: "hospitality",
  other: "a mixed or other industry",
};

export const FRICTION_LABEL: Record<string, string> = {
  cash_tight: "cash that feels tighter than the P&L",
  trust: "numbers that are hard to trust",
  afford: "uncertainty about what the business can afford",
  lag: "financials that lag the real business",
  no_owner: "no clear owner of the finance function",
  margin_box: "unclear profit by job, product, or location",
  tax_time: "finding out the real year at tax time",
};
