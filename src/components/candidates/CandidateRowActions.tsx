
import React from 'react';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { MoreHorizontal, Mail, Share2, Eye, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Candidate } from '@/types/candidate';

interface CandidateRowActionsProps {
  candidate: Candidate;
  handleShareClick: (e: React.MouseEvent, candidate: Candidate) => void;
}

const CandidateRowActions: React.FC<CandidateRowActionsProps> = ({ 
  candidate,
  handleShareClick
}) => {
  let testLinkUrl = '';
  
  // Check if we have a testId, use that to generate the test link
  if (candidate.testId) {
    testLinkUrl = `/take-test/${candidate.testId}?cid=${candidate.id}`;
  } else {
    // Fallback - we could use a mock test ID as fallback
    testLinkUrl = `/take-test/mock1?cid=${candidate.id}`;
  }
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <MoreHorizontal className="h-4 w-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        <DropdownMenuItem>
          <Mail className="mr-2 h-4 w-4" />
          <span>Resend</span>
        </DropdownMenuItem>
        
        <DropdownMenuItem 
          onClick={(e) => handleShareClick(e, candidate)}
          disabled={candidate.status !== 'completed'}
        >
          <Share2 className="mr-2 h-4 w-4" />
          <span>Share</span>
        </DropdownMenuItem>
        
        <DropdownMenuSeparator />
        
        {candidate.status === 'completed' ? (
          <DropdownMenuItem asChild>
            <Link to={`/candidates/${candidate.id}`}>
              <Eye className="mr-2 h-4 w-4" />
              <span>View Results</span>
            </Link>
          </DropdownMenuItem>
        ) : (
          <DropdownMenuItem 
            onClick={() => {
              navigator.clipboard.writeText(window.location.origin + testLinkUrl);
              // Show toast notification
              const toast = document.createElement('div');
              toast.innerText = 'Test link copied to clipboard';
              toast.className = 'fixed top-4 right-4 bg-black text-white p-2 rounded shadow-lg z-50';
              document.body.appendChild(toast);
              setTimeout(() => document.body.removeChild(toast), 2000);
            }}
          >
            <Eye className="mr-2 h-4 w-4" />
            <span>Copy Test Link</span>
          </DropdownMenuItem>
        )}
        
        <DropdownMenuItem className="text-destructive">
          <Trash2 className="mr-2 h-4 w-4" />
          <span>Delete</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CandidateRowActions;
