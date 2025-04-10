
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
  ArrowLeft,
  ArrowRight,
  Home,
  Briefcase,
  GraduationCap,
  Goal,
  PiggyBank,
  Palmtree,
  Baby,
  PlusCircle,
} from "lucide-react";

interface Goal {
  id: string;
  type: string;
  name: string;
  targetAmount?: number;
  targetDate?: string;
  isCustom?: boolean;
  // Adding the icon property to the Goal interface
  icon?: string;
}

interface OnboardingGoalsProps {
  userData: any;
  updateUserData: (data: Partial<any>) => void;
  onNext: () => void;
  onBack: () => void;
}

export function OnboardingGoals({ userData, updateUserData, onNext, onBack }: OnboardingGoalsProps) {
  const [selectedGoals, setSelectedGoals] = useState<Goal[]>(userData.goals || []);
  const [customGoal, setCustomGoal] = useState("");
  const [showCustomInput, setShowCustomInput] = useState(false);

  const predefinedGoals: Goal[] = [
    { id: "1", type: "retirement", name: "Retire Early", icon: "Palmtree" },
    { id: "2", type: "home", name: "Buy a Home", icon: "Home" },
    { id: "3", type: "career", name: "Change Career/Go Freelance", icon: "Briefcase" },
    { id: "4", type: "education", name: "Education (Self/Children)", icon: "GraduationCap" },
    { id: "5", type: "emergency", name: "Build Emergency Fund", icon: "PiggyBank" },
    { id: "6", type: "family", name: "Start a Family", icon: "Baby" },
  ];

  const toggleGoal = (goal: Goal) => {
    setSelectedGoals(current => {
      const isSelected = current.some(g => g.id === goal.id);
      if (isSelected) {
        return current.filter(g => g.id === goal.id ? goal : false);
      } else {
        return [...current, goal];
      }
    });
  };

  const isGoalSelected = (id: string) => {
    return selectedGoals.some(goal => goal.id === id);
  };

  const addCustomGoal = () => {
    if (customGoal.trim()) {
      const newGoal: Goal = {
        id: `custom-${Date.now()}`,
        type: "custom",
        name: customGoal,
        isCustom: true,
        icon: "Goal",
      };
      setSelectedGoals(current => [...current, newGoal]);
      setCustomGoal("");
      setShowCustomInput(false);
    }
  };

  const handleSubmit = () => {
    updateUserData({ goals: selectedGoals });
    onNext();
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold tracking-tight">Financial Goals</h1>
        <p className="text-muted-foreground">
          Select your financial goals (choose all that apply)
        </p>
      </div>

      <div className="space-y-4">
        {predefinedGoals.map((goal) => (
          <div key={goal.id} className="flex items-center space-x-3 border rounded-lg p-3 cursor-pointer hover:bg-gray-50 transition-colors"
            onClick={() => toggleGoal(goal)}>
            <Checkbox id={`goal-${goal.id}`} checked={isGoalSelected(goal.id)} />
            <div className="flex flex-1 items-center space-x-3">
              {goal.type === "retirement" && <Palmtree className="h-5 w-5 text-muted-foreground" />}
              {goal.type === "home" && <Home className="h-5 w-5 text-muted-foreground" />}
              {goal.type === "career" && <Briefcase className="h-5 w-5 text-muted-foreground" />}
              {goal.type === "education" && <GraduationCap className="h-5 w-5 text-muted-foreground" />}
              {goal.type === "emergency" && <PiggyBank className="h-5 w-5 text-muted-foreground" />}
              {goal.type === "family" && <Baby className="h-5 w-5 text-muted-foreground" />}
              <label htmlFor={`goal-${goal.id}`} className="flex-1 font-medium cursor-pointer">
                {goal.name}
              </label>
            </div>
          </div>
        ))}

        {selectedGoals.filter(g => g.isCustom).map((goal) => (
          <div key={goal.id} className="flex items-center space-x-3 border rounded-lg p-3 cursor-pointer hover:bg-gray-50 transition-colors"
            onClick={() => toggleGoal(goal)}>
            <Checkbox id={`goal-${goal.id}`} checked={isGoalSelected(goal.id)} />
            <Goal className="h-5 w-5 text-muted-foreground" />
            <label htmlFor={`goal-${goal.id}`} className="flex-1 font-medium cursor-pointer">
              {goal.name}
            </label>
          </div>
        ))}

        {showCustomInput ? (
          <div className="flex items-center space-x-2">
            <Input 
              value={customGoal}
              onChange={(e) => setCustomGoal(e.target.value)}
              placeholder="Enter your own goal..."
              className="flex-1"
            />
            <Button onClick={addCustomGoal} size="sm">Add</Button>
            <Button onClick={() => setShowCustomInput(false)} variant="outline" size="sm">Cancel</Button>
          </div>
        ) : (
          <Button onClick={() => setShowCustomInput(true)} variant="outline" className="w-full">
            <PlusCircle className="mr-2 h-4 w-4" /> Add Custom Goal
          </Button>
        )}
      </div>

      <div className="flex space-x-2 pt-2">
        <Button type="button" variant="outline" onClick={onBack} className="flex-1">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>
        <Button onClick={handleSubmit} className="flex-1">
          Continue <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
