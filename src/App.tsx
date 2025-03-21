
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
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

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/tests" element={<TestsList />} />
          <Route path="/tests/create" element={<TestCreate />} />
          <Route path="/tests/:id/invite" element={<TestInvite />} />
          <Route path="/candidates" element={<CandidatesList />} />
          <Route path="/candidates/:id/results" element={<CandidateResults />} />
          <Route path="/take-test/:testId" element={<TestTake />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/team" element={<TeamPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
