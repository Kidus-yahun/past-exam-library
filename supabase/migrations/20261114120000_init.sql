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
