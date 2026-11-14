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
