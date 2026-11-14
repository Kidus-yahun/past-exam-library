# Handoff: Past Exam Library rewrite

This document hands over the rewritten Past Exam Library. It explains why it was rebuilt,
where everything is now, how to keep working on it with Antigravity without the AI breaking
things, and what's left to do.

Read in this order: this file → `README.md` → `AGENTS.md` → `docs/DEPLOYMENT.md`.

---

## 0. Do this first (urgent, on the current live site)

The current live site runs the old app. Based on its code (not tested against the live site):

- It ships an admin account `admin` / `admin123`. The password is printed in the old README,
  and the server re-creates that account from `data/db.json` every time it restarts on Vercel.
- If the `JWT_SECRET` environment variable isn't set on Vercel, the server signs logins with a
  hard-coded fallback secret that's in the public code, so anyone could make an admin login.

Until the new version replaces it:

1. In the old project's Vercel settings, make sure `JWT_SECRET` is set to a long random value.
2. Remove or change the `admin` user in `data/db.json` (it is reloaded on every cold start, so
   changing it only in the running app doesn't stick), and remove the credentials from the
   README.
3. When the new app is live, turn the old deployment off.

## 1. Why it was rebuilt

The old app worked and had real content, but reviewing it turned up problems that couldn't be
patched one by one:

- **Security:**
  - the published admin password and the hard-coded signing secret above;
  - Google-login tokens accepted without checking their signature;
  - stored text rendered as HTML in the admin activity table (so a student could inject script);
  - anyone could delete any community note.
- **Data that disappears:** on Vercel the database file, uploaded PDFs and community notes
  lived in `/tmp`, which is wiped on every cold start and isn't shared between servers.
- **Hard to change safely:** the front end was one 12,000-line `script.js` with inline HTML
  strings, and there were no tests.
- **Content quality:** a batch of 120 questions labelled "Final Exam" includes questions filed
  under the wrong subject (e.g. singing technique under Grade 12 Physics).

The new version keeps the content and the ideas, and rebuilds the rest on SolidJS + TypeScript
with Supabase (real database, sign-in, file storage, row level security) and Vercel.

## 2. Where everything went

| Old app                                                           | New app                                                                      |
| ----------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| `index.html` + `script.js` + `style.css`                          | `src/` (SolidJS components per feature)                                      |
| Express server (`server/`), `data/db.json`                        | Supabase: `supabase/migrations/` (schema, security rules, functions)         |
| PDFs in `exams/` served through the server                        | Supabase Storage bucket `papers`, imported by `scripts/import-legacy.ts`     |
| Login, register, Google                                           | `src/features/account/` (Supabase Auth) + onboarding                         |
| Library browse, PDF viewer                                        | `src/features/library/`, `src/features/reader/`                              |
| Practice quiz, timed exam                                         | `src/features/practice/` (attempts saved, resumable, graded by the database) |
| Streaks, XP (stored only in the browser)                          | `src/features/progress/` (computed from saved answers in the database)       |
| Study desk, unit notes, formulas, pomodoro, notes, community tips | `src/features/study/`                                                        |
| Archie (Gemini call inside the server)                            | `api/tutor.ts` (Vercel function, sign-in required, rate limited)             |
| Admin dashboard                                                   | `src/features/admin/`                                                        |
| Service worker, PWA                                               | `vite-plugin-pwa` config in `vite.config.ts`                                 |
| `EXAM_UNIT_NOTES`, `FORMULA_DATA` in `script.js`                  | Database tables `units` and `formulas`                                       |

The old app is kept untouched in `legacy/` so you can compare. Nothing reads from it at run
time; only the import script uses its data.

**Not carried over yet:** Telegram duels, shared streaks, avatar studio and student ID card,
the national-exam countdown, Google Analytics and the cookie banner, and the Android APK
wrapper. Each is a good small project. Duels and shared streaks should be scored on the server
this time so they can't be faked.

## 3. Running it on your computer

You need `bun` and Docker. Then follow **Getting started** in `README.md`. The local database
comes with two test accounts (`supabase/seed.sql` has the details): a student and an admin.

Checks to run before every commit:

```bash
bun run typecheck && bun run lint && bun run test && bun run build
```

## 4. Working with AI (Antigravity) without it doing lame things

AI agents are fast, but they also confidently invent content, weaken security to make an error
go away, reformat files nobody asked about, and say "done" without running anything. The repo
now has guardrails for this.

### AGENTS.md: the rules file

**Create and keep `AGENTS.md` at the root of the repo.** Antigravity reads `AGENTS.md`
automatically and treats it as standing instructions for every task in this workspace. A
starting version is already in this branch. Read it, change anything you disagree with, and
commit your version. It says, among other things, that the agent must never:

- commit secrets, or put server keys in browser code (`VITE_` variables);
- touch the production database (push migrations, run imports, delete files) without your
  explicit yes in the conversation;
- run `supabase/seed.sql` against production, or edit a migration that already exists;
- create a table without row level security, or loosen a security policy to "fix" an error;
- invent questions, answers, papers, notes, statistics, exam dates or Amharic translations;
- render stored text as HTML, use raw colours instead of theme tokens, or skip dark mode;
- add dependencies or CDN scripts without saying why (students pay for every megabyte);
- say a task is done without running typecheck, lint, tests and build, and reporting the result.

For rules that only apply to one area, you can also add files under `.agents/rules/` (for
example `.agents/rules/database.md`). Antigravity loads those too. Keep `AGENTS.md` short enough
that the agent actually follows all of it; move detail into those rule files.

**Treat `AGENTS.md` like code.** When the AI does something lame that a rule would have
prevented, add the rule. When a rule gets in the way for a good reason, change it on purpose in
a commit, not in the middle of a task.

### How to give it tasks

- **One small, concrete task per conversation**: "Add a 'Mark as done' button to unit notes
  that saves to a new `unit_progress` table", not "improve the study page".
- **Ask for a plan first** on anything touching the database, sign-in or more than a few files,
  and read the plan before saying go.
- **Tell it what done looks like**: which screen, what it should show, light and dark, phone width.
- **Never paste real keys or student data into the chat.** Give it the variable name instead.

### Reviewing what it produced

Before you commit an AI change, check:

1. Did it change only what you asked? Look at the full diff, not its summary.
2. Do `typecheck`, `lint`, `test` and `build` pass when _you_ run them?
3. Any new table: does the migration enable RLS and add policies? Any new policy that lets
   everyone write? Any edit to an old migration?
4. Any secret, key or `.env` content in the diff?
5. Any `innerHTML`, raw colours (`#…`), `@ts-ignore`, `any`, deleted tests?
6. Any new dependency? Is it worth its size?
7. Did you open the screen yourself, in light and dark, on a phone-sized window?
8. Did it make up content (questions, explanations, translations)? Delete it.

If an answer is wrong, don't patch around it. Tell the agent which rule it broke and have it
redo the work.

## 5. Known issues and open items

In rough priority order:

1. **Deploy** the new version (`docs/DEPLOYMENT.md`) and retire the old one.
2. **Review the 120 flagged questions** in Admin → Questions. Approve real ones, delete
   mislabelled ones. They stay out of practice until then.
3. **78 papers have no PDF** in the repository. The old server fetched them from another
   GitHub repo at request time. Get the files (with the owner's permission) and re-run the import.
4. **Amharic subject names**: only some subjects have one (`name_am` in the database). A native
   speaker should check them and fill in the rest; don't let the AI translate.
5. **Archie** hasn't been tested with a real Gemini key yet. Check the model name is current.
6. **Google sign-in** is built but untested; it stays hidden until `VITE_AUTH_GOOGLE=true`.
7. **Email sign-up only**: many students don't have email. Phone (SMS) sign-in through Supabase
   is the likely next step; it needs an SMS provider that works in Ethiopia.
8. **CI**: there is no GitHub Actions workflow yet. Add one that runs the four checks on every
   pull request.
9. **Unit-level progress**: questions aren't linked to units yet (`questions.unit_id` is
   empty), so progress is per subject. Linking them enables the per-unit strength bars from
   the mockups.
10. **Offline mode** is verified on the same origin but not yet on a real phone against the
    hosted project. Test it after deploying.

## 6. Quick reference

- Add a screen: new folder under `src/features/`, route in `src/app/App.tsx`, nav item in
  `src/app/AppShell.tsx` if it needs one.
- Change the database: `bunx supabase migration new <name>`, then `bun run db:reset` and
  `bun run db:types`.
- Change colours or fonts: `panda.config.ts` (every colour has a light and a dark value).
- Server-side code with secrets: `api/` (runs on Vercel, and locally through `bun run dev`).
- Content import: `scripts/import-legacy.ts` and `scripts/legacy-content.ts`.
