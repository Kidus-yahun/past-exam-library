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
