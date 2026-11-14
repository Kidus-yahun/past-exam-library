# AGENTS.md

Instructions for AI coding agents (Antigravity, Claude Code, Codex, Cursor…) working in this
repository. Read this whole file before changing anything. If a request conflicts with a rule
here, stop and ask the human instead of working around the rule.

## What this is

Past Exam Library: past exam papers, practice questions and study notes for Ethiopian Grade
9–12 students. Most students use cheap Android phones on paid mobile data, often shared with
family. Every decision should respect that: small downloads, works offline, private by default.

- Frontend: SolidJS + TypeScript (strict), Vite, Ark UI, Panda CSS, TanStack Query
- Backend: Supabase (Postgres with row level security, Auth, Storage); Vercel functions in `api/`
- Tooling: **bun** (never npm/pnpm/yarn), Biome, Vitest
- `legacy/` is the old app, kept read-only for reference. Do not edit it or copy code from it.

## Commands

```bash
bun install
bun run dev            # app on http://localhost:5173 (also serves api/* locally)
bun run typecheck      # tsc --noEmit
bun run lint           # biome check .
bun run test           # vitest
bun run build          # panda codegen + typecheck + vite build
bun run db:start       # local Supabase (Docker)
bun run db:reset       # LOCAL ONLY: rebuild local DB from migrations + seed
bun run db:types       # regenerate src/lib/database.types.ts after a migration
bun run db:import      # import legacy content into the database in SUPABASE_URL
```

## Hard rules: never do these

### Secrets and production

1. **Never commit secrets.** No real keys, tokens or passwords in code, docs, tests or commit
   messages. `.env*` files stay uncommitted (only `.env.example`, with empty values).
2. **Never expose server keys to the browser.** `SUPABASE_SERVICE_ROLE_KEY` / secret keys and
   `GEMINI_API_KEY` are used only in `api/` and `scripts/`. Never prefix them with `VITE_`, never
   import them from `src/`.
3. **Never touch the production database or project without an explicit "yes" from the human
   in this conversation.** That includes `supabase db push`, `supabase link`, `db reset --linked`,
   SQL against a hosted project, running `db:import` with production keys, and deleting Storage
   files. Local commands (`db:reset` without `--linked`) are fine.
4. **Never run `supabase/seed.sql` against production** and never pass `--include-seed` to a
   push. It creates accounts with publicly known passwords, including an admin.
5. Never deploy, push to `main`, force-push, or merge PRs unless the human asks in so many words.

### Database

6. **Never edit a migration that already exists.** Schema changes go in a new file:
   `bunx supabase migration new <name>`. Then `bun run db:reset` locally and `bun run db:types`.
7. **Every new table enables row level security in the same migration**, with explicit
   policies. Never add a policy that lets `anon` or `authenticated` write freely
   (`with check (true)`), never disable RLS, never grant `update` on `profiles.role`.
8. Student data (profiles, attempts, answers, notes, bookmarks, focus sessions) is private to
   its owner. Admin views go through `security definer` functions that check
   `public.is_admin()` first — follow `admin_overview()` as the pattern.
9. Never mark questions as reviewed in bulk (`needs_review = false` for many rows). The flagged
   ones contain mislabelled questions; a human approves each in the admin console.

### Content and honesty

10. **Never invent content.** No made-up exam questions, answers, explanations, papers, unit
    notes, statistics, exam dates or Amharic translations. Content comes from real sources
    supplied by the human. If something is missing, leave it missing and say so.
11. Never claim something works without running it. Before saying a task is done, run
    `bun run typecheck && bun run lint && bun run test && bun run build` and report the real
    result, including failures.
12. Never silence errors to make checks pass: no `@ts-ignore`, `any`, `biome-ignore`, skipped
    tests or deleted assertions without the human agreeing.

### Frontend

13. **Never render stored text as HTML.** No `innerHTML`, no HTML strings from the database.
    Notes use the light-markdown renderer in `src/ui/LightMarkdown.tsx`.
14. **No raw colors.** Use the semantic tokens from `panda.config.ts` (`bg`, `surface`, `sunk`,
    `line`, `ink`, `brand`, `streak`, `wrong`, `hover`…). Every UI change must work in **light
    and dark** and at **375 px wide**. If a new color is needed, add a token with both values.
15. No new dependency without saying why in the PR, its size, and what it replaces. Never load
    scripts or fonts from a CDN at runtime. Heavy code (PDF, maths) stays in lazily loaded routes.
16. Never cache a student's own data in the service worker. Only catalog tables listed in
    `vite.config.ts` may be cached (phones are shared).
17. No emoji as icons, no gradients-as-decoration, no fake loading spinners for content that
    has a skeleton. Follow the existing components before inventing new ones.

### Scope

18. Do only what was asked. No drive-by refactors, renames, reformatting of untouched files, or
    "while I'm here" features. If you notice something else worth fixing, mention it instead.
19. Don't delete files you didn't create in this task unless the human asked.

## Conventions

- Code lives in `src/features/<area>/` (library, reader, practice, study, progress, home,
  account, admin). Shared UI in `src/ui/`, shared logic in `src/lib/`.
- Data access goes in each feature's `api.ts`. Validate every response from Supabase or an API
  with zod before using it. Use generated types from `src/lib/database.types.ts`.
- Pure logic (scoring, streaks, search, parsing) lives in plain `.ts` files with Vitest tests next
  to them (`*.test.ts`). New logic of this kind needs tests.
- Accessibility is required: real `<button>` and `<a>` elements, labels on every input,
  `aria-label` on icon-only buttons, touch targets at least 44 px, visible focus.
- URLs carry state that should survive a refresh or be shareable (`?grade=12&subject=physics`).
- Commits follow Conventional Commits (`feat(practice): …`, `fix(library): …`). One concern per
  commit. Work on a branch and open a PR; describe what you tested and what you didn't.

## Before you finish a task

1. `bun run typecheck && bun run lint && bun run test && bun run build` all pass.
2. If you changed the schema: new migration, `bun run db:reset`, `bun run db:types`, and RLS
   policies for any new table.
3. If you changed UI: checked in the browser in light and dark, at desktop and 375 px.
4. Your summary says what changed, what you verified, and what you could not verify.
