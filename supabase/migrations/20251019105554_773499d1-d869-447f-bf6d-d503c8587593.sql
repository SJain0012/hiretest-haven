-- Fix RLS preventing company creation on signup
-- 1) Add user_id and trigger to auto-fill from auth.uid()
ALTER TABLE public."Company"
  ADD COLUMN IF NOT EXISTS user_id uuid;

CREATE OR REPLACE FUNCTION public.set_company_user_id()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
  IF NEW.user_id IS NULL THEN
    NEW.user_id := auth.uid();
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_set_company_user_id ON public."Company";
CREATE TRIGGER trg_set_company_user_id
BEFORE INSERT ON public."Company"
FOR EACH ROW
EXECUTE FUNCTION public.set_company_user_id();

-- 2) Ensure RLS and add policies scoped to the creator
ALTER TABLE public."Company" ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can create their own company" ON public."Company";
DROP POLICY IF EXISTS "Users can view their own company" ON public."Company";
DROP POLICY IF EXISTS "Users can update their own company" ON public."Company";

CREATE POLICY "Users can create their own company"
ON public."Company"
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Users can view their own company"
ON public."Company"
FOR SELECT
TO authenticated
USING (user_id = auth.uid());

CREATE POLICY "Users can update their own company"
ON public."Company"
FOR UPDATE
TO authenticated
USING (user_id = auth.uid())
WITH CHECK (user_id = auth.uid());

-- 3) Index for performance
CREATE INDEX IF NOT EXISTS idx_company_user_id ON public."Company"(user_id);
