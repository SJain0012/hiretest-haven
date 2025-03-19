
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Eye, MoreHorizontal, Mail, PieChart } from 'lucide-react';
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
}

const statusColorMap = {
  pending: 'bg-amber-100 text-amber-800 hover:bg-amber-200',
  completed: 'bg-green-100 text-green-800 hover:bg-green-200',
  expired: 'bg-gray-100 text-gray-800 hover:bg-gray-200',
};

const CandidatesTable: React.FC<CandidatesTableProps> = ({ candidates }) => {
  return (
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
            <TableRow key={candidate.id} className="transition-colors hover:bg-muted/50">
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
                    <Link to={`/candidates/${candidate.id}/results`}>
                      <Button variant="ghost" size="icon">
                        <PieChart className="h-4 w-4" />
                        <span className="sr-only">Results</span>
                      </Button>
                    </Link>
                  )}
                  <Link to={`/candidates/${candidate.id}`}>
                    <Button variant="ghost" size="icon">
                      <Eye className="h-4 w-4" />
                      <span className="sr-only">View</span>
                    </Button>
                  </Link>
                  {candidate.status === 'pending' && (
                    <Button variant="ghost" size="icon">
                      <Mail className="h-4 w-4" />
                      <span className="sr-only">Resend</span>
                    </Button>
                  )}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
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
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default CandidatesTable;
