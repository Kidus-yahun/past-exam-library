-- Past Exam Library: core schema.
-- Catalog tables (grades, subjects, papers, units, questions) are world-readable
-- and admin-writable. Student data (profiles, attempts, answers) is private to
-- its owner. Admin is a role on the student's own profile row, checked through
-- public.is_admin(); students can never change their own role.

-- ---------------------------------------------------------------------------
-- Types
-- ---------------------------------------------------------------------------
create type public.exam_type as enum ('mid1', 'mid2', 'final', 'pretest', 'model');
create type public.user_role as enum ('student', 'admin');
create type public.stream as enum ('natural', 'social');

-- ---------------------------------------------------------------------------
-- Catalog
-- ---------------------------------------------------------------------------
create table public.grades (
  id smallint primary key check (id between 9 and 12),
  name text not null
);

create table public.subjects (
  id text primary key check (id ~ '^[a-z][a-z0-9-]*$'),
  name text not null,
  name_am text
);

create table public.grade_subjects (
  grade smallint not null references public.grades on delete cascade,
  subject text not null references public.subjects on delete cascade,
  position smallint not null default 0,
  primary key (grade, subject)
);

create table public.papers (
  id uuid primary key default gen_random_uuid(),
  legacy_id text unique,
  grade smallint not null references public.grades,
  subject text not null references public.subjects,
  -- National prep papers (pre-test, model) are not tied to a semester.
  semester smallint check (semester in (1, 2)),
  exam_type public.exam_type not null,
  year smallint not null check (year between 2000 and 2100),
  storage_path text not null unique,
  size_bytes bigint not null check (size_bytes >= 0),
  created_at timestamptz not null default now(),
  constraint papers_semester_matches_type
    check ((exam_type in ('pretest', 'model')) = (semester is null))
);
create index papers_grade_subject_idx on public.papers (grade, subject);

create table public.units (
  id uuid primary key default gen_random_uuid(),
  grade smallint not null references public.grades,
  subject text not null references public.subjects,
  position smallint not null,
  title text not null,
  exam_weight text,
  unique (grade, subject, position)
);

create table public.questions (
  id uuid primary key default gen_random_uuid(),
  legacy_id text unique,
  paper_id uuid references public.papers on delete set null,
  grade smallint not null references public.grades,
  subject text not null references public.subjects,
  unit_id uuid references public.units on delete set null,
  body text not null,
  options text[] not null check (cardinality(options) between 2 and 6),
  correct_index smallint not null,
  explanation text,
  -- Imported questions whose labels look wrong are flagged instead of dropped.
  needs_review boolean not null default false,
  created_at timestamptz not null default now(),
  constraint questions_correct_index_in_range
    check (correct_index >= 0 and correct_index < cardinality(options))
);
create index questions_paper_idx on public.questions (paper_id);
create index questions_grade_subject_idx on public.questions (grade, subject);

-- Papers with the number of practice questions ready for each (reviewed only).
create view public.paper_summaries
with (security_invoker = on)
as
select
  p.*,
  (
    select count(*)::int
    from public.questions q
    where q.paper_id = p.id and not q.needs_review
  ) as question_count
from public.papers p;

-- ---------------------------------------------------------------------------
-- Students
-- ---------------------------------------------------------------------------
create table public.profiles (
  id uuid primary key references auth.users on delete cascade,
  display_name text not null default '' check (char_length(display_name) <= 60),
  grade smallint references public.grades,
  stream public.stream,
  role public.user_role not null default 'student',
  created_at timestamptz not null default now()
);

create table public.attempts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users on delete cascade,
  paper_id uuid not null references public.papers on delete cascade,
  started_at timestamptz not null default now(),
  finished_at timestamptz
);
create index attempts_user_idx on public.attempts (user_id, started_at desc);

create table public.answers (
  attempt_id uuid not null references public.attempts on delete cascade,
  question_id uuid not null references public.questions on delete cascade,
  chosen_index smallint not null check (chosen_index >= 0),
  -- Set by trigger from the question; clients cannot claim a correct answer.
  is_correct boolean not null default false,
  answered_at timestamptz not null default now(),
  primary key (attempt_id, question_id)
);

-- ---------------------------------------------------------------------------
-- Functions and triggers
-- ---------------------------------------------------------------------------
create function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1 from public.profiles
    where id = (select auth.uid()) and role = 'admin'
  );
$$;

create function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.profiles (id, display_name)
  values (
    new.id,
    left(coalesce(
      new.raw_user_meta_data ->> 'full_name',
      new.raw_user_meta_data ->> 'name',
      split_part(new.email, '@', 1),
      ''
    ), 60)
  );
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

