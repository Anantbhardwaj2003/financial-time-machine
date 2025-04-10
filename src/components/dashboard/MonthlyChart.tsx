
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Line,
  LineChart,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

// Sample data
const monthlyData = [
  { name: "Jan", income: 4000, expenses: 2400, savings: 1600 },
  { name: "Feb", income: 4200, expenses: 2700, savings: 1500 },
  { name: "Mar", income: 4500, expenses: 2800, savings: 1700 },
  { name: "Apr", income: 4700, expenses: 3000, savings: 1700 },
  { name: "May", income: 5000, expenses: 3100, savings: 1900 },
  { name: "Jun", income: 5200, expenses: 3300, savings: 1900 },
];

const categoryData = [
  { name: "Housing", value: 1200 },
  { name: "Food", value: 800 },
  { name: "Transport", value: 500 },
  { name: "Entertainment", value: 300 },
  { name: "Other", value: 500 },
];

const COLORS = [
  "#4FD1C5", // teal
  "#9b87f5", // purple
  "#38B2AC", // dark teal
  "#7E69AB", // dark purple
  "#6E59A5", // darker purple
];

export function MonthlyChart() {
  return (
    <Card className="glass-card glass-card-hover">
      <CardHeader>
        <CardTitle>Monthly Finances</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="bar">
          <TabsList className="mb-4">
            <TabsTrigger value="bar">Bar</TabsTrigger>
            <TabsTrigger value="line">Line</TabsTrigger>
            <TabsTrigger value="pie">Pie</TabsTrigger>
          </TabsList>
          <TabsContent value="bar" className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={monthlyData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar
                  dataKey="income"
                  fill="#4FD1C5"
                  name="Income"
                  radius={[4, 4, 0, 0]}
                />
                <Bar
                  dataKey="expenses"
                  fill="#FC8181"
                  name="Expenses"
                  radius={[4, 4, 0, 0]}
                />
                <Bar
                  dataKey="savings"
                  fill="#9b87f5"
                  name="Savings"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </TabsContent>
          <TabsContent value="line" className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={monthlyData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="income"
                  stroke="#4FD1C5"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                  name="Income"
                />
                <Line
                  type="monotone"
                  dataKey="expenses"
                  stroke="#FC8181"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                  name="Expenses"
                />
                <Line
                  type="monotone"
                  dataKey="savings"
                  stroke="#9b87f5"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                  name="Savings"
                />
              </LineChart>
            </ResponsiveContainer>
          </TabsContent>
          <TabsContent value="pie" className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  fill="#8884d8"
                  paddingAngle={2}
                  dataKey="value"
                  label={({name, percent}) => `${name} (${(percent * 100).toFixed(0)}%)`}
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
