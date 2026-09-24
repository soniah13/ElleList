create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  username text check (username is null or username ~ '^[a-z0-9_]{3,30}$'),
  created_at timestamptz not null default now()
);

create unique index profiles_username_unique
  on public.profiles (username)
  where username is not null;

alter table public.profiles enable row level security;

create policy "Users can view their own profile"
  on public.profiles for select
  to authenticated
  using ((select auth.uid()) = id);

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, username)
  values (new.id, nullif(lower(trim(new.raw_user_meta_data ->> 'username')), ''));
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

create or replace function public.get_email_by_username(input_username text)
returns text
language sql
security definer set search_path = public
stable
as $$
  select users.email
  from auth.users as users
  join public.profiles on profiles.id = users.id
  where profiles.username = lower(trim(input_username))
  limit 1;
$$;

revoke all on function public.get_email_by_username(text) from public;
grant execute on function public.get_email_by_username(text) to anon, authenticated;