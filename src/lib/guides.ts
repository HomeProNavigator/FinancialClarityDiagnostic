export type Guide = {
  slug: string;
  title: string;
  description: string;
  kicker: string;
  readMinutes: number;
  paragraphs: string[];
  pull?: string;
};

export const GUIDES: Guide[] = [
  {
    slug: "cash-feels-tight",
    kicker: "Cash",
    title: "Why cash feels tight even when the P&L looks fine",
    description:
      "Profit is not cash. Timing, receivables, job costs, draws, and tax estimates are how a healthy-looking company still holds its breath at payroll.",
    readMinutes: 5,
    pull:
      "A P&L tells you whether the work was worth doing. A 13-week cash view tells you whether you can make it to the work.",
    paragraphs: [
      "Owners say this in almost the same words: “We had a good month. I don’t understand why the account looks like this.” The P&L is not lying. It is answering a different question.",
      "Accrual profit records revenue when it is earned and costs when they belong to the work. Cash records what actually moved. Between those two views sit the usual suspects: invoices that have not been paid, deposits you already spent in your head, materials bought before the draw, payroll that hits every other Friday regardless of the job schedule, estimated taxes, owner distributions, and the slow vendor you finally had to pay.",
      "Construction, healthcare, professional services, and any business with deposits or retainers feel this first. A job can be profitable on paper and still starve the account for six weeks. A retainer can make a month look rich and then vanish when the work is delivered.",
      "The diagnostic tell is simple. If you look at the bank to know where you stand, you have a balance, not a position. A position includes what is already committed, what is likely to clear, and what is sitting in receivables that will not.",
      "The fix is not a more beautiful P&L. It is a rolling 13-week cash forecast, updated on a rhythm (Friday is enough), with the uncomfortable items named: payroll, rent, taxes, insurance, draws, and the invoices you hope will land. The first version will be wrong. That is useful. You will see where it is wrong.",
      "Companies that do this stop treating cash tightness as a personality trait. It becomes a timing problem with a date on it. That is the beginning of financial clarity, and it is usually the first thing a growing business still does not have.",
    ],
  },
  {
    slug: "finance-function-lagging",
    kicker: "Operations",
    title: "Signs your finance function is lagging behind growth",
    description:
      "Revenue scaled. The close did not. Here is how to tell the finance function is still built for a smaller company, and what “caught up” actually looks like.",
    readMinutes: 6,
    pull:
      "If the numbers arrive after the decision, finance is a historian. Growing companies need a co-pilot.",
    paragraphs: [
      "A business can outrun its finance function without anyone naming it. Sales hired. A second location opened. Jobs got larger. The bookkeeper is still the same person, on the same cadence, closing last quarter in time for tax estimates.",
      "The lag shows up as friction, not as a missed GAAP memo. You delay a hire because you cannot see the next 90 days of cash. Pricing conversations happen without contribution margin. Month-end is a reconstruction. Two people in the company would give two different answers to “how did we do last month?” You find out the real year in March.",
      "Another tell: reports exist and nobody uses them. A P&L that arrives on the 22nd, with accounts you do not recognize, trains the company to steer by bank balance and gut. Gut is not a system. It is a stopgap that worked when the owner could hold the whole picture in their head.",
      "At roughly $1M-$3M this becomes structural. Complexity arrived (more people, more customers, more ways to be busy and not profitable) and finance is still a trailing record. At $3M-$10M it becomes a risk. Decisions are large enough that a six-week-old number is not conservative. It is fiction.",
      "Caught up does not mean a full-time CFO on day one. It means a close with a date, a package that fits on a page and is used in a meeting, a cash view that looks forward, and a named owner of the function. If that owner cannot be internal yet, it is a designed partnership, not a bookkeeper who appears when the CPA emails.",
      "The free diagnostic is built to locate the lag in five signals: books, cash, forecasting, systems, and profitability. Most owners already feel the lag. They have not seen it scored, in order, in language they can act on.",
    ],
  },
  {
    slug: "forecasting-readiness",
    kicker: "Planning",
    title: "Forecasting readiness for growing businesses",
    description:
      "An annual budget in a drawer is not a forecast. Readiness is a rolling view of revenue, margin, cash, and capacity that can survive contact with last month.",
    readMinutes: 5,
    pull:
      "A forecast that cannot be wrong in public is a wish list. The value is the weekly disagreement with reality.",
    paragraphs: [
      "Owners often say they “have a forecast” and mean one of three things: last year’s P&L plus ten percent, a revenue target on a whiteboard, or a spreadsheet built the night before a bank meeting. None of those will answer the question that actually arrives: can we afford this hire, this truck, this lease, this draw, this extra crew?",
      "Forecasting readiness is not sophistication. It is whether the company can see two to four quarters in a way that changes a decision. The ingredients are boring on purpose: expected revenue by the unit of work (job, customer, location), the margin that work should produce, the operating costs that do not care, and the cash that has to clear.",
      "Three scenarios are enough. Base, tight, stretch. If a plan only works in stretch, it is not a plan. If tight still covers payroll, insurance, and tax estimates, you have a floor. That floor is what lets an owner sleep.",
      "The operating habit matters more than the model. A rolling forecast revisited monthly, weekly for cash, beats an annual binder. When last month disagrees with the model, you update the model. That disagreement is the whole product.",
      "Companies that skip this feel a particular strain: they hit the revenue number and still feel broke, or they freeze on a hire they could have made. Both are forecasting problems dressed up as personality.",
      "If you are not sure whether you are ready, the test is a single sentence. “If a $12k monthly hire showed up tomorrow, I could tell you in twenty minutes whether cash and margin can carry it.” If that sentence is not true, forecasting is the gap, not motivation.",
    ],
  },
  {
    slug: "beyond-bookkeeping",
    kicker: "Stage",
    title: "When bookkeeping is no longer enough",
    description:
      "Clean books are the floor. Growing companies need a close, a cash view, a forecast, and someone who will sit in the decisions those numbers imply.",
    readMinutes: 5,
    pull:
      "Bookkeeping tells you where you have been. A finance function helps you decide where you are going.",
    paragraphs: [
      "Bookkeeping is not the enemy. It is the floor. Accurate, timely books are how you stop arguing with reality. Many growing companies do not even have that. The close is late, the accounts are a tax-shaped compromise, and the only person who can explain a number is on vacation.",
      "The moment bookkeeping stops being enough is the moment decisions get larger than the last bank screenshot. A second location. A key hire. Equipment. A job that would double volume and starve cash. An owner draw that felt fine in a good month. Tax estimates that used to be rounding errors.",
      "What has to sit on top of the books is a cadence. A monthly close with a date. A one-page package leadership actually uses. A 13-week cash view. A rolling forecast. Contribution visibility on the work that matters. A named owner of the function who can say “not this quarter” without drama.",
      "This is the work Visari calls a financial engine: accounting, systems, cash visibility, forecasting, and advisory in one motion. Most firms stop at the historian’s job. Growing owners need the co-pilot’s job.",
      "You do not have to install all of it in a week. You do have to stop pretending that a bookkeeper-plus-CPA-in-March is a finance function. It is a compliance stack. Compliance keeps you legal. It does not tell you whether the next hire is a good idea.",
      "If you are in that in-between (books that mostly exist, decisions that already don’t), start with the diagnostic. It will not sell you software. It will show which of the five signals is actually the bottleneck, in order, in language you can take to a partner or to your Monday meeting.",
    ],
  },
  {
    slug: "cash-visibility",
    kicker: "Cash",
    title: "Cash flow visibility 30-90 days out",
    description:
      "Knowing today’s balance is not visibility. Visibility is a rolling view of what is committed, what is likely, and what will not clear, far enough ahead to change a decision.",
    readMinutes: 4,
    pull:
      "The expensive surprises in a growing company almost never happen today. They happen in week six.",
    paragraphs: [
      "Cash visibility is talked about as if it were a dashboard. It is a calendar. The question is not “what is in the account.” The question is “what does the next six to thirteen weeks look like if the world is only as kind as it has been.”",
      "Thirty days catches payroll, rent, and the invoice you are sure will land. Ninety days catches the tax estimate, the insurance, the slow-pay customer, the job that starts before it bills, and the hire whose first three paychecks arrive before their work does. That is the window where growing companies get hurt.",
      "A usable 13-week view is almost always a spreadsheet at first. Beginning cash. Inflows by week, named (not “collections”). Outflows by week, named (payroll, vendors, tax, draws, debt). A row for the gap. Update it every Friday. Highlight the weeks that go negative even if the month is “fine.”",
      "Do not wait for perfect integrations. The first forecast built from the bank, the open invoices, and the known bills will already be more honest than the P&L. Integrations come after the habit, not before.",
      "When this is working, the tone of the company changes. Hires get a date. Draws get a rule. The owner stops treating tightness as weather. Finance becomes something you can point at, which is the beginning of trusting it.",
      "If you cannot currently see 30-90 days with enough confidence to bet a hire on it, that is the first finding a clarity diagnostic will surface, and the first thing worth fixing.",
    ],
  },
];

export function guideBySlug(slug: string) {
  return GUIDES.find((g) => g.slug === slug);
}
