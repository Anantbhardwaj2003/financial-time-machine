
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useIsMobile } from "@/hooks/use-mobile";

interface ScenarioParametersProps {
  income: number;
  setIncome: (value: number) => void;
  expenses: number;
  setExpenses: (value: number) => void;
  investmentReturn: number;
  setInvestmentReturn: (value: number) => void;
  purchaseType: string;
  setPurchaseType: (value: string) => void;
  purchaseAmount: number;
  setPurchaseAmount: (value: number) => void;
  purchaseMonth: string;
  setPurchaseMonth: (value: string) => void;
  onRunSimulation: () => void;
}

export function ScenarioParameters({
  income,
  setIncome,
  expenses,
  setExpenses,
  investmentReturn,
  setInvestmentReturn,
  purchaseType,
  setPurchaseType,
  purchaseAmount,
  setPurchaseAmount,
  purchaseMonth,
  setPurchaseMonth,
  onRunSimulation
}: ScenarioParametersProps) {
  const isMobile = useIsMobile();

  return (
    <Tabs defaultValue="income" className="w-full">
      <TabsList className="mb-4 w-full grid grid-cols-3 h-auto">
        <TabsTrigger value="income" className="py-2">Income & Expenses</TabsTrigger>
        <TabsTrigger value="investments" className="py-2">Investments</TabsTrigger>
        <TabsTrigger value="purchases" className="py-2">Major Purchases</TabsTrigger>
      </TabsList>
      
      <TabsContent value="income" className="space-y-4 mt-4 p-1">
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <Label className="font-medium">Monthly Income</Label>
            <span className="text-sm font-semibold text-primary">${income.toLocaleString()}</span>
          </div>
          <Slider 
            value={[income]} 
            min={2000} 
            max={15000} 
            step={100} 
            onValueChange={(value) => setIncome(value[0])} 
            className="my-4"
          />
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <Label className="font-medium">Monthly Expenses</Label>
            <span className="text-sm font-semibold text-primary">${expenses.toLocaleString()}</span>
          </div>
          <Slider 
            value={[expenses]} 
            min={1000} 
            max={10000} 
            step={100} 
            onValueChange={(value) => setExpenses(value[0])} 
            className="my-4"
          />
        </div>
      </TabsContent>
      
      <TabsContent value="investments" className="space-y-4 mt-4 p-1">
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <Label className="font-medium">Expected Annual Return</Label>
            <span className="text-sm font-semibold text-primary">{investmentReturn}%</span>
          </div>
          <Slider 
            value={[investmentReturn]} 
            min={1} 
            max={15} 
            step={0.5} 
            onValueChange={(value) => setInvestmentReturn(value[0])} 
            className="my-4"
          />
        </div>
      </TabsContent>
      
      <TabsContent value="purchases" className="space-y-4 mt-4 p-1">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="space-y-2">
            <Label className="font-medium">Purchase Type</Label>
            <Select 
              value={purchaseType} 
              onValueChange={setPurchaseType}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a purchase type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">None</SelectItem>
                <SelectItem value="car">Car</SelectItem>
                <SelectItem value="house">House Down Payment</SelectItem>
                <SelectItem value="vacation">Vacation</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label className="font-medium">Purchase Month</Label>
            <Select 
              value={purchaseMonth} 
              onValueChange={setPurchaseMonth}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select month" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Jan">January</SelectItem>
                <SelectItem value="Feb">February</SelectItem>
                <SelectItem value="Mar">March</SelectItem>
                <SelectItem value="Apr">April</SelectItem>
                <SelectItem value="May">May</SelectItem>
                <SelectItem value="Jun">June</SelectItem>
                <SelectItem value="Jul">July</SelectItem>
                <SelectItem value="Aug">August</SelectItem>
                <SelectItem value="Sep">September</SelectItem>
                <SelectItem value="Oct">October</SelectItem>
                <SelectItem value="Nov">November</SelectItem>
                <SelectItem value="Dec">December</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <Label className="font-medium">Purchase Amount</Label>
            <span className="text-sm font-semibold text-primary">${purchaseAmount.toLocaleString()}</span>
          </div>
          <Slider 
            value={[purchaseAmount]} 
            min={1000} 
            max={100000} 
            step={1000} 
            onValueChange={(value) => setPurchaseAmount(value[0])} 
            className="my-4"
          />
        </div>
      </TabsContent>
    </Tabs>
  );
}
