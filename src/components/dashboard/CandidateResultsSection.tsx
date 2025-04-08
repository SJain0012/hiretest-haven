
import React from 'react';
import { Candidate } from '@/types/candidate';
import PersonalityChart from '@/components/results/PersonalityChart';
import CandidateInsights from '@/components/results/CandidateInsights';

// Define the PersonalityTrait interface to match what PersonalityChart expects
interface PersonalityTrait {
  trait: string;
  score: number;
  description: string;
}

interface CandidateResultsSectionProps {
  selectedCandidate: Candidate | null;
  mockTraits: PersonalityTrait[];
  mockInsights: Array<{ type: 'finding' | 'question'; text: string }>;
}

const CandidateResultsSection: React.FC<CandidateResultsSectionProps> = ({
  selectedCandidate,
  mockTraits,
  mockInsights
}) => {
  if (!selectedCandidate) return null;
  
  return (
    <div className="my-8 animate-fade-in">
      <h2 className="text-2xl font-bold mb-4">Candidate Results</h2>
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="lg:w-3/5">
          <PersonalityChart 
            data={mockTraits} 
            candidateName={selectedCandidate.name} 
          />
        </div>
        <div className="lg:w-2/5">
          <CandidateInsights
            candidateName={selectedCandidate.name}
            insights={mockInsights}
          />
        </div>
      </div>
    </div>
  );
};

export default CandidateResultsSection;
