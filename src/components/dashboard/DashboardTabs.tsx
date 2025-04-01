
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import TestsTabContent from '@/components/dashboard/tabs/TestsTabContent';
import CandidatesTabContent from '@/components/dashboard/tabs/CandidatesTabContent';
import { Candidate } from '@/types/candidate';

// Modify the Test interface to match the expected properties from Dashboard.tsx
export interface DashboardTest {
  id: string;
  name: string;
  status: "active" | "draft" | "archived";
  createdAt: string;
  candidatesCount: number;
  completionRate: number;
}

interface DashboardTabsProps {
  tests: DashboardTest[];
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
        <TestsTabContent tests={tests} />
      </TabsContent>
      <TabsContent value="candidates" className="mt-4">
        <CandidatesTabContent 
          candidates={candidates} 
          onCandidateSelect={onCandidateSelect}
          selectedCandidateId={selectedCandidate?.id}
        />
      </TabsContent>
    </Tabs>
  );
};

export default DashboardTabs;
