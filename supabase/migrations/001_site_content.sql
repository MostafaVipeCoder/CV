-- Backend for the CV / portfolio site (dashboard at /#/admin).
-- Only the owner email below can write; everyone can read the published content.
-- Create the owner under Authentication → Users → Add user (email + password).

create or replace function public.is_site_owner()
returns boolean
language sql
stable
set search_path = ''
as $$
  select coalesce((select auth.jwt() ->> 'email') = 'abdullah.shaban165@gmail.com', false);
$$;

-- Site content (profile, experience, projects, services…) as one JSON document
create table if not exists public.site_content (
  id text primary key,
  data jsonb not null,
  updated_at timestamptz not null default now()
);

alter table public.site_content enable row level security;

create policy "site_content is public"
  on public.site_content for select
  to anon, authenticated
  using (true);

create policy "owner can insert site_content"
  on public.site_content for insert
  to authenticated
  with check ((select public.is_site_owner()));

create policy "owner can update site_content"
  on public.site_content for update
  to authenticated
  using ((select public.is_site_owner()))
  with check ((select public.is_site_owner()));

-- Service requests sent from the public site
create table if not exists public.service_requests (
  id bigint generated always as identity primary key,
  full_name text not null check (char_length(full_name) between 1 and 200),
  email text not null check (char_length(email) between 3 and 320),
  service_type text not null check (char_length(service_type) <= 200),
  message text not null check (char_length(message) between 1 and 5000),
  tracking_id text not null unique,
  status text not null default 'pending' check (status in ('pending', 'in_progress', 'done', 'archived')),
  created_at timestamptz not null default now()
);

alter table public.service_requests enable row level security;

create policy "anyone can send a request"
  on public.service_requests for insert
  to anon, authenticated
  with check (status = 'pending');

create policy "owner can read requests"
  on public.service_requests for select
  to authenticated
  using ((select public.is_site_owner()));

create policy "owner can update requests"
  on public.service_requests for update
  to authenticated
  using ((select public.is_site_owner()))
  with check ((select public.is_site_owner()));

create policy "owner can delete requests"
  on public.service_requests for delete
  to authenticated
  using ((select public.is_site_owner()));

-- Public image bucket for photos and project images uploaded from the dashboard
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('media', 'media', true, 5242880, array['image/png', 'image/jpeg', 'image/webp', 'image/gif', 'image/svg+xml'])
on conflict (id) do nothing;

create policy "owner can upload media"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'media' and (select public.is_site_owner()));

create policy "owner can update media"
  on storage.objects for update
  to authenticated
  using (bucket_id = 'media' and (select public.is_site_owner()));

create policy "owner can delete media"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'media' and (select public.is_site_owner()));
