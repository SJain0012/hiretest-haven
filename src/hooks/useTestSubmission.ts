
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { useToast } from '@/hooks/use-toast';

interface TestSubmissionProps {
  candidateId: string | null;
  testId: string | undefined;
  testName: string;
}

export interface CandidateInfo {
  candidateName: string;
  setCandidateName: (name: string) => void;
  candidateEmail: string;
  setCandidateEmail: (email: string) => void;
}

export const useTestSubmission = ({ candidateId, testId, testName }: TestSubmissionProps) => {
  const { toast: uiToast } = useToast();
  
  const [candidateName, setCandidateName] = useState('');
  const [candidateEmail, setCandidateEmail] = useState('');
  const [isStarted, setIsStarted] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const updateCandidateInfo = async () => {
    if (!candidateId) return;
    
    try {
      await supabase
        .from('Candidates')
        .update({
          Name: candidateName,
          Email: candidateEmail,
          Status: 'in-progress',
        })
        .eq('id', parseInt(candidateId, 10));
    } catch (error) {
      console.error('Error updating candidate:', error);
    }
  };
  
  const createCandidateRecord = async () => {
    if (!testId) return;
    
    try {
      const { data, error } = await supabase
        .from('Candidates')
        .insert([{
          Name: candidateName,
          Email: candidateEmail,
          Status: 'in-progress',
          testName: testName,
          test_id: testId,
        }])
        .select()
        .single();
        
      if (error) throw error;
      
      if (data) {
        return data.id.toString();
      }
      return null;
    } catch (error) {
      console.error('Error creating candidate:', error);
      return null;
    }
  };
  
  const handleStartTest = async () => {
    if (!candidateName || !candidateEmail) {
      uiToast({
        title: "Missing Information",
        description: "Please provide your name and email to start the test.",
        variant: "destructive",
      });
      return;
    }
    
    if (candidateId) {
      await updateCandidateInfo();
    } else {
      await createCandidateRecord();
    }
    
    setIsStarted(true);
  };
  
  const handleSubmitTest = async (answers: Record<string, any>) => {
    if (!candidateId) return;
    
    const results = {
      answers: answers,
      completionDate: new Date().toISOString(),
      traits: [
        { trait: "Openness", score: Math.floor(Math.random() * 100) },
        { trait: "Conscientiousness", score: Math.floor(Math.random() * 100) },
        { trait: "Extraversion", score: Math.floor(Math.random() * 100) },
        { trait: "Agreeableness", score: Math.floor(Math.random() * 100) },
        { trait: "Neuroticism", score: Math.floor(Math.random() * 100) },
      ]
    };
    
    try {
      await supabase
        .from('Candidates')
        .update({
          Status: 'completed',
          Completed_On: new Date().toISOString(),
          results: results
        })
        .eq('id', parseInt(candidateId, 10));
        
      toast.success('Test submitted successfully!');
      setIsSubmitted(true);
      
      uiToast({
        title: "Test Submitted",
        description: "Thank you for completing the personality assessment.",
      });
    } catch (error) {
      console.error('Error saving results:', error);
      toast.error('Failed to save results');
    }
  };
  
  return {
    candidateName,
    setCandidateName,
    candidateEmail,
    setCandidateEmail,
    isStarted,
    isSubmitted,
    handleStartTest,
    handleSubmitTest
  };
};
