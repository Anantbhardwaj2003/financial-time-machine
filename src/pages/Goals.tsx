
import { AppLayout } from "@/components/layout/AppLayout";
import { GoalPlanner } from "@/components/goals/GoalPlanner";

const Goals = () => {
  return (
    <AppLayout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Goal Planner</h1>
        <p className="text-muted-foreground mt-2">
          Set, track, and achieve your financial goals.
        </p>
      </div>
      
      <GoalPlanner />
    </AppLayout>
  );
};

export default Goals;
