
import React from 'react';
import { Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import PersonalityChart from '@/components/results/PersonalityChart';
import { mockTraits } from '@/data/mockData';
import { Candidate } from '@/types/candidate';
import CandidateInsights from '@/components/results/CandidateInsights';

// Sample insights - in a real app these would come from an API or analysis of the candidate's answers
const mockInsights = [
  {
    type: 'finding' as const,
    text: 'Shows exceptional problem-solving abilities under pressure'
  },
  {
    type: 'finding' as const,
    text: 'Demonstrates strong collaborative tendencies with high agreeableness'
  },
  {
    type: 'question' as const,
    text: 'How do you prioritize competing deadlines?'
  },
  {
    type: 'question' as const,
    text: 'Can you describe a situation where you had to adapt quickly to change?'
  }
];

interface CandidateResultPreviewProps {
  candidate: Candidate;
  onShareClick: (e: React.MouseEvent, candidate: Candidate) => void;
}

const CandidateResultPreview: React.FC<CandidateResultPreviewProps> = ({ 
  candidate, 
  onShareClick 
}) => {
  return (
    <div className="p-4 bg-slate-50 border-t">
      <h3 className="text-lg font-semibold mb-2">Results Summary for {candidate.name}</h3>
      <div className="flex flex-col md:flex-row gap-4">
        <div className="h-64 md:flex-1">
          <PersonalityChart 
            data={mockTraits} 
            candidateName={candidate.name}
            compact={true}
          />
        </div>
        <div className="md:w-2/5">
          <CandidateInsights
            candidateName={candidate.name}
            insights={mockInsights}
            compact={true}
          />
        </div>
      </div>
      <div className="mt-4 flex justify-end">
        <Button 
          onClick={(e) => onShareClick(e, candidate)}
          className="bg-blue-500 hover:bg-blue-600"
        >
          <Share2 className="h-4 w-4 mr-2" />
          Share with Hiring Manager
        </Button>
      </div>
    </div>
  );
};

export default CandidateResultPreview;
