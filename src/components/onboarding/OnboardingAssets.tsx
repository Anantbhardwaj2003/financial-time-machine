
import { useState } from "react";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, ArrowRight, Home, Car, Wallet, CreditCard } from "lucide-react";

const assetSchema = z.object({
  home: z.string().refine((val) => val === "" || (!isNaN(Number(val)) && Number(val) >= 0), {
    message: "Value must be a positive number",
  }),
  car: z.string().refine((val) => val === "" || (!isNaN(Number(val)) && Number(val) >= 0), {
    message: "Value must be a positive number",
  }),
  savings: z.string().refine((val) => val === "" || (!isNaN(Number(val)) && Number(val) >= 0), {
    message: "Value must be a positive number",
  }),
  investments: z.string().refine((val) => val === "" || (!isNaN(Number(val)) && Number(val) >= 0), {
    message: "Value must be a positive number",
  }),
});

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

type AssetFormData = z.infer<typeof assetSchema>;
type DebtFormData = z.infer<typeof debtSchema>;

interface OnboardingAssetsProps {
  userData: any;
  updateUserData: (data: Partial<any>) => void;
  onNext: () => void;
  onBack: () => void;
}

export function OnboardingAssets({ userData, updateUserData, onNext, onBack }: OnboardingAssetsProps) {
  const [activeTab, setActiveTab] = useState("assets");
  
  // Get existing asset/debt or set defaults
  const getAssetValue = (type: string) => {
    const asset = userData.assets?.find((a: any) => a.type === type);
    return asset ? asset.value.toString() : "";
  };

  const getDebtValue = (type: string) => {
    const debt = userData.debts?.find((d: any) => d.type === type);
    return debt ? debt.value.toString() : "";
  };

  const assetForm = useForm<AssetFormData>({
    resolver: zodResolver(assetSchema),
    defaultValues: {
      home: getAssetValue("home"),
      car: getAssetValue("car"),
      savings: getAssetValue("savings"),
      investments: getAssetValue("investments"),
    },
  });

  const debtForm = useForm<DebtFormData>({
    resolver: zodResolver(debtSchema),
    defaultValues: {
      mortgage: getDebtValue("mortgage"),
      carLoan: getDebtValue("carLoan"),
      studentLoans: getDebtValue("studentLoans"),
      creditCards: getDebtValue("creditCards"),
    },
  });

  const submitAssets = (data: AssetFormData) => {
    const assets = [
      { type: "home", value: Number(data.home) || 0, icon: "Home" },
      { type: "car", value: Number(data.car) || 0, icon: "Car" },
      { type: "savings", value: Number(data.savings) || 0, icon: "Wallet" },
      { type: "investments", value: Number(data.investments) || 0, icon: "TrendingUp" },
    ].filter(asset => asset.value > 0);
    
    updateUserData({ assets });
    setActiveTab("debts");
  };

  const submitDebts = (data: DebtFormData) => {
    const debts = [
      { type: "mortgage", value: Number(data.mortgage) || 0, icon: "Home" },
      { type: "carLoan", value: Number(data.carLoan) || 0, icon: "Car" },
      { type: "studentLoans", value: Number(data.studentLoans) || 0, icon: "GraduationCap" },
      { type: "creditCards", value: Number(data.creditCards) || 0, icon: "CreditCard" },
    ].filter(debt => debt.value > 0);
    
    updateUserData({ debts });
    onNext();
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold tracking-tight">Assets & Debts</h1>
        <p className="text-muted-foreground">
          Tell us about your assets and debts
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="assets">Assets</TabsTrigger>
          <TabsTrigger value="debts">Debts</TabsTrigger>
        </TabsList>
        
        <TabsContent value="assets" className="mt-4">
          <Form {...assetForm}>
            <form onSubmit={assetForm.handleSubmit(submitAssets)} className="space-y-4">
              <FormField
                control={assetForm.control}
                name="home"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Home Value</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Home className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input type="number" min="0" placeholder="500000" className="pl-10" {...field} />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={assetForm.control}
                name="car"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Vehicle Value</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Car className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input type="number" min="0" placeholder="25000" className="pl-10" {...field} />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={assetForm.control}
                name="savings"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Savings</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Wallet className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input type="number" min="0" placeholder="15000" className="pl-10" {...field} />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={assetForm.control}
                name="investments"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Investments</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Wallet className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input type="number" min="0" placeholder="50000" className="pl-10" {...field} />
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
        </TabsContent>
        
        <TabsContent value="debts" className="mt-4">
          <Form {...debtForm}>
            <form onSubmit={debtForm.handleSubmit(submitDebts)} className="space-y-4">
              <FormField
                control={debtForm.control}
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
                control={debtForm.control}
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
                control={debtForm.control}
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
                control={debtForm.control}
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
                <Button type="button" variant="outline" onClick={() => setActiveTab("assets")} className="flex-1">
                  <ArrowLeft className="mr-2 h-4 w-4" /> Back to Assets
                </Button>
                <Button type="submit" className="flex-1">
                  Continue <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </form>
          </Form>
        </TabsContent>
      </Tabs>
    </div>
  );
}
