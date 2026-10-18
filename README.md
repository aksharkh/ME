# msmemarg.com

Website for **MSME Marg** — Financial Consultant for MSMEs (a division of Six Star Axis Ventures), Dooravaninagar, Bengaluru.
Helps small businesses in Karnataka get government loans and subsidies (PMEGP, Mudra, CGTMSE, PMFME, Udyogini, Stand-Up India…).

Next.js 16 (App Router, Cache Components) · Tailwind CSS 4 · Motion · lucide-react.

```bash
npm install
npm run dev     # http://localhost:3000
npm run build
```

## Brand & colour themes

- The card green **#014425** (logo background, key numbers, footers) is in every theme. The logo (`src/components/layout/Logo.tsx`) is redrawn as SVG from the card; its colour follows the band it sits on (white on dark, card green on light).
- **Six themes** live in `src/lib/themes.ts`: Brass & Ivory (default), Classic Green (the first all-green version), Forest & Mint, Sage & Stone, Emerald Light, Midnight Forest.
  - Every section is tagged with a role (`data-sec="hero"`, `"footer"`…) and components only use role tokens (`bg-s-bg`, `text-s-fg`, `text-s-accent`, `bg-s-btn`…). Each theme maps roles to surfaces, and `themeCss()` generates the CSS. Light cards inside dark bands use `.sf-paper`; dark panels use `.sf-panel`.
  - Rule kept by every new theme: two neighbouring bands never share a surface. Inner pages put the enquiry band after a plain page section, so it has its own role there (`ctaPage`, via `<CtaBand onPage />`). Classic Green is the one exception (green header on a green hero), kept as the original design.
  - Themes also change corner radius (Sage rounder, Emerald crisper) and button style.
- **Theme picker** — a palette button above WhatsApp (`src/components/layout/ThemePicker.tsx`) lets the client try every theme on the live site; the choice is stored in the browser. A link like `https://msmemarg.com/?theme=forest` opens the site in that theme (ids: `brass`, `classic`, `forest`, `sage`, `emerald`, `midnight`).
  - Once the client decides: set `DEFAULT_THEME` in `src/lib/themes.ts` and `showThemePicker: false` in `src/lib/site.ts`. With the picker off, the page ships only the default theme's CSS and ignores choices saved in browsers.
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
