
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Candidate } from '@/types/candidate';
import { useAuth } from './useAuth';
import { toast } from 'sonner';
import { fetchCandidatesWithFallback } from '@/utils/supabaseHelpers';

// Define a type for tests to match our usage
export interface Test {
  id: string;
  name: string;
  status: "active" | "draft" | "archived";
}

// Define a type for the raw data from Supabase
interface RawCandidate {
  id: number;
  Name: string;
  Email: string;
  Status: string;
  Company: string;
  testName: string;
  test_id?: string;
  results?: any;
  Completed_On?: string;
  created_at: string;
}

export const useCandidates = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [tests, setTests] = useState<Test[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const { session } = useAuth();

  const fetchCandidates = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Use our helper function that includes fallback data
      const data = await fetchCandidatesWithFallback();
      
      // Map Supabase data to match our Candidate type
      const mappedCandidates = (data as RawCandidate[]).map(candidate => ({
        id: candidate.id.toString(),
        name: candidate.Name || '',
        email: candidate.Email || '',
        status: (candidate.Status?.toLowerCase() || 'pending') as 'pending' | 'completed' | 'expired',
        testName: candidate.testName || 'General Assessment',
        testId: candidate.test_id,
        results: candidate.results,
        completedDate: candidate.Completed_On,
      }));
      
      setCandidates(mappedCandidates);
    } catch (error) {
      console.error('Error fetching candidates:', error);
      setError(error as Error);
      toast.error('Failed to load candidates');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchTests = async () => {
    setIsLoading(true);
    
    try {
      if (!session) {
        throw new Error('No active session');
      }
      
      const { data, error } = await supabase
        .from('Tests')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      
      const mappedTests = (data || []).map(test => ({
        id: test.id.toString(),
        name: test.name,
        status: test.status as Test['status']
      }));
      
      setTests(mappedTests);
    } catch (error) {
      console.error('Error fetching tests:', error);
      toast.error('Failed to load tests');
      
      // Use sample tests in case of error
      setTests([
        { id: '1', name: 'Cognitive Assessment', status: 'active' },
        { id: '2', name: 'Leadership Assessment', status: 'active' },
        { id: '3', name: 'Emotional Intelligence Test', status: 'active' }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const addCandidate = async (name: string, email: string, testName: string, testId?: string) => {
    try {
      if (!session) {
        throw new Error('No active session');
      }
      
      // Get user's company_id
      const { data: company } = await supabase
        .from('Company')
        .select('id')
        .eq('user_id', session.user.id)
        .single();
      
      if (!company) {
        throw new Error('No company found for user');
      }
      
      const candidateData: any = { 
        Name: name,
        Email: email,
        Status: 'pending',
        Company: 'XYZ',
        testName: testName,
        company_id: company.id,
      };
      
      // Add test_id if provided
      if (testId) {
        candidateData.test_id = testId;
      }
      
      const { data, error } = await supabase
        .from('Candidates')
        .insert([candidateData])
        .select('*')
        .single();
      
      if (error) {
        if (process.env.NODE_ENV === 'development') {
          console.log('Error adding candidate, using fallback:', error);
        }
        
        // Use local storage as fallback for development/demo
        const mockCandidate: Candidate = {
          id: Date.now().toString(),
          name: name,
          email: email,
          status: 'pending',
          testName: testName,
          testId: testId,
        };
        
        try {
          const existingCandidatesStr = localStorage.getItem('mock_candidates') || '[]';
          const existingCandidates = JSON.parse(existingCandidatesStr);
          const mockRawCandidate = {
            id: Date.now(),
            Name: name,
            Email: email,
            Status: 'pending',
            testName: testName,
            test_id: testId,
            Company: 'XYZ',
            created_at: new Date().toISOString()
          };
          existingCandidates.push(mockRawCandidate);
          localStorage.setItem('mock_candidates', JSON.stringify(existingCandidates));
        } catch (storageError) {
          if (process.env.NODE_ENV === 'development') {
            console.error('Error saving to localStorage:', storageError);
          }
        }
        
        setCandidates(prev => [mockCandidate, ...prev]);
        return mockCandidate;
      }
      
      // Create a new candidate object to add to the UI
      const newCandidate: Candidate = {
        id: data.id.toString(),
        name: data.Name,
        email: data.Email,
        status: 'pending',
        testName: testName,
        testId: data.test_id,
      };
      
      setCandidates(prev => [newCandidate, ...prev]);
      return newCandidate;
    } catch (error) {
      console.error('Error adding candidate:', error);
      toast.error('Failed to add candidate');
      
      // Create a fallback candidate for the UI
      const fallbackCandidate: Candidate = {
        id: Date.now().toString(),
        name: name,
        email: email,
        status: 'pending',
        testName: testName,
        testId: testId,
      };
      
      // Still update the UI optimistically
      setCandidates(prev => [fallbackCandidate, ...prev]);
      
      // Also store in localStorage for persistence
      try {
        const existingCandidatesStr = localStorage.getItem('mock_candidates') || '[]';
        const existingCandidates = JSON.parse(existingCandidatesStr);
        const mockRawCandidate = {
          id: Date.now(),
          Name: name,
          Email: email,
          Status: 'pending',
          testName: testName,
          test_id: testId,
          Company: 'XYZ',
          created_at: new Date().toISOString()
        };
        existingCandidates.push(mockRawCandidate);
        localStorage.setItem('mock_candidates', JSON.stringify(existingCandidates));
      } catch (storageError) {
        console.error('Error saving to localStorage:', storageError);
      }
      
      return fallbackCandidate;
    }
  };

  useEffect(() => {
    fetchCandidates();
    fetchTests();
  }, [session]);

  return {
    candidates,
    tests,
    isLoading,
    error,
    fetchCandidates,
    addCandidate
  };
};
