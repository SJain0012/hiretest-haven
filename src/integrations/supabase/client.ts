// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://vnrieintzalmjsxfyvqn.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZucmllaW50emFsbWpzeGZ5dnFuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM1MzY0NjAsImV4cCI6MjA1OTExMjQ2MH0.FGfluIU8H7NHIBbphn80Jz_uUdmuPU88207xRQq_IA0";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);