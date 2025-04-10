
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";

// Pages
import Index from "./pages/Index";
import Simulator from "./pages/Simulator";
import Goals from "./pages/Goals";
import Spending from "./pages/Spending";
import PastDecisions from "./pages/PastDecisions";
import AiAdvisor from "./pages/AiAdvisor";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import Onboarding from "./pages/Onboarding";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <SidebarProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/dashboard" element={<Index />} />
            <Route path="/simulator" element={<Simulator />} />
            <Route path="/goals" element={<Goals />} />
            <Route path="/spending" element={<Spending />} />
            <Route path="/past-decisions" element={<PastDecisions />} />
            <Route path="/ai-advisor" element={<AiAdvisor />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/" element={<Onboarding />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </SidebarProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
