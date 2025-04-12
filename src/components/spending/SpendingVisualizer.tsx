import { useState } from "react";
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
import Papa from "papaparse";

interface SpendingVisualizerProps {
  className?: string;
}

interface SpendingData {
  name: string;
  value: number;
  color: string;
}

const COLORS = ["#4FD1C5", "#9b87f5", "#FC8181", "#68D391", "#F6E05E", "#7E69AB", "#F687B3", "#63B3ED"];

export function SpendingVisualizer({ className }: SpendingVisualizerProps) {
  const [spendingData, setSpendingData] = useState<SpendingData[]>([]);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [fileName, setFileName] = useState<string | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileName(file.name);

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: function (results) {
        const rows = results.data as { Category: string; Amount: string }[];

        const categoryMap = new Map<string, number>();

        for (let row of rows) {
          const category = row.Category?.trim();
          const amount = parseFloat(row.Amount);
          if (!category || isNaN(amount)) continue;

          categoryMap.set(category, (categoryMap.get(category) || 0) + amount);
        }

        const parsedData: SpendingData[] = Array.from(categoryMap.entries()).map(
          ([name, value], index) => ({
            name,
            value,
            color: COLORS[index % COLORS.length],
          })
        );

        setSpendingData(parsedData);
        generateSuggestions(parsedData);
      },
    });
  };

  const generateSuggestions = (data: SpendingData[]) => {
    const total = data.reduce((sum, d) => sum + d.value, 0);

    const suggestions: string[] = [];

    for (let item of data) {
      const percent = ((item.value / total) * 100).toFixed(1);

      if (item.name.toLowerCase().includes("food") && parseFloat(percent) > 20) {
        suggestions.push(`You spent ${percent}% on food. Consider budgeting meals.`);
      }

      if (item.name.toLowerCase().includes("entertainment") && parseFloat(percent) > 15) {
        suggestions.push(`Your entertainment expenses are higher than usual (${percent}%).`);
      }

      if (item.name.toLowerCase().includes("coffee") && item.value > 100) {
        suggestions.push("Reducing your coffee expenses could save hundreds per year.");
      }
    }

    if (suggestions.length === 0) {
      suggestions.push("Your spending looks balanced. Great job!");
    }

    setSuggestions(suggestions);
  };

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Spending Analysis</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="h-[300px]">
            {spendingData.length > 0 ? (
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
                    label={({ name, percent }) =>
                      `${name} (${(percent * 100).toFixed(0)}%)`
                    }
                  >
                    {spendingData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`$${value}`, "Amount"]} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <p className="text-muted-foreground text-center mt-20">
                Upload a CSV to view your spending breakdown.
              </p>
            )}
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
              <label htmlFor="csv-upload" className="block cursor-pointer">
                <div className="border-2 border-dashed rounded-lg p-6 text-center hover:bg-muted/50">
                  <FileUp className="mx-auto h-10 w-10 text-muted-foreground mb-2" />
                  <p className="text-sm text-muted-foreground mb-2">
                    Drag and drop your bank statement CSV or click to browse
                  </p>
                  <Button variant="outline" size="sm">
                    Upload CSV
                  </Button>
                  <input
                    id="csv-upload"
                    type="file"
                    accept=".csv"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                  {fileName && (
                    <p className="mt-2 text-xs text-muted-foreground">
                      Selected: {fileName}
                    </p>
                  )}
                </div>
              </label>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
