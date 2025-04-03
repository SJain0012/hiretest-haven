
import React from 'react';
import { TableCell, TableRow } from '@/components/ui/table';
import { Candidate } from '@/types/candidate';
import CandidateProfile from './CandidateProfile';
import CandidateStatus from './CandidateStatus';
import CandidateRowActions from './CandidateRowActions';
import CandidateExpandedRow from './CandidateExpandedRow';

interface CandidateRowProps {
  candidate: Candidate;
  expandedCandidateId: string | null;
  selectedCandidateId?: string;
  onCandidateSelect?: (candidate: Candidate) => void;
  toggleCandidateExpand: (e: React.MouseEvent, candidateId: string) => void;
  handleShareClick: (e: React.MouseEvent, candidate: Candidate) => void;
}

const CandidateRow: React.FC<CandidateRowProps> = ({
  candidate,
  expandedCandidateId,
  selectedCandidateId,
  onCandidateSelect,
  toggleCandidateExpand,
  handleShareClick
}) => {
  const isExpanded = expandedCandidateId === candidate.id;
  
  return (
    <React.Fragment>
      <TableRow 
        className={`transition-colors hover:bg-muted/50 ${
          selectedCandidateId === candidate.id ? 'bg-blue-50 dark:bg-blue-900/20' : ''
        }`}
        onClick={() => onCandidateSelect && onCandidateSelect(candidate)}
        style={{ cursor: onCandidateSelect ? 'pointer' : 'default' }}
      >
        <TableCell>
          <CandidateProfile 
            name={candidate.name}
            email={candidate.email}
            id={candidate.id}
          />
        </TableCell>
        <TableCell>{candidate.testName}</TableCell>
        <TableCell>
          <CandidateStatus status={candidate.status} />
        </TableCell>
        <TableCell className="text-muted-foreground">
          {candidate.completedDate 
            ? new Date(candidate.completedDate).toLocaleDateString() 
            : '-'}
        </TableCell>
        <TableCell className="text-right">
          <CandidateRowActions
            candidate={candidate}
            expandedCandidateId={expandedCandidateId}
            onCandidateSelect={onCandidateSelect}
            toggleCandidateExpand={toggleCandidateExpand}
            handleShareClick={handleShareClick}
          />
        </TableCell>
      </TableRow>
      
      <CandidateExpandedRow 
        isExpanded={isExpanded}
        candidate={candidate}
        onShareClick={handleShareClick}
      />
    </React.Fragment>
  );
};

export default CandidateRow;
