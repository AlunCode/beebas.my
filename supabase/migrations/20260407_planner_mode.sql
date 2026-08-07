-- Add new subscription statuses for planner mode
ALTER TYPE subscription_status ADD VALUE IF NOT EXISTS 'pro_lifetime';
ALTER TYPE subscription_status ADD VALUE IF NOT EXISTS 'planner_monthly';
ALTER TYPE subscription_status ADD VALUE IF NOT EXISTS 'planner_annual';

-- Create user_role enum
CREATE TYPE user_role AS ENUM ('individual', 'planner');

-- Add role column to users table
ALTER TABLE public.users 
  ADD COLUMN IF NOT EXISTS role user_role NOT NULL DEFAULT 'individual';

-- Create clients table
CREATE TABLE public.clients (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  planner_id uuid REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
  name text NOT NULL,
  email text NOT NULL,
  notes text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Index for clients
CREATE INDEX IF NOT EXISTS idx_clients_planner_id ON public.clients(planner_id);

-- Add client_id to debts table
ALTER TABLE public.debts 
  ADD COLUMN IF NOT EXISTS client_id uuid REFERENCES public.clients(id) ON DELETE SET NULL;

-- Add client_id to milestones table
ALTER TABLE public.milestones 
  ADD COLUMN IF NOT EXISTS client_id uuid REFERENCES public.clients(id) ON DELETE SET NULL;

-- Add client_id to payments table
ALTER TABLE public.payments 
  ADD COLUMN IF NOT EXISTS client_id uuid REFERENCES public.clients(id) ON DELETE SET NULL;

-- Indexes for client_id foreign keys
CREATE INDEX IF NOT EXISTS idx_debts_client_id ON public.debts(client_id);
CREATE INDEX IF NOT EXISTS idx_milestones_client_id ON public.milestones(client_id);
CREATE INDEX IF NOT EXISTS idx_payments_client_id ON public.payments(client_id);

-- Auto-update updated_at for clients
CREATE OR REPLACE FUNCTION update_clients_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER clients_updated_at
  BEFORE UPDATE ON public.clients
  FOR EACH ROW EXECUTE FUNCTION update_clients_updated_at();

-- Enable Row Level Security on clients
ALTER TABLE public.clients ENABLE ROW LEVEL SECURITY;

-- RLS Policies for clients
CREATE POLICY "clients: planner can view own clients" ON public.clients
  FOR SELECT USING (auth.uid() = planner_id);

CREATE POLICY "clients: planner can insert own clients" ON public.clients
  FOR INSERT WITH CHECK (auth.uid() = planner_id);

CREATE POLICY "clients: planner can update own clients" ON public.clients
  FOR UPDATE USING (auth.uid() = planner_id);

CREATE POLICY "clients: planner can delete own clients" ON public.clients
  FOR DELETE USING (auth.uid() = planner_id);

-- Update RLS policies for debts to allow planner access through client relationship
CREATE POLICY "debts: planner access through client" ON public.debts
  FOR ALL USING (
    auth.uid() = user_id 
    OR 
    (client_id IS NOT NULL AND auth.uid() IN (
      SELECT planner_id FROM public.clients WHERE id = client_id
    ))
  );

-- Update RLS policies for milestones to allow planner access through client relationship
CREATE POLICY "milestones: planner access through client" ON public.milestones
  FOR ALL USING (
    auth.uid() = user_id 
    OR 
    (client_id IS NOT NULL AND auth.uid() IN (
      SELECT planner_id FROM public.clients WHERE id = client_id
    ))
  );

-- Update RLS policies for payments to allow planner access through client relationship
CREATE POLICY "payments: planner access through client" ON public.payments
  FOR ALL USING (
    auth.uid() = user_id 
    OR 
    (client_id IS NOT NULL AND auth.uid() IN (
      SELECT planner_id FROM public.clients WHERE id = client_id
    ))
  );