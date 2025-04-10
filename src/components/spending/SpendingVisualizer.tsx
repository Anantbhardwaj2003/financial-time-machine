
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { FileUp } from "lucide-react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";

interface SpendingVisualizerProps {
  className?: string;
}

// Sample data
const spendingData = [
  { name: "Housing", value: 1200, color: "#4FD1C5" },
  { name: "Food", value: 800, color: "#9b87f5" },
  { name: "Transportation", value: 500, color: "#FC8181" },
  { name: "Entertainment", value: 300, color: "#68D391" },
  { name: "Utilities", value: 200, color: "#F6E05E" },
  { name: "Other", value: 400, color: "#7E69AB" },
];

// Sample suggestions
const suggestions = [
  "You spent 23% more on food this month compared to last month",
  "Your entertainment expenses are higher than 80% of similar households",
  "Reducing your daily coffee spend could save you $1,200 per year",
];

export function SpendingVisualizer({ className }: SpendingVisualizerProps) {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Spending Analysis</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={spendingData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={2}
                  dataKey="value"
                  label={({name, percent}) => `${name} (${(percent * 100).toFixed(0)}%)`}
                >
                  {spendingData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value) => [`$${value}`, 'Amount']}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
          
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium mb-2">Smart Suggestions</h3>
              <ul className="space-y-2">
                {suggestions.map((suggestion, i) => (
                  <li key={i} className="bg-secondary p-3 rounded-md text-sm">
                    {suggestion}
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="mt-6">
              <Label className="mb-2 block">Upload Statements</Label>
              <div className="border-2 border-dashed rounded-lg p-6 text-center">
                <FileUp className="mx-auto h-10 w-10 text-muted-foreground mb-2" />
                <p className="text-sm text-muted-foreground mb-2">
                  Drag and drop your bank statement CSV or click to browse
                </p>
                <Button variant="outline" size="sm">
                  Upload CSV
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
