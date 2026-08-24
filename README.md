# Financial Clarity Diagnostic

Free 3-minute finance diagnostic for growing U.S. businesses. Owners answer a short questionnaire, get a Clarity Score (1–100) and a plain-English report, then can introduce themselves to [Visari Financial](https://visarifinancial.com/contact).

Conversations started from this tool are tagged to the referring partner (`ref=kyle` by default).

## What it includes

- Landing page and SEO guides
- Multi-step diagnostic (under 3 minutes)
- Personalized report with print/PDF and email summary
- Introduction form before Visari
- Netlify Forms capture of every introduction, then an automatic handoff to Visari’s contact page

## Deploy on Netlify

1. Import this GitHub repo. `netlify.toml` already sets:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
2. Optional environment variable: `XAI_API_KEY` (Grok-written reports; a local writer is used if omitted).
3. After deploy, enable the form:
   - Netlify → this site → **Forms** → **visari-intro**
   - Turn on **email notifications** so every introduction is emailed to you
4. Share as `https://financialclaritydiagnostic.netlify.app/?ref=kyle`

If the site is blank after the first deploy, switch publish directory to `dist/client` and retry.

### How credit works

1. Owner submits name + email on `/connect`
2. Netlify records the row (name, email, company, note, `ref`, placement)
3. They are redirected to `visarifinancial.com/contact` with `ref=kyle` and UTM tags
4. You match Netlify’s form list to Visari conversations by email

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

Diagnostic answers stay in the browser unless the owner submits the Visari introduction form. That form is stored by Netlify Forms and shared with the referring partner.
