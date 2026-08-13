-- SECURITY DEFINER function to look up an inviter by invite code.
-- Bypasses RLS so any authenticated user can resolve an invite link.

create or replace function public.lookup_inviter(invite_code text)
returns table (
  id uuid,
  email text,
  partner_id uuid,
  subscription_status subscription_status
)
language sql
stable
security definer
set search_path = public
as $$
  select u.id, u.email, u.partner_id, u.subscription_status
  from public.users u
  where u.couple_invite_code = invite_code
  limit 1;
$$;

-- Allow any authenticated user to call this function
grant execute on function public.lookup_inviter(text) to authenticated;