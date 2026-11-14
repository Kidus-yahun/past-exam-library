-- ============================================================================
-- LOCAL DEVELOPMENT ONLY. NEVER RUN THIS AGAINST A HOSTED/PRODUCTION DATABASE.
-- It creates accounts with publicly known passwords, one of them an admin.
-- `supabase db reset` runs it locally; `supabase db push` does not run it
-- unless you pass --include-seed, which you must never do for production.
-- Reference data (grades, subjects) lives in migrations, not here.
-- ============================================================================

-- Local development accounts (only ever seeded into a local database):
--   student@example.test / student-dev-pass   (onboarded Grade 12 student)
--   admin@example.test   / admin-dev-pass     (admin)
-- The profile rows come from the on_auth_user_created trigger.
insert into auth.users (
  instance_id, id, aud, role, email, encrypted_password, email_confirmed_at,
  raw_app_meta_data, raw_user_meta_data, created_at, updated_at,
  confirmation_token, recovery_token, email_change_token_new, email_change
)
values
  ('00000000-0000-0000-0000-000000000000', 'a0000000-0000-4000-8000-000000000001',
   'authenticated', 'authenticated', 'student@example.test',
   extensions.crypt('student-dev-pass', extensions.gen_salt('bf')), now(),
   '{"provider":"email","providers":["email"]}', '{"full_name":"Hanna"}', now(), now(), '', '', '', ''),
  ('00000000-0000-0000-0000-000000000000', 'a0000000-0000-4000-8000-000000000002',
   'authenticated', 'authenticated', 'admin@example.test',
   extensions.crypt('admin-dev-pass', extensions.gen_salt('bf')), now(),
   '{"provider":"email","providers":["email"]}', '{"full_name":"Library admin"}', now(), now(), '', '', '', '')
on conflict (id) do nothing;

insert into auth.identities (id, user_id, provider_id, identity_data, provider, last_sign_in_at, created_at, updated_at)
select gen_random_uuid(), u.id, u.id::text,
       jsonb_build_object('sub', u.id::text, 'email', u.email, 'email_verified', true),
       'email', now(), now(), now()
from auth.users u
where u.email in ('student@example.test', 'admin@example.test')
on conflict do nothing;

update public.profiles
set grade = 12, stream = 'natural', onboarded_at = now()
where id = 'a0000000-0000-4000-8000-000000000001';

update public.profiles
set role = 'admin', onboarded_at = now()
where id = 'a0000000-0000-4000-8000-000000000002';