create function public.grade_answer()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  select q.correct_index = new.chosen_index
    into new.is_correct
    from public.questions q
   where q.id = new.question_id;
  new.is_correct := coalesce(new.is_correct, false);
  return new;
end;
$$;

create trigger answers_grade
  before insert or update on public.answers
  for each row execute function public.grade_answer();

-- ---------------------------------------------------------------------------
-- Row level security
-- ---------------------------------------------------------------------------
alter table public.grades enable row level security;
alter table public.subjects enable row level security;
alter table public.grade_subjects enable row level security;
alter table public.papers enable row level security;
alter table public.units enable row level security;
alter table public.questions enable row level security;
alter table public.profiles enable row level security;
alter table public.attempts enable row level security;
alter table public.answers enable row level security;

-- Catalog: anyone reads, admins write.
do $$
declare t text;
begin
  foreach t in array array['grades', 'subjects', 'grade_subjects', 'papers', 'units', 'questions'] loop
    execute format('create policy %I on public.%I for select to anon, authenticated using (true)', t || '_read', t);
    execute format('create policy %I on public.%I for insert to authenticated with check ((select public.is_admin()))', t || '_admin_insert', t);
    execute format('create policy %I on public.%I for update to authenticated using ((select public.is_admin())) with check ((select public.is_admin()))', t || '_admin_update', t);
    execute format('create policy %I on public.%I for delete to authenticated using ((select public.is_admin()))', t || '_admin_delete', t);
  end loop;
end $$;

-- Profiles: read your own (admins read all); update only safe columns of your own.
create policy profiles_read on public.profiles
  for select to authenticated
  using (id = (select auth.uid()) or (select public.is_admin()));

create policy profiles_update_own on public.profiles
  for update to authenticated
  using (id = (select auth.uid()))
  with check (id = (select auth.uid()));

revoke update on public.profiles from authenticated, anon;
grant update (display_name, grade, stream) on public.profiles to authenticated;

-- Attempts and answers: private to the student.
create policy attempts_own on public.attempts
  for all to authenticated
  using (user_id = (select auth.uid()))
  with check (user_id = (select auth.uid()));

create policy answers_own on public.answers
  for all to authenticated
  using (exists (
    select 1 from public.attempts a
    where a.id = attempt_id and a.user_id = (select auth.uid())
  ))
  with check (exists (
    select 1 from public.attempts a
    where a.id = attempt_id and a.user_id = (select auth.uid())
  ));

-- ---------------------------------------------------------------------------
-- Storage: exam PDFs are public to read, admin-only to change.
-- ---------------------------------------------------------------------------
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('papers', 'papers', true, 52428800, array['application/pdf'])
on conflict (id) do nothing;

create policy papers_admin_insert on storage.objects
  for insert to authenticated
  with check (bucket_id = 'papers' and (select public.is_admin()));

create policy papers_admin_update on storage.objects
  for update to authenticated
  using (bucket_id = 'papers' and (select public.is_admin()));

create policy papers_admin_delete on storage.objects
  for delete to authenticated
  using (bucket_id = 'papers' and (select public.is_admin()));
-- Onboarding answers on the student's profile: how long they plan to study
-- each day, and when they finished onboarding (null = show it).
alter table public.profiles
  add column daily_goal_minutes smallint not null default 25
    check (daily_goal_minutes in (15, 25, 50)),
  add column onboarded_at timestamptz;

grant update (daily_goal_minutes, onboarded_at) on public.profiles to authenticated;
-- Practice attempts can come from a paper or from a mixed set of a subject's
-- questions, run in practice mode (instant feedback) or exam mode (timed,
-- marked at the end). The exact question set is stored so an attempt can be
-- resumed in the same order.
alter table public.attempts
  alter column paper_id drop not null,
  add column mode text not null default 'practice' check (mode in ('practice', 'exam')),
  add column grade smallint not null references public.grades,
  add column subject text not null references public.subjects,
  add column question_ids uuid[] not null check (cardinality(question_ids) between 1 and 200);

create index attempts_user_unfinished_idx
  on public.attempts (user_id, started_at desc)
  where finished_at is null;
-- The signed-in student's progress, computed from their saved answers.
-- Days are counted in Ethiopian time so a late-night session counts for the
-- day the student lived it. XP matches the app: 10 per correct answer plus 2
-- for every answer given. Runs as the caller, so row level security applies.
create function public.my_progress(tz text default 'Africa/Addis_Ababa')
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
    'today', (now() at time zone tz)::date,
    'days', coalesce((select jsonb_agg(d.day order by d.day desc) from (select distinct day from mine) d), '[]'::jsonb),
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

revoke execute on function public.my_progress(text) from anon;
grant execute on function public.my_progress(text) to authenticated;
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
-- Papers a student saved for later.
create table public.bookmarks (
  user_id uuid not null default auth.uid() references auth.users on delete cascade,
  paper_id uuid not null references public.papers on delete cascade,
  created_at timestamptz not null default now(),
  primary key (user_id, paper_id)
);

