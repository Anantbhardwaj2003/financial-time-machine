
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
import { ArrowLeft, ArrowRight, DollarSign, Briefcase, MapPin } from "lucide-react";

const formSchema = z.object({
  income: z.string().refine((val) => !isNaN(Number(val)) && Number(val) >= 0, {
    message: "Income must be a positive number",
  }),
  jobTitle: z.string().min(2, "Job title must be at least 2 characters"),
  location: z.string().min(2, "Location must be at least 2 characters"),
});

type FormData = z.infer<typeof formSchema>;

interface OnboardingIncomeProps {
  userData: any;
  updateUserData: (data: Partial<any>) => void;
  onNext: () => void;
  onBack: () => void;
}

export function OnboardingIncome({ userData, updateUserData, onNext, onBack }: OnboardingIncomeProps) {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      income: userData.income ? userData.income.toString() : "",
      jobTitle: userData.jobTitle || "",
      location: userData.location || "",
    },
  });

  const onSubmit = (data: FormData) => {
    updateUserData({
      income: Number(data.income),
      jobTitle: data.jobTitle,
      location: data.location,
    });
    onNext();
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold tracking-tight">Your Income Details</h1>
        <p className="text-muted-foreground">
          Tell us about your current income and employment
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="income"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Annual Income</FormLabel>
                <FormControl>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input type="number" min="0" placeholder="75000" className="pl-10" {...field} />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="jobTitle"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Job Title</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Briefcase className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Software Engineer" className="pl-10" {...field} />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Location</FormLabel>
                <FormControl>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="San Francisco, CA" className="pl-10" {...field} />
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
