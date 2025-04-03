
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import TestsList from "./pages/TestsList";
import TestCreate from "./pages/TestCreate";
import TestInvite from "./pages/TestInvite";
import CandidatesList from "./pages/CandidatesList";
import CandidateResults from "./pages/CandidateResults";
import TestTake from "./pages/TestTake";
import NotFound from "./pages/NotFound";
import Pricing from "./pages/Pricing";
import TeamPage from "./pages/TeamPage";
import Profile from "./pages/Profile";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/dashboard" element={
              <ProtectedRoute allowDemo={true}>
                <Dashboard />
              </ProtectedRoute>
            } />
            <Route path="/tests" element={
              <ProtectedRoute>
                <TestsList />
              </ProtectedRoute>
            } />
            <Route path="/tests/create" element={
              <ProtectedRoute>
                <TestCreate />
              </ProtectedRoute>
            } />
            <Route path="/tests/:id/invite" element={
              <ProtectedRoute>
                <TestInvite />
              </ProtectedRoute>
            } />
            <Route path="/candidates" element={
              <ProtectedRoute>
                <CandidatesList />
              </ProtectedRoute>
            } />
            <Route path="/candidates/:id/results" element={
              <ProtectedRoute>
                <CandidateResults />
              </ProtectedRoute>
            } />
            <Route path="/take-test/:testId" element={<TestTake />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/team" element={
              <ProtectedRoute>
                <TeamPage />
              </ProtectedRoute>
            } />
            <Route path="/profile" element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