alter table public.bookmarks enable row level security;
create policy bookmarks_own on public.bookmarks for all to authenticated
  using (user_id = (select auth.uid())) with check (user_id = (select auth.uid()));
-- Admin console read models. Students' own tables stay private under row
-- level security; these functions return aggregates and run as their owner,
-- but refuse anyone who isn't an admin.

create function public.admin_overview()
returns jsonb
language plpgsql
stable
security definer
set search_path = ''
as $$
begin
  if not public.is_admin() then
    raise exception 'admin only' using errcode = '42501';
  end if;
  return jsonb_build_object(
    'students', (select count(*) from public.profiles where role = 'student'),
    'new_students_week', (select count(*) from public.profiles where role = 'student' and created_at > now() - interval '7 days'),
    'papers', (select count(*) from public.papers),
    'questions', (select count(*) from public.questions where not needs_review),
    'questions_flagged', (select count(*) from public.questions where needs_review),
    'attempts_week', (select count(*) from public.attempts where started_at > now() - interval '7 days'),
    'answers_week', (select count(*) from public.answers where answered_at > now() - interval '7 days'),
    'active_students_week', (
      select count(distinct a.user_id)
      from public.attempts a
      where a.started_at > now() - interval '7 days'
    )
  );
end;
$$;

create function public.admin_students(search text default '')
returns table (
  id uuid,
  display_name text,
  email text,
  grade smallint,
  joined_at timestamptz,
  answered bigint,
  correct bigint,
  last_active timestamptz
)
language plpgsql
stable
security definer
set search_path = ''
as $$
begin
  if not public.is_admin() then
    raise exception 'admin only' using errcode = '42501';
  end if;
  return query
    select
      p.id,
      p.display_name,
      u.email::text,
      p.grade,
      p.created_at,
      count(x.*) as answered,
      count(x.*) filter (where x.is_correct) as correct,
      max(x.answered_at) as last_active
    from public.profiles p
    join auth.users u on u.id = p.id
    left join public.attempts a on a.user_id = p.id
    left join public.answers x on x.attempt_id = a.id
    where p.role = 'student'
      and (
        coalesce(search, '') = ''
        or p.display_name ilike '%' || search || '%'
        or u.email ilike '%' || search || '%'
      )
    group by p.id, u.email
    order by max(x.answered_at) desc nulls last, p.created_at desc
    limit 200;
end;
$$;

revoke execute on function public.admin_overview() from anon, public;
revoke execute on function public.admin_students(text) from anon, public;
grant execute on function public.admin_overview() to authenticated;
grant execute on function public.admin_students(text) to authenticated;
-- Reference data every environment needs (local and production): grades,
-- subjects and which subjects each grade takes. Idempotent, so it is safe to
-- re-run. Papers, questions and notes come from `bun run db:import`.

insert into public.grades (id, name) values
  (9, 'Grade 9'), (10, 'Grade 10'), (11, 'Grade 11'), (12, 'Grade 12')
on conflict (id) do nothing;

insert into public.subjects (id, name, name_am) values
  ('amharic', 'Amharic', 'አማርኛ'),
  ('english', 'English', 'እንግሊዝኛ'),
  ('mathematics', 'Mathematics', 'ሂሳብ'),
  ('physics', 'Physics', 'ፊዚክስ'),
  ('chemistry', 'Chemistry', 'ኬሚስትሪ'),
  ('biology', 'Biology', 'ባዮሎጂ'),
  ('history', 'History', 'ታሪክ'),
  ('geography', 'Geography', 'ጂኦግራፊ'),
  ('economics', 'Economics', 'ኢኮኖሚክስ'),
  ('it', 'IT', null),
  ('citizenship', 'Citizenship', null),
  ('hpe', 'Health & PE', null),
  ('agriculture', 'Agriculture', 'ግብርና'),
  ('aptitude', 'Aptitude', null),
  ('web', 'Web Design', null)
on conflict (id) do nothing;

insert into public.grade_subjects (grade, subject, position)
select g, s, ord::smallint
from (values
  (9,  array['english','mathematics','physics','chemistry','biology','amharic','history','geography','economics','it','citizenship','hpe']),
  (10, array['english','mathematics','physics','chemistry','biology','amharic','history','geography','economics','it','citizenship','hpe']),
  (11, array['english','mathematics','physics','chemistry','biology','amharic','agriculture','it','web']),
  (12, array['english','mathematics','physics','chemistry','biology','aptitude','amharic','agriculture','it'])
) as v(g, subjects),
unnest(v.subjects) with ordinality as u(s, ord)
on conflict do nothing;
