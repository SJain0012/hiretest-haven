
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PieChart, User, Mail, CheckCircle } from 'lucide-react';

interface DashboardCardsProps {
  testsCount: number;
  activeTestsCount: number;
  candidatesCount: number;
  completedTestsCount: number;
  completionRate: number;
}

const DashboardCards = ({
  testsCount,
  activeTestsCount,
  candidatesCount,
  completedTestsCount,
  completionRate,
}: DashboardCardsProps) => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mt-6">
      <Card className="card-hover">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">
            Total Tests
          </CardTitle>
          <PieChart className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{testsCount}</div>
          <p className="text-xs text-muted-foreground mt-1">
            {activeTestsCount} active
          </p>
        </CardContent>
      </Card>
      
      <Card className="card-hover">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">
            Total Candidates
          </CardTitle>
          <User className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{candidatesCount}</div>
          <p className="text-xs text-muted-foreground mt-1">
            {completedTestsCount} completed tests
          </p>
        </CardContent>
      </Card>
      
      <Card className="card-hover">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">
            Pending Invitations
          </CardTitle>
          <Mail className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {candidatesCount - completedTestsCount}
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Awaiting responses
          </p>
        </CardContent>
      </Card>
      
      <Card className="card-hover">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">
            Completion Rate
          </CardTitle>
          <CheckCircle className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {completionRate}%
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Average across all tests
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardCards;
