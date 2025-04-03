
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { User, PieChart, Mail, Users, LogOut } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';

const Navbar = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  
  const handleSignOut = async () => {
    try {
      await signOut();
      toast.success("You have been signed out.");
      navigate('/');
    } catch (error) {
      toast.error("Failed to sign out. Please try again.");
    }
  };

  return (
    <header className="w-full border-b border-border bg-white bg-opacity-70 backdrop-blur-lg fixed top-0 z-50">
      <div className="container flex items-center justify-between h-16 px-4 md:px-6">
        <Link to="/" className="flex items-center gap-2">
          <span className="text-xl font-medium tracking-tight">HireTest Haven</span>
        </Link>
        
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/" className="text-sm font-medium transition-colors hover:text-primary/80">
            Home
          </Link>
          <Link to="/dashboard" className="text-sm font-medium transition-colors hover:text-primary/80">
            Dashboard
          </Link>
          {user && (
            <>
              <Link to="/tests" className="text-sm font-medium transition-colors hover:text-primary/80">
                Tests
              </Link>
              <Link to="/candidates" className="text-sm font-medium transition-colors hover:text-primary/80">
                Candidates
              </Link>
              <Link to="/team" className="text-sm font-medium transition-colors hover:text-primary/80">
                Team
              </Link>
            </>
          )}
          <Link to="/pricing" className="text-sm font-medium transition-colors hover:text-primary/80">
            Pricing
          </Link>
        </nav>
        
        <div className="flex items-center gap-2">
          {user ? (
            <>
              <Link to="/dashboard">
                <Button variant="ghost" size="icon" className="rounded-full">
                  <PieChart className="h-5 w-5" />
                  <span className="sr-only">Dashboard</span>
                </Button>
              </Link>
              <Link to="/messages">
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Mail className="h-5 w-5" />
                  <span className="sr-only">Messages</span>
                </Button>
              </Link>
              <Link to="/team">
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Users className="h-5 w-5" />
                  <span className="sr-only">Team</span>
                </Button>
              </Link>
              <Link to="/profile">
                <Button variant="ghost" size="icon" className="rounded-full">
                  <User className="h-5 w-5" />
                  <span className="sr-only">Profile</span>
                </Button>
              </Link>
              <Button variant="ghost" size="icon" className="rounded-full" onClick={handleSignOut}>
                <LogOut className="h-5 w-5" />
                <span className="sr-only">Sign Out</span>
              </Button>
            </>
          ) : (
            <Link to="/auth">
              <Button variant="outline" size="sm">Sign In</Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
