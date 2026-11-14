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
