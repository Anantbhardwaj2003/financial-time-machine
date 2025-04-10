
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PlusCircle, Calendar, DollarSign, Target } from "lucide-react";

interface Goal {
  id: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
  targetDate: string;
  category: string;
}

interface GoalPlannerProps {
  className?: string;
}

export function GoalPlanner({ className }: GoalPlannerProps) {
  // Sample initial goals
  const [goals, setGoals] = useState<Goal[]>([
    {
      id: "1",
      name: "Emergency Fund",
      targetAmount: 10000,
      currentAmount: 6500,
      targetDate: "2025-12-31",
      category: "Savings"
    },
    {
      id: "2",
      name: "Down Payment",
      targetAmount: 60000,
      currentAmount: 25000,
      targetDate: "2027-06-30",
      category: "Housing"
    },
    {
      id: "3",
      name: "Vacation",
      targetAmount: 5000,
      currentAmount: 2800,
      targetDate: "2025-08-31",
      category: "Travel"
    }
  ]);
  
  const [newGoal, setNewGoal] = useState<Omit<Goal, "id">>({
    name: "",
    targetAmount: 0,
    currentAmount: 0,
    targetDate: "",
    category: "Savings"
  });
  
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  const handleAddGoal = () => {
    if (!newGoal.name || newGoal.targetAmount <= 0 || !newGoal.targetDate) {
      return;
    }
    
    setGoals([
      ...goals,
      {
        id: Date.now().toString(),
        ...newGoal
      }
    ]);
    
    setNewGoal({
      name: "",
      targetAmount: 0,
      currentAmount: 0,
      targetDate: "",
      category: "Savings"
    });
    
    setIsDialogOpen(false);
  };
  
  const calculateProgress = (current: number, target: number) => {
    return Math.min(Math.round((current / target) * 100), 100);
  };
  
  const calculateTimeLeft = (targetDate: string) => {
    const now = new Date();
    const target = new Date(targetDate);
    const diffTime = target.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return "Overdue";
    if (diffDays === 0) return "Due today";
    if (diffDays === 1) return "1 day left";
    if (diffDays < 30) return `${diffDays} days left`;
    
    const diffMonths = Math.ceil(diffDays / 30);
    if (diffMonths === 1) return "1 month left";
    if (diffMonths < 12) return `${diffMonths} months left`;
    
    const diffYears = Math.ceil(diffMonths / 12);
    if (diffYears === 1) return "1 year left";
    return `${diffYears} years left`;
  };
  
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Housing":
        return <Target className="h-5 w-5" />;
      case "Travel":
        return <Calendar className="h-5 w-5" />;
      case "Savings":
      default:
        return <DollarSign className="h-5 w-5" />;
    }
  };

  return (
    <Card className={className}>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Financial Goals</CardTitle>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button size="sm">
              <PlusCircle className="h-4 w-4 mr-2" />
              New Goal
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Financial Goal</DialogTitle>
              <DialogDescription>
                Define a new financial goal to track your progress.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-2">
              <div className="space-y-2">
                <Label htmlFor="name">Goal Name</Label>
                <Input
                  id="name"
                  placeholder="e.g., Emergency Fund"
                  value={newGoal.name}
                  onChange={(e) => setNewGoal({ ...newGoal, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select
                  value={newGoal.category}
                  onValueChange={(value) => setNewGoal({ ...newGoal, category: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Savings">Savings</SelectItem>
                    <SelectItem value="Housing">Housing</SelectItem>
                    <SelectItem value="Travel">Travel</SelectItem>
                    <SelectItem value="Education">Education</SelectItem>
                    <SelectItem value="Retirement">Retirement</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="targetAmount">Target Amount</Label>
                  <Input
                    id="targetAmount"
                    type="number"
                    placeholder="10000"
                    value={newGoal.targetAmount || ""}
                    onChange={(e) => setNewGoal({ ...newGoal, targetAmount: Number(e.target.value) })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="currentAmount">Current Amount</Label>
                  <Input
                    id="currentAmount"
                    type="number"
                    placeholder="0"
                    value={newGoal.currentAmount || ""}
                    onChange={(e) => setNewGoal({ ...newGoal, currentAmount: Number(e.target.value) })}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="targetDate">Target Date</Label>
                <Input
                  id="targetDate"
                  type="date"
                  value={newGoal.targetDate}
                  onChange={(e) => setNewGoal({ ...newGoal, targetDate: e.target.value })}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddGoal}>
                Create Goal
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {goals.map((goal) => (
            <div key={goal.id} className="rounded-lg border p-4">
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-full bg-secondary flex items-center justify-center">
                  {getCategoryIcon(goal.category)}
                </div>
                <div className="space-y-1 flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">{goal.name}</h3>
                    <span className="text-xs text-muted-foreground">{goal.category}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <Progress 
                      value={calculateProgress(goal.currentAmount, goal.targetAmount)} 
                      className="h-2 flex-1 mr-4" 
                    />
                    <span className="text-sm font-medium">
                      {calculateProgress(goal.currentAmount, goal.targetAmount)}%
                    </span>
                  </div>
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>${goal.currentAmount.toLocaleString()} of ${goal.targetAmount.toLocaleString()}</span>
                    <span>{calculateTimeLeft(goal.targetDate)}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
          {goals.length === 0 && (
            <div className="text-center py-10 text-muted-foreground">
              <p>No financial goals created yet</p>
              <Button className="mt-2" variant="outline" onClick={() => setIsDialogOpen(true)}>
                Create your first goal
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
