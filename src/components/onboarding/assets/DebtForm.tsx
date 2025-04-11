
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
import { ArrowLeft, ArrowRight, Home, Car, CreditCard } from "lucide-react";

const debtSchema = z.object({
  mortgage: z.string().refine((val) => val === "" || (!isNaN(Number(val)) && Number(val) >= 0), {
    message: "Value must be a positive number",
  }),
  carLoan: z.string().refine((val) => val === "" || (!isNaN(Number(val)) && Number(val) >= 0), {
    message: "Value must be a positive number",
  }),
  studentLoans: z.string().refine((val) => val === "" || (!isNaN(Number(val)) && Number(val) >= 0), {
    message: "Value must be a positive number",
  }),
  creditCards: z.string().refine((val) => val === "" || (!isNaN(Number(val)) && Number(val) >= 0), {
    message: "Value must be a positive number",
  }),
});

export type DebtFormData = z.infer<typeof debtSchema>;

interface DebtFormProps {
  initialValues: {
    mortgage: string;
    carLoan: string;
    studentLoans: string;
    creditCards: string;
  };
  onSubmit: (data: DebtFormData) => void;
  onBack: () => void;
}

export function DebtForm({ initialValues, onSubmit, onBack }: DebtFormProps) {
  const form = useForm<DebtFormData>({
    resolver: zodResolver(debtSchema),
    defaultValues: initialValues,
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="mortgage"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mortgage Balance</FormLabel>
              <FormControl>
                <div className="relative">
                  <Home className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input type="number" min="0" placeholder="300000" className="pl-10" {...field} />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="carLoan"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Car Loan Balance</FormLabel>
              <FormControl>
                <div className="relative">
                  <Car className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input type="number" min="0" placeholder="15000" className="pl-10" {...field} />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="studentLoans"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Student Loans</FormLabel>
              <FormControl>
                <div className="relative">
                  <Car className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input type="number" min="0" placeholder="40000" className="pl-10" {...field} />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="creditCards"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Credit Card Debt</FormLabel>
              <FormControl>
                <div className="relative">
                  <CreditCard className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input type="number" min="0" placeholder="5000" className="pl-10" {...field} />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex space-x-2 pt-2">
          <Button type="button" variant="outline" onClick={onBack} className="flex-1">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Assets
          </Button>
          <Button type="submit" className="flex-1">
            Continue <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </form>
    </Form>
  );
}
