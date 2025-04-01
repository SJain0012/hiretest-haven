
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import TestsTable from '@/components/dashboard/TestsTable';
import CandidatesTable from '@/components/dashboard/CandidatesTable';

interface Test {
  id: string;
  name: string;
  status: "active" | "draft" | "archived";
  questions: number;
  candidates: number;
  created: string;
}

interface Candidate {
  id: string;
  name: string;
  email: string;
  status: "pending" | "completed" | "expired";
  testName: string;
  completedDate?: string;
}

interface DashboardTabsProps {
  tests: Test[];
  candidates: Candidate[];
  selectedCandidate: Candidate | null;
  onCandidateSelect: (candidate: Candidate) => void;
}

const DashboardTabs = ({
  tests,
  candidates,
  selectedCandidate,
  onCandidateSelect,
}: DashboardTabsProps) => {
  return (
    <Tabs defaultValue="tests" className="mt-8 animate-fade-in">
      <TabsList>
        <TabsTrigger value="tests">Tests</TabsTrigger>
        <TabsTrigger value="candidates">Candidates</TabsTrigger>
      </TabsList>
      <TabsContent value="tests" className="mt-4">
        <TestsTable tests={tests} />
      </TabsContent>
      <TabsContent value="candidates" className="mt-4">
        <CandidatesTable 
          candidates={candidates} 
          onCandidateSelect={onCandidateSelect}
          selectedCandidateId={selectedCandidate?.id}
        />
      </TabsContent>
    </Tabs>
  );
};

export default DashboardTabs;
