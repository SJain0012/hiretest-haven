
import React from 'react';

interface DashboardDemoNoticeProps {
  isDemoMode: boolean;
}

const DashboardDemoNotice: React.FC<DashboardDemoNoticeProps> = ({ isDemoMode }) => {
  if (!isDemoMode) return null;
  
  return (
    <div className="bg-amber-50 border border-amber-200 rounded-md p-4 mb-6">
      <p className="text-amber-800">
        <strong>Demo Mode:</strong> You're viewing a sample dashboard. 
        <a href="/auth" className="text-blue-600 hover:underline ml-2">
          Sign in
        </a> or 
        <a href="/auth?tab=signup" className="text-blue-600 hover:underline ml-2">
          create an account
        </a> to get started with your own dashboard.
      </p>
    </div>
  );
};

export default DashboardDemoNotice;
