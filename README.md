# Past Exam Library

Past exam papers and practice questions for Ethiopian Grade 9–12 students.

This branch is a rewrite of the original app (kept in `legacy/` for reference until the new
one reaches feature parity).

## Stack

- **SolidJS** + **TypeScript** (strict), built with **Vite**
- **Ark UI** for accessible, unstyled components
- **Panda CSS** for styling; every color is a semantic token with light and dark values
- **Supabase**: Postgres with row level security, Auth, Storage for the PDFs
- **TanStack Query** for data fetching and caching
- **Vercel** for hosting (functions under `api/` for anything that needs a secret)
- **bun** for installs and scripts, **Biome** for lint/format, **Vitest** for tests

## Layout

```
src/
  app/          router, app shell (sidebar on desktop, tab bar on mobile)
  features/     one folder per area: library, practice, progress, home
  lib/          supabase client, env validation, theme, generated DB types
  ui/           shared components, icons, page layout
supabase/
  migrations/   schema + RLS policies
  seed.sql      grades and subjects
scripts/
  import-legacy.ts   imports legacy/data/db.json and exams/*.pdf
```

## Getting started

Needs bun and Docker.

```bash
bun install
bun run db:start                     # local Supabase (first run downloads images)
bun run db:reset                     # apply migrations + seed
bun run db:import                    # papers, PDFs and questions from legacy/
bun run db:types                     # regenerate src/lib/database.types.ts
cp .env.example .env.local           # paste the publishable key from `supabase status`
bun run dev
```

## Theme

The app follows the device's light/dark setting by default; students can pin Light or Dark
under Appearance. `index.html` applies the theme before first paint so there is no flash.
Use semantic tokens (`bg`, `surface`, `ink`, `brand`, `streak`, `wrong`, …) — never raw colors.

## Checks

```bash
bun run typecheck
bun run lint
bun run test
bun run build
```
