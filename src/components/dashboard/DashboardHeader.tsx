
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

interface DashboardHeaderProps {
  title: string;
  description: string;
  actionText?: string;
  actionLink?: string;
  onActionClick?: () => void;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  title,
  description,
  actionText,
  actionLink,
  onActionClick
}) => {
  return (
    <div className="flex flex-col md:flex-row items-start md:items-center justify-between pb-4">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
        <p className="text-muted-foreground">{description}</p>
      </div>
      {actionText && (
        onActionClick ? (
          <Button className="mt-4 md:mt-0" onClick={onActionClick}>
            {actionText}
          </Button>
        ) : actionLink ? (
          <Link to={actionLink}>
            <Button className="mt-4 md:mt-0">{actionText}</Button>
          </Link>
        ) : null
      )}
    </div>
  );
};

export default DashboardHeader;
