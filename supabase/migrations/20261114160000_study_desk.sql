-- Study desk: unit notes and formula sheets (catalog, admin-written),
-- personal notes, community tips with likes, focus sessions and Archie usage.

-- Unit notes ----------------------------------------------------------------
alter table public.units
  add column read_minutes smallint check (read_minutes between 1 and 120),
  -- Light markdown: paragraphs, "- " bullets, **bold**, `code`.
  add column overview text not null default '',
  -- [{ "name": "...", "latex": "...", "notes": "..." }]
  add column formulas jsonb not null default '[]'::jsonb,
  -- { "question": "...", "steps": ["..."], "answer": "..." } or null
  add column worked_example jsonb,
  add column pitfall text;

-- Formula sheets ------------------------------------------------------------
create table public.formulas (
  id uuid primary key default gen_random_uuid(),
  subject text not null references public.subjects,
  topic text not null,
  title text not null,
  display text not null,
  variables text,
  tip text,
  grades smallint[] not null default '{}',
  position smallint not null default 0,
  unique (subject, title)
);
create index formulas_subject_idx on public.formulas (subject, position);

alter table public.formulas enable row level security;
create policy formulas_read on public.formulas for select to anon, authenticated using (true);
create policy formulas_admin_write on public.formulas for all to authenticated
  using ((select public.is_admin())) with check ((select public.is_admin()));

-- Personal notes: one scratchpad per student per unit -----------------------
create table public.study_notes (
  user_id uuid not null default auth.uid() references auth.users on delete cascade,
  unit_id uuid not null references public.units on delete cascade,
  body text not null default '' check (char_length(body) <= 20000),
  updated_at timestamptz not null default now(),
  primary key (user_id, unit_id)
);
alter table public.study_notes enable row level security;
create policy study_notes_own on public.study_notes for all to authenticated
  using (user_id = (select auth.uid())) with check (user_id = (select auth.uid()));

-- Community tips --------------------------------------------------------------
create table public.topic_notes (
  id uuid primary key default gen_random_uuid(),
  unit_id uuid not null references public.units on delete cascade,
  author_id uuid not null default auth.uid() references auth.users on delete cascade,
  tag text not null check (tag in ('shortcut', 'mnemonic', 'summary', 'trap')),
  body text not null check (char_length(btrim(body)) between 3 and 1000),
  -- Copied from the author's profile when posted (profiles are private).
  author_name text not null default '',
  created_at timestamptz not null default now()
);
create index topic_notes_unit_idx on public.topic_notes (unit_id, created_at desc);

create table public.topic_note_likes (
  note_id uuid not null references public.topic_notes on delete cascade,
  user_id uuid not null default auth.uid() references auth.users on delete cascade,
  primary key (note_id, user_id)
);

alter table public.topic_notes enable row level security;
alter table public.topic_note_likes enable row level security;

create policy topic_notes_read on public.topic_notes for select to anon, authenticated using (true);
create policy topic_notes_insert_own on public.topic_notes for insert to authenticated
  with check (author_id = (select auth.uid()));
create policy topic_notes_delete_own_or_admin on public.topic_notes for delete to authenticated
  using (author_id = (select auth.uid()) or (select public.is_admin()));

create policy topic_note_likes_read on public.topic_note_likes for select to anon, authenticated using (true);
create policy topic_note_likes_own on public.topic_note_likes for insert to authenticated
  with check (user_id = (select auth.uid()));
create policy topic_note_likes_unlike_own on public.topic_note_likes for delete to authenticated
  using (user_id = (select auth.uid()));

create function public.set_topic_note_author()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  select coalesce(nullif(p.display_name, ''), 'Student')
    into new.author_name
    from public.profiles p
   where p.id = new.author_id;
  new.author_name := coalesce(new.author_name, 'Student');
  return new;
end;
$$;

create trigger topic_notes_author
  before insert on public.topic_notes
  for each row execute function public.set_topic_note_author();

-- Tips with like counts, read with the caller's own permissions.
create view public.topic_note_feed
with (security_invoker = on)
as
select
  n.id, n.unit_id, n.author_id, n.author_name, n.tag, n.body, n.created_at,
  (select count(*)::int from public.topic_note_likes l where l.note_id = n.id) as likes
from public.topic_notes n;

-- Focus sessions (25-minute sprints count toward the daily goal) -------------
create table public.focus_sessions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users on delete cascade,
  minutes smallint not null check (minutes between 1 and 120),
  ended_at timestamptz not null default now()
);
create index focus_sessions_user_idx on public.focus_sessions (user_id, ended_at desc);
alter table public.focus_sessions enable row level security;
create policy focus_sessions_own on public.focus_sessions for all to authenticated
  using (user_id = (select auth.uid())) with check (user_id = (select auth.uid()));

-- Archie usage, for per-student rate limiting in the tutor function ---------
create table public.tutor_requests (
  id bigint generated always as identity primary key,
  user_id uuid not null references auth.users on delete cascade,
  created_at timestamptz not null default now()
);
create index tutor_requests_user_idx on public.tutor_requests (user_id, created_at desc);
alter table public.tutor_requests enable row level security;
-- No policies: only the server (service role) reads and writes this table.

-- Progress now also counts focus minutes and focus days ----------------------
create or replace function public.my_progress(tz text default 'Africa/Addis_Ababa')
returns jsonb
language sql
stable
security invoker
set search_path = ''
as $$
  with mine as (
    select
      x.is_correct,
      q.subject,
      (x.answered_at at time zone tz)::date as day
    from public.answers x
    join public.attempts a on a.id = x.attempt_id
    join public.questions q on q.id = x.question_id
    where a.user_id = (select auth.uid())
  ),
  focus as (
    select minutes, (ended_at at time zone tz)::date as day
    from public.focus_sessions
    where user_id = (select auth.uid())
  ),
  per_subject as (
    select subject, count(*) as answered, count(*) filter (where is_correct) as correct
    from mine
    group by subject
  )
  select jsonb_build_object(
    'xp', coalesce((select sum(case when is_correct then 12 else 2 end) from mine), 0),
    'answered', (select count(*) from mine),
    'correct', (select count(*) from mine where is_correct),
    'today_answered', (select count(*) from mine where day = (now() at time zone tz)::date),
    'today_focus_minutes', coalesce((select sum(minutes) from focus where day = (now() at time zone tz)::date), 0),
    'today', (now() at time zone tz)::date,
    'days', coalesce((
      select jsonb_agg(d.day order by d.day desc)
      from (select day from mine union select day from focus) d
    ), '[]'::jsonb),
    'subjects', coalesce((
      select jsonb_agg(
        jsonb_build_object('subject', s.subject, 'name', sub.name, 'answered', s.answered, 'correct', s.correct)
        order by s.answered desc
      )
      from per_subject s
      join public.subjects sub on sub.id = s.subject
    ), '[]'::jsonb)
  );
$$;
