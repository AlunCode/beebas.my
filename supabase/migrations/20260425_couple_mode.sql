-- Couple / family mode: adds partner linking and invite codes to users table.
-- Run this in your Supabase SQL editor.

ALTER TABLE users
  ADD COLUMN IF NOT EXISTS partner_id UUID REFERENCES users(id) ON DELETE SET NULL,
  ADD COLUMN IF NOT EXISTS couple_invite_code VARCHAR(8) UNIQUE;

-- Update the debts SELECT policy to allow partners to see each other's debts.
-- If your policy has a different name, update the SELECT policy body manually.
DROP POLICY IF EXISTS "Users can view own debts" ON debts;
DROP POLICY IF EXISTS "users_select_own_debts" ON debts;

CREATE POLICY "Users and partners can view debts" ON debts
  FOR SELECT USING (
    user_id = auth.uid()
    OR user_id IN (
      SELECT partner_id FROM users
      WHERE id = auth.uid() AND partner_id IS NOT NULL
    )
  );

-- Insert / update / delete remain restricted to own debts only.
-- These are no-ops if they already exist with these names.
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'debts' AND policyname = 'Users can insert own debts'
  ) THEN
    CREATE POLICY "Users can insert own debts" ON debts
      FOR INSERT WITH CHECK (user_id = auth.uid());
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'debts' AND policyname = 'Users can update own debts'
  ) THEN
    CREATE POLICY "Users can update own debts" ON debts
      FOR UPDATE USING (user_id = auth.uid());
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'debts' AND policyname = 'Users can delete own debts'
  ) THEN
    CREATE POLICY "Users can delete own debts" ON debts
      FOR DELETE USING (user_id = auth.uid());
  END IF;
END $$;
