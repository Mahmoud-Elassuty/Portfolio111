-- Run this once in Supabase: Dashboard -> SQL Editor -> New query -> paste -> Run.
-- Change the admin email below if you use a different login email.

create table if not exists public.messages (
  id         uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name       text not null check (char_length(btrim(name))    between 1 and 120),
  email      text not null check (char_length(email)          between 3 and 254
                                  and email ~* '^[^\s@]+@[^\s@]+\.[^\s@]{2,}$'),
  message    text not null check (char_length(btrim(message)) between 1 and 1500),
  lang       text not null default 'en' check (lang in ('en', 'ar')),
  is_read    boolean not null default false
);

create index if not exists messages_created_at_idx on public.messages (created_at desc);

alter table public.messages enable row level security;

-- Defense in depth: the public (anon) role may ONLY insert.
revoke all on public.messages from anon, authenticated;
grant insert on public.messages to anon, authenticated;
grant select, update, delete on public.messages to authenticated;

-- Visitors can send a message (always created as unread). They can never read anything back.
drop policy if exists "public can send messages" on public.messages;
create policy "public can send messages" on public.messages
  for insert to anon, authenticated
  with check (is_read = false);

-- Only YOU (by login email) can read, update (mark read) and delete.
drop policy if exists "admin can read" on public.messages;
create policy "admin can read" on public.messages
  for select to authenticated
  using ((auth.jwt() ->> 'email') = 'mahmoudalassiouty1@gmail.com');

drop policy if exists "admin can update" on public.messages;
create policy "admin can update" on public.messages
  for update to authenticated
  using ((auth.jwt() ->> 'email') = 'mahmoudalassiouty1@gmail.com')
  with check ((auth.jwt() ->> 'email') = 'mahmoudalassiouty1@gmail.com');

drop policy if exists "admin can delete" on public.messages;
create policy "admin can delete" on public.messages
  for delete to authenticated
  using ((auth.jwt() ->> 'email') = 'mahmoudalassiouty1@gmail.com');

-- Live updates in the dashboard when a new message arrives.
do $$
begin
  alter publication supabase_realtime add table public.messages;
exception when duplicate_object then null;
end $$;
