-- =====================================================================
-- Tarot Ade · Schema Supabase v1
--
-- Modelo: "primera Cruz Celta gratis, después paga".
-- Identidad: email + magic link (auth.users de Supabase).
--
-- Tablas:
--   celtic_uses  — un row por cada uso de Cruz Celta (free o paid)
--   payments     — pagos con uses_granted / uses_consumed
--
-- Reglas:
--   - Cada usuario solo lee/edita sus propios rows (RLS).
--   - El cliente puede insertar un uso 'free' propio.
--   - El consumo 'paid' va por una RPC con security definer que
--     valida atómicamente: aún hay usos disponibles, descuenta uno,
--     registra el uso. Esto evita que el cliente actualice
--     uses_consumed directamente.
--   - Los pagos los crea/actualiza el service role (edge function que
--     procesa el webhook de la pasarela cuando se enchufe). El cliente
--     solo los lee.
--
-- Cómo aplicar:
--   1. Entrar al proyecto Supabase → SQL Editor
--   2. Pegar este archivo completo
--   3. Run
-- =====================================================================

-- ---------------------------------------------------------------------
-- Tabla: payments
-- ---------------------------------------------------------------------
create table if not exists public.payments (
  id                    uuid primary key default gen_random_uuid(),
  user_id               uuid not null references auth.users(id) on delete cascade,
  amount_cents          integer not null check (amount_cents >= 0),
  currency              text    not null default 'CLP',
  provider              text    not null,  -- 'stripe' | 'mercadopago' | 'flow' | 'manual'
  provider_payment_id   text,
  status                text    not null check (status in ('pending','completed','failed','refunded')),
  uses_granted          integer not null default 1 check (uses_granted >= 1),
  uses_consumed         integer not null default 0 check (uses_consumed >= 0),
  created_at            timestamptz not null default now(),
  completed_at          timestamptz
);

create index if not exists payments_user_id_idx
  on public.payments (user_id);

create index if not exists payments_user_status_idx
  on public.payments (user_id, status);

-- ---------------------------------------------------------------------
-- Tabla: celtic_uses
-- ---------------------------------------------------------------------
create table if not exists public.celtic_uses (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null references auth.users(id) on delete cascade,
  used_at     timestamptz not null default now(),
  source      text not null check (source in ('free','paid')),
  payment_id  uuid references public.payments(id) on delete set null
);

create index if not exists celtic_uses_user_id_idx
  on public.celtic_uses (user_id);

create index if not exists celtic_uses_user_source_idx
  on public.celtic_uses (user_id, source);

-- ---------------------------------------------------------------------
-- Row Level Security
-- ---------------------------------------------------------------------
alter table public.payments     enable row level security;
alter table public.celtic_uses  enable row level security;

-- SELECT: el dueño puede leer sus propios rows
drop policy if exists "users read own payments" on public.payments;
create policy "users read own payments"
  on public.payments for select
  to authenticated
  using (auth.uid() = user_id);

drop policy if exists "users read own celtic_uses" on public.celtic_uses;
create policy "users read own celtic_uses"
  on public.celtic_uses for select
  to authenticated
  using (auth.uid() = user_id);

-- INSERT (celtic_uses): el usuario puede registrar su tirada gratis.
-- Las tiradas pagas (source='paid') no se permiten desde el cliente —
-- van por la RPC consume_paid_use con security definer.
drop policy if exists "users insert own free celtic_uses" on public.celtic_uses;
create policy "users insert own free celtic_uses"
  on public.celtic_uses for insert
  to authenticated
  with check (auth.uid() = user_id and source = 'free');

-- payments NO tiene policies de INSERT/UPDATE para el cliente.
-- Esos cambios solo los hace el service role (edge function de la
-- pasarela). El cliente solo lee.

-- ---------------------------------------------------------------------
-- RPC: consume_paid_use
--
-- Atómica: chequea que haya usos disponibles en el payment, descuenta
-- uno, registra el uso. Devuelve true/false según éxito.
-- ---------------------------------------------------------------------
create or replace function public.consume_paid_use(p_payment_id uuid)
returns boolean
language plpgsql
security definer
set search_path = public
as $$
declare
  v_payment_user_id uuid;
  v_granted         integer;
  v_consumed        integer;
begin
  if auth.uid() is null then
    raise exception 'Not authenticated';
  end if;

  select user_id, uses_granted, uses_consumed
    into v_payment_user_id, v_granted, v_consumed
    from public.payments
    where id = p_payment_id
      and status = 'completed'
    for update;

  if not found then
    return false;
  end if;

  if v_payment_user_id <> auth.uid() then
    return false;
  end if;

  if v_consumed >= v_granted then
    return false;
  end if;

  update public.payments
    set uses_consumed = uses_consumed + 1
    where id = p_payment_id;

  insert into public.celtic_uses (user_id, source, payment_id)
    values (auth.uid(), 'paid', p_payment_id);

  return true;
end;
$$;

revoke all on function public.consume_paid_use(uuid) from public, anon;
grant execute on function public.consume_paid_use(uuid) to authenticated;

-- ---------------------------------------------------------------------
-- Sugerencia (no obligatoria): vista de estado de acceso por usuario.
-- Útil para debug en el SQL Editor. El cliente no la usa.
-- ---------------------------------------------------------------------
create or replace view public.v_user_celtic_state as
  select
    u.id                                                       as user_id,
    u.email                                                    as email,
    (select count(*) from public.celtic_uses cu
       where cu.user_id = u.id and cu.source = 'free')          as free_uses,
    (select count(*) from public.celtic_uses cu
       where cu.user_id = u.id and cu.source = 'paid')          as paid_uses,
    (select coalesce(sum(uses_granted - uses_consumed), 0)
       from public.payments p
       where p.user_id = u.id and p.status = 'completed')       as paid_remaining
  from auth.users u;

-- =====================================================================
-- Fin del schema.
-- =====================================================================
