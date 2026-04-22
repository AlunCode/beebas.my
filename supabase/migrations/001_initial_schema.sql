-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Enums
create type subscription_status as enum ('free', 'pro', 'cancelled');

create type debt_type as enum (
  'personal_loan',
  'credit_card',
  'ptptn',
  'car_loan',
  'home_loan',
  'bnpl',
  'aeon_credit',
  'other'
);

create type milestone_type as enum (
  'first_debt_paid',
  'halfway_point',
  'streak_3_months',
  'streak_6_months',
  'streak_12_months',
  'all_debts_paid'
);

-- Users table (extends Supabase auth.users)
create table public.users (
  id uuid references auth.users(id) on delete cascade primary key,
  email text not null,
  stripe_customer_id text unique,
  subscription_status subscription_status not null default 'free',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Debts table
create table public.debts (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references public.users(id) on delete cascade not null,
  name text not null,
  balance numeric(12, 2) not null check (balance >= 0),
  interest_rate numeric(5, 2) not null check (interest_rate >= 0 and interest_rate <= 100),
  minimum_payment numeric(10, 2) not null check (minimum_payment >= 0),
  debt_type debt_type not null default 'other',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Payments table
create table public.payments (
  id uuid primary key default uuid_generate_v4(),
  debt_id uuid references public.debts(id) on delete cascade not null,
  user_id uuid references public.users(id) on delete cascade not null,
  amount numeric(10, 2) not null check (amount > 0),
  payment_date date not null,
  notes text,
  created_at timestamptz not null default now()
);

-- Milestones table
create table public.milestones (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references public.users(id) on delete cascade not null,
  type milestone_type not null,
  achieved_at timestamptz not null default now(),
  debt_id uuid references public.debts(id) on delete set null,
  unique (user_id, type, debt_id)
);

-- Indexes
create index debts_user_id_idx on public.debts(user_id);
create index payments_user_id_idx on public.payments(user_id);
create index payments_debt_id_idx on public.payments(debt_id);
create index milestones_user_id_idx on public.milestones(user_id);

-- Auto-update updated_at
create or replace function update_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger users_updated_at
  before update on public.users
  for each row execute function update_updated_at();

create trigger debts_updated_at
  before update on public.debts
  for each row execute function update_updated_at();

-- Auto-create user row on auth signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.users (id, email)
  values (new.id, new.email);
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Row Level Security
alter table public.users enable row level security;
alter table public.debts enable row level security;
alter table public.payments enable row level security;
alter table public.milestones enable row level security;

-- RLS Policies: users can only access their own data
create policy "users: own row" on public.users
  for all using (auth.uid() = id);

create policy "debts: own rows" on public.debts
  for all using (auth.uid() = user_id);

create policy "payments: own rows" on public.payments
  for all using (auth.uid() = user_id);

create policy "milestones: own rows" on public.milestones
  for all using (auth.uid() = user_id);

-- Free tier limit: max 3 debts
create or replace function check_debt_limit()
returns trigger as $$
declare
  debt_count integer;
  user_status subscription_status;
begin
  select subscription_status into user_status
  from public.users where id = new.user_id;

  if user_status = 'free' then
    select count(*) into debt_count
    from public.debts where user_id = new.user_id;

    if debt_count >= 3 then
      raise exception 'Free plan allows a maximum of 3 debts. Upgrade to Pro for unlimited debts.';
    end if;
  end if;

  return new;
end;
$$ language plpgsql security definer;

create trigger enforce_debt_limit
  before insert on public.debts
  for each row execute function check_debt_limit();
