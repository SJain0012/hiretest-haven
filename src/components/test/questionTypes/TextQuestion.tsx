
import React from 'react';
import { Textarea } from '@/components/ui/textarea';

interface TextQuestionProps {
  currentAnswer: string;
  onAnswerChange: (value: string) => void;
}

const TextQuestion: React.FC<TextQuestionProps> = ({
  currentAnswer,
  onAnswerChange,
}) => {
  return (
    <Textarea
      value={currentAnswer || ''}
      onChange={(e) => onAnswerChange(e.target.value)}
      placeholder="Type your answer here..."
      className="h-32"
    />
  );
};

export default TextQuestion;
