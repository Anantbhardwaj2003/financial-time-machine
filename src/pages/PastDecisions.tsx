
import { AppLayout } from "@/components/layout/AppLayout";
import { PastDecisionsAnalyzer } from "@/components/decisions/PastDecisionsAnalyzer";

const PastDecisions = () => {
  return (
    <AppLayout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Past Decisions Analyzer</h1>
        <p className="text-muted-foreground mt-2">
          Explore how your past financial decisions have impacted your current financial situation.
        </p>
      </div>
      
      <PastDecisionsAnalyzer />
    </AppLayout>
  );
};

export default PastDecisions;
