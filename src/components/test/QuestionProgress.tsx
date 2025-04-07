
import React from 'react';
import { Progress } from '@/components/ui/progress';

interface QuestionProgressProps {
  currentQuestionIndex: number;
  totalQuestions: number;
  answeredCount: number;
}

const QuestionProgress: React.FC<QuestionProgressProps> = ({
  currentQuestionIndex,
  totalQuestions,
  answeredCount,
}) => {
  const progressPercentage = (answeredCount / totalQuestions) * 100;

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <div className="text-sm text-muted-foreground">
          Question {currentQuestionIndex + 1} of {totalQuestions}
        </div>
        <div className="text-sm text-muted-foreground">
          {answeredCount} of {totalQuestions} answered
        </div>
      </div>
      <Progress value={progressPercentage} className="h-2" />
    </div>
  );
};

export default QuestionProgress;
