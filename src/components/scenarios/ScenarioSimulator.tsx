
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  ReferenceLine,
  Legend
} from "recharts";
import { useIsMobile } from "@/hooks/use-mobile";

interface ScenarioSimulatorProps {
  className?: string;
}

// Default data
const defaultTimelineData = [
  { month: "Jan 2026", baseline: 52000, scenario: null },
  { month: "Feb 2026", baseline: 55000, scenario: null },
  { month: "Mar 2026", baseline: 58000, scenario: null },
  { month: "Apr 2026", baseline: 62000, scenario: null },
  { month: "May 2026", baseline: 65000, scenario: null },
  { month: "Jun 2026", baseline: 68000, scenario: null },
  { month: "Jul 2026", baseline: 71000, scenario: null },
  { month: "Aug 2026", baseline: 74000, scenario: null },
  { month: "Sep 2026", baseline: 77000, scenario: null },
  { month: "Oct 2026", baseline: 80000, scenario: null },
  { month: "Nov 2026", baseline: 83000, scenario: null },
  { month: "Dec 2026", baseline: 86000, scenario: null },
];

export function ScenarioSimulator({ className }: ScenarioSimulatorProps) {
  const [income, setIncome] = useState(5000);
  const [expenses, setExpenses] = useState(3000);
  const [investmentReturn, setInvestmentReturn] = useState(7);
  const [purchaseType, setPurchaseType] = useState("none");
  const [purchaseAmount, setPurchaseAmount] = useState(20000);
  const [purchaseMonth, setPurchaseMonth] = useState("Jun");
  const [timelineData, setTimelineData] = useState(defaultTimelineData);
  const isMobile = useIsMobile();
  
  const handleRunSimulation = () => {
    // Create a simple simulation model
    const newData = defaultTimelineData.map((item) => {
      const monthIndex = defaultTimelineData.findIndex(d => d.month === item.month);
      const monthName = item.month.split(" ")[0];
      
      // Calculate monthly savings
      const monthlySavings = income - expenses;
      
      // Calculate baseline + monthly savings with investment returns
      let scenario = monthIndex === 0 
        ? 52000 + monthlySavings 
        : defaultTimelineData[monthIndex - 1].baseline + monthlySavings;
      
      // Apply investment returns (monthly rate)
      scenario = scenario * (1 + (investmentReturn / 100 / 12));
      
      // Apply purchase if in selected month
      if (purchaseType !== "none" && monthName === purchaseMonth) {
        scenario -= purchaseAmount;
      }
      
      return {
        ...item,
        scenario: Math.round(scenario)
      };
    });
    
    setTimelineData(newData);
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 rounded shadow-lg border">
          <p className="font-semibold">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={`item-${index}`} className="text-sm" style={{ color: entry.color }}>
              {entry.name}: <span className="font-medium">${entry.value?.toLocaleString() || "-"}</span>
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <Card className={`${className} shadow-md border-t-4 border-t-primary animate-fade-in`}>
      <CardHeader className="bg-gray-50 rounded-t-lg border-b">
        <CardTitle className="text-xl text-center sm:text-left">Financial Scenario Simulator</CardTitle>
      </CardHeader>
      <CardContent className={isMobile ? "p-3" : "p-6"}>
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
        
        <div className="mt-6">
          <Button onClick={handleRunSimulation} className="w-full bg-primary hover:bg-primary/90">
            Run Simulation
          </Button>
        </div>
        
        <div className="mt-6 h-80 p-1">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={timelineData}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
              <XAxis 
                dataKey="month" 
                tick={{ fontSize: 10 }} 
                interval={isMobile ? 2 : 1} 
              />
              <YAxis />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Line
                type="monotone"
                dataKey="baseline"
                stroke="#4FD1C5"
                strokeWidth={2}
                dot={{ r: 3 }}
                activeDot={{ r: 5 }}
                name="Baseline"
              />
              <Line
                type="monotone"
                dataKey="scenario"
                stroke="#9b87f5"
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={{ r: 3 }}
                activeDot={{ r: 5 }}
                name="Scenario"
                connectNulls
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
