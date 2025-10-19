-- Add company_id to Candidates table for proper data isolation
ALTER TABLE "Candidates" ADD COLUMN IF NOT EXISTS company_id bigint REFERENCES "Company"(id);

-- Update existing candidates to link them to the first company (temporary fix for existing data)
-- In production, you'd want to properly map candidates to their correct companies
UPDATE "Candidates" 
SET company_id = (SELECT id FROM "Company" LIMIT 1)
WHERE company_id IS NULL;

-- Create index for better query performance
CREATE INDEX IF NOT EXISTS idx_candidates_company_id ON "Candidates"(company_id);

-- Now make company_id required for new records
ALTER TABLE "Candidates" ALTER COLUMN company_id SET NOT NULL;

-- Drop overly permissive policies on Candidates
DROP POLICY IF EXISTS "Authenticated users can view candidates" ON "Candidates";
DROP POLICY IF EXISTS "Authenticated users can insert candidates" ON "Candidates";
DROP POLICY IF EXISTS "Authenticated users can update candidates" ON "Candidates";

-- Create proper company-scoped policies for Candidates
CREATE POLICY "Users view own company candidates" ON "Candidates"
FOR SELECT USING (
  company_id IN (SELECT id FROM "Company" WHERE user_id = auth.uid())
);

CREATE POLICY "Users insert own company candidates" ON "Candidates"
FOR INSERT WITH CHECK (
  company_id IN (SELECT id FROM "Company" WHERE user_id = auth.uid())
);

CREATE POLICY "Users update own company candidates" ON "Candidates"
FOR UPDATE USING (
  company_id IN (SELECT id FROM "Company" WHERE user_id = auth.uid())
) WITH CHECK (
  company_id IN (SELECT id FROM "Company" WHERE user_id = auth.uid())
);

CREATE POLICY "Users delete own company candidates" ON "Candidates"
FOR DELETE USING (
  company_id IN (SELECT id FROM "Company" WHERE user_id = auth.uid())
);

-- Drop overly permissive policies on Tests
DROP POLICY IF EXISTS "Enable all operations for authenticated users" ON "Tests";
DROP POLICY IF EXISTS "Users can view tests from their company" ON "Tests";

-- Create proper company-scoped policies for Tests
CREATE POLICY "Users view own company tests" ON "Tests"
FOR SELECT USING (
  company_id IN (SELECT id FROM "Company" WHERE user_id = auth.uid())
);

CREATE POLICY "Users manage own company tests" ON "Tests"
FOR ALL USING (
  company_id IN (SELECT id FROM "Company" WHERE user_id = auth.uid())
) WITH CHECK (
  company_id IN (SELECT id FROM "Company" WHERE user_id = auth.uid())
);