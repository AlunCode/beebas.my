-- FIX: the "users: read partner" policy created in 20260813_couple_link_rpc.sql
-- used a subquery on the `users` table inside a policy on the same table. That
-- causes PostgreSQL "infinite recursion detected in policy for relation \"users\"",
-- which breaks EVERY read of the users table - including login (getAuthUser).
--
-- Run this file in the Supabase SQL editor to repair the database.

-- 1. Drop the broken recursive policy (restores login immediately).
DROP POLICY IF EXISTS "users: read partner" ON public.users;

-- 2. Helper that returns the current user's partner_id. SECURITY DEFINER lets it
--    bypass RLS so the policy below avoids the recursion.
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

-- 3. Recreate the policy using the helper - no self-referencing subquery.
CREATE POLICY "users: read partner" ON public.users
  FOR SELECT USING (
    id = public.get_my_partner_id()
  );
