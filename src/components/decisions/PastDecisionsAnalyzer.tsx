
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

interface PastDecisionsAnalyzerProps {
  className?: string;
}

// Sample data for the chart
const alternativePaths = [
  { month: "Jan 2023", actual: 15000, alternative: 15000 },
  { month: "Feb 2023", actual: 16000, alternative: 16000 },
  { month: "Mar 2023", actual: 17000, alternative: 17000 },
  { month: "Apr 2023", actual: 17500, alternative: 18000 },
  { month: "May 2023", actual: 18000, alternative: 19000 },
  { month: "Jun 2023", actual: 18500, alternative: 20000 },
  { month: "Jul 2023", actual: 19000, alternative: 21000 },
  { month: "Aug 2023", actual: 19500, alternative: 22000 },
  { month: "Sep 2023", actual: 20000, alternative: 23000 },
  { month: "Oct 2023", actual: 21000, alternative: 24000 },
  { month: "Nov 2023", actual: 22000, alternative: 25000 },
  { month: "Dec 2023", actual: 23000, alternative: 26000 },
  { month: "Jan 2024", actual: 24000, alternative: 27000 },
  { month: "Feb 2024", actual: 25000, alternative: 28000 },
  { month: "Mar 2024", actual: 26000, alternative: 29000 },
  { month: "Apr 2024", actual: 27000, alternative: 30000 },
];

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
        {payload.length > 1 && (
          <p className="text-xs mt-1 text-muted-foreground">
            Difference: ${(payload[1].value - payload[0].value).toLocaleString()}
          </p>
        )}
      </div>
    );
  }
  return null;
};

export function PastDecisionsAnalyzer({ className }: PastDecisionsAnalyzerProps) {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Past Decisions Analyzer</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="car">
          <TabsList className="mb-4">
            <TabsTrigger value="car">Car Purchase</TabsTrigger>
            <TabsTrigger value="investment">Investment</TabsTrigger>
            <TabsTrigger value="custom">Custom</TabsTrigger>
          </TabsList>
          
          <TabsContent value="car" className="space-y-6">
            <div className="space-y-2">
              <h3 className="text-lg font-medium">Car Purchase Analysis</h3>
              <p className="text-sm text-muted-foreground">
                What if you hadn't purchased a car in April 2023 and invested the money instead?
              </p>
              <div className="p-4 bg-secondary rounded-lg">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm font-medium">Car Value</p>
                    <p className="text-2xl font-bold">$35,000</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Alternative Net Worth</p>
                    <p className="text-2xl font-bold">$30,000</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Opportunity Cost</p>
                    <p className="text-2xl font-bold text-red-500">$7,000</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={alternativePaths}
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
                    interval={1} 
                  />
                  <YAxis />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="actual"
                    stroke="#FC8181"
                    strokeWidth={2}
                    dot={{ r: 3 }}
                    activeDot={{ r: 5 }}
                    name="Actual Path"
                  />
                  <Line
                    type="monotone"
                    dataKey="alternative"
                    stroke="#4FD1C5"
                    strokeWidth={2}
                    dot={{ r: 3 }}
                    activeDot={{ r: 5 }}
                    name="Alternative Path"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            
            <div className="bg-secondary p-4 rounded-lg">
              <h4 className="font-medium mb-2">Analysis</h4>
              <p className="text-sm">
                If you had invested the $35,000 in an index fund with an average 7% annual return instead of buying the car, your net worth would be approximately $7,000 higher today. However, this analysis doesn't account for the utility and convenience value the car has provided.
              </p>
            </div>
          </TabsContent>
          
          <TabsContent value="investment" className="space-y-6">
            <div className="space-y-2">
              <h3 className="text-lg font-medium">Investment Decision Analysis</h3>
              <p className="text-sm text-muted-foreground">
                What if you had invested in a different asset class?
              </p>
              <div className="p-4 bg-secondary rounded-lg">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm font-medium">Original Investment</p>
                    <p className="text-2xl font-bold">Stocks</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Alternative</p>
                    <p className="text-2xl font-bold">Real Estate</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Difference</p>
                    <p className="text-2xl font-bold text-green-500">+$12,500</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="h-60">
              {/* Chart would go here */}
              <div className="flex items-center justify-center h-full">
                <p className="text-muted-foreground">Select an investment to analyze</p>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="custom" className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Custom Decision Analysis</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Decision Type</Label>
                  <Select defaultValue="purchase">
                    <SelectTrigger>
                      <SelectValue placeholder="Select decision type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="purchase">Major Purchase</SelectItem>
                      <SelectItem value="investment">Investment</SelectItem>
                      <SelectItem value="career">Career Move</SelectItem>
                      <SelectItem value="housing">Housing Decision</SelectItem>
                      <SelectItem value="education">Education</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label>Decision Date</Label>
                  <Input type="date" />
                </div>
                
                <div className="space-y-2">
                  <Label>Amount</Label>
                  <Input type="number" placeholder="e.g., 10000" />
                </div>
                
                <div className="space-y-2">
                  <Label>Alternative Scenario</Label>
                  <Select defaultValue="invest">
                    <SelectTrigger>
                      <SelectValue placeholder="What would you have done instead?" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="invest">Invested in Stock Market</SelectItem>
                      <SelectItem value="save">Saved in High-Yield Account</SelectItem>
                      <SelectItem value="debt">Paid Off Debt</SelectItem>
                      <SelectItem value="property">Invested in Property</SelectItem>
                      <SelectItem value="business">Started a Business</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <Button className="w-full">Analyze Decision</Button>
            </div>
            
            <div className="h-60 flex items-center justify-center">
              <p className="text-muted-foreground">Complete the form to see analysis</p>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
