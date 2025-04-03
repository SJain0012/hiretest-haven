
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowDemo?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, allowDemo = false }) => {
  const { session, isLoading } = useAuth();
  const location = useLocation();
  
  // If demo mode is allowed for this route and there's a demo query param
  const searchParams = new URLSearchParams(location.search);
  const demoMode = searchParams.get('demo') === 'true';
  
  if (isLoading) {
    // Loading state - you can replace this with a loading component
    return <div className="flex h-screen items-center justify-center">Loading...</div>;
  }
  
  // Allow access in demo mode if the route supports it
  if (allowDemo && demoMode) {
    return <>{children}</>;
  }
  
  // Redirect if not logged in
  if (!session) {
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }
  
  return <>{children}</>;
};

export default ProtectedRoute;
