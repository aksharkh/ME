# msmemarg.com

Website for **MSME Marg** — Financial Consultant for MSMEs (a division of Six Star Axis Ventures), Dooravaninagar, Bengaluru.
Helps small businesses in Karnataka get government loans and subsidies (PMEGP, Mudra, CGTMSE, PMFME, Udyogini, Stand-Up India…).

Next.js 16 (App Router, Cache Components) · Tailwind CSS 4 · Motion · lucide-react.

```bash
npm install
npm run dev     # http://localhost:3000
npm run build
```

## Brand

- Colours come from the founder's visiting card: `brand-900` **#014425** is the card green; the rest of the `brand-*` scale and `sage-*` (the card's accent underline) are defined in `src/app/globals.css`.
- The logo (`src/components/layout/Logo.tsx`) is redrawn as SVG from the card — three rising bars + "MSME / Marg" set in Arimo Bold. `BarsMark` is the bars alone (favicon, watermarks).
- Business details (phone, email, address, founder) live in `src/lib/site.ts`.

## Languages

- English is served at `/`, Kannada at `/kn` (e.g. `/schemes` ↔ `/kn/schemes`). `src/proxy.ts` rewrites unprefixed URLs to the `en` route and remembers a visitor's choice in the `lang` cookie.
- Every visible string lives in `src/i18n/en.ts` and `src/i18n/kn.ts` (same shape — `kn.ts` is typed against `en.ts`, so a missing key fails the build). `alt` fields are the small Kannada line under English headings and are empty in `kn.ts`.
- Server components read text with `getDictionary()` (`src/i18n/server.ts`); client components use `useI18n()` (`src/i18n/client.tsx`).

## Before launch

- Confirm WhatsApp is on **+91 90364 40914** (assumed to be the same as the phone on the card) — `site.whatsapp` in `src/lib/site.ts`.
- Set `ENQUIRY_WEBHOOK_URL` (Google Apps Script, Zapier, a CRM…) so form leads are forwarded; without it leads are only logged by `src/app/api/enquiry/route.ts`.
- Review promises written as placeholders with the client: "free first consultation", "project report in 48 hrs", "call back the same day", and the four values on the About page.
- Re-check scheme figures in the dictionaries against the official portals (especially Udyogini and Karnataka incentives).
- Have a native Kannada speaker review `src/i18n/kn.ts`.
- Optional: real photos of the office / founder / client units would strengthen the About and Contact pages.
