
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";

// Sample data
const timelineData = [
  { month: "Jan 2025", netWorth: 25000, futureNetWorth: null, milestone: null },
  { month: "Feb 2025", netWorth: 27000, futureNetWorth: null, milestone: null },
  { month: "Mar 2025", netWorth: 28500, futureNetWorth: null, milestone: null },
  { month: "Apr 2025", netWorth: 30000, futureNetWorth: null, milestone: "Car Purchase" },
  { month: "May 2025", netWorth: 32000, futureNetWorth: null, milestone: null },
  { month: "Jun 2025", netWorth: 35000, futureNetWorth: null, milestone: null },
  { month: "Jul 2025", netWorth: 37000, futureNetWorth: null, milestone: null },
  { month: "Aug 2025", netWorth: 40000, futureNetWorth: null, milestone: null },
  { month: "Sep 2025", netWorth: 42000, futureNetWorth: null, milestone: null },
  { month: "Oct 2025", netWorth: 45000, futureNetWorth: null, milestone: null },
  { month: "Nov 2025", netWorth: 47000, futureNetWorth: null, milestone: null },
  { month: "Dec 2025", netWorth: 50000, futureNetWorth: null, milestone: null },
  { month: "Jan 2026", netWorth: null, futureNetWorth: 52000, milestone: null },
  { month: "Feb 2026", netWorth: null, futureNetWorth: 55000, milestone: null },
  { month: "Mar 2026", netWorth: null, futureNetWorth: 58000, milestone: null },
  { month: "Apr 2026", netWorth: null, futureNetWorth: 62000, milestone: "House Down Payment" },
  { month: "May 2026", netWorth: null, futureNetWorth: 55000, milestone: null },
  { month: "Jun 2026", netWorth: null, futureNetWorth: 58000, milestone: null },
  { month: "Jul 2026", netWorth: null, futureNetWorth: 62000, milestone: null },
  { month: "Aug 2026", netWorth: null, futureNetWorth: 65000, milestone: null },
  { month: "Sep 2026", netWorth: null, futureNetWorth: 68000, milestone: null },
  { month: "Oct 2026", netWorth: null, futureNetWorth: 70000, milestone: null },
  { month: "Nov 2026", netWorth: null, futureNetWorth: 72000, milestone: null },
  { month: "Dec 2026", netWorth: null, futureNetWorth: 75000, milestone: null },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    
    return (
      <div className="bg-white p-3 rounded shadow-lg border">
        <p className="font-semibold">{label}</p>
        {data.netWorth !== null && (
          <p className="text-sm">
            Net Worth: <span className="font-medium">${data.netWorth.toLocaleString()}</span>
          </p>
        )}
        {data.futureNetWorth !== null && (
          <p className="text-sm">
            Projected: <span className="font-medium">${data.futureNetWorth.toLocaleString()}</span>
          </p>
        )}
        {data.milestone && (
          <p className="text-xs mt-1 text-muted-foreground">
            Milestone: {data.milestone}
          </p>
        )}
      </div>
    );
  }
  return null;
};

export function FinancialTimeline() {
  return (
    <Card className="glass-card glass-card-hover">
      <CardHeader>
        <CardTitle>Financial Timeline</CardTitle>
      </CardHeader>
      <CardContent className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={timelineData}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 10,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
            <XAxis 
              dataKey="month" 
              tick={{ fontSize: 10 }} 
              interval={3} 
            />
            <YAxis />
            <Tooltip content={<CustomTooltip />} />
            <ReferenceLine 
              x="Dec 2025" 
              stroke="#7E69AB" 
              strokeDasharray="5 5" 
              label={{ 
                value: "Present", 
                position: "insideBottomLeft",
                fill: "#7E69AB",
                fontSize: 12
              }} 
            />
            <Line
              type="monotone"
              dataKey="netWorth"
              stroke="#4FD1C5"
              strokeWidth={2}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
              name="Current Path"
              connectNulls
            />
            <Line
              type="monotone"
              dataKey="futureNetWorth"
              stroke="#9b87f5"
              strokeDasharray="5 5"
              strokeWidth={2}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
              name="Projected Path"
              connectNulls
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
