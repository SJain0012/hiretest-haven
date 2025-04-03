
import React from 'react';
import { TableCell, TableRow } from '@/components/ui/table';
import { CollapsibleContent } from '@/components/ui/collapsible';
import CandidateResultPreview from './CandidateResultPreview';
import { Candidate } from '@/types/candidate';

interface CandidateExpandedRowProps {
  isExpanded: boolean;
  candidate: Candidate;
  onShareClick: (e: React.MouseEvent, candidate: Candidate) => void;
}

const CandidateExpandedRow: React.FC<CandidateExpandedRowProps> = ({
  isExpanded,
  candidate,
  onShareClick
}) => {
  if (!isExpanded || candidate.status !== 'completed') {
    return null;
  }

  return (
    <TableRow>
      <TableCell colSpan={5} className="p-0">
        <CollapsibleContent>
          <CandidateResultPreview
            candidate={candidate}
            onShareClick={onShareClick}
          />
        </CollapsibleContent>
      </TableCell>
    </TableRow>
  );
};

export default CandidateExpandedRow;
