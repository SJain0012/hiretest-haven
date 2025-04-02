
import React from 'react';
import { Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import PersonalityChart from '@/components/results/PersonalityChart';
import { mockTraits } from '@/data/mockData';
import { Candidate } from '@/types/candidate';
import { LightbulbIcon, HelpCircleIcon } from 'lucide-react';

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
        <div className="md:flex-1">
          <PersonalityChart 
            data={mockTraits} 
            candidateName={candidate.name}
            compact={true}
          />
        </div>
        <div className="md:w-2/5">
          <div className="px-4 py-2">
            <h4 className="text-sm font-semibold mb-2">Key Insights</h4>
            <ul className="text-xs space-y-1">
              {mockInsights.map((insight, index) => (
                <li key={index} className="flex items-start gap-2">
                  {insight.type === 'finding' ? 
                    <LightbulbIcon className="h-3 w-3 text-amber-500 mt-0.5 flex-shrink-0" /> : 
                    <HelpCircleIcon className="h-3 w-3 text-blue-500 mt-0.5 flex-shrink-0" />
                  }
                  <span className="text-muted-foreground">{insight.text}</span>
                </li>
              ))}
            </ul>
          </div>
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
