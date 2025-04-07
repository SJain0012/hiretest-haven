
import React from 'react';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

interface ScaleQuestionProps {
  questionId: string;
  scaleMin: number;
  scaleMax: number;
  scaleLabels?: {
    min: string;
    max: string;
  };
  currentAnswer: number | null;
  onAnswerChange: (value: number) => void;
}

const ScaleQuestion: React.FC<ScaleQuestionProps> = ({
  questionId,
  scaleMin,
  scaleMax,
  scaleLabels,
  currentAnswer,
  onAnswerChange,
}) => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between text-sm text-muted-foreground">
        <span>{scaleLabels?.min}</span>
        <span>{scaleLabels?.max}</span>
      </div>
      <RadioGroup
        value={currentAnswer?.toString() || ''}
        onValueChange={(value) => onAnswerChange(Number(value))}
        className="flex justify-between"
      >
        {Array.from(
          { length: (scaleMax || 5) - (scaleMin || 1) + 1 },
          (_, i) => (scaleMin || 1) + i
        ).map((value) => (
          <div key={value} className="flex flex-col items-center gap-2">
            <RadioGroupItem
              id={`${questionId}-scale-${value}`}
              value={value.toString()}
              className="peer hidden"
            />
            <Label
              htmlFor={`${questionId}-scale-${value}`}
              className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-input bg-background text-sm transition-colors hover:bg-secondary peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary peer-data-[state=checked]:text-primary-foreground"
            >
              {value}
            </Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};

export default ScaleQuestion;
