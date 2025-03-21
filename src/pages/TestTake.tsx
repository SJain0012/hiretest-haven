
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { mockTestQuestions } from '@/data/mockData';
import TestIntro from '@/components/test/TestIntro';
import QuestionForm from '@/components/test/QuestionForm';
import TestCompletion from '@/components/test/TestCompletion';

const TestTake = () => {
  const { testId } = useParams<{ testId: string }>();
  const { toast } = useToast();
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [candidateName, setCandidateName] = useState('');
  const [candidateEmail, setCandidateEmail] = useState('');
  const [isStarted, setIsStarted] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const questions = mockTestQuestions;
  
  const handleStartTest = () => {
    setIsStarted(true);
  };
  
  const handleSubmit = () => {
    // In a real app, we would submit the test results here
    console.log({
      testId,
      candidateName,
      candidateEmail,
      answers,
    });
    
    setIsSubmitted(true);
    
    toast({
      title: "Test Submitted",
      description: "Thank you for completing the personality assessment.",
    });
  };
  
  if (isSubmitted) {
    return <TestCompletion />;
  }
  
  if (!isStarted) {
    return (
      <TestIntro
        candidateName={candidateName}
        setCandidateName={setCandidateName}
        candidateEmail={candidateEmail}
        setCandidateEmail={setCandidateEmail}
        onStartTest={handleStartTest}
      />
    );
  }
  
  return (
    <QuestionForm
      questions={questions}
      currentQuestionIndex={currentQuestionIndex}
      setCurrentQuestionIndex={setCurrentQuestionIndex}
      answers={answers}
      setAnswers={setAnswers}
      onSubmit={handleSubmit}
    />
  );
};

export default TestTake;
