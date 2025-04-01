
import React from 'react';
import { Link } from 'react-router-dom';
import { TableCell, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { CollapsibleContent } from '@/components/ui/collapsible';
import CandidateRowActions from './CandidateRowActions';
import CandidateResultPreview from './CandidateResultPreview';
import { Candidate, statusColorMap } from '@/types/candidate';

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
          <div className="flex items-center gap-3">
            <Avatar className="h-8 w-8">
              <AvatarImage alt={candidate.name} />
              <AvatarFallback className="text-xs">
                {candidate.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <Link to={`/candidates/${candidate.id}`} className="font-medium hover:underline">
                {candidate.name}
              </Link>
              <span className="text-xs text-muted-foreground">{candidate.email}</span>
            </div>
          </div>
        </TableCell>
        <TableCell>{candidate.testName}</TableCell>
        <TableCell>
          <Badge variant="outline" className={statusColorMap[candidate.status]}>
            {candidate.status.charAt(0).toUpperCase() + candidate.status.slice(1)}
          </Badge>
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
      {expandedCandidateId === candidate.id && candidate.status === 'completed' && (
        <TableRow>
          <TableCell colSpan={5} className="p-0">
            <CollapsibleContent>
              <CandidateResultPreview
                candidate={candidate}
                onShareClick={handleShareClick}
              />
            </CollapsibleContent>
          </TableCell>
        </TableRow>
      )}
    </React.Fragment>
  );
};

export default CandidateRow;
