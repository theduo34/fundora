-- profiles
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  first_name text not null default '',
  last_name text not null default '',
  email text not null default '',
  phone text,
  avatar_url text,
  currency_code text not null default 'USD',
  balance bigint not null default 0,
  address text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

create policy "Users can view own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id);

-- auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, first_name, last_name)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'first_name', ''),
    coalesce(new.raw_user_meta_data->>'last_name', '')
  );
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- cards
create table if not exists public.cards (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  network text not null default 'visa',
  type text not null default 'debit',
  status text not null default 'active',
  label text not null default '',
  card_holder_name text not null default '',
  masked_pan text not null default '',
  expiry_month text not null default '',
  expiry_year text not null default '',
  balance bigint not null default 0,
  credit_limit bigint,
  available_credit bigint,
  gradient_variant text not null default 'primary',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.cards enable row level security;

create policy "Users can view own cards"
  on public.cards for select
  using (auth.uid() = user_id);

create policy "Users can insert own cards"
  on public.cards for insert
  with check (auth.uid() = user_id);

create policy "Users can update own cards"
  on public.cards for update
  using (auth.uid() = user_id);

-- transactions
create table if not exists public.transactions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  card_id uuid references public.cards(id) on delete set null,
  type text not null default 'debit',
  status text not null default 'completed',
  category text not null default 'other',
  amount bigint not null default 0,
  currency text not null default 'USD',
  description text not null default '',
  note text,
  merchant_logo_url text,
  counterparty_name text,
  counterparty_avatar_url text,
  counterparty_account_mask text,
  reference text not null default '',
  balance_after bigint not null default 0,
  fee bigint not null default 0,
  exchange_rate numeric,
  metadata jsonb not null default '{}',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  completed_at timestamptz
);

alter table public.transactions enable row level security;

create policy "Users can view own transactions"
  on public.transactions for select
  using (auth.uid() = user_id);

create policy "Users can insert own transactions"
  on public.transactions for insert
  with check (auth.uid() = user_id);

-- notifications
create table if not exists public.notifications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  type text not null default 'system',
  status text not null default 'unread',
  title text not null default '',
  body text not null default '',
  full_content text not null default '',
  amount bigint,
  currency text,
  action_url text,
  icon_name text not null default 'Bell',
  metadata jsonb not null default '{}',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  read_at timestamptz
);

alter table public.notifications enable row level security;

create policy "Users can view own notifications"
  on public.notifications for select
  using (auth.uid() = user_id);

create policy "Users can update own notifications"
  on public.notifications for update
  using (auth.uid() = user_id);
