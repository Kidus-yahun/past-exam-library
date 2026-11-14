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
