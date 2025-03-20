
import React from 'react';
import { Button } from '@/components/ui/button';
import { PlusCircle, Filter, CreditCard } from 'lucide-react';
import { Link } from 'react-router-dom';

interface DashboardHeaderProps {
  title: string;
  description: string;
  actionLink?: string;
  actionText?: string;
  credits?: number;
  onTopUpClick?: () => void;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  title,
  description,
  actionLink = "/tests/create",
  actionText = "Create New",
  credits,
  onTopUpClick
}) => {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
        <p className="text-muted-foreground">{description}</p>
      </div>
      <div className="flex flex-col gap-2 sm:flex-row">
        {credits !== undefined && (
          <div className="flex items-center gap-2">
            <div className="bg-muted p-2 rounded-md flex items-center gap-2">
              <CreditCard className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">{credits} Credits</span>
            </div>
            <Button 
              variant="credit" 
              size="sm" 
              onClick={onTopUpClick}
              className="whitespace-nowrap"
            >
              <PlusCircle className="mr-1 h-4 w-4" />
              Top Up
            </Button>
          </div>
        )}
        <Button variant="outline" size="sm">
          <Filter className="mr-2 h-4 w-4" />
          Filter
        </Button>
        {actionLink && (
          <Link to={actionLink}>
            <Button size="sm" className="btn-hover">
              <PlusCircle className="mr-2 h-4 w-4" />
              {actionText}
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default DashboardHeader;
