
import { 
  DollarSign, 
  TrendingDown, 
  TrendingUp, 
  Target,
  PlusCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { SummaryCard } from "@/components/dashboard/SummaryCard";
import { MonthlyChart } from "@/components/dashboard/MonthlyChart";
import { FinancialTimeline } from "@/components/dashboard/FinancialTimeline";
import { ScenarioSimulator } from "@/components/scenarios/ScenarioSimulator";
import { AiAdvisor } from "@/components/ai-advisor/AiAdvisor";
import { AppLayout } from "@/components/layout/AppLayout";

const Index = () => {
  return (
    <AppLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Financial Dashboard</h1>
        <Button className="hidden sm:flex">
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Account
        </Button>
      </div>

      <div className="grid gap-4 md:gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mb-6 animate-fade-in">
        <SummaryCard
          title="Net Worth"
          value="$52,500"
          icon={DollarSign}
          trend={{ value: 12, isPositive: true }}
          description="vs. last month"
        />
        <SummaryCard
          title="Monthly Income"
          value="$6,250"
          icon={TrendingUp}
          trend={{ value: 5, isPositive: true }}
          description="vs. last month"
        />
        <SummaryCard
          title="Monthly Expenses"
          value="$3,840"
          icon={TrendingDown}
          trend={{ value: 2, isPositive: false }}
          description="vs. last month"
        />
        <SummaryCard
          title="Goal Progress"
          value="65%"
          icon={Target}
          description="Emergency fund"
        />
      </div>

      <div className="grid gap-4 md:gap-6 grid-cols-1 lg:grid-cols-2 mb-6">
        <MonthlyChart />
        <FinancialTimeline />
      </div>

      <div className="grid gap-4 md:gap-6 grid-cols-1 lg:grid-cols-2">
        <ScenarioSimulator className="lg:col-span-1" />
        <AiAdvisor className="lg:col-span-1" />
      </div>
    </AppLayout>
  );
};

export default Index;
