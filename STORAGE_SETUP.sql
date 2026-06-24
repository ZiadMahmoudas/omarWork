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
