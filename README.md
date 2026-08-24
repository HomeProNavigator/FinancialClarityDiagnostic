# Financial Clarity Diagnostic

Free 3-minute finance diagnostic for growing U.S. businesses. Owners answer a short questionnaire, get a Clarity Score (1–100) and a plain-English report, then can introduce themselves to [Visari Financial](https://visarifinancial.com/contact).

Conversations started from this tool are tagged to the referring partner (`ref=kyle` by default).

## What it includes

- Landing page and SEO guides
- Multi-step diagnostic (under 3 minutes)
- Personalized report with print/PDF and email summary
- Introduction form before Visari, so named leads are captured
- Partner inbox of click-throughs and introductions

## Deploy on Netlify

1. In Netlify, **Add new site → Import an existing project** and select this GitHub repo.
2. Build settings (also in `netlify.toml`):
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`  
     If the site is blank after the first deploy, switch publish to `dist/client` and retry.
3. **Environment variables** (Site configuration → Environment variables):

   | Variable | Required | Purpose |
   |---|---|---|
   | `DATABASE_URL` | Yes, for the inbox | Postgres connection string (Neon free tier works). Without it, introductions reset on every request. |
   | `XAI_API_KEY` | No | Uses Grok for the report narrative. If omitted, a local writer still produces a full report. |
   | `VITE_AUTH_ENABLED` | No | Leave `false`. |

4. Deploy. After Neon is connected, the first build runs `db:migrate` and creates the inbox tables.

### Partner inbox

After deploy, open `/inbox` and use access code **`kyle-visari-clarity`**.

Share the diagnostic as `https://your-site.netlify.app/?ref=kyle` (or another partner code). That code rides through to Visari’s contact URL.

## Local

```bash
npm install
npm run dev
```

The app serves on port 8080. Without `DATABASE_URL`, a local in-memory Postgres (PGLite) is used.

```bash
npm run typecheck
npm run build
```

## Privacy

Diagnostic answers stay in the browser unless the owner submits the Visari introduction form. That form stores name, email, optional company/note, and the referral code so Visari and the referring partner can follow up.
