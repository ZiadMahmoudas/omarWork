# Supabase CMS Setup

1. Create a new Supabase project.
2. Go to Project Settings > API and copy:
   - Project URL
   - anon public key
3. Create `.env.local` in the project root:

```env
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_ANON_KEY
```

4. Run this SQL in Supabase SQL Editor:

```sql
create table if not exists public.site_content (
  id text primary key,
  content jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

create table if not exists public.contact_leads (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text,
  service text,
  message text,
  created_at timestamptz not null default now()
);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists site_content_set_updated_at on public.site_content;
create trigger site_content_set_updated_at
before update on public.site_content
for each row execute function public.set_updated_at();

alter table public.site_content enable row level security;
alter table public.contact_leads enable row level security;

-- Public can read site content for the frontend.
drop policy if exists "Public read site content" on public.site_content;
create policy "Public read site content"
on public.site_content for select
to anon, authenticated
using (true);

-- Authenticated admins can insert/update content.
drop policy if exists "Authenticated insert content" on public.site_content;
create policy "Authenticated insert content"
on public.site_content for insert
to authenticated
with check (true);

drop policy if exists "Authenticated update content" on public.site_content;
create policy "Authenticated update content"
on public.site_content for update
to authenticated
using (true)
with check (true);

-- Contact form can create leads.
drop policy if exists "Anyone can create leads" on public.contact_leads;
create policy "Anyone can create leads"
on public.contact_leads for insert
to anon, authenticated
with check (true);

-- Authenticated users can read leads inside Supabase if needed.
drop policy if exists "Authenticated read leads" on public.contact_leads;
create policy "Authenticated read leads"
on public.contact_leads for select
to authenticated
using (true);
```

5. Go to Supabase Authentication > Users and create your admin email/password.

6. Open:

```txt
/dashboard/admin
```

Login with the admin user and edit the Home content.

Important notes:
- The Home page works even if Supabase is empty because it has local default content.
- After saving once from the dashboard, content will come from Supabase.
- Keep `ProcessSection` outside `hook-scene` because it has its own pinned cards animation.

## Storage للصور من الداشبورد

نفذ الكود ده مرة واحدة في Supabase SQL Editor عشان تقدر ترفع صور/SVG من `/dashboard/admin`:

```sql
insert into storage.buckets (id, name, public)
values ('site-assets', 'site-assets', true)
on conflict (id) do update set public = true;

drop policy if exists "Public read site assets" on storage.objects;
create policy "Public read site assets"
on storage.objects
for select
to anon, authenticated
using (bucket_id = 'site-assets');

drop policy if exists "Authenticated upload site assets" on storage.objects;
create policy "Authenticated upload site assets"
on storage.objects
for insert
to authenticated
with check (bucket_id = 'site-assets');

drop policy if exists "Authenticated update site assets" on storage.objects;
create policy "Authenticated update site assets"
on storage.objects
for update
to authenticated
using (bucket_id = 'site-assets')
with check (bucket_id = 'site-assets');

drop policy if exists "Authenticated delete site assets" on storage.objects;
create policy "Authenticated delete site assets"
on storage.objects
for delete
to authenticated
using (bucket_id = 'site-assets');
```
