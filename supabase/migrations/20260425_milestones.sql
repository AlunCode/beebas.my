-- Add original_balance to debts so we can detect the halfway_point milestone.
-- Run this in your Supabase SQL editor.

ALTER TABLE debts
  ADD COLUMN IF NOT EXISTS original_balance NUMERIC;

-- Back-fill existing rows so they start tracking from now
UPDATE debts SET original_balance = balance WHERE original_balance IS NULL;

-- Helpful index for milestone queries
CREATE INDEX IF NOT EXISTS idx_milestones_user_type ON milestones(user_id, type);
