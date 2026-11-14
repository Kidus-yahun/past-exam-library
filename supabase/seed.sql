-- Reference data that every environment needs. Papers and questions come from
-- `bun run db:import` (scripts/import-legacy.ts), which also uploads the PDFs.

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
