
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Mail, Eye, MoreHorizontal, User } from 'lucide-react';
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

interface Test {
  id: string;
  name: string;
  status: 'active' | 'draft' | 'archived';
  createdAt: string;
  candidatesCount: number;
  completionRate: number;
}

interface TestsTableProps {
  tests: Test[];
}

const statusColorMap = {
  active: 'bg-green-100 text-green-800 hover:bg-green-200',
  draft: 'bg-amber-100 text-amber-800 hover:bg-amber-200',
  archived: 'bg-gray-100 text-gray-800 hover:bg-gray-200',
};

const TestsTable: React.FC<TestsTableProps> = ({ tests }) => {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Created</TableHead>
            <TableHead>Candidates</TableHead>
            <TableHead>Completion Rate</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tests.map((test) => (
            <TableRow key={test.id} className="transition-colors hover:bg-muted/50">
              <TableCell className="font-medium">
                <Link to={`/tests/${test.id}`} className="hover:underline">
                  {test.name}
                </Link>
              </TableCell>
              <TableCell>
                <Badge variant="outline" className={statusColorMap[test.status]}>
                  {test.status.charAt(0).toUpperCase() + test.status.slice(1)}
                </Badge>
              </TableCell>
              <TableCell className="text-muted-foreground">
                {new Date(test.createdAt).toLocaleDateString()}
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span>{test.candidatesCount}</span>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-full max-w-24 rounded-full bg-muted">
                    <div
                      className="h-full rounded-full bg-primary"
                      style={{ width: `${test.completionRate}%` }}
                    />
                  </div>
                  <span className="text-sm">{test.completionRate}%</span>
                </div>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Link to={`/tests/${test.id}`}>
                    <Button variant="ghost" size="icon">
                      <Eye className="h-4 w-4" />
                      <span className="sr-only">View</span>
                    </Button>
                  </Link>
                  <Link to={`/tests/${test.id}/invite`}>
                    <Button variant="ghost" size="icon">
                      <Mail className="h-4 w-4" />
                      <span className="sr-only">Invite</span>
                    </Button>
                  </Link>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">More</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>Edit</DropdownMenuItem>
                      <DropdownMenuItem>Duplicate</DropdownMenuItem>
                      <DropdownMenuItem>Archive</DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
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

export default TestsTable;
