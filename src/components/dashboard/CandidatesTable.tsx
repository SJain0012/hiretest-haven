
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Eye, MoreHorizontal, Mail, PieChart, Share2 } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import PersonalityChart from '@/components/results/PersonalityChart';
import { mockTraits } from '@/data/mockData';

interface Candidate {
  id: string;
  name: string;
  email: string;
  status: 'pending' | 'completed' | 'expired';
  testName: string;
  completedDate?: string;
}

interface CandidatesTableProps {
  candidates: Candidate[];
  onCandidateSelect?: (candidate: Candidate) => void;
  selectedCandidateId?: string;
}

const statusColorMap = {
  pending: 'bg-amber-100 text-amber-800 hover:bg-amber-200',
  completed: 'bg-green-100 text-green-800 hover:bg-green-200',
  expired: 'bg-gray-100 text-gray-800 hover:bg-gray-200',
};

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
              <React.Fragment key={candidate.id}>
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
                  </TableCell>
                </TableRow>
                {expandedCandidateId === candidate.id && candidate.status === 'completed' && (
                  <TableRow>
                    <TableCell colSpan={5} className="p-0">
                      <CollapsibleContent>
                        <div className="p-4 bg-slate-50 border-t">
                          <h3 className="text-lg font-semibold mb-2">Results Summary for {candidate.name}</h3>
                          <div className="h-64">
                            <PersonalityChart 
                              data={mockTraits} 
                              candidateName={candidate.name}
                              compact={true}
                            />
                          </div>
                          <div className="mt-4 flex justify-end">
                            <Button 
                              onClick={(e) => {
                                e.stopPropagation();
                                handleShareClick(e, candidate);
                              }}
                              className="bg-blue-500 hover:bg-blue-600"
                            >
                              <Share2 className="h-4 w-4 mr-2" />
                              Share with Hiring Manager
                            </Button>
                          </div>
                        </div>
                      </CollapsibleContent>
                    </TableCell>
                  </TableRow>
                )}
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog open={shareDialogOpen} onOpenChange={setShareDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Share Results with Hiring Manager</DialogTitle>
            <DialogDescription>
              Share {currentCandidate?.name}'s assessment results with the hiring manager for the next round.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            {currentCandidate && (
              <div className="rounded-md border p-4 bg-slate-50">
                <h4 className="font-medium mb-2">Result Preview</h4>
                <div className="h-48">
                  <PersonalityChart 
                    data={mockTraits}
                    candidateName={currentCandidate.name}
                    compact={true}
                  />
                </div>
              </div>
            )}
            <Textarea 
              placeholder="Add a note to the hiring manager..."
              value={shareNote}
              onChange={(e) => setShareNote(e.target.value)}
              className="min-h-[100px]"
            />
          </div>
          <DialogFooter className="sm:justify-between">
            <Button variant="outline" onClick={() => setShareDialogOpen(false)}>
              Cancel
            </Button>
            <Button type="button" onClick={handleSendShare}>
              <Share2 className="h-4 w-4 mr-2" />
              Send to Hiring Manager
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CandidatesTable;
