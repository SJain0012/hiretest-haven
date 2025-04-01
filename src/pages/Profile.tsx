
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Building, PieChart, CreditCard, Award, LogOut, Plus, Mail, Calendar } from 'lucide-react';

const Profile = () => {
  // Mock data - in a real app, this would come from API or context
  const companyData = {
    name: "AcmeCorp Technologies",
    email: "admin@acmecorp.com",
    plan: "Professional",
    joinedDate: "Jan 15, 2023",
    candidates: 145,
    tests: 12,
    credits: 75
  };

  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogout = () => {
    // Here you would implement actual logout logic
    toast({
      title: "Logged out successfully",
      description: "You have been logged out of your account.",
    });
    navigate('/');
  };

  const handleTopUp = () => {
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-start mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Your Profile</h1>
              <p className="text-muted-foreground mt-1">
                Manage your account details and subscription
              </p>
            </div>
            <Button onClick={handleLogout} variant="outline" className="gap-2">
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* Company Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building className="h-5 w-5 text-primary" />
                  Company Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">Company Name</p>
                  <p className="font-medium text-lg">{companyData.name}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Email Address</p>
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <p>{companyData.email}</p>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Member Since</p>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <p>{companyData.joinedDate}</p>
                  </div>
                </div>
                <Badge variant="secondary" className="mt-2">
                  {companyData.plan} Plan
                </Badge>
              </CardContent>
            </Card>

            {/* Testing Statistics */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PieChart className="h-5 w-5 text-primary" />
                  Testing Statistics
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">Candidates Tested</p>
                  <p className="font-medium text-2xl">{companyData.candidates}</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Across all your tests
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Active Tests</p>
                  <p className="font-medium text-2xl">{companyData.tests}</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Tests currently available for candidates
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Credits Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5 text-primary" />
                  Credits
                </CardTitle>
                <CardDescription>
                  Credits are used to send test invitations
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">Available Credits</p>
                  <div className="flex items-center justify-between">
                    <p className="font-medium text-2xl">{companyData.credits}</p>
                    <Badge variant={companyData.credits > 20 ? "secondary" : "destructive"}>
                      {companyData.credits > 20 ? "Sufficient" : "Low"}
                    </Badge>
                  </div>
                </div>
                <Button onClick={handleTopUp} variant="credit" className="w-full gap-2">
                  <Plus className="h-4 w-4" />
                  Purchase More Credits
                </Button>
                <p className="text-xs text-muted-foreground mt-1">
                  Each test invitation consumes 1 credit
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Profile;
