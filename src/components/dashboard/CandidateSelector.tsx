
import { useEffect, useState } from 'react';
import { Candidate } from '@/types/candidate';
import { mockTraits, mockInsights } from '@/data/mockData';

export const useCandidateSelector = (candidateIdFromUrl: string | null, supabaseCandidates: Candidate[]) => {
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);

  // Effect for handling the candidateId from URL
  useEffect(() => {
    if (candidateIdFromUrl && supabaseCandidates.length > 0) {
      const candidate = supabaseCandidates.find(c => c.id === candidateIdFromUrl);
      if (candidate) {
        console.log('Setting selected candidate from URL param:', candidate);
        setSelectedCandidate(candidate);
        
        // Add sample results if not present
        if (!candidate.results) {
          const candidateWithResults = {
            ...candidate,
            status: 'completed' as const,
            completedDate: new Date().toISOString(),
            results: {
              traits: mockTraits,
              insights: mockInsights
            }
          };
          setSelectedCandidate(candidateWithResults);
        }
      }
    } else if (supabaseCandidates.length > 0) {
      // Default behavior when no candidateId in URL
      const completedCandidate = supabaseCandidates.find(c => c.status === 'completed' && c.results);
      if (completedCandidate) {
        console.log('Setting selected candidate with results:', completedCandidate);
        setSelectedCandidate(completedCandidate);
      } else {
        // If no completed candidate, select first one but add sample results
        const firstCandidate = supabaseCandidates[0];
        const candidateWithResults = {
          ...firstCandidate,
          status: 'completed' as const,
          completedDate: new Date().toISOString(),
          results: {
            traits: mockTraits,
            insights: mockInsights
          }
        };
        setSelectedCandidate(candidateWithResults);
      }
    }
  }, [candidateIdFromUrl, supabaseCandidates]);

  return {
    selectedCandidate,
    setSelectedCandidate
  };
};

export default useCandidateSelector;
