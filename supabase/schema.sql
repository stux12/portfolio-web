-- Run this file once in Supabase Dashboard > SQL Editor.
-- Raw IP addresses are never stored. The Vercel API hashes them before calling these functions.

create table if not exists public.portfolio_visitors (
  visitor_hash text primary key,
  first_seen_at timestamptz not null default now(),
  last_seen_at timestamptz not null default now()
);

create table if not exists public.portfolio_daily_visitors (
  visit_date date not null,
  visitor_hash text not null references public.portfolio_visitors(visitor_hash) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (visit_date, visitor_hash)
);

create table if not exists public.portfolio_likes (
  visitor_hash text primary key references public.portfolio_visitors(visitor_hash) on delete cascade,
  liked_at timestamptz not null default now()
);

alter table public.portfolio_visitors enable row level security;
alter table public.portfolio_daily_visitors enable row level security;
alter table public.portfolio_likes enable row level security;

revoke all on public.portfolio_visitors from anon, authenticated;
revoke all on public.portfolio_daily_visitors from anon, authenticated;
revoke all on public.portfolio_likes from anon, authenticated;

create or replace function public.portfolio_stats(p_visitor_hash text)
returns table(today bigint, total bigint, likes bigint, liked boolean)
language sql
security definer
set search_path = public
as $$
  select
    (select count(*) from portfolio_daily_visitors where visit_date = timezone('Asia/Seoul', now())::date),
    (select count(*) from portfolio_daily_visitors),
    (select count(*) from portfolio_likes),
    exists(select 1 from portfolio_likes where visitor_hash = p_visitor_hash);
$$;

create or replace function public.record_portfolio_visit(p_visitor_hash text)
returns table(today bigint, total bigint, likes bigint, liked boolean)
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into portfolio_visitors (visitor_hash, first_seen_at, last_seen_at)
  values (p_visitor_hash, now(), now())
  on conflict (visitor_hash) do update set last_seen_at = excluded.last_seen_at;

  insert into portfolio_daily_visitors (visit_date, visitor_hash)
  values (timezone('Asia/Seoul', now())::date, p_visitor_hash)
  on conflict do nothing;

  return query select * from portfolio_stats(p_visitor_hash);
end;
$$;

create or replace function public.record_portfolio_like(p_visitor_hash text)
returns table(today bigint, total bigint, likes bigint, liked boolean)
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into portfolio_visitors (visitor_hash, first_seen_at, last_seen_at)
  values (p_visitor_hash, now(), now())
  on conflict (visitor_hash) do update set last_seen_at = excluded.last_seen_at;

  insert into portfolio_likes (visitor_hash)
  values (p_visitor_hash)
  on conflict do nothing;

  return query select * from portfolio_stats(p_visitor_hash);
end;
$$;

revoke all on function public.portfolio_stats(text) from public;
revoke all on function public.record_portfolio_visit(text) from public;
revoke all on function public.record_portfolio_like(text) from public;
grant execute on function public.portfolio_stats(text) to service_role;
grant execute on function public.record_portfolio_visit(text) to service_role;
grant execute on function public.record_portfolio_like(text) to service_role;
