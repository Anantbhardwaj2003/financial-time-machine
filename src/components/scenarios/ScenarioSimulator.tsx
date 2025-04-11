
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { 
  ScenarioParameters, 
  SimulationChart, 
  defaultTimelineData, 
  runSimulation,
  TimelineDataPoint
} from "./simulator";

interface ScenarioSimulatorProps {
  className?: string;
}

export function ScenarioSimulator({ className }: ScenarioSimulatorProps) {
  const [income, setIncome] = useState(5000);
  const [expenses, setExpenses] = useState(3000);
  const [investmentReturn, setInvestmentReturn] = useState(7);
  const [purchaseType, setPurchaseType] = useState("none");
  const [purchaseAmount, setPurchaseAmount] = useState(20000);
  const [purchaseMonth, setPurchaseMonth] = useState("Jun");
  const [timelineData, setTimelineData] = useState<TimelineDataPoint[]>(defaultTimelineData);
  const isMobile = useIsMobile();
  
  const handleRunSimulation = () => {
    const newData = runSimulation(
      income,
      expenses,
      investmentReturn,
      purchaseType,
      purchaseAmount,
      purchaseMonth
    );
    
    setTimelineData(newData);
  };

  return (
    <Card className={`${className} shadow-md border-t-4 border-t-primary animate-fade-in`}>
      <CardHeader className="bg-gray-50 rounded-t-lg border-b">
        <CardTitle className="text-xl text-center sm:text-left">Financial Scenario Simulator</CardTitle>
      </CardHeader>
      <CardContent className={isMobile ? "p-3" : "p-6"}>
        <ScenarioParameters 
          income={income}
          setIncome={setIncome}
          expenses={expenses}
          setExpenses={setExpenses}
          investmentReturn={investmentReturn}
          setInvestmentReturn={setInvestmentReturn}
          purchaseType={purchaseType}
          setPurchaseType={setPurchaseType}
          purchaseAmount={purchaseAmount}
          setPurchaseAmount={setPurchaseAmount}
          purchaseMonth={purchaseMonth}
          setPurchaseMonth={setPurchaseMonth}
          onRunSimulation={handleRunSimulation}
        />
        
        <div className="mt-6">
          <Button onClick={handleRunSimulation} className="w-full bg-primary hover:bg-primary/90">
            Run Simulation
          </Button>
        </div>
        
        <SimulationChart timelineData={timelineData} />
      </CardContent>
    </Card>
  );
}
