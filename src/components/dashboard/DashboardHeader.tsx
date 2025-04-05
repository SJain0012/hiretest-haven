
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { BadgeInfo } from 'lucide-react';

interface DashboardHeaderProps {
  title: string;
  description: string;
  actionText?: string;
  actionLink?: string;
  onActionClick?: () => void;
  credits?: number;
  onTopUpClick?: () => void;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  title,
  description,
  actionText,
  actionLink,
  onActionClick,
  credits,
  onTopUpClick
}) => {
  return (
    <div className="flex flex-col md:flex-row items-start md:items-center justify-between pb-4">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
        <p className="text-muted-foreground">{description}</p>
      </div>
      <div className="flex flex-col md:flex-row gap-3 mt-4 md:mt-0">
        {credits !== undefined && (
          <div className="flex items-center gap-2 px-3 py-1.5 bg-primary/10 rounded-md mr-3">
            <span className="text-sm font-medium">{credits} Credits</span>
            {onTopUpClick && (
              <Button variant="link" className="p-0 h-auto" onClick={onTopUpClick}>
                <BadgeInfo className="h-4 w-4 text-primary" />
              </Button>
            )}
          </div>
        )}
        {actionText && (
          onActionClick ? (
            <Button onClick={onActionClick}>
              {actionText}
            </Button>
          ) : actionLink ? (
            <Link to={actionLink}>
              <Button>{actionText}</Button>
            </Link>
          ) : null
        )}
      </div>
    </div>
  );
};

export default DashboardHeader;
