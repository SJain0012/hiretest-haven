
import React from 'react';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

interface MultipleChoiceQuestionProps {
  questionId: string;
  options: string[];
  currentAnswer: string;
  onAnswerChange: (value: string) => void;
}

const MultipleChoiceQuestion: React.FC<MultipleChoiceQuestionProps> = ({
  questionId,
  options,
  currentAnswer,
  onAnswerChange,
}) => {
  return (
    <RadioGroup
      value={currentAnswer || ''}
      onValueChange={onAnswerChange}
      className="space-y-3"
    >
      {options.map((option, index) => (
        <div key={index} className="flex items-center space-x-2">
          <RadioGroupItem id={`${questionId}-option-${index}`} value={option} />
          <Label htmlFor={`${questionId}-option-${index}`} className="cursor-pointer">
            {option}
          </Label>
        </div>
      ))}
    </RadioGroup>
  );
};

export default MultipleChoiceQuestion;
