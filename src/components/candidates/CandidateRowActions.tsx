
import React from 'react';
import { Button } from '@/components/ui/button';
import { Eye, MoreHorizontal, Mail, PieChart, Share2 } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Collapsible, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Candidate } from '@/types/candidate';

interface CandidateRowActionsProps {
  candidate: Candidate;
  expandedCandidateId: string | null;
  onCandidateSelect?: (candidate: Candidate) => void;
  toggleCandidateExpand: (e: React.MouseEvent, candidateId: string) => void;
  handleShareClick: (e: React.MouseEvent, candidate: Candidate) => void;
}

const CandidateRowActions: React.FC<CandidateRowActionsProps> = ({
  candidate,
  expandedCandidateId,
  onCandidateSelect,
  toggleCandidateExpand,
  handleShareClick
}) => {
  return (
    <div className="flex justify-end gap-2">
      {candidate.status === 'completed' && (
        <>
          <Button 
            variant="ghost" 
            size="icon"
            onClick={(e) => {
              e.stopPropagation();
              onCandidateSelect && onCandidateSelect(candidate);
            }}
          >
            <PieChart className="h-4 w-4" />
            <span className="sr-only">Results</span>
          </Button>
          <Button 
            variant="ghost" 
            size="icon"
            onClick={(e) => handleShareClick(e, candidate)}
          >
            <Share2 className="h-4 w-4" />
            <span className="sr-only">Share</span>
          </Button>
          <Collapsible>
            <CollapsibleTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={(e) => toggleCandidateExpand(e, candidate.id)}
                className={expandedCandidateId === candidate.id ? "bg-blue-100" : ""}
              >
                <Eye className="h-4 w-4" />
                <span className="sr-only">View</span>
              </Button>
            </CollapsibleTrigger>
          </Collapsible>
        </>
      )}
      {candidate.status === 'pending' && (
        <Button variant="ghost" size="icon" onClick={(e) => e.stopPropagation()}>
          <Mail className="h-4 w-4" />
          <span className="sr-only">Resend</span>
        </Button>
      )}
      <DropdownMenu>
        <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
          <Button variant="ghost" size="icon">
            <MoreHorizontal className="h-4 w-4" />
            <span className="sr-only">More</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem>View Profile</DropdownMenuItem>
          <DropdownMenuItem>Edit</DropdownMenuItem>
          <DropdownMenuItem className="text-destructive">Remove</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default CandidateRowActions;
