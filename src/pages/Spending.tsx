
import { AppLayout } from "@/components/layout/AppLayout";
import { SpendingVisualizer } from "@/components/spending/SpendingVisualizer";

const Spending = () => {
  return (
    <AppLayout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Spending Analysis</h1>
        <p className="text-muted-foreground mt-2">
          Track and analyze your spending patterns to identify areas for improvement.
        </p>
      </div>
      
      <SpendingVisualizer />
    </AppLayout>
  );
};

export default Spending;
