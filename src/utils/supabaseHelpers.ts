
import { supabase } from '@/integrations/supabase/client';

/**
 * Helper function to ensure the testName column exists in Candidates table
 */
export const ensureTestNameColumn = async () => {
  try {
    // Call the edge function to add the testName column if it doesn't exist
    const response = await fetch('/api/add-testname-column', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      throw new Error('Failed to ensure testName column exists');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error ensuring testName column:', error);
    throw error;
  }
};

/**
 * Helper function to send test invitation to a candidate
 */
export const sendTestInvitation = async (
  name: string, 
  email: string, 
  testName: string, 
  company: string = 'XYZ'
) => {
  try {
    // Ensure the testName column exists
    await ensureTestNameColumn();
    
    // Add the candidate to the database
    const { data, error } = await supabase
      .from('Candidates')
      .insert([
        {
          Name: name,
          Email: email,
          Status: 'pending',
          testName: testName,
          Company: company,
        }
      ])
      .select('*')
      .single();
      
    if (error) throw error;
    
    // In a real application, you would send an email here
    // For now, we'll just return the data
    return data;
  } catch (error) {
    console.error('Error sending test invitation:', error);
    throw error;
  }
};
