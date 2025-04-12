import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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

const calculateInvestmentGrowth = (amount: number, rate: number = 0.07) => {
  const months = 12;
  const monthlyRate = Math.pow(1 + rate, 1 / 12) - 1;

  const data = [];
  let value = amount;

  for (let i = 0; i <= months; i++) {
    const month = new Date();
    month.setMonth(month.getMonth() - (12 - i));
    const label = month.toLocaleString("default", {
      month: "short",
      year: "numeric",
    });

    data.push({
      month: label,
      actual: i === 0 ? amount : 0,
      alternative: Math.round(value),
    });

    value *= 1 + monthlyRate;
  }

  return data;
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 rounded shadow-lg border">
        <p className="font-semibold">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={`item-${index}`} className="text-sm" style={{ color: entry.color }}>
            {entry.name}:{" "}
            <span className="font-medium">${entry.value?.toLocaleString() || "-"}</span>
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
  const [decisionType, setDecisionType] = useState("purchase");
  const [amount, setAmount] = useState<number | null>(null);
  const [alternative, setAlternative] = useState("invest");
  const [chartData, setChartData] = useState<any[]>([]);
  const [analysisVisible, setAnalysisVisible] = useState(false);

  const handleAnalyze = () => {
    if (!amount) return;

    const data = calculateInvestmentGrowth(amount);
    setChartData(data);
    setAnalysisVisible(true);
  };

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Past Decisions Analyzer</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="custom">
          <TabsList className="mb-4">
            <TabsTrigger value="car">Car Purchase</TabsTrigger>
            <TabsTrigger value="investment">Investment</TabsTrigger>
            <TabsTrigger value="custom">Custom</TabsTrigger>
          </TabsList>

          <TabsContent value="custom" className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Custom Decision Analysis</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Decision Type</Label>
                  <Select defaultValue={decisionType} onValueChange={setDecisionType}>
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
                  <Input
                    type="number"
                    placeholder="e.g., 10000"
                    onChange={(e) => setAmount(parseFloat(e.target.value))}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Alternative Scenario</Label>
                  <Select defaultValue={alternative} onValueChange={setAlternative}>
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

              <Button className="w-full" onClick={handleAnalyze}>
                Analyze Decision
              </Button>
            </div>

            <div className="h-80">
              {analysisVisible && chartData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={chartData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                    <XAxis dataKey="month" tick={{ fontSize: 10 }} interval={1} />
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
                      name="Actual"
                    />
                    <Line
                      type="monotone"
                      dataKey="alternative"
                      stroke="#4FD1C5"
                      strokeWidth={2}
                      dot={{ r: 3 }}
                      activeDot={{ r: 5 }}
                      name="Alternative"
                    />
                  </LineChart>
                </ResponsiveContainer>
              ) : (
                <div className="flex items-center justify-center h-full">
                  <p className="text-muted-foreground">
                    Complete the form to see analysis
                  </p>
                </div>
              )}
            </div>

            {analysisVisible && (
              <div className="bg-secondary p-4 rounded-lg">
                <h4 className="font-medium mb-2">Analysis</h4>
                <p className="text-sm">
                  By choosing <strong>{alternative}</strong> instead of a{" "}
                  <strong>{decisionType}</strong> with ${amount?.toLocaleString()}, you could
                  have gained approximately <strong>${(chartData.at(-1)?.alternative - chartData[0].actual).toLocaleString()}</strong> over the past year.
                </p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
