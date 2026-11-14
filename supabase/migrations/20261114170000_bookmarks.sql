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
