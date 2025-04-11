
import { useIsMobile } from "@/hooks/use-mobile";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend
} from "recharts";

export interface TimelineDataPoint {
  month: string;
  baseline: number;
  scenario: number | null;
}

interface SimulationChartProps {
  timelineData: TimelineDataPoint[];
}

export function SimulationChart({ timelineData }: SimulationChartProps) {
  const isMobile = useIsMobile();
  
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
    <div className="h-80 p-1">
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
  );
}
