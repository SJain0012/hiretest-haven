
import React, { useState } from 'react';
import { Mail, PieChart, Share2 } from 'lucide-react';
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { toast } from 'sonner';
import { Candidate } from '@/types/candidate';
import CandidateRow from '@/components/candidates/CandidateRow';
import ShareResultsDialog from '@/components/candidates/ShareResultsDialog';

interface CandidatesTableProps {
  candidates: Candidate[];
  onCandidateSelect?: (candidate: Candidate) => void;
  selectedCandidateId?: string;
}

const CandidatesTable: React.FC<CandidatesTableProps> = ({ 
  candidates, 
  onCandidateSelect,
  selectedCandidateId 
}) => {
  const [expandedCandidateId, setExpandedCandidateId] = useState<string | null>(null);
  const [shareDialogOpen, setShareDialogOpen] = useState(false);
  const [currentCandidate, setCurrentCandidate] = useState<Candidate | null>(null);
  const [shareNote, setShareNote] = useState('');

  const handleShareClick = (e: React.MouseEvent, candidate: Candidate) => {
    e.stopPropagation();
    setCurrentCandidate(candidate);
    setShareDialogOpen(true);
    setShareNote(`I'd like to share the assessment results for ${candidate.name}. They scored well on the ${candidate.testName} assessment.`);
  };

  const handleSendShare = () => {
    toast.success('Results shared successfully with the hiring manager!');
    setShareDialogOpen(false);
    setShareNote('');
  };

  const toggleCandidateExpand = (e: React.MouseEvent, candidateId: string) => {
    e.stopPropagation();
    setExpandedCandidateId(expandedCandidateId === candidateId ? null : candidateId);
  };

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Candidate</TableHead>
              <TableHead>Test</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Completed</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {candidates.map((candidate) => (
              <CandidateRow
                key={candidate.id}
                candidate={candidate}
                expandedCandidateId={expandedCandidateId}
                selectedCandidateId={selectedCandidateId}
                onCandidateSelect={onCandidateSelect}
                toggleCandidateExpand={toggleCandidateExpand}
                handleShareClick={handleShareClick}
              />
            ))}
          </TableBody>
        </Table>
      </div>

      <ShareResultsDialog
        open={shareDialogOpen}
        onOpenChange={setShareDialogOpen}
        candidate={currentCandidate}
        shareNote={shareNote}
        setShareNote={setShareNote}
        onSendShare={handleSendShare}
      />
    </>
  );
};

export default CandidatesTable;
