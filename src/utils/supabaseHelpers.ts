
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
  testId?: string,
  company: string = 'XYZ'
) => {
  try {
    // Add the candidate to the database
    const { data, error } = await supabase
      .from('Candidates')
      .insert([
        {
          Name: name,
          Email: email,
          Status: 'pending',
          testName: testName,
          test_id: testId,
          Company: company,
        }
      ])
      .select('*')
      .single();
      
    if (error) throw error;
    
    // Skip email sending, just log that we would normally send an email
    console.log(`Would normally send email to ${email} with test invitation for "${testName}"`);
    return data;
  } catch (error) {
    console.error('Error sending test invitation:', error);
    throw error;
  }
};

/**
 * Helper function to get dashboard statistics
 */
export const getDashboardStats = async () => {
  try {
    // Get total tests count
    const { data: testsData, error: testsError } = await supabase
      .from('Tests')
      .select('id, status', { count: 'exact' });
    
    if (testsError) throw testsError;
    
    // Get total candidates count and completion status
    const { data: candidatesData, error: candidatesError } = await supabase
      .from('Candidates')
      .select('id, Status');
    
    if (candidatesError) throw candidatesError;
    
    // Calculate stats
    const testsCount = testsData.length;
    const activeTestsCount = testsData.filter(test => test.status === 'active').length;
    const candidatesCount = candidatesData.length;
    const completedTestsCount = candidatesData.filter(candidate => 
      candidate.Status?.toLowerCase() === 'completed'
    ).length;
    
    const completionRate = candidatesCount > 0 
      ? Math.round((completedTestsCount / candidatesCount) * 100) 
      : 0;
    
    console.log('Dashboard stats:', {
      testsCount,
      activeTestsCount,
      candidatesCount,
      completedTestsCount,
      completionRate
    });
    
    return {
      testsCount,
      activeTestsCount,
      candidatesCount,
      completedTestsCount,
      completionRate
    };
  } catch (error) {
    console.error('Error getting dashboard stats:', error);
    throw error;
  }
};
