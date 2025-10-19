
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
  
  if (isLoading) {
    return <div className="flex h-screen items-center justify-center">Loading...</div>;
  }
  
  // Demo mode only allowed in development environment
  if (allowDemo && process.env.NODE_ENV === 'development') {
    const searchParams = new URLSearchParams(location.search);
    const demoMode = searchParams.get('demo') === 'true';
    
    if (demoMode) {
      // Log demo access for security monitoring
      if (process.env.NODE_ENV === 'development') {
        console.warn('Demo mode access:', location.pathname);
      }
      return <>{children}</>;
    }
  }
  
  // Redirect if not logged in
  if (!session) {
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }
  
  return <>{children}</>;
};

export default ProtectedRoute;
