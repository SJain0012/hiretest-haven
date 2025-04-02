
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LightbulbIcon, HelpCircleIcon } from 'lucide-react';

interface Insight {
  type: 'finding' | 'question';
  text: string;
}

interface CandidateInsightsProps {
  candidateName: string;
  insights: Insight[];
  compact?: boolean;
}

const CandidateInsights: React.FC<CandidateInsightsProps> = ({ 
  candidateName, 
  insights,
  compact = false
}) => {
  // Filter insights by type
  const findings = insights.filter(insight => insight.type === 'finding');
  const questions = insights.filter(insight => insight.type === 'question');

  if (compact) {
    return (
      <div className="px-4 py-2">
        <h4 className="text-sm font-semibold mb-2">Key Insights</h4>
        <ul className="text-xs space-y-1">
          {insights.slice(0, 3).map((insight, index) => (
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
    );
  }

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">
          Insights for {candidateName}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {findings.length > 0 && (
          <div>
            <h3 className="flex items-center text-md font-medium mb-3">
              <LightbulbIcon className="h-4 w-4 mr-2 text-amber-500" />
              Unique Findings
            </h3>
            <ul className="space-y-2">
              {findings.map((finding, index) => (
                <li key={index} className="pl-5 relative text-sm before:content-['•'] before:absolute before:left-0 before:text-amber-500">
                  {finding.text}
                </li>
              ))}
            </ul>
          </div>
        )}
        
        {questions.length > 0 && (
          <div>
            <h3 className="flex items-center text-md font-medium mb-3">
              <HelpCircleIcon className="h-4 w-4 mr-2 text-blue-500" />
              Suggested Follow-up Questions
            </h3>
            <ul className="space-y-2">
              {questions.map((question, index) => (
                <li key={index} className="pl-5 relative text-sm before:content-['•'] before:absolute before:left-0 before:text-blue-500">
                  {question.text}
                </li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CandidateInsights;
