-- Onboarding answers on the student's profile: how long they plan to study
-- each day, and when they finished onboarding (null = show it).
alter table public.profiles
  add column daily_goal_minutes smallint not null default 25
    check (daily_goal_minutes in (15, 25, 50)),
  add column onboarded_at timestamptz;

grant update (daily_goal_minutes, onboarded_at) on public.profiles to authenticated;
