-- Couple mode: fix the invite acceptance bug where the inviter's partner_id
-- was never set because the `users` RLS policy only lets users update their own
-- row. Adds SECURITY DEFINER functions that link/unlink couples atomically and
-- bypass RLS, plus a `couple_invitee` flag to remember who was granted free Pro
-- so we can revert them to Free when they leave.

-- 1. Flag to remember which user in a couple is the invitee (granted free Pro)
ALTER TABLE public.users
  ADD COLUMN IF NOT EXISTS couple_invitee boolean NOT NULL DEFAULT false;

-- 2. Allow partners to read each other's user row (e.g. to show partner email).
--    NOTE: do NOT put a subquery on `users` inside its own policy - that causes
--    "infinite recursion detected in policy for relation users" and breaks all
--    reads of the users table (including login). Use a SECURITY DEFINER helper.
create or replace function public.get_my_partner_id()
returns uuid
language sql
stable
security definer
set search_path = public
as $$
  select partner_id from public.users where id = auth.uid();
$$;

grant execute on function public.get_my_partner_id() to authenticated;

DROP POLICY IF EXISTS "users: read partner" ON public.users;
CREATE POLICY "users: read partner" ON public.users
  FOR SELECT USING (
    id = public.get_my_partner_id()
  );

-- 3. Link the current user (invitee) with the inviter atomically.
create or replace function public.link_couple(inviter_id uuid)
returns text
language plpgsql
security definer
set search_path = public
as $$
declare
  current_id uuid := auth.uid();
  inviter_email text;
  inviter_linked uuid;
  self_linked uuid;
begin
  if current_id is null then
    raise exception 'Not authenticated';
  end if;

  if current_id = inviter_id then
    raise exception 'You cannot accept your own invite';
  end if;

  select email, partner_id
    into inviter_email, inviter_linked
    from public.users
    where id = inviter_id;

  if not found then
    raise exception 'Invalid or expired invite link';
  end if;

  select partner_id into self_linked
    from public.users
    where id = current_id;

  if self_linked is not null then
    raise exception 'You are already linked with a partner';
  end if;

  if inviter_linked is not null then
    raise exception 'This person is already linked with a partner';
  end if;

  -- Link the invitee (grant free Pro) and the inviter.
  update public.users
    set partner_id = inviter_id,
        couple_invite_code = null,
        subscription_status = 'pro',
        couple_invitee = true
    where id = current_id;

  update public.users
    set partner_id = current_id,
        couple_invite_code = null,
        couple_invitee = false
    where id = inviter_id;

  return inviter_email;
end;
$$;

grant execute on function public.link_couple(uuid) to authenticated;

-- 4. Unlink the current user from their partner, reverting the invitee to Free.
create or replace function public.unlink_couple()
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  current_id uuid := auth.uid();
  current_partner uuid;
  invitee_id uuid;
begin
  if current_id is null then
    raise exception 'Not authenticated';
  end if;

  select partner_id into current_partner
    from public.users
    where id = current_id;

  if current_partner is null then
    raise exception 'You are not in couple mode';
  end if;

  -- Find the invitee between the two users.
  select id into invitee_id
    from public.users
    where id in (current_id, current_partner)
      and couple_invitee = true
    limit 1;

  -- Unlink both users and clear the invitee flags.
  update public.users
    set partner_id = null,
        couple_invitee = false
    where id in (current_id, current_partner);

  -- Revert the invitee (who was granted free Pro) back to Free tier.
  if invitee_id is not null then
    update public.users set subscription_status = 'free' where id = invitee_id;
  end if;
end;
$$;

grant execute on function public.unlink_couple() to authenticated;

-- 5. Repair existing half-linked couples created by the RLS bug (invitee has
--    partner_id set, but the inviter's partner_id is still null).
DO $$
DECLARE
  r record;
BEGIN
  FOR r IN
    SELECT u.id AS invitee_id, u.partner_id AS inviter_id
    FROM public.users u
    WHERE u.partner_id IS NOT NULL
      AND NOT EXISTS (
        SELECT 1 FROM public.users p
        WHERE p.id = u.partner_id AND p.partner_id = u.id
      )
  LOOP
    UPDATE public.users
      SET partner_id = r.invitee_id,
          couple_invitee = false,
          couple_invite_code = null
      WHERE id = r.inviter_id AND partner_id IS NULL;

    UPDATE public.users
      SET couple_invitee = true
      WHERE id = r.invitee_id;
  END LOOP;
END $$;
