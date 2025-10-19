-- Fix security warnings from linter
-- 1) Add search_path to functions
CREATE OR REPLACE FUNCTION public.set_company_user_id()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NEW.user_id IS NULL THEN
    NEW.user_id := auth.uid();
  END IF;
  RETURN NEW;
END;
$$;

-- 2) Add RLS policies to Candidates table (INFO #1)
ALTER TABLE public."Candidates" ENABLE ROW LEVEL SECURITY;

-- Policy: Authenticated users can view all candidates
CREATE POLICY "Authenticated users can view candidates"
ON public."Candidates"
FOR SELECT
TO authenticated
USING (true);

-- Policy: Authenticated users can insert candidates
CREATE POLICY "Authenticated users can insert candidates"
ON public."Candidates"
FOR INSERT
TO authenticated
WITH CHECK (true);

-- Policy: Authenticated users can update candidates
CREATE POLICY "Authenticated users can update candidates"
ON public."Candidates"
FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);