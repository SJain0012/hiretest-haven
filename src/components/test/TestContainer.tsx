
import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import TestIntro from '@/components/test/TestIntro';
import QuestionForm from '@/components/test/QuestionForm';
import TestCompletion from '@/components/test/TestCompletion';
import { useTestData } from '@/hooks/useTestData';
import { useTestSubmission } from '@/hooks/useTestSubmission';
import { useCandidateInfo } from '@/hooks/useCandidateInfo';

const TestContainer: React.FC = () => {
  const { testId } = useParams<{ testId: string }>();
  const location = useLocation();
  const [candidateId, setCandidateId] = useState<string | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  
  // Extract candidate ID from URL if present
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const cid = params.get('cid');
    if (cid) {
      setCandidateId(cid);
    }
  }, [location]);
  
  // Fetch test data
  const { isLoading, test, questions } = useTestData(testId);
  
  // Test submission logic
  const {
    candidateName,
    setCandidateName,
    candidateEmail,
    setCandidateEmail,
    isStarted,
    isSubmitted,
    handleStartTest,
    handleSubmitTest
  } = useTestSubmission({
    candidateId,
    testId,
    testName: test?.name || 'Personality Assessment'
  });
  
  // Fetch candidate info if candidateId is available
  useCandidateInfo(candidateId, setCandidateName, setCandidateEmail);
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-xl font-medium mb-2">Loading Test...</div>
          <div className="text-muted-foreground">Please wait while we prepare your assessment.</div>
        </div>
      </div>
    );
  }
  
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
        testName={test?.name || 'Personality Assessment'}
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
      onSubmit={() => handleSubmitTest(answers)}
    />
  );
};

export default TestContainer;
