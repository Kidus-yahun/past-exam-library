# Past Exam Library

Past exam papers and practice questions for Ethiopian Grade 9–12 students.

This branch is a rewrite of the original app. The original is kept in `legacy/` for reference;
its data (papers, questions, unit notes, formula sheets) is imported from there.

## What's in it

- **Library**: papers by grade and subject, search across all papers, bookmarks, in-app PDF
  reader, offline badge for papers saved on the device
- **Practice**: mixed sets or a whole paper, practice mode (instant feedback) or timed exam
  mode (flags, question map), results with review and a retry of missed questions; signed-in
  attempts are saved and can be resumed
- **Study**: unit notes with formulas, formula sheets, a 25/5 focus timer, private notes per
  unit, community tips, and Archie (AI study coach)
- **Progress & Home**: streaks, XP, daily goal, subject strength
- **Accounts**: email/password (Google when configured), onboarding (grade, stream, goal)
- **Admin**: overview, paper uploads, question review, students
- **Offline**: installable; the app shell, opened papers and catalog data work without data
- Light and dark themes throughout

Not carried over (yet): Telegram duels, shared streaks, the avatar studio and ID card, the
national-exam countdown, Google Analytics and its cookie banner, the Android APK wrapper.

## Docs

- `docs/DEPLOYMENT.md`: putting it online (Supabase + Vercel)
- `docs/HANDOFF.md`: context, open items, and working with AI agents
- `AGENTS.md`: rules AI coding agents must follow in this repo

## Stack

- **SolidJS** + **TypeScript** (strict), built with **Vite**
- **Ark UI** for accessible, unstyled components
- **Panda CSS** for styling; every color is a semantic token with light and dark values
- **Supabase**: Postgres with row level security, Auth, Storage for the PDFs
- **TanStack Query** for data fetching and caching
- **Vercel** for hosting; functions in `api/` hold anything that needs a secret
- **pdf.js** for the reader, **Temml** for formulas (MathML, no web fonts),
  **vite-plugin-pwa** (Workbox) for offline
- **bun** for installs and scripts, **Biome** for lint/format, **Vitest** for tests

## Layout

```
api/            Vercel functions (tutor.ts = Archie); served by Vite in development
src/
  app/          router, app shell (sidebar on desktop, tab bar on mobile)
  features/     one folder per area: account, library, reader, practice, study,
                progress, home, admin
  lib/          supabase client, auth, env validation, theme, offline, generated DB types
  ui/           shared components, icons, forms, page layout
supabase/
  migrations/   schema, RLS policies and database functions
  seed.sql      local test accounts only (never run against production)
scripts/
  import-legacy.ts    imports papers, PDFs, questions, unit notes and formula sheets
```

## Getting started

Needs bun and Docker.

```bash
bun install
bun run db:start                     # local Supabase (first run downloads images)
bun run db:reset                     # apply migrations + seed
bun run db:import                    # papers, PDFs, questions, notes from legacy/
bun run db:types                     # regenerate src/lib/database.types.ts
cp .env.example .env.local           # fill in keys from `bunx supabase status`
bun run dev
```

`supabase/seed.sql` creates a local test student and admin (credentials in that file).
Archie needs `GEMINI_API_KEY` in `.env.local`; without it the tutor says it isn't switched on.

To test offline behaviour locally, build against the preview server's own origin (some
browsers block service workers from reaching `127.0.0.1`):

```bash
VITE_SUPABASE_URL=http://localhost:4173 bun run build && bun run preview --port 4173
```

## Data notes

- 78 of the 136 legacy papers have no PDF in this repository (the old server fetched them
  from another GitHub repo); the importer skips them and reports the count.
- The legacy batch labelled "Final Exam" contains mislabelled questions (e.g. singing
  technique under Grade 12 Physics). They're imported with `needs_review` and stay out of
  practice until an admin approves them.

## Theme

The app follows the device's light/dark setting by default; students can pin Light or Dark
under Appearance. `index.html` applies the theme before first paint so there is no flash.
Use semantic tokens (`bg`, `surface`, `ink`, `brand`, `streak`, `wrong`, `hover`, …), never
raw colors.

## Checks

```bash
bun run typecheck
bun run lint
bun run test
bun run build
```
