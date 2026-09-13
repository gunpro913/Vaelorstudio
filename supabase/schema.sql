create extension if not exists pgcrypto;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  role text not null default 'viewer' check (role in ('admin','viewer')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.site_settings (
  key text primary key,
  value jsonb not null default '{}'::jsonb,
  updated_by uuid references auth.users(id),
  updated_at timestamptz not null default now()
);

create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text unique not null,
  category text not null default 'DIGITAL PLATFORM',
  description text not null default '',
  cover_image text,
  status text not null default 'DRAFT' check (status in ('DRAFT','PUBLISHED')),
  featured boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.inquiries (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  project_type text not null,
  timeline text not null,
  details text not null,
  status text not null default 'NEW' check (status in ('NEW','REVIEWING','CONTACTED','COMPLETED','ARCHIVED')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.analytics_events (
  id uuid primary key default gen_random_uuid(),
  event_name text not null check (event_name in ('page_view','project_view','contact_started','inquiry_submitted')),
  path text,
  project_id uuid references public.projects(id) on delete set null,
  created_at timestamptz not null default now()
);

create table if not exists public.audit_logs (
  id uuid primary key default gen_random_uuid(),
  actor_id uuid references auth.users(id) on delete set null,
  action text not null,
  entity text not null,
  entity_id text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create or replace function public.is_admin()
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'admin'
  );
$$;

revoke all on function public.is_admin() from public;
grant execute on function public.is_admin() to authenticated;

alter table public.profiles enable row level security;
alter table public.site_settings enable row level security;
alter table public.projects enable row level security;
alter table public.inquiries enable row level security;
alter table public.analytics_events enable row level security;
alter table public.audit_logs enable row level security;

drop policy if exists "profiles own read" on public.profiles;
create policy "profiles own read" on public.profiles for select to authenticated using (id = auth.uid() or public.is_admin());

drop policy if exists "admins manage settings" on public.site_settings;
create policy "admins manage settings" on public.site_settings for all to authenticated using (public.is_admin()) with check (public.is_admin());

drop policy if exists "public read published projects" on public.projects;
create policy "public read published projects" on public.projects for select to anon, authenticated using (status = 'PUBLISHED' or public.is_admin());
drop policy if exists "admins manage projects" on public.projects;
create policy "admins manage projects" on public.projects for all to authenticated using (public.is_admin()) with check (public.is_admin());

drop policy if exists "public create inquiries" on public.inquiries;
create policy "public create inquiries" on public.inquiries for insert to anon, authenticated with check (char_length(name) between 1 and 120 and char_length(email) between 3 and 254 and char_length(details) between 1 and 5000);
drop policy if exists "admins read inquiries" on public.inquiries;
create policy "admins read inquiries" on public.inquiries for select to authenticated using (public.is_admin());
drop policy if exists "admins update inquiries" on public.inquiries;
create policy "admins update inquiries" on public.inquiries for update to authenticated using (public.is_admin()) with check (public.is_admin());

create policy "public create analytics" on public.analytics_events for insert to anon, authenticated with check (char_length(event_name) > 0);
create policy "admins read analytics" on public.analytics_events for select to authenticated using (public.is_admin());

create policy "admins read audit" on public.audit_logs for select to authenticated using (public.is_admin());
create policy "admins create audit" on public.audit_logs for insert to authenticated with check (public.is_admin() and actor_id = auth.uid());

insert into public.site_settings(key, value)
values ('hero', '{"eyebrow":"AER × VÆLOR","title":"MAKE YOUR WEBSITE HIT THE SPOTLIGHT","subline":"Digital experiences with editorial precision."}'::jsonb)
on conflict (key) do nothing;

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles(id, full_name)
  values (new.id, coalesce(new.raw_user_meta_data->>'full_name', new.email));
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute procedure public.handle_new_user();
