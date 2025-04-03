
// This is an edge function to add the testName column to the Candidates table
// Since we can't modify the types.ts file directly

import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.38.1';

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders, status: 204 });
  }

  try {
    // Create a Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL') || '';
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || '';
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Check if the column exists
    const { data: columns, error: columnCheckError } = await supabase
      .rpc('get_table_columns', { table_name: 'Candidates' });

    if (columnCheckError) {
      throw columnCheckError;
    }

    const hasTestNameColumn = columns.some((col: any) => col.column_name === 'testname');

    if (!hasTestNameColumn) {
      // Add the testName column to the Candidates table
      const { error } = await supabase.rpc('add_column_if_not_exists', {
        table_name: 'Candidates',
        column_name: 'testName',
        column_type: 'TEXT'
      });

      if (error) {
        throw error;
      }
    }

    return new Response(
      JSON.stringify({ success: true, message: "testName column added or already exists" }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 200 }
    );
  } catch (error) {
    console.error('Error:', error);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 500 }
    );
  }
});
