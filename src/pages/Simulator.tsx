
import { AppLayout } from "@/components/layout/AppLayout";
import { ScenarioSimulator } from "@/components/scenarios/ScenarioSimulator";

const Simulator = () => {
  return (
    <AppLayout>
      <div className="container mx-auto px-4 py-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold tracking-tight">Scenario Simulator</h1>
          <p className="text-muted-foreground mt-2">
            Explore different financial paths and see how your decisions impact your future.
          </p>
        </div>
        
        <ScenarioSimulator />
      </div>
    </AppLayout>
  );
};

export default Simulator;
