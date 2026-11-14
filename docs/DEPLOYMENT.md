# Deployment guide

How to put Past Exam Library online: a hosted **Supabase** project for the database, sign-in
and PDF storage, and **Vercel** for the website and the `api/` functions (Archie).

Budget about an hour the first time. Do the steps in order; each one ends with a check.

```
Students' phones ──► Vercel (static app + api/tutor) ──► Gemini (Archie only)
        │                       │
        └──────────────► Supabase (Postgres + RLS, Auth, Storage "papers")
```

## What you need

- A GitHub account with access to this repository
- A Supabase account (https://supabase.com) and a Vercel account (https://vercel.com)
- A Google AI Studio API key for Archie (https://aistudio.google.com), optional at first
- On your computer: `bun`, `git`, and this repo cloned with `bun install` done
- A password manager. You will create several secrets; never paste them into files in the repo,
  chat messages, or screenshots.

## Keys at a glance

| Name                            | What it is                                                               | Where it may live                                                                                      |
| ------------------------------- | ------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------ |
| `VITE_SUPABASE_URL`             | Project URL, e.g. `https://abcd.supabase.co`                             | Vercel env (public is fine)                                                                            |
| `VITE_SUPABASE_PUBLISHABLE_KEY` | Publishable key (`sb_publishable_…`) or legacy anon key                  | Vercel env (public by design; RLS protects data)                                                       |
| `SUPABASE_URL`                  | Same project URL                                                         | Vercel env (server)                                                                                    |
| `SUPABASE_SERVICE_ROLE_KEY`     | Secret key (`sb_secret_…`) or legacy service_role key. **Bypasses RLS.** | Vercel env marked Sensitive, and your shell only while importing. Never in the browser, never `VITE_`. |
| `GEMINI_API_KEY`                | Google AI Studio key                                                     | Vercel env marked Sensitive                                                                            |
| `GEMINI_MODEL`                  | Model id, e.g. `gemini-2.5-flash`                                        | Vercel env                                                                                             |
| `VITE_AUTH_GOOGLE`              | `true` only after Google sign-in is set up                               | Vercel env                                                                                             |

---

## 1. Create the Supabase project

1. In Supabase, create a new project. Pick the region closest to Ethiopia that's offered
   (for example a European region such as Frankfurt). Save the **database password** in your
   password manager.
2. From the project's settings, copy the **Project URL**, the **publishable key**, and the
   **secret key** into your password manager. Note the **project ref** (the `abcd` in
   `https://abcd.supabase.co`).

**Check:** you can open the project dashboard and see an empty Table Editor.

## 2. Create the database schema

From the repo on your computer:

```bash
bunx supabase login
bunx supabase link --project-ref <your-project-ref>   # asks for the database password
bunx supabase db push                                  # applies supabase/migrations/*
```

- `db push` applies every migration: tables, row level security, functions, the `papers`
  storage bucket, and the reference data (grades and subjects).
- **Never** add `--include-seed`. `supabase/seed.sql` creates local test accounts with publicly
  known passwords, including an admin. It is for your laptop only.

**Check:** in the Table Editor, `grades` has 4 rows and `subjects` has 15. In Storage there is a
public bucket called `papers`.

## 3. Configure sign-in

In the Supabase dashboard, under Authentication:

1. **URL configuration**: set the Site URL to your production address (e.g.
   `https://pastexamlibrary.vercel.app` or your own domain). Add redirect URLs for that address
   and for local development: `http://localhost:5173/**`. If you want sign-in to work on Vercel
   preview deployments, add your preview URL pattern too.
2. **Email**: keep "Confirm email" turned on for production. Set the minimum password length
   to at least 8.
3. **SMTP**: Supabase's built-in email sender is only meant for testing and is heavily rate
   limited. Before real students sign up, set up a custom SMTP provider so confirmation emails
   arrive.
4. **Google sign-in (optional)**: enable the Google provider with a client ID and secret from
   Google Cloud, using the callback URL Supabase shows you. Then set `VITE_AUTH_GOOGLE=true` in
   Vercel. Until then, leave it unset and the Google button stays hidden.

**Check:** the settings save without errors. You'll test sign-up after step 6.

## 4. Import the content

This uploads the PDFs from `exams/` into Storage and writes papers, questions, unit notes and
formula sheets. It needs the **secret key**, so pass it only in your shell for this one
command; don't save it in `.env.local`.

```bash
SUPABASE_URL=https://<ref>.supabase.co \
SUPABASE_SERVICE_ROLE_KEY=<secret key> \
bun scripts/import-legacy.ts --yes
```

- The script refuses any non-local database without `--yes`, and prints which database it is
  writing to. Read that line.
- It is safe to run again: rows are matched on their legacy ids.
- Expect: 58 papers (78 skipped because their PDF isn't in the repo), 1,509 questions (120
  flagged for review), 110 unit notes, 64 formula sheet entries.

**Missing PDFs:** the old server downloaded 78 papers from another GitHub repository at request
time. To add them, get the files (with permission from whoever owns them), put each at the path
listed in `legacy/data/db.json` (`fileUrl`, e.g. `exams/Grade10/Semester1/Final/Amharic.pdf`),
and run the import again. You can also upload papers one by one in the admin console.

**Check:** `papers` has 58 rows and the `papers` bucket has folders `g9` … `g12`.

## 5. Get a Gemini key for Archie (optional)

1. Create an API key in Google AI Studio. Restrict it to the Generative Language API.
2. Choose a current model and note its id. The code defaults to `gemini-2.5-flash`; model names
   change, so confirm the one you pick is listed as available, and set `GEMINI_MODEL` to it.
3. Set a budget or quota alert in Google Cloud. The app limits each student to 30 questions an
   hour (`HOURLY_LIMIT` in `api/tutor.ts`), but the total still grows with users.

Without a key the site works normally; Archie just says it isn't switched on yet.

## 6. Deploy on Vercel

1. In Vercel, **Add New → Project**, and import this GitHub repository. Vercel reads the
   settings from `vercel.json` (bun install, `bun run build`, output `dist`, SPA routing, cache
   headers), so leave the build settings on their defaults.
2. Before the first deploy, add the environment variables from the table above for the
   **Production** environment (and Preview, if you'll use preview deployments). Mark
   `SUPABASE_SERVICE_ROLE_KEY` and `GEMINI_API_KEY` as **Sensitive**.
3. Deploy. Then add your domain under the project's Domains settings if you have one, and make
   sure step 3's Site URL matches the address students will use.

**Check, on the live site:**

- [ ] Home loads; refreshing on `/library` or `/papers/<id>` doesn't give a 404
- [ ] Library lists papers; opening one shows the PDF inside the app
- [ ] Create an account; the confirmation email arrives; onboarding saves your grade
- [ ] Practice a few questions; Progress shows XP and a streak
- [ ] Study: unit notes render formulas; the timer runs; Archie answers (if a key is set)
- [ ] Dark mode looks right (switch under Appearance)
- [ ] On a phone: the site can be installed ("Add to Home screen"), and a paper you opened
      still opens with mobile data off

## 7. Make yourself admin

Sign up on the live site with your own email first. Then, in Supabase's SQL editor:

```sql
update public.profiles
set role = 'admin'
where id = (select id from auth.users where email = 'you@example.com');
```

Sign out and back in. You'll see **Admin** in the sidebar (or under Progress on a phone).
Start by reviewing the 120 flagged questions under Admin → Questions: approve the real ones and
delete the mislabelled ones.

Only promote people you trust. Admins can upload and delete papers and see every student's
name, email and activity.

---

## Updating the live site

- **Code**: merge a pull request into `main`. Vercel deploys it automatically. If something
  breaks, use Vercel's "Instant Rollback" to the previous deployment.
- **Database**: never edit an existing migration. Create a new one:

  ```bash
  bunx supabase migration new add_something
  # write the SQL, then locally:
  bun run db:reset && bun run db:types && bun run typecheck && bun run test
  ```

  When the PR is merged, apply it to production with `bunx supabase db push`. Migrations only
  go forward: to undo one, write another migration that reverses it. Push migrations **before**
  deploying code that depends on them.
- **Content**: upload papers and add questions in the admin console. Re-running the import is
  only for bulk changes from `legacy/`.
- **Backups**: check what your Supabase plan includes. Before risky migrations, take a backup
  (`bunx supabase db dump -f backup.sql` against the linked project) and keep it out of git.

## Troubleshooting

| Symptom                                                         | Likely cause                                                                                    |
| --------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| White page with "Missing or invalid environment" in the console | `VITE_SUPABASE_URL` or `VITE_SUPABASE_PUBLISHABLE_KEY` missing in Vercel; redeploy after adding |
| 404 when refreshing a page                                      | `vercel.json` rewrites missing or changed                                                       |
| Sign-in link opens localhost or fails                           | Site URL / redirect URLs in Supabase Auth don't match the live address                          |
| No confirmation email                                           | Built-in email rate limit; set up custom SMTP                                                   |
| Archie: "isn't switched on yet"                                 | `GEMINI_API_KEY` not set in Vercel                                                              |
| Archie: "couldn't answer"                                       | Wrong `GEMINI_MODEL`, quota exhausted, or the key is restricted to the wrong API                |
| Library empty                                                   | Import (step 4) not run against this project                                                    |
| Students see an old version                                     | The service worker updates on the next visit; ask them to close and reopen the app              |
