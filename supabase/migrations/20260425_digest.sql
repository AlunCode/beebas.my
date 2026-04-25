-- Monthly email digest opt-out tracking.
-- Run this in your Supabase SQL editor.

ALTER TABLE users
  ADD COLUMN IF NOT EXISTS digest_opted_out BOOLEAN NOT NULL DEFAULT FALSE,
  ADD COLUMN IF NOT EXISTS digest_last_sent TIMESTAMPTZ;
