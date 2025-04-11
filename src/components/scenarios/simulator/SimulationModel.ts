
import { TimelineDataPoint } from "./SimulationChart";

// Default data
export const defaultTimelineData: TimelineDataPoint[] = [
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

export function runSimulation(
  income: number,
  expenses: number,
  investmentReturn: number,
  purchaseType: string,
  purchaseAmount: number,
  purchaseMonth: string
): TimelineDataPoint[] {
  // Create a simple simulation model
  return defaultTimelineData.map((item) => {
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
}
