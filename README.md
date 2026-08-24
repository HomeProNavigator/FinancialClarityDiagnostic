# Financial Clarity Diagnostic

Free 3-minute finance diagnostic for growing U.S. businesses. Owners answer a short questionnaire, get a Clarity Score (1–100) and a plain-English report, then can request a free consultation with [Visari Financial](https://visarifinancial.com).

Requests are tagged to the referring partner (`ref=kyle` by default).

## What it includes

- Landing page and SEO guides
- Multi-step diagnostic (under 3 minutes)
- Personalized report with print/PDF and email summary
- Consultation request (name, email, phone, company) plus diagnostic Q&A
- Netlify Forms capture — you pass the row to Visari; they follow up. No second form.

## Deploy on Netlify

1. Import this GitHub repo. `netlify.toml` already sets:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
2. Optional environment variable: `XAI_API_KEY` (Grok-written reports; a local writer is used if omitted).
3. After deploy, enable the form:
   - Netlify → this site → **Forms** → **visari-intro**
   - Turn on **email notifications** so every request is emailed to you
4. Share as `https://financialclaritydiagnostic.netlify.app/?ref=kyle`

If the site is blank after the first deploy, switch publish directory to `dist/client` and retry.

### How credit works

1. Owner submits name, email, phone, and company on `/connect`
2. Netlify records the row with the diagnostic questions and answers and `ref=kyle`
3. You forward that row to Visari
4. Visari follows up to schedule a free business consultation

## Local

```bash
npm install
npm run dev
```

```bash
npm run typecheck
npm run build
```

## Privacy

Diagnostic answers stay in the browser unless the owner requests a consultation. That form is stored by Netlify Forms and passed to Visari Financial.
