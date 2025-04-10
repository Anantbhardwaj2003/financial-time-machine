
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ArrowLeft, ArrowRight, Home, ShoppingCart, Utensils, Car } from "lucide-react";

const formSchema = z.object({
  housing: z.string().refine((val) => !isNaN(Number(val)) && Number(val) >= 0, {
    message: "Amount must be a positive number",
  }),
  transportation: z.string().refine((val) => !isNaN(Number(val)) && Number(val) >= 0, {
    message: "Amount must be a positive number",
  }),
  food: z.string().refine((val) => !isNaN(Number(val)) && Number(val) >= 0, {
    message: "Amount must be a positive number",
  }),
  other: z.string().refine((val) => !isNaN(Number(val)) && Number(val) >= 0, {
    message: "Amount must be a positive number",
  }),
});

type FormData = z.infer<typeof formSchema>;

interface OnboardingExpensesProps {
  userData: any;
  updateUserData: (data: Partial<any>) => void;
  onNext: () => void;
  onBack: () => void;
}

export function OnboardingExpenses({ userData, updateUserData, onNext, onBack }: OnboardingExpensesProps) {
  // Get existing expenses or set defaults
  const getExpenseAmount = (category: string) => {
    const expense = userData.expenses?.find((e: any) => e.category === category);
    return expense ? expense.amount.toString() : "";
  };

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      housing: getExpenseAmount("housing"),
      transportation: getExpenseAmount("transportation"),
      food: getExpenseAmount("food"),
      other: getExpenseAmount("other"),
    },
  });

  const onSubmit = (data: FormData) => {
    const expenses = [
      { category: "housing", amount: Number(data.housing), icon: "Home" },
      { category: "transportation", amount: Number(data.transportation), icon: "Car" },
      { category: "food", amount: Number(data.food), icon: "Utensils" },
      { category: "other", amount: Number(data.other), icon: "ShoppingCart" },
    ];
    
    updateUserData({ expenses });
    onNext();
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold tracking-tight">Monthly Expenses</h1>
        <p className="text-muted-foreground">
          Enter your average monthly expenses by category
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="housing"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Housing (Rent/Mortgage)</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Home className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input type="number" min="0" placeholder="2000" className="pl-10" {...field} />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="transportation"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Transportation</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Car className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input type="number" min="0" placeholder="500" className="pl-10" {...field} />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="food"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Food & Groceries</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Utensils className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input type="number" min="0" placeholder="800" className="pl-10" {...field} />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="other"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Other Expenses</FormLabel>
                <FormControl>
                  <div className="relative">
                    <ShoppingCart className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input type="number" min="0" placeholder="600" className="pl-10" {...field} />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex space-x-2 pt-2">
            <Button type="button" variant="outline" onClick={onBack} className="flex-1">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back
            </Button>
            <Button type="submit" className="flex-1">
              Continue <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
