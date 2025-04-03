
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Candidate } from '@/types/candidate';
import { useAuth } from './useAuth';
import { toast } from 'sonner';

// Define a type for tests to match our usage
export interface Test {
  id: string;
  name: string;
  status: "active" | "draft" | "archived";
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
      if (!session) {
        throw new Error('No active session');
      }
      
      const { data, error } = await supabase
        .from('Candidates')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      
      // Map Supabase data to match our Candidate type
      const mappedCandidates = data.map(candidate => ({
        id: candidate.id.toString(),
        name: candidate.Name || '',
        email: candidate.Email || '',
        status: (candidate.Status?.toLowerCase() || 'pending') as 'pending' | 'completed' | 'expired',
        testName: candidate.testName || 'General Assessment',
        completedDate: candidate.Completed_On || undefined,
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
        .eq('status', 'active');
      
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
    }
  };

  const addCandidate = async (name: string, email: string, testName: string) => {
    try {
      if (!session) {
        throw new Error('No active session');
      }
      
      const { data, error } = await supabase
        .from('Candidates')
        .insert([
          { 
            Name: name,
            Email: email,
            Status: 'pending',
            Company: 'XYZ', // Using XYZ as requested
            testName: testName
          }
        ])
        .select('*')
        .single();
      
      if (error) throw error;
      
      // Create a new candidate object to add to the UI
      const newCandidate: Candidate = {
        id: data.id.toString(),
        name: data.Name,
        email: data.Email,
        status: 'pending',
        testName: testName,
      };
      
      setCandidates(prev => [newCandidate, ...prev]);
      return newCandidate;
    } catch (error) {
      console.error('Error adding candidate:', error);
      toast.error('Failed to add candidate');
      throw error;
    }
  };

  useEffect(() => {
    if (session) {
      fetchCandidates();
      fetchTests();
    }
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
