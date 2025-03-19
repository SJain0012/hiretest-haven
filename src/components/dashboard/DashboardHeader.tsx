
import React from 'react';
import { Button } from '@/components/ui/button';
import { PlusCircle, Filter } from 'lucide-react';
import { Link } from 'react-router-dom';

interface DashboardHeaderProps {
  title: string;
  description: string;
  actionLink?: string;
  actionText?: string;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  title,
  description,
  actionLink = "/tests/create",
  actionText = "Create New"
}) => {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
        <p className="text-muted-foreground">{description}</p>
      </div>
      <div className="flex flex-col gap-2 sm:flex-row">
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
