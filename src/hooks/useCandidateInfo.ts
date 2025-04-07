
import { useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export const useCandidateInfo = (
  candidateId: string | null,
  setCandidateName: (name: string) => void,
  setCandidateEmail: (email: string) => void
) => {
  useEffect(() => {
    if (candidateId) {
      fetchCandidateInfo(candidateId);
    }
  }, [candidateId]);
  
  const fetchCandidateInfo = async (candidateId: string) => {
    try {
      const { data, error } = await supabase
        .from('Candidates')
        .select('*')
        .eq('id', parseInt(candidateId, 10))
        .single();
        
      if (error) throw error;
      
      if (data) {
        setCandidateName(data.Name || '');
        setCandidateEmail(data.Email || '');
      }
    } catch (error) {
      console.error('Error fetching candidate:', error);
    }
  };
};
