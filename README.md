# Abdullah Shaban — CV & Portfolio

Personal CV, portfolio and services site with a built-in content dashboard.

## Run

```bash
npm i
npm run dev
```

- Site: http://localhost:3000
- Dashboard: http://localhost:3000/#/admin

## Languages

The site is bilingual (English / Arabic, with full right-to-left layout). Visitors switch with the button in the
navbar; the first visit follows the browser language, or a link like `/?lang=ar`. Interface text lives in
`src/i18n.tsx`; every content field has an English and an Arabic version in the dashboard (if one is empty,
the site shows the other).

## How content works

All content (profile, experience, education, skills, portfolio, services, testimonials) lives in one
JSON object (`src/data/types.ts`). Starter content is in `src/data/defaultContent.ts`.

The dashboard saves to:

1. **Supabase** (live for every visitor) when you're signed in, or
2. **this browser only** in offline mode. Use *Backup & restore → Download backup* to keep a copy.

### Supabase (project `mycv` · aknzyzmbrxrriglsvarr)

Already set up: tables `site_content` + `service_requests`, a public `media` image bucket,
row-level security (only `abdullah.shaban165@gmail.com` can write), and public sign-ups disabled.
The SQL lives in `supabase/migrations/001_site_content.sql`.

Remaining one-time step: Supabase → Authentication → Users → *Add user* → *Create new user*
with that email and a strong password (tick *Auto Confirm User*). Then sign in at `/#/admin`
and press **Save changes** once to publish.

Signed in, uploaded images go to the `media` bucket (up to 5 MB) and the *Service requests*
tab lists requests sent from the site.

## Brand

- **Idea:** an extension of the LinkedIn cover and talk slides — dark stage, electric violet, amber highlights.
- **Logo:** a lightbulb whose filament is the letter "A", on a violet gradient tile, with an amber spark.
  Files: `public/logo.svg`, `src/brand/Logo.tsx`.
- **Colors:** Violet `#8B5CF6` (deep `#6D28D9`), Amber `#FFC21A`, Coral `#E8694C`, Lavender `#B9A3FF`, near-black `#07060C`, text `#F4F2FB`.
- **Type:** Manrope (Latin headings), Inter (Latin body), Readex Pro / IBM Plex Sans Arabic (Arabic).
- **Highlight rule:** in the dashboard headline, wrap the key phrase in `[brackets]` to highlight it.

## Deploy (GitHub Pages)

Live at **https://mostafavipecoder.github.io/CV/** (dashboard: `/CV/#/admin`).

Every push to `main` builds and deploys via `.github/workflows/deploy.yml`.
Build-time settings live in the repo's *Settings → Secrets and variables → Actions → Variables*:
`VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`, `VITE_CONTACT_FORM_URL` (optional `VITE_GA_ID`).
Content edits from the dashboard go straight to Supabase — no redeploy needed.
