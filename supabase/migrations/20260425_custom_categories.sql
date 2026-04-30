-- Custom debt categories for Pro users.
-- Run this in your Supabase SQL editor.

ALTER TABLE debts
  ADD COLUMN IF NOT EXISTS custom_category VARCHAR(50);
